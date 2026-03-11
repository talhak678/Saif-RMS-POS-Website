import { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

const ShopStyle1RightContent = () => {
  const { cmsConfig, addToCart } = useContext(Context);

  const primaryColor =
    cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor ||
    cmsConfig?.config?.primaryColor ||
    "#ff6b35";

  const secondaryColor =
    cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.secondaryColor ||
    cmsConfig?.config?.secondaryColor ||
    "#2ecc71";

  // Get a few items from menu for 'Related Products'
  const allItems = (cmsConfig?.menu || []).flatMap((cat: any) =>
    cat.menuItems.map((item: any) => ({ ...item, categoryName: cat.name }))
  );

  const relatedProducts = allItems.slice(0, 6); // Show first 6 as related

  return (
    <div className="related-products-list">
      <style>
        {`
          .related-card {
            background: #fff;
            border-radius: 15px;
            padding: 15px;
            margin-bottom: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.05);
            display: flex;
            align-items: center;
            transition: transform 0.2s;
          }
          .related-card:hover {
            transform: translateY(-3px);
          }
          .related-media {
            width: 100px;
            height: 100px;
            border-radius: 12px;
            overflow: hidden;
            flex-shrink: 0;
            background: #f5f5f5;
          }
          .related-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .related-info {
            flex: 1;
            padding-left: 20px;
          }
          .related-title-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }
          .veg-icon {
             width: 16px;
             height: 16px;
             border: 1px solid #0f8a65;
             display: inline-flex;
             align-items: center;
             justify-content: center;
             margin-right: 8px;
             padding: 2px;
          }
          .veg-dot {
             width: 8px;
             height: 8px;
             background: #0f8a65;
             border-radius: 50%;
          }
          .rating-badge {
            background: ${secondaryColor};
            color: #fff;
            padding: 2px 8px;
            border-radius: 5px;
            font-size: 12px;
            font-weight: 700;
          }
          .related-meta {
            font-size: 13px;
            color: #888;
            margin: 5px 0;
          }
          .price-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
          }
          .price-tag {
            color: ${primaryColor};
            font-weight: 800;
            font-size: 16px;
          }
          .for-one {
            color: #aaa;
            font-size: 12px;
            font-weight: 400;
          }
          .add-related-btn {
            background: ${primaryColor};
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        `}
      </style>
      {relatedProducts.map((item: any) => (
        <div className="related-card" key={item.id}>
          <div className="related-media">
            <img src={item.image || IMAGES.shop_pic1} alt={item.name} />
          </div>
          <div className="related-info">
            <div className="related-title-row">
              <div className="d-flex align-items-center">
                <div className="veg-icon"><div className="veg-dot"></div></div>
                <h6 className="mb-0" style={{ fontWeight: 700 }}>{item.name}</h6>
              </div>
              <div className="rating-badge">
                <i className="fa-solid fa-star me-1"></i> 4.5
              </div>
            </div>

            <div className="related-meta">
              By <span style={{ color: primaryColor, fontWeight: 600 }}>{cmsConfig?.restaurantName || "Burger Farm"}</span>
              <span className="ms-3"><i className="fa-solid fa-motorcycle me-1"></i> 30 min</span>
            </div>

            <div className="price-row">
              <div>
                <span className="price-tag">{cmsConfig?.config?.currency || '$'} {Number(item.price).toFixed(2)}</span>
                <span className="for-one ms-2">For a one</span>
              </div>
              <button className="add-related-btn" onClick={() => addToCart(item)}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopStyle1RightContent;

