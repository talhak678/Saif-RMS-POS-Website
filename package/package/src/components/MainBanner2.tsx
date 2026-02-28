import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import { MainBanner2Arr } from "../elements/JsonData";

const MainBanner2 = () => {
  const { cmsConfig } = useContext(Context);

  const bannerContent = cmsConfig?.config?.configJson?.home?.sections?.banner?.content || {
    title: "We believe Good Food Offer Great Smile",
    subtitle: "High Quality Test Station",
    description: "Discover the best culinary experience with our expertly crafted dishes prepared with the freshest ingredients.",
    buttonText: "OUR SPECIALITIES",
    buttonLink: "/our-menu-2"
  };

  const pagination = {
    clickable: true,
    el: ".main-swiper3-pagination",
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  // We take the first 3 from the array as requested by user
  const displayBanners = MainBanner2Arr.slice(0, 3);

  return (
    <div className="main-bnr-three overflow-hidden top-space">
      <style>
        {`
          @media (max-width: 576px) {
            .banner-btn {
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 10px !important;
            }
            .banner-btn .btn {
              width: 100% !important;
              padding: 12px !important;
              font-size: 14px !important;
            }
            .main-bnr-three .banner-content {
               padding: 20px !important;
               text-align: left !important;
            }
            .main-bnr-three .banner-content .title {
               font-size: 32px !important;
            }
            .food-card {
              display: none !important;
            }
            .banner-media {
              display: none !important;
            }
          }
        `}
      </style>
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
        {displayBanners.map(({ title, name, price, bgimg, img1, img2, img3, img4 }, ind) => (
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
                        {ind === 0 ? bannerContent.subtitle : "High Quality Test Station"}
                      </span>
                      <h1 className="title text-white">
                        {ind === 0 ? bannerContent.title : "We believe Good Food Offer Great Smile"}
                      </h1>
                      <p className="bnr-text">
                        {ind === 0 ? bannerContent.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                      </p>

                      <div className="banner-btn d-flex align-items-center">
                        <Link
                          to="/contact-us"
                          className="btn btn-primary btn-md shadow-primary m-r30 btn-hover-1"
                        >
                          <span>{ind === 0 ? bannerContent.buttonText : "Book Link Table"}</span>
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
                            <li><i className="fa-solid fa-star m-r5"></i></li>
                            <li><i className="fa-solid fa-star m-r5"></i></li>
                            <li><i className="fa-solid fa-star m-r5"></i></li>
                            <li><i className="fa-solid fa-star m-r5"></i></li>
                            <li><i className="fa-solid fa-star"></i></li>
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
                  <div className="col-xl-5 col-lg-5 col-md-4 text-center">
                    <div className="banner-media">
                      <img
                        src={img4}
                        alt="/"
                        data-swiper-parallax-scale="0.8"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <img className="leaf" src={img3} alt="/" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner2;
