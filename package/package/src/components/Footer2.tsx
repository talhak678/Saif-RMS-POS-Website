import { useContext, useState } from "react";
import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Context } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";


const BASE_URL = "https://saif-rms-pos-backend-tau.vercel.app";

const Footer2 = () => {
  const { cmsConfig } = useContext(Context);
  const homeSections = cmsConfig?.config?.configJson?.home?.sections || {};
  const footerEnabled = homeSections.footer?.enabled !== false;
  const footerContent = homeSections.footer?.content || {};
  const copyrightEnabled = homeSections.copyrightBar?.enabled !== false;
  const copyrightContent = homeSections.copyrightBar?.content || {};

  const themeColors = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content || {};
  const themeFonts = cmsConfig?.config?.configJson?.theme?.sections?.fonts?.content || {};

  const fbgColor = themeColors.footerBgColor || "#0d0d0d";
  const ftColor = themeColors.footerTextColor || "white";
  const fHeadingWeight = themeFonts.secondaryFontWeight || "700";
  const fTextWeight = themeFonts.paragraphFontWeight || "400";
  const primaryColor = themeColors.primaryColor || "#7da640";
  const secondaryColor = themeColors.secondaryColor || cmsConfig?.config?.secondaryColor || "#ff6b35";

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setNewsletterLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/newsletter/subscribe`, {
        email: newsletterEmail,
        restaurantId: cmsConfig?.restaurantId,
        slug: cmsConfig?.slug
      });
      if (res.data?.success) {
        toast.success("🎉 Subscribed! Check your inbox.");
        setSubscribed(true);
        setNewsletterEmail("");
      } else {
        toast.error(res.data?.message || "Subscription failed");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to subscribe. Try again.");
    } finally {
      setNewsletterLoading(false);
    }
  };


  const renderLinks = (linksData: any) => {
    if (!linksData) return null;

    const routeMap: Record<string, string> = {
      "home": "/",
      "about us": "/about-us",
      "contact us": "/contact-us",
      "faq": "/faq",
      "our menu": "/our-menu",
      "blogs": "/blog-list",
      "blog": "/blog-list",
      "shop": "/shop-cart",
      "cart": "/shop-cart",
      "checkout": "/shop-cart",
      "frequently asked questions": "/faq"
    };

    // If it's a string (Legacy format)
    if (typeof linksData === 'string') {
      return linksData.split(",").map((item: string, index: number) => {
        const label = item.trim();
        const target = routeMap[label.toLowerCase()] || "/#";
        return (
          <li key={index}>
            <Link to={target}><span>{label}</span></Link>
          </li>
        );
      });
    }

    // If it's an array (New proper format)
    if (Array.isArray(linksData)) {
      return linksData.map((item: any, index: number) => (
        <li key={index}>
          <Link to={item.url || "/#"}><span>{item.label}</span></Link>
        </li>
      ));
    }

    return null;
  };

  if (!footerEnabled && !copyrightEnabled) return <Toaster position="bottom-right" reverseOrder={true} />;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      {footerEnabled && (
        <footer className="site-footer style-2" id="footer" style={{ border: 'none', backgroundImage: 'none', color: ftColor, position: 'relative', backgroundColor: 'transparent' }}>
          <style>
            {`
              .site-footer.style-2#footer {
                background-color: transparent !important;
                background-image: none !important;
                border: none !important;
              }
              .footer-card {
                background-color: ${fbgColor} !important;
                margin: 0 100px 40px 100px;
                border-radius: 40px;
                padding: 30px 50px;
                position: relative;
                overflow: hidden;
                border: none !important;
              }
              .site-footer.style-2 .footer-top {
                background-color: transparent !important;
                border: none !important;
                padding-bottom: 0 !important;
              }
              .footer-divider {
                border-top: 1px solid rgba(255,255,255,0.1);
                margin: 20px 0;
              }
              .footer-title {
                font-weight: ${fHeadingWeight} !important;
                font-size: 22px !important;
                letter-spacing: 1px;
                color: ${ftColor} !important;
                margin-bottom: 25px !important;
                text-transform: uppercase;
              }
              .widget_services ul li {
                margin-bottom: 15px !important;
              }
              .widget_services ul li a {
                color: ${ftColor} !important;
                opacity: 0.8;
                font-size: 18px !important;
                font-weight: ${fTextWeight} !important;
                transition: 0.3s;
              }
              .widget_services ul li a:hover {
                color: var(--primary) !important;
                opacity: 1;
                padding-left: 3px;
              }
              .widget_getintuch ul li {
                display: flex;
                align-items: flex-start;
                gap: 15px;
                margin-bottom: 20px;
              }
              .widget_getintuch ul li i {
                font-size: 28px;
                color: ${secondaryColor} !important;
                margin-top: 5px;
              }
              .widget_getintuch ul li p {
                color: ${ftColor} !important;
                opacity: 0.8 !important;
                font-size: 19px !important;
                font-weight: ${fTextWeight} !important;
                margin: 0;
                line-height: 1.6;
              }

              /* Footer newsletter design */
              .newsletter-box form {
                display: flex;
                align-items: center;
                background: white;
                border-radius: 12px;
                padding: 6px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
              }
              .newsletter-box input {
                border: none !important;
                box-shadow: none !important;
                font-size: 15px !important;
                color: #333 !important;
                padding-left: 20px !important;
              }
              .footer-social-list {
                display: flex;
                flex-wrap: wrap;
                gap: 12px;
                margin-top: 15px;
                padding: 0;
                list-style: none;
              }
              .footer-social-list li a {
                width: 38px;
                height: 38px;
                background: ${secondaryColor} !important;
                color: ${primaryColor} !important;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                transition: 0.3s;
                text-decoration: none;
              }
              .footer-social-list li a:hover {
                transform: translateY(-3px);
                opacity: 0.9;
              }
              
              @media (max-width: 1200px) {
                .footer-card { margin: 0 40px 40px 40px; }
              }
              @media (max-width: 991px) {
                .footer-card {
                  margin: 0 20px 40px 20px;
                  border-radius: 30px;
                  padding: 40px 30px;
                }
                .newsletter-box {
                  margin-top: 30px;
                }
              }
              @media (max-width: 768px) {
                 .footer-card { padding: 40px 20px; text-align: left; }
                 .footer-logo { text-align: left; margin-bottom: 20px; }
                 .footer-logo img { margin: 0; }
                 .newsletter-box { text-align: left; margin-bottom: 20px; }
                 .newsletter-box h4 { text-align: left; }
                 .widget_getintuch ul li { justify-content: flex-start; text-align: left; flex-direction: row; align-items: flex-start; }
                 .widget_getintuch ul li i { margin-top: 5px; }
                 .footer-divider { margin: 30px 0; }
                 .footer-social-list { justify-content: flex-start; }
              }
            `}
          </style>

          <div className="footer-card shadow-lg">
            <div className="footer-top">
              <div className="container p-0">
                {/* Upper Section: Logo & Newsletter */}
                <div className="row align-items-center">
                  <div className="col-lg-7 col-md-12">
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
                          style={{ maxHeight: '60px', width: 'auto' }}
                        />
                      </Link>
                    </div>
                    <p style={{ opacity: 0.8, fontSize: '17px', maxWidth: '450px', lineHeight: '1.6', color: ftColor }}>
                      {footerContent.description || "Lorem ipsum is simply dummy text of the printing and typesetting industry."}
                    </p>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="newsletter-box">
                      <h4 className="footer-title" style={{ fontSize: '22px', marginBottom: '25px' }}>
                        {footerContent.newsletterTitle || "Subscribe To Our Newsletter"}
                      </h4>
                      <form onSubmit={handleSubscribe}>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={footerContent.newsletterPlaceholder || "Enter Your Email"}
                          style={{ height: '50px', background: 'transparent' }}
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          disabled={newsletterLoading || subscribed}
                        />
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ height: '50px', padding: '0 25px', borderRadius: '8px', fontWeight: '600', minWidth: 110 }}
                          disabled={newsletterLoading || subscribed}
                        >
                          {subscribed ? "✓ Done" : newsletterLoading ? "Sending..." : (footerContent.newsletterButtonText || "Subscribe")}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="footer-divider"></div>

                {/* Bottom Section: 4 Columns */}
                <div className="row">
                  {/* CONTACT */}
                  <div className="col-lg-3 col-md-6 mb-2">
                    <div className="widget widget_getintuch">
                      <h5 className="footer-title">{footerContent.contactTitle || "CONTACT"}</h5>
                      <ul>
                        <li>
                          <i className="flaticon-placeholder"></i>
                          <p>{footerContent.address || "1247/Plot No. 39, 15th Phase, Colony, Kkatpally, Hyderabad"}</p>
                        </li>
                        <li>
                          <i className="flaticon-telephone"></i>
                          <p>{footerContent.contactPhone || "+91 987-654-3210"}</p>
                        </li>
                        <li>
                          <i className="flaticon-email-1"></i>
                          <p>{footerContent.contactEmail || "info@example.com"}</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* OUR LINKS */}
                  <div className="col-lg-3 col-md-6 col-6 mb-2">
                    <div className="widget widget_services">
                      <h5 className="footer-title text-nowrap">{footerContent.linksTitle || "OUR LINKS"}</h5>
                      <ul>
                        {renderLinks(footerContent.links || "Home, Contact us, About us, Blogs, FAQ")}
                      </ul>
                    </div>
                  </div>

                  {/* OUR SERVICES */}
                  <div className="col-lg-3 col-md-6 col-6 mb-2">
                    <div className="widget widget_services">
                      <h5 className="footer-title text-nowrap">{footerContent.servicesTitle || "OUR SERVICES"}</h5>
                      <ul>
                        {renderLinks(footerContent.services || "Menu, Seat Reservation, Testimonials, Order Now")}
                      </ul>
                    </div>
                  </div>

                  {/* SERVICE HOURS & FOLLOW US */}
                  <div className="col-lg-3 col-md-6 mb-2">
                    <div className="widget">
                      <h5 className="footer-title">{footerContent.serviceHoursTitle || "SERVICE HOURS"}</h5>
                      <p style={{ opacity: 0.8, fontSize: '18px', marginBottom: '25px', whiteSpace: 'pre-line', color: ftColor }}>
                        {footerContent.serviceHours || "Saturday - Sunday : 6:30 pm - 11:59 pm\nSunday : closed"}
                      </p>

                      <h5 className="footer-title" style={{ marginBottom: '15px' }}>FOLLOW US</h5>
                      <ul className="footer-social-list">
                        {footerContent.facebook && (
                          <li><Link target="_blank" to={footerContent.facebook}><i className="fab fa-facebook-f"></i></Link></li>
                        )}
                        {footerContent.instagram && (
                          <li><Link target="_blank" to={footerContent.instagram}><i className="fab fa-instagram"></i></Link></li>
                        )}
                        {footerContent.tiktok && (
                          <li><Link target="_blank" to={footerContent.tiktok}><i className="fab fa-tiktok"></i></Link></li>
                        )}
                        {/* Fallback if none set */}
                        {(!footerContent.facebook && !footerContent.instagram && !footerContent.tiktok) && (
                          <>
                            <li><Link target="_blank" to="https://facebook.com"><i className="fab fa-facebook-f"></i></Link></li>
                            <li><Link target="_blank" to="https://instagram.com"><i className="fab fa-instagram"></i></Link></li>
                            <li><Link target="_blank" to="https://tiktok.com"><i className="fab fa-tiktok"></i></Link></li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {copyrightEnabled && (
            <div className="footer-bottom pb-4">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                    <span style={{ opacity: 0.5, fontSize: '12px' }}>
                      {copyrightContent.text || `Crafted With ❤️ by PlatterOS`}
                    </span>
                  </div>
                  <div className="col-md-6 text-center text-md-end">
                    <div className="footer-bottom-links" style={{ display: 'flex', gap: '20px', justifyContent: 'flex-end', opacity: 0.6, fontSize: '12px' }}>
                      <Link to="/blog-list" style={{ color: 'inherit' }}>Blog Detail</Link>
                      <Link to="/about-us" style={{ color: 'inherit' }}>About</Link>
                      <Link to="/faq" style={{ color: 'inherit' }}>Testimonials</Link>
                    </div>
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

