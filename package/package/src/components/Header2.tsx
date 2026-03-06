import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import Menu from "./Menu";
import Sidebar from "../elements/Sidebar";
import { Context } from "../context/AppContext";

const Header2 = () => {
  const {
    setShowSidebar,
    headerSidebar,
    // setHeaderSidebar,
    headerClass,
    setShowSignInForm,
    cmsConfig,
    user,
    setUser,
    cartItems,
    removeFromCart,
    isStoreClosed
  } = useContext(Context);



  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("customer");
  };

  const scrollHandler = () => {
    if (window.scrollY > 80) setScroll(true);
    else setScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Debounced search — navigate to menu page with search param
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      if (val.trim()) {
        navigate(`/our-menu?search=${encodeURIComponent(val.trim())}`);
      } else {
        navigate("/our-menu");
      }
    }, 350);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/our-menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const headerSettings = cmsConfig?.config?.configJson?.home?.sections?.header || {};
  const showHeader = headerSettings.enabled !== false;
  const headerContent = headerSettings.content || { showCart: "true", showLogin: "true" };
  const isLight = headerClass || scroll;
  const iconColor = isLight ? "#222222" : "#ffffff";
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";

  if (!showHeader) return null;

  const formatTo12Hour = (timeStr: string) => {
    if (!timeStr) return "";
    if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return timeStr;
    const period = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    return `${h12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 991px) {
            .main-bar .container-fluid {
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              padding: 0 15px !important;
            }
            .logo-header {
              height: 70px !important;
              display: flex !important;
              align-items: center !important;
              float: none !important;
              margin: 0 !important;
              width: auto !important;
            }
            .logo-header img {
              max-height: 40px !important;
            }
            .logo-header {
              flex: 1 !important;
            }
            .mobile-nav-area {
              display: flex !important;
              align-items: center !important;
              justify-content: flex-end !important;
              gap: 12px !important;
            }
            .extra-nav-mobile {
              display: flex !important;
              align-items: center !important;
              float: none !important;
              margin: 0 !important;
              height: 70px !important;
            }
            .navbar-toggler {
              margin: 0 0 0 10px !important;
              float: none !important;
              height: 40px !important;
              width: 40px !important;
              padding: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              justify-content: center !important;
              align-items: center !important;
            }
            .extra-nav {
               display: none !important;
            }
            .extra-nav-mobile {
               display: flex !important;
               align-items: center !important;
               gap: 10px !important;
            }
            .header-right .badge {
               top: -5px !important;
               right: -5px !important;
            }
            .navbar-toggler span {
               background: ${iconColor} !important;
               height: 3px !important;
               width: 30px !important;
               display: block !important;
               margin: 6px 0 !important;
               border-radius: 3px !important;
               transition: all 0.3s ease !important;
            }
            .navbar-toggler.open span:nth-child(1) {
               transform: translateY(9px) rotate(45deg) !important;
            }
            .navbar-toggler.open span:nth-child(2) {
               opacity: 0 !important;
            }
            .navbar-toggler.open span:nth-child(3) {
               transform: translateY(-9px) rotate(-45deg) !important;
            }
          }
          /* Fix for cart buttons hover issue */
          header.site-header .cart-btn-primary,
          header.site-header .cart-btn-primary:hover,
          header.site-header .cart-btn-primary:focus,
          header.site-header .cart-btn-primary:active {
            background-color: ${primaryColor} !important;
            color: #ffffff !important;
            border: none !important;
            box-shadow: none !important;
            transition: none !important;
          }
          header.site-header .cart-btn-outline,
          header.site-header .cart-btn-outline:hover,
          header.site-header .cart-btn-outline:focus,
          header.site-header .cart-btn-outline:active {
            background-color: #ffffff !important;
            color: ${primaryColor} !important;
            border: 1.5px solid ${primaryColor} !important;
            box-shadow: none !important;
            transition: none !important;
          }
        `}
      </style>
      {isStoreClosed && (
        <div style={{
          backgroundColor: '#ff4b2b',
          color: '#fff',
          textAlign: 'center',
          padding: '8px 15px',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          position: 'relative',
          zIndex: 10001,
          boxShadow: '0 2px 10px rgba(255, 75, 43, 0.2)'
        }}>
          <i className="fa-solid fa-clock me-2"></i>
          WE ARE CURRENTLY CLOSED. ORDERS WILL BE PROCESSED DURING OPENING HOURS ({formatTo12Hour(headerContent.openingTime) || '9:00 AM'} - {formatTo12Hour(headerContent.closingTime) || '1:00 AM'})
        </div>
      )}
      <header className={`site-header mo-left header style-2 ${headerClass ? "" : "header-transparent transparent-white"}`}>
        <div className={`sticky-header main-bar-wraper navbar-expand-lg ${scroll ? "is-fixed" : ""}`}>
          <div className="main-bar clearfix">
            <div className="container-fluid clearfix">

              {/* Logo */}
              <div className="logo-header">
                <Link to="/" className="d-flex align-items-center">
                  <img
                    src={
                      cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
                      headerContent.logoUrl ||
                      cmsConfig?.restaurantLogo ||
                      IMAGES.logo
                    }
                    alt={cmsConfig?.restaurantName || "Saif Kitchen"}
                    style={{ maxHeight: '55px', width: 'auto', objectFit: 'contain' }}
                  />
                </Link>
                {isStoreClosed && (
                  <span style={{
                    marginLeft: '15px',
                    background: '#ff4b2b',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 10px rgba(255, 75, 43, 0.3)'
                  }}>
                    • Closed
                  </span>
                )}
              </div>

              {/* ─── Mobile Right Area (Icons + Toggler) ─── */}
              <div className="d-lg-none mobile-nav-area">
                {/* Cart Icon */}
                <div className="extra-nav-mobile">
                  <ul className="header-right m-0 p-0" style={{ listStyle: 'none' }}>
                    {headerContent.showCart !== "false" && (
                      <li className="nav-item cart-link" style={{ position: 'relative' }}>
                        <button
                          className="btn btn-white btn-square btn-shadow cart-btn header-icon-btn"
                          style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          onClick={() => setCartOpen(!cartOpen)}
                        >
                          <i className="flaticon-shopping-bag-1"></i>
                          <span className="badge">{cartItems.length}</span>
                        </button>

                        {/* Mobile Cart Dropdown */}
                        <div
                          style={{
                            position: "absolute",
                            top: "120%",
                            right: "-60px",
                            width: "270px",
                            background: "#fff",
                            borderRadius: "15px",
                            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                            zIndex: 10000,
                            padding: "15px",
                            display: cartOpen ? "block" : "none",
                            border: "1px solid #f0f0f0"
                          }}
                        >
                          <div style={{ maxHeight: "400px", overflowY: "auto", marginBottom: "15px", paddingRight: "4px" }}>
                            {cartItems.map((item) => (
                              <div key={item.id} style={{ display: "flex", gap: "10px", marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px dashed #eee", position: "relative" }}>
                                <img src={item.image || IMAGES.shop_pic2} alt={item.name} style={{ width: "55px", height: "55px", borderRadius: "8px", objectFit: "cover" }} />
                                <div style={{ flex: 1 }}>
                                  <h6 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "2px", color: "#222" }}>{item.name}</h6>
                                  <p style={{ fontSize: "13px", color: primaryColor, fontWeight: 600, margin: 0 }}>
                                    {cmsConfig?.config?.currency || '$'}{Number(item.price).toFixed(0)}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  style={{
                                    background: primaryColor,
                                    color: "#fff",
                                    border: "none",
                                    width: "22px",
                                    height: "22px",
                                    borderRadius: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            {cartItems.length === 0 && (
                              <div className="text-center py-2">
                                <p style={{ color: "#888", marginBottom: 0, fontSize: '13px' }}>Empty</p>
                              </div>
                            )}
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", paddingTop: "8px", borderTop: "1px dashed #ddd" }}>
                            <h6 style={{ margin: 0, fontWeight: 700, fontSize: '16px', color: primaryColor }}>Total:</h6>
                            <h6 style={{ margin: 0, fontWeight: 800, color: primaryColor, fontSize: '16px' }}>
                              {cmsConfig?.config?.currency || '$'}{cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(0)}
                            </h6>
                          </div>

                          <div style={{ display: "flex", gap: "8px" }}>
                            <Link
                              to="/shop-cart"
                              className="btn btn-sm w-100 cart-btn-primary"
                              style={{ borderRadius: "8px", padding: "10px", fontSize: '13px', background: primaryColor, color: "#fff", border: "none" }}
                              onClick={() => setCartOpen(false)}
                            >
                              View Cart
                            </Link>
                            <Link
                              to="/our-menu"
                              className="btn btn-sm w-100 cart-btn-outline"
                              style={{ borderRadius: "8px", padding: "10px", fontSize: '13px', background: "#fff", border: `1.5px solid ${primaryColor}`, color: primaryColor }}
                              onClick={() => setCartOpen(false)}
                            >
                              Menu
                            </Link>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Main Menu Hamburger */}
                <button
                  className={`navbar-toggler navicon p-0 ${headerSidebar ? "open" : ""}`}
                  type="button"
                  onClick={() => setShowSidebar(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <span></span><span></span><span></span>
                </button>
              </div>


              {/* ─── Desktop Right Area ─── */}
              <div className="extra-nav d-none d-lg-flex align-items-center">
                <div className="extra-cell d-flex align-items-center gap-3">

                  {/* 🔍 Search Input */}
                  <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      background: isLight
                        ? (searchFocused ? "#fff" : "rgba(0,0,0,0.06)")
                        : (searchFocused ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.15)"),
                      borderRadius: 50,
                      padding: "7px 16px",
                      gap: 8,
                      border: searchFocused
                        ? `2px solid ${cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35"}`
                        : "2px solid transparent",
                      transition: "all 0.25s ease",
                      minWidth: searchFocused ? 240 : 180,
                      boxShadow: searchFocused ? "0 4px 20px rgba(0,0,0,0.12)" : "none",
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={isLight ? "#555" : (searchFocused ? "#555" : "rgba(255,255,255,0.8)")} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search menu..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        style={{
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          fontSize: 13,
                          fontWeight: 500,
                          color: isLight ? "#222" : (searchFocused ? "#222" : "#fff"),
                          width: "100%",
                        }}
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => { setSearchQuery(""); navigate("/our-menu"); }}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isLight ? "#888" : "rgba(255,255,255,0.8)"} strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </form>

                  {/* User + Cart */}
                  <ul className="header-right" style={{ marginBottom: 0 }}>
                    {headerContent.showLogin !== "false" && (
                      <li style={{ position: "relative" }}>
                        {user ? (
                          <>
                            <button
                              className="btn btn-white btn-shadow px-3"
                              onClick={() => setShowUserMenu(!showUserMenu)}
                              style={{ display: "flex", alignItems: "center", gap: 6 }}
                            >
                              <i className="flaticon-user me-1"></i>
                              <span>{user.name?.split(" ")[0]}</span>
                              <i className="fa fa-chevron-down" style={{ fontSize: 10, marginLeft: 4 }}></i>
                            </button>
                            {showUserMenu && (
                              <div style={{
                                position: "absolute", top: "110%", right: 0, minWidth: 180,
                                background: "#fff", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                                zIndex: 9999, overflow: "hidden", border: "1px solid #f0f0f0"
                              }}>
                                <Link to="/my-account" onClick={() => setShowUserMenu(false)} style={{
                                  display: "flex", alignItems: "center", gap: 10,
                                  padding: "12px 16px", color: "#333", textDecoration: "none",
                                  fontSize: 14, fontWeight: 500, borderBottom: "1px solid #f8f8f8"
                                }}>
                                  📦 My Orders
                                </Link>
                                <Link to="/track-order" onClick={() => setShowUserMenu(false)} style={{
                                  display: "flex", alignItems: "center", gap: 10,
                                  padding: "12px 16px", color: "#333", textDecoration: "none",
                                  fontSize: 14, fontWeight: 500, borderBottom: "1px solid #f8f8f8"
                                }}>
                                  🔍 Track Order
                                </Link>
                                <button
                                  className="logout-btn"
                                  onClick={() => { handleLogout(); setShowUserMenu(false); }}
                                  style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    padding: "12px 16px", color: "#c62828", background: "none",
                                    border: "none", cursor: "pointer", width: "100%",
                                    fontSize: 14, fontWeight: 500
                                  }}
                                >
                                  🚪 Logout
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          <Link className="btn btn-white btn-square btn-shadow header-icon-btn" to={"#"} onClick={() => setShowSignInForm(true)}>
                            <i className="flaticon-user"></i>
                          </Link>
                        )}
                      </li>
                    )}
                    {headerContent.showCart !== "false" && (
                      <li className="nav-item cart-link" style={{ position: 'relative' }}>
                        <button
                          type="button"
                          className="btn btn-white btn-square btn-shadow cart-btn header-icon-btn"
                          onClick={() => setCartOpen(!cartOpen)}
                        >
                          <i className="flaticon-shopping-bag-1"></i>
                          <span className="badge">{cartItems.length}</span>
                        </button>

                        {/* Cart Dropdown */}
                        <div
                          style={{
                            position: "absolute",
                            top: "110%",
                            right: 0,
                            width: "280px",
                            background: "#fff",
                            borderRadius: "15px",
                            boxShadow: "0 15px 60px rgba(0,0,0,0.18)",
                            zIndex: 10000,
                            padding: "20px",
                            display: cartOpen ? "block" : "none",
                            border: "1px solid #f0f0f0"
                          }}
                        >
                          <div style={{ maxHeight: "450px", overflowY: "auto", marginBottom: "15px", paddingRight: "5px" }}>
                            {cartItems.map((item) => (
                              <div key={item.id} style={{ display: "flex", gap: "15px", marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px dashed #eee", position: "relative" }}>
                                <img src={item.image || IMAGES.shop_pic2} alt={item.name} style={{ width: "75px", height: "75px", borderRadius: "10px", objectFit: "cover" }} />
                                <div style={{ flex: 1 }}>
                                  <h6 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px", color: "#222" }}>{item.name}</h6>
                                  <p style={{ fontSize: "15px", color: primaryColor, fontWeight: 600, margin: 0 }}>
                                    {cmsConfig?.config?.currency || '$'}{Number(item.price).toFixed(0)}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  style={{
                                    background: primaryColor,
                                    color: "#fff",
                                    border: "none",
                                    width: "26px",
                                    height: "26px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "bold"
                                  }}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            {cartItems.length === 0 && (
                              <div className="text-center py-3">
                                <p style={{ color: "#888", marginBottom: 0, fontSize: "15px" }}>Your cart is empty</p>
                              </div>
                            )}
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", paddingTop: "12px", borderTop: "2px dashed #eee" }}>
                            <h6 style={{ margin: 0, fontWeight: 700, fontSize: "18px", color: primaryColor }}>Total:</h6>
                            <h6 style={{ margin: 0, fontWeight: 800, color: primaryColor, fontSize: "18px" }}>
                              {cmsConfig?.config?.currency || '$'}{cartItems.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(0)}
                            </h6>
                          </div>

                          <div style={{ display: "flex", gap: "10px" }}>
                            <Link
                              to="/shop-cart"
                              className="btn w-100 cart-btn-primary"
                              style={{ borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: "600", background: primaryColor, color: "#fff", border: "none" }}
                              onClick={() => setCartOpen(false)}
                            >
                              View Cart
                            </Link>
                            <Link
                              to="/our-menu"
                              className="btn w-100 cart-btn-outline"
                              style={{ borderRadius: "10px", padding: "12px", fontSize: "14px", fontWeight: "600", background: "#fff", border: `1.5px solid ${primaryColor}`, color: primaryColor }}
                              onClick={() => setCartOpen(false)}
                            >
                              Menu
                            </Link>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>

                  {/* Hamburger / Sidebar toggle */}
                  <div className="menu-btn" onClick={() => setShowSidebar(true)}>
                    <Link to={"#"}>
                      <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.04102 17.3984H29.041" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.04102 8.39844H29.541" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.04102 25.3984H29.041" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Nav Menu */}
              <div
                className={`header-nav navbar-collapse justify-content-center d-none d-lg-flex ${headerSidebar ? "show" : ""}`}
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
