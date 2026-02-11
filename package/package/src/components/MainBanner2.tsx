import { Swiper, SwiperSlide } from "swiper/react";
import { MainBanner2Arr } from "../elements/JsonData";
import { Parallax, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const MainBanner2 = () => {
  const pagination = {
    clickable: true,
    el: ".main-swiper3-pagination",
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div className="main-bnr-three overflow-hidden top-space">
      <div className="swiper-bnr-pagination left-align">
        <div className="main-button-prev">
          <i className="icon-arrow-up"></i>
        </div>
        <div className="main-swiper3-pagination"></div>
        <div className="main-button-next">
          <i className="icon-arrow-down"></i>
        </div>
      </div>
      <Swiper
        className="main-slider-3"
        direction="vertical"
        modules={[Parallax, Pagination]}
        pagination={pagination}
        parallax={true}
        speed={1500}
        loop={true}
      >
        {MainBanner2Arr.map(
          ({ title, name, price, bgimg, img1, img2, img3, img4 }, ind) => (
            <SwiperSlide className="swiper-slide" key={ind}>
              <div
                className="banner-inner overflow-hidden"
                data-swiper-parallax="-10"
                data-swiper-parallax-duration="0.5"
                style={{
                  backgroundImage: `url(${bgimg})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="container">
                  <div
                    className="row align-items-center"
                    data-swiper-parallax="-100"
                  >
                    <div className="col-xl-7 col-lg-7 col-md-8">
                      <div className="banner-content">
                        <span className="sub-title text-primary">
                          High Quality Test Station
                        </span>
                        <h1 className="title text-white">
                          We believe Good Food Offer Great Smile
                        </h1>
                        <p className="bnr-text">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>

                        <div className="banner-btn d-flex align-items-center">
                          <Link
                            to="/contact-us"
                            className="btn btn-primary btn-md shadow-primary m-r30 btn-hover-1"
                          >
                            <span>Book Link Table</span>
                          </Link>
                          <Link
                            to="/about-us"
                            className="btn btn-outline-primary btn-md shadow-primary btn-hover-1"
                          >
                            <span>View More</span>
                          </Link>
                        </div>
                        <div className="food-card">
                          <div className="dz-head">
                            <h5 className="text-white title">{title}</h5>
                            <ul className="rating">
                              <li>
                                <i className="fa-solid fa-star m-r5"></i>
                              </li>
                              <li>
                                <i className="fa-solid fa-star m-r5"></i>
                              </li>
                              <li>
                                <i className="fa-solid fa-star m-r5"></i>
                              </li>
                              <li>
                                <i className="fa-solid fa-star m-r5"></i>
                              </li>
                              <li>
                                <i className="fa-solid fa-star "></i>
                              </li>
                            </ul>
                          </div>
                          <div className="dz-body">
                            <div className="dz-left">
                              <div className="profile-info">
                                <div className="dz-media">
                                  <img src={img1} alt="/" />
                                </div>
                                <div className="dz-content">
                                  <h6 className="title text-white">{name}</h6>
                                  <p>Master Chief</p>
                                </div>
                              </div>
                              <p className="text">
                                Lorem ipsum dolor shit amet...
                              </p>
                            </div>
                            <div className="dz-right">
                              <h5 className="text-primary">{price}</h5>
                              <Link
                                to="/shop-cart"
                                className="btn btn-primary btn-cart"
                              >
                                <i className="flaticon-shopping-cart"></i>
                              </Link>
                            </div>
                          </div>
                          <img className="target-line" src={img2} alt="/" />
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-4">
                      <div className="banner-media">
                        <img
                          src={img4}
                          alt="/"
                          data-swiper-parallax-scale="0.8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <img className="leaf" src={img3} alt="/" />
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default MainBanner2;
