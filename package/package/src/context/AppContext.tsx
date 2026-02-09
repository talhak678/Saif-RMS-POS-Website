import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

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
}

const defaultState: AppContextValue = {
  headerClass: false,
  setHeaderClass: () => {},
  showSignInForm: false,
  setShowSignInForm: () => {},
  showCategeryFilter: false,
  setShowCategeryFilter: () => {},
  showSidebar: false,
  setShowSidebar: () => {},
  headerSidebar: false,
  setHeaderSidebar: () => {},
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
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
