import { useEffect } from "react";
import Home3BookTable from "../components/Home3BookTable";
import Home3Box from "../components/Home3Box";
import Home3OurMenu from "../components/Home3OurMenu";
import MainBanner3 from "../components/MainBanner3";
import { IMAGES } from "../constent/theme";
import HomeSpacialMenu from "../elements/HomeSpacialMenu";
import { Home3ServicesArr } from "../elements/JsonData";

const Home3 = () => {
  useEffect(() => {
    document.body.setAttribute("data-color", "color_3");
  }, []);
  return (
    <div className="page-content bg-white">
      <MainBanner3 />
      <Home3Box />
      <section className="content-inner bg-white section-wrapper-2 overflow-hidden">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Our Featured Food</h2>
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

      <section
        className="section-wrapper-4 content-inner overflow-hidden bg-parallax"
        style={{
          backgroundImage: `url(${IMAGES.background_pic10})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">Why Choose Us ?</h2>
          </div>
          <div className="row">
            {Home3ServicesArr.map(({ icon, content }, ind) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp"
                key={ind}
              >
                <div className="icon-bx-wraper style-4">
                  <div className="icon-bx">
                    <div className="icon-cell">
                      <i className={icon}></i>
                    </div>
                  </div>
                  <div className="icon-content">
                    <p>{content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="content-inner section-wrapper-6 p-b40">
        <div className="container inner-section-wrapper">
          <div className="section-head text-center">
            <h2 className="title wow flipInX">From Our Menu</h2>
          </div>
          <Home3OurMenu />
        </div>
        <Home3BookTable />
      </section>
    </div>
  );
};

export default Home3;
