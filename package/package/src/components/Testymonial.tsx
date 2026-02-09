import { useState, useRef } from "react";
import { TestymonialArr } from "../elements/JsonData";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Grid, Thumbs, Navigation } from "swiper/modules";

const Testymonial = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const ref = useRef<SwiperRef | null>(null);
  return (
    <div className="row gx-0 wow fadeInUp">
      <div className="col-lg-7 col-md-12">
        <Swiper
          className="swiper testimonial-one-thumb"
          slidesPerView={3}
          grid={{ rows: 2 }}
          modules={[Grid]}
          speed={1500}
          freeMode={true}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSwiper={(swiper: any) => {
            setThumbsSwiper(swiper);
          }}
        >
          {TestymonialArr.map(({ img }, ind) => (
            <SwiperSlide className="swiper-slide" key={ind}>
              <img src={img} alt="/" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-lg-5 col-md-12">
        <Swiper
          className="swiper testimonial-one-swiper h-100"
          modules={[Thumbs, Navigation]}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
          onSwiper={(swiper) => {
            if (ref.current) ref.current.swiper = swiper;
          }}
        >
          {TestymonialArr.map(({ name, skill }, ind) => (
            <SwiperSlide className="swiper-slide" key={ind}>
              <div className="testimonial-1">
                <div className="testimonial-text">
                  <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text.
                  </p>
                </div>
                <div className="testimonial-info">
                  <h5 className="testimonial-name">{name}</h5>
                  <span className="testimonial-position">{skill}</span>
                </div>
                <i className="flaticon-right-quote quote"></i>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testymonial;
