import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import ShopStyle1RightContent from "../elements/ShopStyle1RightContent";
import { Context } from "../context/AppContext";

const ShopCart = () => {
  const { cartItems, updateQuantity, removeFromCart, activeBranch, cmsConfig } = useContext(Context);
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";
  const [filterSidebar, setFilterSidebar] = useState<boolean>(false);

  // Store is always open
  const isStoreClosed = false;

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
  const deliveryCharge = cartItems.length > 0 ? Number(activeBranch?.deliveryCharge || 0) : 0;
  const taxPercentage = Number(cmsConfig?.config?.configJson?.orders?.taxPercentage) || 0;
  const tax = subtotal * (taxPercentage / 100);
  const total = subtotal + deliveryCharge + tax;

  const cartConfig = cmsConfig?.config?.configJson?.cart;
  const bannerEnabled = cartConfig?.sections?.banner?.enabled ?? true;
  const bannerContent = cartConfig?.sections?.banner?.content;
  const contentConfig = cartConfig?.sections?.cartContent?.content;

  return (
    <div className="page-content bg-white">
      <style>
        {`
          @media (max-width: 991px) {
            .side-bar.sticky-top {
              position: static !important;
              margin-top: 40px;
            }
          }
          @media (max-width: 576px) {
            .cart-item.style-1 {
              flex-direction: row;
              align-items: center;
              padding: 10px 0;
            }
            .cart-item.style-1 .dz-media {
              width: 70px !important;
              height: 70px !important;
            }
            .cart-item.style-1 .dz-content {
              padding-left: 15px;
            }
            .cart-item.style-1 .dz-body {
              flex-direction: column;
              align-items: flex-start !important;
              gap: 8px;
            }
            .order-detail table td {
              font-size: 14px;
            }
          }
        `}
      </style>
      {bannerEnabled && (
        <CommonBanner
          img={bannerContent?.imageUrl || IMAGES.images_bnr4}
          title={bannerContent?.title || "Shop Cart"}
          subtitle={bannerContent?.breadcrumb || "Shop Cart"}
          description={bannerContent?.description}
        />
      )}
      <section className="content-inner-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="title mb-0" style={{ color: '#222', fontWeight: 700 }}>Related Products</h4>
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

                  <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '5px' }}>
                    {cartItems.map((item) => (
                      <div className="cart-item style-1 mb-4" key={item.id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
                        <div className="dz-media" style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden' }}>
                          <img src={item.image || IMAGES.shop_pic1} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div className="dz-content" style={{ flex: 1, paddingLeft: '15px', position: 'relative' }}>
                          <div className="dz-head d-flex justify-content-between align-items-start">
                            <h6 className="title mb-1" style={{ fontSize: '15px', fontWeight: 700, color: '#222', maxWidth: '80%' }}>{item.name}</h6>
                            <button
                              style={{ border: 'none', background: 'none', padding: 0, marginTop: '-5px' }}
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="fa-solid fa-xmark text-danger" style={{ fontSize: '14px' }}></i>
                            </button>
                          </div>

                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="btn-quantity style-1" style={{ margin: 0 }}>
                              <div className="d-flex align-items-center" style={{ width: "95px", height: "32px", border: '1px solid #d1d1d1', borderRadius: '4px', overflow: 'hidden', background: '#fff' }}>
                                <button
                                  className="btn p-0"
                                  type="button"
                                  style={{ width: '30px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: '#f5f5f5', color: '#666' }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <i className="fa-solid fa-minus" style={{ fontSize: '10px' }}></i>
                                </button>
                                <input
                                  type="text"
                                  value={item.quantity}
                                  readOnly
                                  style={{ flex: 1, height: "100%", padding: 0, textAlign: "center", fontWeight: 700, border: 'none', background: 'transparent', fontSize: '14px', color: '#222', minWidth: '0' }}
                                />
                                <button
                                  className="btn p-0"
                                  type="button"
                                  style={{ width: '30px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: '#f5f5f5', color: '#666' }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <i className="fa-solid fa-plus" style={{ fontSize: '10px' }}></i>
                                </button>
                              </div>
                            </div>
                            <h6 className="price text-primary mb-0" style={{ fontWeight: 800 }}>
                              {cmsConfig?.config?.currency || '$'} {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {cartItems.length === 0 && (
                    <div className="text-center py-4">
                      <p>{contentConfig?.emptyCartText || "Your cart is empty"}</p>
                      <Link to="/our-menu-2" className="btn btn-primary btn-sm">{contentConfig?.exploreMenuText || "Explore Menu"}</Link>
                    </div>
                  )}

                  <div className="order-detail">
                    <h6>{contentConfig?.billDetailsTitle || "Bill Details"}</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ color: '#666', fontSize: '14px' }}>{contentConfig?.itemTotalLabel || "Item Total"}</td>
                          <td className="text-end" style={{ color: primaryColor, fontWeight: 700 }}>{cmsConfig?.config?.currency || '$'} {subtotal.toFixed(2)}</td>
                        </tr>
                        <tr className="charges">
                          <td style={{ color: '#666', fontSize: '14px' }}>{contentConfig?.deliveryLabel || "Delivery Charges"}</td>
                          <td className="text-end" style={{ color: primaryColor, fontWeight: 700 }}>{cmsConfig?.config?.currency || '$'} {deliveryCharge.toFixed(2)}</td>
                        </tr>
                        <tr className="tax" style={{ borderBottom: '1px solid #eee' }}>
                          <td style={{ color: '#666', fontSize: '14px' }}>{contentConfig?.taxLabel || "Govt Taxes & Other Charges"}</td>
                          <td className="text-end" style={{ color: primaryColor, fontWeight: 700 }}>{cmsConfig?.config?.currency || '$'} {tax.toFixed(2)}</td>
                        </tr>
                        <tr className="total">
                          <td>
                            <h5 style={{ fontWeight: 700, margin: '15px 0' }}>{contentConfig?.totalLabel || "Total"}</h5>
                          </td>
                          <td className="text-end">
                            <h5 style={{ color: primaryColor, fontWeight: 800, margin: '15px 0' }}>{cmsConfig?.config?.currency || '$'} {total.toFixed(2)}</h5>
                          </td>
                        </tr>
                      </tbody>
                    </table>



                    <Link
                      to={isStoreClosed || cartItems.length === 0 ? "#" : "/shop-checkout"}
                      className={`btn btn-primary d-block text-center btn-md w-100 btn-hover-1 ${isStoreClosed || cartItems.length === 0 ? 'disabled' : ''}`}
                      style={{
                        opacity: isStoreClosed || cartItems.length === 0 ? 0.6 : 1,
                        pointerEvents: isStoreClosed || cartItems.length === 0 ? 'none' : 'auto',
                        background: primaryColor,
                        borderColor: primaryColor
                      }}
                    >
                      <span>
                        {cartItems.length === 0 ? (contentConfig?.addItemsText || 'Add Items First') : (isStoreClosed ? (contentConfig?.kitchenClosedText || 'Kitchen Closed') : (contentConfig?.orderNowText || 'Order Now'))} <i className="fa-solid fa-arrow-right"></i>
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
