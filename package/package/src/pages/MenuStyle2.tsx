import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      const search = params.get("search");

      if (search) {
        // Filter by search query across name, description and category
        const query = search.toLowerCase();
        const searched = allItems.filter((item: any) =>
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          item.categoryName.toLowerCase().includes(query)
        );
        setActive(0); // Reset tabs to ALL when searching
        setFilteredItems(searched);
      } else if (category) {
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
                  // Clear search when clicking category tabs
                  if (location.search.includes("search=")) {
                    navigate("/our-menu-2");
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 22px",
                  borderRadius: "50px",
                  border: `2px solid ${active === ind ? primaryColor : "#e0e0e0"}`,
                  background: active === ind ? primaryColor : "#fff",
                  color: active === ind ? "#fff" : "#666",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: active === ind ? `0 6px 18px ${primaryColor}44` : "none",
                  letterSpacing: "0.3px",
                }}
              >
                <i className={icon} style={{ fontSize: "15px" }} />
                {title}
              </button>
            ))}
          </div>

          {/* Search indicator */}
          {new URLSearchParams(location.search).get("search") && (
            <div className="mb-4 d-flex align-items-center justify-content-between" style={{ padding: '0 10px' }}>
              <h5 className="mb-0">
                Search results for: <span style={{ color: primaryColor }}>"{new URLSearchParams(location.search).get("search")}"</span>
              </h5>
              <button
                className="btn btn-link btn-sm text-muted p-0"
                onClick={() => navigate("/our-menu-2")}
                style={{ textDecoration: 'none' }}
              >
                Clear Search ×
              </button>
            </div>
          )}

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
                      {item.name}
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
                        justifyContent: "flex-end",
                        borderTop: "1px solid #f2f2f2",
                        paddingTop: "13px",
                        marginTop: "10px",
                      }}
                    >
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
                  {new URLSearchParams(location.search).get("search")
                    ? `No matching items found for "${new URLSearchParams(location.search).get("search")}"`
                    : "No items found in this category."}
                </p>
                <button
                  onClick={() => {
                    navigate("/our-menu-2");
                    window.scrollTo(0, 0);
                  }}
                  className="btn btn-primary btn-sm mt-3"
                  style={{ borderRadius: "10px" }}
                >
                  View All Menu
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuStyle2;
