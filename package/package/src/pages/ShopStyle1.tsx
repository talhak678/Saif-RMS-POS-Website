import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import ShopStyle1LeftContent from "../elements/ShopStyle1LeftContent";
import ShopStyle1RightContent from "../elements/ShopStyle1RightContent";

const ShopStyle1 = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title="Shop Style 1"
        subtitle="Shop Style 1"
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
                      type="reset"
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
                <Link to="#" className="btn btn-primary panel-btn">
                  Filter
                </Link>
              </div>
              <ShopStyle1RightContent />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopStyle1;
