import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import Menu from "./Menu";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/AppContext";

const Header2 = () => {
  const { headerClass, headerSidebar, setHeaderSidebar, setShowSignInForm } =
    useContext(Context);
  const [cart, setCart] = useState<boolean>(false);
  const cartRef = useRef<HTMLLIElement[]>([]);
  const [scroll, setScroll] = useState<boolean>(false);

  const cartButton = () => {
    setCart(!cart);
  };
  const deletItems = (ind: number) => {
    cartRef.current[ind].classList.add("cartListItems");
    setTimeout(() => {
      cartRef.current[ind].remove();
    }, 500);
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
    <header className="site-header mo-left header style-1">
      <div
        className={`sticky-header main-bar-wraper navbar-expand-lg ${
          scroll ? "is-fixed" : ""
        }`}
      >
        <div className="main-bar clearfix ">
          <div className="container clearfix">
            <div className="logo-header mostion">
              <div className="logo-header mostion">
                {headerClass ? (
                  <Link to="/" className="anim-logo-white">
                    <img src={IMAGES.logo2} alt="/" />
                  </Link>
                ) : (
                  <Link to="/" className="anim-logo">
                    <img src={IMAGES.logo} alt="/" />
                  </Link>
                )}
              </div>
            </div>
            <button
              className={`navbar-toggler collapsed navicon justify-content-end ${
                headerSidebar ? "open" : ""
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
                      to={"#"}
                      className={`btn btn-${
                        headerClass ? "white" : "primary"
                      } btn-square btn-shadow`}
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
                      className={`btn btn-${
                        headerClass ? "white" : "primary"
                      } btn-square btn-shadow cart-btn`}
                      onClick={cartButton}
                    >
                      <i className="flaticon-shopping-bag-1"></i>
                      <span className="badge">6</span>
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
                        <li
                          className="cart-item"
                          ref={(node) => {
                            if (node) {
                              cartRef.current.push(node);
                            }
                          }}
                        >
                          <div className="media">
                            <div className="media-left">
                              <Link to="/product-detail">
                                <img
                                  alt="/"
                                  className="media-object"
                                  src={IMAGES.shop_pic2}
                                />
                              </Link>
                            </div>
                            <div className="media-body">
                              <h6 className="dz-title">
                                <Link
                                  to="/product-detail"
                                  className="media-heading"
                                >
                                  Double Burger
                                </Link>
                              </h6>
                              <span className="dz-price">$28.00</span>
                              <span
                                className="item-close"
                                onClick={() => {
                                  deletItems(0);
                                }}
                              >
                                &times;
                              </span>
                            </div>
                          </div>
                        </li>
                        <li
                          className="cart-item"
                          ref={(node) => {
                            if (node) {
                              cartRef.current.push(node);
                            }
                          }}
                        >
                          <div className="media">
                            <div className="media-left">
                              <Link to="/product-detail">
                                <img
                                  alt="/"
                                  className="media-object"
                                  src={IMAGES.shop_pic3}
                                />
                              </Link>
                            </div>
                            <div className="media-body">
                              <h6 className="dz-title">
                                <Link
                                  to="/product-detail"
                                  className="media-heading"
                                >
                                  Cheese Burger
                                </Link>
                              </h6>
                              <span className="dz-price">$20.00</span>
                              <span
                                className="item-close"
                                onClick={() => {
                                  deletItems(1);
                                }}
                              >
                                &times;
                              </span>
                            </div>
                          </div>
                        </li>
                        <li
                          className="cart-item"
                          ref={(node) => {
                            if (node) {
                              cartRef.current.push(node);
                            }
                          }}
                        >
                          <div className="media">
                            <div className="media-left">
                              <Link to="/product-detail">
                                <img
                                  alt="/"
                                  className="media-object"
                                  src={IMAGES.shop_pic4}
                                />
                              </Link>
                            </div>
                            <div className="media-body">
                              <h6 className="dz-title">
                                <Link
                                  to="/product-detail"
                                  className="media-heading"
                                >
                                  Burger
                                </Link>
                              </h6>
                              <span className="dz-price">$15.00</span>
                              <span
                                className="item-close"
                                onClick={() => {
                                  deletItems(2);
                                }}
                              >
                                &times;
                              </span>
                            </div>
                          </div>
                        </li>
                        <li className="cart-item text-center d-flex justify-content-between">
                          <h6 className="text-primary mb-0">Total:</h6>
                          <h6 className="text-primary mb-0">$63</h6>
                        </li>
                        <li className="text-center d-flex">
                          <Link
                            to="/shop-cart"
                            className="btn btn-primary me-2 w-100 d-block btn-hover-1"
                          >
                            <span>View Cart</span>
                          </Link>
                          <Link
                            to="/our-menu-1"
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
              className={`header-nav navbar-collapse justify-content-end ${
                headerSidebar ? "show" : ""
              }`}
              id="navbarNavDropdown"
            >
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header2;
