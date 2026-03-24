import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { IMAGES } from "../constent/theme";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductDetailTabs from "../elements/ProductDetailTabs";
import { Context } from "../context/AppContext";

// ─── "You May Also Like" Section (inline, dynamic) ──────────────────────────
const YouMayAlsoLike = ({ currentProductId }: { currentProductId: string }) => {
  const { cmsConfig, addToCart } = useContext(Context);
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

  // Gather all items from all categories, exclude current product
  const allItems: any[] = [];
  if (cmsConfig?.menu) {
    for (const cat of cmsConfig.menu) {
      for (const item of cat.menuItems || []) {
        if (item.id !== currentProductId) {
          allItems.push({ ...item, categoryName: cat.name });
        }
      }
    }
  }

  // Show up to 4 random-ish items (first 4 excluding current)
  const suggestions = allItems.slice(0, 4);

  if (suggestions.length === 0) return null;

  return (
    <section className="content-inner-1 pt-0 mt-5">
      <style>
        {`
          .suggested-card .top-curved-bg {
            background-color: #f5f5f5;
            transition: all 0.4s ease;
          }
          .suggested-card:hover .top-curved-bg {
            background-color: ${primaryColor} !important;
          }
           .suggested-card:hover {
            border-color: ${primaryColor}40 !important;
            transform: translateY(-8px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.08) !important;
          }
          .suggested-card .dz-title a {
            font-weight: 600 !important;
            color: ${primaryColor} !important;
            display: block;
          }
          .suggested-card:hover .dz-media img {
            animation: spin 12s linear infinite;
          }
          .suggested-card .dz-media img {
            transition: all 0.5s ease;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="container">
        <div className="section-head text-center mb-4">
          <h2 className="title" style={{ fontWeight: 800 }}>You May Also Like</h2>
          <p className="text-muted">Explore more delicious options from our menu</p>
        </div>
        <div className="row">
          {suggestions.map((item, ind) => (
            <div className="col-lg-3 col-md-6 col-sm-6 m-b30 fadeInUp" key={item.id || ind}>
              <div 
                className="dz-img-box suggested-card" 
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  border: '1px solid #f0f0f0',
                  overflow: 'hidden',
                  minHeight: '420px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.03)'
                }}
              >
                {/* Colored Top Background (Curved) */}
                <div 
                  className="top-curved-bg"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '140px',
                    borderRadius: '0 0 100% 100% / 0 0 50% 50%',
                    transform: 'scaleX(1.2)',
                    zIndex: 0
                  }}
                />

                <div className="dz-media" style={{ display: 'flex', justifyContent: 'center', padding: '40px 0 0', position: 'relative', zIndex: 1 }}>
                  <img 
                    src={item.image || IMAGES.shop_pic1} 
                    alt={item.name} 
                    style={{ 
                      objectFit: 'cover', 
                      width: '140px', 
                      height: '140px', 
                      borderRadius: '50%', 
                      border: '5px solid #fff', 
                      boxShadow: '0 8px 15px rgba(0,0,0,0.08)' 
                    }} 
                  />
                </div>

                <div className="dz-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '5px 15px 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <h4 className="dz-title" style={{ fontSize: '18px', fontWeight: 900, marginBottom: '12px', marginTop: '10px' }}>
                    <Link to={`/product/${item.id}`} style={{ fontWeight: 900, color: '#000' }}>{item.name}</Link>
                  </h4>
                  <p style={{ fontSize: '15px', color: '#555', marginBottom: '10px', lineHeight: '1.5', height: '48px', overflow: 'hidden' }}>
                    {item.description ? item.description.split(' ').slice(0, 7).join(' ') + '...' : 'Freshly prepared with the best ingredients.'}
                  </p>
                  
                  <h5 className="dz-price" style={{ color: primaryColor, fontWeight: 800, marginBottom: '15px', fontSize: '24px' }}>
                    {cmsConfig?.config?.currency || '$'}{parseFloat(item.price || 0).toFixed(2)}
                  </h5>

                  <div className="mt-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <button
                      className="btn btn-primary"
                      style={{ 
                        background: primaryColor, 
                        borderColor: primaryColor, 
                        padding: '0', 
                        fontSize: '16px', 
                        height: '48px', 
                        width: '140px',
                        borderRadius: '6px',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: 800,
                        color: '#fff',
                        textTransform: 'none'
                      }}
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any>(null);
  const [reviewStats, setReviewStats] = useState({ avgRating: 0, totalReviews: 0 });

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";
  const secondaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.secondaryColor || "#ffc822";
  const textColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.textColor || "#222222";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!cmsLoading && cmsConfig?.menu) {
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
      const res = await axios.get(`https://saif-rms-pos-backend-tau.vercel.app/api/customers/reviews?${params}&menuItemId=${menuItemId}`);
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
      <style>
        {`
          /* Quantity spinner – Neutral border, primary icons */
          .qty-spinner-wrap {
            display: inline-flex;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            height: 40px;
            background: #fdfdfd;
          }
          .qty-spinner-wrap .qty-btn {
            width: 35px;
            height: 100%;
            border: none;
            background: transparent;
            color: ${primaryColor} !important;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .qty-spinner-wrap .qty-btn i {
            color: ${primaryColor} !important;
          }
          .qty-spinner-wrap .qty-btn:hover {
            background: ${primaryColor}10;
          }
          .qty-spinner-wrap .qty-value {
            min-width: 40px;
            text-align: center;
            font-weight: 800;
            font-size: 15px;
            color: #222;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
            background: #fff;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Add To Cart Button */
          .modal-btn-group button.btn .secondary-text-enforced {
            color: ${secondaryColor} !important;
            transition: all 0.3s ease;
          }
          .modal-btn-group button.btn:hover .secondary-text-enforced {
            color: ${textColor} !important;
          }
          .modal-btn-group button.btn {
            color: ${secondaryColor} !important;
          }
          .modal-btn-group button.btn:hover {
            color: ${textColor} !important;
          }

          /* Buy Now Button */
          .modal-btn-group a.btn,
          .modal-btn-group a.btn .secondary-text-enforced {
            color: ${textColor} !important;
            transition: all 0.3s ease;
          }
          .modal-btn-group a.btn:hover,
          .modal-btn-group a.btn:hover .secondary-text-enforced {
            color: ${textColor} !important;
            opacity: 0.8;
          }

          .secondary-label-enforced,
          .avatar-list li.avatar span.secondary-label-enforced {
            color: ${secondaryColor} !important;
          }

          /* Avatar "review count" bubble */
          .avatar-review-count {
            background: ${primaryColor} !important;
            color: ${secondaryColor} !important;
            border: 2px solid ${primaryColor} !important;
            font-weight: 800;
            font-size: 11px;
            border-radius: 50%;
            width: 38px;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            z-index: 5;
          }
          .avatar-list.avatar-list-stacked {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0;
            padding: 0;
            list-style: none;
          }
          .avatar-list-stacked .avatar {
            margin-right: -15px;
            position: relative;
            border: 2px solid #fff;
            border-radius: 50%;
            overflow: hidden;
            width: 38px;
            height: 38px;
            background: #fff;
          }
          .avatar-list-stacked .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        `}
      </style>

      <section className="content-inner-1 overflow-hidden">
        <div className="container">
          <div className="row product-detail">
            {/* Product Image */}
            <div className="col-lg-4 col-md-5">
              <div className="detail-media m-b30" style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img src={product.image || "https://via.placeholder.com/800x800"} alt={product.name} />
              </div>
            </div>

            {/* Product Info */}
            <div className="col-lg-8 col-md-7">
              <div className="detail-info">
                {/* Category Badge */}
                <span className="badge" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor, border: `1px solid ${primaryColor}30` }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-r5">
                    <rect x="0.5" y="0.5" width="16" height="16" stroke={primaryColor} />
                    <circle cx="8.5" cy="8.5" r="5.5" fill={primaryColor} />
                  </svg>
                  {product.categoryName}
                </span>

                {/* Name & Rating */}
                <div className="dz-head mt-3">
                  <h2 className="title" style={{ fontSize: '32px', fontWeight: 800 }}>{product.name}</h2>
                  <div className="rating">
                    <i className="fa-solid fa-star" style={{ color: reviewStats.totalReviews > 0 ? primaryColor : '#ccc' }}></i>{" "}
                    <span>
                      <strong className="text-dark">
                        {reviewStats.totalReviews > 0 ? reviewStats.avgRating.toFixed(1) : "New"}
                      </strong>
                      {reviewStats.totalReviews > 0 ? ` - ${reviewStats.totalReviews} Verified Feedback` : " - No ratings yet"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text mt-3" style={{ fontSize: '15px', color: '#666', lineHeight: '1.8' }}>
                  {product.description || "Indulge in our freshly prepared house special. Made with premium ingredients and traditional recipes to bring you an authentic culinary experience."}
                </p>

                {/* Price & Quantity */}
                <ul className="detail-list">
                  <li>
                    <span className="secondary-label-enforced">Price</span>{" "}
                    <span className="text-primary m-t5" style={{ fontSize: '24px', fontWeight: 800 }}>
                      {cmsConfig?.config?.currency || '$'}{(parseFloat(product.price) * quantity).toFixed(2)}
                    </span>
                  </li>
                  <li>
                    <span className="secondary-label-enforced">Quantity</span>
                    <div className="m-t5">
                      <div className="qty-spinner-wrap">
                        <button
                          className="qty-btn"
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          aria-label="Decrease quantity"
                        >
                          <i className="ti-minus"></i>
                        </button>
                        <div className="qty-value">{quantity}</div>
                        <button
                          className="qty-btn"
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <i className="ti-plus"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>

                {/* Buttons + Avatar Reviews */}
                <div className="d-flex flex-wrap align-items-center justify-content-between mt-4 pt-3 border-top" style={{ gap: '20px' }}>
                  <ul className="modal-btn-group" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', margin: 0, padding: 0, listStyle: 'none' }}>
                    <li>
                      <button
                        onClick={() => addToCart({ ...product, quantity })}
                        className="btn btn-primary btn-hover-1"
                        style={{ padding: '0 35px', borderRadius: '15px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <span className="secondary-text-enforced" style={{ fontWeight: 700 }}>
                          Add To Cart{" "}
                          <i className="flaticon-shopping-bag-1 m-l10 secondary-text-enforced"></i>
                        </span>
                      </button>
                    </li>
                    <li>
                      <Link
                        to="/shop-cart"
                        onClick={() => addToCart({ ...product, quantity })}
                        className="btn btn-outline-secondary btn-hover-1"
                        style={{ padding: '0 35px', borderRadius: '15px', height: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <span className="secondary-text-enforced" style={{ fontWeight: 700 }}>
                          Buy Now{" "}
                          <i className="flaticon-shopping-cart m-l10 secondary-text-enforced"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                  
                  <div className="review-stat-wrapper" style={{ minWidth: reviewStats.totalReviews > 0 ? '120px' : '60px' }}>
                    <ReviewAvatars reviewStats={reviewStats} primaryColor={primaryColor} secondaryColor={secondaryColor} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs: Description, Additional Info, Reviews */}
      <ProductDetailTabs menuItemId={product.id} product={product} />

      {/* You May Also Like */}
      <YouMayAlsoLike currentProductId={product.id} />
    </div>
  );
};

export default ProductDetail;

// ─── Dynamic Review Avatars ──────────────────────────────────────────────────
export function ReviewAvatars({ reviewStats, primaryColor }: { reviewStats: { totalReviews: number; avgRating: number }; primaryColor: string; secondaryColor: string }) {
  const count = reviewStats.totalReviews;

  return (
    <ul className="avatar-list avatar-list-stacked" style={{ justifyContent: 'center' }}>
      <li className="avatar" style={{ border: 'none', margin: 0 }}>
        <div
          className="avatar-review-count"
          style={{
            background: primaryColor,
            color: '#fff',
            border: `2px solid ${primaryColor}`,
            marginLeft: 0,
            width: '38px',
            height: '38px',
            fontSize: '11px',
            fontWeight: 800
          }}
        >
          {count > 0 ? (count === 1 ? '1' : `${count}+`) : 'New'}
        </div>
      </li>
    </ul>
  );
}

// ─── Legacy exports (kept for backward compatibility) ────────────────────────
export function Avatar() {
  return (
    <>
      <ul className="avatar-list avatar-list-stacked">
        <li className="avatar"><img src={IMAGES.testiminial_small_pic1} alt="" /></li>
        <li className="avatar"><img src={IMAGES.testiminial_small_pic2} alt="" /></li>
        <li className="avatar"><img src={IMAGES.testiminial_small_pic3} alt="" /></li>
        <li className="avatar"><img src={IMAGES.testiminial_small_pic4} alt="" /></li>
        <li className="avatar"><img src={IMAGES.testiminial_small_pic5} alt="" /></li>
        <li className="avatar"><span className="secondary-label-enforced">150+</span></li>
      </ul>
    </>
  );
}
