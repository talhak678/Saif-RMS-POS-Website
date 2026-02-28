import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";
import { MainBanner2Arr } from "../elements/JsonData";
import { IMAGES } from "../constent/theme";

const MainBanner2 = () => {
  const { cmsConfig } = useContext(Context);

  const bannerSection = cmsConfig?.config?.configJson?.home?.sections?.banner?.content || {};
  const reviewSection = cmsConfig?.config?.configJson?.home?.sections?.customerComments?.content || {};
  const allReviews = cmsConfig?.reviews || [];

  // Get selected reviews for dynamic display
  const selectedReviews = allReviews.filter((r: any) =>
    reviewSection.selectedReviewIds?.includes(r.id)
  );

  const getReviewData = (index: number) => {
    if (selectedReviews.length > 0) {
      const review = selectedReviews[index % selectedReviews.length];
      return {
        reviewName: review.customerName,
        reviewText: review.comment,
        reviewImg: review.customerImage || IMAGES.testiminial_small_pic1,
        reviewRating: review.rating || 5
      };
    }
    const fallback = MainBanner2Arr[index % MainBanner2Arr.length];
    return {
      reviewName: fallback.name,
      reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      reviewImg: fallback.img1 || IMAGES.testiminial_small_pic1,
      reviewRating: 5
    };
  };

  const firstReview = getReviewData(0);

  // Construct the list of banners dynamically
  const banners = [];

  // 1. Primary Banner (Top-level fields)
  banners.push({
    title: bannerSection.title || "We believe Good Food Offer Great Smile",
    subtitle: bannerSection.subtitle || "High Quality Test Station",
    description: bannerSection.description || "Discover the best culinary experience with our expertly crafted dishes prepared with the freshest ingredients.",
    bgimg: bannerSection.bgImage || bannerSection.imageUrl || MainBanner2Arr[0].bgimg,
    img4: bannerSection.rightImage || MainBanner2Arr[0].img4,
    // Dynamic review data
    name: firstReview.reviewName,
    price: MainBanner2Arr[0].price,
    img1: firstReview.reviewImg,
    img2: "",
    img3: "",
    cardTitle: MainBanner2Arr[0].title,
    reviewText: firstReview.reviewText,
    rating: firstReview.reviewRating
  });

  // 2. Additional Banners from items array
  if (bannerSection.items && bannerSection.items.length > 0) {
    bannerSection.items.forEach((item: any, ind: number) => {
      const fallback = MainBanner2Arr[(ind + 1) % MainBanner2Arr.length];
      const slideReview = getReviewData(ind + 1);
      banners.push({
        title: item.title || "Delicious Food For You",
        subtitle: item.subtitle || "Best quality food in town",
        description: item.description || "Experience the best culinary delights with us.",
        bgimg: item.bgImage || fallback.bgimg,
        img4: item.rightImage || fallback.img4,
        name: slideReview.reviewName,
        price: fallback.price,
        img1: slideReview.reviewImg,
        img2: "",
        img3: "",
        cardTitle: fallback.title,
        reviewText: slideReview.reviewText,
        rating: slideReview.reviewRating
      });
    });
  } else {
    // If no extra banners in CMS, add the other fallbacks to keep it populated
    MainBanner2Arr.slice(1, 3).forEach((item) => {
      banners.push({ ...item, cardTitle: item.title });
    });
  }

  const displayBanners = banners;

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
        {displayBanners.map(({ title, subtitle, description, name, price, bgimg, img1, img2, img3, img4, cardTitle, reviewText, rating }, ind) => (
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
                      <h1 className="title text-white">
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
                      <div className="food-card">
                        <div className="dz-head">
                          <h5 className="text-white title">{cardTitle || title}</h5>
                          <ul className="rating">
                            {[...Array(5)].map((_, i) => (
                              <li key={i}>
                                <i className={`fa-solid fa-star ${i < (rating || 5) ? '' : 'text-gray-400'} ${i < 4 ? 'm-r5' : ''}`}></i>
                              </li>
                            ))}
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
                              {reviewText || "Experience the best culinary delights with us."}
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
