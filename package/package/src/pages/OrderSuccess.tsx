import { useEffect, useState, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/AppContext";


const BASE_URL = "https://saif-rms-pos-backend.vercel.app";

const OrderSuccess = () => {
    const location = useLocation();
    const { cmsConfig } = useContext(Context);
    const [order, setOrder] = useState<any>(location.state?.order);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [countdown, setCountdown] = useState(3);
    const orderRef = useRef<any>(null);

    // Keep ref in sync so interval always has latest order
    useEffect(() => { orderRef.current = order; }, [order]);

    const fetchOrderStatus = async () => {
        const current = orderRef.current;
        if (!current) return;

        // PRIMARY: Use orderId directly — works on any domain, no slug needed
        const orderId = current.id;
        // FALLBACK: orderNo + phone + restaurantId
        const oNo = current.orderNo;
        const phone = current.customer?.phone || current.phone;
        const restaurantId = cmsConfig?.restaurantId;

        try {
            let res;
            if (orderId) {
                // Most reliable - direct ID lookup
                res = await axios.get(`${BASE_URL}/api/orders/track`, {
                    params: { orderId, _t: Date.now() },
                    headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
                });
            } else if (oNo && phone) {
                res = await axios.get(`${BASE_URL}/api/orders/track`, {
                    params: {
                        orderNo: oNo,
                        phone,
                        ...(restaurantId ? { restaurantId } : {}),
                        _t: Date.now()
                    },
                    headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
                });
            }

            if (res?.data?.success) {
                setOrder(res.data.data);
                setLastUpdated(new Date());
                setCountdown(3);
            }
        } catch (err) {
            console.error("Failed to sync order status", err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state?.order) {
            const currentOrder = location.state.order;
            const phoneStr = currentOrder.customer?.phone || currentOrder.phone || "";
            localStorage.setItem("lastOrder", JSON.stringify({ orderId: currentOrder.id, orderNo: currentOrder.orderNo, phone: phoneStr }));
        } else if (!order) {
            const saved = localStorage.getItem("lastOrder");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Set a minimal order object so polling can start
                    setLoading(true);
                    // Build minimal order ref
                    orderRef.current = { id: parsed.orderId, orderNo: parsed.orderNo, customer: { phone: parsed.phone } };
                    fetchOrderStatus().finally(() => setLoading(false));
                } catch (e) { }
            }
        }
    }, []);

    // Countdown timer display
    useEffect(() => {
        if (!order || order.status === "DELIVERED" || order.status === "CANCELLED") return;
        const t = setInterval(() => setCountdown(c => c > 1 ? c - 1 : 3), 1000);
        return () => clearInterval(t);
    }, [order?.status]);

    // Polling every 3 seconds
    useEffect(() => {
        if (!order || order.status === "DELIVERED" || order.status === "CANCELLED") return;

        const interval = setInterval(() => {
            fetchOrderStatus();
        }, 3000);

        return () => clearInterval(interval);
    }, [order?.id, order?.status]);


    if (loading && !order) {
        return (
            <div className="page-content">
                <div className="content-inner text-center py-10">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 className="mt-4">Syncing your order...</h3>
                </div>
            </div>
        );
    }


    if (!order) {
        return (
            <div className="page-content">
                <div className="content-inner text-center py-10">
                    <h3 className="mb-3">Order not found</h3>
                    <p className="text-muted">We couldn't retrieve your latest order details.</p>
                    <Link to="/our-menu" className="btn btn-primary btn-sm mt-3">Go to Menu</Link>
                </div>
            </div>
        );
    }

    const statusSteps = [
        { key: "PENDING", label: "Order Placed", icon: "✓", desc: "We received your order" },
        { key: "CONFIRMED", label: "Confirmed", icon: "📋", desc: "Restaurant confirmed" },
        { key: "PREPARING", label: "Preparing", icon: "👨‍🍳", desc: "Being cooked fresh" },
        { key: "KITCHEN_READY", label: "Ready", icon: "🍽️", desc: "Food is ready at the kitchen" },
        { key: "OUT_FOR_DELIVERY", label: "On the Way", icon: "🛵", desc: "Rider is heading to you" },
        { key: "DELIVERED", label: "Delivered", icon: "🎉", desc: "Enjoy your meal!" },
    ];

    const isCancelled = order.status === "CANCELLED";
    const currentStepIndex = isCancelled ? -1 : statusSteps.findIndex(s => s.key === (order.status || "PENDING"));

    return (
        <div className="page-content">
            <section className="content-inner" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {/* Success or Cancelled Header */}
                            <div className="text-center mb-5">
                                <div style={{
                                    width: 90, height: 90, borderRadius: "50%",
                                    background: isCancelled ? "linear-gradient(135deg, #FF5252, #FF1744)" : "linear-gradient(135deg, #4CAF50, #66BB6A)",
                                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "40px", marginBottom: "20px",
                                    boxShadow: isCancelled ? "0 10px 30px rgba(255, 23, 68, 0.3)" : "0 10px 30px rgba(76, 175, 80, 0.3)"
                                }}>
                                    {isCancelled ? "✕" : "✓"}
                                </div>
                                <h2 className="title" style={{ color: "#222" }}>
                                    {isCancelled ? "Order Cancelled" : "Order Placed Successfully!"}
                                </h2>
                                <p style={{ color: "#666", fontSize: "16px" }}>
                                    {isCancelled
                                        ? "This order has been cancelled by the restaurant. Please contact support if you have questions."
                                        : "Thank you for your order! We'll start preparing it right away."}
                                </p>
                                <div style={{
                                    display: "inline-block",
                                    background: "#f8f9fa",
                                    border: isCancelled ? "2px dashed #ff5252" : "2px dashed var(--primary, #ff6b35)",
                                    borderRadius: "12px",
                                    padding: "16px 32px",
                                    marginTop: "16px"
                                }}>
                                    <p style={{ marginBottom: 4, color: "#888", fontSize: 13 }}>Your Order Number</p>
                                    <h3 style={{ color: isCancelled ? "#ff5252" : "var(--primary, #ff6b35)", marginBottom: 0, fontWeight: 700 }}>
                                        #{order.orderNo}
                                    </h3>
                                </div>
                            </div>

                            {/* Cancelled Alert Box */}
                            {isCancelled && (
                                <div className="alert alert-danger mb-4 d-flex align-items-center" style={{ borderRadius: "12px", border: "none", background: "#fff5f5", color: "#c62828" }}>
                                    <span style={{ fontSize: "24px", marginRight: "12px" }}>⚠️</span>
                                    <div>
                                        <h6 className="mb-1" style={{ fontWeight: 700 }}>Order Status: Cancelled</h6>
                                        <p className="mb-0" style={{ fontSize: "14px", opacity: 0.8 }}>This order is no longer being processed.</p>
                                    </div>
                                </div>
                            )}

                            {/* Order Status Timeline */}
                            <div className="widget mb-4" style={{ border: "1px solid #f0f0f0", borderRadius: "16px", padding: "28px" }}>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="widget-title mb-0">Order Status</h5>
                                    {lastUpdated && (
                                        <span style={{ fontSize: "11px", color: "#666", display: "flex", alignItems: "center", gap: "5px" }}>
                                            <span className="spinner-grow spinner-grow-sm text-success" style={{ width: "8px", height: "8px" }}></span>
                                            Live: {lastUpdated.toLocaleTimeString()}
                                        </span>
                                    )}
                                </div>
                                <div style={{ position: "relative" }}>
                                    <div style={{
                                        position: "absolute", left: "22px", top: "24px", bottom: "24px",
                                        width: "2px", background: "#f0f0f0", zIndex: 0
                                    }} />
                                    {statusSteps.map((step, idx) => {
                                        const isCompleted = !isCancelled && idx <= currentStepIndex;
                                        const isCurrent = !isCancelled && idx === currentStepIndex;
                                        return (
                                            <div key={step.key} style={{
                                                display: "flex", alignItems: "flex-start",
                                                marginBottom: idx < statusSteps.length - 1 ? "24px" : 0,
                                                position: "relative", zIndex: 1,
                                                opacity: isCancelled ? 0.5 : 1
                                            }}>
                                                <div style={{
                                                    width: 44, height: 44, borderRadius: "50%",
                                                    background: isCompleted ? "var(--primary, #ff6b35)" : "#f0f0f0",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: isCompleted ? "16px" : "14px",
                                                    flexShrink: 0,
                                                    boxShadow: isCurrent ? "0 0 0 4px rgba(255, 107, 53, 0.15)" : "none",
                                                    transition: "all 0.3s"
                                                }}>
                                                    {isCompleted ? "✓" : <span style={{ opacity: 0.4 }}>{idx + 1}</span>}
                                                </div>
                                                <div style={{ marginLeft: "16px", paddingTop: "8px" }}>
                                                    <p style={{
                                                        fontWeight: (isCurrent || (isCancelled && idx === 0)) ? 700 : 500,
                                                        color: isCompleted ? "#222" : "#aaa",
                                                        marginBottom: 2, fontSize: "15px"
                                                    }}>
                                                        {step.label}
                                                        {isCurrent && (
                                                            <span style={{
                                                                marginLeft: 8, background: "var(--primary, #ff6b35)",
                                                                color: "#fff", fontSize: "11px", padding: "2px 8px",
                                                                borderRadius: "20px", fontWeight: 600
                                                            }}>CURRENT</span>
                                                        )}
                                                        {isCancelled && idx === 0 && (
                                                            <span style={{
                                                                marginLeft: 8, background: "#ff5252",
                                                                color: "#fff", fontSize: "11px", padding: "2px 8px",
                                                                borderRadius: "20px", fontWeight: 600
                                                            }}>CANCELLED</span>
                                                        )}
                                                    </p>
                                                    <p style={{ color: "#999", fontSize: "13px", marginBottom: 0 }}>{step.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                                    <div className="mt-4 text-center" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                        <span className="spinner-grow spinner-grow-sm" style={{ width: 8, height: 8, background: "#4CAF50" }}></span>
                                        <span style={{ fontSize: "12px", color: "#888" }}>
                                            Live tracking — refreshing in <strong style={{ color: "#4CAF50" }}>{countdown}s</strong>
                                        </span>
                                    </div>
                                )}


                            </div>

                            {/* Order Details */}
                            <div className="widget mb-4" style={{ border: "1px solid #f0f0f0", borderRadius: "16px", padding: "28px" }}>
                                <h5 className="widget-title mb-3">Order Summary</h5>
                                {order.items?.map((item: any) => (
                                    <div key={item.id} style={{
                                        display: "flex", justifyContent: "space-between",
                                        padding: "10px 0", borderBottom: "1px solid #f8f8f8"
                                    }}>
                                        <div>
                                            <span style={{ fontWeight: 500 }}>{item.menuItem?.name || item.name}</span>
                                            <span style={{ color: "#999", marginLeft: 8 }}>x{item.quantity}</span>
                                        </div>
                                        <span style={{ fontWeight: 600, color: "var(--primary, #ff6b35)" }}>
                                            $ {(Number(item.price) * item.quantity).toFixed(0)}
                                        </span>
                                    </div>
                                ))}
                                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "2px solid #f0f0f0" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <span style={{ color: "#666" }}>Subtotal</span>
                                        <span>$ {order.subtotal || Number(order.total).toFixed(0)}</span>
                                    </div>
                                    {order.deliveryCharge > 0 && (
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                            <span style={{ color: "#666" }}>Delivery</span>
                                            <span>$ {Number(order.deliveryCharge).toFixed(0)}</span>
                                        </div>
                                    )}
                                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                                        <span>Total</span>
                                        <span style={{ color: "var(--primary, #ff6b35)" }}>$ {Number(order.total).toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            {order.deliveryAddress && (
                                <div className="widget mb-4" style={{ border: "1px solid #f0f0f0", borderRadius: "16px", padding: "28px" }}>
                                    <h5 className="widget-title mb-3">Delivery Details</h5>
                                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                        <span style={{ fontSize: 24 }}>📍</span>
                                        <div>
                                            <p style={{ fontWeight: 600, marginBottom: 4 }}>{order.deliveryAddress}</p>
                                            {order.branch && (
                                                <p style={{ color: "#888", fontSize: 13, marginBottom: 0 }}>
                                                    Branch: {order.branch.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                <Link
                                    to="/track-order"
                                    state={{ orderNo: order.orderNo }}
                                    className="btn btn-primary"
                                    style={{ flex: 1, minWidth: 180 }}
                                >
                                    Track Order
                                </Link>
                                <Link
                                    to="/my-account"
                                    className="btn btn-outline-primary"
                                    style={{ flex: 1, minWidth: 180 }}
                                >
                                    My Orders
                                </Link>
                                <Link
                                    to="/our-menu"
                                    className="btn btn-light"
                                    style={{ flex: 1, minWidth: 180 }}
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderSuccess;
