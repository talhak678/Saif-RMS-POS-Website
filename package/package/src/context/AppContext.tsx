import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface AppContextValue {
  headerClass: boolean;
  setHeaderClass: Dispatch<SetStateAction<boolean>>;
  showSignInForm: boolean;
  setShowSignInForm: Dispatch<SetStateAction<boolean>>;
  showCategeryFilter: boolean;
  setShowCategeryFilter: Dispatch<SetStateAction<boolean>>;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  headerSidebar: boolean;
  setHeaderSidebar: Dispatch<SetStateAction<boolean>>;
  showOrderModal: boolean;
  setShowOrderModal: Dispatch<SetStateAction<boolean>>;
  showPromoPopup: boolean;
  setShowPromoPopup: Dispatch<SetStateAction<boolean>>;
  // CMS Config
  cmsConfig: any;
  cmsLoading: boolean;
  // Cart
  cartItems: any[];
  addToCart: (item: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  // Context
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  branches: any[];
  activeBranch: any;
  isStoreClosed: boolean;
}

const defaultState: AppContextValue = {
  headerClass: false,
  setHeaderClass: () => { },
  showSignInForm: false,
  setShowSignInForm: () => { },
  showCategeryFilter: false,
  setShowCategeryFilter: () => { },
  showSidebar: false,
  setShowSidebar: () => { },
  headerSidebar: false,
  setHeaderSidebar: () => { },
  showOrderModal: false,
  setShowOrderModal: () => { },
  showPromoPopup: false,
  setShowPromoPopup: () => { },
  cmsConfig: null,
  cmsLoading: true,
  cartItems: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  clearCart: () => { },
  user: null,
  setUser: () => { },
  branches: [],
  activeBranch: null,
  isStoreClosed: false,
};

export const Context = createContext(defaultState);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [headerClass, setHeaderClass] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showCategeryFilter, setShowCategeryFilter] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [headerSidebar, setHeaderSidebar] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [isStoreClosed, setIsStoreClosed] = useState(false);

  const [cmsConfig, setCmsConfig] = useState<any>(null);
  const [cmsLoading, setCmsLoading] = useState(true);

  // Cart State
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // User Auth State
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem("customer");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("customer", JSON.stringify(user));
    } else {
      localStorage.removeItem("customer");
    }
  }, [user]);

  const addToCart = (item: any) => {
    // Always normalize price to a proper Number to prevent toFixed/arithmetic errors
    const normalizedItem = { ...item, price: Number(item.price) || 0 };
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === normalizedItem.id);
      if (existing) {
        toast.success(`${normalizedItem.name} quantity updated!`, { duration: 1500 });
        return prev.map((i) =>
          i.id === normalizedItem.id ? { ...i, quantity: i.quantity + (normalizedItem.quantity || 1) } : i
        );
      }
      toast.success(`${normalizedItem.name} added to cart!`, { duration: 1500 });
      return [...prev, { ...normalizedItem, quantity: normalizedItem.quantity || 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        // 🌐 Dynamic URL Detection for Multi-Tenancy
        const hostname = window.location.hostname;
        let slug = hostname;

        const mainProductionUrl = "saif-rms-pos-website.vercel.app";

        if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === mainProductionUrl) {
          slug = import.meta.env.VITE_RESTAURANT_SLUG || "dilpasand-sweets";
          console.log("🛠️ Using default restaurant:", slug);
        } else {
          console.log("🌍 Subdomain/Custom domain detected:", hostname);
        }

        const apiUrl = `https://saif-rms-pos-backend-tau.vercel.app/api/cms/config/public/${slug}`;
        console.log("🌐 Calling Backend API:", apiUrl);

        const res = await axios.get(apiUrl);

        console.log("📦 CMS API Response:", res.data);

        if (res.data?.success) {
          console.log("✅ CMS Data loaded for restaurant:", res.data.data.restaurantName);
          const data = res.data.data;
          setCmsConfig(data);

          // 🎨 Apply Theme Settings
          const config = data.config || {};
          const configJson = config.configJson || {};
          const themeSettings = configJson.theme?.sections || {};

          // Clear any hardcoded data-color that might override our styles
          document.body.removeAttribute('data-color');

          // Normalize colors from either new system or legacy fields
          let pColor = "";
          let sColor = "";
          let aColor = "";
          let bColor = "";
          let tColor = "";
          let bntColor = "";

          if (themeSettings.colors?.enabled) {
            const content = themeSettings.colors.content || {};
            pColor = content.primaryColor;
            sColor = content.secondaryColor;
            aColor = content.accentColor;
            bColor = content.backgroundColor;
            tColor = content.textColor;
            bntColor = content.bannerTextColor;
          } else {
            // Fallback to legacy fields
            pColor = config.primaryColor;
            bColor = config.backgroundColor;
          }

          // 1. Colors & Global Styles Implementation
          if (pColor || bColor || tColor || bntColor) {
            const root = document.documentElement;
            const colors = themeSettings.colors?.content || {};
            const hColor = colors.headingColor;
            const fbgColor = colors.footerBgColor;
            const ftColor = colors.footerTextColor;
            // const tsbgColor = colors.todaysSpecialBgColor;

            // Set CSS Variables on Root
            if (pColor) {
              root.style.setProperty('--primary', pColor);
              root.style.setProperty('--bs-primary', pColor);
              root.style.setProperty('--bs-link-color', pColor);
              root.style.setProperty('--primary-hover', pColor);
              root.style.setProperty('--primary-dark', pColor);
            }

            if (sColor) {
              root.style.setProperty('--secondary', sColor);
              root.style.setProperty('--bs-secondary', sColor);
            }

            if (bColor) {
              root.style.setProperty('--bs-body-bg', bColor);
              document.body.style.backgroundColor = bColor;
            }

            if (tColor) {
              root.style.setProperty('--bs-body-color', tColor);
              root.style.setProperty('--title', hColor || tColor);
              document.body.style.color = tColor;
            }

            if (aColor) {
              root.style.setProperty('--accent', aColor);
              root.style.setProperty('--bs-border-color', aColor);
            } else if (pColor) {
              // Use faint primary for borders if no accent
              root.style.setProperty('--bs-border-color', `${pColor}40`);
            }

            // 💉 Inject Dynamic Overrides (THE NUCLEAR OPTION for "Pore System" consistency)
            let themeStyle = document.getElementById('cms-theme-overrides');
            if (!themeStyle) {
              themeStyle = document.createElement('style');
              themeStyle.id = 'cms-theme-overrides';
              document.head.appendChild(themeStyle);
            }

            themeStyle.innerHTML = `
              :root {
                --primary: ${pColor || '#7da640'} !important;
                --bs-primary: ${pColor || '#7da640'} !important;
                --bs-body-bg: ${bColor || '#ffffff'} !important;
                --bs-border-color: ${aColor || (pColor ? pColor + '40' : '#e1e1f0')} !important;
              }
              body {
                background-color: ${bColor || '#ffffff'} !important;
                color: ${tColor || '#666666'} !important;
              }
              /* Paragraph & Text Overrides */
              p, .page-content p, .content-inner p, .content-inner-1 p,
              .page-content span, .page-content li,
              .text-muted, .dz-content p, .about-content p,
              section p, .container p {
                color: ${tColor || '#666666'} !important;
              }

              /* 🏠 Banner Text Color Overrides (Specific to Home Banners) */
              ${bntColor ? `
              .main-bnr-one .sub-title, .main-bnr-three .sub-title,
              .main-bnr-one .banner-content p, .main-bnr-three .bnr-text,
              .main-bnr-one .banner-btn .btn span, .main-bnr-three .banner-btn .btn span {
                color: ${bntColor} !important;
              }
              .main-bnr-one .banner-btn .btn-outline-primary, 
              .main-bnr-three .banner-btn .btn-outline-primary {
                border-color: ${bntColor} !important;
              }
              ` : ''}

              /* Exclude footer text - it has its own color */
              .site-footer p, .site-footer span, .site-footer li, .site-footer a {
                color: ${ftColor || '#ffffff'} !important;
              }
              /* Button Overrides */
              .btn-primary, .wp-block-button__link {
                --bs-btn-bg: ${pColor} !important;
                --bs-btn-border-color: ${pColor} !important;
                --bs-btn-hover-bg: ${pColor} !important;
                --bs-btn-hover-border-color: ${pColor} !important;
                --bs-btn-active-bg: ${pColor} !important;
                --bs-btn-active-border-color: ${pColor} !important;
                background-color: ${pColor} !important;
                border-color: ${pColor} !important;
                color: #ffffff !important;
              }
              .btn-outline-primary {
                --bs-btn-color: ${pColor} !important;
                --bs-btn-border-color: ${pColor} !important;
                --bs-btn-hover-bg: ${pColor} !important;
                --bs-btn-hover-border-color: ${pColor} !important;
                color: ${pColor} !important;
                border-color: ${pColor} !important;
              }
              .btn-outline-primary:hover {
                background-color: ${pColor} !important;
                color: #ffffff !important;
              }
              /* Color Helpers */
              .text-primary { color: ${pColor} !important; }
              .text-secondary { color: ${sColor} !important; }
              .text-white { color: #ffffff !important; }
              .bg-primary { background-color: ${pColor} !important; }
              .shadow-primary { box-shadow: 0 10px 20px -10px ${pColor}80 !important; }
              
              /* Border Overrides */
              .border-primary { border-color: ${pColor} !important; }
              
              /* Typography Overrides (UNMIXED COLORS) */
              h1, h2, h3, h4, h5, h6, .title, .h1, .h2, .h3, .h4, .h5, .h6 {
                color: ${hColor || sColor || tColor || '#222222'} !important;
              }
              
              /* Footer & Full System BG Overrides (UNMIXED COLORS) */
              .site-footer, .footer-bg-wrapper, .footer-top, .footer-bottom {
                background-color: ${fbgColor || bColor || '#222222'} !important;
              }
              .site-footer {
                border-top: 1px solid ${aColor || (pColor ? pColor + '20' : '#e1e1f0')} !important;
              }
              .footer-top {
                border-bottom: 1px solid ${fbgColor ? 'rgba(255,255,255,0.05)' : (aColor || (pColor ? pColor + '10' : '#eeeeee'))} !important;
              }
              .site-footer p, .site-footer span, .site-footer li, .site-footer a, .site-footer .footer-title {
                color: ${ftColor || '#ffffff'} !important;
              }
              .site-footer .footer-title {
                 color: ${ftColor || '#ffffff'} !important;
                 opacity: 0.9;
              }

              /* Link Overrides */
              a { color: ${pColor || 'inherit'}; }
              a:hover { color: ${pColor || 'inherit'}; opacity: 0.8; }

              /* === NAVBAR / MENU HOVER === */
              .nav.navbar-nav > li > a:hover,
              .nav.navbar-nav > li > a:focus,
              .navbar-nav > li > a:hover,
              .navbar-nav > li > a:focus,
              .navbar-nav li a:hover,
              .navbar-nav li:hover > a,
              .nav > li > a:hover,
              .header-nav .nav > li > a:hover,
              .header-nav .nav > li:hover > a,
              .navbar-nav > li.active > a,
              .nav.navbar-nav > li.active > a,
              .nav.mobile-nav > li > a:hover,
              .nav.mobile-nav li a:hover {
                color: ${pColor} !important;
              }

              /* === SITE FILTERS / CATEGORY TABS === */
              .site-filters .filters li.active a,
              .site-filters .filters li.active,
              .site-filters ul.filters li.active > a,
              .site-filters ul.filters li.btn.active,
              .site-filters ul.filters li.btn.active a,
              .site-filters .filters li a:hover,
              .site-filters ul.filters li:hover > a,
              .site-filters ul.filters li.btn:hover,
              .site-filters.style-2 .filters li.active,
              .site-filters.style-2 .filters li:hover {
                background-color: ${pColor} !important;
                border-color: ${pColor} !important;
                color: #ffffff !important;
              }
              .site-filters.style-2 .filters li.active a,
              .site-filters.style-2 .filters li:hover a,
              .site-filters ul.filters li.btn.active a,
              .site-filters ul.filters li.btn:hover a {
                color: #ffffff !important;
              }
              .site-filters.style-1 .filters li.active,
              .site-filters.style-1 .filters li:hover {
                border-color: ${pColor} !important;
                color: ${pColor} !important;
              }
              .site-filters.style-1 .filters li.active a,
              .site-filters.style-1 .filters li:hover a {
                color: ${pColor} !important;
              }

              /* === MISC INTERACTIVE ELEMENTS === */
              .dz-img-box .detail-btn:hover,
              .dz-img-box.box-hover:hover .detail-btn {
                background-color: ${pColor} !important;
                border-color: ${pColor} !important;
              }
              .header-cart:hover, .extra-nav a:hover { color: ${pColor} !important; }
              .swiper-button-prev:hover, .swiper-button-next:hover,
              .prev-btn:hover, .next-btn:hover {
                background-color: ${pColor} !important;
                border-color: ${pColor} !important;
                color: #ffffff !important;
              }
              .pagination .page-item.active .page-link,
              .pagination .page-link:hover {
                background-color: ${pColor} !important;
                border-color: ${pColor} !important;
                color: #ffffff !important;
              }
              .footer-link li a:hover,
              .widget_services ul li a:hover { color: ${pColor} !important; opacity: 1 !important; }

              /* === GLOBAL BACKGROUND CONSISTENCY === */
              .page-content.bg-white, 
              .page-content,
              .content-inner, 
              .content-inner-1,
              .section-full {
                background-color: transparent !important;
              }
              
            

              /* Specific fix for Order Success timeline */
              .status-timeline-wrapper { background: transparent !important; }
            `;
          }

          // 2. Fonts Implementation
          if (themeSettings.fonts?.enabled) {
            const {
              primaryFont, secondaryFont, paragraphFont,
              primaryFontWeight, secondaryFontWeight, paragraphFontWeight
            } = themeSettings.fonts.content || {};

            const fontsToLoad = [primaryFont, secondaryFont, paragraphFont].filter(Boolean);
            if (fontsToLoad.length > 0) {
              const fontLink = document.getElementById('cms-fonts') as HTMLLinkElement || document.createElement('link');
              fontLink.id = 'cms-fonts';
              fontLink.rel = 'stylesheet';

              const uniqueFonts = Array.from(new Set(fontsToLoad));
              // Correct query format for multiple families with weights
              const fontQuery = uniqueFonts.map(f => `family=${f.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800;900`).join('&');
              fontLink.href = `https://fonts.googleapis.com/css2?${fontQuery}&display=swap`;

              if (!document.getElementById('cms-fonts')) {
                document.head.appendChild(fontLink);
              }
            }

            if (primaryFont || secondaryFont || paragraphFont) {
              const fontOverrides = document.getElementById('cms-font-overrides') || document.createElement('style');
              fontOverrides.id = 'cms-font-overrides';

              let css = "";
              if (paragraphFont) {
                document.documentElement.style.setProperty('--font-family-base', `"${paragraphFont}", sans-serif`);
                document.documentElement.style.setProperty('--bs-body-font-family', `"${paragraphFont}", sans-serif`);
                css += `
                  body, p, span, a, li, input, textarea, button, label {
                    font-family: "${paragraphFont}", sans-serif !important;
                    font-weight: ${paragraphFontWeight || '400'} !important;
                  }
                `;
              }
              if (primaryFont) {
                document.documentElement.style.setProperty('--font-family-title', `"${primaryFont}", sans-serif`);
                css += `
                  h1, h2, .h1, .h2, .title {
                    font-family: "${primaryFont}", sans-serif !important;
                    font-weight: ${primaryFontWeight || '700'} !important;
                  }
                `;
              }
              if (secondaryFont) {
                css += `
                  h3, h4, h5, h6, .h3, .h4, .h5, .h6, .sub-title, .footer-title {
                    font-family: "${secondaryFont}", sans-serif !important;
                    font-weight: ${secondaryFontWeight || '600'} !important;
                  }
                `;
              }
              fontOverrides.innerHTML = css;
              if (!document.getElementById('cms-font-overrides')) {
                document.head.appendChild(fontOverrides);
              }
            }
          }

          // 3. Favicon, Title and Description
          if (themeSettings.logos?.enabled) {
            const logoContent = themeSettings.logos.content || {};

            // Favicon
            if (logoContent.favicon) {
              const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
              if (link) {
                link.href = logoContent.favicon;
              }
            }

            // Title
            if (logoContent.websiteTitle) {
              document.title = logoContent.websiteTitle;
            } else if (data.restaurantName) {
              document.title = data.restaurantName;
            }

            // Description
            if (logoContent.websiteDescription) {
              let metaDescription = document.querySelector('meta[name="description"]');
              if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
              }
              metaDescription.setAttribute('content', logoContent.websiteDescription);
            }
          }
        } else {
          console.error("❌ CMS API returned success=false:", res.data);
        }
      } catch (err: any) {
        console.error("❌ Failed to load CMS:", err);
        console.error("❌ Error details:", {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });

        // Show user-friendly message
        if (err.response?.status === 500) {
          console.error("💥 Server Error: The restaurant slug might not exist in database, or websiteConfig is missing");
        } else if (err.response?.status === 404) {
          console.error("🔍 Not Found: Restaurant with this slug doesn't exist");
        }
      } finally {
        setCmsLoading(false);
      }
    };
    fetchCMS();
  }, []);

  useEffect(() => {
    const checkStoreStatus = () => {
      // Look for times in top level (from restaurant profile) or fall back to old CMS header section
      const openingTime = cmsConfig?.openingTime || cmsConfig?.config?.configJson?.home?.sections?.header?.content?.openingTime;
      const closingTime = cmsConfig?.closingTime || cmsConfig?.config?.configJson?.home?.sections?.header?.content?.closingTime;

      if (!openingTime || !closingTime) return;

      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const currentTimeInMins = currentH * 60 + currentM;

      const [openH, openM] = openingTime.split(':').map(Number);
      const [closeH, closeM] = closingTime.split(':').map(Number);

      const openInMins = openH * 60 + openM;
      const closeInMins = closeH * 60 + closeM;

      let closed = false;
      if (closeInMins > openInMins) {
        // Normal hours: 09:00 to 23:00
        closed = currentTimeInMins < openInMins || currentTimeInMins >= closeInMins;
      } else {
        // Over midnight: 21:00 to 01:00
        // It's open if it's AFTER open time OR BEFORE close time
        closed = !(currentTimeInMins >= openInMins || currentTimeInMins < closeInMins);
      }
      setIsStoreClosed(closed);
    };

    checkStoreStatus();
    const interval = setInterval(checkStoreStatus, 60000);
    return () => clearInterval(interval);
  }, [cmsConfig]);

  const contextValue: AppContextValue = {
    headerClass,
    setHeaderClass,
    showSignInForm,
    setShowSignInForm,
    showCategeryFilter,
    setShowCategeryFilter,
    showSidebar,
    setShowSidebar,
    headerSidebar,
    setHeaderSidebar,
    showOrderModal,
    setShowOrderModal,
    showPromoPopup,
    setShowPromoPopup,
    cmsConfig,
    cmsLoading,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    user,
    setUser,
    branches: cmsConfig?.branches || [],
    activeBranch: cmsConfig?.branches?.[0] || null,
    isStoreClosed
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

