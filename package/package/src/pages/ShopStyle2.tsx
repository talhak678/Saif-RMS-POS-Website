import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { MenuStyle3Arr } from "../elements/JsonData";
import ShopStyle1LeftContent from "../elements/ShopStyle1LeftContent";

const ShopStyle2 = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr2}
        title="Shop Style 2"
        subtitle="Shop Style 2"
      />
      <section className="content-inner-1">
        <div className="container">
          <div className="row search-wraper text-center">
            <div className="col-lg-8 m-auto">
              <form>
                <div className="input-group">
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Type here"
                  />
                  <div className="input-group-addon">
                    <button
                      name="submit"
                      value="submit"
                      type="submit"
                      className="btn btn-primary btn-hover-2"
                    >
                      <span>Search</span>
                      <i className="icon-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <ShopStyle1LeftContent />
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="title mb-md-3 mb-lg-4 m-b20 d-none d-lg-block">
                  Search Results
                </h5>
                <strong className="filter-item-show m-b20">
                  Search: 51,740 items
                </strong>
                <Link to={"#"} className="btn btn-primary panel-btn">
                  Filter
                </Link>
              </div>
              <ul id="masonry" className="row">
                {MenuStyle3Arr.map(({ img, name }, ind) => (
                  <li
                    className="card-container col-xl-4 col-md-6 m-b30"
                    key={ind}
                  >
                    <div className="dz-img-box style-7">
                      <div className="dz-media">
                        <img src={img} alt="/" />
                        <div className="dz-meta">
                          <ul>
                            <li className="seller">Top Seller</li>
                            <li className="rating">
                              <i className="fa-solid fa-star"></i> 4.5
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="dz-content">
                        <h5 className="title">
                          <Link to="/product-detail">{name}</Link>
                        </h5>
                        <p>
                          It is Link long established fact that Link reader will
                          be distracted.
                        </p>
                        <span className="price">$4.56</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopStyle2;
