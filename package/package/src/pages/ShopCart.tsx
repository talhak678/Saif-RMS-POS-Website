import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import ShopStyle1RightContent from "../elements/ShopStyle1RightContent";
import { shopArr } from "../elements/JsonData";
import { useState } from "react";

interface newType {
  img: string;
  num: number;
  title: string;
}
const ShopCart = () => {
  const [data, setData] = useState<newType[]>(shopArr);
  const [filterSidebar, setFilterSidebar] = useState<boolean>(false);

  const qtyButton = (index: number, value: string) => {
    switch (value) {
      case "increament":
        setData(
          data.map((item, ind) => {
            if (index == ind) {
              return { ...item, num: item.num + 1 };
            }
            return item;
          })
        );
        break;
      case "decreament":
        setData(
          data.map((item, ind) => {
            if (index == ind) {
              return { ...item, num: item.num > 0 ? item.num - 1 : item.num };
            }
            return item;
          })
        );
        break;
      case "delet":
        setData(
          data.filter((el, i) => {
            if (el) {
              return i !== index;
            }
            return el;
          })
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr4}
        title="Shop Cart"
        subtitle="Shop Cart"
      />
      <section className="content-inner-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="title m-b15 m-lg-30">Related Products</h5>
                <Link
                  to="#"
                  className="btn btn-primary panel-btn"
                  onClick={() => {
                    setFilterSidebar(true);
                  }}
                >
                  Filter
                </Link>
              </div>
              <ShopStyle1RightContent />
            </div>
            <div className="col-lg-4">
              <aside className="side-bar sticky-top">
                <div
                  className={`shop-filter style-1 ${
                    filterSidebar ? "show" : ""
                  }`}
                >
                  <div className="d-flex justify-content-between">
                    <div className="widget-title">
                      <h5 className="title m-b30">
                        Cart <span className="text-primary">(03)</span>
                      </h5>
                    </div>
                    <Link
                      to={"#"}
                      className="panel-close-btn"
                      onClick={() => {
                        setFilterSidebar(false);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </Link>
                  </div>
                  {data.map(({ img, num, title }, ind) => (
                    <div className="cart-item style-1" key={ind}>
                      <div className="dz-media">
                        <img src={img} alt="/" />
                      </div>
                      <div className="dz-content">
                        <div className="dz-head">
                          <h6 className="title mb-0">{title}</h6>
                          <Link
                            to={"#"}
                            onClick={() => {
                              qtyButton(ind, "delet");
                            }}
                          >
                            <i className="fa-solid fa-xmark text-danger"></i>
                          </Link>
                        </div>
                        <div className="dz-body">
                          <div className="btn-quantity style-1">
                            <div className="input-group bootstrap-touchspin">
                              <span className="input-group-addon bootstrap-touchspin-prefix"></span>
                              <input
                                id="demo_vertical2"
                                type="text"
                                defaultValue={num}
                                key={num}
                                name="demo_vertical2"
                                className="form-control"
                              />
                              <span className="input-group-addon bootstrap-touchspin-postfix"></span>
                              <span className="input-group-btn-vertical">
                                <button
                                  className="btn btn-default bootstrap-touchspin-up"
                                  type="button"
                                  onClick={() => {
                                    qtyButton(ind, "increament");
                                  }}
                                >
                                  <i className="ti-plus"></i>
                                </button>
                                <button
                                  className="btn btn-default bootstrap-touchspin-down"
                                  type="button"
                                  onClick={() => {
                                    qtyButton(ind, "decreament");
                                  }}
                                >
                                  <i className="ti-minus"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                          <h5 className="price text-primary mb-0">$50.20</h5>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="order-detail">
                    <h6>Bill Details</h6>
                    <table>
                      <tbody>
                        <tr>
                          <td>Item Total</td>
                          <td className="price text-primary">$55.00</td>
                        </tr>
                        <tr className="charges">
                          <td>Delivery Charges</td>
                          <td className="price text-primary">$5.00</td>
                        </tr>
                        <tr className="tax">
                          <td>Govt Taxes & Other Charges</td>
                          <td className="price text-primary">$3.50</td>
                        </tr>
                        <tr className="total">
                          <td>
                            <h6>Total</h6>
                          </td>
                          <td className="price text-primary">$63.50</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link
                      to="/shop-checkout"
                      className="btn btn-primary d-block text-center btn-md w-100 btn-hover-1"
                    >
                      <span>
                        Order Now <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopCart;
