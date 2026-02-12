import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useRef } from "react";

const Footer2 = () => {
  const heartRef = useRef<HTMLSpanElement | null>(null);
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <footer className="site-footer style-2" id="footer">
        <div className="footer-bg-wrapper" id="app-banner">
          <div className="footer-top">
            <div className="container">

              <div className="row justify-between">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 wow fadeInUp">
                  <div className="widget widget_getintuch">
                    <h5 className="footer-title">Contact</h5>
                    <ul>
                      <li>
                        <i className="flaticon-placeholder"></i>
                        <p>
                          1247/Plot No. 39, 15th Phase, Colony, Kkatpally,
                          Hyderabad
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
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
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
                        <Link to="/blog-list">
                          <span>Blog</span>
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

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                  <div className="widget widget_services">
                    <h5 className="footer-title">Help Center</h5>
                    <ul>
                      <li>
                        <Link to="/faq">
                          <span>FAQ</span>
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

                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 wow fadeInUp">
                  <div className="footer-logo">
                    <Link to="/" className="anim-logo-white">
                      <img src={IMAGES.logo2} alt="/" />
                    </Link>
                  </div>
                  <p className="text-white mb-0 font-14">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="container">
          <div className="footer-bottom">
            <div className="row">
              <div className="col-xl-6 col-lg-6">
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
              <div className="col-xl-6 col-lg-6 text-lg-end">
                <ul className="footer-link">
                  <li>
                    <Link to="/blog-list">Blog</Link>
                  </li>
                  <li>
                    <Link to="/about-us">About</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer2;
