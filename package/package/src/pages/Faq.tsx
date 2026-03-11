import CommonBanner from "../elements/CommonBanner";
import { Accordion } from "react-bootstrap";
import { IMAGES } from "../constent/theme";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const Faq = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  const bannerConfig = cmsConfig?.config?.configJson?.faq?.sections?.banner;
  const bannerEnabled = bannerConfig?.enabled !== false;
  const bannerContent = bannerConfig?.content || { title: "Faq", breadcrumb: "Faq", imageUrl: IMAGES.banner_bnr2 };

  if (cmsLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="page-content" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
        {bannerEnabled && (
          <CommonBanner
            img={bannerContent.imageUrl || IMAGES.banner_bnr2}
            title={bannerContent.title}
            subtitle={bannerContent.breadcrumb}
            description={bannerContent.description}
            showTitle={bannerContent.showTitle !== "false"}
            textAlign={bannerContent.textAlign}
          />
        )}
        <section className="content-inner">
          <div className="min-container">
            <div className={`row search-wraper style-1 text-${cmsConfig?.config?.configJson?.faq?.sections?.faqList?.content?.textAlign || "center"}`}>
              <div className="col-lg-10 m-auto">
                <form>
                  <div className="input-group">
                    <div className="input-group-prepand">
                      <button
                        name="submit"
                        value="submit"
                        type="reset"
                        className="btn"
                      >
                        <i className="icon-search"></i>
                      </button>
                    </div>
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Search Questions..."
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <Accordion
                  className="accordion dz-accordion"
                  id="accordionFaq2"
                  defaultActiveKey="0"
                >
                  <style>{`
                    .dz-accordion .accordion-header .accordion-button {
                        color: #000 !important;
                        background-color: #fff !important;
                    }
                    .dz-accordion .accordion-header .accordion-button.collapsed {
                        color: #000 !important;
                        background-color: #fff !important;
                    }
                    .dz-accordion .accordion-header .accordion-button .toggle-close {
                        position: absolute;
                        right: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .dz-accordion .accordion-item {
                        border-bottom: 1px solid #ebebeb !important;
                    }
                  `}</style>
                  {cmsConfig?.faqs?.map(({ question, answer }: any, ind: number) => (
                    <Accordion.Item
                      className="accordion-item"
                      key={ind}
                      eventKey={`${ind}`}
                    >
                      <Accordion.Header
                        className="accordion-header"
                        id={`heading${ind}`}
                      >
                        {question}
                        <span className="toggle-close"></span>
                      </Accordion.Header>

                      <Accordion.Body className="accordion-body">
                        <p className="m-b0">
                          {answer}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                  {(!cmsConfig?.faqs || cmsConfig.faqs.length === 0) && (
                    <div className="text-center py-10">No FAQs found.</div>
                  )}
                </Accordion>
              </div>
            </div>


          </div>
        </section>
      </div>
    </>
  );
};

export default Faq;

