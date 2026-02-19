import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { useRef, useState, useContext, useEffect } from "react";
import { Context } from "../context/AppContext";

const MenuStyle2 = () => {
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);
  const [active, setActive] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const cardRef = useRef<HTMLDivElement[]>([]);
  const location = useLocation();

  const primaryColor =
    cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor ||
    cmsConfig?.config?.primaryColor ||
    "#7da640";

  const sections = cmsConfig?.config?.configJson?.menu?.sections || {};
  const galleryConfig = sections.menuGallery?.content || {};
  const selectedCategoryIds = galleryConfig.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  const categories =
    selectedCategoryIds.length > 0
      ? allAvailableCategories.filter((cat: any) => selectedCategoryIds.includes(cat.id))
      : allAvailableCategories;

  const allItems = categories.flatMap((cat: any) =>
    cat.menuItems.map((item: any) => ({ ...item, categoryName: cat.name }))
  );

  const buttons = [
    { icon: "flaticon-fast-food", title: "ALL" },
    ...categories.map((cat: any) => ({
      icon: "flaticon-pizza-slice",
      title: cat.name,
    })),
  ];

  useEffect(() => {
    if (!cmsLoading) {
      const params = new URLSearchParams(location.search);
      const category = params.get("category");
      if (category) {
        const index = buttons.findIndex(
          (btn) => btn.title.toLowerCase() === category.toLowerCase()
        );
        if (index !== -1) {
          setActive(index);
          filterGallery(index === 0 ? "ALL" : categories[index - 1]?.name);
        } else {
          setFilteredItems(allItems);
        }
      } else {
        setActive(0);
        setFilteredItems(allItems);
      }
    }
  }, [cmsLoading, location.search, cmsConfig]);

  const filterGallery = (name: string) => {
    // Fade out
    cardRef.current.forEach((el) => {
      if (el) { el.style.opacity = "0"; el.style.transform = "translateY(12px) scale(0.97)"; }
    });

    setTimeout(() => {
      const updated =
        name === "ALL"
          ? allItems
          : allItems.filter((item: any) => item.categoryName === name);
      setFilteredItems(updated);

      setTimeout(() => {
        cardRef.current.forEach((el) => {
          if (el) { el.style.opacity = "1"; el.style.transform = "translateY(0) scale(1)"; }
        });
      }, 60);
    }, 180);
  };

  if (cmsLoading)
    return (
      <div className="text-center py-5" style={{ color: primaryColor, fontSize: "16px" }}>
        <i className="flaticon-fast-food" style={{ fontSize: "36px", display: "block", marginBottom: "12px" }} />
        Loading menu...
      </div>
    );

  return (
    <div className="page-content bg-white">
      {/* Banner */}
      {sections.banner?.enabled !== false && (
        <CommonBanner
          img={sections.banner?.content?.imageUrl || IMAGES.banner_bnr1}
          title={sections.banner?.content?.title || "Our Menu"}
          subtitle={sections.banner?.content?.breadcrumb || "Delicious Selection"}
        />
      )}

      <section className="content-inner" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div className="container">

          {/* ── Filter Tabs ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "50px",
            }}
          >
            {buttons.map(({ icon, title }, ind) => (
              <button
                key={ind}
                onClick={() => {
                  setActive(ind);
                  filterGallery(ind === 0 ? "ALL" : categories[ind - 1]?.name);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "10px 22px",
                  borderRadius: "50px",
                  border: `2px solid ${active === ind ? primaryColor : "#e0e0e0"}`,
                  background: active === ind ? primaryColor : "#ffffff",
                  color: active === ind ? "#ffffff" : "#666",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: active === ind ? `0 6px 18px ${primaryColor}44` : "none",
                  letterSpacing: "0.3px",
                }}
                onMouseEnter={(e) => {
                  if (active !== ind) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = primaryColor;
                    (e.currentTarget as HTMLButtonElement).style.color = primaryColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== ind) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#e0e0e0";
                    (e.currentTarget as HTMLButtonElement).style.color = "#666";
                  }
                }}
              >
                <i className={icon} style={{ fontSize: "15px" }} />
                {title}
              </button>
            ))}
          </div>

          {/* ── Cards Grid ── */}
          <div className="row g-4">
            {filteredItems.map((item, ind) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12"
                key={item.id || ind}
                style={{ transition: "opacity 0.25s ease, transform 0.25s ease" }}
              >
                <div
                  ref={(node) => { if (node) cardRef.current[ind] = node; }}
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                    background: "#fff",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    opacity: 1,
                    transform: "translateY(0) scale(1)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-7px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 44px rgba(0,0,0,0.13)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "230px", overflow: "hidden", flexShrink: 0 }}>
                    <img
                      src={item.image || "https://via.placeholder.com/800x650"}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.45s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                      }}
                    />

                    {/* Bottom gradient */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "80px",
                        background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Category badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: "13px",
                        left: "13px",
                        background: `${primaryColor}ee`,
                        color: "#fff",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: "50px",
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {item.categoryName}
                    </span>

                    {/* Price badge */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        right: "13px",
                        background: primaryColor,
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: 800,
                        padding: "5px 14px",
                        borderRadius: "50px",
                        boxShadow: `0 3px 12px ${primaryColor}66`,
                      }}
                    >
                      Rs. {parseFloat(item.price).toFixed(0)}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h5
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        margin: "0 0 8px",
                        lineHeight: 1.35,
                      }}
                    >
                      <Link
                        to="/product-detail"
                        style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = primaryColor)}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#1a1a1a")}
                      >
                        {item.name}
                      </Link>
                    </h5>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#999",
                        lineHeight: 1.6,
                        margin: "0 0 auto",
                        paddingBottom: "14px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.description || "Freshly prepared with the finest ingredients."}
                    </p>

                    {/* Footer actions */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid #f2f2f2",
                        paddingTop: "13px",
                        marginTop: "4px",
                      }}
                    >
                      <Link
                        to="/product-detail"
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: primaryColor,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          transition: "gap 0.2s",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "8px")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.gap = "5px")}
                      >
                        View Details <i className="fa fa-arrow-right" style={{ fontSize: "11px" }} />
                      </Link>

                      <button
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: primaryColor,
                          color: "#fff",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "15px",
                          border: "none",
                          cursor: "pointer",
                          flexShrink: 0,
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                          boxShadow: `0 4px 14px ${primaryColor}55`,
                        }}
                        onClick={() => addToCart({
                          id: item.id,
                          name: item.name,
                          price: parseFloat(item.price),
                          image: item.image || null,
                          quantity: 1
                        })}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15) rotate(-8deg)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) rotate(0)";
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
              <div className="col-12 text-center py-5">
                <i
                  className="flaticon-fast-food"
                  style={{ fontSize: "48px", display: "block", marginBottom: "14px", color: `${primaryColor}88` }}
                />
                <p style={{ color: "#aaa", fontSize: "15px" }}>
                  No items found for this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuStyle2;
