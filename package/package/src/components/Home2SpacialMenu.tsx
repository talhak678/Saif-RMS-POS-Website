import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Home2SpacialMenu = () => {
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);

  if (cmsLoading) return null;

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";

  // Filter Items based on CMS selection
  const selectedItemIds = cmsConfig?.config?.configJson?.home?.sections?.todaysSpecial?.content?.selectedItemIds || [];
  const selectedCategoryIds = cmsConfig?.config?.configJson?.home?.sections?.todaysSpecial?.content?.selectedCategoryIds || [];
  const allCategories = cmsConfig?.menu || [];
  const allItems = allCategories.flatMap((cat: any) => cat.menuItems.map((item: any) => ({ ...item, categoryId: cat.id, categoryName: cat.name })));

  let displayItems = [];

  if (selectedItemIds.length > 0) {
    displayItems = allItems.filter((item: any) => selectedItemIds.includes(item.id));
  } else if (selectedCategoryIds.length > 0) {
    displayItems = allItems.filter((item: any) => selectedCategoryIds.includes(item.categoryId));
  } else {
    displayItems = allItems.slice(0, 8);
  }

  return (
    <>
      <style>{`
        .special-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          height: 100%;
        }
        .special-card:hover {
          transform: translateY(-10px);
        }
        .special-card-content {
          padding: 20px 20px 10px 20px;
        }
        .special-card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }
        .special-card-tag {
          font-size: 14px;
          color: #888;
          font-weight: 500;
        }
        .special-card-weight {
          font-size: 14px;
          color: #888;
        }
        .special-card-main-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .special-card-title {
          font-size: 18px;
          font-weight: 900;
          color: #111;
          margin: 0;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .special-card-price {
          font-size: 18px;
          font-weight: 900;
          color: ${primaryColor};
          margin-left: 10px;
        }
        .special-card-media {
          padding: 12px;
          height: 230px;
          position: relative;
        }
        .special-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          background: #f0f0f0;
        }
        .special-add-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          width: 55px;
          height: 55px;
          background: ${primaryColor};
          color: #fff;
          border: none;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 22px;
          transition: all 0.3s ease;
          z-index: 2;
          opacity: 0;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .special-card:hover .special-add-btn {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
        .special-add-btn:hover {
          transform: translate(-50%, -50%) scale(1.1);
          filter: brightness(1.1);
        }
      `}</style>
      <Swiper
        className="swiper menu-swiper swiper-visible swiper-item-4"
        slidesPerView={4}
        spaceBetween={20}
        speed={1500}
        loop={displayItems.length > 4}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        pagination={false}
        navigation={{
          prevEl: ".special-button-prev",
          nextEl: ".special-button-next",
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          991: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
        style={{ padding: '20px 0 40px 0', overflow: 'visible' }}
      >
        {displayItems.map((item: any, ind: number) => (
          <SwiperSlide key={item.id || ind}>
            <div className="special-card">
              <div className="special-card-content">
                <div className="special-card-top-row">
                  <span className="special-card-tag">{item.categoryName || "Recommended"}</span>
                  <span className="special-card-weight">756g</span>
                </div>
                <div className="special-card-main-row">
                  <h4 className="special-card-title">{item.name}</h4>
                  <span className="special-card-price">{cmsConfig?.config?.currency || '$'}{item.price}</span>
                </div>
              </div>
              <div className="special-card-media">
                <img src={item.image || "https://via.placeholder.com/360x340"} alt={item.name} />
                <button
                  className="special-add-btn"
                  onClick={() => addToCart(item)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
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
