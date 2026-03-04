import { Link } from "react-router-dom";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { MainBannerArr } from "../elements/JsonData";
import { EffectFade, Thumbs, Navigation, Pagination } from "swiper/modules";
import { IMAGES } from "../constent/theme";
import { useRef, useState, useContext } from "react";
import { Context } from "../context/AppContext";

const MainBanner = () => {
  const { cmsConfig } = useContext(Context);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();
  const ref = useRef<SwiperRef | null>(null);

  const bannerSection = cmsConfig?.config?.configJson?.home?.sections?.banner;
  const bannerContent = bannerSection?.content || {};
  const themeColors = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content || {};
  const bannerTextColor = themeColors.bannerTextColor || "inherit";

  // Merge Main Banner and Additional Banners
  const banners: any[] = [];
  if (bannerSection?.enabled !== false && bannerContent) {
    // 1. Add Main Banner
    if (bannerContent.title || bannerContent.rightImage || bannerContent.bgImage) {
      banners.push({
        img: bannerContent.rightImage || IMAGES.main_slide_pic1,
        bgImage: bannerContent.bgImage || IMAGES.main_slide_img3,
        subtitle: bannerContent.subtitle || "",
        title: bannerContent.title || "Choosing The Best Quality Food",
        text: bannerContent.description || "",
        imgThumb: bannerContent.rightImage || IMAGES.main_slide_pic1,
        textAlign: bannerContent.textAlign || "left"
      });
    }

    // 2. Add Additional Banners from 'items' array
    if (bannerContent.items && Array.isArray(bannerContent.items)) {
      bannerContent.items.forEach((item: any) => {
        banners.push({
          img: item.rightImage || IMAGES.main_slide_pic1,
          bgImage: item.bgImage || IMAGES.main_slide_img3,
          subtitle: item.subtitle || "",
          title: item.title || "Choosing The Best Quality Food",
          text: item.description || "",
          imgThumb: item.rightImage || IMAGES.main_slide_pic1,
          textAlign: bannerContent.textAlign || "left"
        });
      });
    }
  }

  // Final Banners List (Fallback to static data if none in CMS)
  const displayBanners = banners.length > 0 ? banners : MainBannerArr.map(item => ({
    img: item.img,
    bgImage: IMAGES.main_slide_img3,
    subtitle: item.subtitle,
    title: `${item.title} ${item.title2} ${item.title3 || ""}`,
    text: item.text,
    imgThumb: item.imgThumb,
    textAlign: "left"
  }));

  const pagination = {
    clickable: true,
    el: ".main-slider-pagination",
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="main-bnr-one">
      <style>
        {`
          .main-bnr-one .banner-content .sub-title,
          .main-bnr-one .banner-content p {
            color: ${bannerTextColor} !important;
          }
          @media (max-width: 991px) {
            .main-bnr-one .banner-content {
              text-align: left !important;
              padding-top: 40px;
            }
            .main-bnr-one .banner-content .title {
              font-size: 42px !important;
              line-height: 1.2 !important;
            }
            .main-bnr-one .banner-btn {
              justify-content: center !important;
            }
            .main-bnr-one .banner-media {
              margin-top: 30px;
            }
            .main-bnr-one .banner-inner {
               padding-bottom: 50px !important;
            }
          }
          @media (max-width: 576px) {
            .main-bnr-one .banner-content .title {
              font-size: 32px !important;
            }
            .main-bnr-one .banner-content .sub-title {
              font-size: 14px !important;
            }
            .main-bnr-one .banner-btn .btn {
              padding: 10px 20px !important;
              font-size: 14px !important;
            }
            .main-bnr-one .banner-btn {
               flex-direction: column;
               gap: 15px;
            }
            .main-bnr-one .banner-btn .m-r30 {
               margin-right: 0 !important;
            }
          }
        `}
      </style>
      <div className="slider-pagination">
        <div className="main-button-prev">
          <i className="icon-arrow-up"></i>
        </div>
        <div className="main-slider-pagination"></div>
        <div className="main-button-next">
          <i className="icon-arrow-down"></i>
        </div>
      </div>
      <Swiper
        className="main-slider-1 swiper"
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        modules={[EffectFade, Thumbs, Navigation, Pagination]}
        pagination={pagination}
        navigation={{
          prevEl: ".main-button-prev",
          nextEl: ".main-button-next",
        }}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        onSwiper={(swiper) => {
          if (ref.current) ref.current.swiper = swiper;
        }}
      >
        {displayBanners.map(
          ({ img, bgImage, subtitle, title, text, textAlign }, ind) => (
            <SwiperSlide className="swiper-slide" key={ind}>
              <div
                className="banner-inner"
                style={{
                  backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                  <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-7 col-md-7">
                      <div className="banner-content" style={{ textAlign: textAlign as any }}>
                        <span className="sub-title">{subtitle}</span>
                        <h1 className="title">
                          {title}
                        </h1>
                        <p className="wow fadeInUp">{text}</p>
                        <div className="banner-btn d-flex align-items-center wow fadeInUp" style={{ justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start' }}>
                          <Link
                            to="/contact-us"
                            className="btn btn-primary btn-md shadow-primary m-r30 btn-hover-1"
                          >
                            <span>Book a Table</span>
                          </Link>
                          <Link
                            to="/about-us"
                            className="btn btn-outline-primary btn-md shadow-primary btn-hover-1"
                          >
                            <span>View More</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 col-lg-5 col-md-5">
                      <div className="banner-media wow fadeInRight">
                        <img src={img} alt="/" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative images only if no custom background is set, or keep them as floating elements */}
                <img src={IMAGES.main_slide_img3} className="img1" alt="/" style={{ opacity: bgImage ? 0.3 : 1 }} />
                <img src={IMAGES.main_slide_img1} className="img2" alt="/" style={{ opacity: bgImage ? 0.3 : 1 }} />
                <img src={IMAGES.main_slide_img2} className="img3" alt="/" style={{ opacity: bgImage ? 0.3 : 1 }} />
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
      <div className="container">
        <div className="main-thumb1-area swiper-btn-lr wow fadeInUp">
          <Swiper
            className="swiper main-thumb1"
            slidesPerView={displayBanners.length < 2 ? 1 : 2}
            freeMode={true}
            loop={displayBanners.length > 1}
            modules={[Navigation]}
            onSwiper={(swiper: any) => {
              setThumbsSwiper(swiper);
            }}
            navigation={{
              prevEl: ".thumb-button-prev",
              nextEl: ".thumb-button-next",
            }}
          >
            {displayBanners.map(({ imgThumb, title }, ind) => (
              <SwiperSlide className="swiper-slide" key={ind}>
                <div className="food-card">
                  <div className="dz-media">
                    <img src={imgThumb} alt="/" />
                  </div>
                  <div className="dz-content">
                    <h5 className="title" style={{ fontSize: '14px' }}>{title.substring(0, 20)}...</h5>
                    <p>Delicious Taste</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="thumb-button-prev btn-prev-1">
            <i className="fa-solid fa-angle-left"></i>
          </div>
          <div className="thumb-button-next btn-next-1">
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
