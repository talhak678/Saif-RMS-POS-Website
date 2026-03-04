import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import Menu from "./Menu";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";

const Header = () => {
  const { headerClass, setShowSignInForm, headerSidebar, setHeaderSidebar, cmsConfig, cartItems, removeFromCart } =
    useContext(Context);
  const [cart, setCart] = useState<boolean>(false);
  const [scroll, setScroll] = useState<boolean>(false);

  const cartButton = () => {
    setCart(!cart);
  };

  const scrollHandler = () => {
    if (window.scrollY > 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className="site-header mo-left header header-transparent transparent-white style-1">
      <div
        className={`sticky-header main-bar-wraper navbar-expand-lg ${scroll ? "is-fixed" : ""
          }`}
      >
        <div className="main-bar clearfix ">
          <div className="container clearfix">
            <div className="logo-header">
              {headerClass ? (
                <>
                  {scroll ? (
                    <Link to="/" className="d-flex align-items-center">
                      <img
                        src={cmsConfig?.restaurantLogo || IMAGES.logo}
                        alt={cmsConfig?.restaurantName || "Logo"}
                        style={{ maxHeight: '55px', width: 'auto', objectFit: 'contain' }}
                      />
                    </Link>
                  ) : (
                    <Link to="/" className="d-flex align-items-center">
                      <img
                        src={cmsConfig?.restaurantLogo || IMAGES.logo2}
                        alt={cmsConfig?.restaurantName || "Logo"}
                        style={{ maxHeight: '55px', width: 'auto', objectFit: 'contain' }}
                      />
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/" className="d-flex align-items-center">
                  <img
                    src={cmsConfig?.restaurantLogo || IMAGES.logo}
                    alt={cmsConfig?.restaurantName || "Logo"}
                    style={{ maxHeight: '55px', width: 'auto', objectFit: 'contain' }}
                  />
                </Link>
              )}
            </div>

            <button
              className={`navbar-toggler collapsed navicon justify-content-end ${headerSidebar ? "open" : ""
                }`}
              type="button"
              onClick={() => {
                setHeaderSidebar(!headerSidebar);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="extra-nav">
              <div className="extra-cell">
                <ul>
                  <li>
                    <Link
                      className="btn btn-white btn-square btn-shadow"
                      to={"#"}
                      onClick={() => {
                        setShowSignInForm(true);
                      }}
                    >
                      <i className="flaticon-user"></i>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="btn btn-white btn-square btn-shadow cart-btn"
                      onClick={cartButton}
                    >
                      <i className="flaticon-shopping-bag-1"></i>
                      <span className="badge">{cartItems.length}</span>
                    </button>
                    <div
                      style={{
                        transition: "all 0.5s",
                        opacity: cart ? "1" : "0",
                      }}
                    >
                      <ul
                        className="dropdown-menu cart-list"
                        style={{
                          display: cart ? "block" : "",
                          transitionDuration: "0.5s",
                          opacity: cart ? "1" : "0",
                          overflow: "hidden",
                        }}
                      >
                        {cartItems.map((item, ind) => (
                          <li className="cart-item" key={item.id || ind}>
                            <div className="media">
                              <div className="media-left">
                                <Link to="/product-detail">
                                  <img
                                    alt={item.name}
                                    className="media-object"
                                    src={item.image || IMAGES.shop_pic2}
                                  />
                                </Link>
                              </div>
                              <div className="media-body">
                                <h6 className="dz-title">
                                  <Link
                                    to="/product-detail"
                                    className="media-heading"
                                  >
                                    {item.name}
                                  </Link>
                                </h6>
                                <span className="dz-price">{cmsConfig?.config?.currency || '$'} {Number(item.price).toFixed(0)} x {item.quantity}</span>
                                <span
                                  className="item-close"
                                  onClick={() => {
                                    removeFromCart(item.id);
                                  }}
                                >
                                  &times;
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                        {cartItems.length === 0 && (
                          <li className="cart-item text-center">
                            <h6 className="mb-0">Your cart is empty</h6>
                          </li>
                        )}
                        <li className="cart-item text-center d-flex justify-content-between">
                          <h6 className="text-primary mb-0">Total:</h6>
                          <h6 className="text-primary mb-0">
                            {cmsConfig?.config?.currency || '$'} {cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(0)}
                          </h6>
                        </li>
                        <li className="text-center d-flex">
                          <Link
                            to="/shop-cart"
                            className="btn btn-primary me-2 w-100 d-block btn-hover-1"
                          >
                            <span>View Cart</span>
                          </Link>
                          <Link
                            to="/our-menu-2"
                            className="btn btn-outline-primary w-100 d-block btn-hover-1"
                          >
                            <span>Menu</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`header-nav navbar-collapse justify-content-end ${headerSidebar ? "show" : ""
                }`}
              id="navbarNavDropdown"
            >
              {" "}
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
