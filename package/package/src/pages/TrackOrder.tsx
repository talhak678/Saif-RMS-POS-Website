import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/AppContext";
import CommonBanner from "../elements/CommonBanner";
import { IMAGES } from "../constent/theme";

const BASE_URL = "https://saif-rms-pos-backend.vercel.app";

const STATUS_STEPS = [
    { key: "PENDING", label: "Order Placed", icon: "📦", desc: "Your order has been received", color: "#FF9800" },
    { key: "CONFIRMED", label: "Confirmed", icon: "✅", desc: "Restaurant has confirmed your order", color: "#2196F3" },
    { key: "PREPARING", label: "Preparing", icon: "👨‍🍳", desc: "Your food is being freshly prepared", color: "#9C27B0" },
    { key: "KITCHEN_READY", label: "Ready", icon: "🍽️", desc: "Food is ready at the kitchen", color: "#FF5722" },
    { key: "OUT_FOR_DELIVERY", label: "On the Way", icon: "🛵", desc: "Rider is heading to your location", color: "#FF6B35" },
    { key: "DELIVERED", label: "Delivered", icon: "🎉", desc: "Your order has been delivered!", color: "#4CAF50" },
];

const PAYMENT_METHOD_LABELS: Record<string, string> = {
    CASH: "Cash on Delivery",
    COD: "Cash on Delivery",
    STRIPE: "Online Payment",
    PAYPAL: "PayPal",
};

