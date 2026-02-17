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
        // Hardcoded for now or we can get slug from URL
        const slug = "saifs-kitchen"; // Matches seed.js slug
        const res = await axios.get(`https://saif-rms-pos-backend.vercel.app/api/cms/config/public/${slug}`);
        if (res.data?.success) {
          setCmsConfig(res.data.data);

          // Apply background color to body
          if (res.data.data.config?.backgroundColor) {
            document.body.style.backgroundColor = res.data.data.config.backgroundColor;
          }
        }
      } catch (err) {
        console.error("Failed to load CMS", err);
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
