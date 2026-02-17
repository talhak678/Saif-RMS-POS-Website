import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const Home2SpacialMenu = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  if (cmsLoading) return null;

  // Filter Items based on CMS selection
  const selectedItemIds = cmsConfig?.config?.configJson?.home?.sections?.todaysSpecial?.content?.selectedItemIds || [];
  const allCategories = cmsConfig?.menu || [];
  const allItems = allCategories.flatMap((cat: any) => cat.menuItems);

  const displayItems = selectedItemIds.length > 0
    ? allItems.filter((item: any) => selectedItemIds.includes(item.id))
    : allItems.slice(0, 4); // Default 4 if none selected

  return (
    <div className="row">
      {displayItems.map((item: any, ind: number) => (
        <div className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp" key={item.id || ind}>
          <div className="dz-img-box style-5">
            <div className="dz-content" style={{ padding: '15px' }}>
              <div className="weight">
                <span className="text-muted text-xs">Recommended</span>
              </div>
              <div className="price">
                <h6 style={{ fontSize: '16px', marginBottom: '5px' }}>{item.name}</h6>
                <h6 className="text-primary">Rs. {item.price}</h6>
              </div>
            </div>
            <div className="dz-media" style={{ height: '180px' }}>
              <img src={item.image || "https://via.placeholder.com/200"} alt="/" style={{ height: '100%', objectCover: 'cover' }} />
              <Link className="detail-btn" to="/our-menu-1">
                <i className="fa-solid fa-plus"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
      {displayItems.length === 0 && (
        <div className="col-12 text-center py-5 text-white/60">No special items selected in Dashboard.</div>
      )}
    </div>
  );
};

export default Home2SpacialMenu;
