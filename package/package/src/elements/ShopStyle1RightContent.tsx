import { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

const ShopStyle1RightContent = () => {
  const { cmsConfig, addToCart } = useContext(Context);

  const primaryColor =
    cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor ||
    cmsConfig?.config?.primaryColor ||
    "#ff6b35";

  // Get menu items to show as related products
  const menuItems = cmsConfig?.menu?.flatMap((cat: any) =>
    cat.menuItems?.map((item: any) => ({
      ...item,
      categoryName: cat.name,
      restaurantId: cat.restaurantId
    }))
  ).filter((i: any) => i) || [];

  // Show first 6 items as related products
  const relatedProducts = menuItems.slice(0, 6);

  if (relatedProducts.length === 0) {
    return (
      <div className="text-center py-5">
        <h5 className="mb-2">No related products found</h5>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @media (max-width: 576px) {
            .dz-shop-card.style-1 {
              flex-direction: column !important;
              text-align: center !important;
            }
            .dz-shop-card.style-1 .dz-media {
              width: 100% !important;
              height: 200px !important;
            }
            .dz-shop-card.style-1 .dz-content {
              padding: 15px !important;
            }
            .dz-shop-card.style-1 .dz-head {
              justify-content: center !important;
            }
            .dz-shop-card.style-1 .dz-body {
              justify-content: center !important;
              flex-direction: column !important;
              align-items: center !important;
            }
          }
        `}
      </style>
      {relatedProducts.map((item: any) => (
        <div className="dz-shop-card style-1 mb-3" key={item.id} style={{
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          transition: "transform 0.2s",
          display: "flex",
          textAlign: 'left' as any,
          color: '#222'
        }}>
          <div className="dz-media" style={{ width: "140px", height: "140px", flexShrink: 0 }}>
            <img
              src={item.image || IMAGES.shop_pic1}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="dz-content" style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="dz-head" style={{ marginBottom: "10px", display: "flex", justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h6 className="dz-name mb-0" style={{ fontSize: "18px", fontWeight: 700, display: "flex", alignItems: "center", color: '#222' }}>
                <svg
                  className="m-r10"
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="16" height="16" stroke="#0F8A65" />
                  <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65" />
                </svg>
                {item.name}
              </h6>
              <div className="rate" style={{ background: "#FFB800", color: "#fff", padding: "2px 8px", borderRadius: "5px", fontSize: "12px", fontWeight: 700 }}>
                <i className="fa-solid fa-star"></i> 4.8
              </div>
            </div>

            <div className="dz-body" style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", gap: '15px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'left' as any }}>
                <p className="mb-2" style={{ color: "#888", fontSize: "13px" }}>
                  By <span style={{ color: primaryColor, fontWeight: 600 }}>{cmsConfig?.restaurantName || "Saif Kitchen"}</span>
                </p>
                <h5 className="mb-0" style={{ color: primaryColor, fontWeight: 800 }}>{cmsConfig?.config?.currency || '$'} {Number(item.price).toFixed(0)}</h5>
              </div>

              <button
                className="btn btn-primary btn-hover-2"
                style={{ borderRadius: "10px", padding: "8px 20px" }}
                onClick={() => {
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    restaurantId: item.restaurantId
                  });
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopStyle1RightContent;
