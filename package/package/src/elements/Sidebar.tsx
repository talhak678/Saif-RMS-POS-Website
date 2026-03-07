import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import SocialLinks from "./SocialLinks";

const Sidebar = () => {
  const { showSidebar, setShowSidebar, setShowOrderModal, cmsConfig } = useContext(Context);

  const footerContent = cmsConfig?.config?.configJson?.home?.sections?.footer?.content || {};
  const logoUrl = cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo || IMAGES.logo;
  const restaurantName = cmsConfig?.restaurantName || "Saif Kitchen";

  return (
    <>
      <style>
        {`
          @media (max-width: 576px) {
            .contact-sidebar {
              width: 280px !important;
              padding: 30px 20px !important;
            }
            .contact-sidebar .logo-contact img {
              max-height: 45px !important;
            }
            .contact-sidebar h4 {
              font-size: 18px !important;
            }
            .contact-text p {
              font-size: 14px !important;
            }
          }
        `}
      </style>
      <div className={`contact-sidebar ${showSidebar ? "active" : ""}`}>
        <div className="contact-box1">
          <div className="logo-contact logo-header">
            <Link to="/" className="anim-logo" onClick={() => setShowSidebar(false)}>
              <img
                src={logoUrl}
                alt={restaurantName}
                style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain' }}
              />
            </Link>
          </div>
          <div className="m-b50 contact-text">
            <div className="dz-title">
              <h4 className="m-b0">About us</h4>
            </div>
            <p>
              {footerContent.description || "Quality food delivered to your doorstep. Experience the best culinary delights with us."}
            </p>
            <Link to="/about-us" className="btn btn-primary" onClick={() => setShowSidebar(false)}>
              <span>READ MORE</span>
            </Link>
          </div>
          <div className="m-b50 contact-text">
            <div className="dz-title">
              <h4 className="m-b15">Customer Info</h4>
            </div>
            <div className="customer-buttons d-flex flex-column gap-2">
              <button
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: cmsConfig?.config?.primaryColor || "#fe9f10",
                  borderColor: cmsConfig?.config?.primaryColor || "#fe9f10",
                  color: "#fff"
                }}
                onClick={() => {
                  setShowSidebar(false);
                  setShowOrderModal(true);
                }}
              >
                <i className="fa-solid fa-location-dot"></i>
                <span>Change Location</span>
              </button>
              {footerContent.contactPhone && (
                <button
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2"
                  onClick={() => window.open(`tel:${footerContent.contactPhone}`)}
                >
                  <i className="fa-solid fa-phone"></i>
                  <span>{footerContent.contactPhone}</span>
                </button>
              )}
            </div>
          </div>
          <div className="dz-title">
            <h4 className="m-b20">Contact Info</h4>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-phone-volume"></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte">Call Now</h6>
              <p className="m-b0">
                {footerContent.contactPhone || "+123 456 7890"}
              </p>
            </div>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-map-marker"></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte">Location</h6>
              <p className="m-b0">{footerContent.address || "123 Street, City, Country"}</p>
            </div>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-envelope-open"></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte">Email Now</h6>
              <p className="m-b0">{footerContent.contactEmail || "info@example.com"}</p>
            </div>
          </div>
          <div className="m-t50 dz-social-icon style-1">
            <SocialLinks />
          </div>
        </div>
      </div>
      <div
        className="menu-close"
        onClick={() => {
          setShowSidebar(false);
        }}
      ></div>
    </>
  );
};

export default Sidebar;