const TrackOrder = () => {
    const location = useLocation();
    const { cmsConfig } = useContext(Context);

    const [orderNo, setOrderNo] = useState(location.state?.orderNo?.toString() || "");
    const [phone, setPhone] = useState("");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

    const restaurantSlug = import.meta.env.VITE_RESTAURANT_SLUG || "saifs-kitchen";

    const fetchOrder = async () => {
        if (!orderNo || !phone) {
            setError("Please enter your order number and phone number.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await axios.get(`${BASE_URL}/api/orders/track`, {
                params: { orderNo, phone, slug: restaurantSlug }
            });
            if (res.data?.success) {
                setOrder(res.data.data);
                setLastRefresh(new Date());
            } else {
                setError(res.data?.message || "Order not found.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Order not found. Please check your details.");
        } finally {
            setLoading(false);
        }
    };

    // Auto-refresh every 30 seconds if order is active
    useEffect(() => {
        if (!order || order.status === "DELIVERED" || order.status === "CANCELLED") return;
        const interval = setInterval(fetchOrder, 30000);
        return () => clearInterval(interval);
    }, [order]);

    const currentStepIndex = order
        ? STATUS_STEPS.findIndex(s => s.key === order.status)
        : -1;

    const getEstimatedTime = (status: string) => {
        switch (status) {
            case "PENDING": return "Waiting for confirmation...";
            case "CONFIRMED": return "~30-45 mins";
            case "PREPARING": return "~20-30 mins";
            case "KITCHEN_READY": return "~15-20 mins";
            case "OUT_FOR_DELIVERY": return "~10-20 mins";
            case "DELIVERED": return "Delivered!";
            default: return "";
        }
    };

    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";

    return (
        <div className="page-content bg-white">
            <CommonBanner img={IMAGES.images_bnr3} title="Track Order" subtitle="Track Order" />

            <section className="content-inner" style={{ background: "#f8f9fa" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">

                            {/* Search Box */}
                            <div style={{
                                background: "#fff", borderRadius: "20px", padding: "32px",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: "24px"
                            }}>
                                <h4 className="title mb-1" style={{ color: "#222" }}>Track Your Order</h4>
                                <p style={{ color: "#888", marginBottom: "24px" }}>
                                    Enter your order number and phone to get live updates
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    <div>
                                        <label className="form-label" style={{ fontWeight: 600 }}>Order Number</label>
                                        <div style={{ position: "relative" }}>
                                            <span style={{
                                                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                                                color: "#aaa", fontWeight: 600
                                            }}>#</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                style={{ paddingLeft: 28, borderRadius: 10, height: 48 }}
                                                placeholder="Enter order number"
                                                value={orderNo}
                                                onChange={e => setOrderNo(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label" style={{ fontWeight: 600 }}>Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            style={{ borderRadius: 10, height: 48 }}
                                            placeholder="Enter your registered phone number"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary"
                                        style={{ height: 48, borderRadius: 10, fontWeight: 600, fontSize: 15 }}
                                        onClick={fetchOrder}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        ) : "🔍 "}
                                        {loading ? "Searching..." : "Track Order"}
                                    </button>
                                </div>

                                {error && (
                                    <div style={{
                                        marginTop: 16, padding: "12px 16px",
                                        background: "#fff3f3", border: "1px solid #ffcdd2",
                                        borderRadius: 10, color: "#c62828", fontSize: 14
                                    }}>
                                        ❌ {error}
                                    </div>
                                )}
                            </div>

                            {/* Order Results */}
                            {order && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                                    {/* Order Header */}
                                    <div style={{
                                        background: "#fff", borderRadius: "20px", padding: "28px",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                                            <div>
                                                <p style={{ color: "#888", fontSize: 13, marginBottom: 4 }}>Order Number</p>
                                                <h3 style={{ color: primaryColor, fontWeight: 700, marginBottom: 0 }}>#{order.orderNo}</h3>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{
                                                    display: "inline-block",
                                                    padding: "6px 16px",
                                                    borderRadius: 20,
                                                    background: currentStepIndex >= 0 ? STATUS_STEPS[currentStepIndex].color + "20" : "#f0f0f0",
                                                    color: currentStepIndex >= 0 ? STATUS_STEPS[currentStepIndex].color : "#888",
                                                    fontWeight: 600, fontSize: 13
                                                }}>
                                                    {STATUS_STEPS[currentStepIndex]?.icon || ""} {order.status?.replace(/_/g, " ")}
                                                </div>
                                                {lastRefresh && (
                                                    <p style={{ color: "#aaa", fontSize: 11, marginTop: 4, marginBottom: 0 }}>
                                                        Updated: {lastRefresh.toLocaleTimeString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* ETA */}
                                        {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                                            <div style={{
                                                marginTop: 16, padding: "12px 16px",
                                                background: primaryColor + "10", borderRadius: 10, borderLeft: `3px solid ${primaryColor}`
                                            }}>
                                                <p style={{ fontWeight: 600, color: primaryColor, marginBottom: 2, fontSize: 14 }}>
                                                    Estimated Time
                                                </p>
                                                <p style={{ color: "#555", marginBottom: 0, fontSize: 13 }}>
                                                    {getEstimatedTime(order.status)}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status Timeline */}
                                    <div style={{
                                        background: "#fff", borderRadius: "20px", padding: "28px",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
                                    }}>
                                        <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 24 }}>Order Progress</h5>
                                        <div style={{ position: "relative" }}>
                                            <div style={{
                                                position: "absolute", left: "22px", top: 0, bottom: 0,
                                                width: "3px",
                                                background: `linear-gradient(to bottom, ${primaryColor} ${(currentStepIndex / (STATUS_STEPS.length - 1)) * 100}%, #f0f0f0 0%)`,
                                                borderRadius: 3
                                            }} />
                                            {STATUS_STEPS.map((step, idx) => {
                                                const isCompleted = currentStepIndex >= 0 && idx <= currentStepIndex;
                                                const isCurrent = idx === currentStepIndex;
                                                const bgColor = isCompleted ? step.color : "#f0f0f0";
                                                return (
                                                    <div key={step.key} style={{
                                                        display: "flex", alignItems: "flex-start",
                                                        marginBottom: idx < STATUS_STEPS.length - 1 ? 28 : 0,
                                                        position: "relative", zIndex: 1
                                                    }}>
                                                        <div style={{
                                                            width: 44, height: 44, borderRadius: "50%",
                                                            background: bgColor,
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                            fontSize: 18, flexShrink: 0,
                                                            boxShadow: isCurrent ? `0 0 0 6px ${step.color}20` : "none",
                                                            transition: "all 0.4s",
                                                            border: isCompleted ? `2px solid ${step.color}` : "2px solid #e0e0e0"
                                                        }}>
                                                            {isCompleted ? step.icon : <span style={{ color: "#ccc", fontSize: 14 }}>{idx + 1}</span>}
                                                        </div>
                                                        <div style={{ marginLeft: 18, paddingTop: 6 }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                                <p style={{
                                                                    fontWeight: isCurrent ? 700 : 500,
                                                                    color: isCompleted ? "#222" : "#bbb",
                                                                    marginBottom: 2, fontSize: 15
                                                                }}>
                                                                    {step.label}
                                                                </p>
                                                                {isCurrent && (
                                                                    <span style={{
                                                                        background: primaryColor, color: "#fff",
                                                                        fontSize: 10, padding: "2px 8px", borderRadius: 12,
                                                                        fontWeight: 700, letterSpacing: 0.5
                                                                    }}>NOW</span>
                                                                )}
                                                            </div>
                                                            <p style={{
                                                                color: isCompleted ? "#666" : "#ccc",
                                                                fontSize: 13, marginBottom: 0
                                                            }}>
                                                                {step.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div style={{
                                        background: "#fff", borderRadius: "20px", padding: "28px",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
                                    }}>
                                        <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 20 }}>Order Items</h5>
                                        {order.items?.map((item: any, idx: number) => (
                                            <div key={idx} style={{
                                                display: "flex", alignItems: "center", gap: 14,
                                                padding: "12px 0",
                                                borderBottom: idx < order.items.length - 1 ? "1px solid #f8f8f8" : "none"
                                            }}>
                                                {item.menuItem?.image && (
                                                    <img
                                                        src={item.menuItem.image}
                                                        alt={item.menuItem.name}
                                                        style={{ width: 50, height: 50, borderRadius: 10, objectFit: "cover", flexShrink: 0 }}
                                                    />
                                                )}
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: 600, marginBottom: 2, color: "#222" }}>
                                                        {item.menuItem?.name || "Item"}
                                                    </p>
                                                    <p style={{ color: "#888", fontSize: 13, marginBottom: 0 }}>Qty: {item.quantity}</p>
                                                </div>
                                                <span style={{ fontWeight: 700, color: primaryColor }}>
                                                    Rs. {(Number(item.price) * item.quantity).toFixed(0)}
                                                </span>
                                            </div>
                                        ))}

                                        {/* Totals */}
                                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "2px solid #f0f0f0" }}>
                                            {order.deliveryCharge > 0 && (
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#666" }}>
                                                    <span>Delivery Charge</span>
                                                    <span>Rs. {Number(order.deliveryCharge).toFixed(0)}</span>
                                                </div>
                                            )}
                                            {order.payment && (
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "#666" }}>
                                                    <span>Payment</span>
                                                    <span>{PAYMENT_METHOD_LABELS[order.payment.method] || order.payment.method}</span>
                                                </div>
                                            )}
                                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
                                                <span>Total</span>
                                                <span style={{ color: primaryColor }}>Rs. {Number(order.total).toFixed(0)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery Info */}
                                    {order.deliveryAddress && (
                                        <div style={{
                                            background: "#fff", borderRadius: "20px", padding: "28px",
                                            boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
                                        }}>
                                            <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 16 }}>Delivery Details</h5>
                                            <div style={{ display: "flex", gap: 12 }}>
                                                <span style={{ fontSize: 24, flexShrink: 0 }}>📍</span>
                                                <div>
                                                    <p style={{ fontWeight: 600, marginBottom: 4 }}>{order.deliveryAddress}</p>
                                                    {order.branch && (
                                                        <p style={{ color: "#888", fontSize: 13, marginBottom: 0 }}>
                                                            Prepared at: {order.branch.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {order.rider && (
                                                <div style={{
                                                    marginTop: 16, padding: "12px 16px",
                                                    background: "#f8f9fa", borderRadius: 12,
                                                    display: "flex", alignItems: "center", gap: 12
                                                }}>
                                                    <span style={{ fontSize: 28 }}>🛵</span>
                                                    <div>
                                                        <p style={{ fontWeight: 600, marginBottom: 2 }}>Your Rider: {order.rider.name}</p>
                                                        {order.rider.phone && (
                                                            <a href={`tel:${order.rider.phone}`} style={{ color: primaryColor, fontSize: 13 }}>
                                                                Call: {order.rider.phone}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Review (if delivered and no review yet) */}
                                    {order.status === "DELIVERED" && !order.review && (
                                        <div style={{
                                            background: `linear-gradient(135deg, ${primaryColor}10, ${primaryColor}05)`,
                                            border: `1px solid ${primaryColor}30`,
                                            borderRadius: "20px", padding: "28px",
                                            boxShadow: "0 4px 24px rgba(0,0,0,0.05)"
                                        }}>
                                            <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 8 }}>How was your experience?</h5>
                                            <p style={{ color: "#666", marginBottom: 0 }}>
                                                Log in and head to <strong>My Account</strong> to leave a review for this order.
                                            </p>
                                        </div>
                                    )}

                                    {/* Auto-refresh notice */}
                                    {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                                        <p style={{ textAlign: "center", color: "#aaa", fontSize: 12 }}>
                                            🔄 Status updates automatically every 30 seconds
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrackOrder;
