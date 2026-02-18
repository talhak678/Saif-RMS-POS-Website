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

          // 1. Colors
          if (themeSettings.colors?.enabled) {
            const { primaryColor, secondaryColor, accentColor, backgroundColor } = themeSettings.colors.content || {};

            if (primaryColor) {
              document.documentElement.style.setProperty('--primary', primaryColor);
              document.documentElement.style.setProperty('--bs-primary', primaryColor);
            }
            if (secondaryColor) {
              document.documentElement.style.setProperty('--secondary', secondaryColor);
              document.documentElement.style.setProperty('--bs-secondary', secondaryColor);
            }
            if (accentColor) {
              document.documentElement.style.setProperty('--accent', accentColor);
            }
            if (backgroundColor) {
              document.body.style.backgroundColor = backgroundColor;
            }
          } else if (config) {
            // Fallback to legacy fields
            if (config.backgroundColor) document.body.style.backgroundColor = config.backgroundColor;
            if (config.primaryColor) {
              document.documentElement.style.setProperty('--primary', config.primaryColor);
              document.documentElement.style.setProperty('--bs-primary', config.primaryColor);
            }
          }

          // 2. Fonts
          if (themeSettings.fonts?.enabled) {
            const { primaryFont, secondaryFont } = themeSettings.fonts.content || {};

            // Dynamically load Google Fonts
            const fontsToLoad = [primaryFont, secondaryFont].filter(Boolean);
            if (fontsToLoad.length > 0) {
              const fontLink = document.getElementById('cms-fonts') as HTMLLinkElement || document.createElement('link');
              fontLink.id = 'cms-fonts';
              fontLink.rel = 'stylesheet';
              const fontQuery = fontsToLoad.map(f => f.replace(/\s+/g, '+')).join('|');
              fontLink.href = `https://fonts.googleapis.com/css2?family=${fontQuery}:wght@300;400;500;600;700;800;900&display=swap`;
              if (!document.getElementById('cms-fonts')) {
                document.head.appendChild(fontLink);
              }
            }

            if (primaryFont) {
              document.documentElement.style.setProperty('--font-family-base', `"${primaryFont}", sans-serif`);
              document.documentElement.style.setProperty('--bs-body-font-family', `"${primaryFont}", sans-serif`);
              // Update root body font if needed
              document.body.style.fontFamily = `"${primaryFont}", sans-serif`;
            }
            if (secondaryFont) {
              document.documentElement.style.setProperty('--font-family-title', `"${secondaryFont}", sans-serif`);
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
