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
           border-radius: 28px;
           padding: 30px;
           display: flex;
           align-items: center;
           position: relative;
           box-shadow: 0 20px 50px rgba(0,0,0,0.05);
           transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
           margin: 15px 12px;
           overflow: hidden;
           border: 1px solid #f2f2f2;
           min-height: 190px;
           height: 190px;
        }
        .browse-menu-card:hover {
           transform: translateY(-10px);
           box-shadow: 0 25px 60px rgba(0,0,0,0.1);
           border-color: ${primaryColor}22;
        }
        .browse-media {
           width: 120px;
           height: 120px;
           border-radius: 20px;
           overflow: hidden;
           flex-shrink: 0;
           background: #f8f8f8;
           box-shadow: 0 8px 20px rgba(0,0,0,0.04);
        }
        .browse-media img {
           width: 100%;
           height: 100%;
           object-fit: cover;
           transition: all 0.5s ease;
        }
        .browse-menu-card:hover .browse-media img {
           transform: scale(1.1);
        }
        .browse-content {
           padding-left: 25px;
           flex: 1;
           display: flex;
           flex-direction: column;
           justify-content: center;
        }
        .browse-title {
           font-size: 20px;
           font-weight: 700;
           color: #1a1a1a;
           margin-bottom: 6px;
           line-height: 1.2;
        }
        .browse-subtitle {
           font-size: 15px;
           color: #666;
           margin-bottom: 18px;
           display: block;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
        }
        .browse-price-label {
           font-size: 11px;
           color: #999;
           display: block;
           text-transform: uppercase;
           letter-spacing: 1px;
           margin-bottom: 2px;
           font-weight: 700;
        }
        .browse-price {
           font-size: 24px;
           font-weight: 800;
           color: ${primaryColor};
        }
        .browse-add-btn {
           position: absolute;
           bottom: 0px;
           right: 0px;
           width: 65px;
           height: 65px;
           background: ${primaryColor};
           color: #fff;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 28px 0 0 0;
           cursor: pointer;
           transition: all 0.3s ease;
           border: none;
           font-size: 22px;
        }
        .browse-add-btn:hover {
           background: #222; /* Add a nice hover state for the button too */
           width: 70px;
           height: 70px;
        }
        .browse-add-btn i {
           font-size: 20px;
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
