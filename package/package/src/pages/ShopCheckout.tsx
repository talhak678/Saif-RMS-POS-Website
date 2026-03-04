import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import LocationPicker from "../elements/LocationPicker";
import { Modal, Button, Collapse } from "react-bootstrap";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import Select from "react-select";

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
    paymentMethod: "CASH",
    cardName: ""
  });

  const [openShipDifferent, setOpenShipDifferent] = useState(false);
  const [openCreateAccount, setOpenCreateAccount] = useState(false);

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
    if (savedType === "DELIVERY" || savedType === "PICKUP") setOrderType(savedType);

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
            const { error } = await stripe.confirmCardPayment(intentRes.data.data.clientSecret, {
              payment_method: {
                card: cardEl,
                billing_details: {
                  name: formData.cardName || `${formData.firstName} ${formData.lastName}`,
                  email: formData.email,
                  phone: formData.phone
                }
              }
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

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: '50px',
      borderRadius: '10px',
      border: '1px solid #eee',
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      backgroundColor: isSelected ? primaryColor : isFocused ? primaryColor + '10' : null,
      color: isSelected ? "#fff" : "#333",
    }),
  };

  return (
    <form className="shop-form" onSubmit={handlePlaceOrder}>
      {/* SECTION 1 & 2: ADDRESSES */}
      <div className="row">
        <div className="col-lg-6">
          <div className="widget">
            <h4 className="widget-title">Billing & Shipping Address</h4>

            {branches.length > 1 && (
              <div className="form-group mb-3">
                <Select
                  styles={customStyles}
                  options={branches.map((b: any) => ({ value: b.id, label: b.name }))}
                  value={{ value: currentBranch?.id, label: currentBranch?.name }}
                  onChange={(opt: any) => setSelectedBranchId(opt.value)}
                />
              </div>
            )}

            <div className="row">
              <div className="form-group col-md-6 m-b20">
                <input name="firstName" required type="text" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 m-b20">
                <input name="lastName" type="text" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group m-b20">
              <input name="email" required type="email" className="form-control" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group m-b20">
              <input name="phone" required type="tel" className="form-control" placeholder="Mobile Number" value={formData.phone} onChange={handleChange} />
            </div>

            {/* Service Selection logic merged into Billing to keep it functional */}
            <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '15px', marginBottom: '20px' }}>
              <div className="d-flex justify-content-between mb-3 align-items-center">
                <h6 className="mb-0" style={{ fontWeight: 700 }}>Service Method</h6>
                <div style={{ display: "flex", gap: "5px" }}>
                  <button type="button" onClick={() => setOrderType("PICKUP")} className={`btn btn-sm ${orderType === "PICKUP" ? "btn-primary" : "btn-light"}`} style={{ background: orderType === "PICKUP" ? primaryColor : '#eee', border: 'none' }}>Pickup</button>
                  <button type="button" onClick={() => setOrderType("DELIVERY")} className={`btn btn-sm ${orderType === "DELIVERY" ? "btn-primary" : "btn-light"}`} style={{ background: orderType === "DELIVERY" ? primaryColor : '#eee', border: 'none' }}>Delivery</button>
                </div>
              </div>
              {orderType === "DELIVERY" && (
                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <label className="small fw-bold">Delivery Address *</label>
                    <button type="button" className="text-primary border-0 bg-transparent p-0 small fw-bold" onClick={() => setShowMap(true)}>📍 Pick on Map</button>
                  </div>
                  <textarea name="address" required className="form-control mb-2" rows={2} placeholder="Street, Apartment..." value={formData.address} onChange={handleChange} />
                </div>
              )}
            </div>

            <Button
              variant="white"
              onClick={() => setOpenCreateAccount(!openCreateAccount)}
              className="btn btn-gray btnhover mb-3"
              style={{ width: '100%', textAlign: 'left', border: '1px solid #eee' }}
            >
              Create an account <i className={`fa fa-angle-${openCreateAccount ? 'up' : 'down'} m-l10`}></i>
            </Button>
            <Collapse in={openCreateAccount}>
              <div>
                <p className="small text-muted mb-3">Create an account by entering a password below. If you are a returning customer please login at the top.</p>
                <div className="form-group mb-3">
                  <input name="Password" type="password" className="form-control" placeholder="Password" />
                </div>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="widget h-100">
            <Button
              variant="white"
              onClick={() => setOpenShipDifferent(!openShipDifferent)}
              className="btn btn-gray btnhover mb-4"
              style={{ width: '100%', textAlign: 'left', border: '1px solid #eee', background: openShipDifferent ? primaryColor : '#f8f9fa', color: openShipDifferent ? '#fff' : '#000' }}
            >
              Ship to a different address <i className={`fa fa-angle-${openShipDifferent ? 'up' : 'down'} m-l10`}></i>
            </Button>

            <Collapse in={openShipDifferent}>
              <div className="mb-4">
                <p className="small text-muted">If you want to ship to another location, please provide details below.</p>
                <div className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" />
                </div>
                <div className="form-group mb-3">
                  <textarea className="form-control" rows={3} placeholder="Different Shipping Address"></textarea>
                </div>
              </div>
            </Collapse>

            <div className="form-group mb-4">
              <label className="fw-bold mb-2 small text-uppercase" style={{ letterSpacing: '1px', color: '#888' }}>Order Notes (Optional)</label>
              <textarea name="notes" className="form-control" rows={6} placeholder="Notes about your order, e.g. special notes for delivery" value={formData.notes} onChange={handleChange} style={{ borderRadius: '12px' }}></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="dz-divider bg-gray-dark icon-center my-5">
        <i className="fa fa-circle bg-white text-primary" style={{ color: primaryColor }}></i>
      </div>

      {/* SECTION 3 & 4: ORDER & PAYMENT */}
      <div className="row">
        <div className="col-lg-6">
          <div className="widget">
            <h4 className="widget-title">Your Order</h4>
            <table className="table-bordered check-tbl">
              <thead className="text-center" style={{ background: '#222', color: '#fff' }}>
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT NAME</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td className="product-item-img text-center">
                      <img src={item.image || IMAGES.shop_pic1} alt="/" style={{ width: '60px', borderRadius: '5px' }} />
                    </td>
                    <td className="product-item-name">{item.name} x {item.quantity}</td>
                    <td className="product-price text-end">
                      {cmsConfig?.config?.currency || '$'} {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="widget">
            <h4 className="widget-title">Order Total</h4>
            <table className="table-bordered check-tbl mb-4">
              <tbody>
                <tr>
                  <td>Order Subtotal</td>
                  <td className="product-price text-end">{cmsConfig?.config?.currency || '$'} {subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td className="text-end">{orderType === "DELIVERY" ? `${cmsConfig?.config?.currency || '$'} ${Number(deliveryCharge).toFixed(2)}` : "Free Pickup"}</td>
                </tr>
                <tr>
                  <td>Coupon</td>
                  <td className="product-price text-end text-success">-{cmsConfig?.config?.currency || '$'} {discountAmount.toFixed(2)}</td>
                </tr>
                <tr style={{ background: '#f8f9fa' }}>
                  <td className="fw-bold">Total</td>
                  <td className="product-price-total text-end fw-bold" style={{ color: primaryColor, fontSize: '24px' }}>
                    {cmsConfig?.config?.currency || '$'} {total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Promo Code Block */}
            <div className="mb-4">
              {appliedDiscount ? (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#e8f5e9", borderRadius: '10px', padding: "10px 15px", border: '1px dashed #2ecc71' }}>
                  <span className="small fw-bold" style={{ color: "#2E7D32" }}>🎉 Applied: {appliedDiscount.code}</span>
                  <button type="button" onClick={() => setAppliedDiscount(null)} style={{ background: "none", border: "none", color: "#c62828" }}>×</button>
                </div>
              ) : (
                <div className="input-group">
                  <input className="form-control" placeholder="Promo Code" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} />
                  <button type="button" onClick={handleApplyDiscount} disabled={discountLoading} className="btn btn-primary" style={{ background: primaryColor, border: 'none' }}>{discountLoading ? "..." : "Apply"}</button>
                </div>
              )}
            </div>

            <h4 className="widget-title">Payment Method</h4>
            <div className="payment-method-selector mb-3">
              <div className="d-flex gap-3 mb-3">
                <div className={`p-3 border rounded-3 flex-fill text-center cursor-pointer ${formData.paymentMethod === "CASH" ? "border-primary bg-light" : ""}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "CASH" }))} style={{ borderColor: formData.paymentMethod === "CASH" ? primaryColor : '#eee', cursor: 'pointer' }}>
                  <i className="fa-solid fa-money-bill-1-wave mb-2 d-block h4"></i>
                  <span className="small fw-bold">Cash</span>
                </div>
                <div className={`p-3 border rounded-3 flex-fill text-center cursor-pointer ${formData.paymentMethod === "STRIPE" ? "border-primary bg-light" : ""}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "STRIPE" }))} style={{ borderColor: formData.paymentMethod === "STRIPE" ? primaryColor : '#eee', cursor: 'pointer' }}>
                  <i className="fa-solid fa-credit-card mb-2 d-block h4"></i>
                  <span className="small fw-bold">Card</span>
                </div>
              </div>

              {formData.paymentMethod === "STRIPE" && (
                <div className="stripe-card-container">
                  <div className="form-group mb-3">
                    <input type="text" name="cardName" className="form-control" placeholder="Name on Card" value={formData.cardName} onChange={handleChange} />
                  </div>
                  <div className="p-3 border rounded-3 mb-3 bg-white">
                    <CardElement options={{ style: { base: { fontSize: '16px', color: '#333' } } }} />
                  </div>
                </div>
              )}
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary w-100 py-3 mt-2"
                type="submit"
                disabled={loading || cartItems.length === 0}
                style={{ background: primaryColor, border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 700 }}
              >
                {loading ? "Processing..." : "Place Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showMap} onHide={() => setShowMap(false)} size="lg" centered>
        <Modal.Header closeButton><Modal.Title style={{ fontWeight: 700 }}>Pick Delivery Location</Modal.Title></Modal.Header>
        <Modal.Body><LocationPicker onLocationSelect={handleLocationSelect} initialLat={currentBranch?.lat} initialLng={currentBranch?.lng} /></Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={() => setShowMap(false)}>Cancel</Button><Button variant="primary" onClick={() => setShowMap(false)} style={{ background: primaryColor, border: 'none' }}>Use this Address</Button></Modal.Footer>
      </Modal>
    </form>
  );
};

const ShopCheckout = () => {
  const { user, setShowSignInForm } = useContext(Context);
  // const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  return (
    <div className="page-content bg-white">
      <CommonBanner img={IMAGES.images_bnr3} title="Shop Checkout" subtitle="Shop Checkout" />
      <section className="content-inner">
        <div className="container">
          {!user && (
            <div className="alert alert-warning mb-4 d-flex justify-content-between align-items-center" style={{ borderRadius: '15px' }}>
              <span>Login to your account to track your orders and earn rewards!</span>
              <button className="btn btn-sm btn-dark" onClick={() => setShowSignInForm(true)}>Login Now</button>
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
