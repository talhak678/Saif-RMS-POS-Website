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
    return linksString.split(",").map((item: string, index: number) => (
      <li key={index}>
        <Link to="/#"><span>{item.trim()}</span></Link>
      </li>
    ));
  };

  if (!footerEnabled && !copyrightEnabled) return <Toaster position="bottom-right" reverseOrder={true} />;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      {footerEnabled && (
        <footer className="site-footer style-2" id="footer" style={{ backgroundColor: `${bgColor} !important`, color: 'white' }}>
          <div className="footer-top" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '60px' }}>
            <div className="container">
              {/* TOP SECTION: LOGO & NEWSLETTER */}
              <div className="row align-items-center mb-5 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
                  <div className="footer-logo mb-3 flex items-center gap-3">
                    <Link to="/" className="anim-logo-white">
                      <img
                        src={
                          cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.footerLogo ||
                          cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
                          cmsConfig?.restaurantLogo ||
                          IMAGES.logo2
                        }
                        alt="/"
                        style={{ maxWidth: '150px' }}
                      />
                    </Link>
                    <h3 className="mb-0 text-white font-bold tracking-wider" style={{ fontSize: '24px' }}>
                      {footerContent.logoTitle || cmsConfig?.restaurantName || "Saif RMS"}
                    </h3>
                  </div>
                  <p className="max-w-md mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.8' }}>
                    {footerContent.description || "Quality food delivered to your doorstep. Experience the best culinary delights with us."}
                  </p>

                  {/* DYNAMIC SOCIAL ICONS */}
                  <div className="dz-social-icon flex gap-3">
                    {footerContent.facebook && (
                      <a href={footerContent.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-all">
                        <i className="fab fa-facebook-f text-white"></i>
                      </a>
                    )}
                    {footerContent.instagram && (
                      <a href={footerContent.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-all">
                        <i className="fab fa-instagram text-white"></i>
                      </a>
                    )}
                    {footerContent.tiktok && (
                      <a href={footerContent.tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-500 transition-all">
                        <i className="fab fa-tiktok text-white"></i>
                      </a>
                    )}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="newsletter-box">
                    <h5 className="text-white mb-3" style={{ fontWeight: '600' }}>
                      {footerContent.newsletterTitle || "Subscribe To Our Newsletter"}
                    </h5>
                    <form className="dzSubscribe flex gap-2" action="script/mail-php.php" method="post">
                      <div className="flex-grow">
                        <input
                          name="dzEmail"
                          required
                          type="email"
                          className="form-control"
                          placeholder={footerContent.newsletterPlaceholder || "Enter Your Email"}
                          style={{
                            backgroundColor: 'white',
                            border: 'none',
                            color: '#333',
                            height: '50px',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                      <button
                        name="submit"
                        value="Submit"
                        type="submit"
                        className="btn btn-primary btn-hover-2"
                        style={{
                          height: '50px',
                          padding: '0 30px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--primary)',
                          border: 'none'
                        }}
                      >
                        <span>{footerContent.newsletterButtonText || "Subscribe"}</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* BOTTOM SECTION: 4 COLUMNS */}
              <div className="row">
                {/* CONTACT COLUMN */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4 wow fadeInUp">
                  <div className="widget widget_getintuch">
                    <h5 className="footer-title text-white" style={{ textTransform: 'uppercase', marginBottom: '25px', fontWeight: '700' }}>
                      {footerContent.contactTitle || "CONTACT"}
                    </h5>
                    <ul>
                      <li className="flex gap-3 mb-4">
                        <i className="flaticon-placeholder" style={{ color: 'var(--primary)', fontSize: '20px' }}></i>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>
                          {footerContent.address || "123 Street, City, Country"}
                        </p>
                      </li>
                      <li className="flex gap-3 mb-4">
                        <i className="flaticon-telephone" style={{ color: 'var(--primary)', fontSize: '20px' }}></i>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>
                          {footerContent.contactPhone || "+123 456 789"}
                        </p>
                      </li>
                      <li className="flex gap-3 mb-4">
                        <i className="flaticon-email-1" style={{ color: 'var(--primary)', fontSize: '20px' }}></i>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>
                          {footerContent.contactEmail || "info@example.com"}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* OUR LINKS COLUMN */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4 wow fadeInUp">
                  <div className="widget widget_services">
                    <h5 className="footer-title text-white" style={{ textTransform: 'uppercase', marginBottom: '25px', fontWeight: '700' }}>
                      {footerContent.linksTitle || "OUR LINKS"}
                    </h5>
                    <ul>
                      {renderLinks(footerContent.links || "Home, About Us, Our Menu, Contact Us, FAQ")}
                    </ul>
                  </div>
                </div>

                {/* OUR SERVICES COLUMN */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4 wow fadeInUp">
                  <div className="widget widget_services">
                    <h5 className="footer-title text-white" style={{ textTransform: 'uppercase', marginBottom: '25px', fontWeight: '700' }}>
                      {footerContent.servicesTitle || "OUR SERVICES"}
                    </h5>
                    <ul>
                      {renderLinks(footerContent.services || "Fast Delivery, Seat Reservation, Pickup In Store, Online Order, Table Booking")}
                    </ul>
                  </div>
                </div>

                {/* HELP CENTER COLUMN */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4 wow fadeInUp">
                  <div className="widget widget_services">
                    <h5 className="footer-title text-white" style={{ textTransform: 'uppercase', marginBottom: '25px', fontWeight: '700' }}>
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

          {copyrightEnabled && (
            <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 0' }}>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12 text-center">
                    <span className="copyright-text" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
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
