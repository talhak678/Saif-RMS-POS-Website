import { useState } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { ContactUsArr } from "../elements/JsonData";

const ContactUs = () => {
  const [active, setActive] = useState<number>(1);
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title="Contact Us"
        subtitle="Contact Us"
      />
      <section className="section-wrapper-8 content-inner-1">
        <div className="container">
          <div className="row inner-section-wrapper align-items-center">
            {ContactUsArr.map(({ icon, text, title }, ind) => (
              <div className="col-lg-3 col-sm-6" key={ind}>
                <div
                  className={`icon-bx-wraper style-5 hover-aware box-hover ${
                    active === ind ? "active" : ""
                  }`}
                  onMouseEnter={() => {
                    setActive(ind);
                  }}
                >
                  <div className="icon-bx">
                    <div className="icon-cell">
                      <i className={icon}></i>
                    </div>
                  </div>
                  <div className="icon-content">
                    <h5 className="title">{title}</h5>
                    {text}
                    <div className="effect bg-primary"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-head text-center">
            <h2 className="title">Reservation</h2>
          </div>
          <form className="dzForm dezPlaceAni" method="POST">
            <div className="dzFormMsg"></div>
            <input
              type="hidden"
              className="form-control"
              name="dzToDo"
              value="Contact"
            />
            <div className="row">
              <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                <label className="form-label text-primary">Your Name</label>
                <div className="input-group input-line input-black">
                  <input
                    name="dzName"
                    required
                    type="text"
                    className="form-control"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                <label className="form-label text-primary">Your Email</label>
                <div className="input-group input-line input-black">
                  <input
                    name="dzEmail"
                    required
                    type="text"
                    className="form-control"
                    placeholder="info@example.com"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                <label className="form-label text-primary">Your Number</label>
                <div className="input-group input-line input-black">
                  <input
                    name="dzPhoneNumber"
                    required
                    type="text"
                    className="form-control dz-number"
                    placeholder="9876543210"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                <label className="form-label text-primary">Members</label>
                <div className="input-group input-line input-black">
                  <input
                    name="dzOther[Person]"
                    required
                    type="text"
                    className="form-control"
                    placeholder="1 Person"
                  />
                </div>
              </div>
              <div className="col-sm-12 m-b40">
                <label className="form-label text-primary">Message</label>
                <div className="input-group input-line input-black">
                  <textarea
                    name="dzMessage"
                    required
                    className="form-control"
                    placeholder="Hi, do you Have a moment to talk About !"
                  ></textarea>
                </div>
              </div>
              <div className="col-sm-12 m-b20">
                <div className="input-recaptcha">
                  <div
                    className="g-recaptcha"
                 
                  ></div>
                  <input
                    className="form-control d-none"
                    data-recaptcha="true"
                    required
                  />
                </div>
              </div>
              <div className="col-12 text-center">
                <button
                  name="submit"
                  value="submit"
                  type="reset"
                  className="btn btn-primary btn-hover-1"
                >
                  <span>Book A Table</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
