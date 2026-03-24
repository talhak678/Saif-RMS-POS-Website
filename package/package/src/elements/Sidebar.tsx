import { Link, useLocation, useNavigate } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import SocialLinks from "./SocialLinks";

const routeMap: Record<string, string> = {
  "home": "/",
  "about us": "/about-us",
  "about": "/about-us",
  "our menu": "/our-menu",
  "menu": "/our-menu",
  "contact us": "/contact-us",
  "contact": "/contact-us",
  "faq": "/faq",
  "help": "/faq",
  "blogs": "/blog-list",
  "reservation": "/contact-us#reservation-section"
};

const Sidebar = () => {
  const { showSidebar, setShowSidebar, setShowOrderModal, cmsConfig, user, setUser, setShowSignInForm } = useContext(Context);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const storedPhone = localStorage.getItem("userPhone");
  const displayPhone = user?.phone || storedPhone || "";

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  const footerContent = cmsConfig?.config?.configJson?.home?.sections?.footer?.content || {};
  const logoUrl = cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo || IMAGES.logo;
  const restaurantName = cmsConfig?.restaurantName || "Saif Kitchen";

  // Navigation Logic (same as Menu.tsx)
  const headerSettings = cmsConfig?.config?.configJson?.home?.sections?.header || {};
  let menuItemsString = headerSettings.content?.menuItems || "Home, Our Menu, About Us, Contact Us, Blogs";
  if (!menuItemsString.toLowerCase().includes("reservation")) menuItemsString += ", Reservation";

  const menuItems = menuItemsString.split(",").map((item: string) => {
    const name = item.trim();
    const key = name.toLowerCase();
    let cmsKey = key;
    if (key === 'about us' || key === 'about') cmsKey = 'about';
    if (key === 'blogs') cmsKey = 'blogs';
    if (key === 'faq' || key === 'help') cmsKey = 'faq';
    if (key === 'contact us' || key === 'contact') cmsKey = 'contact';
    if (key === 'our menu' || key === 'menu') cmsKey = 'menu';
    if (key === 'home') cmsKey = 'home';
    const isEnabled = cmsConfig?.config?.configJson?.[cmsKey]?.enabled !== false || key === 'reservation';
    return { name, to: routeMap[key] || "/", isEnabled };
  }).filter((item: any) => item.isEnabled)
    .sort((a: any, b: any) => {
      const order = ["home", "our menu", "about us", "reservation", "contact us", "blogs"];
      const indexA = order.indexOf(a.name.toLowerCase());
      const indexB = order.indexOf(b.name.toLowerCase());
      return (indexA > -1 ? indexA : 99) - (indexB > -1 ? indexB : 99);
    });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("customer");
    setShowSidebar(false);
    navigate("/");
  };

  return (
    <>
      <style>
        {`
          .contact-sidebar {
            overflow-y: auto !important;
          }
          .mobile-nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .mobile-nav-list li {
            border-bottom: 1px solid #f0f0f0;
          }
          .mobile-nav-list li a {
            display: block;
            padding: 12px 0;
            font-size: 16px;
            font-weight: 600;
            color: #222;
            transition: all 0.2s ease;
          }
          .mobile-nav-list li a.active {
            color: ${primaryColor} !important;
          }
          @media (max-width: 576px) {
            .contact-sidebar {
              width: 280px !important;
              padding: 30px 20px !important;
            }
          }
        `}
      </style>
      <div className={`contact-sidebar ${showSidebar ? "active" : ""}`}>
        <div className="contact-box1">
          {/* Logo */}
          <div className="logo-contact text-center w-100 m-b30">
            <Link to="/" onClick={() => setShowSidebar(false)}>
              <img src={logoUrl} alt={restaurantName} style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain' }} />
            </Link>
          </div>

          {/* User Section */}
          <div className="user-section m-b30 p-20" style={{ background: '#f9f9f9', borderRadius: '15px' }}>
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: primaryColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '18px' }}>
                  {user.name?.[0].toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <h6 className="m-b0" style={{ fontWeight: 700 }}>{user.name}</h6>
                  <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: '#ff4b2b', padding: 0, fontSize: '13px', fontWeight: 600 }}>Logout</button>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-3" onClick={() => { setShowSidebar(false); setShowSignInForm(true); }} style={{ cursor: 'pointer' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fa-solid fa-user" style={{ color: '#888' }}></i>
                </div>
                <div>
                  <h6 className="m-b0" style={{ fontWeight: 700 }}>Login / Register</h6>
                  <span style={{ fontSize: '12px', color: '#888' }}>Access your orders</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="m-b30">
            <div className="dz-title m-b15">
              <h4 className="m-b0" style={{ fontSize: '18px', fontWeight: 800 }}>Navigation</h4>
            </div>
            <ul className="mobile-nav-list">
              {menuItems.map((item: any, ind: number) => (
                <li key={ind}>
                  <Link
                    to={item.to}
                    className={pathname === item.to.split('#')[0] && (item.to.includes('#') ? hash === '#' + item.to.split('#')[1] : !hash) ? "active" : ""}
                    onClick={() => setShowSidebar(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link to="/my-account" onClick={() => setShowSidebar(false)}>My Account</Link>
                </li>
              )}
            </ul>
          </div>

          {/* About us */}
          <div className="m-b30 contact-text">
            <div className="dz-title m-b10">
              <h4 className="m-b0" style={{ fontSize: '18px' }}>About us</h4>
            </div>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
              {footerContent.description || "Quality food delivered to your doorstep."}
            </p>
          </div>

          {/* Customer Info */}
          <div className="m-b30 contact-text">
            <div className="dz-title m-b15">
              <h4 className="m-b0" style={{ fontSize: '18px' }}>Customer Info</h4>
            </div>
            <button
              className="btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2 m-b15"
              style={{ background: primaryColor, borderColor: primaryColor, borderRadius: '10px' }}
              onClick={() => { setShowSidebar(false); setShowOrderModal(true); }}
            >
              <i className="fa-solid fa-location-dot"></i>
              <span>Change Location</span>
            </button>
            {displayPhone && (
              <div className="d-flex align-items-center justify-content-center gap-2" style={{ border: '1.5px solid #eee', padding: '10px', borderRadius: '10px', color: '#555', fontSize: '14px' }}>
                <i className="fa-solid fa-phone" style={{ color: primaryColor }}></i>
                <span>{displayPhone}</span>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="icon-bx-wraper left m-b15 d-flex align-items-center">
            <div className="icon-content">
              <h6 className="tilte m-b0" style={{ fontSize: '14px', fontWeight: 700 }}>Call Now</h6>
              <p className="m-b0 font-13">{footerContent.contactPhone || "Contact restaurant"}</p>
            </div>
          </div>
          <div className="icon-bx-wraper left m-b15 d-flex align-items-center">
            <div className="icon-content">
              <h6 className="tilte m-b0" style={{ fontSize: '14px', fontWeight: 700 }}>Location</h6>
              <p className="m-b0 font-13">{footerContent.address || "Visit us today"}</p>
            </div>
          </div>

          <div className="m-t20">
            <SocialLinks />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

