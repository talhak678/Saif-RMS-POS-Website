import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";
import axios from "axios";

const navItems = [
  { icon: "icon-globe", title: "Description" },
  { icon: "icon-image", title: "Additional Information" },
  { icon: "icon-settings", title: "Product Review" },
];

const ProductDetailTabs = ({ menuItemId }: { menuItemId?: string }) => {
  const [tabActive, setTabActive] = useState<number>(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const { cmsConfig } = useContext(Context);

  useEffect(() => {
    const fetchReviews = async () => {
      const slug = cmsConfig?.slug;
      const restaurantId = cmsConfig?.restaurantId;
      if (!menuItemId || (!slug && !restaurantId)) return;
      try {
        const params = slug ? `slug=${slug}` : `restaurantId=${restaurantId}`;
        const res = await axios.get(`https://saif-rms-pos-backend.vercel.app/api/customers/reviews?${params}&menuItemId=${menuItemId}`);
        if (res.data?.success) {
          setReviews(res.data.data.reviews || []);
        }
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, [cmsConfig?.slug, cmsConfig?.restaurantId, menuItemId]);

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
              {tabActive === 2 && (
                <TabThree
                  reviews={reviews}
                />
              )}
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
export function TabThree({ reviews }: { reviews: any[] }) {
  const { cmsConfig } = useContext(Context);
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  return (
    <>
      <div id="developement-1" className="tab-pane active">
        <div className="comments-area" id="comments">
          {reviews.length > 0 ? (
            <ul className="comment-list">
              {reviews.map((review, ind) => (
                <li className="comment" key={ind} style={{ borderBottom: '1px solid #eee', paddingBottom: '25px', marginBottom: '25px' }}>
                  <div className="comment-body">
                    <div className="comment-author vcard" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        backgroundColor: `${primaryColor}20`,
                        color: primaryColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        marginRight: '15px'
                      }}>
                        {(review.order?.customer?.name || "G")[0].toUpperCase()}
                      </div>
                      <div>
                        <cite className="fn" style={{ fontStyle: 'normal', fontWeight: 700, fontSize: '16px' }}>
                          {review.order?.customer?.name || "Guest Customer"}
                        </cite>
                        <div className="text-muted" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="star-rating" style={{ marginBottom: '12px' }}>
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`${i < review.rating ? "fas" : "far"} fa-star m-r5`} style={{ color: "#fe9f10", fontSize: '13px' }}></i>
                      ))}
                      <span style={{ fontSize: '12px', marginLeft: '8px', color: '#28a745', fontWeight: 600 }}>
                        <i className="fas fa-check-circle" /> Verified Purchase
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.6', fontStyle: 'italic' }}>
                      "{review.comment || "The food was amazing! Highly recommended."}"
                    </p>

                    {/* Merchant Reply */}
                    {review.reply && (
                      <div className="merchant-reply" style={{
                        marginTop: '20px',
                        padding: '15px 20px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '12px',
                        borderLeft: `4px solid ${primaryColor}`,
                        marginLeft: '20px'
                      }}>
                        <div style={{ fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', color: primaryColor, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="fas fa-reply" /> Restaurant Response
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#444' }}>{review.reply}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-5">
              <div style={{ fontSize: '40px', color: '#eee', marginBottom: '15px' }}>
                <i className="fas fa-star-half-alt" />
              </div>
              <h5 className="text-muted">No reviews yet for this item</h5>
              <p className="text-muted small">Be the first to share your experience after ordering!</p>
            </div>
          )}
        </div>

        <div className="comment-respond style-1 mt-5" id="respond">
          <div style={{
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '20px',
            border: '2px dashed #eee',
            textAlign: 'center'
          }}>
            <h4 className="mb-2" style={{ fontWeight: 800 }}>Want to leave a review?</h4>
            <p className="text-muted mb-4">To ensure all reviews are genuine, you can submit a review directly from your <strong>Order History</strong> once your meal has been delivered.</p>
            <Link
              to="/my-account"
              className="btn btn-primary d-inline-flex align-items-center gap-2"
              style={{ borderRadius: '12px' }}
            >
              Visit My Account <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
