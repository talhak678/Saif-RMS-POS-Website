import { Swiper, SwiperSlide } from "swiper/react";
import { Home2TestimonialArr } from "../elements/JsonData";
import { Autoplay, Navigation } from "swiper/modules";

const Home2Testimonial = () => {
  return (
    <Swiper
      className="swiper testimonial-two-swiper swiper-btn-lr swiper-single swiper-visible"
      speed={1500}
      loop={true}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 1500,
      }}
      navigation={{
        prevEl: ".testimonial-2-button-prev",
        nextEl: ".testimonial-2-button-next",
      }}
    >
      {Home2TestimonialArr.map(({ img, name, position }, ind) => (
        <SwiperSlide className="swiper-slide" key={ind}>
          <div className="testimonial-2">
            <div className="dz-media">
              <img src={img} alt="/" />
            </div>
            <div className="testimonial-detail">
              <div className="testimonial-text wow fadeInUp">
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn't anything
                  embarrassing hidden in the middle of text.
                </p>
              </div>
              <div className="testimonial-info wow fadeInUp">
                <h5 className="testimonial-name">{name}</h5>
                <span className="testimonial-position">{position}</span>
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
