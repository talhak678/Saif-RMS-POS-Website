import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import SocialLinks from "../elements/SocialLinks";

const routeMap: Record<string, string> = {
  "home": "/",
  "about us": "/about-us",
  "about": "/about-us",
  "our menu": "/our-menu-1",
  "menu": "/our-menu-1",
  "contact us": "/contact-us",
  "contact": "/contact-us",
  "faq": "/faq",
  "help": "/faq",
  "blogs": "/blog-list"
};

const Menu = ({ scroll = false }: { scroll?: boolean }) => {
  const { headerClass, setShowSignInForm, setHeaderSidebar, setShowOrderModal, cmsConfig } = useContext(Context);
  const { pathname } = useLocation();

  const headerSettings = cmsConfig?.config?.configJson?.home?.sections?.header || {};
  const menuItemsString = headerSettings.content?.menuItems || "Home, About Us, Our Menu, Contact Us, FAQ";

  const menuItems = menuItemsString.split(",").map((item: string) => {
    const name = item.trim();
    return {
      name,
      to: routeMap[name.toLowerCase()] || "/"
    };
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
                color: pathname === item.to
                  ? "#fe9f10"
                  : (headerClass && !scroll && window.innerWidth > 991)
                    ? "#ffffff"
                    : "#222222"
              }}
              to={item.to}
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
