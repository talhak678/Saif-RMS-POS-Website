import { useContext, useState } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { ContactUsArr } from "../elements/JsonData";
import { Context } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ContactUs = () => {
  const { cmsConfig, cmsLoading, activeBranch } = useContext(Context);
  const [active, setActive] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  if (cmsLoading) return <div className="text-center py-5">Loading...</div>;

  const sections = cmsConfig?.config?.configJson?.contact?.sections || {};
  const bannerContent = sections.banner?.content || {};
  const contactCards = sections.cards?.enabled !== false ? sections.cards?.content : null;
  const formContent = sections.form?.content || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeBranch?.id) {
      toast.error("Branch information not found. Please try again later.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const dateVal = formData.get("dzOther[Date]");
    const timeVal = formData.get("dzOther[Time]");

    if (!dateVal || !timeVal) {
      toast.error("Please select both Date and Time for your reservation.");
      return;
    }

    try {
      setLoading(true);
      const startTime = new Date(`${dateVal}T${timeVal}`).toISOString();
      const data = {
        customerName: formData.get("dzName"),
        email: formData.get("dzEmail"),
        phone: formData.get("dzPhoneNumber"),
        guestCount: parseInt(formData.get("dzOther[Person]") as string) || 1,
        startTime,
        message: formData.get("dzMessage"),
        branchId: activeBranch.id,
      };

      const res = await axios.post("https://saif-rms-pos-backend.vercel.app/api/reservations/public", data);
      if (res.data?.success) {
        toast.success("Reservation Booked Successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(res.data?.message || "Something went wrong.");
      }
    } catch (error: any) {
      console.error("Booking Error:", error);
      if (error instanceof RangeError) {
        toast.error("Invalid Date or Time selected. Please check your input.");
      } else {
        toast.error(error.response?.data?.message || "Failed to book table. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Map CMS data or fallback to defaults
  const displayInfo = [
    { title: contactCards?.phoneTitle || "Phone Number", text: contactCards?.phoneValue || "+123 456 7890", icon: contactCards?.phoneIcon || ContactUsArr[0]?.icon, iconUrl: contactCards?.phoneIconUrl },
    { title: contactCards?.emailTitle || "Email Address", text: contactCards?.emailValue || "info@example.com", icon: contactCards?.emailIcon || ContactUsArr[1]?.icon, iconUrl: contactCards?.emailIconUrl },
    { title: contactCards?.addressTitle || "Location", text: contactCards?.addressValue || "123 Main St, City", icon: contactCards?.addressIcon || ContactUsArr[2]?.icon, iconUrl: contactCards?.addressIconUrl },
    { title: contactCards?.hoursTitle || "Opening Hours", text: contactCards?.hoursValue || "Open 24/7", icon: contactCards?.hoursIcon || ContactUsArr[3]?.icon, iconUrl: contactCards?.hoursIconUrl },
  ];

  return (
    <div className="page-content" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
      <style>
        {`
          @media (max-width: 991px) {
            .section-wrapper-8 {
              padding-top: 50px !important;
            }
            .section-head {
              text-align: center !important;
            }
          }
          @media (max-width: 576px) {
            .icon-bx-wraper.style-5 {
              margin-bottom: 20px !important;
              padding: 20px !important;
              text-align: center !important;
              flex-direction: column !important;
              align-items: center !important;
            }
            .icon-bx-wraper.style-5 .icon-bx {
              margin: 0 auto 15px !important;
            }
            .dzForm .m-b30 {
              margin-bottom: 20px !important;
            }
          }
          .icon-cell img {
            width: 40px;
            height: 40px;
            object-fit: contain;
          }
          .dzForm .form-control::placeholder {
            opacity: 0.2 !important;
          }
          .icon-bx-wraper.style-5 .icon-content .title {
            color: var(--primary) !important;
            transition: all 0.3s ease;
          }
          .icon-bx-wraper.style-5:hover .icon-content .title,
          .icon-bx-wraper.style-5.active .icon-content .title {
            color: var(--secondary) !important;
          }
          /* Reservation Button - Normal: Secondary Text, Hover: Dark Text */
          .dzForm .btn-primary.btn-hover-1 {
            color: var(--secondary) !important;
          }
          .dzForm .btn-primary.btn-hover-1 span {
            color: var(--secondary) !important;
          }
          .dzForm .btn-primary.btn-hover-1:hover {
            background-color: var(--primary) !important;
            color: #222222 !important;
            border-color: var(--primary) !important;
          }
          .dzForm .btn-primary.btn-hover-1:hover span {
             color: #222222 !important;
          }
        `}
      </style>
      {sections.banner?.enabled !== false && (
        <CommonBanner
          img={bannerContent.imageUrl || IMAGES.banner_bnr1}
          title={bannerContent.title || "Contact Us"}
          subtitle={bannerContent.breadcrumb || "Get In Touch"}
          description={bannerContent.description}
          showTitle={bannerContent.showTitle !== "false"}
          textAlign={bannerContent.textAlign}
        />
      )}

      <section id="reservation-section" className="section-wrapper-8 content-inner-1">
        <div className="container">
          {contactCards && (
            <div className="row inner-section-wrapper align-items-center">
              {displayInfo.map(({ icon, text, title, iconUrl }: any, ind) => (
                <div className="col-lg-3 col-sm-6" key={ind}>
                  <div
                    className={`icon-bx-wraper style-5 hover-aware box-hover ${active === ind ? "active" : ""}`}
                    onMouseEnter={() => setActive(ind)}
                  >
                    <div className="icon-bx">
                      <div className="icon-cell">
                        {iconUrl ? (
                          <img src={iconUrl} alt={title} />
                        ) : (
                          <i className={icon || "flaticon-placeholder"}></i>
                        )}
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
              <div className={`section-head text-${formContent.textAlign === "left" ? "start" : formContent.textAlign === "right" ? "end" : "center"}`}>
                {formContent.showTitle !== "false" && <h2 className="title">{formContent.title || "Reservation"}</h2>}
                {formContent.description && <p className="mt-2">{formContent.description}</p>}
              </div>
              <form className="dzForm dezPlaceAni" onSubmit={handleSubmit}>
                <input type="hidden" name="dzToDo" value="Contact" />
                <div className="row">
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">{formContent.nameLabel || "Your Name"}</label>
                    <div className="input-group input-line input-black">
                      <input name="dzName" required type="text" className="form-control" placeholder={formContent.namePlaceholder || "John Doe"} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">{formContent.emailLabel || "Your Email"}</label>
                    <div className="input-group input-line input-black">
                      <input name="dzEmail" required type="email" className="form-control" placeholder={formContent.emailPlaceholder || "info@example.com"} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">{formContent.phoneLabel || "Your Number"}</label>
                    <div className="input-group input-line input-black">
                      <input
                        name="dzPhoneNumber"
                        required
                        type="tel"
                        className="form-control dz-number"
                        placeholder={formContent.phonePlaceholder || "9876543210"}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">{formContent.membersLabel || "Members"}</label>
                    <div className="input-group input-line input-black">
                      <input name="dzOther[Person]" required type="number" min="1" className="form-control" placeholder={formContent.membersPlaceholder || "1 Person"} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">{formContent.dateLabel || "Date"}</label>
                    <div className="input-group input-line input-black">
                      <input name="dzOther[Date]" required type="date" className="form-control" placeholder={formContent.datePlaceholder || "Select Date"} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 m-b30 m-sm-b50">
                    <label className="form-label text-primary">{formContent.timeLabel || "Time"}</label>
                    <div className="input-group input-line input-black">
                      <input name="dzOther[Time]" required type="time" className="form-control" placeholder={formContent.timePlaceholder || "Select Time"} />
                    </div>
                  </div>
                  <div className="col-sm-12 m-b40">
                    <label className="form-label text-primary">{formContent.messageLabel || "Message"}</label>
                    <div className="input-group input-line input-black">
                      <textarea name="dzMessage" required className="form-control" placeholder={formContent.messagePlaceholder || "Hi, let's talk!"} />
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button name="submit" value="submit" type="submit" className="btn btn-primary btn-hover-1" disabled={loading}>
                      <span>{loading ? "Processing..." : (formContent.buttonText || "Book A Table")}</span>
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
