import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

interface PropFile {
  prev: string;
  next: string;
}

const Home2OurMenu = ({ prev, next }: PropFile) => {
  const [active, setActive] = useState<number>();
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);

  if (cmsLoading) return null;

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#1a73e8";
  const secondaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.secondaryColor || "#1a73e8";

  // Filter based on CMS selection
  const selectedCategoryIds = cmsConfig?.config?.configJson?.home?.sections?.browseMenu?.content?.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  const categories = selectedCategoryIds.length > 0
    ? allAvailableCategories.filter((cat: any) => selectedCategoryIds.includes(cat.id))
    : allAvailableCategories.slice(0, 8);

  const items = categories.flatMap((cat: any) =>
    cat.menuItems.map((item: any) => ({ ...item, categoryName: cat.name }))
  ).slice(0, 10);

  return (
    <div className="container" style={{ overflow: "visible" }}>
      <style>{`
        .dz-img-box.style-4 {
          background: #fff;
          border-radius: 16px;
          padding: 10px 14px;
          position: relative;
          box-shadow: 0 4px 15px rgba(0,0,0,0.06);
          transition: all 0.3s ease;
          border: 1px solid #efefef;
          overflow: hidden;
          height: 100%;
          box-sizing: border-box;
        }
        .dz-img-box.style-4:hover,
        .dz-img-box.style-4.active {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.13);
          border-color: ${primaryColor} !important;
          background-color: ${primaryColor} !important;
        }
        .dz-img-box.style-4:hover .dz-content .title,
        .dz-img-box.style-4:hover .dz-content .title a,
        .dz-img-box.style-4:hover .dz-content p,
        .dz-img-box.style-4:hover .menu-footer span,
        .dz-img-box.style-4:hover .menu-footer .price,
        .dz-img-box.style-4.active .dz-content .title,
        .dz-img-box.style-4.active .dz-content .title a,
        .dz-img-box.style-4.active .dz-content p,
        .dz-img-box.style-4.active .menu-footer span,
        .dz-img-box.style-4.active .menu-footer .price {
          color: #ffffff !important;
        }
        .dz-img-box.style-4 .menu-detail {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .dz-img-box.style-4 .dz-media {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          background: #f5f5f5;
        }
        .dz-img-box.style-4 .dz-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .dz-img-box.style-4:hover .dz-media img,
        .dz-img-box.style-4.active .dz-media img {
          transform: scale(1.08);
        }
        .dz-img-box.style-4 .dz-content .title {
          font-size: 17px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 0 0 3px 0;
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        .dz-img-box.style-4 .dz-content .title a {
          color: inherit;
          text-decoration: none;
        }
        .dz-img-box.style-4 .dz-content p {
          font-size: 12px;
          color: #888;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        .dz-img-box.style-4 .menu-footer {
          display: flex;
          flex-direction: column;
          padding-right: 55px;
        }
        .dz-img-box.style-4 .menu-footer span:first-child {
          font-size: 11px;
          color: #aaa;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .dz-img-box.style-4 .menu-footer .price {
          font-size: 20px;
          font-weight: 800;
          color: ${secondaryColor};
          transition: color 0.3s ease;
        }
        .dz-img-box.style-4 .detail-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 50px;
          height: 50px;
          background: ${primaryColor};
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px 0 0 0;
          cursor: pointer;
          transition: all 0.25s ease;
          border: none;
          text-decoration: none;
          font-size: 16px;
          z-index: 2;
        }
        .dz-img-box.style-4:hover .detail-btn,
        .dz-img-box.style-4.active .detail-btn {
          background-color: #ffffff !important;
          color: ${primaryColor} !important;
        }
        .dz-img-box.style-4 .detail-btn:hover {
          filter: brightness(1.1);
        }
        .menu-swiper {
          width: 100%;
          overflow: visible !important;
        }
        .menu-swiper .swiper-wrapper {
          flex-wrap: nowrap !important;
        }
        .menu-swiper .swiper-slide {
          height: auto;
          flex-shrink: 0;
        }
      `}</style>
      <Swiper
        className="swiper menu-swiper swiper-visible swiper-item-4"
        slidesPerView={4}
        spaceBetween={30}
        speed={1500}
        loop={items.length > 4}
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 3000 }}
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
        {items.map((item: any, ind: number) => (
          <SwiperSlide className="swiper-slide" key={item.id || ind}>
            <div
              className={`dz-img-box style-4 box-hover ${active === ind ? "active" : ""}`}
              onMouseEnter={() => setActive(ind)}
              onMouseLeave={() => setActive(undefined)}
            >
              <div className="menu-detail">
                <div className="dz-media">
                  <img src={item.image || IMAGES.shop_pic1} alt={item.name} />
                </div>
                <div className="dz-content">
                  <h6 className="title">
                    <Link to={`/shop-product-details/${item.id}`}>{item.name}</Link>
                  </h6>
                  <p>{item.description || "Delicious and Spicy"}</p>
                </div>
              </div>
              <div className="menu-footer">
                <span>Regular Price</span>
                <span className="price">{cmsConfig?.config?.currency || '$'}{Number(item.price).toFixed(2)}</span>
              </div>
              <button className="detail-btn" onClick={() => addToCart(item)}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {items.length === 0 && (
        <div className="text-center py-5 text-muted">No items available to display.</div>
      )}
    </div>
  );
};

export default Home2OurMenu;

