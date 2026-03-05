import { useContext } from "react";
import { Context } from "../context/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Home2SpacialMenu = ({ items }: { items: any[] }) => {
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);

  if (cmsLoading) return null;

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";
  const currency = cmsConfig?.config?.currency || '$';

  return (
    <>
      <style>{`
        .special-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          height: 100%;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .special-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 45px rgba(0,0,0,0.15);
        }
        .special-card-content {
          padding: 22px 22px 12px 22px;
        }
        .special-card-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .special-card-tag {
          font-size: 11px;
          color: #888;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #f8f8f8;
          padding: 3px 10px;
          border-radius: 6px;
        }
        .special-card-weight {
          font-size: 12px;
          color: #bbb;
        }
        .special-card-main-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }
        .special-card-title {
          font-size: 19px;
          font-weight: 900;
          color: #1a1a1a;
          margin: 0;
          flex: 1;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .special-card-price {
          font-size: 19px;
          font-weight: 900;
          color: ${primaryColor};
          white-space: nowrap;
        }
        .special-card-media {
          padding: 15px;
          height: 250px;
          position: relative;
        }
        .special-card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
          background: #fdfdfd;
          transition: transform 0.6s ease;
        }
        .special-card:hover .special-card-media img {
          transform: scale(1.05);
        }
        .special-add-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -30%);
          width: 60px;
          height: 60px;
          background: ${primaryColor};
          color: #fff;
          border: none;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 24px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
          opacity: 0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.25);
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
        spaceBetween={25}
        speed={1500}
        loop={items.length > 4}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={false}
        navigation={{
          prevEl: ".special-button-prev",
          nextEl: ".special-button-next",
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          991: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          320: { slidesPerView: 1 },
        }}
        style={{ padding: '20px 0 60px 0', overflow: 'visible' }}
      >
        {items.map((item: any, ind: number) => (
          <SwiperSlide key={item.id || ind}>
            <div className="special-card">
              <div className="special-card-content">
                <div className="special-card-top-row">
                  <span className="special-card-tag">{item.categoryName || "Special"}</span>
                  <span className="special-card-weight">{item.variations?.length > 0 ? `${item.variations.length} Sizes` : ''}</span>
                </div>
                <div className="special-card-main-row">
                  <div className="flex-1 min-w-0">
                    <h4 className="special-card-title">{item.name}</h4>
                  </div>
                  <span className="special-card-price">{currency}{Number(item.price).toFixed(2)}</span>
                </div>
              </div>
              <div className="special-card-media">
                <img src={item.image || "https://img.freepik.com/premium-photo/delicious-food-concept-decorated-with-fresh-herbs-creative-packaging_1270831-2525.jpg"} alt={item.name} onError={(e: any) => { e.target.src = "https://img.freepik.com/premium-photo/delicious-food-concept-decorated-with-fresh-herbs-creative-packaging_1270831-2525.jpg" }} />
                <button
                  className="special-add-btn"
                  onClick={() => addToCart(item)}
                  type="button"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {items.length === 0 && (
        <div className="col-12 text-center py-5">
          <p className="text-white opacity-60">Add items to Today's Special in the Dashboard to showcase them here.</p>
        </div>
      )}
    </>
  );
};

export default Home2SpacialMenu;
