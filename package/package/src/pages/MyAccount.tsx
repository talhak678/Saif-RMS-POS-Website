import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/AppContext";
import CommonBanner from "../elements/CommonBanner";
import { IMAGES } from "../constent/theme";
import toast from "react-hot-toast";

const BASE_URL = "https://saif-rms-pos-backend.vercel.app";

const STATUS_COLORS: Record<string, string> = {
    PENDING: "#FF9800",
    CONFIRMED: "#2196F3",
    PREPARING: "#9C27B0",
    KITCHEN_READY: "#FF5722",
    OUT_FOR_DELIVERY: "#FF6B35",
    DELIVERED: "#4CAF50",
    CANCELLED: "#f44336",
};

const STATUS_ICONS: Record<string, string> = {
    PENDING: "⏳",
    CONFIRMED: "✅",
    PREPARING: "👨‍🍳",
    KITCHEN_READY: "🍽️",
    OUT_FOR_DELIVERY: "🛵",
    DELIVERED: "🎉",
    CANCELLED: "❌",
};

type TabType = "orders" | "profile" | "reviews";

const MyAccount = () => {
    const { user, setUser, setShowSignInForm, addToCart, cmsConfig } = useContext(Context);
    const [activeTab, setActiveTab] = useState<TabType>("orders");
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [reviewModal, setReviewModal] = useState<{ orderId: string; orderNo: number } | null>(null);
    const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: user?.name || "", phone: user?.phone || "" });
    const [savingProfile, setSavingProfile] = useState(false);

    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";

    useEffect(() => {
        if (user && activeTab === "orders") {
            fetchOrders();
        }
    }, [user, activeTab]);

    useEffect(() => {
        if (user) {
            setProfileForm({ name: user.name || "", phone: user.phone || "" });
        }
    }, [user]);

    const fetchOrders = async () => {
        if (!user?.token) return;
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}/api/customers/orders`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (res.data?.success) {
                setOrders(res.data.data);
            }
        } catch (err: any) {
            toast.error("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const handleReorder = (order: any) => {
        order.items?.forEach((item: any) => {
            addToCart({
                id: item.menuItemId || item.menuItem?.id,
                name: item.menuItem?.name || "Item",
                price: Number(item.price),
                image: item.menuItem?.image || null,
                quantity: item.quantity
            });
        });
        toast.success(`${order.items?.length} items added to cart!`);
    };

    const handleSubmitReview = async () => {
        if (!reviewModal) return;
        setSubmittingReview(true);
        try {
            const res = await axios.post(`${BASE_URL}/api/customers/reviews`, {
                orderId: reviewModal.orderId,
                rating: reviewData.rating,
                comment: reviewData.comment
            }, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            if (res.data?.success) {
                toast.success("Review submitted! Thank you 🎉");
                setReviewModal(null);
                setReviewData({ rating: 5, comment: "" });
                fetchOrders(); // Refresh to show review
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to submit review");
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleSaveProfile = async () => {
        setSavingProfile(true);
        try {
            // Update locally for now (extend with API call if profile update endpoint exists)
            const updatedUser = { ...user, name: profileForm.name, phone: profileForm.phone };
            setUser(updatedUser);
            toast.success("Profile updated!");
        } catch {
            toast.error("Failed to update profile");
        } finally {
            setSavingProfile(false);
        }
    };

    const handleLogout = () => {
        setUser(null);
        toast.success("Logged out successfully");
    };

    if (!user) {
        return (
            <div className="page-content bg-white">
                <CommonBanner img={IMAGES.images_bnr3} title="My Account" subtitle="My Account" />
                <section className="content-inner" style={{ background: "#f8f9fa" }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center py-5">
                                <div style={{ fontSize: 60, marginBottom: 20 }}>👤</div>
                                <h3 style={{ color: "#222", marginBottom: 12 }}>Please Sign In</h3>
                                <p style={{ color: "#666", marginBottom: 24 }}>
                                    Sign in to view your order history, track orders, and manage your account.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: "12px 32px", borderRadius: 12, fontWeight: 600 }}
                                    onClick={() => setShowSignInForm(true)}
                                >
                                    Sign In / Register
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="page-content bg-white">
            <CommonBanner img={IMAGES.images_bnr3} title="My Account" subtitle="My Account" />

            <section className="content-inner" style={{ background: "#f8f9fa" }}>
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-lg-3 mb-4">
                            <div style={{
                                background: "#fff", borderRadius: "20px", padding: "28px",
                                boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
                            }}>
                                {/* User Avatar */}
                                <div style={{ textAlign: "center", marginBottom: 24 }}>
                                    <div style={{
                                        width: 80, height: 80, borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 32, marginBottom: 12,
                                        boxShadow: `0 8px 24px ${primaryColor}30`
                                    }}>
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 4 }}>{user.name}</h5>
                                    <p style={{ color: "#888", fontSize: 13, marginBottom: 0 }}>{user.email}</p>
                                </div>

                                {/* Nav Tabs */}
                                {(["orders", "profile"] as TabType[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            width: "100%", textAlign: "left", padding: "12px 16px",
                                            borderRadius: 12, border: "none", cursor: "pointer",
                                            background: activeTab === tab ? primaryColor + "15" : "transparent",
                                            color: activeTab === tab ? primaryColor : "#555",
                                            fontWeight: activeTab === tab ? 700 : 500,
                                            fontSize: 14, marginBottom: 4, transition: "all 0.2s",
                                            display: "flex", alignItems: "center", gap: 10,
                                            borderLeft: activeTab === tab ? `3px solid ${primaryColor}` : "3px solid transparent"
                                        }}
                                    >
                                        {tab === "orders" ? "📦 " : "👤 "}
                                        {tab === "orders" ? "My Orders" : "My Profile"}
                                    </button>
                                ))}

                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: "100%", marginTop: 12, padding: "12px 16px",
                                        borderRadius: 12, border: "1px solid #ffcdd2",
                                        background: "#fff5f5", color: "#c62828",
                                        fontWeight: 600, cursor: "pointer", fontSize: 14,
                                        display: "flex", alignItems: "center", gap: 10
                                    }}
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-lg-9">

                            {/* Orders Tab */}
                            {activeTab === "orders" && (
                                <div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                        <h4 style={{ fontWeight: 700, color: "#222", marginBottom: 0 }}>My Orders</h4>
                                        <button
                                            onClick={fetchOrders}
                                            style={{
                                                background: "transparent", border: `1px solid ${primaryColor}`,
                                                color: primaryColor, padding: "6px 16px", borderRadius: 8,
                                                cursor: "pointer", fontSize: 13, fontWeight: 600
                                            }}
                                        >
                                            🔄 Refresh
                                        </button>
                                    </div>

                                    {loading ? (
                                        <div style={{ textAlign: "center", padding: "60px 20px" }}>
                                            <div className="spinner-border" style={{ color: primaryColor }} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p style={{ color: "#888", marginTop: 16 }}>Loading your orders...</p>
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div style={{
                                            background: "#fff", borderRadius: "20px", padding: "60px 20px",
                                            textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
                                        }}>
                                            <div style={{ fontSize: 60, marginBottom: 16 }}>🛍️</div>
                                            <h5 style={{ color: "#222", marginBottom: 12 }}>No Orders Yet</h5>
                                            <p style={{ color: "#888", marginBottom: 24 }}>
                                                You haven't placed any orders yet. Explore our menu to get started!
                                            </p>
                                            <Link to="/our-menu-2" className="btn btn-primary" style={{ borderRadius: 12, padding: "10px 24px" }}>
                                                Browse Menu
                                            </Link>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                            {orders.map((order) => (
                                                <div key={order.id} style={{
                                                    background: "#fff", borderRadius: "20px", padding: "24px",
                                                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                                                    border: "1px solid rgba(0,0,0,0.04)"
                                                }}>
                                                    {/* Order Header */}
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
                                                        <div>
                                                            <h6 style={{ fontWeight: 700, color: "#222", marginBottom: 4 }}>
                                                                Order #{order.orderNo}
                                                            </h6>
                                                            <p style={{ color: "#aaa", fontSize: 12, marginBottom: 0 }}>
                                                                {new Date(order.createdAt).toLocaleDateString("en-PK", {
                                                                    year: "numeric", month: "short", day: "numeric",
                                                                    hour: "2-digit", minute: "2-digit"
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div style={{
                                                            padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                                                            background: (STATUS_COLORS[order.status] || "#999") + "20",
                                                            color: STATUS_COLORS[order.status] || "#999",
                                                            display: "flex", alignItems: "center", gap: 4
                                                        }}>
                                                            {STATUS_ICONS[order.status] || "•"} {order.status?.replace(/_/g, " ")}
                                                        </div>
                                                    </div>

                                                    {/* Items Preview */}
                                                    <div style={{ paddingBottom: 16, borderBottom: "1px solid #f5f5f5" }}>
                                                        {order.items?.slice(0, 3).map((item: any, idx: number) => (
                                                            <div key={idx} style={{
                                                                display: "flex", justifyContent: "space-between",
                                                                padding: "4px 0", fontSize: 14
                                                            }}>
                                                                <span style={{ color: "#444" }}>
                                                                    {item.menuItem?.name || "Item"} × {item.quantity}
                                                                </span>
                                                                <span style={{ fontWeight: 600, color: "#444" }}>
                                                                    Rs. {(Number(item.price) * item.quantity).toFixed(0)}
                                                                </span>
                                                            </div>
                                                        ))}
                                                        {order.items?.length > 3 && (
                                                            <p style={{ color: "#aaa", fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                                                                +{order.items.length - 3} more items
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Total + Actions */}
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, flexWrap: "wrap", gap: 10 }}>
                                                        <div>
                                                            <span style={{ color: "#888", fontSize: 13 }}>Total: </span>
                                                            <span style={{ fontWeight: 700, fontSize: 16, color: primaryColor }}>
                                                                Rs. {Number(order.total).toFixed(0)}
                                                            </span>
                                                            {order.branch && (
                                                                <span style={{ color: "#aaa", fontSize: 12, marginLeft: 12 }}>
                                                                    {order.branch.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div style={{ display: "flex", gap: 8 }}>
                                                            <Link
                                                                to="/track-order"
                                                                state={{ orderNo: order.orderNo }}
                                                                style={{
                                                                    padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                                                                    background: primaryColor + "15", color: primaryColor,
                                                                    border: `1px solid ${primaryColor}30`, textDecoration: "none"
                                                                }}
                                                            >
                                                                Track
                                                            </Link>
                                                            <button
                                                                onClick={() => handleReorder(order)}
                                                                style={{
                                                                    padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                                                                    background: primaryColor, color: "#fff", border: "none", cursor: "pointer"
                                                                }}
                                                            >
                                                                Reorder
                                                            </button>
                                                            {order.status === "DELIVERED" && !order.review && (
                                                                <button
                                                                    onClick={() => setReviewModal({ orderId: order.id, orderNo: order.orderNo })}
                                                                    style={{
                                                                        padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                                                                        background: "#FFF9C4", color: "#F57F17", border: "1px solid #FFE082",
                                                                        cursor: "pointer"
                                                                    }}
                                                                >
                                                                    ⭐ Review
                                                                </button>
                                                            )}
                                                            {order.review && (
                                                                <div style={{
                                                                    padding: "8px 14px", borderRadius: 8, fontSize: 12,
                                                                    background: "#E8F5E9", color: "#388E3C",
                                                                    display: "flex", alignItems: "center", gap: 4
                                                                }}>
                                                                    {"⭐".repeat(order.review.rating)} Reviewed
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Profile Tab */}
                            {activeTab === "profile" && (
                                <div style={{
                                    background: "#fff", borderRadius: "20px", padding: "32px",
                                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
                                }}>
                                    <h4 style={{ fontWeight: 700, color: "#222", marginBottom: 24 }}>My Profile</h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                        <div>
                                            <label className="form-label" style={{ fontWeight: 600 }}>Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ borderRadius: 10, height: 48 }}
                                                value={profileForm.name}
                                                onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label" style={{ fontWeight: 600 }}>Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                style={{ borderRadius: 10, height: 48, background: "#f8f9fa" }}
                                                value={user.email}
                                                disabled
                                            />
                                            <p style={{ color: "#aaa", fontSize: 12, marginTop: 4 }}>Email cannot be changed</p>
                                        </div>
                                        <div>
                                            <label className="form-label" style={{ fontWeight: 600 }}>Phone Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                style={{ borderRadius: 10, height: 48 }}
                                                placeholder="Enter your phone number"
                                                value={profileForm.phone}
                                                onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            onClick={handleSaveProfile}
                                            disabled={savingProfile}
                                            className="btn btn-primary"
                                            style={{ borderRadius: 12, height: 48, fontWeight: 600, fontSize: 15, maxWidth: 200 }}
                                        >
                                            {savingProfile ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>

                                    {/* Stats */}
                                    <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #f0f0f0" }}>
                                        <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 16 }}>Account Stats</h5>
                                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                                            {[
                                                { label: "Total Orders", value: orders.length, icon: "📦" },
                                                { label: "Delivered", value: orders.filter(o => o.status === "DELIVERED").length, icon: "✅" },
                                                { label: "Loyalty Points", value: user.loyaltyPoints || 0, icon: "⭐" },
                                            ].map((stat, i) => (
                                                <div key={i} style={{
                                                    flex: 1, minWidth: 130, padding: "16px 20px",
                                                    background: primaryColor + "08", borderRadius: 14,
                                                    border: `1px solid ${primaryColor}20`,
                                                    textAlign: "center"
                                                }}>
                                                    <p style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</p>
                                                    <h4 style={{ fontWeight: 800, color: primaryColor, marginBottom: 4 }}>{stat.value}</h4>
                                                    <p style={{ color: "#888", fontSize: 12, marginBottom: 0 }}>{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Review Modal */}
            {reviewModal && (
                <div style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
                    zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "16px"
                }}>
                    <div style={{
                        background: "#fff", borderRadius: "20px", padding: "32px",
                        maxWidth: 480, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
                    }}>
                        <h4 style={{ fontWeight: 700, color: "#222", marginBottom: 8 }}>Rate Your Experience</h4>
                        <p style={{ color: "#888", marginBottom: 24 }}>Order #{reviewModal.orderNo}</p>

                        {/* Star Rating */}
                        <div style={{ marginBottom: 24 }}>
                            <label className="form-label" style={{ fontWeight: 600, display: "block", marginBottom: 12 }}>
                                Your Rating
                            </label>
                            <div style={{ display: "flex", gap: 8 }}>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                                        style={{
                                            width: 44, height: 44, borderRadius: "50%", border: "2px solid",
                                            borderColor: star <= reviewData.rating ? primaryColor : "#e0e0e0",
                                            background: star <= reviewData.rating ? primaryColor : "#fff",
                                            cursor: "pointer", fontSize: 18, transition: "all 0.2s",
                                            display: "flex", alignItems: "center", justifyContent: "center"
                                        }}
                                    >
                                        <span style={{ color: star <= reviewData.rating ? "#fff" : "#ccc" }}>★</span>
                                    </button>
                                ))}
                            </div>
                            <p style={{ color: "#888", fontSize: 13, marginTop: 8 }}>
                                {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][reviewData.rating]}
                            </p>
                        </div>

                        <div style={{ marginBottom: 24 }}>
                            <label className="form-label" style={{ fontWeight: 600 }}>Comment (optional)</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                style={{ borderRadius: 10 }}
                                placeholder="Tell us about your experience..."
                                value={reviewData.comment}
                                onChange={e => setReviewData({ ...reviewData, comment: e.target.value })}
                            />
                        </div>

                        <div style={{ display: "flex", gap: 12 }}>
                            <button
                                onClick={() => setReviewModal(null)}
                                style={{
                                    flex: 1, padding: "12px", borderRadius: 12, border: "1px solid #e0e0e0",
                                    background: "#f8f9fa", cursor: "pointer", fontWeight: 600
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                disabled={submittingReview}
                                className="btn btn-primary"
                                style={{ flex: 1, borderRadius: 12, fontWeight: 600 }}
                            >
                                {submittingReview ? "Submitting..." : "Submit Review"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAccount;
