import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import { MainBanner2Arr } from "../elements/JsonData";
import axios from "axios";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#ffac00" : "none"}
    stroke={filled ? "#ffac00" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={filled ? "" : "opacity-20"}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const MainBanner2 = () => {
  const { cmsConfig } = useContext(Context);

  const bannerSection = cmsConfig?.config?.configJson?.home?.sections?.banner?.content || {};

  // Construct the list of banners dynamically
  const banners = [];

  // 1. Primary Banner (Top-level fields)
  banners.push({
    title: bannerSection.title || "We believe Good Food Offer Great Smile",
    subtitle: bannerSection.subtitle || "High Quality Test Station",
    description: bannerSection.description || "Discover the best culinary experience with our expertly crafted dishes prepared with the freshest ingredients.",
    bgimg: bannerSection.bgImage || bannerSection.imageUrl || MainBanner2Arr[0].bgimg,
    img3: "",
    img4: bannerSection.rightImage || MainBanner2Arr[0].img4
  });

  // 2. Additional Banners from items array
  if (bannerSection.items && bannerSection.items.length > 0) {
    bannerSection.items.forEach((item: any, ind: number) => {
      const fallback = MainBanner2Arr[(ind + 1) % MainBanner2Arr.length];
      banners.push({
        title: item.title || "Delicious Food For You",
        subtitle: item.subtitle || "Best quality food in town",
        description: item.description || "Experience the best culinary delights with us.",
        bgimg: item.bgImage || fallback.bgimg,
        img3: "",
        img4: item.rightImage || fallback.img4
      });
    });
  } else {
    // If no extra banners in CMS, add the other fallbacks to keep it populated
    MainBanner2Arr.slice(1, 3).forEach((item) => {
      banners.push({ ...item, cardTitle: item.title });
    });
  }

  const displayBanners = banners;

  const [selectedReview, setSelectedReview] = useState<any>(null);

  useEffect(() => {
    if (bannerSection.selectedReviewId && cmsConfig?.slug) {
      const fetchReview = async () => {
        try {
          const res = await axios.get(`https://saif-rms-pos-backend.vercel.app/api/customers/reviews?slug=${cmsConfig.slug}&limit=100`);
          if (res.data?.success) {
            const review = res.data.data.reviews.find((r: any) => r.id === bannerSection.selectedReviewId);
            setSelectedReview(review);
          }
        } catch (err) {
          console.error("Error fetching banner review:", err);
        }
      };
      fetchReview();
    } else {
      setSelectedReview(null);
    }
  }, [bannerSection.selectedReviewId, cmsConfig?.slug]);

  const pagination = {
    clickable: true,
    el: ".main-swiper3-pagination",
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

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
               text-align: left !important;
            }
            .main-bnr-three .banner-content .title {
               font-size: 32px !important;
            }
            .food-card {
              display: none !important;
            }
            .review-card-banner {
              padding: 15px !important;
              max-width: 100% !important;
              margin-top: 20px !important;
            }
            .banner-media {
              display: none !important;
            }
          }
          .banner-btn .btn:hover span {
            color: ${cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ff6b35"} !important;
          }
          .banner-btn .btn-outline-primary:hover,
          .banner-btn .btn-primary:hover {
            background-color: #fff !important;
            border-color: #fff !important;
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
        {displayBanners.map(({ title, subtitle, description, bgimg, img3, img4 }, ind) => (
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
                        {subtitle}
                      </span>
                      <h1 className="title text-white" style={{ fontWeight: 700 }}>
                        {title}
                      </h1>
                      <p className="bnr-text">
                        {description}
                      </p>

                      <div className="banner-btn d-flex align-items-center">
                        <Link
                          to="/contact-us"
                          className="btn btn-primary btn-md shadow-primary m-r30 btn-hover-1"
                        >
                          <span>{ind === 0 ? (bannerSection.buttonText || "OUR SPECIALITIES") : "Book Link Table"}</span>
                        </Link>
                        <Link
                          to="/about-us"
                          className="btn btn-outline-primary btn-md shadow-primary btn-hover-1"
                        >
                          <span>View More</span>
                        </Link>
                      </div>

                      {selectedReview && (
                        <div className="review-card-banner mt-4 animate__animated animate__fadeInUp" style={{
                          background: '#ffffff',
                          padding: '24px',
                          borderRadius: '24px',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          maxWidth: '450px',
                          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
                          position: 'relative',
                          zIndex: 1
                        }}>
                          <div className="d-flex align-items-center mb-3">
                            <div className="rating d-flex gap-1 mr-3">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} filled={i < selectedReview.rating} />
                              ))}
                            </div>
                            <span className="small font-weight-bold" style={{ letterSpacing: '1px', color: '#666' }}>
                              {selectedReview.rating.toFixed(1)} RATING
                            </span>
                          </div>
                          <p className="mb-3" style={{
                            fontSize: '15px',
                            lineHeight: '1.6',
                            fontStyle: 'italic',
                            color: '#444',
                            fontWeight: '500'
                          }}>
                            "{selectedReview.comment || "Fast service and delicious food! Highly recommended."}"
                          </p>
                          <div className="d-flex align-items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                            <div className="user-avatar bg-primary rounded-circle d-flex align-items-center justify-content-center text-white font-weight-bold" style={{ width: '42px', height: '42px', fontSize: '16px', boxShadow: '0 4px 10px rgba(255, 107, 53, 0.3)' }}>
                              {(selectedReview.order?.customer?.name || "G")[0].toUpperCase()}
                            </div>
                            <div>
                              <h6 className="mb-0" style={{ fontSize: '15px', fontWeight: '800', color: '#222' }}>
                                {selectedReview.order?.customer?.name || "Verified Guest"}
                              </h6>
                              <div className="d-flex align-items-center gap-1">
                                <i className="fa fa-check-circle text-success" style={{ fontSize: '10px' }}></i>
                                <span className="text-primary small font-weight-bold uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Verified Customer</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

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
