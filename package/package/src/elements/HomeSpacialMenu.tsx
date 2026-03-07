import { useState } from "react";
import { Link } from "react-router-dom";
import { HomeSpacialMenunArr } from "./JsonData";

const HomeSpacialMenu = () => {
  const [addActive, setActive] = useState<number>(1);
  return (
    <>
      <style>
        {`
          @media (max-width: 576px) {
            .dz-img-box.style-2 {
              text-align: center !important;
              padding: 15px !important;
            }
            .dz-img-box.style-2 .dz-media {
              height: 180px !important;
              margin-bottom: 15px !important;
            }
            .dz-img-box.style-2 .dz-title {
              font-size: 18px !important;
            }
            .dz-img-box.style-2 p {
              font-size: 13px !important;
            }
          }
        `}
      </style>
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
              className={`dz-img-box style-2 box-hover ${addActive === ind ? "active" : ""
                }`}
            >
              <div className="dz-media">
                <img src={img} alt="/" />
              </div>
              <div className="dz-content">
                <h4 className="dz-title">
                  <Link to="/product-detail">{name}</Link>
                </h4>
                <p>Freshly prepared with the best ingredients.</p>
                <h5 className="dz-price text-primary">{price}</h5>
                <Link to="/shop-cart" className="btn btn-primary">
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
