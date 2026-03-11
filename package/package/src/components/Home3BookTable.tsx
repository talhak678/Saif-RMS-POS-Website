import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { IMAGES } from "../constent/theme";
import SelectPicker from "rsuite/SelectPicker";

const data = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
].map((item) => ({ label: item, value: item }));

const Home3BookTable = () => {
  const { activeBranch } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [guestCount, setGuestCount] = useState<string>("1");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeBranch?.id) {
      toast.error("Branch information not found.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const dateVal = formData.get("dzOther[Date]");
    const timeVal = formData.get("dzOther[Time]");

    if (!dateVal || !timeVal) {
      toast.error("Please select Date and Time.");
      return;
    }

    try {
      setLoading(true);
      const startTime = new Date(`${dateVal}T${timeVal}`).toISOString();
      const payload = {
        customerName: formData.get("dzFirstName"),
        email: formData.get("dzEmail"),
        phone: formData.get("dzPhoneNumber"),
        guestCount: parseInt(guestCount) || 1,
        startTime,
        branchId: activeBranch.id,
      };

      const res = await axios.post("https://saif-rms-pos-backend-tau.vercel.app/api/reservations/public", payload);
      if (res.data?.success) {
        toast.success("Table Booked successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(res.data?.message || "Booking failed.");
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error("Failed to book table. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container contact-area bg-parallax"
      style={{
        backgroundImage: `url(${IMAGES.images_background_pic13})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="row align-items-center">
        <div className="col-lg-8 col-md-12 m-b30">
          <div className="contact-head">
            <h4 className="title text-white wow fadeInUp">Book a Table</h4>
            <p className="text-white opacity-75 wow fadeInUp">
              Experience excellent dining with us. Book your favorite table now.
            </p>
          </div>
          <form className="dzForm" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 m-b30 m-xl-b50 wow fadeInUp">
                <div className="input-group input-line">
                  <div className="input-group-prepand">
                    <i className="flaticon-user"></i>
                  </div>
                  <input
                    name="dzFirstName"
                    required
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 wow fadeInUp">
                <div className="input-group input-line">
                  <div className="input-group-prepand">
                    <i className="flaticon-phone-call"></i>
                  </div>
                  <input
                    name="dzPhoneNumber"
                    required
                    type="tel"
                    className="form-control dz-number"
                    placeholder="Phone Number"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 wow fadeInUp">
                <div className="input-group input-line">
                  <div className="input-group-prepand">
                    <i className="flaticon-two-people"></i>
                  </div>
                  <SelectPicker
                    className="form-select default-select select-option-rsuite w-100"
                    defaultValue={"1"}
                    data={data}
                    searchable={false}
                    onChange={(val) => setGuestCount(val || "1")}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 wow fadeInUp">
                <div className="input-group input-line">
                  <div className="input-group-prepand">
                    <i className="flaticon-email-1"></i>
                  </div>
                  <input
                    name="dzEmail"
                    required
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 wow fadeInUp">
                <div className="input-group input-line">
                  <div className="input-group-prepand">
                    <i className="flaticon-clock"></i>
                  </div>
                  <input
                    required
                    name="dzOther[Time]"
                    type="time"
                    className="form-control"
                    placeholder="Time"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 wow fadeInUp">
                <div className="input-group input-line">
                  <div className="input-group-prepand">
                    <i className="flaticon-calendar-date"></i>
                  </div>
                  <input
                    required
                    name="dzOther[Date]"
                    type="date"
                    className="form-control"
                    placeholder="Date"
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 ">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-md btn-primary btn-hover-3 mt-3"
                >
                  <span className="btn-text" data-text={loading ? "Processing..." : "Book a Table"}>
                    {loading ? "Processing..." : "Book a Table"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4 col-md-12">
          {/* Contact Info Widget - could be dynamic later */}
          <div className="widget widget_working bg-primary wow fadeInUp">
            <div className="head">
              <h5 className="title text-white">Contact Info</h5>
              <p className="text-white opacity-75">
                We are here to serve you the best food in town.
              </p>
            </div>
            <ul>
              <li>
                <i className="flaticon-placeholder"></i>
                <p>
                  Available at multiple branches.
                </p>
              </li>
              <li>
                <i className="flaticon-telephone"></i>
                <p>
                  Contact support for details.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home3BookTable;

