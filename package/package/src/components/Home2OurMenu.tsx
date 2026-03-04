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
           border-radius: 20px;
           padding: 22px 20px;
           display: flex;
           align-items: center;
           position: relative;
           box-shadow: 0 8px 30px rgba(0,0,0,0.07);
           transition: all 0.3s ease;
           margin: 12px 8px;
           overflow: hidden;
           border: 1px solid #efefef;
           min-height: 185px;
           height: 185px;
        }
        .browse-menu-card:hover {
           transform: translateY(-6px);
           box-shadow: 0 16px 40px rgba(0,0,0,0.12);
           border-color: ${primaryColor}30;
        }
        .browse-media {
           width: 100px;
           height: 100px;
           border-radius: 16px;
           overflow: hidden;
           flex-shrink: 0;
           background: #f5f5f5;
        }
        .browse-media img {
           width: 100%;
           height: 100%;
           object-fit: cover;
           transition: transform 0.4s ease;
        }
        .browse-menu-card:hover .browse-media img {
           transform: scale(1.08);
        }
        .browse-content {
           padding-left: 16px;
           padding-right: 58px;
           flex: 1;
           min-width: 0;
           display: flex;
           flex-direction: column;
           justify-content: center;
        }
        .browse-title {
           font-size: 15px;
           font-weight: 700;
           color: #1a1a1a;
           margin-bottom: 4px;
           line-height: 1.35;
           display: -webkit-box;
           -webkit-line-clamp: 2;
           -webkit-box-orient: vertical;
           overflow: hidden;
        }
        .browse-subtitle {
           font-size: 12px;
           color: #888;
           margin-bottom: 10px;
           display: -webkit-box;
           -webkit-line-clamp: 1;
           -webkit-box-orient: vertical;
           overflow: hidden;
        }
        .browse-price-label {
           font-size: 11px;
           color: #aaa;
           display: block;
           text-transform: uppercase;
           letter-spacing: 0.8px;
           margin-bottom: 3px;
           font-weight: 600;
        }
        .browse-price {
           font-size: 20px;
           font-weight: 800;
           color: ${primaryColor};
        }
        .browse-add-btn {
           position: absolute;
           bottom: 0px;
           right: 0px;
           width: 52px;
           height: 52px;
           background: ${primaryColor};
           color: #fff;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 20px 0 0 0;
           cursor: pointer;
           transition: all 0.25s ease;
           border: none;
        }
        .browse-add-btn:hover {
           filter: brightness(1.1);
        }
        .browse-add-btn i {
           font-size: 16px;
        }
      `}</style>
      <Swiper
        className="swiper browse-menu-swiper py-5"
        slidesPerView={4}
        spaceBetween={25}
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
                <span className="browse-price">{cmsConfig?.config?.currency || '$'}{Number(item.price).toFixed(2)}</span>
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
