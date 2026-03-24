import { useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";

const navItems = [
  { icon: "icon-globe", title: "Description" },
  { icon: "icon-image", title: "Additional Information" },
  { icon: "icon-settings", title: "Product Review" },
];

interface ProductDetailTabsProps {
  menuItemId?: string;
  product?: any;
}

const ProductDetailTabs = ({ menuItemId, product }: ProductDetailTabsProps) => {
  const [tabActive, setTabActive] = useState<number>(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const { cmsConfig } = useContext(Context);

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  useEffect(() => {
    const fetchReviews = async () => {
      const slug = cmsConfig?.slug;
      const restaurantId = cmsConfig?.restaurantId;
      if (!menuItemId || (!slug && !restaurantId)) return;
      try {
        const params = slug ? `slug=${slug}` : `restaurantId=${restaurantId}`;
        const res = await axios.get(`https://saif-rms-pos-backend-tau.vercel.app/api/customers/reviews?${params}&menuItemId=${menuItemId}`);
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
      <style>
        {`
          .nav-tabs.tabs-style-1 .nav-link.active {
            border-bottom: 3px solid ${primaryColor} !important;
            color: ${primaryColor} !important;
          }
          .nav-tabs.tabs-style-1 .nav-link.active i {
            color: ${primaryColor} !important;
          }
           .list-check.primary li::before {
            color: ${primaryColor} !important;
          }
        `}
      </style>
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
              {tabActive === 0 && <TabOne product={product} />}
              {tabActive === 1 && <TabTwo product={product} />}
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

export function TabOne({ product }: { product?: any }) {
  return (
    <div id="description" className="tab-pane active">
      <div className="pt-4">
        <h5 className="mb-3">Product Description</h5>
        <p className="m-b20" style={{ lineHeight: '1.8', fontSize: '15px' }}>
          {product?.description || ""}
        </p>
      </div>
    </div>
  );
}

export function TabTwo({ product }: { product?: any }) {
  const { cmsConfig, activeBranch } = useContext(Context);
  const deliveryCharge = activeBranch?.deliveryCharge || 0;
  const taxPercentage = cmsConfig?.config?.configJson?.orders?.taxPercentage || 0;

  return (
    <div id="additional-info" className="tab-pane active show" role="tabpanel">
      <div className="pt-4">
        <table className="table-bordered check-tbl">
          <tbody>
            <tr>
              <td>Product Name</td>
              <td>{product?.name || "N/A"}</td>
            </tr>
            <tr>
              <td>Category</td>
              <td>{product?.categoryName || "Main Course"}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{cmsConfig?.config?.currency || '$'}{parseFloat(product?.price || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tax Rate</td>
              <td>{taxPercentage}%</td>
            </tr>
            <tr>
              <td>Shipping Charges</td>
              <td>{deliveryCharge > 0 ? `${cmsConfig?.config?.currency || '$'}${deliveryCharge}` : "Free Shipping"}</td>
            </tr>
            <tr>
              <td>Delivery Time</td>
              <td>30 - 45 mins</td>
            </tr>
            <tr>
              <td>Preparation</td>
              <td>Freshly Cooked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function TabThree({ reviews }: { reviews: any[] }) {
  const { cmsConfig } = useContext(Context);
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  return (
    <div id="reviews" className="tab-pane active">
      <div className="comments-area pt-4" id="comments">
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
                    "{review.comment}"
                  </p>
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
    </div>
  );
}
