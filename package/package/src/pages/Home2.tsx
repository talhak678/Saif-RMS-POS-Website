import { Link } from "react-router-dom";
import MainBanner2 from "../components/MainBanner2";
import { Home2IconWrapper } from "../elements/JsonData";
import Home2OurMenu from "../components/Home2OurMenu";
import Home2SpacialMenu from "../components/Home2SpacialMenu";
import { IMAGES } from "../constent/theme";
import Home2AreMenu from "../components/Home2AreMenu";
import TeamCarosel from "../components/TeamCarosel";
import Home2Testimonial from "../components/Home2Testimonial";
import Home2OurBlog from "../components/Home2OurBlog";
import { useEffect } from "react";

const Home2 = () => {
  useEffect(() => {
    document.body.setAttribute("data-color", "color_2");
  }, []);
  return (
    <div className="page-content bg-white">
      <MainBanner2 />
      <section className="content-inner bg-white">
        <div className="container">
          <div className="row icon-wrapper2 gx-lg-5">
            {Home2IconWrapper.map(({ icon, title }, ind) => (
              <div className="col-lg-4 col-md-6 m-b30 wow fadeInUp" key={ind}>
                <div className="icon-bx-wraper style-2">
                  <div className="icon-bx radius">
                    <span className="icon-cell">
                      <i className={icon}></i>
                    </span>
                  </div>
                  <div className="icon-content">
                    <h5 className="dz-title">
                      <Link to="/services">{title}</Link>
                    </h5>
                    <p>lorem ipsum dolor shit amet lorem ipsum</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="content-inner-1 overflow-hidden pt-0">
        <div className="container">
          <div className="section-head menu-align">
            <h2 className="title mb-0 wow flipInX">Browse Our Menu</h2>
            <div className="pagination-align wow fadeInUp">
              <div className="menu-button-prev1 btn-prev rounded-xl btn-hover-2">
                <i className="fa-solid fa-arrow-left"></i>
              </div>
              <div className="menu-button-next1 btn-next rounded-xl btn-hover-2">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
        <Home2OurMenu prev={"menu-button-prev1"} next={"menu-button-next1"} />
      </section>
      <section
        className="section-wrapper-5 content-inner overflow-hidden bg-parallax"
        style={{
          backgroundImage: `url(${IMAGES.background_pic1})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title text-white wow flipInX">Today's Special</h2>
          </div>
          <Home2SpacialMenu />
        </div>
      </section>
      <section className="content-inner-1">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Are Menu</h2>
          </div>
          <Home2AreMenu />
        </div>
      </section>
      <section
        className="section-wrapper-4 content-inner overflow-hidden bg-parallax"
        style={{ backgroundImage: `url(${IMAGES.background_pic10})` }}
      >
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Meet The</h2>
          </div>
          <TeamCarosel />
        </div>
      </section>
      <section className="content-inner-2 overflow-hidden">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Customer's Comment</h2>
          </div>
          <Home2Testimonial />
        </div>
      </section>
      <Home2OurBlog />
    </div>
  );
};

export default Home2;
