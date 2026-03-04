import { useNavigate} from "react-router-dom";
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

const SectionTitle = ({ title, color }: { title: string; color: string }) => (
  <div className="mb-4">
    <h4 className="widget-title mb-1" style={{ fontWeight: 700, fontSize: '20px', color: '#1a1a1a' }}>{title}</h4>
    <div style={{ width: '45px', height: '3px', background: color, borderRadius: '2px' }}></div>
  </div>
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
    companyName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postcode: "",
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
      borderRadius: '8px',
      border: '1px solid #e1e1e1',
      boxShadow: 'none',
      '&:hover': { border: '1px solid #ccc' }
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      backgroundColor: isSelected ? primaryColor : isFocused ? primaryColor + '10' : null,
      color: isSelected ? "#fff" : "#333",
    }),
  };

  return (
    <form className="shop-form" onSubmit={handlePlaceOrder}>
      {/* Quadrant 1 & 2: Top Row */}
      <div className="row">
        {/* Quadrant 1: Top Left - Billing */}
        <div className="col-lg-6 mb-4">
          <div className="widget" style={{ border: 'none', padding: '0' }}>
            <SectionTitle title="Billing & Shipping Address" color={primaryColor} />

            <div className="form-group mb-3">
              <Select
                styles={customStyles}
                options={branches.map((b: any) => ({ value: b.id, label: b.name }))}
                value={{ value: currentBranch?.id, label: currentBranch?.name }}
                onChange={(opt: any) => setSelectedBranchId(opt.value)}
                placeholder="Select Branch / Country"
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <input name="firstName" required type="text" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 mb-3">
                <input name="lastName" type="text" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group mb-3">
              <input name="companyName" type="text" className="form-control" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
            </div>

            <div className="form-group mb-3 position-relative">
              <input name="address" required type="text" className="form-control" placeholder="Address" value={formData.address} onChange={handleChange} />
              <button type="button" className="position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent text-primary" onClick={() => setShowMap(true)}>
                📍
              </button>
            </div>

            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <input name="apartment" type="text" className="form-control" placeholder="Apartment, suite, unit etc." value={formData.apartment} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 mb-3">
                <input name="city" required type="text" className="form-control" placeholder="Town / City" value={formData.city} onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <input name="state" type="text" className="form-control" placeholder="State / County" value={formData.state} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 mb-3">
                <input name="postcode" type="text" className="form-control" placeholder="Postcode / Zip" value={formData.postcode} onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <input name="email" required type="email" className="form-control" placeholder="Email Address" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 mb-3">
                <input name="phone" required type="tel" className="form-control" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <Button
              variant="light"
              onClick={() => setOpenCreateAccount(!openCreateAccount)}
              className="btn-block mb-3 d-flex justify-content-between align-items-center bg-white border"
              style={{ width: '100%', height: '50px', borderRadius: '8px', padding: '0 20px' }}
            >
              <span className="small fw-semibold">Create an account</span>
              <i className={`fa fa-angle-${openCreateAccount ? 'up' : 'down'}`}></i>
            </Button>
            <Collapse in={openCreateAccount}>
              <div className="mb-3">
                <p className="small text-muted mb-2">Create an account by entering the information below. If you are a returning customer please login at the top of the page.</p>
                <input name="Password" type="password" className="form-control" placeholder="Password" />
              </div>
            </Collapse>
          </div>
        </div>

        {/* Quadrant 2: Top Right - Ship Different / Notes */}
        <div className="col-lg-6 mb-4">
          <div className="widget" style={{ border: 'none', padding: '0' }}>
            <Button
              variant="light"
              onClick={() => setOpenShipDifferent(!openShipDifferent)}
              className="btn-block mb-3 d-flex justify-content-between align-items-center bg-white border"
              style={{ width: '100%', height: '50px', borderRadius: '8px', padding: '0 20px' }}
            >
              <span className="small fw-semibold">Ship to a different address</span>
              <i className={`fa fa-angle-${openShipDifferent ? 'up' : 'down'}`}></i>
            </Button>

            {/* Static text as per image 4 */}
            <p className="small text-muted mb-4">
              If you have shopped with us before, please enter your details in the boxes below. If you are a new customer please proceed to the Billing & Shipping section.
            </p>

            <Collapse in={openShipDifferent}>
              <div className="mb-4 p-3 border rounded bg-light">
                <div className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" />
                </div>
                <div className="form-group mb-3">
                  <textarea className="form-control" rows={3} placeholder="Different Shipping Address"></textarea>
                </div>
              </div>
            </Collapse>

            {/* Order Type / Service Method logic integrated here to maintain functionality */}
            <div className="mb-4">
              <label className="fw-bold mb-2 small text-uppercase" style={{ color: '#888' }}>Delivery Service</label>
              <div className="d-flex gap-2 mb-3">
                <button type="button" onClick={() => setOrderType("PICKUP")} className={`btn flex-fill py-2 ${orderType === "PICKUP" ? "btn-primary" : "btn-outline-secondary"}`} style={{ borderRadius: '8px', background: orderType === "PICKUP" ? primaryColor : '', borderColor: orderType === "PICKUP" ? primaryColor : '' }}>Pickup</button>
                <button type="button" onClick={() => setOrderType("DELIVERY")} className={`btn flex-fill py-2 ${orderType === "DELIVERY" ? "btn-primary" : "btn-outline-secondary"}`} style={{ borderRadius: '8px', background: orderType === "DELIVERY" ? primaryColor : '', borderColor: orderType === "DELIVERY" ? primaryColor : '' }}>Delivery</button>
              </div>
            </div>

            <div className="form-group">
              <textarea name="notes" className="form-control" rows={8} placeholder="Notes about your order, e.g. special notes for delivery" value={formData.notes} onChange={handleChange} style={{ borderRadius: '8px' }}></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Central Divider */}
      <div className="dz-divider icon-center my-4" style={{ background: '#eee', height: '1px', position: 'relative' }}>
        <i className="fa fa-circle text-primary" style={{ color: primaryColor, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '5px', fontSize: '10px' }}></i>
      </div>

      {/* Quadrant 3 & 4: Bottom Row */}
      <div className="row">
        {/* Quadrant 3: Bottom Left - Your Order Table */}
        <div className="col-lg-6 mb-4">
          <div className="widget" style={{ border: 'none', padding: '0' }}>
            <SectionTitle title="Your Order" color={primaryColor} />
            <div className="table-responsive rounded-3 overflow-hidden border">
              <table className="table table-bordered mb-0">
                <thead className="bg-dark text-white text-center">
                  <tr>
                    <th style={{ padding: '15px' }}>IMAGE</th>
                    <th style={{ padding: '15px' }}>PRODUCT NAME</th>
                    <th style={{ padding: '15px' }}>TOTAL</th>
                  </tr>
                </thead>
                <tbody style={{ background: '#fff' }}>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td className="text-center" style={{ padding: '15px', width: '120px' }}>
                        <img src={item.image || IMAGES.shop_pic1} alt="/" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                      </td>
                      <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                        <h6 className="mb-0" style={{ fontWeight: 600 }}>{item.name}</h6>
                        <span className="small text-muted">Price: {cmsConfig?.config?.currency || '$'} {item.price.toFixed(2)} | Qty: {item.quantity}</span>
                      </td>
                      <td className="text-end" style={{ padding: '15px', verticalAlign: 'middle', fontWeight: 700 }}>
                        {cmsConfig?.config?.currency || '$'} {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quadrant 4: Bottom Right - Totals & Payment */}
        <div className="col-lg-6 mb-4">
          <div className="widget" style={{ border: 'none', padding: '0' }}>
            <SectionTitle title="Order Total" color={primaryColor} />
            <div className="table-responsive rounded-3 overflow-hidden border mb-4">
              <table className="table table-bordered mb-0">
                <tbody>
                  <tr>
                    <td style={{ padding: '15px' }}>Order Subtotal</td>
                    <td className="text-end" style={{ padding: '15px', fontWeight: 600 }}>{cmsConfig?.config?.currency || '$'} {subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '15px' }}>Shipping</td>
                    <td className="text-end" style={{ padding: '15px' }}>{orderType === "DELIVERY" ? `${cmsConfig?.config?.currency || '$'} ${Number(deliveryCharge).toFixed(2)}` : "Free Shipping"}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '15px' }}>Coupon</td>
                    <td className="text-end text-success" style={{ padding: '15px', fontWeight: 600 }}>
                      {discountAmount > 0 ? `-${cmsConfig?.config?.currency || '$'} ${discountAmount.toFixed(2)}` : `$ 0.00`}
                    </td>
                  </tr>
                  <tr style={{ background: '#f8f9fa' }}>
                    <td style={{ padding: '15px', fontWeight: 700 }}>Total</td>
                    <td className="text-end" style={{ padding: '15px', fontWeight: 800, color: '#1a1a1a', fontSize: '20px' }}>
                      {cmsConfig?.config?.currency || '$'} {total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Promo application relocated subtly */}
            <div className="mb-4">
              <div className="input-group">
                <input className="form-control" placeholder="Promo Code" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} style={{ borderRadius: '8px 0 0 8px' }} />
                <button type="button" onClick={handleApplyDiscount} disabled={discountLoading} className="btn btn-dark" style={{ borderRadius: '0 8px 8px 0', minWidth: '80px' }}>Apply</button>
              </div>
            </div>

            <SectionTitle title="Payment Method" color={primaryColor} />

            <div className="payment-selector mb-4">
              <div className="form-group mb-3">
                <label className="small fw-bold mb-2">Select Method</label>
                <div className="d-flex gap-2">
                  <button type="button" className={`btn flex-fill py-2 ${formData.paymentMethod === "CASH" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "CASH" }))} style={{ borderRadius: '8px' }}>Cash On Delivery</button>
                  <button type="button" className={`btn flex-fill py-2 ${formData.paymentMethod === "STRIPE" ? "btn-dark" : "btn-outline-dark"}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "STRIPE" }))} style={{ borderRadius: '8px' }}>Pay Online (Stripe)</button>
                </div>
              </div>

              {formData.paymentMethod === "STRIPE" && (
                <div className="payment-card-details">
                  <div className="form-group mb-3">
                    <input type="text" name="cardName" className="form-control" placeholder="Name on Card" value={formData.cardName} onChange={handleChange} />
                  </div>
                  <div className="form-group mb-3">
                    <div className="p-3 border rounded-3 bg-white">
                      <CardElement options={{ style: { base: { fontSize: "16px", color: "#333", "::placeholder": { color: "#888" } } } }} />
                    </div>
                  </div>
                  <p className="small text-muted mb-3"><i className="fa fa-lock me-1"></i> Your payment is secured and encrypted by Stripe.</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-hover-2 w-100 py-3"
              disabled={loading || cartItems.length === 0}
              style={{ background: '#f5f5f5', color: '#1a1a1a', fontWeight: 700, borderRadius: '8px', border: 'none', transition: '0.3s' }}
              onMouseOver={(e) => e.currentTarget.style.background = primaryColor}
              onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f5'}
            >
              {loading ? "Processing..." : "Place Order Now"}
            </button>
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
      <CommonBanner img={IMAGES.images_bnr3} title="Shop Checkout" />
      <section className="content-inner" style={{ paddingTop: '50px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          {!user && (
            <div className="alert alert-warning mb-5 d-flex justify-content-between align-items-center" style={{ borderRadius: '15px' }}>
              <span className="fw-medium">Account required! Please login to place your order.</span>
              <button className="btn btn-sm btn-dark px-4" onClick={() => setShowSignInForm(true)}>Login</button>
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
