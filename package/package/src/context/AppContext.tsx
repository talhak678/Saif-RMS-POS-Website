import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import axios from "axios";

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
  // CMS Config
  cmsConfig: any;
  cmsLoading: boolean;
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
  cmsConfig: null,
  cmsLoading: true,
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

  const [cmsConfig, setCmsConfig] = useState<any>(null);
  const [cmsLoading, setCmsLoading] = useState(true);

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        // Use environment variable or fallback to saifs-kitchen
        const slug = import.meta.env.VITE_RESTAURANT_SLUG || "saifs-kitchen";
        console.log("🔍 Fetching CMS for restaurant slug:", slug);

        const apiUrl = `https://saif-rms-pos-backend.vercel.app/api/cms/config/public/${slug}`;
        console.log("🌐 API URL:", apiUrl);

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

          if (themeSettings.colors?.enabled) {
            const content = themeSettings.colors.content || {};
            pColor = content.primaryColor;
            sColor = content.secondaryColor;
            aColor = content.accentColor;
            bColor = content.backgroundColor;
            tColor = content.textColor;
          } else {
            // Fallback to legacy fields
            pColor = config.primaryColor;
            bColor = config.backgroundColor;
          }

          // 1. Colors & Global Styles Implementation
          if (pColor || bColor || tColor) {
            const root = document.documentElement;

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
              root.style.setProperty('--title', tColor);
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
              .bg-primary { background-color: ${pColor} !important; }
              .shadow-primary { box-shadow: 0 10px 20px -10px ${pColor}80 !important; }
              
              /* Border Overrides */
              .border-primary { border-color: ${pColor} !important; }
              
              /* Typography Overrides */
              h1, h2, h3, h4, h5, h6, .title, .h1, .h2, .h3, .h4, .h5, .h6, .footer-title {
                color: ${tColor || '#222222'} !important;
              }
              
              /* Footer & Full System BG Overrides */
              .site-footer, .footer-bg-wrapper, .footer-top, .footer-bottom {
                background-color: ${bColor || '#222222'} !important;
              }
              .site-footer {
                border-top: 1px solid ${aColor || (pColor ? pColor + '20' : '#e1e1f0')} !important;
              }
              .footer-top {
                border-bottom: 1px solid ${aColor || (pColor ? pColor + '10' : '#eeeeee')} !important;
              }

              /* Link Overrides */
              a { color: ${pColor || 'inherit'}; }
              a:hover { color: ${pColor || 'inherit'}; opacity: 0.8; }
            `;
          }

          // 2. Fonts Implementation
          if (themeSettings.fonts?.enabled) {
            const { primaryFont, secondaryFont } = themeSettings.fonts.content || {};

            const fontsToLoad = [primaryFont, secondaryFont].filter(Boolean);
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

            if (primaryFont || secondaryFont) {
              const fontOverrides = document.getElementById('cms-font-overrides') || document.createElement('style');
              fontOverrides.id = 'cms-font-overrides';

              let css = "";
              if (primaryFont) {
                document.documentElement.style.setProperty('--font-family-base', `"${primaryFont}", sans-serif`);
                document.documentElement.style.setProperty('--bs-body-font-family', `"${primaryFont}", sans-serif`);
                css += `
                  body, p, span:not(.title), a, li, input, textarea, button, .sub-title {
                    font-family: "${primaryFont}", sans-serif !important;
                  }
                `;
              }
              if (secondaryFont) {
                document.documentElement.style.setProperty('--font-family-title', `"${secondaryFont}", sans-serif`);
                css += `
                  h1, h2, h3, h4, h5, h6, .title, .h1, .h2, .h3, .h4, .h5, .h6 {
                    font-family: "${secondaryFont}", sans-serif !important;
                  }
                `;
              }
              fontOverrides.innerHTML = css;
              if (!document.getElementById('cms-font-overrides')) {
                document.head.appendChild(fontOverrides);
              }
            }
          }

          // 3. Favicon
          if (themeSettings.logos?.enabled && themeSettings.logos.content?.favicon) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
              link.href = themeSettings.logos.content.favicon;
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
    cmsConfig,
    cmsLoading,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
