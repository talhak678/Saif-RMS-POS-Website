import CommonBanner from "../elements/CommonBanner";
import { Accordion } from "react-bootstrap";
import { IMAGES } from "../constent/theme";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useRef, useState, useContext } from "react";
import { Context } from "../context/AppContext";

const Faq = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);
  const [input, setInput] = useState<string>("");
  const form = useRef<HTMLFormElement | null>(null);

  const bannerConfig = cmsConfig?.config?.configJson?.faq?.sections?.banner;
  const bannerEnabled = bannerConfig?.enabled !== false;
  const bannerContent = bannerConfig?.content || { title: "Faq", breadcrumb: "Faq", imageUrl: IMAGES.banner_bnr2 };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setInput("");
    if (form.current) {
      emailjs
        .sendForm(
          "emailId",
          "template_0byuv32",
          form.current,
          "qUDIPykc776NYHv4m"
        )
        .then(
          () => {
            toast.success("Successfully send!");
          },
          (error) => {
            toast.error(error.text);
          }
        );
    }
  };

  if (cmsLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="page-content bg-white">
        {bannerEnabled && <CommonBanner img={bannerContent.imageUrl || IMAGES.banner_bnr2} title={bannerContent.title} subtitle={bannerContent.breadcrumb} />}
        <section className="content-inner">
          <div className="min-container">
            <div className="row search-wraper style-1 text-center">
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

            {/* Newsletter Section */}
            <div className="row align-items-center mt-10">
              <div className="col-lg-5 m-b20">
                <div className="dz-media faq-media move-2">
                  <img src={IMAGES.faq_pic1} alt="/" />
                </div>
              </div>
              <div className="col-lg-7 m-b20">
                <div className="faq-info">
                  <h2 className="title">Newsletter</h2>
                  <p className="m-b30">
                    We hope this newsletter finds you well. We are excited to
                    announce some new additions to our menu that we think you'll
                    love. Our culinary team has been
                  </p>
                  <form className="dzSubscribe" ref={form} onSubmit={sendEmail}>
                    <div className="dzSubscribeMsg text-white"></div>
                    <div className="input-group">
                      <input
                        name="dzEmail"
                        required
                        type="text"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Enter Your Email"
                      />
                      <div className="input-group-addon">
                        <button
                          name="submit"
                          value="submit"
                          type="submit"
                          className="btn btn-primary btn-hover-2"
                        >
                          <span>Submit</span>{" "}
                          <i className="fa-solid fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Faq;
