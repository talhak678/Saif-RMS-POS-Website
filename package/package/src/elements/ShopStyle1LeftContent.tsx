import { Link } from "react-router-dom";
import RangeSlider from "rsuite/RangeSlider";

const ShopStyle1LeftContent = () => {
  return (
    <div className="col-lg-3">
      <aside className="side-bar left sticky-top">
        <div className="shop-filter">
          <div className="widget widget_tag_cloud ">
            <div className="d-flex justify-content-between">
              <div className="widget-title">
                <h4 className="title">Current Search</h4>
              </div>
              <Link to="#" className="panel-close-btn">
                <i className="fa-solid fa-xmark"></i>
              </Link>
            </div>
            <div className="tagcloud">
              <Link to="/product-detail">Burger</Link>
              <Link to="/product-detail">Restaurant</Link>
              <Link to="/product-detail">Pizza</Link>
            </div>
          </div>
          <div className="widget dz-widget_services">
            <div className="widget-title">
              <h4 className="title">Refine By Categories</h4>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-01"
              />
              <label className="form-check-label" htmlFor="productCheckBox-01">
                Pizza
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-02"
              />
              <label className="form-check-label" htmlFor="productCheckBox-02">
                Hamburger
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-03"
              />
              <label className="form-check-label" htmlFor="productCheckBox-03">
                Cold Drink
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-04"
              />
              <label className="form-check-label" htmlFor="productCheckBox-04">
                Sandwich
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-05"
              />
              <label className="form-check-label" htmlFor="productCheckBox-05">
                Muffin
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-06"
              />
              <label className="form-check-label" htmlFor="productCheckBox-06">
                Burrito
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-07"
              />
              <label className="form-check-label" htmlFor="productCheckBox-07">
                Taco
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-08"
              />
              <label className="form-check-label" htmlFor="productCheckBox-08">
                Hot Dog
              </label>
            </div>
          </div>
          <div className="widget">
            <div className="widget-title">
              <h4 className="title">Price Range</h4>
            </div>
            <RangeSlider
              defaultValue={[10.0, 70.0]}
              tooltip={true}
              step={0.01}
              className="slider-style-1"
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ShopStyle1LeftContent;
