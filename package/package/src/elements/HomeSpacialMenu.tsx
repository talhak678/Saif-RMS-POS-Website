import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeSpacialMenunArr } from "./JsonData";

const HomeSpacialMenu = () => {
  const [addActive, setActive] = useState<number>(1);
  return (
    <>
      <div className="row">
        {HomeSpacialMenunArr.map(({ name, price, img }, ind) => (
          <div
            className="col-lg-3 col-md-6 col-sm-6 m-b30 wow fadeInUp"
            key={ind}
          >
            <div
              onMouseEnter={() => {
                setActive(ind);
              }}
              className={`dz-img-box style-2 box-hover ${
                addActive === ind ? "active" : ""
              }`}
            >
              <div className="dz-media">
                <img src={img} alt="/" />
              </div>
              <div className="dz-content">
                <h4 className="dz-title">
                  <Link to="/product-detail">{name}</Link>
                </h4>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                <h5 className="dz-price text-primary">{price}</h5>
                <Link to="/shop-cart" className="btn btn-primary btn-hover-2">
                  Add To Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeSpacialMenu;
