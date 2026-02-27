import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Home2SpacialMenu = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  if (cmsLoading) return null;

  // Filter Items based on CMS selection
  const selectedItemIds = cmsConfig?.config?.configJson?.home?.sections?.todaysSpecial?.content?.selectedItemIds || [];
  const selectedCategoryIds = cmsConfig?.config?.configJson?.home?.sections?.todaysSpecial?.content?.selectedCategoryIds || [];
  const allCategories = cmsConfig?.menu || [];
  const allItems = allCategories.flatMap((cat: any) => cat.menuItems.map((item: any) => ({ ...item, categoryId: cat.id })));

  let displayItems = [];

  if (selectedItemIds.length > 0) {
    displayItems = allItems.filter((item: any) => selectedItemIds.includes(item.id));
  } else if (selectedCategoryIds.length > 0) {
    displayItems = allItems.filter((item: any) => selectedCategoryIds.includes(item.categoryId));
  } else {
    displayItems = allItems.slice(0, 8); // Showing up to 8 by default if scrolling is enabled
  }

  return (
    <>
      <Swiper
        className="swiper menu-swiper swiper-visible swiper-item-4"
        slidesPerView={4}
        spaceBetween={20}
        speed={1500}
        loop={displayItems.length > 4}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          prevEl: ".special-button-prev",
          nextEl: ".special-button-next",
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          991: { slidesPerView: 3 },
          575: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
        style={{ paddingBottom: '40px' }}
      >
        {displayItems.map((item: any, ind: number) => (
          <SwiperSlide key={item.id || ind}>
            <div className="dz-img-box style-5" style={{ margin: '0' }}>
              <div className="dz-content" style={{ padding: '15px' }}>
                <div className="weight">
                  <span className="text-muted text-xs">Recommended</span>
                </div>
                <div className="price">
                  <h6 style={{ fontSize: '16px', marginBottom: '5px' }}>{item.name}</h6>
                  <h6 className="text-primary">$ {item.price}</h6>
                </div>
              </div>
              <div className="dz-media" style={{ height: '180px' }}>
                <img src={item.image || "https://via.placeholder.com/200"} alt="/" style={{ height: '100%', objectFit: 'cover' }} />
                <Link className="detail-btn" to="/our-menu-2">
                  <i className="fa-solid fa-plus"></i>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {displayItems.length === 0 && (
        <div className="col-12 text-center py-5 text-white/60">No special items selected in Dashboard.</div>
      )}
    </>
  );
};

export default Home2SpacialMenu;
