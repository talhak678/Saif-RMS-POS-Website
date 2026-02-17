import { useContext } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import ModalVideoBox from "../elements/ModalVideoBox";
import { AboutServiceArr } from "../elements/JsonData";
import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";

const AboutUs = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  if (cmsLoading) return <div className="text-center py-5">Loading...</div>;

  const sections = cmsConfig?.config?.configJson?.about?.sections || {};
  const whatWeDoContent = sections.whatWeDo?.content || {};

  // Map CMS cards from the dynamic array or fallback to static mapping if empty
  const cmsCards = whatWeDoContent.cards || [];

  const displayCards = cmsCards.length > 0
    ? cmsCards.map((card: any, idx: number) => ({
      title: card.title,
      desc: card.description,
      icon: AboutServiceArr[idx % AboutServiceArr.length]?.icon || "flaticon-fast-food"
    }))
    : [
      { title: "Fresh Ingredients", desc: "Quality ingredients used.", icon: AboutServiceArr[0]?.icon },
      { title: "Expert Chefs", desc: "Years of experience.", icon: AboutServiceArr[1]?.icon },
      { title: "Professional Service", desc: "Priority satisfaction.", icon: AboutServiceArr[2]?.icon },
      { title: "Cozy Atmosphere", desc: "Warm environment.", icon: AboutServiceArr[3]?.icon },
    ];

  return (
    <div className="page-content" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
      {sections.banner?.enabled !== false && (
        <CommonBanner
          img={sections.banner?.content?.imageUrl || IMAGES.banner_bnr1}
          title={sections.banner?.content?.title || "About Us"}
          subtitle={sections.banner?.content?.breadcrumb || "Our Story"}
        />
      )}

      {sections.video?.enabled && <ModalVideoBox />}

      {sections.whatWeDo?.enabled !== false && (
        <section className="content-inner">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="title">{whatWeDoContent.title || "What We Do"}</h2>
              {whatWeDoContent.description && (
                <p className="mt-3 max-w-2xl mx-auto text-muted">{whatWeDoContent.description}</p>
              )}
            </div>
            <div className="row justify-content-center">
              {displayCards.map(({ icon, title, desc }: { icon: string; title: string; desc: string }, ind: number) => (
                <div className="col-lg-3 col-sm-6 m-b30" key={ind}>
                  <div className="icon-bx-wraper style-3 h-100">
                    <div className="icon-bx">
                      <div className="icon-cell">
                        <i className={icon}></i>
                      </div>
                    </div>
                    <div className="icon-content">
                      <h5 className="title">
                        <Link to="/service-detail">{title}</Link>
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
