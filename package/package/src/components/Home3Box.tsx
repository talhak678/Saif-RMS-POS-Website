import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";

const Home3Box = () => {
  return (
    <section className="content-inner overflow-hidden pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 m-b30 wow fadeInUp">
            <div
              className="adv-box style-1"
              style={{
                backgroundImage: `url(${IMAGES.images_adv_pic2})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <div className="adv-content">
                <span className="special">FRIDAY SPECIAL</span>
                <h4 className="title">TASTY BURGER</h4>
              </div>
              <div className="adv-media">
                <img
                  className="main-media"
                  src={IMAGES.images_adv_pic1}
                  alt="/"
                />
                <div className="item-media offer-label">
                  <img src={IMAGES.images_adv_label} alt="/" />
                  <span className="">50% OFF</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-lg-6 col-md-6 m-b30 wow fadeInUp">
                <div className="adv-box style-2">
                  <div className="adv-media">
                    <img src={IMAGES.images_adv_pic3} alt="/" />
                  </div>
                  <div className="adv-content">
                    <span className="special text-white">TODAY SPECIAL</span>
                    <h4 className="title text-white">Nodels</h4>
                    <span className="price">60% OFF</span>
                    <Link to="/shop-cart" className="btn btn-white btn-hover-3">
                      <span className="btn-text" data-text="Add To Cart">
                        Add To Cart
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 m-b30 wow fadeInUp">
                <div
                  className="adv-box style-3"
                  style={{
                    background: `url(${IMAGES.background_pic15})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="adv-content">
                    <span className="special text-white">MUSHROOM</span>
                    <h4 className="title">BURGER</h4>
                    <Link to="/shop-cart" className="btn btn-white btn-hover-3">
                      <span className="btn-text" data-text="Add To Cart">
                        Add To Cart
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.8s">
                <div
                  className="adv-box style-4"
                  style={{
                    background: `url(${IMAGES.background_pic15})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="adv-media">
                    <img src={IMAGES.images_adv_pic4} alt="/" />
                  </div>
                  <div className="adv-content">
                    <span className="special text-white">
                      FOR LIMITED TIME ONLY
                    </span>
                    <h4 className="price">35% Offer</h4>
                  </div>
                  <Link to="/shop-cart" className="btn btn-white btn-hover-3">
                    <span className="btn-text" data-text="Add To Cart">
                      Add To Cart
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home3Box;
