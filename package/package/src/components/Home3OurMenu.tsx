import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";

const Home3OurMenu = () => {
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);
  const [addActive, setAddActive] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  const primaryColor =
    cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor ||
    cmsConfig?.config?.primaryColor ||
    "#7da640";

  // Filter categories based on CMS selection
  const selectedCategoryIds =
    cmsConfig?.config?.configJson?.home?.sections?.ourMenu?.content?.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  const categories =
    selectedCategoryIds.length > 0
      ? allAvailableCategories.filter((cat: any) => selectedCategoryIds.includes(cat.id))
      : allAvailableCategories;

  const allItems = categories.flatMap((cat: any) =>
    cat.menuItems.map((item: any) => ({ ...item, categoryName: cat.name }))
  );

  useEffect(() => {
    if (!cmsLoading && categories.length > 0) {
      setFilteredItems(allItems);
    }
  }, [cmsLoading, cmsConfig]);

  const filterButton = (categoryName: string, ind: number) => {
    setAddActive(ind);
    if (categoryName === "All") {
      setFilteredItems(allItems);
    } else {
      setFilteredItems(allItems.filter((item: any) => item.categoryName === categoryName));
    }
  };

  if (cmsLoading) return null;

  return (
    <>
      {/* ── Filter Bar ── */}
      <div className="row align-items-center mb-4">
        <div className="col-xl-10 col-lg-9 col-md-12 wow fadeInUp">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              padding: "6px 0",
            }}
          >
            {/* ALL button */}
            <button
              onClick={() => filterButton("All", 0)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 20px",
                borderRadius: "50px",
                border: `2px solid ${addActive === 0 ? primaryColor : "#e0e0e0"}`,
                background: addActive === 0 ? primaryColor : "#ffffff",
                color: addActive === 0 ? "#ffffff" : "#555",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                boxShadow: addActive === 0 ? `0 4px 14px ${primaryColor}55` : "none",
              }}
            >
              <i className="flaticon-fast-food" style={{ fontSize: "14px" }} />
              All Items
            </button>

            {/* Category buttons */}
            {categories.map((cat: any, ind: number) => (
              <button
                key={cat.id}
                onClick={() => filterButton(cat.name, ind + 1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 20px",
                  borderRadius: "50px",
                  border: `2px solid ${addActive === ind + 1 ? primaryColor : "#e0e0e0"}`,
                  background: addActive === ind + 1 ? primaryColor : "#ffffff",
                  color: addActive === ind + 1 ? "#ffffff" : "#555",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: addActive === ind + 1 ? `0 4px 14px ${primaryColor}55` : "none",
                }}
              >
                <i className="flaticon-pizza-slice" style={{ fontSize: "14px" }} />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="col-xl-2 col-lg-3 col-md-12 text-lg-end d-lg-block d-none wow fadeInUp">
          <Link
            to="/our-menu-2"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "50px",
              border: `2px solid ${primaryColor}`,
              color: primaryColor,
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "none",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = primaryColor;
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = primaryColor;
            }}
          >
            View All <i className="fa fa-arrow-right" style={{ fontSize: "12px" }} />
          </Link>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className="row g-4">
        {filteredItems.map((item, ind) => (
          <div
            className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
            key={item.id || ind}
            data-wow-delay={`${ind * 0.08}s`}
          >
            <div
              style={{
                borderRadius: "18px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                position: "relative",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.14)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                <img
                  src={item.image || "https://via.placeholder.com/400x300"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, ${primaryColor}bb 0%, transparent 60%)`,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                  className="card-overlay"
                />
                {/* Category pill */}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: `${primaryColor}ee`,
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "50px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.categoryName}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding: "18px 20px 20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <h5
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#222",
                      lineHeight: 1.3,
                      flex: 1,
                      paddingRight: "10px",
                    }}
                  >
                    <Link
                      to="/product-detail"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = primaryColor)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color = "#222")
                      }
                    >
                      {item.name}
                    </Link>
                  </h5>
                  {/* Price pill */}
                  <span
                    style={{
                      background: `${primaryColor}18`,
                      color: primaryColor,
                      fontWeight: 800,
                      fontSize: "15px",
                      padding: "4px 12px",
                      borderRadius: "50px",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Rs. {parseFloat(item.price).toFixed(0)}
                  </span>
                </div>

                <p
                  style={{
                    margin: "0 0 14px",
                    fontSize: "13px",
                    color: "#888",
                    lineHeight: 1.6,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.description || "Freshly prepared with the finest ingredients."}
                </p>

                {/* Divider + Action */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: "12px",
                  }}
                >
                  <Link
                    to="/our-menu-2"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: primaryColor,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    View Details <i className="fa fa-arrow-right" style={{ fontSize: "11px" }} />
                  </Link>
                  <button
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: parseFloat(item.price),
                        image: item.image,
                        restaurantId: item.restaurantId
                      });
                    }}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      background: primaryColor,
                      color: "#fff",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      boxShadow: `0 4px 12px ${primaryColor}55`,
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                    title="Add to cart"
                  >
                    <i className="flaticon-shopping-cart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-12 text-center py-5" style={{ color: "#aaa", fontSize: "15px" }}>
            <i className="flaticon-fast-food" style={{ fontSize: "40px", marginBottom: "12px", display: "block", color: primaryColor }} />
            No items found. Please select categories in Dashboard.
          </div>
        )}
      </div>

      {/* Mobile View All button */}
      <div className="text-center d-lg-none mt-4">
        <Link
          to="/our-menu-2"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 28px",
            borderRadius: "50px",
            background: primaryColor,
            color: "#fff",
            fontWeight: 600,
            fontSize: "14px",
            textDecoration: "none",
            boxShadow: `0 6px 20px ${primaryColor}55`,
          }}
        >
          View All Menu <i className="fa fa-arrow-right" />
        </Link>
      </div>

      <style>{`
        .card-overlay { opacity: 0; transition: opacity 0.3s ease; }
        .col-lg-4:hover .card-overlay { opacity: 1; }
      `}</style>
    </>
  );
};

export default Home3OurMenu;
