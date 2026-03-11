import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import SelectPicker from "rsuite/SelectPicker";

const data = [
  "Number Of People",
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

const Reservation = () => {
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
        customerName: formData.get("dzName"),
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
    <form className="dzForm" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-4 col-md-6 m-b30 m-sm-b50 wow fadeInUp">
          <div className="input-group input-line">
            <div className="input-group-prepand">
              <i className="flaticon-user"></i>
            </div>
            <input
              name="dzName"
              required
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div>
        <div className="col-lg-4 col-md-6 m-b30 m-sm-b50 wow fadeInUp">
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
        <div className="col-lg-4 col-md-6 m-b30 m-sm-b50 wow fadeInUp">
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
        <div className="col-lg-4 col-md-6 m-b30 m-sm-b50 wow fadeInUp">
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
        <div className="col-lg-4 col-md-6 m-b30 m-sm-b50 wow fadeInUp">
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
        <div className="col-lg-4 col-md-6 m-b30 m-sm-b50 wow fadeInUp">
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
        <div className="col-lg-12 col-md-12 text-center">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-lg btn-white btn-hover-1"
          >
            <span>{loading ? "Processing..." : "Book a Table"}</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Reservation;

