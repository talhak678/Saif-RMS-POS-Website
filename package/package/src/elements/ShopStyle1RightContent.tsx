import { Link } from "react-router-dom";
import { Shop1RightContentArr } from "./JsonData";

const ShopStyle1RightContent = () => {
  return (
    <>
      {Shop1RightContentArr.map(({ img }, ind) => (
        <div className="dz-shop-card style-1" key={ind}>
          <div className="dz-media">
            <img src={img} alt="/" />
          </div>
          <div className="dz-content">
            <div className="dz-head">
              <h6 className="dz-name mb-0">
                <svg
                  className="m-r10"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="16"
                    height="16"
                    stroke="#0F8A65"
                  />
                  <circle cx="8.5" cy="8.5" r="5.5" fill="#0F8A65" />
                </svg>
                <Link to="#">Double Patty Burger</Link>
              </h6>
              <div className="rate">
                <i className="fa-solid fa-star"></i> 4.5
              </div>
            </div>
            <div className="dz-body">
              <ul className="dz-meta">
                <li>
                  By{" "}
                  <span className="text-primary font-weight-500">
                    {" "}
                    Burger Farm
                  </span>
                </li>
                <li>
                  <i className="flaticon-scooter"></i> 30 min
                </li>
              </ul>
              <p className="mb-0">
                <span className="text-primary font-weight-500">$15.00</span> For
                a one
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopStyle1RightContent;
