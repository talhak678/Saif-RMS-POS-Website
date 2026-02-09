import { useContext } from "react";
import { Context } from "../context/AppContext";
import RangeSlider from "rsuite/RangeSlider";
const OurMenuFilter = () => {
  const { showCategeryFilter, setShowCategeryFilter } = useContext(Context);

  return (
    <>
      <div
        className={`offcanvas offcanvas-end filter-category-sidebar ${
          showCategeryFilter ? "show" : ""
        }`}
        tabIndex={1}
        id="offcanvasFilter"
      >
        <button
          type="button"
          className="btn-close style-1"
          onClick={() => {
            setShowCategeryFilter(false);
          }}
        >
          <i className="la la-close"></i>
        </button>
        <div className="offcanvas-body">
          <div className="widget">
            <div className="widget-title">
              <h4 className="title">Refine By Categories</h4>
            </div>
            <div className="category-check-list">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-01"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-01"
                >
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
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-02"
                >
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
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-03"
                >
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
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-04"
                >
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
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-05"
                >
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
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-06"
                >
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
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-07"
                >
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
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-08"
                >
                  Hot Dog
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-09"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-09"
                >
                  Noodles
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-10"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-10"
                >
                  Macrony
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-11"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-11"
                >
                  Cheese Pasta
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-12"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-12"
                >
                  Fish Fry
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-13"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-13"
                >
                  Cold Coffee
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-14"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-14"
                >
                  Manchurian
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-15"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-15"
                >
                  Dosa
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-16"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-16"
                >
                  Momos
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-17"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-17"
                >
                  Soup
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-18"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-18"
                >
                  Chicken Burger
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-19"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-19"
                >
                  Beverages
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="productCheckBox-20"
                />
                <label
                  className="form-check-label"
                  htmlFor="productCheckBox-20"
                >
                  Lemon Lime Soda
                </label>
              </div>
            </div>
          </div>
          <div className="widget">
            <div className="widget-title">
              <h4 className="title">Near Me</h4>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-21"
              />
              <label className="form-check-label" htmlFor="productCheckBox-21">
                Ortus Restaurant
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-22"
              />
              <label className="form-check-label" htmlFor="productCheckBox-22">
                Amar Punjabi Restaurant
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="productCheckBox-23"
              />
              <label className="form-check-label" htmlFor="productCheckBox-23">
                Other
              </label>
            </div>
          </div>
          <div className="widget rating-filter">
            <div className="widget-title">
              <h4 className="title">Rating</h4>
            </div>
            <ul>
              <li>
                <span>5 Star</span>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
            </ul>
            <ul>
              <li>
                <span>4 Star</span>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
            </ul>
            <ul>
              <li>
                <span>3 Star</span>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
            </ul>
            <ul>
              <li>
                <span>2 Star</span>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
            </ul>
            <ul>
              <li>
                <span>1 Star</span>
              </li>
              <li>
                <i className="icon-star-on"></i>
              </li>
            </ul>
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
      </div>
      <div
        className={`fade ${
          showCategeryFilter ? "show offcanvas-backdrop" : ""
        }`}
        onClick={() => {
          setShowCategeryFilter(false);
        }}
      ></div>
    </>
  );
};

export default OurMenuFilter;
