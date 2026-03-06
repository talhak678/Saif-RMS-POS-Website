import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import LocationPicker from "../elements/LocationPicker";
import { Modal, Button } from "react-bootstrap";
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
    if (!user) {
      toast.error("Please login to place your order");
      setShowSignInForm(true);
      setLoading(false);
      return;
    }
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

      if (!res.data?.success) {
        const msg = res.data?.message || "";
        if (msg.toLowerCase().includes("auth") || msg.toLowerCase().includes("login") || msg.toLowerCase().includes("token")) {
          toast.error("Session expired. Please login again.");
          setShowSignInForm(true);
          setLoading(false);
          return;
        }
        toast.error(res.data?.message || "Order failed");
        setLoading(false);
        return;
      }
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
      console.error("Order error:", err);
      toast.error("Authentication required. Please Login First.");
      setShowSignInForm(true);
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    control: (base: any) => ({
      ...base,
      minHeight: '50px',
      borderRadius: '0',
      border: '1px solid #e1e1e1',
      boxShadow: 'none',
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      backgroundColor: isSelected ? primaryColor : isFocused ? "#f2f2f4" : null,
      color: isSelected ? "#fff" : "#333",
    }),
  };

  return (
    <form className="shop-form" onSubmit={handlePlaceOrder}>
      <div className="row">
        {/* Billing Address Section */}
        <div className="col-lg-12">
          <div className="widget">
            <h4 className="widget-title">Checkout Details</h4>

            {/* 📍 Order Type Selector */}
            <div className="form-group m-b20 border p-3 rounded bg-light">
              <h6 className="mb-2">How would you like to receive your order?</h6>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrderType("DELIVERY")}
                  className={`btn btn-sm ${orderType === "DELIVERY" ? "btn-primary" : "btn-light"}`}
                  style={{ minWidth: '120px', background: orderType === "DELIVERY" ? primaryColor : '', color: orderType === "DELIVERY" ? '#fff' : '' }}
                >
                  🚚 Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("PICKUP")}
                  className={`btn btn-sm ${orderType === "PICKUP" ? "btn-primary" : "btn-light"}`}
                  style={{ minWidth: '120px', background: orderType === "PICKUP" ? primaryColor : '', color: orderType === "PICKUP" ? '#fff' : '' }}
                >
                  🥡 Pickup
                </button>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-12 m-b20">
                <label className="mb-2">Select Branch</label>
                <Select
                  styles={customStyles}
                  options={branches.map((b: any) => ({ value: b.id, label: b.name }))}
                  value={{ value: currentBranch?.id, label: currentBranch?.name }}
                  onChange={(opt: any) => setSelectedBranchId(opt.value)}
                />
              </div>

              <div className="form-group col-md-6 m-b20">
                <input name="firstName" required type="text" className="form-control" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 m-b20">
                <input name="lastName" type="text" className="form-control" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              </div>

              <div className="form-group col-md-6 m-b20">
                <input name="email" required type="email" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-group col-md-6 m-b20">
                <input name="phone" required type="tel" className="form-control" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              </div>

              {/* 🏠 Delivery Fields - Only show if Delivery is selected */}
              {orderType === "DELIVERY" && (
                <>
                  <div className="form-group col-md-12 m-b20 position-relative">
                    <label className="mb-2">Delivery Address</label>
                    <div className="input-group">
                      <input
                        name="address"
                        required={orderType === "DELIVERY"}
                        type="text"
                        className="form-control"
                        placeholder="Street Address, Area or Landmark"
                        value={formData.address}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                        onClick={() => setShowMap(true)}
                      >
                        📍 Map
                      </button>
                    </div>
                  </div>

                  <div className="form-group col-md-12 m-b20">
                    <input name="city" required={orderType === "DELIVERY"} type="text" className="form-control" placeholder="City" value={formData.city} onChange={handleChange} />
                  </div>
                </>
              )}

              <div className="form-group col-md-12 m-b20">
                <label className="mb-2">Special Notes (Optional)</label>
                <textarea name="notes" className="form-control" rows={3} placeholder="Notes about your order, e.g. allergires or sauce preferences" value={formData.notes} onChange={handleChange}></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dz-divider bg-gray-dark icon-center my-5">
        <i className="fa fa-circle bg-white text-primary" style={{ color: primaryColor }}></i>
      </div>

      <div className="row">
        {/* Order Table Section */}
        <div className="col-lg-6">
          <div className="widget">
            <h4 className="widget-title">Your Order</h4>
            <table className="table-bordered check-tbl">
              <thead className="text-center">
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
                      <img src={item.image || IMAGES.shop_pic1} alt="/" style={{ width: '60px' }} />
                    </td>
                    <td className="product-item-name">{item.name} x {item.quantity}</td>
                    <td className="product-price">
                      {cmsConfig?.config?.currency || '$'} {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals & Payment Section */}
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
                  <td className="text-end">{orderType === "DELIVERY" ? `${cmsConfig?.config?.currency || '$'} ${Number(deliveryCharge).toFixed(2)}` : "Free"}</td>
                </tr>
                <tr>
                  <td>Coupon</td>
                  <td className="product-price text-end">-{cmsConfig?.config?.currency || '$'} {discountAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td className="product-price-total text-end">{cmsConfig?.config?.currency || '$'} {total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div className="m-b20">
              <div className="input-group">
                <input className="form-control" placeholder="Promo Code" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} />
                <button type="button" onClick={handleApplyDiscount} disabled={discountLoading} className="btn btn-primary" style={{ background: primaryColor }}>Apply</button>
              </div>
            </div>

            <h4 className="widget-title">Payment Method</h4>
            <div className="form-group m-b20">
              <div className="d-flex gap-3 mb-3">
                <div className={`cursor-pointer p-2 border rounded ${formData.paymentMethod === "CASH" ? "border-primary" : ""}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "CASH" }))} style={{ borderColor: formData.paymentMethod === "CASH" ? primaryColor : '' }}>Cash</div>
                <div className={`cursor-pointer p-2 border rounded ${formData.paymentMethod === "STRIPE" ? "border-primary" : ""}`} onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "STRIPE" }))} style={{ borderColor: formData.paymentMethod === "STRIPE" ? primaryColor : '' }}>Online Card</div>
              </div>
            </div>

            {formData.paymentMethod === "STRIPE" && (
              <div className="stripe-box">
                <div className="form-group m-b20">
                  <input type="text" name="cardName" className="form-control" placeholder="Name on Card" value={formData.cardName} onChange={handleChange} />
                </div>
                <div className="form-group m-b20 p-3 border rounded bg-white">
                  <CardElement options={{ style: { base: { fontSize: "16px", color: "#333" } } }} />
                </div>
              </div>
            )}

            <div className="form-group">
              <button
                className="btn btn-gray btn-hover-2 w-100"
                type="submit"
                disabled={loading || cartItems.length === 0}
              >
                {loading ? "Processing..." : "Place Order Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showMap} onHide={() => setShowMap(false)} size="xl" centered dialogClassName="map-modal" enforceFocus={false}>
        <Modal.Header closeButton style={{ borderBottom: '1px solid #f0f0f0', padding: '16px 24px' }}>
          <Modal.Title style={{ fontWeight: 800, fontSize: 18 }}>📍 Select Delivery Location</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px 24px' }}>
          <LocationPicker onLocationSelect={handleLocationSelect} initialLat={currentBranch?.lat} initialLng={currentBranch?.lng} />
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid #f0f0f0', padding: '12px 24px' }}>
          <Button variant="outline-secondary" onClick={() => setShowMap(false)} style={{ borderRadius: 10, padding: '8px 24px' }}>Cancel</Button>
          <Button variant="primary" onClick={() => setShowMap(false)} style={{ borderRadius: 10, padding: '8px 24px', background: primaryColor, borderColor: primaryColor }}>Confirm Location</Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

const ShopCheckout = () => {
  const { user, setShowSignInForm } = useContext(Context);

  return (
    <div className="page-content bg-white">
      <CommonBanner img={IMAGES.images_bnr3} title="Shop Checkout" />
      <section className="content-inner">
        <div className="container">
          {!user && (
            <div className="alert alert-warning mb-4 d-flex justify-content-between">
              <span>Login to continue checkout!</span>
              <button className="btn btn-sm btn-dark" onClick={() => setShowSignInForm(true)}>Login</button>
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
