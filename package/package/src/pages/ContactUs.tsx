import { useContext, useState } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { ContactUsArr } from "../elements/JsonData";
import { Context } from "../context/AppContext";

const ContactUs = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);
  const [active, setActive] = useState<number>(1);

  if (cmsLoading) return <div className="text-center py-5">Loading...</div>;

  const sections = cmsConfig?.config?.configJson?.contact?.sections || {};
  const contactCards = sections.cards?.enabled !== false ? sections.cards?.content : null;
  const formContent = sections.form?.content || {};

  // Map CMS data or fallback to defaults
  const displayInfo = [
    { title: contactCards?.phoneTitle || "Phone Number", text: contactCards?.phoneValue || "+123 456 7890", icon: ContactUsArr[0]?.icon },
    { title: contactCards?.emailTitle || "Email Address", text: contactCards?.emailValue || "info@example.com", icon: ContactUsArr[1]?.icon },
    { title: contactCards?.addressTitle || "Location", text: contactCards?.addressValue || "123 Main St, City", icon: ContactUsArr[2]?.icon },
    { title: contactCards?.hoursTitle || "Opening Hours", text: contactCards?.hoursValue || "Open 24/7", icon: ContactUsArr[3]?.icon },
  ];

  return (
    <div className="page-content" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
      {sections.banner?.enabled !== false && (
        <CommonBanner
          img={sections.banner?.content?.imageUrl || IMAGES.banner_bnr1}
          title={sections.banner?.content?.title || "Contact Us"}
          subtitle={sections.banner?.content?.breadcrumb || "Get In Touch"}
        />
      )}

      <section className="section-wrapper-8 content-inner-1">
        <div className="container">
          {contactCards && (
            <div className="row inner-section-wrapper align-items-center">
              {displayInfo.map(({ icon, text, title }, ind) => (
                <div className="col-lg-3 col-sm-6" key={ind}>
                  <div
                    className={`icon-bx-wraper style-5 hover-aware box-hover ${active === ind ? "active" : ""}`}
                    onMouseEnter={() => setActive(ind)}
                  >
                    <div className="icon-bx">
                      <div className="icon-cell">
                        <i className={icon || "flaticon-placeholder"}></i>
                      </div>
                    </div>
                    <div className="icon-content">
                      <h5 className="title">{title}</h5>
                      <p className="m-b0">{text}</p>
                      <div className="effect bg-primary"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sections.form?.enabled !== false && (
            <>
              <div className="section-head text-center">
                <h2 className="title">{formContent.title || "Reservation"}</h2>
                {formContent.description && <p className="mt-2">{formContent.description}</p>}
              </div>
              <form className="dzForm dezPlaceAni" method="POST">
                <input type="hidden" name="dzToDo" value="Contact" />
                <div className="row">
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">Your Name</label>
                    <div className="input-group input-line input-black">
                      <input name="dzName" required type="text" className="form-control" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">Your Email</label>
                    <div className="input-group input-line input-black">
                      <input name="dzEmail" required type="text" className="form-control" placeholder="info@example.com" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">Your Number</label>
                    <div className="input-group input-line input-black">
                      <input name="dzPhoneNumber" required type="text" className="form-control dz-number" placeholder="9876543210" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">Members</label>
                    <div className="input-group input-line input-black">
                      <input name="dzOther[Person]" required type="text" className="form-control" placeholder="1 Person" />
                    </div>
                  </div>
                  <div className="col-sm-12 m-b40">
                    <label className="form-label text-primary">Message</label>
                    <div className="input-group input-line input-black">
                      <textarea name="dzMessage" required className="form-control" placeholder="Hi, let's talk!" />
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button name="submit" value="submit" type="reset" className="btn btn-primary btn-hover-1">
                      <span>Book A Table</span>
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
