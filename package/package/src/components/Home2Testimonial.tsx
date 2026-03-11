import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import axios from "axios";

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
        // Fetch more reviews to allow filtering from a larger pool if needed
        const res = await axios.get(`https://saif-rms-pos-backend-tau.vercel.app/api/customers/reviews?${params}&limit=20`);
        if (res.data?.success) {
          setReviews(res.data.data.reviews || []);
        }
      } catch (err) {
        console.error("Failed to fetch testimonial reviews", err);
      }
    };
    fetchReviews();
  }, [cmsConfig?.slug, cmsConfig?.restaurantId]);

  const selectedReviewIds = cmsConfig?.config?.configJson?.home?.sections?.customerComments?.content?.selectedReviewIds || [];

  let displayReviews = reviews;

  if (selectedReviewIds.length > 0) {
    displayReviews = reviews.filter(r => selectedReviewIds.includes(r.id));
  } else {
    displayReviews = reviews.slice(0, 5); // Fallback to latest 5
  }

  // Final fallback for demo/default state
  if (displayReviews.length === 0 && reviews.length === 0) {
    displayReviews = [
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
  }

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
          <div className="testimonial-2 text-center">
            {/* Customer Image Removed as per request */}
            <div className="testimonial-detail" style={{ paddingLeft: '0' }}>
              <div className="testimonial-text wow fadeInUp">
                <div className="star-rating mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`${i < review.rating ? "fas" : "far"} fa-star m-r5`} style={{ color: "#fe9f10" }}></i>
                  ))}
                </div>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#666' }}>"{review.comment}"</p>
              </div>
              <div className="testimonial-info wow fadeInUp">
                <h5 className="testimonial-name" style={{ color: 'var(--primary)' }}>{review.order?.customer?.name || "Happy Customer"}</h5>
                <span className="testimonial-position">Verified Customer</span>
              </div>
              <i className="flaticon-right-quote quote" style={{ opacity: '0.1' }}></i>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="pagination">
        <div className="testimonial-2-button-prev btn-prev rounded-xl ">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="testimonial-2-button-next btn-next rounded-xl ">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </Swiper>
  );
};

export default Home2Testimonial;

