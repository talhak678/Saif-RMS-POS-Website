import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

const ShopStyle1RightContent = () => {
  const { cartItems, removeFromCart, updateQuantity, cmsConfig } = useContext(Context);

  const primaryColor =
    cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor ||
    cmsConfig?.config?.primaryColor ||
    "#ff6b35";

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5" style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
        <i className="flaticon-shopping-bag-1" style={{ fontSize: "60px", color: "#eee", display: "block", marginBottom: "15px" }} />
        <h5 className="mb-2">Your selection is empty</h5>
        <p className="text-muted mb-4">Add some delicious items from our menu to get started!</p>
        <Link to="/our-menu-2" className="btn btn-primary" style={{ borderRadius: "10px" }}>Browse Menu</Link>
      </div>
    );
  }

  return (
    <>
      {cartItems.map((item) => (
        <div className="dz-shop-card style-1 mb-3" key={item.id} style={{
          background: "#fff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          transition: "transform 0.2s"
        }}>
          <div className="dz-media" style={{ width: "140px", height: "140px", flexShrink: 0 }}>
            <img
              src={item.image || IMAGES.shop_pic1}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="dz-content" style={{ padding: "20px", flex: 1 }}>
            <div className="dz-head" style={{ marginBottom: "10px" }}>
              <h6 className="dz-name mb-0" style={{ fontSize: "18px", fontWeight: 700 }}>
                {/* 🟢 Veg/Non-Veg indicator (Static for now based on item or default) */}
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

            <div className="dz-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <p className="mb-2" style={{ color: "#888", fontSize: "13px" }}>
                  By <span style={{ color: primaryColor, fontWeight: 600 }}>{cmsConfig?.restaurantName || "Saif Kitchen"}</span>
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <h5 className="mb-0" style={{ color: primaryColor, fontWeight: 800 }}>Rs. {Number(item.price).toFixed(0)}</h5>

                  {/* Quantity Controls */}
                  <div className="btn-quantity style-1" style={{ margin: 0 }}>
                    <div className="input-group bootstrap-touchspin" style={{ width: "100px", height: "34px" }}>
                      <button
                        className="btn btn-default"
                        type="button"
                        style={{ padding: "0 8px" }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <i className="ti-minus"></i>
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="form-control"
                        style={{ height: "34px", padding: 0, textAlign: "center", fontWeight: 700 }}
                      />
                      <button
                        className="btn btn-default"
                        type="button"
                        style={{ padding: "0 8px" }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <i className="ti-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "#fff5f5",
                  color: "#e53e3e",
                  border: "none",
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fed7d7")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff5f5")}
                title="Remove Item"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopStyle1RightContent;
