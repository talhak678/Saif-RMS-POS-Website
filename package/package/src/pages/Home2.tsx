import { useContext, useEffect } from "react";
import MainBanner2 from "../components/MainBanner2";
import Home2OurMenu from "../components/Home2OurMenu";
import Home2SpacialMenu from "../components/Home2SpacialMenu";
import { IMAGES } from "../constent/theme";
import Home3OurMenu from "../components/Home3OurMenu";
import Home2Testimonial from "../components/Home2Testimonial";
import { Context } from "../context/AppContext";

import Home2PromoBanners from "../components/Home2PromoBanners";

const Home2 = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  useEffect(() => {
    // document.body.setAttribute("data-color", "color_2");
  }, []);

  if (cmsLoading) return <div className="text-center py-5">Loading...</div>;

  const sections = cmsConfig?.config?.configJson?.home?.sections || {};

  return (
    <div
      className="page-content"
      style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .content-inner, .content-inner-1 {
              padding-top: 40px !important;
              padding-bottom: 40px !important;
            }
            .section-head {
              margin-bottom: 30px !important;
              flex-direction: column !important;
              text-align: center !important;
              gap: 15px;
            }
            .section-head.menu-align {
               justify-content: center !important;
            }
            .section-head .title {
              font-size: 26px !important;
            }
            .pagination-align {
               display: none !important;
            }
          }
        `}
      </style>
      <MainBanner2 />
      <Home2PromoBanners />

      {sections.browseMenu?.enabled && (
        <section className="content-inner-1 overflow-hidden mt-5">
          <div className="container">
            <div className="section-head menu-align">
              <h2 className="title mb-0 wow flipInX text-secondary">{sections.browseMenu.content?.title || "Browse Our Menu"}</h2>
              <div className="pagination-align wow fadeInUp">
                <div className="menu-button-prev1 btn-prev rounded-xl btn-hover-2">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="menu-button-next1 btn-next rounded-xl btn-hover-2">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
          <Home2OurMenu prev={"menu-button-prev1"} next={"menu-button-next1"} />
        </section>
      )}

      {sections.todaysSpecial?.enabled && (
        <section
          id="todays-special"
          className="section-wrapper-5 content-inner overflow-hidden bg-parallax"
          style={{
            backgroundColor: sections.todaysSpecial.content?.backgroundColor || "#222222",
            backgroundImage: sections.todaysSpecial.content?.backgroundImageUrl
              ? `url(${sections.todaysSpecial.content.backgroundImageUrl})`
              : sections.todaysSpecial.content?.backgroundColor && sections.todaysSpecial.content.backgroundColor !== "#222222"
                ? "none"
                : `url(${IMAGES.background_pic1})`,
            backgroundAttachment: "fixed",
          }}
        >
          {sections.todaysSpecial.content?.backgroundColor && sections.todaysSpecial.content.backgroundColor !== "#222222" && (
            <style>{`
              #todays-special::after {
                background-color: rgba(0, 0, 0, 0.4) !important;
              }
            `}</style>
          )}
          <div className="container">
            <div className="section-head menu-align">
              <h2 className="title mb-0 wow flipInX text-white">{sections.todaysSpecial.content?.title || "Today's Special"}</h2>
              <div className="pagination-align wow fadeInUp">
                <div className="special-button-prev btn-prev rounded-xl btn-hover-2 text-white border-white">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="special-button-next btn-next rounded-xl btn-hover-2 text-white border-white">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
            <Home2SpacialMenu />
          </div>
        </section>
      )}

      {sections.ourMenu?.enabled && (
        <section className="content-inner-1">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title wow flipInX text-secondary">{sections.ourMenu.content?.title || "Our Menu"}</h2>
            </div>
            <Home3OurMenu />
          </div>
        </section>
      )}

      {sections.customerComments?.enabled && (
        <section className="content-inner-2 overflow-hidden">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title wow flipInX text-secondary">{sections.customerComments.content?.title || "Customer's Comment"}</h2>
            </div>
            <Home2Testimonial />
          </div>
        </section>
      )}
    </div>
  );
};

export default Home2;
