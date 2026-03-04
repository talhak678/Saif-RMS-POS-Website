import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import LocationPicker from "../elements/LocationPicker";
import { Modal, Button, Collapse } from "react-bootstrap";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Select from "react-select";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";

const BASE_URL = "https://saif-rms-pos-backend.vercel.app";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder"
);

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
  }, [user]);

  const branches = cmsConfig?.branches || [];
  const currentBranch = branches.find((b: any) => b.id === selectedBranchId) || branches[0] || activeBranch;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    if (name === "phone") value = value.replace(/[^0-9]/g, "");
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setFormData(prev => ({ ...prev, address }));
    setDeliveryCoords({ lat, lng });
    setShowMap(false);
  };

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
        toast.success(`🎉 Discount applied!`);
      } else {
        toast.error(res.data?.message || "Invalid discount code");
      }
    } catch (err: any) {
      toast.error("Invalid or expired discount code");
    } finally {
      setDiscountLoading(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please sign in first"); setShowSignInForm(true); return; }
    if (cartItems.length === 0) { toast.error("Your cart is empty"); return; }
    if (orderType === "DELIVERY" && !formData.address) { toast.error("Please enter delivery address"); return; }

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
          if (cardEl) {
            const { error, paymentIntent } = await stripe.confirmCardPayment(intentRes.data.data.clientSecret, {
              payment_method: { card: cardEl, billing_details: { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, phone: formData.phone } }
            });
            if (error) { toast.error(error.message || "Payment failed"); setLoading(false); return; }
          }
        }
      }

      clearCart();
      toast.success("🎉 Order placed successfully!");
      navigate("/order-success", { state: { order } });
    } catch (err: any) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="shop-form" onSubmit={handlePlaceOrder}>
      <div className="row">
        {/* BILLING SECTION */}
        <div className="col-lg-6">
          <div className="widget" style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)' }}>
            <h4 className="widget-title" style={{ fontWeight: 700, marginBottom: '25px', display: 'flex', alignItems: 'center' }}>
              <i className="fa-solid fa-address-book me-2" style={{ color: primaryColor }}></i>
              Billing & Shipping Details
            </h4>

            <div className="row">
              <div className="form-group col-md-6 m-b20">
                <input name="firstName" required type="text" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={{ borderRadius: '12px', height: '50px' }} />
              </div>
              <div className="form-group col-md-6 m-b20">
                <input name="lastName" type="text" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={{ borderRadius: '12px', height: '50px' }} />
              </div>
            </div>

            <div className="form-group m-b20">
              <input name="email" required type="email" className="form-control" placeholder="Email Address" value={formData.email} onChange={handleChange} style={{ borderRadius: '12px', height: '50px' }} />
            </div>

            <div className="form-group m-b20">
              <input name="phone" required type="tel" className="form-control" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} style={{ borderRadius: '12px', height: '50px' }} />
            </div>

            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '15px', marginBottom: '20px' }}>
              <h6 className="mb-3" style={{ fontWeight: 700 }}>Service Method</h6>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setOrderType("PICKUP")}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '10px',
                    border: `2px solid ${orderType === "PICKUP" ? primaryColor : "#eee"}`,
                    background: orderType === "PICKUP" ? primaryColor + '10' : '#fff',
                    color: orderType === "PICKUP" ? primaryColor : '#888',
                    fontWeight: 700
                  }}
                >
                  🏪 Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("DELIVERY")}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '10px',
                    border: `2px solid ${orderType === "DELIVERY" ? primaryColor : "#eee"}`,
                    background: orderType === "DELIVERY" ? primaryColor + '10' : '#fff',
                    color: orderType === "DELIVERY" ? primaryColor : '#888',
                    fontWeight: 700
                  }}
                >
                  🚚 Delivery
                </button>
              </div>
            </div>

            {orderType === "DELIVERY" && (
              <div className="m-b20">
                <div className="d-flex justify-content-between mb-2">
                  <label className="fw-semibold">Delivery Address *</label>
                  <button type="button" className="text-primary border-0 bg-transparent p-0 small fw-bold" onClick={() => setShowMap(true)}>📍 Pick on Map</button>
                </div>
                <textarea name="address" required className="form-control mb-3" rows={3} placeholder="Street, Apartment, Unit..." value={formData.address} onChange={handleChange} style={{ borderRadius: '12px' }} />
                <input name="city" required type="text" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} style={{ borderRadius: '12px', height: '50px' }} />
              </div>
            )}

            <div className="form-group">
              <textarea name="notes" className="form-control" rows={3} placeholder="Notes about your order, e.g. special notes for delivery" value={formData.notes} onChange={handleChange} style={{ borderRadius: '12px' }}></textarea>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY & PAYMENT SECTION */}
        <div className="col-lg-6">
          <div className="widget" style={{ background: '#fff', borderRadius: '20px', padding: '30px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)' }}>
            <h4 className="widget-title" style={{ fontWeight: 700, marginBottom: '25px' }}>Your Order</h4>

            <table className="table-bordered check-tbl mb-4" style={{ width: '100%', borderRadius: '15px', overflow: 'hidden' }}>
              <thead className="text-center" style={{ background: '#f8f9fa' }}>
                <tr>
                  <th style={{ padding: '15px' }}>IMAGE</th>
                  <th style={{ padding: '15px' }}>PRODUCT NAME</th>
                  <th style={{ padding: '15px' }}>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td className="product-item-img text-center" style={{ padding: '15px' }}>
                      <img src={item.image || IMAGES.shop_pic1} alt="/" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                    </td>
                    <td className="product-item-name" style={{ padding: '15px', fontWeight: 600 }}>{item.name} x {item.quantity}</td>
                    <td className="product-price text-end" style={{ padding: '15px', fontWeight: 700 }}>
                      {cmsConfig?.config?.currency || '$'} {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 className="widget-title" style={{ fontWeight: 700, marginBottom: '20px' }}>Order Total</h4>
            <table className="table-bordered check-tbl mb-4" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '15px' }}>Order Subtotal</td>
                  <td className="product-price text-end" style={{ padding: '15px', fontWeight: 700 }}>{cmsConfig?.config?.currency || '$'} {subtotal.toFixed(2)}</td>
                </tr>
                {orderType === "DELIVERY" && (
                  <tr>
                    <td style={{ padding: '15px' }}>Shipping</td>
                    <td className="text-end" style={{ padding: '15px' }}>{cmsConfig?.config?.currency || '$'} {Number(deliveryCharge).toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ padding: '15px' }}>Tax (5%)</td>
                  <td className="product-price text-end" style={{ padding: '15px', fontWeight: 700 }}>{cmsConfig?.config?.currency || '$'} {tax.toFixed(2)}</td>
                </tr>
                {discountAmount > 0 && (
                  <tr>
                    <td style={{ padding: '15px' }}>Coupon Saved</td>
                    <td className="product-price text-end" style={{ padding: '15px', color: '#2ecc71', fontWeight: 700 }}>- {cmsConfig?.config?.currency || '$'} {discountAmount.toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td style={{ padding: '15px', fontWeight: 700 }}>Total</td>
                  <td className="product-price-total text-end" style={{ padding: '15px', fontWeight: 800, color: primaryColor, fontSize: '20px' }}>
                    {cmsConfig?.config?.currency || '$'} {total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            <h4 className="widget-title" style={{ fontWeight: 700, marginBottom: '20px' }}>Payment Method</h4>
            <div className="payment-options mb-4">
              <div className="form-group mb-2">
                <label className="d-flex align-items-center p-3" style={{ border: `2px solid ${formData.paymentMethod === "CASH" ? primaryColor : "#eee"}`, borderRadius: '12px', cursor: 'pointer' }}>
                  <input type="radio" name="paymentMethod" value="CASH" checked={formData.paymentMethod === "CASH"} onChange={handleChange} className="me-3" style={{ accentColor: primaryColor }} />
                  <span className="fw-bold">Cash on Delivery</span>
                </label>
              </div>
              <div className="form-group">
                <label className="d-flex align-items-center p-3" style={{ border: `2px solid ${formData.paymentMethod === "STRIPE" ? primaryColor : "#eee"}`, borderRadius: '12px', cursor: 'pointer' }}>
                  <input type="radio" name="paymentMethod" value="STRIPE" checked={formData.paymentMethod === "STRIPE"} onChange={handleChange} className="me-3" style={{ accentColor: primaryColor }} />
                  <span className="fw-bold">Credit / Debit Card (Stripe)</span>
                </label>
              </div>

              {formData.paymentMethod === "STRIPE" && (
                <div className="mt-3 p-3" style={{ border: '1px solid #ddd', borderRadius: '12px', background: '#fcfcfc' }}>
                  <CardElement options={{ style: { base: { fontSize: "16px", color: "#424770" } } }} />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-hover-2 w-100 py-3"
              disabled={loading || cartItems.length === 0}
              style={{
                borderRadius: "15px", fontWeight: 700, fontSize: "18px",
                background: primaryColor, border: 'none'
              }}
            >
              {loading ? "Processing..." : `Place Order Now`}
            </button>
          </div>
        </div>
      </div>

      <Modal show={showMap} onHide={() => setShowMap(false)} size="lg" centered>
        <Modal.Header closeButton><Modal.Title>Select Delivery Location</Modal.Title></Modal.Header>
        <Modal.Body><LocationPicker onLocationSelect={handleLocationSelect} initialLat={currentBranch?.lat} initialLng={currentBranch?.lng} /></Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowMap(false)}>Cancel</Button><Button variant="primary" onClick={() => setShowMap(false)} style={{ background: primaryColor, border: 'none' }}>Confirm Location</Button></Modal.Footer>
      </Modal>
    </form>
  );
};

const ShopCheckout = () => {
  const { user, setShowSignInForm, cmsConfig } = useContext(Context);
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  return (
    <div className="page-content bg-white">
      <CommonBanner img={IMAGES.images_bnr3} title="Shop Checkout" subtitle="Shop Checkout" />
      <section className="content-inner">
        <div className="container">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </section>
    </div>
  );
};

export default ShopCheckout;
