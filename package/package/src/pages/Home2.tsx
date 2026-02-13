import { useEffect } from "react";
import MainBanner2 from "../components/MainBanner2";

import Home2OurMenu from "../components/Home2OurMenu";
import Home2SpacialMenu from "../components/Home2SpacialMenu";
import { IMAGES } from "../constent/theme";
import Home3OurMenu from "../components/Home3OurMenu";

import Home2Testimonial from "../components/Home2Testimonial";



const Home2 = () => {
  useEffect(() => {
    document.body.setAttribute("data-color", "color_2");
  }, []);
  return (
    <div className="page-content bg-white">
      <MainBanner2 />

      <section className="content-inner-1 overflow-hidden mt-5">
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
        id="todays-special"
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
            <h2 className="title wow flipInX">Our Menu</h2>
          </div>
          <Home3OurMenu />
        </div>
      </section>

      <section className="content-inner-2 overflow-hidden" style={{ marginBottom: '100px' }}>
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Customer's Comment</h2>
          </div>
          <Home2Testimonial />
        </div>
      </section>

    </div>
  );
};

export default Home2;
