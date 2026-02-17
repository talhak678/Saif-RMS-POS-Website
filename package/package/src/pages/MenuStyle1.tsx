import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const MenuStyle1 = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  if (cmsLoading) return <div className="text-center py-5">Loading...</div>;

  const sections = cmsConfig?.config?.configJson?.menu?.sections || {};
  const galleryConfig = sections.menuGallery?.content || {};
  const selectedCategoryIds = galleryConfig.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  // Filter categories based on CMS selection, or show all if none selected
  const categories = selectedCategoryIds.length > 0
    ? allAvailableCategories.filter((cat: any) => selectedCategoryIds.includes(cat.id))
    : allAvailableCategories;

  return (
    <div className="page-content bg-white" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
      {sections.banner?.enabled !== false && (
        <CommonBanner
          img={sections.banner?.content?.imageUrl || IMAGES.banner_bnr1}
          title={sections.banner?.content?.title || "Our Menu"}
          subtitle={sections.banner?.content?.breadcrumb || "Delicious Selection"}
        />
      )}
      <section className="content-inner section-wrapper-7 overflow-hidden">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title">{galleryConfig.title || "Menu Gallery"}</h2>
            {galleryConfig.description && <p className="mt-2 text-muted">{galleryConfig.description}</p>}
          </div>
          <div className="row inner-section-wrapper">
            {categories.map((cat: any, ind: number) => (
              <div className="col-xl-4 col-lg-6 col-md-6 mb-5" key={cat.id || ind}>
                <div className="menu-head">
                  <h4 className="title text-primary">{cat.name}</h4>
                </div>
                {cat.menuItems?.map((item: any, index: number) => (
                  <div
                    className="dz-shop-card style-2 m-b30 p-0 shadow-none"
                    key={item.id || index}
                  >
                    <div className="dz-content">
                      <div className="dz-head">
                        <span className="header-text">
                          <Link to="/product-detail">{item.name}</Link>
                        </span>
                        <span className="img-line"></span>
                        <span className="header-price">Rs. {item.price}</span>
                      </div>
                      <p className="dz-body">
                        {item.description || "Freshly prepared with quality ingredients."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {categories.length === 0 && (
              <div className="col-12 text-center py-5 text-muted">No categories or items selected for display.</div>
            )}
          </div>
        </div>
        <img
          className="bg1 dz-move-down"
          src={IMAGES.background_pic12}
          alt="/"
        />
        <img
          className="bg2 dz-move-down"
          src={IMAGES.background_pic14}
          alt="/"
        />
      </section>
    </div>
  );
};

export default MenuStyle1;
