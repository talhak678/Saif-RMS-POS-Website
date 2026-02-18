import { useContext } from "react";
import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Context } from "../context/AppContext";

const Footer2 = () => {
  const { cmsConfig } = useContext(Context);


  const homeSections = cmsConfig?.config?.configJson?.home?.sections || {};
  const footerEnabled = homeSections.footer?.enabled !== false;
  const footerContent = homeSections.footer?.content || {};
  const copyrightEnabled = homeSections.copyrightBar?.enabled !== false;
  const copyrightContent = homeSections.copyrightBar?.content || {};

  if (!footerEnabled && !copyrightEnabled) return <Toaster position="bottom-right" reverseOrder={true} />;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      {footerEnabled && (
        <footer className="site-footer style-2" id="footer">
          <div className="footer-bg-wrapper" id="app-banner">
            <div className="footer-top">
              <div className="container">
                <div className="row justify-between">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp">
                    <div className="widget widget_getintuch">
                      <h5 className="footer-title">Contact Us</h5>
                      <ul>
                        <li>
                          <i className="flaticon-placeholder"></i>
                          <p>{footerContent.address || "123 Street, City, Country"}</p>
                        </li>
                        <li>
                          <i className="flaticon-telephone"></i>
                          <p>{footerContent.contactPhone || "+123 456 789"}<br />{cmsConfig?.phone || ""}</p>
                        </li>
                        <li>
                          <i className="flaticon-email-1"></i>
                          <p>{footerContent.contactEmail || "info@example.com"}<br />{cmsConfig?.email || ""}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                    <div className="widget widget_services text-center">
                      <div className="footer-logo mb-4">
                        <Link to="/" className="anim-logo-white">
                          <img
                            src={
                              cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.footerLogo ||
                              cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
                              cmsConfig?.restaurantLogo ||
                              IMAGES.logo2
                            }
                            alt="/"
                            style={{ maxWidth: '180px' }}
                          />
                        </Link>
                      </div>
                      <p className="text-white mb-0 font-14">
                        {footerContent.description || `${cmsConfig?.restaurantName || "Saif Restaurant"} - Quality food delivered to your doorstep.`}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-lg-end">
                    <div className="widget widget_services">
                      <h5 className="footer-title">Quick Links</h5>
                      <ul>
                        <li><Link to="/"><span>Home</span></Link></li>
                        <li><Link to="/about-us"><span>About Us</span></Link></li>
                        <li><Link to="/contact-us"><span>Contact Us</span></Link></li>
                        <li><Link to="/faq"><span>Help Center</span></Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {copyrightEnabled && (
            <div className="container">
              <div className="footer-bottom">
                <div className="row">
                  <div className="col-xl-12 text-center">
                    <span className="copyright-text">
                      {copyrightContent.text || `Copyright © ${new Date().getFullYear()} ${cmsConfig?.restaurantName || "Saif RMS"}. All Rights Reserved.`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </footer>
      )}
    </>
  );
};

export default Footer2;
