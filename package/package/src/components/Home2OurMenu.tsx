import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

interface PropFile {
  prev: string;
  next: string;
}
const Home2OurMenu = ({ prev, next }: PropFile) => {
  const { cmsConfig, cmsLoading, addToCart } = useContext(Context);

  if (cmsLoading) return null;

  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35";

  // Filter based on CMS selection
  const selectedCategoryIds = cmsConfig?.config?.configJson?.home?.sections?.browseMenu?.content?.selectedCategoryIds || [];
  const allAvailableCategories = cmsConfig?.menu || [];

  const categories = selectedCategoryIds.length > 0
    ? allAvailableCategories.filter((cat: any) => selectedCategoryIds.includes(cat.id))
    : allAvailableCategories.slice(0, 8); // Default 8 if none selected

  // Flatten items for the scroller to show products in the card format like the theme image
  const items = categories.flatMap((cat: any) =>
    cat.menuItems.map((item: any) => ({ ...item, categoryName: cat.name }))
  ).slice(0, 10);

  return (
    <div className="container px-0">
      <style>{`
        .browse-menu-card {
           background: #fff;
           border-radius: 12px;
           padding: 15px;
           display: flex;
           align-items: center;
           position: relative;
           box-shadow: 0 10px 30px rgba(0,0,0,0.03);
           transition: all 0.3s ease;
           margin: 10px 5px;
           overflow: hidden;
           border: 1px solid #f8f8f8;
           min-height: 140px;
           height: 140px;
        }
        .browse-menu-card:hover {
           transform: translateY(-5px);
           box-shadow: 0 15px 35px rgba(0,0,0,0.06);
        }
        .browse-media {
           width: 80px;
           height: 80px;
           border-radius: 8px;
           overflow: hidden;
           flex-shrink: 0;
           background: #eee;
        }
        .browse-media img {
           width: 100%;
           height: 100%;
           object-fit: cover;
        }
        .browse-content {
           padding-left: 15px;
           flex: 1;
           display: flex;
           flex-direction: column;
           justify-content: center;
        }
        .browse-title {
           font-size: 16px;
           font-weight: 700;
           color: #222;
           margin-bottom: 2px;
           line-height: 1.2;
        }
        .browse-subtitle {
           font-size: 12px;
           color: #888;
           margin-bottom: 8px;
           display: block;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
        }
        .browse-price-label {
           font-size: 10px;
           color: #aaa;
           display: block;
           text-transform: uppercase;
           letter-spacing: 0.5px;
           margin-bottom: 0;
        }
        .browse-price {
           font-size: 18px;
           font-weight: 800;
           color: ${primaryColor};
        }
        .browse-add-btn {
           position: absolute;
           bottom: 0px;
           right: 0px;
           width: 45px;
           height: 45px;
           background: ${primaryColor};
           color: #fff;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 12px 0 0 0;
           cursor: pointer;
           transition: all 0.2s;
           border: none;
        }
        .browse-add-btn:hover {
           opacity: 0.9;
        }
        .browse-add-btn i {
           font-size: 16px;
        }
      `}</style>
      <Swiper
        className="swiper browse-menu-swiper py-4"
        slidesPerView={4}
        spaceBetween={20}
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
          768: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
      >
        {items.map((item: any, ind: number) => (
          <SwiperSlide key={item.id || ind}>
            <div className="browse-menu-card">
              <div className="browse-media">
                <img src={item.image || IMAGES.shop_pic1} alt={item.name} />
              </div>
              <div className="browse-content">
                <h6 className="browse-title">{item.name}</h6>
                <span className="browse-subtitle">{item.description || "Delicious and Spicy"}</span>
                <span className="browse-price-label">Regular Price</span>
                <span className="browse-price">{cmsConfig?.config?.currency || '$'} {Number(item.price).toFixed(2)}</span>
              </div>
              <button className="browse-add-btn" onClick={() => addToCart(item)}>
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
