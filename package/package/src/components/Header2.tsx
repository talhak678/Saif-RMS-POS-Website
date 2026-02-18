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
    cmsConfig
  } = useContext(Context);
  const [scroll, setScroll] = useState(false);

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
                  <img src={headerContent.logoUrl || cmsConfig?.restaurantLogo || IMAGES.logo} alt={cmsConfig?.restaurantName || "/"} />
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
                    {headerContent.showCart !== "false" && (
                      <li className="nav-item cart-link">
                        <Link to="/shop-cart" className="btn btn-white btn-square btn-shadow cart-btn">
                          <i className="flaticon-shopping-bag-1"></i>
                          <span className="badge">0</span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="extra-nav d-none d-lg-block">
                <div className="extra-cell flex items-center">
                  <ul className="header-right me-4">
                    {headerContent.showLogin !== "false" && (
                      <li>
                        <Link className="btn btn-white btn-square btn-shadow" to={"#"} onClick={() => setShowSignInForm(true)}>
                          <i className="flaticon-user"></i>
                        </Link>
                      </li>
                    )}
                    {headerContent.showCart !== "false" && (
                      <li className="nav-item cart-link">
                        <Link to="/shop-cart" className="btn btn-white btn-square btn-shadow cart-btn">
                          <i className="flaticon-shopping-bag-1"></i>
                          <span className="badge">0</span>
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
                <Menu scroll={scroll} />
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
