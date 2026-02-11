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

const Menu = () => {
  const { headerClass } = useContext(Context);
  const [active, setActive] = useState<string>("");
  const { pathname } = useLocation();
  const navRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    MenuArr.map((el) => {
      if (el) {
        if ("/contact-us" === pathname) {
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
    return () => {};
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
        className={`nav navbar-nav navbar ms-lg-4 ${
          headerClass ? "white" : ""
        }`}
      >
        {MenuArr?.map(({ menu, className, submenu, ulClassName, to }, ind) => {
          if (className) {
            return (
              <li
                key={ind}
                className={`${className} ${active === menu ? "active" : ""} ${
                  state.activeSubmenu == menu ? "open" : ""
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
                  style={{ color: active === menu ? "var(--primary)" : "" }}
                >
                  {menu}
                </Link>
                <ul className={ulClassName}>
                  {submenu?.length > 0 &&
                    submenu?.map(({ child, to, subchild }: MenuItem, index) => {
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
                  style={{ color: active === menu ? "var(--primary)" : "" }}
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
        if ("/contact-us" === pathname) {
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
    return () => {};
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
                className={`${className} ${active === menu ? "active" : ""} ${
                  state.activeSubmenu == menu ? "open" : ""
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
                  style={{ color: active === menu ? "var(--primary)" : "" }}
                >
                  {menu}
                </Link>
                <ul className={ulClassName}>
                  {submenu?.length > 0 &&
                    submenu?.map(({ child, to, subchild }: MenuItem, index) => {
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
                  style={{ color: active === menu ? "var(--primary)" : "" }}
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
