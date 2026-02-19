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

  const menuItemsString = footerContent.menuItems || "Home, About Us, Our Menu, Contact Us, FAQ";

  const routeMap: Record<string, string> = {
    "home": "/",
    "about us": "/about-us",
    "about": "/about-us",
    "our menu": "/our-menu-2",
    "menu": "/our-menu-2",
    "contact us": "/contact-us",
    "contact": "/contact-us",
    "faq": "/faq",
    "help": "/faq",
    "help center": "/faq",
    "blogs": "/blog-list"
  };

  const menuItemsList = menuItemsString.split(",").map((item: string) => {
    const name = item.trim();
    const key = name.toLowerCase();

    // Map menu names to CMS config keys
    let cmsKey = key;
    if (key === 'about us' || key === 'about') cmsKey = 'about';
    if (key === 'blogs') cmsKey = 'blogs';
    if (key === 'faq' || key === 'help' || key === 'help center') cmsKey = 'faq';
    if (key === 'contact us' || key === 'contact') cmsKey = 'contact';
    if (key === 'our menu' || key === 'menu') cmsKey = 'menu';
    if (key === 'home') cmsKey = 'home';

    const isEnabled = cmsConfig?.config?.configJson?.[cmsKey]?.enabled !== false;

    return {
      name,
      to: routeMap[key] || "/",
      isEnabled
    };
  }).filter((item: any) => item.isEnabled);

  if (!footerEnabled && !copyrightEnabled) return <Toaster position="bottom-right" reverseOrder={true} />;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      {footerEnabled && (
        <footer className="site-footer style-2" id="footer" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
          <div className="footer-bg-wrapper" id="app-banner">
            <div className="footer-top">
              <div className="container">
                <div className="row justify-between">
                  {/* Quick Links Column (Left) */}
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp">
                    <div className="widget widget_services">
                      <h5 className="footer-title">Quick Links</h5>
                      <ul>
                        {menuItemsList.map((item: any, ind: number) => (
                          <li key={ind}>
                            <Link to={item.to}><span>{item.name}</span></Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Center Content / Logo */}
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
                      <p className="mb-0 font-14">
                        {footerContent.description || `${cmsConfig?.restaurantName || "Saif Restaurant"} - Quality food delivered to your doorstep.`}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 text-lg-end wow fadeInUp">
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
                </div>
              </div>
            </div>
          </div>
          {copyrightEnabled && (
            <div className="container">
              <div className="footer-bottom">
                <div className="row">
                  <div className="col-xl-12 text-center">
                    <span className="copyright-text" style={{ color: 'inherit', opacity: 0.7 }}>
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
