import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

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

  // Use CMS Promos if available, otherwise fallback to Hero section content
  const banners = (cmsConfig?.promos && cmsConfig.promos.length > 0)
    ? cmsConfig.promos
    : [bannerContent];

  return (
    <div className="main-bnr-three overflow-hidden">
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
               text-align: center !important;
            }
            .main-bnr-three .banner-content .title {
               font-size: 32px !important;
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
        loop={banners.length > 1}
      >
        {banners.map((item: any, ind: number) => (
          <SwiperSlide className="swiper-slide" key={ind}>
            <div
              className="banner-inner overflow-hidden"
              data-swiper-parallax="-10"
              data-swiper-parallax-duration="0.5"
              style={{
                backgroundImage: `url(${item.imageUrl || item.bgimg || ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="container h-100">
                <div
                  className="row align-items-center h-100"
                  data-swiper-parallax="-100"
                >
                  <div className="col-xl-8 col-lg-9 col-md-10">
                    <div className="banner-content text-left py-5">
                      <span className="sub-title text-primary" style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
                        {item.subtitle || bannerContent.subtitle}
                      </span>
                      <h1 className="title text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900', lineHeight: '1.1', textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
                        {item.title || bannerContent.title}
                      </h1>
                      <p className="bnr-text text-white opacity-90 mb-5" style={{ fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6', textShadow: '1px 1px 5px rgba(0,0,0,0.5)' }}>
                        {item.description || bannerContent.description || "Discover the best culinary experience with our expertly crafted dishes prepared with the freshest ingredients."}
                      </p>

                      <div className="banner-btn d-flex align-items-center justify-content-start gap-3">
                        <button
                          onClick={() => {
                            const element = document.getElementById('todays-special');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="btn btn-primary btn-lg shadow-primary btn-hover-1 py-3 px-5 rounded-pill"
                        >
                          <span className="fw-bold">Order Now</span>
                        </button>
                        <Link
                          to="/our-menu-2"
                          className="btn btn-outline-light btn-lg btn-hover-1 py-3 px-5 rounded-pill"
                        >
                          <span className="fw-bold">View More</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainBanner2;
