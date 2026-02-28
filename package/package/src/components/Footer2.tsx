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

  const bgColor = footerContent.backgroundColor || "#0d0d0d";

  const renderLinks = (linksString: string) => {
    if (!linksString) return null;

    const routeMap: Record<string, string> = {
      "home": "/",
      "about us": "/about-us",
      "contact us": "/contact-us",
      "faq": "/faq",
      "our menu": "/our-menu-2",
      "blogs": "/blog-list",
      "blog": "/blog-list",
      "shop": "/shop-cart",
      "cart": "/shop-cart",
      "checkout": "/shop-cart",
      "frequently asked questions": "/faq"
    };

    return linksString.split(",").map((item: string, index: number) => {
      const label = item.trim();
      const target = routeMap[label.toLowerCase()] || "/#";
      return (
        <li key={index}>
          <Link to={target}><span>{label}</span></Link>
        </li>
      );
    });
  };

  if (!footerEnabled && !copyrightEnabled) return <Toaster position="bottom-right" reverseOrder={true} />;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      {footerEnabled && (
        <footer className="site-footer style-2" id="footer" style={{ color: 'white', position: 'relative', backgroundColor: 'transparent' }}>
          <style>
            {`
              .site-footer.style-2#footer {
                background-color: transparent !important;
                background-image: none !important;
              }
              .footer-card {
                background-color: ${bgColor} !important;
                margin: 0 40px 40px 40px;
                border-radius: 50px;
                padding: 60px 40px;
                position: relative;
                overflow: hidden;
              }
              .site-footer.style-2 .footer-top, 
              .site-footer.style-2 .footer-bottom {
                background-color: transparent !important;
              }
              .widget_services ul li {
                margin-bottom: 12px !important;
              }
              .widget_services ul li a {
                color: rgba(255,255,255,0.7) !important;
                font-size: 14px !important;
                transition: 0.3s;
              }
              .widget_services ul li a:hover {
                color: var(--primary) !important;
                padding-left: 5px;
              }
              .footer-title {
                font-weight: 700 !important;
                font-size: 18px !important;
                letter-spacing: 1px;
                color: white !important;
              }
              .widget_getintuch ul li {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 15px;
              }
              .widget_getintuch ul li i {
                font-size: 22px;
                color: var(--primary);
              }
              .widget_getintuch ul li p {
                color: rgba(255,255,255,0.7) !important;
                font-size: 14px !important;
                margin: 0;
              }
              @media (max-width: 991px) {
                .footer-card {
                  margin: 0 20px 40px 20px;
                  border-radius: 30px;
                  padding: 40px 20px;
                }
                .newsletter-box {
                  margin-top: 40px;
                  margin-left: 0 !important;
                  max-width: 100% !important;
                }
              }
              @media (max-width: 768px) {
                .footer-top {
                  padding-top: 0 !important;
                }
                .footer-logo {
                   text-align: center !important;
                }
                .footer-logo img {
                   margin: 0 auto;
                }
                .max-w-md {
                   text-align: center !important;
                   margin: 0 auto !important;
                }
                .newsletter-box {
                   text-align: center !important;
                }
                .dzSubscribe {
                   margin: 0 auto;
                }
                .site-footer.style-2 .footer-top .row > div {
                  text-align: center !important;
                }
                .widget_getintuch ul li {
                  justify-content: center;
                }
                .widget_services ul li {
                  text-align: center;
                }
              }
            `}
          </style>

          <div className="footer-card shadow-lg">
            <div className="footer-top" style={{ position: 'relative', zIndex: 1, padding: 0 }}>
              <div className="container">
                {/* TOP SECTION: LOGO & NEWSLETTER */}
                <div className="row align-items-center mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="col-lg-7 col-md-12 mb-5 mb-lg-0">
                    <div className="footer-logo mb-4">
                      <Link to="/">
                        <img
                          src={
                            cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.footerLogo ||
                            cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
                            cmsConfig?.restaurantLogo ||
                            IMAGES.logo2
                          }
                          alt="Logo"
                          style={{ maxWidth: '200px', height: 'auto' }}
                        />
                      </Link>
                    </div>
                    <p className="max-w-md" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '1.8' }}>
                      {footerContent.description || "Quality food delivered to your doorstep. Experience the best culinary delights with us."}
                    </p>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="newsletter-box" style={{ maxWidth: '480px', marginLeft: 'auto' }}>
                      <h4 className="text-white mb-4" style={{ fontWeight: '600', fontSize: '22px' }}>
                        {footerContent.newsletterTitle || "Subscribe To Our Newsletter"}
                      </h4>
                      <form className="dzSubscribe" action="#" method="post" style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor: 'white',
                        padding: '5px'
                      }}>
                        <input
                          name="dzEmail"
                          required
                          type="email"
                          className="form-control"
                          placeholder={footerContent.newsletterPlaceholder || "Enter Your Email"}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#333',
                            height: '55px',
                            padding: '0 20px',
                            fontSize: '15px',
                            flexGrow: 1,
                            outline: 'none',
                            boxShadow: 'none'
                          }}
                        />
                        <button
                          name="submit"
                          value="Submit"
                          type="submit"
                          className="btn"
                          style={{
                            height: '55px',
                            width: '60px',
                            minWidth: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'var(--primary)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: 0,
                            fontSize: '20px',
                            color: 'white',
                            transition: '0.3s'
                          }}
                        >
                          <i className="fas fa-arrow-right"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* BOTTOM SECTION: 4 COLUMNS */}
                <div className="row">
                  {/* CONTACT COLUMN */}
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div className="widget widget_getintuch">
                      <h5 className="footer-title m-b30">
                        {footerContent.contactTitle || "CONTACT"}
                      </h5>
                      <ul>
                        <li>
                          <i className="flaticon-placeholder"></i>
                          <p>{footerContent.address || "123 Street, City, Country"}</p>
                        </li>
                        <li>
                          <i className="flaticon-telephone"></i>
                          <p>{footerContent.contactPhone || "+123 456 789"}</p>
                        </li>
                        <li>
                          <i className="flaticon-email-1"></i>
                          <p>{footerContent.contactEmail || "info@example.com"}</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* OUR LINKS COLUMN */}
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div className="widget widget_services">
                      <h5 className="footer-title m-b30">
                        {footerContent.linksTitle || "OUR LINKS"}
                      </h5>
                      <ul>
                        {renderLinks(footerContent.links || "Home, About Us, Our Menu, Contact Us, FAQ")}
                      </ul>
                    </div>
                  </div>

                  {/* OUR SERVICES COLUMN */}
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div className="widget widget_services">
                      <h5 className="footer-title m-b30">
                        {footerContent.servicesTitle || "OUR SERVICES"}
                      </h5>
                      <ul>
                        {renderLinks(footerContent.services || "Fast Delivery, Seat Reservation, Pickup In Store, Online Order, Table Booking")}
                      </ul>
                    </div>
                  </div>

                  {/* HELP CENTER COLUMN */}
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div className="widget widget_services">
                      <h5 className="footer-title m-b30">
                        {footerContent.helpCenterTitle || "HELP CENTER"}
                      </h5>
                      <ul>
                        {renderLinks(footerContent.helpCenter || "Support, Terms & Conditions, Privacy Policy, Account, Feedback")}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {copyrightEnabled && (
            <div className="footer-bottom pb-5" style={{ padding: '0 0 20px 0' }}>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 text-center">
                    <span className="copyright-text" style={{ color: 'rgba(0,0,0,0.4)', fontSize: '13px' }}>
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
