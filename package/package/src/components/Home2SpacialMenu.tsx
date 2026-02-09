import { Link } from "react-router-dom";
import { Home2SpacialMenuArr } from "../elements/JsonData";

const Home2SpacialMenu = () => {
  return (
    <div className="row">
      {Home2SpacialMenuArr.map(({ img, name, price }, ind) => (
        <div className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp" key={ind}>
          <div className="dz-img-box style-5">
            <div className="dz-content">
              <div className="weight">
                <span>{name}</span>
                <span>756g</span>
              </div>
              <div className="price">
                <h6>{name}</h6>
                <h6 className="text-primary">{price}</h6>
              </div>
            </div>
            <div className="dz-media">
              <img src={img} alt="/" />
              <Link className="detail-btn" to="/our-menu-1">
                <i className="fa-solid fa-plus"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home2SpacialMenu;
