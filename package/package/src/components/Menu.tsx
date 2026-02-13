import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { MenuArr } from "./MenuArr";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Context } from "../context/AppContext";
import SocialLinks from "../elements/SocialLinks";

interface MenuItem {
  child: string;
  to?: string;
  subchild?: { children: string; to: string }[];
}

// interface MenuType {
//   menu: string;
//   className: string;
//   ulClassName: string;
//   to?: string;
//   submenu: MenuItem[]; // Define submenu as an array of MenuItem objects
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (previousState: Element, updatedState: any) => {
  return {
    ...previousState,
    ...updatedState,
  };
};

const initialState = {
  activeSubmenu: "",
};

const Menu = ({ scroll = false }: { scroll?: boolean }) => {
  const { headerClass, setShowSignInForm, setHeaderSidebar, setShowOrderModal } = useContext(Context);
  const [active, setActive] = useState<string>("");
  const { pathname } = useLocation();
  const navRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    MenuArr.map((el) => {
      if (el) {
        if (el.to === pathname) {
          setActive(el.menu);
        }
        el.submenu?.map((ell: MenuItem) => {
          if (ell && ell?.to === pathname) {
            setActive(el.menu);
          }
          ell.subchild?.map((data) => {
            if (data?.to === pathname) {
              setActive(el.menu);
            }
          });
        });
      }
    });
    return () => { };
  }, [pathname]);

  const [state, setState] = useReducer(reducer, initialState);
  const menuHandler = (status: string) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  return (
    <>
      <div className="logo-header">
        <Link to="/" className="anim-logo">
          <img src={IMAGES.logo} alt="/" />
        </Link>
      </div>
      <ul
        className={`nav navbar-nav navbar ms-lg-4 ${headerClass ? "white" : ""
          } ${window.innerWidth <= 991 ? "mobile-nav" : ""}`}
      >
        <li className="nav-item d-lg-none border-bottom m-b20 p-b20">
          <div className="d-flex align-items-center gap-3 p-3">
            <Link
              className="btn btn-primary btn-square rounded-circle"
              to={"#"}
              onClick={() => {
                setShowSignInForm(true);
                setHeaderSidebar(false);
              }}
            >
              <i className="flaticon-user"></i>
            </Link>
            <div>
              <h6 className="m-b0">Hello, Guest</h6>
              <Link
                to={"#"}
                className="font-12 text-primary"
                onClick={() => {
                  setShowSignInForm(true);
                  setHeaderSidebar(false);
                }}
              >
                Login / Register
              </Link>
            </div>
          </div>
          <div className="p-3 pt-0">
            <h6 className="title m-b10 font-14">Customer Info</h6>
            <div className="d-flex flex-column gap-2">
              <button
                className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setShowOrderModal(true);
                  setHeaderSidebar(false);
                }}
              >
                <i className="fa-solid fa-location-dot"></i>
                <span>Change Location</span>
              </button>
              <button
                className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center gap-2"
                onClick={() => window.open("tel:+911234567890")}
              >
                <i className="fa-solid fa-phone"></i>
                <span>Phone Number</span>
              </button>
            </div>
          </div>
        </li>
        {MenuArr?.map(({ menu, className, submenu, ulClassName, to }, ind) => {
          if (className) {
            return (
              <li
                key={ind}
                className={`${className} ${active === menu ? "active" : ""} ${state.activeSubmenu == menu ? "open" : ""
                  }`}
                ref={(node) => {
                  if (node) {
                    navRef.current.push(node);
                  }
                }}
                onClick={() => {
                  menuHandler(menu);
                }}
              >
                <Link
                  to={"#"}
                  style={{
                    color: active === menu
                      ? "#fe9f10"
                      : (headerClass && !scroll && window.innerWidth > 991)
                        ? "#ffffff"
                        : "#222222"
                  }}
                >
                  {menu}
                </Link>
                <ul className={ulClassName}>
                  {submenu && submenu.length > 0 &&
                    submenu.map(({ child, to, subchild }: MenuItem, index: number) => {
                      if (ulClassName === "mega-menu") {
                        return (
                          <li key={index}>
                            <Link to={"#"}>{child}</Link>
                            <ul>
                              {subchild &&
                                subchild?.map(({ children, to }, ind) => (
                                  <li key={ind}>
                                    <Link to={to}>{children}</Link>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}>
                            <Link to={`${to}`}>{child}</Link>
                          </li>
                        );
                      }
                    })}
                  {ulClassName === "mega-menu" && (
                    <li className="header-adv p-0">
                      <img src={IMAGES.images_adv_media} alt="/" />
                    </li>
                  )}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={ind} className={active === menu ? "active" : ""}>
                <Link
                  style={{
                    color: active === menu
                      ? "#fe9f10"
                      : (headerClass && !scroll && window.innerWidth > 991)
                        ? "#ffffff"
                        : "#222222"
                  }}
                  to={`${to}`}
                >
                  {menu}
                </Link>
              </li>
            );
          }
        })}
      </ul>
      <div className="dz-social-icon">
        <SocialLinks />
      </div>
    </>
  );
};

export default Menu;

export const MenuDark = () => {
  const [active, setActive] = useState<string>("");
  const { pathname } = useLocation();
  const navRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    MenuArr.map((el) => {
      if (el) {
        if (el.to === pathname) {
          setActive(el.menu);
        }
        el.submenu?.map((ell: MenuItem) => {
          if (ell && ell?.to === pathname) {
            setActive(el.menu);
          }
          ell.subchild?.map((data) => {
            if (data?.to === pathname) {
              setActive(el.menu);
            }
          });
        });
      }
    });
    return () => { };
  }, [pathname]);

  const [state, setState] = useReducer(reducer, initialState);
  const menuHandler = (status: string) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  return (
    <>
      <div className="logo-header">
        <Link to="/" className="anim-logo">
          <img src={IMAGES.logo} alt="/" />
        </Link>
      </div>
      <ul className={`nav navbar-nav navbar ms-lg-4`}>
        {MenuArr?.map(({ menu, className, submenu, ulClassName, to }, ind) => {
          if (className) {
            return (
              <li
                key={ind}
                className={`${className} ${active === menu ? "active" : ""} ${state.activeSubmenu == menu ? "open" : ""
                  }`}
                ref={(node) => {
                  if (node) {
                    navRef.current.push(node);
                  }
                }}
                onClick={() => {
                  menuHandler(menu);
                }}
              >
                <Link
                  to={"#"}
                  style={{ color: active === menu ? "#fe9f10" : "" }}
                >
                  {menu}
                </Link>
                <ul className={ulClassName}>
                  {submenu && submenu.length > 0 &&
                    submenu.map(({ child, to, subchild }: MenuItem, index: number) => {
                      if (ulClassName === "mega-menu") {
                        return (
                          <li key={index}>
                            <Link to={"#"}>{child}</Link>
                            <ul>
                              {subchild &&
                                subchild?.map(({ children, to }, ind) => (
                                  <li key={ind}>
                                    <Link to={to}>{children}</Link>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}>
                            <Link to={`${to}`}>{child}</Link>
                          </li>
                        );
                      }
                    })}
                  {ulClassName === "mega-menu" && (
                    <li className="header-adv p-0">
                      <img src={IMAGES.images_adv_media} alt="/" />
                    </li>
                  )}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={ind}>
                <Link
                  style={{ color: active === menu ? "#fe9f10" : "" }}
                  to={`${to}`}
                >
                  {menu}
                </Link>
              </li>
            );
          }
        })}
      </ul>
      <div className="dz-social-icon">
        <SocialLinks />
      </div>
    </>
  );
};
