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
          console.log("🆔 Restaurant ID:", res.data.data.config?.restaurantId);
          setCmsConfig(res.data.data);

          // Apply colors from CMS config
          if (res.data.data.config) {
            const { backgroundColor, primaryColor } = res.data.data.config;
            if (backgroundColor) {
              document.body.style.backgroundColor = backgroundColor;
            }
            if (primaryColor) {
              document.documentElement.style.setProperty('--primary', primaryColor);
              // Force the primary color-rgb for bootstrap/rgba variables if needed
              // But for now --primary is the main one.
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
