import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import Menu from "./Menu";
import Sidebar from "../elements/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";

const Header2 = () => {
  const { setShowSidebar, headerSidebar, setHeaderSidebar } =
    useContext(Context);
  const [scroll, setScroll] = useState(false);

  const scrollHandler = () => {
    if (window.scrollY > 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  return (
    <>
      <header className="site-header mo-left header header-transparent transparent-white style-2">
        <div
          className={`sticky-header main-bar-wraper navbar-expand-lg ${
            scroll ? "is-fixed" : ""
          }`}
        >
          <div className="main-bar clearfix ">
            <div className="container-fluid clearfix">
              <div className="logo-header mostion">
                <Link to="/" className="anim-logo">
                  <img src={IMAGES.logo} alt="/" />
                </Link>
              </div>
              <button
                className={`navbar-toggler collapsed navicon justify-content-end ${
                  headerSidebar ? "open" : ""
                }`}
                type="button"
                onClick={() => {
                  setHeaderSidebar(!headerSidebar);
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className="extra-nav">
                <div className="extra-cell">
                  <form method="post">
                    <div className="input-group">
                      <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <div className="input-group-addon">
                        <button
                          name="submit"
                          value="submit"
                          type="reset"
                          className="btn btn-primary btn-hover-2"
                        >
                          <span>
                            <i className="fa-solid fa-magnifying-glass"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div
                    className="menu-btn"
                    onClick={() => {
                      setShowSidebar(true);
                    }}
                  >
                    <Link to={"#"}>
                      <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.04102 17.3984H29.041"
                          stroke="#222222"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.04102 8.39844H29.541"
                          stroke="#222222"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.04102 25.3984H29.041"
                          stroke="#222222"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div
                className={`header-nav navbar-collapse justify-content-end ${
                  headerSidebar ? "show" : ""
                }`}
                id="navbarNavDropdown"
              >
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar />
    </>
  );
};

export default Header2;
