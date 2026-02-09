import { Link } from "react-router-dom";
import { TeamCaroselArr } from "../elements/JsonData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const TeamCarosel = () => {
  return (
    <div className="container">
      <Swiper
        className="swiper team-swiper swiper-visible swiper-btn-lr swiper-item-4"
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        speed={1200}
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: ".team-button-prev",
          nextEl: ".team-button-next",
        }}
        autoplay={{
          delay: 1500,
        }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          991: { slidesPerView: 3 },
          575: { slidesPerView: 2 },
          240: { slidesPerView: 1 },
        }}
      >
        {TeamCaroselArr.map(({ img, name, position }, ind) => (
          <SwiperSlide className="swiper-slide" key={ind}>
            <div className="dz-team style-1 wow fadeInUp">
              <div className="dz-media">
                <img src={img} alt="/" />
              </div>
              <div className="dz-content">
                <div className="clearfix">
                  <h6 className="dz-name">
                    <Link to="/team-detail">{name}</Link>
                  </h6>
                  <span className="dz-position">{position}</span>
                </div>
                <ul className="team-social">
                  <li>
                    <Link className="share-btn" to="#">
                      <i className="flaticon-share"></i>
                    </Link>
                    <ul className="sub-team-social">
                      <li>
                        <Link
                          className="fb-btn"
                          to="https://www.facebook.com/"
                          target="_blank"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="tw-btn"
                          to="https://twitter.com/"
                          target="_blank"
                        >
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="in-btn"
                          to="https://www.instagram.com/"
                          target="_blank"
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="lin-btn"
                          to="https://www.linkedin.com/"
                          target="_blank"
                        >
                          <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="pagination mt-xl-0 m-t40">
          <div className="team-button-prev btn-prev-long">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div className="team-button-next btn-next-long">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default TeamCarosel;
