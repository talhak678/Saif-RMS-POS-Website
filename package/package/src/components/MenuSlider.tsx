import { Link } from "react-router-dom";
import { MenuSliderArr } from "../elements/JsonData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const MenuSlider = () => {
  return (
    <div className="swiper-btn-lr">
      <Swiper
        className="swiper portfolio-swiper"
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        modules={[Navigation]}
        speed={1500}
        navigation={{
          prevEl: ".img-button-prev",
          nextEl: ".img-button-next",
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          991: { slidesPerView: 3 },
          575: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
      >
        {MenuSliderArr.map(({ img, name, price }, ind) => (
          <SwiperSlide className="swiper-slide" key={ind}>
            <div className="dz-img-box style-1 wow fadeInUp">
              <div className="dz-media">
                <img src={img} alt="/" />
              </div>
              <span className="dz-tag">TOP SELLER</span>
              <div className="dz-content">
                <div className="dz-info">
                  <h5 className="dz-title mb-0">
                    <Link to="/our-menu-1">{name}</Link>
                  </h5>
                  <span className="dz-price">{price}</span>
                </div>
                <Link
                  to="/shop-cart"
                  className="btn btn-cart btn-white text-primary btn-square"
                >
                  <i className="flaticon-shopping-cart"></i>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pagination mt-xl-0 m-t40">
        <div className="img-button-prev btn-prev-long">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="img-button-next btn-next-long">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

export default MenuSlider;
