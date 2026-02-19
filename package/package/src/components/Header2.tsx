import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import Menu from "./Menu";
import Sidebar from "../elements/Sidebar";
import { Context } from "../context/AppContext";

const Header2 = () => {
  const {
    setShowSidebar,
    headerSidebar,
    setHeaderSidebar,
    headerClass,
    setShowSignInForm,
    cmsConfig,
    user,
    setUser,
    cartItems
  } = useContext(Context);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("customer");
  };
  const [scroll, setScroll] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const scrollHandler = () => {
    if (window.scrollY > 80) setScroll(true);
    else setScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const headerSettings = cmsConfig?.config?.configJson?.home?.sections?.header || {};
  const showHeader = headerSettings.enabled !== false;
  const headerContent = headerSettings.content || { showCart: "true", showLogin: "true" };

  if (!showHeader) return null;

  return (
    <>
      <header className={`site-header mo-left header style-2 ${headerClass ? "" : "header-transparent transparent-white"}`}>
        <div className={`sticky-header main-bar-wraper navbar-expand-lg ${scroll ? "is-fixed" : ""}`}>
          <div className="main-bar clearfix ">
            <div className="container-fluid clearfix">
              <div className="logo-header mostion">
                <Link to="/" className="anim-logo">
                  <img
                    src={
                      cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
                      headerContent.logoUrl ||
                      cmsConfig?.restaurantLogo ||
                      IMAGES.logo
                    }
                    alt={cmsConfig?.restaurantName || "Saif Kitchen"}
                  />
                </Link>
              </div>

              <button
                className={`navbar-toggler collapsed navicon justify-content-end ${headerSidebar ? "open" : ""}`}
                type="button"
                onClick={() => setHeaderSidebar(!headerSidebar)}
              >
                <span></span><span></span><span></span>
              </button>

              <div className="extra-nav d-lg-none d-flex align-items-center" style={{ float: 'right', height: 'var(--headerheight)' }}>
                <div className="extra-cell">
                  <ul className="header-right m-0">
                    {headerContent.showLogin !== "false" && (
                      <li className="nav-item">
                        {user ? (
                          <Link to="/my-account" className="btn btn-white btn-square btn-shadow me-2" style={{ border: 'none' }}>
                            <i className="flaticon-user"></i>
                          </Link>
                        ) : (
                          <button className="btn btn-white btn-square btn-shadow me-2" onClick={() => setShowSignInForm(true)} style={{ border: 'none' }}>
                            <i className="flaticon-user"></i>
                          </button>
                        )}
                      </li>
                    )}
                    {headerContent.showCart !== "false" && (
                      <li className="nav-item cart-link">
                        <Link to="/shop-cart" className="btn btn-white btn-square btn-shadow cart-btn">
                          <i className="flaticon-shopping-bag-1"></i>
                          <span className="badge">{cartItems.length}</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="extra-nav d-none d-lg-flex align-items-center">
                <div className="extra-cell d-flex align-items-center">
                  <ul className="header-right me-4">
                    {headerContent.showLogin !== "false" && (
                      <li style={{ position: 'relative' }}>
                        {user ? (
                          <>
                            <button
                              className="btn btn-white btn-shadow px-3"
                              onClick={() => setShowUserMenu(!showUserMenu)}
                              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                            >
                              <i className="flaticon-user me-1"></i>
                              <span>{user.name?.split(" ")[0]}</span>
                              <i className="fa fa-chevron-down" style={{ fontSize: 10, marginLeft: 4 }}></i>
                            </button>
                            {showUserMenu && (
                              <div style={{
                                position: 'absolute', top: '110%', right: 0, minWidth: 180,
                                background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                zIndex: 9999, overflow: 'hidden', border: '1px solid #f0f0f0'
                              }}>
                                <Link to="/my-account" onClick={() => setShowUserMenu(false)} style={{
                                  display: 'flex', alignItems: 'center', gap: 10,
                                  padding: '12px 16px', color: '#333', textDecoration: 'none',
                                  fontSize: 14, fontWeight: 500, borderBottom: '1px solid #f8f8f8'
                                }}>
                                  📦 My Orders
                                </Link>
                                <Link to="/track-order" onClick={() => setShowUserMenu(false)} style={{
                                  display: 'flex', alignItems: 'center', gap: 10,
                                  padding: '12px 16px', color: '#333', textDecoration: 'none',
                                  fontSize: 14, fontWeight: 500, borderBottom: '1px solid #f8f8f8'
                                }}>
                                  🔍 Track Order
                                </Link>
                                <button onClick={() => { handleLogout(); setShowUserMenu(false); }} style={{
                                  display: 'flex', alignItems: 'center', gap: 10,
                                  padding: '12px 16px', color: '#c62828', background: 'none',
                                  border: 'none', cursor: 'pointer', width: '100%',
                                  fontSize: 14, fontWeight: 500
                                }}>
                                  🚪 Logout
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <Link className="btn btn-white btn-square btn-shadow" to={"#"} onClick={() => setShowSignInForm(true)}>
                            <i className="flaticon-user"></i>
                          </Link>
                        )}
                      </li>
                    )}
                    {headerContent.showCart !== "false" && (
                      <li className="nav-item cart-link">
                        <Link to="/shop-cart" className="btn btn-white btn-square btn-shadow cart-btn">
                          <i className="flaticon-shopping-bag-1"></i>
                          <span className="badge">{cartItems.length}</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                  <div className="menu-btn" onClick={() => setShowSidebar(true)}>
                    <Link to={"#"}>
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.04102 17.3984H29.041" stroke={headerClass || scroll ? "#222222" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.04102 8.39844H29.541" stroke={headerClass || scroll ? "#222222" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.04102 25.3984H29.041" stroke={headerClass || scroll ? "#222222" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className={`header-nav navbar-collapse justify-content-center ${headerSidebar ? "show" : ""}`}
                id="navbarNavDropdown"
              >
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar />
    </>
  );
};

export default Header2;
