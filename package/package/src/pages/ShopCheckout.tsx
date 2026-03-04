import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import LocationPicker from "../elements/LocationPicker";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CommonBanner from "../elements/CommonBanner";
import { IMAGES } from "../constent/theme";

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
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || prev.phone,
      }));
    }

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

      const res = await axios.post(`${BASE_URL}/api/customers/orders`, payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (!res.data?.success) { toast.error(res.data?.message || "Order failed"); setLoading(false); return; }
      const order = res.data.data;

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

  return (
    <form onSubmit={handlePlaceOrder}>
      <div className="row">
        <div className="col-lg-7">
          <div className="widget billing-details">
            <h4 className="widget-title">Billing Details</h4>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input name="firstName" required className="form-control" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Email Address</label>
                <input name="email" type="email" required className="form-control" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label className="form-label">Phone Number</label>
                <input name="phone" type="tel" required className="form-control" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group col-md-12 mb-3">
                <label className="form-label">Order Type</label>
                <div className="d-flex gap-3 mt-2">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="orderType" id="delivery" checked={orderType === "DELIVERY"} onChange={() => setOrderType("DELIVERY")} />
                    <label className="form-check-label" htmlFor="delivery">Delivery</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="orderType" id="pickup" checked={orderType === "PICKUP"} onChange={() => setOrderType("PICKUP")} />
                    <label className="form-check-label" htmlFor="pickup">Pickup</label>
                  </div>
                </div>
              </div>
              {orderType === "DELIVERY" && (
                <>
                  <div className="form-group col-md-12 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label className="form-label">Delivery Address</label>
                      <button type="button" className="btn-link text-primary" style={{ border: 'none', background: 'none', fontSize: '13px' }} onClick={() => setShowMap(true)}>Pick from Map</button>
                    </div>
                    <textarea name="address" required className="form-control" rows={3} value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="form-group col-md-12 mb-3">
                    <label className="form-label">Town / City</label>
                    <input name="city" required className="form-control" value={formData.city} onChange={handleChange} />
                  </div>
                </>
              )}
              <div className="form-group col-md-12">
                <label className="form-label">Order Notes</label>
                <textarea name="notes" className="form-control" rows={3} placeholder="Notes about your order, e.g. special notes for delivery." value={formData.notes} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="widget-title">
            <h4 className="title">Your Order</h4>
          </div>
          <table className="table-bordered check-tbl">
            <thead>
              <tr>
                <th>Product</th>
                <th>Name</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="product-item-img">
                    <img src={item.image || IMAGES.shop_pic1} alt={item.name} />
                  </td>
                  <td className="product-item-name">
                    {item.name} × {item.quantity}
                  </td>
                  <td className="product-price">
                    {cmsConfig?.config?.currency || '$'} {(item.price * item.quantity).toFixed(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="widget billing-details mt-4">
            <h4 className="widget-title">Order Totals</h4>
            <table className="table-bordered check-tbl">
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td className="product-price">{cmsConfig?.config?.currency || '$'} {subtotal.toFixed(0)}</td>
                </tr>
                {orderType === "DELIVERY" && (
                  <tr>
                    <td>Delivery</td>
                    <td className="product-price">{cmsConfig?.config?.currency || '$'} {Number(deliveryCharge).toFixed(0)}</td>
                  </tr>
                )}
                <tr>
                  <td>Tax (5%)</td>
                  <td className="product-price">{cmsConfig?.config?.currency || '$'} {tax.toFixed(0)}</td>
                </tr>
                {discountAmount > 0 && (
                  <tr>
                    <td>Discount</td>
                    <td className="product-price">-{cmsConfig?.config?.currency || '$'} {discountAmount.toFixed(0)}</td>
                  </tr>
                )}
                <tr className="total">
                  <td><strong>Total</strong></td>
                  <td className="product-price"><strong>{cmsConfig?.config?.currency || '$'} {total.toFixed(0)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="widget billing-details mt-4">
            <h4 className="widget-title">Promo Code</h4>
            {!appliedDiscount ? (
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleApplyDiscount}
                  disabled={discountLoading}
                >
                  {discountLoading ? "..." : "Apply"}
                </button>
              </div>
            ) : (
              <div className="alert alert-success d-flex justify-content-between align-items-center mb-0 p-2 px-3" style={{ borderRadius: '10px' }}>
                <span className="small">Code <strong>{appliedDiscount.code}</strong> Applied!</span>
                <button
                  type="button"
                  className="btn-close small"
                  style={{ fontSize: '10px' }}
                  onClick={() => {
                    setAppliedDiscount(null);
                    setDiscountCode("");
                  }}
                ></button>
              </div>
            )}
          </div>

          <div className="widget payment-method mt-4">
            <h4 className="widget-title">Payment Method</h4>
            <div className="form-group mb-3">
              <div className="form-check custom-radio">
                <input className="form-check-input" type="radio" name="paymentMethod" id="cash" checked={formData.paymentMethod === "CASH"} value="CASH" onChange={handleChange} />
                <label className="form-check-label" htmlFor="cash">Cash on Delivery</label>
              </div>
              <div className="form-check custom-radio">
                <input className="form-check-input" type="radio" name="paymentMethod" id="stripe" checked={formData.paymentMethod === "STRIPE"} value="STRIPE" onChange={handleChange} />
                <label className="form-check-label" htmlFor="stripe">Credit Card (Stripe)</label>
              </div>
            </div>

            {formData.paymentMethod === "STRIPE" && (
              <div className="stripe-element-container mb-3 p-3 border rounded">
                <CardElement options={{ style: { base: { fontSize: "16px", color: "#424770" } } }} />
              </div>
            )}

            <button type="submit" className="btn btn-primary d-block w-100" disabled={loading || cartItems.length === 0}>
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>

      <Modal show={showMap} onHide={() => setShowMap(false)} size="lg" centered>
        <Modal.Header closeButton><Modal.Title>Select Delivery Location</Modal.Title></Modal.Header>
        <Modal.Body>
          <LocationPicker onLocationSelect={handleLocationSelect} initialLat={currentBranch?.lat} initialLng={currentBranch?.lng} />
        </Modal.Body>
      </Modal>
    </form>
  );
};

const ShopCheckout = () => {
  const { user, setShowSignInForm } = useContext(Context);

  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr4}
        title="Shop Checkout"
        subtitle="Shop Checkout"
      />
      <section className="content-inner" style={{ background: "#f8f9fa" }}>
        <div className="container">
          {!user && (
            <div className="alert alert-warning d-flex align-items-center justify-content-between p-4 mb-4" style={{ borderRadius: '15px' }}>
              <div>
                <h6 className="mb-1">Sign in to complete your order</h6>
                <p className="mb-0 small">Save your details & track order history</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowSignInForm(true)}>Sign In</button>
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
