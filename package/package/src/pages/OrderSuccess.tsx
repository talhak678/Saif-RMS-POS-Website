import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const location = useLocation();
    const order = location.state?.order;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!order) {
        return (
            <div className="page-content bg-white">
                <div className="content-inner text-center py-5">
                    <h3>No order data found</h3>
                    <Link to="/our-menu-2" className="btn btn-primary mt-3">Browse Menu</Link>
                </div>
            </div>
        );
    }

    const statusSteps = [
        { key: "PENDING", label: "Order Placed", icon: "✓", desc: "We received your order" },
        { key: "CONFIRMED", label: "Confirmed", icon: "📋", desc: "Restaurant confirmed" },
        { key: "PREPARING", label: "Preparing", icon: "👨‍🍳", desc: "Being cooked fresh" },
        { key: "OUT_FOR_DELIVERY", label: "On the Way", icon: "🛵", desc: "Rider is heading to you" },
        { key: "DELIVERED", label: "Delivered", icon: "🎉", desc: "Enjoy your meal!" },
    ];

    const currentStepIndex = statusSteps.findIndex(s => s.key === (order.status || "PENDING"));

    return (
        <div className="page-content bg-white">
            <section className="content-inner" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {/* Success Header */}
                            <div className="text-center mb-5">
                                <div style={{
                                    width: 90, height: 90, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #4CAF50, #66BB6A)",
                                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "40px", marginBottom: "20px",
                                    boxShadow: "0 10px 30px rgba(76, 175, 80, 0.3)"
                                }}>
                                    ✓
                                </div>
                                <h2 className="title" style={{ color: "#222" }}>Order Placed Successfully!</h2>
                                <p style={{ color: "#666", fontSize: "16px" }}>
                                    Thank you for your order! We'll start preparing it right away.
                                </p>
                                <div style={{
                                    display: "inline-block",
                                    background: "#f8f9fa",
                                    border: "2px dashed var(--primary, #ff6b35)",
                                    borderRadius: "12px",
                                    padding: "16px 32px",
                                    marginTop: "16px"
                                }}>
                                    <p style={{ marginBottom: 4, color: "#888", fontSize: 13 }}>Your Order Number</p>
                                    <h3 style={{ color: "var(--primary, #ff6b35)", marginBottom: 0, fontWeight: 700 }}>
                                        #{order.orderNo}
                                    </h3>
                                </div>
                            </div>

                            {/* Order Status Timeline */}
                            <div className="widget mb-4" style={{ border: "1px solid #f0f0f0", borderRadius: "16px", padding: "28px" }}>
                                <h5 className="widget-title mb-4">Order Status</h5>
                                <div style={{ position: "relative" }}>
                                    <div style={{
                                        position: "absolute", left: "22px", top: "24px", bottom: "24px",
                                        width: "2px", background: "#f0f0f0", zIndex: 0
                                    }} />
                                    {statusSteps.map((step, idx) => {
                                        const isCompleted = idx <= currentStepIndex;
                                        const isCurrent = idx === currentStepIndex;
                                        return (
                                            <div key={step.key} style={{
                                                display: "flex", alignItems: "flex-start",
                                                marginBottom: idx < statusSteps.length - 1 ? "24px" : 0,
                                                position: "relative", zIndex: 1
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
                                                        fontWeight: isCurrent ? 700 : 500,
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
                                                    </p>
                                                    <p style={{ color: "#999", fontSize: "13px", marginBottom: 0 }}>{step.desc}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
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
                                            Rs. {(Number(item.price) * item.quantity).toFixed(0)}
                                        </span>
                                    </div>
                                ))}
                                <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "2px solid #f0f0f0" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <span style={{ color: "#666" }}>Subtotal</span>
                                        <span>Rs. {order.subtotal || Number(order.total).toFixed(0)}</span>
                                    </div>
                                    {order.deliveryCharge > 0 && (
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                            <span style={{ color: "#666" }}>Delivery</span>
                                            <span>Rs. {Number(order.deliveryCharge).toFixed(0)}</span>
                                        </div>
                                    )}
                                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                                        <span>Total</span>
                                        <span style={{ color: "var(--primary, #ff6b35)" }}>Rs. {Number(order.total).toFixed(0)}</span>
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
                                    to="/our-menu-2"
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
