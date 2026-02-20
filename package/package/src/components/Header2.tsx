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
    setHeaderSidebar,
    headerClass,
    setShowSignInForm,
    cmsConfig,
    user,
    setUser,
    cartItems,
    // activeBranch
  } = useContext(Context);

  const isStoreClosed = false;

  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        navigate(`/our-menu-2?search=${encodeURIComponent(val.trim())}`);
      } else {
        navigate("/our-menu-2");
      }
    }, 350);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/our-menu-2?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const headerSettings = cmsConfig?.config?.configJson?.home?.sections?.header || {};
  const showHeader = headerSettings.enabled !== false;
  const headerContent = headerSettings.content || { showCart: "true", showLogin: "true" };
  const isLight = headerClass || scroll;
  const iconColor = isLight ? "#222222" : "#ffffff";

  if (!showHeader) return null;

  return (
    <>
      <header className={`site-header mo-left header style-2 ${headerClass ? "" : "header-transparent transparent-white"}`}>
        <div className={`sticky-header main-bar-wraper navbar-expand-lg ${scroll ? "is-fixed" : ""}`}>
          <div className="main-bar clearfix">
            <div className="container-fluid clearfix">

              {/* Logo */}
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

              {/* Mobile toggle */}
              <button
                className={`navbar-toggler collapsed navicon justify-content-end ${headerSidebar ? "open" : ""}`}
                type="button"
                onClick={() => setHeaderSidebar(!headerSidebar)}
              >
                <span></span><span></span><span></span>
              </button>

              {/* ─── Mobile Right Icons ─── */}
              <div className="extra-nav d-lg-none d-flex align-items-center" style={{ float: "right", height: "var(--headerheight)" }}>
                <div className="extra-cell">
                  <ul className="header-right m-0">
                    {headerContent.showLogin !== "false" && (
                      <li className="nav-item">
                        {user ? (
                          <Link to="/my-account" className="btn btn-white btn-square btn-shadow me-2" style={{ border: "none" }}>
                            <i className="flaticon-user"></i>
                          </Link>
                        ) : (
                          <button className="btn btn-white btn-square btn-shadow me-2" onClick={() => setShowSignInForm(true)} style={{ border: "none" }}>
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
                          onClick={() => { setSearchQuery(""); navigate("/our-menu-2"); }}
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
                                <button onClick={() => { handleLogout(); setShowUserMenu(false); }} style={{
                                  display: "flex", alignItems: "center", gap: 10,
                                  padding: "12px 16px", color: "#c62828", background: "none",
                                  border: "none", cursor: "pointer", width: "100%",
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
