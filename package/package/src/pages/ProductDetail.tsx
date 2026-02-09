import { useState } from "react";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { Link } from "react-router-dom";
import ProductDetailTabs from "../elements/ProductDetailTabs";
import HomeSpacialMenu from "../elements/HomeSpacialMenu";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title="Product Detail"
        subtitle="Product Detail"
      />
      <section className="content-inner-1 overflow-hidden">
        <div className="container">
          <div className="row product-detail">
            <div className="col-lg-4 col-md-5">
              <div className="detail-media m-b30">
                <img src={IMAGES.modal_pic1} alt="/" />
              </div>
            </div>
            <div className="col-lg-8 col-md-7">
              <div className="detail-info">
                <span className="badge">
                  <svg
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
                  Pure veg
                </span>
                <div className="dz-head">
                  <h2 className="title">Double Patty Veg Burger</h2>
                  <div className="rating">
                    <i className="fa-solid fa-star"></i>{" "}
                    <span>
                      <strong className="text-dark">4.5</strong> - 20 Reviews
                    </span>
                  </div>
                </div>
                <p className="text">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book.
                </p>
                <ul className="detail-list">
                  <li>
                    Price <span className="text-primary m-t5">$20.00</span>
                  </li>
                  <li>
                    Quantity
                    <div className="btn-quantity style-1 m-t5">
                      <div className="input-group bootstrap-touchspin">
                        <span className="input-group-addon bootstrap-touchspin-prefix"></span>
                        <input
                          id="demo_vertical2"
                          type="text"
                          defaultValue={quantity}
                          key={quantity}
                          name="demo_vertical2"
                          className="form-control"
                        />
                        <span className="input-group-addon bootstrap-touchspin-postfix"></span>
                        <span className="input-group-btn-vertical">
                          <button
                            className="btn btn-default bootstrap-touchspin-up"
                            type="button"
                            onClick={() => {
                              setQuantity(quantity + 1);
                            }}
                          >
                            <i className="ti-plus"></i>
                          </button>
                          <button
                            className="btn btn-default bootstrap-touchspin-down"
                            type="button"
                            onClick={() => {
                              setQuantity(
                                quantity > 0 ? quantity - 1 : quantity
                              );
                            }}
                          >
                            <i className="ti-minus"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
                <h6 className="title">Add On</h6>
                <DetailList />
                <div className="d-lg-flex justify-content-between">
                  <ul className="modal-btn-group">
                    <li>
                      <Link
                        to="/shop-cart"
                        className="btn btn-primary btn-hover-1"
                      >
                        <span>
                          Add To Cart{" "}
                          <i className="flaticon-shopping-bag-1 m-l10"></i>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/shop-checkout"
                        className="btn btn-outline-secondary btn-hover-1"
                      >
                        <span>
                          Buy Now{" "}
                          <i className="flaticon-shopping-cart m-l10"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <Avatar />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductDetailTabs />
      <section className="content-inner-1 pt-0">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title">Special Menu</h2>
          </div>
          <HomeSpacialMenu />
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
export function DetailList() {
  return (
    <>
      <ul className="add-product">
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic1} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">French Frise</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic2} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">Extra Cheese</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic3} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">Coca Cola</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="mini-modal">
            <div className="dz-media">
              <img src={IMAGES.modal_mini_pic4} alt="/" />
            </div>
            <div className="dz-content">
              <p className="title">Choco Lava</p>
              <div className="form-check search-content">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
}

export function Avatar() {
  return (
    <>
      <ul className="avatar-list avatar-list-stacked">
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic1} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic2} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic3} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic4} alt="" />
        </li>
        <li className="avatar">
          <img src={IMAGES.testiminial_small_pic5} alt="" />
        </li>
        <li className="avatar">
          <span>150+</span>
        </li>
      </ul>
    </>
  );
}
