import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useRef, useState } from "react";

const Footer3 = () => {
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
      <footer className="site-footer style-3" id="footer">
        <div className="footer-bg-wrapper">
          <div className="container">
            <div className="footer-top">
              <div className="footer-subscribe-wrapper">
                <div className="wrapper-inner">
                  <div className="row justify-content-between">
                    <div className="col-xl-4 col-lg-4 mb-lg-0 m-b20 wow fadeInUp">
                      <div className="footer-logo">
                        <Link to="/" className="anim-logo">
                          <img src={IMAGES.logo} alt="swigo logo" />
                        </Link>
                      </div>
                      <p className="mb-0 font-14">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                    <div className="col-xl-6 col-lg-6 wow fadeInUp">
                      <h5 className="title m-b15">
                        Subscribe To Our Newsletter
                      </h5>
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
                            className="form-control border-0"
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
                <div className="col-lg-5 col-md-6 col-6 text-md-start">
                  <h5 className="footer-title wow fadeInUp">OUR LINKS</h5>
                  <div className="footer-menu wow fadeInUp">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link to="/services">Services</Link>
                      </li>
                      <li>
                        <Link to="/team">Team</Link>
                      </li>
                      <li>
                        <Link to="/blog-standard">Blog</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-7 col-md-6 col-6 text-md-end">
                  <h5 className="footer-title wow fadeInUp">Help Center</h5>
                  <div className="footer-menu wow fadeInUp">
                    <ul>
                      <li>
                        <Link to="/faq">FAQ</Link>
                      </li>
                      <li>
                        <Link to="/shop-style-1">Shop</Link>
                      </li>
                      <li>
                        <Link to="/shop-style-2">Category Filter</Link>
                      </li>
                      <li>
                        <Link to="/testimonial">Testimonials</Link>
                      </li>
                      <li>
                        <Link to="/contact-us">Contact Us</Link>
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
        </div>
        <img className="bg1 dz-move" src={IMAGES.background_pic5} alt="/" />
        <img className="bg2 dz-move" src={IMAGES.background_pic6} alt="/" />
      </footer>
    </>
  );
};

export default Footer3;
