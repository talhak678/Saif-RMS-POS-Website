import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { OurBlogArr } from "../elements/JsonData";
import { Link } from "react-router-dom";

const OurBlog = () => {
  return (
    <Swiper
      className="swiper blog-swiper swiper-visible swiper-btn-lr"
      slidesPerView={2}
      spaceBetween={30}
      loop={true}
      speed={1200}
      modules={[Autoplay, Navigation]}
      autoplay={{ delay: 1500 }}
      navigation={{
        prevEl: ".blog-button-prev",
        nextEl: ".blog-button-next",
      }}
      breakpoints={{
        1024: { slidesPerView: 2 },
        240: { slidesPerView: 1 },
      }}
    >
      {OurBlogArr.map(({ img, title }, ind) => (
        <SwiperSlide className="swiper-slide" key={ind}>
          <div className="dz-card style-1 blog-half overlay-shine dz-img-effect zoom wow fadeInUp">
            <div className="dz-media">
              <Link to="/blog-standard">
                <img src={img} alt="/" />
              </Link>
            </div>
            <div className="dz-info">
              <div className="dz-meta">
                <ul>
                  <li>
                    <Link to="#">
                      <i className="flaticon-calendar-date"></i> 26 Jan 2023
                    </Link>
                  </li>
                  <li className="dz-comment">
                    <Link to="#">
                      <i className="flaticon-chat-bubble"></i> 2.5K{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              <h5 className="dz-title">
                <Link to="/blog-standard">{title}</Link>
              </h5>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have.
              </p>
              <div className="read-btn">
                <Link
                  to="/blog-standard"
                  className="btn btn-primary btn-hover-2"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="pagination mt-xl-0 m-t40">
        <div className="blog-button-prev btn-prev-long">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="blog-button-next btn-next-long">
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </Swiper>
  );
};

export default OurBlog;
