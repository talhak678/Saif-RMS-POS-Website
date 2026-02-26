import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductDetailTabs from "../elements/ProductDetailTabs";
import HomeSpacialMenu from "../elements/HomeSpacialMenu";
import { Context } from "../context/AppContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any>(null);
  const [reviewStats, setReviewStats] = useState({ avgRating: 0, totalReviews: 0 });

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  useEffect(() => {
    if (!cmsLoading && cmsConfig?.menu) {
      // Find product in any category
      let found = null;
      for (const cat of cmsConfig.menu) {
        found = cat.menuItems.find((item: any) => item.id === id);
        if (found) {
          found = { ...found, categoryName: cat.name };
          break;
        }
      }
      if (found) {
        setProduct(found);
        fetchReviewStats(found.id);
      }
    }
  }, [id, cmsConfig, cmsLoading]);

  const fetchReviewStats = async (menuItemId: string) => {
    const slug = cmsConfig?.slug;
    const restaurantId = cmsConfig?.restaurantId;
    if (!slug && !restaurantId) return;

    try {
      const params = slug ? `slug=${slug}` : `restaurantId=${restaurantId}`;
      const res = await axios.get(`https://saif-rms-pos-backend.vercel.app/api/customers/reviews?${params}&menuItemId=${menuItemId}&limit=1`);
      if (res.data?.success) {
        setReviewStats({
          avgRating: res.data.data.avgRating || 0,
          totalReviews: res.data.data.totalReviews || 0
        });
      }
    } catch (err) {
      console.error("Failed to fetch review stats", err);
    }
  };

  if (cmsLoading) return <div className="text-center py-5">Loading product...</div>;

  if (!product) return (
    <div className="page-content bg-white text-center py-5">
      <h3>Product not found</h3>
      <button onClick={() => navigate(-1)} className="btn btn-primary mt-3">Go Back</button>
    </div>
  );

  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title={product.name}
        subtitle="Product Detail"
      />
      <section className="content-inner-1 overflow-hidden">
        <div className="container">
          <div className="row product-detail">
            <div className="col-lg-4 col-md-5">
              <div className="detail-media m-b30" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src={product.image || "https://via.placeholder.com/800x800"} alt={product.name} />
              </div>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="detail-info">
                <span className="badge" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="m-r5"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="16"
                      height="16"
                      stroke={primaryColor}
                    />
                    <circle cx="8.5" cy="8.5" r="5.5" fill={primaryColor} />
                  </svg>
                  {product.categoryName}
                </span>
                <div className="dz-head mt-3">
                  <h2 className="title" style={{ fontSize: '32px', fontWeight: 800 }}>{product.name}</h2>
                  <div className="rating">
                    <i className="fa-solid fa-star" style={{ color: reviewStats.totalReviews > 0 ? '#fe9f10' : '#ccc' }}></i>{" "}
                    <span>
                      <strong className="text-dark">
                        {reviewStats.totalReviews > 0 ? reviewStats.avgRating.toFixed(1) : "New"}
                      </strong>
                      {reviewStats.totalReviews > 0 ? ` - ${reviewStats.totalReviews} Verified Feedback` : " - No ratings yet"}
                    </span>
                  </div>
                </div>
                <p className="text mt-3" style={{ fontSize: '15px', color: '#666', lineHeight: '1.8' }}>
                  {product.description || "Indulge in our freshly prepared house special. Made with premium ingredients and traditional recipes to bring you an authentic culinary experience."}
                </p>
                <ul className="detail-list">
                  <li>
                    Price <span className="text-primary m-t5" style={{ fontSize: '24px', fontWeight: 800 }}>${parseFloat(product.price).toFixed(2)}</span>
                  </li>
                  <li>
                    Quantity
                    <div className="btn-quantity style-1 m-t5">
                      <div className="input-group bootstrap-touchspin">
                        <input
                          type="text"
                          value={quantity}
                          readOnly
                          className="form-control"
                          style={{ textAlign: 'center' }}
                        />
                        <span className="input-group-btn-vertical">
                          <button
                            className="btn btn-default bootstrap-touchspin-up"
                            type="button"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            <i className="ti-plus"></i>
                          </button>
                          <button
                            className="btn btn-default bootstrap-touchspin-down"
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            <i className="ti-minus"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>

                <div className="d-lg-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                  <ul className="modal-btn-group" style={{ display: 'flex', gap: '15px' }}>
                    <li>
                      <button
                        onClick={() => addToCart({ ...product, quantity })}
                        className="btn btn-primary btn-hover-1"
                        style={{ padding: '15px 35px', borderRadius: '15px' }}
                      >
                        <span>
                          Add To Cart{" "}
                          <i className="flaticon-shopping-bag-1 m-l10"></i>
                        </span>
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/shop-checkout"
                        onClick={() => addToCart({ ...product, quantity })}
                        className="btn btn-outline-secondary btn-hover-1"
                        style={{ padding: '15px 35px', borderRadius: '15px' }}
                      >
                        <span>
                          Buy Now{" "}
                          <i className="flaticon-shopping-cart m-l10"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <Avatar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductDetailTabs menuItemId={product.id} />
      <section className="content-inner-1 pt-0 mt-5">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title" style={{ fontWeight: 800 }}>You May Also Like</h2>
          </div>
          <HomeSpacialMenu />
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
export function DetailList() {
  return (
    <>
      <ul className="add-product">
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic1} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">French Frise</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic2} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">Extra Cheese</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic3} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">Coca Cola</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic4} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">Choco Lava</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export function Avatar() {
  return (
    <>
      <ul className="avatar-list avatar-list-stacked">
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic1} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic2} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic3} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic4} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic5} alt="" />
        </li>
        <li className="avatar">
          <span>150+</span>
        </li>
      </ul>
    </>
  );
}
