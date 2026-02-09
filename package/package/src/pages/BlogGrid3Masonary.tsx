import { IMAGES } from "../constent/theme";
import BlogGridCard from "../elements/BlogGridCard";
import CommonBanner from "../elements/CommonBanner";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { BlogGrid3MasonaryArr } from "../elements/JsonData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import ModalVideo from "react-modal-video";
import { useState } from "react";

const BlogGrid3Masonary = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="XJb1G9iRoL4"
        onClose={() => setIsOpen(false)}
      />
      <div className="page-content bg-white">
        <CommonBanner
          img={IMAGES.banner_bnr1}
          title="Blog Grid 3 Masonry"
          subtitle="Blog Grid 3 Masonry"
        />
        <section className="content-inner">
          <div className="container clearfix">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter="30px" columnsCount={3}>
                <BlogGridCard
                  img={IMAGES.blog_grid3_pic1}
                  title="Paradise Taste of Dishes"
                />
                <div className="card-container">
                  <div className="dz-card style-1">
                    <Swiper
                      className="service2-swiper swiper"
                      modules={[Autoplay, Pagination]}
                      autoplay={{ delay: 1500 }}
                      speed={1200}
                      pagination={{
                        el: ".swiper-pagination",
                        clickable: true,
                      }}
                    >
                      {BlogGrid3MasonaryArr.map(({ img }, ind) => (
                        <SwiperSlide className="swiper-slide" key={ind}>
                          <img src={img} alt="" />
                        </SwiperSlide>
                      ))}
                      <div className="swiper-pagination style-1"></div>
                    </Swiper>
                    <div className="dz-info">
                      <div className="dz-meta">
                        <ul>
                          <li>
                            <Link to={"#"}>
                              <i className="flaticon-calendar-date"></i> 10 Mar
                              2023
                            </Link>
                          </li>
                          <li className="dz-comment">
                            <Link to={"#"}>
                              <i className="flaticon-chat-bubble"></i> 1.0K{" "}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <h5 className="dz-title">
                        <Link to="/blog-standard">The Fork & Knife</Link>
                      </h5>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have.
                      </p>
                      <Link
                        to="/blog-standard"
                        className="btn btn-primary btn-hover-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-container">
                  <div
                    className="dz-card style-3"
                    style={{
                      backgroundImage: `url(${IMAGES.blog_large_pic1})`,
                    }}
                  >
                    <div className="dz-info">
                      <h4 className="dz-title">
                        <Link to="/blog-standard" className="text-white">
                          Exploring the World of Pizza
                        </Link>
                      </h4>
                      <div className="dz-meta">
                        <ul>
                          <li className="dz-date">14 Feb 2023</li>
                          <li className="dz-user">
                            <Link to={"#"}>
                              <i className="fa-solid fa-user"></i>
                              By <span>KK Sharma</span>
                            </Link>
                          </li>
                          <li className="dz-comment">
                            <Link to={"#"}>
                              <i className="fa-solid fa-message"></i>
                              15 Comments
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-container">
                  <blockquote className="wp-block-quote mt-0">
                    <p>
                      Create An Information That’s Easy To Use Usability
                      Considerations For Partially
                    </p>
                    <cite>Ronald M. Spino</cite>
                  </blockquote>
                </div>
                <BlogGridCard
                  img={IMAGES.blog_grid3_pic4}
                  title="Flavors Of The World"
                />
                <div className="card-container">
                  <div className="dz-card style-1">
                    <Swiper
                      className="service-swiper swiper"
                      modules={[Autoplay, Navigation, Pagination]}
                      autoplay={{ delay: 1200 }}
                      pagination={{
                        el: ".swiper-pagination",
                        clickable: true,
                      }}
                      speed={1200}
                      navigation={{
                        prevEl: ".service-button-prev",
                        nextEl: ".service-button-next",
                      }}
                    >
                      {BlogGrid3MasonaryArr.map(({ img }, ind) => (
                        <SwiperSlide className="swiper-slide" key={ind}>
                          <img src={img} alt="" />
                        </SwiperSlide>
                      ))}
                      <div className="swiper-pagination style-1"></div>
                      <div className="service-button-prev btn-prev rounded-xl">
                        <i className="icon-arrow-left"></i>
                      </div>
                      <div className="service-button-next btn-next rounded-xl">
                        <i className="icon-arrow-right"></i>
                      </div>
                    </Swiper>
                    <div className="dz-info">
                      <div className="dz-meta">
                        <ul>
                          <li>
                            <Link to={"#"}>
                              <i className="flaticon-calendar-date"></i> 20 Nov
                              2023
                            </Link>
                          </li>
                          <li className="dz-comment">
                            <Link to={"#"}>
                              <i className="flaticon-chat-bubble"></i> 4.0K
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <h5 className="dz-title">
                        <Link to="/blog-standard">Tabletop Treats Cheese</Link>
                      </h5>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have.
                      </p>
                      <Link
                        to="/blog-standard"
                        className="btn btn-primary btn-hover-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
                <BlogGridCard
                  img={IMAGES.blog_grid3_pic2}
                  title="Taste Excitement"
                />
                <div className="card-container">
                  <div className="dz-card style-1">
                    <Swiper
                      className="service-swiper swiper"
                      modules={[Autoplay, Navigation]}
                      autoplay={{ delay: 1200 }}
                      speed={1200}
                      navigation={{
                        prevEl: ".service-button-prev",
                        nextEl: ".service-button-next",
                      }}
                    >
                      {BlogGrid3MasonaryArr.map(({ img }, inde) => (
                        <SwiperSlide className="swiper-slide" key={inde}>
                          <img src={img} alt="" />
                        </SwiperSlide>
                      ))}
                      <div className="service-button-prev btn-prev rounded-xl">
                        <i className="icon-arrow-left"></i>
                      </div>
                      <div className="service-button-next btn-next rounded-xl">
                        <i className="icon-arrow-right"></i>
                      </div>
                    </Swiper>
                    <div className="dz-info">
                      <div className="dz-meta">
                        <ul>
                          <li>
                            <Link to={"#"}>
                              <i className="flaticon-calendar-date"></i> 20 Nov
                              2023
                            </Link>
                          </li>
                          <li className="dz-comment">
                            <Link to={"#"}>
                              <i className="flaticon-chat-bubble"></i> 4.0K
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <h5 className="dz-title">
                        <Link to="/blog-standard">Tabletop Treats Cheese</Link>
                      </h5>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have.
                      </p>
                      <Link
                        to="/blog-standard"
                        className="btn btn-primary btn-hover-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-container">
                  <div className="dz-card style-1">
                    <div className="dz-media w-100">
                      <Link to="/blog-standard">
                        <img src={IMAGES.blog_grid3_pic1} alt="/" />
                      </Link>
                      <Link
                        className="video style-1 video-btn popup-youtube"
                        to="#"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-play"></i>
                      </Link>
                    </div>
                    <div className="dz-info">
                      <div className="dz-meta">
                        <ul>
                          <li>
                            <Link to={"#"}>
                              <i className="flaticon-calendar-date"></i> 26 Jan
                              2023
                            </Link>
                          </li>
                          <li className="dz-comment">
                            <Link to={"#"}>
                              <i className="flaticon-chat-bubble"></i> 2.5K
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <h5 className="dz-title">
                        <Link to="/blog-standard">
                          Paradise Taste of Dishes
                        </Link>
                      </h5>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have.
                      </p>
                      <Link
                        to="/blog-standard"
                        className="btn btn-primary btn-hover-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="card-container">
                  <div className="dz-card style-2 overlay-shine dz-img-effect zoom">
                    <div className="dz-media">
                      <Link to="/blog-standard">
                        <img src={IMAGES.blog_grid3_pic2} alt="/" />
                      </Link>
                    </div>
                    <div className="dz-info bg-white">
                      <h5 className="dz-title">
                        <Link to="/blog-standard">Taste Excitement</Link>
                      </h5>
                      <div className="dz-meta">
                        <ul>
                          <li className="dz-user">
                            <Link to={"#"}>
                              <i className="fa-solid fa-user"></i>
                              By <span>KK Sharma</span>
                            </Link>
                          </li>
                          <li className="dz-comment">
                            <Link to={"#"}>
                              <i className="fa-solid fa-message"></i>
                              24 Comments
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <p className="mb-0">
                        Nostrud tem exrcitation duis laboris nisi ut aliquip sed
                        duis aute cupidata.
                      </p>
                    </div>
                  </div>
                </div>
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogGrid3Masonary;
