import { useState } from "react";
import { IMAGES } from "../constent/theme";
import Rate from "rsuite/Rate";

const navItems = [
  { icon: "icon-globe", title: "Description" },
  { icon: "icon-image", title: "Additional Information" },
  { icon: "icon-settings", title: "Product Review" },
];

const ProductDetailTabs = () => {
  const [tabActive, setTabActive] = useState<number>(0);
  return (
    <div className="content-inner pt-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <ul className="nav nav-tabs tabs-style-1">
              {navItems.map(({ icon, title }, ind) => (
                <li className="nav-item" key={ind}>
                  <button
                    onClick={() => {
                      setTabActive(ind);
                    }}
                    className={`nav-link ${tabActive === ind ? "active" : ""}`}
                  >
                    <i className={icon}></i>
                    <span className="d-none d-md-inline-block m-l10">
                      {title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="tab-content">
              {tabActive === 0 && <TabOne />}
              {tabActive === 1 && <TabTwo />}
              {tabActive === 2 && <TabThree />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTabs;

export function TabOne() {
  return (
    <>
      <div id="web-design-1" className="tab-pane active">
        <p className="m-b10">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't hidden in the middle of text.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
        <ul className="list-check primary">
          <li>
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and{" "}
          </li>
          <li>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{" "}
          </li>
        </ul>
      </div>
    </>
  );
}
export function TabTwo() {
  return (
    <>
      <div
        id="graphic-design-1"
        className="tab-pane active show"
        role="tabpanel"
      >
        <table className="table-bordered check-tbl">
          <tbody>
            <tr>
              <td>Cheese Burger</td>
              <td>Small, Medium &amp; Large</td>
            </tr>
            <tr>
              <td>Toppings</td>
              <td>Onion, Tomato, Olives</td>
            </tr>
            <tr>
              <td>Rating</td>
              <td>
                <span className="rating-bx">
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="far  fa-star m-r5 text-secondary"></i>
                </span>
              </td>
            </tr>
            <tr>
              <td>Shipping Charges</td>
              <td>Free Shipping</td>
            </tr>
            <tr>
              <td>Add More</td>
              <td>Coke, Cheese, Choco lava</td>
            </tr>
            <tr>
              <td>Delivery Time</td>
              <td>30 mins</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export function TabThree() {
  return (
    <>
      <div id="developement-1" className="tab-pane active">
        <div className="comments-area" id="comments">
          <ul className="comment-list">
            <li className="comment">
              <div className="comment-body">
                <div className="comment-author vcard">
                  <img
                    className="avatar photo"
                    src={IMAGES.testimonial_mini_pic1}
                    alt="/"
                  />
                  <cite className="fn">Monsur Rahman Lito</cite>
                </div>
                <div className="star-rating">
                  <i className="fas fa-star m-r5 text-secondary"></i>
                  <i className="fas fa-star m-r5 text-secondary"></i>
                  <i className="far fa-star m-r5 text-secondary"></i>
                  <i className="far fa-star m-r5 text-secondary"></i>
                  <i className="far fa-star text-secondary"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
            <li className="comment">
              <div className="comment-body">
                <div className="comment-author vcard">
                  <img
                    className="avatar photo"
                    src={IMAGES.testimonial_mini_pic2}
                    alt="/"
                  />
                  <cite className="fn">Jake Johnson</cite>
                </div>
                <div className="star-rating" data-rating="3">
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="far  fa-star m-r5 text-secondary"></i>
                  <i className="far  fa-star m-r5 text-secondary"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
            <li className="comment">
              <div className="comment-body">
                <div className="comment-author vcard">
                  <img
                    className="avatar photo"
                    src={IMAGES.testimonial_mini_pic3}
                    alt="/"
                  />
                  <cite className="fn">John Doe</cite>
                </div>
                <div className="star-rating" data-rating="4">
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="fas  fa-star m-r5 text-secondary"></i>
                  <i className="far  fa-star m-r5 text-secondary"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="comment-respond style-1" id="respond">
          <h3 className="comment-reply-title mb-4" id="reply-title">
            Add a review
          </h3>
          <form className="comment-form" id="commentform" method="post">
            <p className="comment-form-author">
              <label htmlFor="author">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="dzName"
                placeholder="Author"
                id="author"
              />
            </p>
            <p className="comment-form-email">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                name="dzEmail"
                id="email"
              />
            </p>
            <div className="comment-form-rating d-flex p-lr10">
              <label className="pull-left m-r10 m-b20">Your Rating</label>
              <div className="rating-widget">
                <div className="rating-stars">
                  <Rate
                    style={{ fontSize: "20px" }}
                    defaultValue={0}
                    color="yellow"
                    onChange={(data) => {
                      alert(`Thanks! You rated this ${data} stars.`);
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="comment-form-comment">
              <label htmlFor="comment">Comment</label>
              <textarea
                rows={4}
                name="comment"
                placeholder="Type Review Here"
                id="comment"
              ></textarea>
            </p>
            <p className="form-submit">
              <button
                type="reset"
                className="btn btn-primary btn-hover-2"
                id="submit"
              >
                Submit Now
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
