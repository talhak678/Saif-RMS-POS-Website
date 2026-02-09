import SelectPicker from "rsuite/SelectPicker";

const data = [
  "Number Of People",
  "Member 1",
  "Member 2",
  "Member 3",
  "Member 4",
  "Member 5",
].map((item) => ({ label: item, value: item }));

const Reservation = () => {
  return (
    <form action="#">
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
              type="text"
              className="form-control dz-number"
              placeholder="Phone Number"
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
              type="text"
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
              className="form-select default-select select-option-rsuite"
              defaultValue={"Number Of People"}
              data={data}
              searchable={false}
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
              type="text"
              className="form-control"
              id="datePickerOnly"
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
              type="text"
              className="form-control"
              id="timePickerOnly"
              placeholder="Time"
            />
          </div>
        </div>
        <div className="col-lg-12 col-md-12 text-center">
          <button
            type="button"
            name="submit"
            value="submit"
            className="btn btn-lg btn-white btn-hover-1"
          >
            <span>Book a Table</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Reservation;
