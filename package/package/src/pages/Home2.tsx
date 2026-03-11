import { useContext, useEffect } from "react";
import MainBanner2 from "../components/MainBanner2";
import Home2OurMenu from "../components/Home2OurMenu";
import Home2SpacialMenu from "../components/Home2SpacialMenu";
import { IMAGES } from "../constent/theme";
import Home3OurMenu from "../components/Home3OurMenu";
import Home2Testimonial from "../components/Home2Testimonial";
import { Context } from "../context/AppContext";

import Home2PromoBanners from "../components/Home2PromoBanners";
import Loader from "../components/Loader";

const Home2 = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  useEffect(() => {
    // document.body.setAttribute("data-color", "color_2");
  }, []);

  if (cmsLoading || !cmsConfig) return <Loader />;

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
        <section className="content-inner-1 overflow-hidden">
          <div className="container">
            <div className="section-head menu-align">
              <h2 className="title mb-0 wow flipInX text-secondary">{sections.browseMenu.content?.title || "Browse Our Menu"}</h2>
              <div className="pagination-align wow fadeInUp">
                <div className="menu-button-prev1 btn-prev rounded-xl ">
                  <i className="fa-solid fa-arrow-left"></i>
                </div>
                <div className="menu-button-next1 btn-next rounded-xl ">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>
          </div>
          <Home2OurMenu prev={"menu-button-prev1"} next={"menu-button-next1"} />
        </section>
      )}

      {sections.todaysSpecial?.enabled && (
        <TodaySpecialSection sections={sections} cmsConfig={cmsConfig} />
      )}

      {sections.ourMenu?.enabled && (
        <section className="content-inner-1">
          <div className="container">
            <div className={`section-head text-${sections.ourMenu.content?.textAlign || 'center'}`} style={{ textAlign: sections.ourMenu.content?.textAlign || 'center' }}>
              <h2 className="title wow flipInX text-secondary">{sections.ourMenu.content?.title || "Our Menu"}</h2>
            </div>
            <Home3OurMenu />
          </div>
        </section>
      )}

      {sections.customerComments?.enabled && (
        <section className="content-inner-2 overflow-hidden">
          <div className="container">
            <div className={`section-head text-${sections.customerComments.content?.textAlign || 'center'}`} style={{ textAlign: sections.customerComments.content?.textAlign || 'center' }}>
              <h2 className="title wow flipInX text-secondary">{sections.customerComments.content?.title || "Customer's Comment"}</h2>
            </div>
            <Home2Testimonial />
          </div>
        </section>
      )}
    </div>
  );
};

const TodaySpecialSection = ({ sections, cmsConfig }: { sections: any, cmsConfig: any }) => {
  // Extract and filter items here to decide if section should show
  const allItems = (cmsConfig?.menu || []).flatMap((cat: any) =>
    (cat.menuItems || []).map((item: any) => ({ ...item, categoryId: cat.id, categoryName: cat.name }))
  );

  const specialSection = sections.todaysSpecial?.content || {};
  const selectedItemIds = specialSection.selectedItemIds || [];

  let displayItems = [];
  if (selectedItemIds.length > 0) {
    displayItems = allItems.filter((item: any) => selectedItemIds.includes(item.id));
  }

  if (displayItems.length === 0) return null;

  return (
    <section
      id="todays-special"
      className="section-wrapper-5 content-inner overflow-hidden bg-parallax"
      style={{
        backgroundColor: cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.todaysSpecialBgColor || "#222222",
        backgroundImage: specialSection.backgroundImageUrl
          ? `url(${specialSection.backgroundImageUrl})`
          : cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.todaysSpecialBgColor && cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.todaysSpecialBgColor !== "#222222"
            ? "none"
            : `url(${IMAGES.background_pic1})`,
        backgroundAttachment: "fixed",
      }}
    >
      {cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.todaysSpecialBgColor && cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.todaysSpecialBgColor !== "#222222" && (
        <style>{`
              #todays-special::after {
                background-color: rgba(0, 0, 0, 0.4) !important;
              }
            `}</style>
      )}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-head menu-align">
          <div className="flex-1" style={{ textAlign: specialSection.textAlign || 'left' }}>
            <h2 className="title mb-0 wow flipInX text-white">{specialSection.title || "Today's Special"}</h2>
          </div>
          <div className="pagination-align wow fadeInUp">
            <div className="special-button-prev btn-prev rounded-xl  text-white border-white">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div className="special-button-next btn-next rounded-xl  text-white border-white">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
        <Home2SpacialMenu items={displayItems} />
      </div>
    </section>
  );
};

export default Home2;

