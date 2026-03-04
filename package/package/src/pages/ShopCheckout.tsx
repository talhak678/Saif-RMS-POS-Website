import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import LocationPicker from "../elements/LocationPicker";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const BASE_URL = "https://saif-rms-pos-backend.vercel.app";

// Initialize Stripe once (outside component)
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

// ─── Inner checkout form wrapped by Stripe Elements ───────────────────────────
const CheckoutForm = () => {
  const { cartItems, user, setShowSignInForm, activeBranch, clearCart, cmsConfig } = useContext(Context);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [deliveryCoords, setDeliveryCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<any>(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [orderType, setOrderType] = useState<"DELIVERY" | "PICKUP">("PICKUP");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "CASH"
  });

  // Load from Storage & Context Sync
  useEffect(() => {
    // 1. Sync User info
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || prev.phone,
      }));
    }

    // 2. Sync from Modal (localStorage)
    const savedType = localStorage.getItem("orderType");
    if (savedType === "DELIVERY" || savedType === "PICKUP") {
      setOrderType(savedType);
    }

    const savedPhone = localStorage.getItem("userPhone");
    if (savedPhone) setFormData(prev => ({ ...prev, phone: savedPhone }));

    const savedLoc = localStorage.getItem("userLocation");
    if (savedLoc) {
      try {
        const parsed = JSON.parse(savedLoc);
        if (parsed.value) setSelectedBranchId(parsed.value);
        if (parsed.label) setFormData(prev => ({ ...prev, address: parsed.label }));
      } catch (e) { }
    }
  }, [user]);

  // Use branch selection from local state or first branch from context
  const branches = cmsConfig?.branches || [];
  const currentBranch = branches.find((b: any) => b.id === selectedBranchId) || branches[0] || activeBranch;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "");
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setFormData(prev => ({ ...prev, address }));
    setDeliveryCoords({ lat, lng });
    setShowMap(false);
  };

  // Pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = orderType === "DELIVERY" && cartItems.length > 0 ? (currentBranch?.deliveryCharge || 0) : 0;
  const tax = subtotal * 0.05;
  const discountAmount = appliedDiscount?.discountAmount || 0;
  const total = Math.max(0, subtotal + Number(deliveryCharge) + tax - discountAmount);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) { toast.error("Please enter a discount code"); return; }
    const restaurantId = cmsConfig?.restaurantId;
    if (!restaurantId) { toast.error("Restaurant config not loaded"); return; }
    setDiscountLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/marketing/discounts/validate`, {
        code: discountCode.trim(), restaurantId, subtotal
      });
      if (res.data?.success) {
        setAppliedDiscount(res.data.data);
        toast.success(`🎉 Discount applied! Save $ ${res.data.data.discountAmount?.toFixed(0)}`);
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
    if (!user) { toast.error("Please sign in first"); setShowSignInForm(true); return; }
    if (cartItems.length === 0) { toast.error("Your cart is empty"); return; }
    if (orderType === "DELIVERY" && !formData.address) { toast.error("Please enter delivery address"); return; }
    if (formData.paymentMethod === "STRIPE" && (!stripe || !elements)) { toast.error("Stripe not ready"); return; }

    setLoading(true);
    try {
      const payload = {
        branchId: currentBranch?.id,
        type: orderType,
        items: cartItems.map(i => ({ menuItemId: i.id, quantity: i.quantity, price: i.price })),
        paymentMethod: formData.paymentMethod,
        total,
        deliveryAddress: orderType === "DELIVERY" ? `${formData.address}${formData.city ? ", " + formData.city : ""}` : "Pickup",
        deliveryCharge: orderType === "DELIVERY" ? Number(deliveryCharge) : 0,
        deliveryLat: deliveryCoords?.lat,
        deliveryLng: deliveryCoords?.lng,
        discountCode: appliedDiscount ? discountCode : undefined,
        notes: formData.notes
      };

      // 1. Create Order
      const res = await axios.post(`${BASE_URL}/api/customers/orders`, payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (!res.data?.success) { toast.error(res.data?.message || "Order failed"); setLoading(false); return; }
      const order = res.data.data;

      // 2. Stripe Payment (if selected)
      if (formData.paymentMethod === "STRIPE" && stripe && elements) {
        const intentRes = await axios.post(`${BASE_URL}/api/stripe-intent`, {
          orderId: order.id, amount: total
        }, { headers: { Authorization: `Bearer ${user.token}` } });

        if (intentRes.data?.success) {
          const cardEl = elements.getElement(CardElement);
          if (!cardEl) throw new Error("Card element missing");

          const { error, paymentIntent } = await stripe.confirmCardPayment(intentRes.data.data.clientSecret, {
            payment_method: {
              card: cardEl,
              billing_details: { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, phone: formData.phone }
            }
          });

          if (error) { toast.error(error.message || "Payment failed"); setLoading(false); return; }
          if (paymentIntent?.status === "succeeded") toast.success("✅ Payment successful!");
        }
      }

      clearCart();
      toast.success("🎉 Order placed successfully!");
      navigate("/order-success", { state: { order } });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const btnStyle = (active: boolean) => ({
    flex: 1, padding: "14px", borderRadius: 12, border: `2px solid ${active ? primaryColor : "#e0e0e0"}`,
    background: active ? primaryColor + "15" : "#fff",
    color: active ? primaryColor : "#888",
    fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
  });

  const cardStyle = { background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 20 };

  return (
    <form onSubmit={handlePlaceOrder}>
      <div className="row">
        {/* LEFT COLUMN */}
        <div className="col-lg-7">
          {/* Order Type & Branch */}
          <div style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 0 }}>Order Options</h5>
              {branches.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#666" }}>Pickup Branch:</span>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: "auto", borderRadius: 8 }}
                    value={currentBranch?.id}
                    onChange={(e) => setSelectedBranchId(e.target.value)}
                  >
                    {branches.map((b: any) => (<option key={b.id} value={b.id}>{b.name}</option>))}
                  </select>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {(["DELIVERY", "PICKUP"] as const).map(t => (
                <button key={t} type="button" style={btnStyle(orderType === t)} onClick={() => setOrderType(t)}>
                  {t === "DELIVERY" ? "🚚 Delivery" : "🏪 Pickup"}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div style={cardStyle}>
            <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 20 }}>Contact Details</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">First Name *</label>
                <input name="firstName" required className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Last Name</label>
                <input name="lastName" className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.lastName} onChange={handleChange} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email *</label>
              <input name="email" type="email" required className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-0">
              <label className="form-label fw-semibold">Phone *</label>
              <input name="phone" type="tel" required className="form-control" style={{ borderRadius: 10, height: 46 }} value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          {/* Delivery Address */}
          {orderType === "DELIVERY" && (
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 0 }}>Delivery Address</h5>
                <button type="button" style={{ background: "none", border: "none", color: primaryColor, fontWeight: 600, fontSize: 13, cursor: "pointer" }} onClick={() => setShowMap(true)}>📍 Pick on Map</button>
              </div>
              <textarea name="address" required className="form-control mb-3" rows={3} style={{ borderRadius: 10 }} placeholder="House #, Street name, Area" value={formData.address} onChange={handleChange} />
              <input name="city" required className="form-control" style={{ borderRadius: 10, height: 46 }} placeholder="City" value={formData.city} onChange={handleChange} />
            </div>
          )}

          {/* Notes */}
          <div style={cardStyle}>
            <label className="form-label fw-semibold">Order Notes (Optional)</label>
            <textarea name="notes" className="form-control" rows={2} style={{ borderRadius: 10 }} placeholder="Any special instructions..." value={formData.notes} onChange={handleChange} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg-5">
          <div style={{ ...cardStyle, position: "sticky", top: 90 }}>
            {/* Cart Items */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h5 style={{ fontWeight: 700, color: "#222", marginBottom: 0 }}>Your Order</h5>
              <Link to="/shop-cart" style={{ color: primaryColor, fontSize: 13, fontWeight: 600 }}>← Edit Cart</Link>
            </div>

            <div style={{ maxHeight: 220, overflowY: "auto", marginBottom: 16 }}>
              {cartItems.length === 0 && <p style={{ color: "#aaa", textAlign: "center", padding: "16px 0" }}>Cart is empty</p>}
              {cartItems.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                  {item.image && <img src={item.image} alt={item.name} style={{ width: 42, height: 42, borderRadius: 8, objectFit: "cover" }} />}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, marginBottom: 0, color: "#222" }}>{item.name}</p>
                    <span style={{ color: "#aaa", fontSize: 12 }}>×{item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>$ {(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            {/* Discount */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, display: "block" }}>🏷️ Promo Code</label>
              {appliedDiscount ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#E8F5E9", borderRadius: 10, padding: "10px 14px" }}>
                  <span style={{ color: "#2E7D32", fontWeight: 600, fontSize: 13 }}>✅ -{appliedDiscount.code} (- $ {Number(appliedDiscount.discountAmount).toFixed(0)})</span>
                  <button type="button" onClick={() => { setAppliedDiscount(null); setDiscountCode(""); }} style={{ background: "none", border: "none", color: "#c62828", cursor: "pointer", fontSize: 18 }}>×</button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <input className="form-control" style={{ borderRadius: 10, height: 42, flex: 1 }} placeholder="Enter code" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} />
                  <button type="button" onClick={handleApplyDiscount} disabled={discountLoading} style={{ padding: "0 16px", height: 42, borderRadius: 10, background: primaryColor, color: "#fff", border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                    {discountLoading ? "..." : "Apply"}
                  </button>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div style={{ background: "#f8f9fa", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              {[
                { label: "Subtotal", value: `$ ${subtotal.toFixed(0)}` },
                ...(orderType === "DELIVERY" ? [{ label: "Delivery", value: Number(deliveryCharge) === 0 ? "FREE" : `$ ${Number(deliveryCharge).toFixed(0)}` }] : []),
                { label: "Tax (5%)", value: `$ ${tax.toFixed(0)}` },
                ...(discountAmount > 0 ? [{ label: "Discount", value: `- $ ${discountAmount.toFixed(0)}` }] : []),
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "#555" }}>
                  <span>{row.label}</span>
                  <span style={row.label === "Discount" ? { color: "#4CAF50", fontWeight: 600 } : {}}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, borderTop: "2px solid #e0e0e0", fontWeight: 700, fontSize: 16 }}>
                <span>Total</span>
                <span style={{ color: primaryColor }}>$ {total.toFixed(0)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, fontSize: 13, display: "block", marginBottom: 10 }}>💳 Payment Method</label>
              {[
                { value: "CASH", label: "💵 Cash on Delivery", desc: "Pay at your doorstep" },
                { value: "STRIPE", label: "💳 Pay by Card", desc: "Secure online payment via Stripe" },
              ].map(pay => (
                <label key={pay.value} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  border: `2px solid ${formData.paymentMethod === pay.value ? primaryColor : "#e0e0e0"}`,
                  borderRadius: 10, cursor: "pointer", marginBottom: 8,
                  background: formData.paymentMethod === pay.value ? primaryColor + "08" : "#fff"
                }}>
                  <input type="radio" name="paymentMethod" value={pay.value} checked={formData.paymentMethod === pay.value} onChange={handleChange} style={{ accentColor: primaryColor }} />
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 0 }}>{pay.label}</p>
                    <p style={{ color: "#999", fontSize: 12, marginBottom: 0 }}>{pay.desc}</p>
                  </div>
                </label>
              ))}

              {/* Stripe Card Element */}
              {formData.paymentMethod === "STRIPE" && (
                <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 10, background: "#fdfdfd", marginTop: 4 }}>
                  <CardElement options={{
                    style: { base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } }, invalid: { color: "#9e2146" } },
                    hidePostalCode: true
                  }} />
                </div>
              )}
            </div>

            {/* Place Order */}
            <button
              type="submit"
              className="w-100"
              disabled={loading || cartItems.length === 0}
              style={{
                height: 52, borderRadius: 14, fontWeight: 700, fontSize: 16,
                background: cartItems.length === 0 ? "#ccc" : `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                color: "#fff", border: "none", cursor: cartItems.length === 0 ? "not-allowed" : "pointer",
                boxShadow: cartItems.length > 0 ? `0 8px 20px ${primaryColor}40` : "none",
                transition: "all 0.2s"
              }}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" />Processing...</>
              ) : (
                `🍽️ Place Order — $ ${total.toFixed(0)}`
              )}
            </button>

            <p style={{ textAlign: "center", color: "#bbb", fontSize: 11, marginTop: 10, marginBottom: 0 }}>
              🔒 Secure & encrypted checkout
            </p>
          </div>
        </div>
      </div>

      {/* Map Modal */}
      <Modal show={showMap} onHide={() => setShowMap(false)} size="lg" centered>
        <Modal.Header closeButton><Modal.Title>Select Delivery Location</Modal.Title></Modal.Header>
        <Modal.Body>
          <LocationPicker onLocationSelect={handleLocationSelect} initialLat={currentBranch?.lat} initialLng={currentBranch?.lng} />
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-primary" onClick={() => setShowMap(false)}>Confirm Location</button>
        </Modal.Footer>
      </Modal>
    </form >
  );
};

// ─── Main Page ──────────────────────────────────────────────────────────────
const ShopCheckout = () => {
  const { user, setShowSignInForm, cmsConfig } = useContext(Context);
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  return (
    <div className="page-content bg-white">
      <section className="content-inner" style={{ background: "#f8f9fa", paddingTop: '100px' }}>
        <div className="container">
          {/* Sign-in nudge */}
          {!user && (
            <div style={{
              background: "linear-gradient(135deg,#FFF9C4,#FFFDE7)", border: "1px solid #FFE082",
              borderRadius: 16, padding: "16px 24px", marginBottom: 24,
              display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12
            }}>
              <div>
                <p style={{ fontWeight: 600, color: "#F57F17", marginBottom: 2 }}>👋 Sign in to complete your order</p>
                <p style={{ color: "#888", fontSize: 13, marginBottom: 0 }}>Save your details & track order history</p>
              </div>
              <button className="btn btn-sm" style={{ borderRadius: 10, background: primaryColor, color: "#fff" }}
                onClick={() => setShowSignInForm(true)}>Sign In / Register</button>
            </div>
          )}

          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </section>
    </div>
  );
};

export default ShopCheckout;
