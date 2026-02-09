import { useRef } from "react";
import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";

const Footer4 = () => {
  const heartRef = useRef<HTMLSpanElement | null>(null);
  return (
    <footer className="site-footer style-1 bg-dark" id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="widget widget_getintuch">
                <h5 className="footer-title">Contact</h5>
                <ul>
                  <li>
                    <i className="flaticon-placeholder"></i>
                    <p>
                      1247/Plot No. 39, 15th Phase, Colony, Kkatpally, Hyderabad
                    </p>
                  </li>
                  <li>
                    <i className="flaticon-telephone"></i>
                    <p>
                      +91 987-654-3210
                      <br />
                      +91 123-456-7890
                    </p>
                  </li>
                  <li>
                    <i className="flaticon-email-1"></i>
                    <p>
                      info@example.com
                      <br />
                      info@example.com
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-2 col-md-6 col-sm-6">
              <div className="widget widget_services">
                <h5 className="footer-title">Our Links</h5>
                <ul>
                  <li>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us">
                      <span>About Us</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/services">
                      <span>Services</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/team">
                      <span>Team</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog-standard">
                      <span>Blog</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div className="widget widget_services">
                <h5 className="footer-title">OUR SERVICES</h5>
                <ul>
                  <li>
                    <Link to="/blog-open-gutenberg">
                      <span>Strategy & Research</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/services">
                      <span>Fast Delivery</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us">
                      <span>Seat Reservation</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop-style-1">
                      <span>Pickup In Store</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/our-menu-1">
                      <span>Our Menu</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6	">
              <div className="widget widget_services">
                <h5 className="footer-title">Help Center</h5>
                <ul>
                  <li>
                    <Link to="/faq">
                      <span>FAQ</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop-style-1">
                      <span>Shop</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop-style-2">
                      <span>Category Filter</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/testimonial">
                      <span>Testimonials</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us">
                      <span>Contact Us</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom">
          <div className="row">
            <div className="col-xl-6 col-md-6 text-md-start">
              <p>Copyright 2023 All rights reserved.</p>
            </div>
            <div className="col-xl-6 col-md-6 text-md-end">
              <span className="copyright-text">
                Crafted With{" "}
                <span
                  className="heart"
                  ref={heartRef}
                  onClick={() => {
                    heartRef.current?.classList.toggle("heart-blast");
                  }}
                ></span>{" "}
                by{" "}
                <Link to="https://dexignzone.com/" target="_blank">
                  DexignZone
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
      <img className="bg1 dz-move" src={IMAGES.background_pic5} alt="/" />
      <img className="bg2 dz-move" src={IMAGES.background_pic6} alt="/" />
    </footer>
  );
};

export default Footer4;
