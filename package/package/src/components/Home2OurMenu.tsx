import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../context/AppContext";

interface PropFile {
  prev: string;
  next: string;
}
const Home2OurMenu = ({ prev, next }: PropFile) => {
  const [active, setActive] = useState<number>();
  const { cmsConfig, cmsLoading } = useContext(Context);

  if (cmsLoading) return null;

  // Filter based on CMS selection
  const selectedCategoryIds = cmsConfig?.config?.configJson?.home?.sections?.browseMenu?.content?.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  const categories = selectedCategoryIds.length > 0
    ? allAvailableCategories.filter((cat: any) => selectedCategoryIds.includes(cat.id))
    : allAvailableCategories.slice(0, 6); // Default 6 if none selected

  return (
    <div className="container">
      <Swiper
        className="swiper menu-swiper swiper-visible swiper-item-4"
        slidesPerView={4}
        spaceBetween={30}
        speed={1500}
        loop={categories.length > 4}
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 1500 }}
        navigation={{
          prevEl: `.${prev}`,
          nextEl: `.${next}`,
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          991: { slidesPerView: 3 },
          575: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
      >
        {categories.map((cat: any, ind: number) => (
          <SwiperSlide className="swiper-slide" key={cat.id || ind}>
            <div
              className={`dz-img-box style-4 box-hover ${active == ind ? "active" : ""
                }`}
              onMouseEnter={() => {
                setActive(ind);
              }}
            >
              <div className="menu-detail">
                <div className="dz-media">
                  <img src={cat.menuItems[0]?.image || "https://via.placeholder.com/200"} alt={cat.name} />
                </div>
                <div className="dz-content">
                  <h6 className="title">
                    <Link to="/our-menu-1">{cat.name}</Link>
                  </h6>
                  <p>{cat.description || "Fresh Categories"}</p>
                </div>
              </div>
              <div className="menu-footer">
                <span>Items Available</span>
                <span className="price">{cat.menuItems?.length || 0}</span>
              </div>
              <Link className="detail-btn" to="/our-menu-1">
                <i className="fa-solid fa-plus"></i>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {categories.length === 0 && (
        <div className="text-center py-5 text-muted">No categories selected in Dashboard.</div>
      )}
    </div>
  );
};

export default Home2OurMenu;
