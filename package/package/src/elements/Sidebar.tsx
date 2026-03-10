import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import SocialLinks from "./SocialLinks";

const Sidebar = () => {
  const { showSidebar, setShowSidebar, setShowOrderModal, cmsConfig, user } = useContext(Context);
  const storedPhone = localStorage.getItem("userPhone");
  const displayPhone = user?.phone || storedPhone || "";


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
          <div className="logo-contact text-center w-100 m-b30">
            <Link to="/" onClick={() => setShowSidebar(false)}>
              <img
                src={logoUrl}
                alt={restaurantName}
                style={{ maxHeight: '70px', width: 'auto', objectFit: 'contain', margin: '0 auto' }}
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
                  backgroundColor: cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10",
                  borderColor: cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10",
                  color: "#fff",
                  borderRadius: '10px'
                }}
                onClick={() => {
                  setShowSidebar(false);
                  setShowOrderModal(true);
                }}
              >
                <i className="fa-solid fa-location-dot"></i>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Change Location</span>
              </button>

              {displayPhone && (
                <div
                  className="d-flex align-items-center justify-content-center gap-2"
                  style={{
                    border: '1.5px solid #eee',
                    padding: '10px',
                    borderRadius: '10px',
                    color: '#555',
                    fontSize: '15px',
                    fontWeight: 600
                  }}
                >
                  <i className="fa-solid fa-phone" style={{ color: cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10" }}></i>
                  <span>{displayPhone}</span>
                </div>
              )}
            </div>
          </div>
          <div className="dz-title">
            <h4 className="m-b20">Contact Info</h4>
          </div>
          <div className="icon-bx-wraper left m-b20 d-flex align-items-center">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="fa-solid fa-phone-volume" style={{ color: '#fff', fontSize: '20px' }}></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte m-b5" style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Call Now</h6>
              <p className="m-b0" style={{ fontSize: '14px', color: '#666' }}>
                {footerContent.contactPhone || "Contact restaurant"}
              </p>
            </div>
          </div>
          <div className="icon-bx-wraper left m-b20 d-flex align-items-center">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="fa-solid fa-location-dot" style={{ color: '#fff', fontSize: '20px' }}></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte m-b5" style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Location</h6>
              <p className="m-b0" style={{ fontSize: '14px', color: '#666' }}>{footerContent.address || "Visit us today"}</p>
            </div>
          </div>
          <div className="icon-bx-wraper left m-b20 d-flex align-items-center">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="fa-solid fa-envelope-open-text" style={{ color: '#fff', fontSize: '20px' }}></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte m-b5" style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Email Now</h6>
              <p className="m-b0" style={{ fontSize: '14px', color: '#666' }}>{footerContent.contactEmail || "Email us"}</p>
            </div>
          </div>
          <div className="m-t30">
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
