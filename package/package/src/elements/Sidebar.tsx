import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useContext(Context);
  return (
    <>
      <div className={`contact-sidebar ${showSidebar ? "active" : ""}`}>
        <div className="contact-box1">
          <div className="logo-contact logo-header">
            <Link to="/" className="anim-logo">
              <img src={IMAGES.logo} alt="/" />
            </Link>
          </div>
          <div className="m-b50 contact-text">
            <div className="dz-title">
              <h4 className="m-b0">About us</h4>
            </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <Link to="/about-us" className="btn btn-primary btn-hover-2">
              <span>READ MORE</span>
            </Link>
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
                +91 123 456 7890,
                <br /> +91 987 654 3210
              </p>
            </div>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-envelope-open"></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte">Location</h6>
              <p className="m-b0">15/B Miranda House, New York, US</p>
            </div>
          </div>
          <div className="icon-bx-wraper left">
            <div className="icon-md m-r20">
              <span className="icon-cell">
                <i className="las la-map-marker"></i>
              </span>
            </div>
            <div className="icon-content">
              <h6 className="tilte">Email Now</h6>
              <p className="m-b0">info@gmail.com, services@gmail.com</p>
            </div>
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
