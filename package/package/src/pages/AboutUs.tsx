import { useContext } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import ModalVideoBox from "../elements/ModalVideoBox";
import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";

import Loader from "../components/Loader";

const AboutUs = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  if (cmsLoading || !cmsConfig) return <Loader />;

  const sections = cmsConfig?.config?.configJson?.about?.sections || {};
  const whatWeDoContent = sections.whatWeDo?.content || {};

  const cmsCards = whatWeDoContent.cards || [];

  const displayCards = cmsCards.length > 0
    ? cmsCards.map((card: any) => ({
      title: card.title,
      desc: card.description,
      icon: card.icon || "flaticon-fast-food",
      iconUrl: card.iconUrl
    }))
    : [
      { title: "Fresh Ingredients", desc: "We use only the finest and freshest ingredients.", icon: "flaticon-fast-food" },
      { title: "Expert Chefs", desc: "Our chefs have years of experience.", icon: "flaticon-chef" },
      { title: "Professional Service", desc: "Customer satisfaction is our top priority.", icon: "flaticon-customer-service" },
      { title: "Cozy Atmosphere", desc: "Enjoy your meal in a warm environment.", icon: "flaticon-restaurant" },
    ];

  const textAlignClass = whatWeDoContent.textAlign === "left" ? "start" : whatWeDoContent.textAlign === "right" ? "end" : "center";

  return (
    <div className="page-content" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
      <style>
        {`
          @media (max-width: 768px) {
            .section-head {
              margin-bottom: 40px !important;
              text-align: center !important;
            }
            .section-head .title {
              font-size: 28px !important;
            }
            .section-head p {
              text-align: center !important;
            }
          }
          @media (max-width: 576px) {
            .icon-bx-wraper.style-3 {
              padding: 20px !important;
              text-align: center !important;
              flex-direction: column !important;
              align-items: center !important;
            }
            .icon-bx-wraper.style-3 .icon-bx {
              margin: 0 auto 15px !important;
            }
            .icon-content {
              text-align: center !important;
            }
          }
          .icon-cell img {
            width: 50px;
            height: 50px;
            object-fit: contain;
          }
        `}
      </style>
      {sections.banner?.enabled !== false && (
        <CommonBanner
          img={sections.banner?.content?.imageUrl || IMAGES.banner_bnr1}
          title={sections.banner?.content?.title || "About Us"}
          subtitle={sections.banner?.content?.breadcrumb || "Our Story"}
          description={sections.banner?.content?.description}
          showTitle={sections.banner?.content?.showTitle !== "false"}
          textAlign={sections.banner?.content?.textAlign}
        />
      )}

      {sections.video?.enabled && (
        <ModalVideoBox
          title={sections.video?.content?.title}
          description={sections.video?.content?.description}
          videoUrl={sections.video?.content?.videoUrl}
          thumbnailUrl={sections.video?.content?.thumbnailUrl}
        />
      )}

      {sections.whatWeDo?.enabled !== false && (
        <section className="content-inner">
          <div className="container">
            <div className={`section-head text-${textAlignClass}`}>
              {whatWeDoContent.showTitle !== "false" && <h2 className="title">{whatWeDoContent.title || "What We Do"}</h2>}
              {whatWeDoContent.description && (
                <p className="mt-3 max-w-2xl mx-auto text-muted">{whatWeDoContent.description}</p>
              )}
            </div>
            <div className="row">
              {displayCards.map(({ icon, title, desc, iconUrl }: { icon: string; title: string; desc: string; iconUrl?: string }, ind: number) => (
                <div className="col-lg-3 col-sm-6 m-b30" key={ind}>
                  <div className={`icon-bx-wraper style-3 h-100 text-${textAlignClass}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                    <div className="icon-bx">
                      <div className="icon-cell">
                        {iconUrl ? (
                          <img src={iconUrl} alt={title} />
                        ) : (
                          <i className={icon}></i>
                        )}
                      </div>
                    </div>
                    <div className="icon-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                      <h5 className="title" style={{ marginTop: '20px' }}>
                        <Link to="#">{title}</Link>
                      </h5>
                      <p>{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AboutUs;

