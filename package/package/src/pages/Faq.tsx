import CommonBanner from "../elements/CommonBanner";
import { Accordion } from "react-bootstrap";
import { FaqArr } from "../elements/JsonData";
import { IMAGES } from "../constent/theme";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useRef, useState } from "react";
const Faq = () => {
  const [input, setInput] = useState<string>("");
  const form = useRef<HTMLFormElement | null>(null);
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
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="page-content bg-white">
        <CommonBanner img={IMAGES.banner_bnr2} title="Faq" subtitle="Faq" />
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
                      placeholder="Why Should I Use Swigo ?"
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
                  defaultActiveKey="1"
                >
                  {FaqArr.map(({ title, evantK }, ind) => (
                    <Accordion.Item
                      className="accordion-item"
                      key={ind}
                      eventKey={`${evantK}`}
                    >
                      <Accordion.Header
                        className="accordion-header"
                        id="headingOne1"
                      >
                        {title}
                        <span className="toggle-close"></span>
                      </Accordion.Header>

                      <Accordion.Body className="accordion-body">
                        <p className="m-b0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="row align-items-center">
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
