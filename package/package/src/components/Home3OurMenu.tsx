import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";

const Home3OurMenu = () => {
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);
  const [addActive, setAddActive] = useState<number>(0);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  // Category Filtering logic
  const selectedCategoryIds = cmsConfig?.config?.configJson?.home?.sections?.ourMenu?.content?.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  const categories = selectedCategoryIds.length > 0
    ? allAvailableCategories.filter((cat: any) => selectedCategoryIds.includes(cat.id))
    : allAvailableCategories;

  const allItems = categories.flatMap((cat: any) =>
    cat.menuItems?.map((item: any) => ({ ...item, categoryName: cat.name, restaurantId: cat.restaurantId })) || []
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
                  className={`btn ${addActive === ind + 1 ? "active" : ""}`}
                  onClick={() => filterButton(cat.name, ind + 1)}
                >
                  <Link to="#">
                    <span>
                      {cat.image ? (
                        <img src={cat.image} alt="" style={{ width: "20px", height: "20px", marginBottom: '5px' }} />
                      ) : (
                        <i className="flaticon-pizza-slice"></i>
                      )}
                    </span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-12 text-lg-end d-lg-block d-none wow fadeInUp">
          <Link to="/our-menu-2" className="btn btn-outline-primary btn-hover-3">
            <span className="btn-text" data-text="View All">View All</span>
          </Link>
        </div>
      </div>

      <div className="clearfix">
        <ul id="masonry" className="row dlab-gallery-listing gallery">
          {filteredItems.map((item, ind) => (
            <li
              className="card-container col-lg-4 col-md-6 m-b30 wow fadeInUp"
              key={item.id || ind}
            >
              <div className="dz-img-box style-7">
                <div className="dz-media">
                  <img src={item.image || "https://via.placeholder.com/400x300"} alt="/" />
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
                  <p>
                    {item.description || "Freshly prepared with the finest ingredients from our kitchen."}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="price">{cmsConfig?.config?.currency || '$'} {Number(item.price).toFixed(0)}</span>
                    <button
                      className="btn btn-primary btn-sm btn-hover-2"
                      style={{ borderRadius: '10px' }}
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
            </li>
          ))}
        </ul>
        {filteredItems.length === 0 && (
          <div className="col-12 text-center py-5">
            <h5>No items found.</h5>
          </div>
        )}
      </div>
    </>
  );
};

export default Home3OurMenu;
