import { useContext, useEffect, useMemo } from "react";
import MainBanner from "../components/MainBanner";
import MenuSlider from "../components/MenuSlider";
import OurBlog from "../components/OurBlog";
import TeamCarosel from "../components/TeamCarosel";
import Testymonial from "../components/Testymonial";
import { IMAGES } from "../constent/theme";
import { Context } from "../context/AppContext";
import HomeImageBox from "../elements/HomeImageBox";
import HomeSpacialMenu from "../elements/HomeSpacialMenu";
import Reservation from "../elements/Reservation";

const Home = () => {
  const { setHeaderClass } = useContext(Context);
  useEffect(() => {
    document.body.setAttribute("data-color", "color_1");
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setHeaderClass(false), []);
  return (
    <div className="page-content bg-white">
      <MainBanner />
      <section className="content-inner bg-white section-wrapper-2 overflow-hidden">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Special Menu</h2>
          </div>
          <HomeSpacialMenu />
        </div>
        <img
          className="bg1 dz-move-down"
          src={IMAGES.background_pic2}
          alt="/"
        />
        <img className="bg2 dz-parallax" src={IMAGES.background_pic3} alt="/" />
      </section>
      <section className="content-inner-1 section-wrapper-3 overflow-hidden">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Today's Menu</h2>
          </div>

          <HomeImageBox />
        </div>
        <img className="bg1 dz-parallax" src={IMAGES.background_pic3} alt="/" />
        <img className="bg2 dz-parallax" src={IMAGES.background_pic4} alt="/" />
      </section>
      <section className="content-inner-1 bg-white overflow-hidden pt-sm-0">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">From Our Menu</h2>
          </div>
          <MenuSlider />
        </div>
      </section>

      <section
        className="content-inner-1 section-wrapper-1 bg-parallax"
        style={{
          backgroundImage: `url(${IMAGES.background_pic1})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title text-white wow flipInX">Reservation</h2>
            <Reservation />
          </div>
        </div>
      </section>
      <section className="content-inner-1 section-wrapper-2 right overflow-hidden">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Customer's Comment</h2>
          </div>
          <Testymonial />
        </div>
        <img
          className="bg1 dz-move-down"
          src={IMAGES.background_pic2}
          alt="/"
        />
      </section>
      <section className="content-inner-1 overflow-hidden bg-light">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Master Chefs</h2>
          </div>
        </div>
        <TeamCarosel />
      </section>
      <section className="content-inner-1 overflow-hidden">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">News & blog</h2>
          </div>
          <OurBlog />
        </div>
      </section>
      <div className="map-iframe style-1">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d244934.17139458598!2d75.27787773507539!3d25.125368923263647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1678086292169!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
