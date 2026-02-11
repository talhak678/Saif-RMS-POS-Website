import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useRef, useState } from "react";

const Footer2 = () => {
  const heartRef = useRef<HTMLSpanElement | null>(null);
  const [input, setInput] = useState<string>("");
  const form = useRef<HTMLFormElement | null>(null);
  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setInput("");
    if (form.current) {
      emailjs
        .sendForm(
          "emailId",
          "template_0byuv32",
          form.current,
          "qUDIPykc776NYHv4m"
        )
        .then(
          () => {
            toast.success("Successfully send!");
          },
          (error) => {
            toast.error(error.text);
          }
        );
    }
  };
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <footer className="site-footer style-2" id="footer">
        <div className="footer-bg-wrapper" id="app-banner">
          <div className="footer-top">
            <div className="container">
              <div className="footer-subscribe-wrapper">
                <div className="wrapper-inner">
                  <div className="row justify-content-between">
                    <div className="col-xl-4 col-lg-4 m-lg-0 m-b20 wow fadeInUp">
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
                    <div className="col-xl-6 col-lg-6 wow fadeInUp">
                      <h4 className="text-white title m-b15">
                        Subscribe To Our Newsletter
                      </h4>
                      <form
                        className="dzSubscribe"
                        ref={form}
                        onSubmit={sendEmail}
                      >
                        <div className="dzSubscribeMsg text-white"></div>
                        <div className="input-group">
                          <input
                            name="dzEmail"
                            required
                            type="text"
                            value={input}
                            onChange={(e) => {
                              setInput(e.target.value);
                            }}
                            className="form-control"
                            placeholder="Enter Your Email"
                          />
                          <div className="input-group-addon">
                            <button
                              name="submit"
                              value="submit"
                              type="submit"
                              className="btn btn-primary btn-hover-2"
                            >
                              <span>Subscribe</span>
                              <i className="fa-solid fa-paper-plane"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp">
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
              <div className="col-xl-6 col-lg-6">
                <ul className="footer-link">
                  <li>
                    <Link to="/blog-standard">Blog Detail</Link>
                  </li>
                  <li>
                    <Link to="/about-us">About</Link>
                  </li>
                  <li>
                    <Link to="/testimonial">Testimonials</Link>
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
