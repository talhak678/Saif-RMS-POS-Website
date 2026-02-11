import { Swiper, SwiperSlide } from "swiper/react";
import { Home2OurMenuArr } from "../elements/JsonData";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useState } from "react";

interface PropFile {
  prev: string;
  next: string;
}
const Home2OurMenu = ({ prev, next }: PropFile) => {
  const [active, setActive] = useState<number>();
  return (
    <div className="container">
      <Swiper
        className="swiper menu-swiper swiper-visible swiper-item-4"
        slidesPerView={4}
        spaceBetween={30}
        speed={1500}
        loop={true}
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
        {Home2OurMenuArr.map(({ img, name, price }, ind) => (
          <SwiperSlide className="swiper-slide" key={ind}>
            <div
              className={`dz-img-box style-4 box-hover ${
                active == ind ? "active" : ""
              }`}
              onMouseEnter={() => {
                setActive(ind);
              }}
            >
              <div className="menu-detail">
                <div className="dz-media">
                  <img src={img} alt="/" />
                </div>
                <div className="dz-content">
                  <h6 className="title">
                    <Link to="/product-detail">{name}</Link>
                  </h6>
                  <p>Delicious and Spicy</p>
                </div>
              </div>
              <div className="menu-footer">
                <span>Regular Price</span>
                <span className="price">{price}</span>
              </div>
              <Link className="detail-btn" to="/product-detail">
                <i className="fa-solid fa-plus"></i>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home2OurMenu;
