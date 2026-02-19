import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import ShopStyle1RightContent from "../elements/ShopStyle1RightContent";
import { Context } from "../context/AppContext";

const ShopCart = () => {
  const { cartItems, updateQuantity, removeFromCart, activeBranch, cmsConfig } = useContext(Context);
  const [filterSidebar, setFilterSidebar] = useState<boolean>(false);

  // Deriving store closed status
  const now = new Date();
  let isStoreClosed = false;
  if (activeBranch?.deliveryOffTime) {
    const [hours, minutes] = activeBranch.deliveryOffTime.split(':').map(Number);
    const closeTime = new Date();
    closeTime.setHours(hours, minutes, 0, 0);
    isStoreClosed = now > closeTime;
  }

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
  const deliveryCharge = cartItems.length > 0 ? Number(activeBranch?.deliveryCharge || 0) : 0;
  const taxPercentage = Number(cmsConfig?.config?.configJson?.orders?.taxPercentage) || 0;
  const tax = subtotal * (taxPercentage / 100);
  const total = subtotal + deliveryCharge + tax;

  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr4}
        title="Shop Cart"
        subtitle="Shop Cart"
      />
      <section className="content-inner-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="title m-b15 m-lg-30">Your Selection</h5>
                <Link
                  to="#"
                  className="btn btn-primary panel-btn"
                  onClick={() => {
                    setFilterSidebar(true);
                  }}
                >
                  Filter
                </Link>
              </div>
              <ShopStyle1RightContent />
            </div>
            <div className="col-lg-4">
              <aside className="side-bar sticky-top">
                <div
                  className={`shop-filter style-1 ${filterSidebar ? "show" : ""
                    }`}
                >
                  <div className="d-flex justify-content-between">
                    <div className="widget-title">
                      <h5 className="title m-b30">
                        Cart <span className="text-primary">({cartItems.length})</span>
                      </h5>
                    </div>
                    <Link
                      to={"#"}
                      className="panel-close-btn"
                      onClick={() => {
                        setFilterSidebar(false);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </Link>
                  </div>
                  {cartItems.map((item) => (
                    <div className="cart-item style-1" key={item.id}>
                      <div className="dz-media" style={{ filter: item.isAvailable === false ? 'grayscale(1)' : 'none' }}>
                        <img src={item.image || IMAGES.shop_pic1} alt={item.name} />
                      </div>
                      <div className="dz-content">
                        <div className="dz-head">
                          <h6 className="title mb-0">{item.name} {item.isAvailable === false && <span className="text-danger small">(Out of Stock)</span>}</h6>
                          <button
                            style={{ border: 'none', background: 'none' }}
                            onClick={() => {
                              removeFromCart(item.id);
                            }}
                          >
                            <i className="fa-solid fa-xmark text-danger"></i>
                          </button>
                        </div>
                        <div className="dz-body">
                          <div className="btn-quantity style-1">
                            <div className="input-group bootstrap-touchspin">
                              <span className="input-group-addon bootstrap-touchspin-prefix"></span>
                              <input
                                type="text"
                                value={item.quantity}
                                readOnly
                                className="form-control"
                              />
                              <span className="input-group-addon bootstrap-touchspin-postfix"></span>
                              <span className="input-group-btn-vertical">
                                <button
                                  className="btn btn-default bootstrap-touchspin-up"
                                  type="button"
                                  onClick={() => {
                                    updateQuantity(item.id, item.quantity + 1);
                                  }}
                                >
                                  <i className="ti-plus"></i>
                                </button>
                                <button
                                  className="btn btn-default bootstrap-touchspin-down"
                                  type="button"
                                  onClick={() => {
                                    updateQuantity(item.id, item.quantity - 1);
                                  }}
                                >
                                  <i className="ti-minus"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <h5 className="price text-primary mb-0">Rs. {(Number(item.price) * Number(item.quantity)).toFixed(0)}</h5>
                        </div>
                      </div>
                    </div>
                  ))}

                  {cartItems.length === 0 && (
                    <div className="text-center py-4">
                      <p>Your cart is empty</p>
                      <Link to="/our-menu-2" className="btn btn-primary btn-sm">Explore Menu</Link>
                    </div>
                  )}

                  <div className="order-detail">
                    <h6>Bill Details</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td>Item Total</td>
                          <td className="price text-primary">Rs. {subtotal.toFixed(0)}</td>
                        </tr>
                        <tr className="charges">
                          <td>Delivery Charges</td>
                          <td className="price text-primary">Rs. {deliveryCharge.toFixed(0)}</td>
                        </tr>
                        <tr className="tax">
                          <td>Tax ({taxPercentage}%)</td>
                          <td className="price text-primary">Rs. {tax.toFixed(0)}</td>
                        </tr>
                        <tr className="total">
                          <td>
                            <h6>Total</h6>
                          </td>
                          <td className="price text-primary">Rs. {total.toFixed(0)}</td>
                        </tr>
                      </tbody>
                    </table>

                    {isStoreClosed && (
                      <div className="alert alert-danger mb-3 p-2 small text-center" style={{ borderRadius: '10px' }}>
                        <strong>⚠️ Kitchen is Closed</strong><br />
                        Sorry, we are not accepting orders at this time.
                      </div>
                    )}

                    <Link
                      to={isStoreClosed || cartItems.length === 0 ? "#" : "/shop-checkout"}
                      className={`btn btn-primary d-block text-center btn-md w-100 btn-hover-1 ${isStoreClosed || cartItems.length === 0 ? 'disabled' : ''}`}
                      style={{ opacity: isStoreClosed || cartItems.length === 0 ? 0.6 : 1, pointerEvents: isStoreClosed || cartItems.length === 0 ? 'none' : 'auto' }}
                    >
                      <span>
                        {cartItems.length === 0 ? 'Add Items First' : (isStoreClosed ? 'Kitchen Closed' : 'Order Now')} <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopCart;
