import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";

const Home3OurMenu = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);
  const [addActive, setAddActive] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  // Filter categories based on CMS selection
  const selectedCategoryIds = cmsConfig?.config?.configJson?.home?.sections?.ourMenu?.content?.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  // If nothing is selected, show all by default or show none (User prefers control)
  const categories = selectedCategoryIds.length > 0
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
      const updateItems = allItems.filter((item: any) => item.categoryName === categoryName);
      setFilteredItems(updateItems);
    }
  };

  if (cmsLoading) return null;

  return (
    <>
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-12 wow fadeInUp">
          <div className="site-filters style-1 clearfix">
            <ul className="filters">
              <li
                className={`btn ${addActive === 0 ? "active" : ""}`}
                onClick={() => filterButton("All", 0)}
              >
                <Link to="#">
                  <span><i className="flaticon-fast-food"></i></span>
                  All
                </Link>
              </li>
              {categories.map((cat: any, ind: number) => (
                <li
                  key={cat.id}
                  onClick={() => filterButton(cat.name, ind + 1)}
                  className={`btn ${addActive === ind + 1 ? "active" : ""}`}
                >
                  <Link to="#">
                    <span><i className="flaticon-pizza-slice"></i></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-12 text-lg-end d-lg-block d-none wow fadeInUp">
          <Link to="/our-menu-1" className="btn btn-outline-primary btn-hover-3">
            <span className="btn-text" data-text="View All">View All</span>
          </Link>
        </div>
      </div>
      <div className="clearfix">
        <ul id="masonry" className="row dlab-gallery-listing gallery">
          {filteredItems.map((item, ind) => (
            <li className="card-container col-lg-4 col-md-6 m-b30 wow fadeInUp" key={item.id || ind}>
              <div className="dz-img-box style-7">
                <div className="dz-media">
                  <img src={item.image || "https://via.placeholder.com/400x300"} alt={item.name} />
                  <div className="dz-meta">
                    <ul>
                      <li className="seller">Top Seller</li>
                      <li className="rating">
                        <i className="fa-solid fa-star"></i> 4.5
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="dz-content">
                  <h5 className="title">
                    <Link to="/product-detail">{item.name}</Link>
                  </h5>
                  <p>{item.description || "Delicious food prepared with fresh ingredients."}</p>
                  <span className="price">Rs. {parseFloat(item.price).toFixed(2)}</span>
                </div>
              </div>
            </li>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-12 text-center py-5 text-muted">No items found. Please select categories in Dashboard.</div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Home3OurMenu;
