import { Swiper, SwiperSlide } from "swiper/react";
import { MainBanner2Arr } from "../elements/JsonData";
import { Parallax, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const MainBanner2 = () => {
  const { cmsConfig } = useContext(Context);

  const bannerContent = cmsConfig?.config?.configJson?.home?.sections?.banner?.content || {
    title: "We believe Good Food Offer Great Smile",
    subtitle: "High Quality Test Station",
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
                  backgroundImage: `url(${bannerContent.imageUrl || bgimg})`,
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
                          {bannerContent.subtitle}
                        </span>
                        <h1 className="title text-white">
                          {bannerContent.title}
                        </h1>
                        <p className="bnr-text">
                          {bannerContent.description || "Discover the best culinary experience with our expertly crafted dishes prepared with the freshest ingredients."}
                        </p>

                        <div className="banner-btn d-flex align-items-center">
                          <Link
                            to={bannerContent.buttonLink || "/our-menu-2"}
                            className="btn btn-primary btn-md shadow-primary m-r30 btn-hover-1"
                          >
                            <span>{bannerContent.buttonText}</span>
                          </Link>
                          <Link
                            to="/our-menu-2"
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
                              <li><i className="fa-solid fa-star "></i></li>
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
                                  <p>Master Chef</p>
                                </div>
                              </div>
                              <p className="text">
                                Prepared with fresh ingredients and traditional spices...
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
