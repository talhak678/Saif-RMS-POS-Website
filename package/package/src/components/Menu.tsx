import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import SocialLinks from "../elements/SocialLinks";

const routeMap: Record<string, string> = {
  "home": "/",
  "about us": "/about-us",
  "about": "/about-us",
  "our menu": "/our-menu-2",
  "menu": "/our-menu-2",
  "contact us": "/contact-us",
  "contact": "/contact-us",
  "faq": "/faq",
  "help": "/faq",
  "blogs": "/blog-list"
};

const Menu = () => {
  const { headerClass, setShowSignInForm, setHeaderSidebar, setShowOrderModal, cmsConfig } = useContext(Context);
  const { pathname } = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor
    || cmsConfig?.config?.primaryColor
    || '#7da640';

  const headerSettings = cmsConfig?.config?.configJson?.home?.sections?.header || {};
  const menuItemsString = headerSettings.content?.menuItems || "Home, Our Menu, About Us, Contact Us, Blogs";

  const menuItems = menuItemsString.split(",").map((item: string) => {
    const name = item.trim();
    const key = name.toLowerCase();

    // Map menu names to CMS config keys
    let cmsKey = key;
    if (key === 'about us' || key === 'about') cmsKey = 'about';
    if (key === 'blogs') cmsKey = 'blogs';
    if (key === 'faq' || key === 'help') cmsKey = 'faq';
    if (key === 'contact us' || key === 'contact') cmsKey = 'contact';
    if (key === 'our menu' || key === 'menu') cmsKey = 'menu';
    if (key === 'home') cmsKey = 'home';

    const isEnabled = cmsConfig?.config?.configJson?.[cmsKey]?.enabled !== false;

    return {
      name,
      to: routeMap[key] || "/",
      isEnabled
    };
  }).filter((item: any) => item.isEnabled)
    .sort((a: any, b: any) => {
      const order = ["home", "our menu", "about us", "contact us", "blogs"];
      const indexA = order.indexOf(a.name.toLowerCase());
      const indexB = order.indexOf(b.name.toLowerCase());
      return (indexA > -1 ? indexA : 99) - (indexB > -1 ? indexB : 99);
    });

  return (
    <>
      <div className="logo-header">
        <Link to="/" className="anim-logo">
          <img src={cmsConfig?.restaurantLogo || IMAGES.logo} alt="/" />
        </Link>
      </div>
      <ul
        className={`nav navbar-nav navbar ms-lg-4 ${headerClass ? "white" : ""
          } ${window.innerWidth <= 991 ? "mobile-nav" : ""}`}
      >
        <li className="nav-item d-lg-none border-bottom m-b20 p-b20">
          <div className="d-flex align-items-center gap-3 p-3">
            <Link
              className="btn btn-primary btn-square rounded-circle"
              to={"#"}
              onClick={() => {
                setShowSignInForm(true);
                setHeaderSidebar(false);
              }}
            >
              <i className="flaticon-user"></i>
            </Link>
            <div>
              <h6 className="m-b0">Hello, Guest</h6>
              <Link
                to={"#"}
                className="font-12 text-primary"
                onClick={() => {
                  setShowSignInForm(true);
                  setHeaderSidebar(false);
                }}
              >
                Login / Register
              </Link>
            </div>
          </div>
          <div className="p-3 pt-0">
            <h6 className="title m-b10 font-14">Customer Info</h6>
            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowOrderModal(true);
                  setHeaderSidebar(false);
                }}
              >
                <i className="fa-solid fa-location-dot"></i>
                <span>Change Location</span>
              </button>
            </div>
          </div>
        </li>

        {menuItems.map((item: any, ind: number) => (
          <li key={ind} className={pathname === item.to ? "active" : ""}>
            <Link
              style={{
                color: (pathname === item.to || hoveredIndex === ind)
                  ? primaryColor
                  : '#222222',
                transition: 'color 0.2s ease'
              }}
              to={item.to}
              onMouseEnter={() => setHoveredIndex(ind)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="dz-social-icon">
        <SocialLinks />
      </div>
    </>
  );
};

export default Menu;
