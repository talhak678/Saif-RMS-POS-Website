import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";
import { IMAGES } from "../constent/theme";

const Home2Testimonial = () => {
  const { cmsConfig } = useContext(Context);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const slug = cmsConfig?.slug;
      const restaurantId = cmsConfig?.restaurantId;
      if (!slug && !restaurantId) return;
      try {
        const params = slug ? `slug=${slug}` : `restaurantId=${restaurantId}`;
        const res = await axios.get(`https://saif-rms-pos-backend.vercel.app/api/customers/reviews?${params}&limit=5`);
        if (res.data?.success) {
          setReviews(res.data.data.reviews || []);
        }
      } catch (err) {
        console.error("Failed to fetch testimonial reviews", err);
      }
    };
    fetchReviews();
  }, [cmsConfig?.slug, cmsConfig?.restaurantId]);

  const displayReviews = reviews.length > 0 ? reviews : [
    {
      order: { customer: { name: "John Doe" } },
      comment: "Amazing food and service! The burger was perfectly cooked and very juicy.",
      rating: 5
    },
    {
      order: { customer: { name: "Jane Smith" } },
      comment: "Very fast delivery and the pasta was still hot when it arrived. Strongly recommend!",
      rating: 4
    }
  ];

  return (
    <Swiper
      className="swiper testimonial-two-swiper swiper-btn-lr swiper-single swiper-visible"
      speed={1500}
      loop={displayReviews.length > 1}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 3000,
      }}
      navigation={{
        prevEl: ".testimonial-2-button-prev",
        nextEl: ".testimonial-2-button-next",
      }}
    >
      {displayReviews.map((review, ind) => (
        <SwiperSlide className="swiper-slide" key={ind}>
          <div className="testimonial-2">
            <div className="dz-media">
              <img src={IMAGES.testimonial_mini_pic1} alt="/" />
            </div>
            <div className="testimonial-detail">
              <div className="testimonial-text wow fadeInUp">
                <div className="star-rating mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`${i < review.rating ? "fas" : "far"} fa-star m-r5`} style={{ color: "#fe9f10" }}></i>
                  ))}
                </div>
                <p>"{review.comment}"</p>
              </div>
              <div className="testimonial-info wow fadeInUp">
                <h5 className="testimonial-name">{review.order?.customer?.name || "Happy Customer"}</h5>
                <span className="testimonial-position">Customer</span>
              </div>
              <i className="flaticon-right-quote quote"></i>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="pagination">
        <div className="testimonial-2-button-prev btn-prev rounded-xl btn-hover-2">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="testimonial-2-button-next btn-next rounded-xl btn-hover-2">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </Swiper>
  );
};

export default Home2Testimonial;
