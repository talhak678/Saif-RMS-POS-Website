import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { HomeSpacialMenunArr } from "../elements/JsonData";

const ShopWishlist = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr5}
        title="Shop Wishlist"
        subtitle="Shop Wishlist "
      />
      <div className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 m-b30">
              <div className="table-responsive">
                <table className="table check-tbl table-responsive-md">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Product Name</th>
                      <th>Unit Price</th>
                      <th>Add to cart </th>
                      <th className="text-end">Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HomeSpacialMenunArr.map(({ img, title }, ind) => (
                      <tr key={ind}>
                        <td className="product-item-img">
                          <img src={img} alt="/" />
                        </td>
                        <td className="product-item-name">{title}</td>
                        <td className="product-item-price">$35.00</td>
                        <td className="product-item-totle">
                          <Link
                            to="/shop-cart"
                            className="btn btn-gray btn-hover-2"
                          >
                            Add To Cart
                          </Link>
                        </td>
                        <td className="product-item-close">
                          <Link to="#" className="bg-danger">
                            <i className="fa fa-close"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopWishlist;
