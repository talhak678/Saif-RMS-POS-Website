import { useState } from "react";
import { HomeImageBoxArr } from "./JsonData";
import { Link } from "react-router-dom";

const HomeImageBox = () => {
  const [addActive, setActive] = useState<number>(1);
  const [activebox, setActivebox] = useState<number>(1);
  return (
    <>
      <div className="row inner-section-wrapper">
        {HomeImageBoxArr.map(({ img, name, price }, ind) => (
          <div className="col-lg-3 col-md-6 col-sm-6 m-b30" key={ind}>
            <div
              onMouseEnter={() => {
                setActive(ind);
              }}
              className={`dz-img-box style-3 box-hover ${
                addActive === ind ? "active" : ""
              }`}
            >
              <div className="dz-media">
                <img src={img} alt="/" />
              </div>
              <span className="dz-tag">TOP SELLER</span>
              <div className="dz-content">
                <h5 className="dz-title">
                  <Link to="/our-menu-1">{name}</Link>
                </h5>
                <p>Lorem ipsum dolor sit amet, dipiscing elit, sed</p>
              </div>
              <div className="dz-hover-content">
                <div className="dz-info">
                  <h5 className="dz-title mb-0">
                    <Link to="/our-menu-1">Pasta</Link>
                  </h5>
                  <span className="dz-price">{price}</span>
                </div>
                <Link
                  to="/shop-cart"
                  className="btn btn-cart btn-white text-primary btn-square"
                >
                  <i className="flaticon-shopping-cart"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12 text-center m-t10">
          <Link to="/our-menu-2" className="btn btn-md btn-primary btn-hover-1">
            <span>See All Dishes</span>
          </Link>
        </div>
      </div>
      <div className="section-head text-center">
        <h2 className="title wow flipInX">Quality Services</h2>
      </div>

      <div className="icon-wrapper1">
        <div className="row wow fadeInUp">
          {HomeImageBoxArr.map(({ img2, icon, title }, ind) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={ind}>
              <div
                onMouseEnter={() => {
                  setActivebox(ind);
                }}
                className={`icon-bx-wraper style-1 box-hover center ${
                  activebox === ind ? "active" : ""
                }`}
                style={{ backgroundImage: `url(${img2})` }}
              >
                <div className="inner-content">
                  <div className="icon-bx m-b25">
                    <span className="icon-cell icon-md">
                      <i className={icon}></i>
                    </span>
                  </div>
                  <div className="icon-content">
                    <h5 className="dz-title">{title}</h5>
                    <p>Lorem ipsum dolor sit amet, dipiscing elit, sed</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeImageBox;
