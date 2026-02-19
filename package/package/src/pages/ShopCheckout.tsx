import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import LocationPicker from "../elements/LocationPicker";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const BASE_URL = "https://saif-rms-pos-backend.vercel.app";

const ShopCheckout = () => {
  const { cartItems, user, setShowSignInForm, activeBranch, clearCart, cmsConfig } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [orderType, setOrderType] = useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const navigate = useNavigate();

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "CASH"
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || prev.firstName,
        lastName: user.name?.split(" ")[1] || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setFormData(prev => ({ ...prev, address }));
    setDeliveryCoords({ lat, lng });
    setShowMap(false);
  };

  // Pricing calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = orderType === "DELIVERY" && cartItems.length > 0
    ? (activeBranch?.deliveryCharge || 0)
    : 0;
  const tax = subtotal * 0.05;
  const discountAmount = appliedDiscount?.discountAmount || 0;
  const total = Math.max(0, subtotal + Number(deliveryCharge) + tax - discountAmount);

  // Check if delivery is available based on branch delivery off time
  const isDeliveryAvailable = () => {
    if (!activeBranch?.deliveryOffTime) return true;
    const now = new Date();
    const [offHour, offMin] = activeBranch.deliveryOffTime.split(":").map(Number);
    const offTime = new Date();
    offTime.setHours(offHour, offMin, 0, 0);
    return now < offTime;
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code");
      return;
    }

    const restaurantId = cmsConfig?.restaurantId;
    if (!restaurantId) {
      toast.error("Restaurant config not loaded");
      return;
    }

    setDiscountLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/marketing/discounts/validate`, {
        code: discountCode.trim(),
        restaurantId,
        subtotal
      });
      if (res.data?.success) {
        setAppliedDiscount(res.data.data);
        toast.success(`🎉 Discount applied! You save Rs. ${res.data.data.discountAmount?.toFixed(0)}`);
      } else {
        toast.error(res.data?.message || "Invalid discount code");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Invalid or expired discount code");
    } finally {
      setDiscountLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to place an order.");
      setShowSignInForm(true);
      return;
    }

    if (!user.token) {
      toast.error("Session expired. Please sign in again.");
      setShowSignInForm(true);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (orderType === "DELIVERY") {
      if (!isDeliveryAvailable()) {
        toast.error(`Delivery is not available after ${activeBranch?.deliveryOffTime}. Please choose pickup or order tomorrow.`);
        return;
      }
      if (!formData.address) {
        toast.error("Please enter a delivery address.");
        return;
      }
    }

    setLoading(true);
    try {
      const payload = {
        branchId: activeBranch?.id,
        type: orderType,
        items: cartItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        paymentMethod: formData.paymentMethod,
        total: total,
        deliveryAddress: orderType === "DELIVERY"
          ? `${formData.address}${formData.city ? ", " + formData.city : ""}`
          : "Pickup",
        deliveryCharge: orderType === "DELIVERY" ? Number(deliveryCharge) : 0,
        deliveryLat: deliveryCoords?.lat,
        deliveryLng: deliveryCoords?.lng,
        discountCode: appliedDiscount ? discountCode : undefined,
        notes: formData.notes
      };

      const res = await axios.post(`${BASE_URL}/api/customers/orders`, payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (res.data?.success) {
        clearCart();
        toast.success("🎉 Order placed successfully!");
        navigate("/order-success", { state: { order: res.data.data } });
      } else {
        toast.error(res.data?.message || "Order failed.");
      }
    } catch (error: any) {
      console.error("Order Error:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const deliveryNotAvailable = orderType === "DELIVERY" && !isDeliveryAvailable();

  return (
    <div className="page-content bg-white">
      <CommonBanner img={IMAGES.images_bnr3} title="Checkout" subtitle="Checkout" />

      <section className="content-inner" style={{ background: "#f8f9fa" }}>
        <div className="container">
          {/* Not logged in banner */}
          {!user && (
            <div style={{
              background: "linear-gradient(135deg, #FFF9C4, #FFFDE7)",
              border: "1px solid #FFE082",
              borderRadius: "16px", padding: "16px 24px",
              marginBottom: 28, display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: 12
            }}>
              <div>
                <p style={{ fontWeight: 600, color: "#F57F17", marginBottom: 2 }}>👋 Sign in to complete your order</p>
                <p style={{ color: "#888", fontSize: 13, marginBottom: 0 }}>
                  Save your details and view order history
                </p>
              </div>
              <button
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 10 }}
                onClick={() => setShowSignInForm(true)}
              >
                Sign In / Register
              </button>
            </div>
          )}

          {/* Delivery Not Available Warning */}
          {deliveryNotAvailable && (
            <div style={{
              background: "#ffebee", border: "1px solid #ffcdd2", borderRadius: "16px",
              padding: "16px 24px", marginBottom: 24
            }}>
              <p style={{ color: "#c62828", fontWeight: 600, marginBottom: 0 }}>
                ⏰ Delivery is not available after {activeBranch?.deliveryOffTime}.
                Please switch to Pickup or come back tomorrow.
              </p>
            </div>
          )}

          <form onSubmit={handlePlaceOrder}>
            <div className="row" style={{ gap: "0 20px" }}>
              {/* Left: Form */}
              <div className="col-lg-7">
                {/* Order Type Toggle */}
                <div style={{
                  background: "#fff", borderRadius: "20px", padding: "24px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 20
                }}>
                  <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 16 }}>Order Type</h5>
                  <div style={{ display: "flex", gap: 12 }}>
                    {(["DELIVERY", "PICKUP"] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        style={{
                          flex: 1, padding: "14px", borderRadius: 12, border: "2px solid",
                          borderColor: orderType === type ? primaryColor : "#e0e0e0",
                          background: orderType === type ? primaryColor + "10" : "#fff",
                          color: orderType === type ? primaryColor : "#888",
                          cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.2s"
                        }}
                      >
                        {type === "DELIVERY" ? "🚚 Home Delivery" : "🏪 Pickup"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Details */}
                <div style={{
                  background: "#fff", borderRadius: "20px", padding: "24px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 20
                }}>
                  <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 20 }}>Contact Details</h5>
                  <div className="row">
                    <div className="col-md-6 form-group mb-3">
                      <label className="form-label" style={{ fontWeight: 600 }}>First Name *</label>
                      <input name="firstName" required className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                      <label className="form-label" style={{ fontWeight: 600 }}>Last Name</label>
                      <input name="lastName" className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.lastName} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label" style={{ fontWeight: 600 }}>Email *</label>
                    <input name="email" required type="email" className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label" style={{ fontWeight: 600 }}>Phone *</label>
                    <input name="phone" required className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                {/* Delivery Address (only for delivery) */}
                {orderType === "DELIVERY" && (
                  <div style={{
                    background: "#fff", borderRadius: "20px", padding: "24px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 20
                  }}>
                    <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 20 }}>Delivery Address</h5>
                    <div className="form-group mb-3">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <label className="form-label mb-0" style={{ fontWeight: 600 }}>Address *</label>
                        <button
                          type="button"
                          style={{
                            background: "transparent", border: "none", cursor: "pointer",
                            color: primaryColor, fontWeight: 600, fontSize: 13
                          }}
                          onClick={() => setShowMap(true)}
                        >
                          📍 Select on Map
                        </button>
                      </div>
                      <textarea
                        name="address" required={orderType === "DELIVERY"}
                        className="form-control" rows={3}
                        style={{ borderRadius: 10 }}
                        placeholder="House #, Street name, Area"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mb-0">
                      <label className="form-label" style={{ fontWeight: 600 }}>City *</label>
                      <input name="city" required={orderType === "DELIVERY"} className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.city} onChange={handleChange} />
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div style={{
                  background: "#fff", borderRadius: "20px", padding: "24px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 20
                }}>
                  <label className="form-label" style={{ fontWeight: 600 }}>Order Notes (Optional)</label>
                  <textarea
                    name="notes" className="form-control" rows={2}
                    style={{ borderRadius: 10 }}
                    placeholder="Special instructions, e.g. less spicy, extra sauce..."
                    value={formData.notes} onChange={handleChange}
                  />
                </div>
              </div>

              {/* Right: Summary */}
              <div className="col-lg-5">
                {/* Order Summary */}
                <div style={{
                  background: "#fff", borderRadius: "20px", padding: "24px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 20, position: "sticky", top: 100
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 0 }}>Your Order</h5>
                    <Link to="/shop-cart" style={{ color: primaryColor, fontSize: 13, fontWeight: 600 }}>
                      ← Edit Cart
                    </Link>
                  </div>

                  {/* Items */}
                  <div style={{ maxHeight: 260, overflowY: "auto", marginBottom: 16 }}>
                    {cartItems.map((item) => (
                      <div key={item.id} style={{
                        display: "flex", gap: 12, padding: "10px 0",
                        borderBottom: "1px solid #f8f8f8", alignItems: "center"
                      }}>
                        {item.image && (
                          <img src={item.image} alt={item.name}
                            style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, color: "#222" }}>{item.name}</p>
                          <p style={{ color: "#aaa", fontSize: 12, marginBottom: 0 }}>x{item.quantity}</p>
                        </div>
                        <span style={{ fontWeight: 700, color: "#333", fontSize: 13 }}>
                          Rs. {(item.price * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    ))}
                    {cartItems.length === 0 && (
                      <p style={{ textAlign: "center", color: "#aaa", padding: "20px 0" }}>Cart is empty</p>
                    )}
                  </div>

                  {/* Discount Code */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontWeight: 600, fontSize: 13, display: "block", marginBottom: 8 }}>
                      🏷️ Promo / Discount Code
                    </label>
                    {appliedDiscount ? (
                      <div style={{
                        padding: "10px 14px", background: "#E8F5E9", borderRadius: 10,
                        border: "1px solid #A5D6A7", display: "flex", alignItems: "center", justifyContent: "space-between"
                      }}>
                        <span style={{ color: "#2E7D32", fontWeight: 600, fontSize: 13 }}>
                          ✅ {appliedDiscount.code} applied! Save Rs. {Number(appliedDiscount.discountAmount).toFixed(0)}
                        </span>
                        <button
                          type="button"
                          onClick={() => { setAppliedDiscount(null); setDiscountCode(""); }}
                          style={{ background: "none", border: "none", color: "#c62828", cursor: "pointer", fontSize: 16 }}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 8 }}>
                        <input
                          type="text"
                          className="form-control"
                          style={{ borderRadius: 10, height: 42, flex: 1, fontSize: 13 }}
                          placeholder="Enter code"
                          value={discountCode}
                          onChange={e => setDiscountCode(e.target.value.toUpperCase())}
                        />
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          disabled={discountLoading}
                          style={{
                            padding: "0 16px", borderRadius: 10, height: 42,
                            background: primaryColor, color: "#fff", border: "none",
                            cursor: "pointer", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap"
                          }}
                        >
                          {discountLoading ? "..." : "Apply"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bill Summary */}
                  <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "16px", marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                      <span style={{ color: "#666" }}>Subtotal</span>
                      <span>Rs. {subtotal.toFixed(0)}</span>
                    </div>
                    {orderType === "DELIVERY" && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                        <span style={{ color: "#666" }}>Delivery</span>
                        <span>{Number(deliveryCharge) === 0 ? <span style={{ color: "#4CAF50" }}>FREE</span> : `Rs. ${Number(deliveryCharge).toFixed(0)}`}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                      <span style={{ color: "#666" }}>Tax (5%)</span>
                      <span>Rs. {tax.toFixed(0)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                        <span style={{ color: "#4CAF50", fontWeight: 600 }}>Discount</span>
                        <span style={{ color: "#4CAF50", fontWeight: 600 }}>- Rs. {discountAmount.toFixed(0)}</span>
                      </div>
                    )}
                    <div style={{
                      display: "flex", justifyContent: "space-between", paddingTop: 12,
                      marginTop: 8, borderTop: "2px solid #e0e0e0", fontWeight: 700, fontSize: 16
                    }}>
                      <span>Total</span>
                      <span style={{ color: primaryColor }}>Rs. {total.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontWeight: 600, fontSize: 13, display: "block", marginBottom: 10 }}>
                      💳 Payment Method
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { value: "CASH", label: "💵 Cash on Delivery", desc: "Pay when delivered" },
                        // Stripe ready for future
                      ].map(pay => (
                        <label
                          key={pay.value}
                          style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                            border: "2px solid",
                            borderColor: formData.paymentMethod === pay.value ? primaryColor : "#e0e0e0",
                            borderRadius: 10, cursor: "pointer",
                            background: formData.paymentMethod === pay.value ? primaryColor + "08" : "#fff",
                            transition: "all 0.2s"
                          }}
                        >
                          <input
                            type="radio" name="paymentMethod" value={pay.value}
                            checked={formData.paymentMethod === pay.value}
                            onChange={handleChange}
                            style={{ accentColor: primaryColor }}
                          />
                          <div>
                            <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 0 }}>{pay.label}</p>
                            <p style={{ color: "#888", fontSize: 12, marginBottom: 0 }}>{pay.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    className="btn btn-primary w-100"
                    type="submit"
                    style={{
                      borderRadius: 14, height: 52, fontWeight: 700, fontSize: 16,
                      boxShadow: `0 8px 20px ${primaryColor}40`
                    }}
                    disabled={loading || cartItems.length === 0 || deliveryNotAvailable}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      `🍽️ Place Order — Rs. ${total.toFixed(0)}`
                    )}
                  </button>

                  {deliveryNotAvailable && (
                    <p style={{ textAlign: "center", color: "#c62828", fontSize: 12, marginTop: 8, marginBottom: 0 }}>
                      Delivery not available after {activeBranch?.deliveryOffTime}
                    </p>
                  )}

                  <p style={{ textAlign: "center", color: "#aaa", fontSize: 11, marginTop: 10, marginBottom: 0 }}>
                    🔒 Secure checkout — your info is protected
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Location Map Modal */}
      <Modal show={showMap} onHide={() => setShowMap(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Delivery Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocationPicker
            onLocationSelect={handleLocationSelect}
            initialLat={activeBranch?.lat}
            initialLng={activeBranch?.lng}
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => setShowMap(false)}>Confirm Location</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShopCheckout;
