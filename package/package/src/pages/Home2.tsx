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
    document.body.setAttribute("data-color", "color_2");
  }, []);

  if (cmsLoading) return <div className="text-center py-5">Loading...</div>;

  const sections = cmsConfig?.config?.configJson?.home?.sections || {};

  return (
    <div
      className="page-content"
      style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}
    >
      <MainBanner2 />
      <Home2PromoBanners />

      {sections.browseMenu?.enabled && (
        <section className="content-inner-1 overflow-hidden mt-5">
          <div className="container">
            <div className="section-head menu-align">
              <h2 className="title mb-0 wow flipInX">{sections.browseMenu.content?.title || "Browse Our Menu"}</h2>
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
            backgroundImage: `url(${IMAGES.background_pic1})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title text-white wow flipInX">{sections.todaysSpecial.content?.title || "Today's Special"}</h2>
            </div>
            <Home2SpacialMenu />
          </div>
        </section>
      )}

      {sections.ourMenu?.enabled && (
        <section className="content-inner-1">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title wow flipInX">{sections.ourMenu.content?.title || "Our Menu"}</h2>
            </div>
            <Home3OurMenu />
          </div>
        </section>
      )}

      {sections.customerComments?.enabled && (
        <section className="content-inner-2 overflow-hidden" style={{ marginBottom: '100px' }}>
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title wow flipInX">{sections.customerComments.content?.title || "Customer's Comment"}</h2>
            </div>
            <Home2Testimonial />
          </div>
        </section>
      )}
    </div>
  );
};

export default Home2;
