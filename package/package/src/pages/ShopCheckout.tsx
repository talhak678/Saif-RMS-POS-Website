import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";

const options = [
  { value: "Åland Islands", label: "Åland Islands" },
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Anguilla", label: "Anguilla" },
  { value: "Antarctica", label: "Antarctica" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Aruba", label: "Aruba" },
  { value: "Australia", label: "Australia" },
];

interface OptionParams {
  isFocused: boolean;
  isSelected: boolean;
}

const colourStyles = {
  option: (styles: any, { isFocused, isSelected }: OptionParams) => {
    return {
      ...styles,
      backgroundColor: isSelected
        ? "var(--primary)"
        : isFocused
        ? "#f2f2f4"
        : null,
      color: isSelected ? "#fff" : "#333333",
    };
  },
};

const ShopCheckout = () => {
  const [open, setOpen] = useState(false);
  const [colleps, setColleps] = useState(false);
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr3}
        title="Shop Checkout"
        subtitle="Shop Checkout"
      />

      <section className="content-inner">
        <div className="container">
          <form className="shop-form">
            <div className="row">
              <div className="col-lg-6">
                <div className="widget">
                  <h4 className="widget-title">Billing & Shipping Address</h4>
                  <FormGroup />

                  <Button
                    style={{ border: "none" }}
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                    className="btn btn-gray btnhover mb-3"
                  >
                    Create an account <i className="fa fa-angle-down m-l10"></i>
                  </Button>
                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      <p>
                        Create an account by entering the information below. If
                        you are a returning customer please login at the top of
                        the page.
                      </p>
                      <div className="form-group">
                        <input
                          name="Password"
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>

              <div className="col-lg-6">
                <div>
                  <Button
                    style={{ border: "none" }}
                    onClick={() => setColleps(!colleps)}
                    aria-controls="example-collapse-text"
                    aria-expanded={colleps}
                    className="btn btn-gray btnhover mb-3"
                  >
                    Ship to a different address{" "}
                    <i className="fa fa-angle-down m-l10"></i>
                  </Button>
                  <Collapse in={colleps}>
                    <div id="example-collapse-text">
                      <p>
                        If you have shopped with us before, please enter your
                        details in the boxes below. If you are a new customer
                        please proceed to the Billing & Shipping section.
                      </p>

                      <FormGroup />
                      <p>
                        Create an account by entering the information below. If
                        you are a returning customer please login at the top of
                        the page.
                      </p>
                    </div>
                  </Collapse>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows={5}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
          <MenuList />
        </div>
      </section>
    </div>
  );
};

export default ShopCheckout;

export function FormGroup() {
  return (
    <>
      <div className="form-group m-b20">
        <Select
          className="form-select default-select"
          classNamePrefix="select"
          defaultValue={options[0]}
          isClearable={false}
          options={options}
          styles={colourStyles}
        />
      </div>
      <div className="row">
        <div className="form-group col-md-6 m-b20">
          <input
            name="dzFirstName"
            required
            type="text"
            className="form-control"
            placeholder="First Name"
          />
        </div>
        <div className="form-group col-md-6 m-b20">
          <input
            name="dzLastName"
            required
            type="text"
            className="form-control"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="form-group m-b20">
        <input
          name="dzOther[CompanyType]"
          required
          type="text"
          className="form-control"
          placeholder="Company Name"
        />
      </div>
      <div className="form-group m-b20">
        <input
          name="dzOther[Address]"
          required
          type="text"
          className="form-control"
          placeholder="Address"
        />
      </div>
      <div className="row">
        <div className="form-group col-md-6 m-b20">
          <input
            name="dzOther[Other]"
            required
            type="text"
            className="form-control"
            placeholder="Apartment, suite, unit etc."
          />
        </div>
        <div className="form-group col-md-6 m-b20">
          <input
            name="dzOther[Town/City]"
            required
            type="text"
            className="form-control"
            placeholder="Town / City"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 m-b20">
          <input
            name="dzOther[State/County]"
            required
            type="text"
            className="form-control"
            placeholder="State / County"
          />
        </div>
        <div className="form-group col-md-6 m-b20">
          <input
            name="Postcode/Zip"
            required
            type="text"
            className="form-control"
            placeholder="Postcode / Zip"
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 m-b20">
          <input
            name="dzEmail"
            required
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="form-group col-md-6 m-b20">
          <input
            name="dzPhoneNumber"
            required
            type="text"
            className="form-control dz-number"
            placeholder="Phone"
          />
        </div>
      </div>
    </>
  );
}

const opetion2 = [
  { value: "Credit Card Type", label: "Credit Card Type" },
  { value: "Another option", label: "Another option" },
  { value: "A option", label: "A option" },
  { value: "Potato", label: "Potato" },
];
export function MenuList() {
  return (
    <>
      <div className="dz-divider bg-gray-dark icon-center my-5">
        <i className="fa fa-circle bg-white text-primary"></i>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="widget">
            <h4 className="widget-title">Your Order</h4>
            <table className="table-bordered check-tbl">
              <thead className="text-center">
                <tr>
                  <th>IMAGE</th>
                  <th>PRODUCT NAME</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="product-item-img">
                    <img src={IMAGES.gallery_small_pic4} alt="/" />
                  </td>
                  <td className="product-item-name">Prduct Item 4</td>
                  <td className="product-price">$36.00</td>
                </tr>
                <tr>
                  <td className="product-item-img">
                    <img src={IMAGES.gallery_small_pic3} alt="/" />
                  </td>
                  <td className="product-item-name">Prduct Item 3</td>
                  <td className="product-price">$25.00</td>
                </tr>
                <tr>
                  <td className="product-item-img">
                    <img src={IMAGES.gallery_small_pic2} alt="/" />
                  </td>
                  <td className="product-item-name">Prduct Item 2</td>
                  <td className="product-price">$22.00</td>
                </tr>
                <tr>
                  <td className="product-item-img">
                    <img src={IMAGES.gallery_small_pic1} alt="/" />
                  </td>
                  <td className="product-item-name">Prduct Item 1</td>
                  <td className="product-price">$28.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-6">
          <form className="shop-form widget">
            <h4 className="widget-title">Order Total</h4>
            <table className="table-bordered check-tbl mb-4">
              <tbody>
                <tr>
                  <td>Order Subtotal</td>
                  <td className="product-price">$125.96</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>Free Shipping</td>
                </tr>
                <tr>
                  <td>Coupon</td>
                  <td className="product-price">$28.00</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td className="product-price-total">$506.00</td>
                </tr>
              </tbody>
            </table>
            <h4 className="widget-title">Payment Method</h4>
            <div className="form-group m-b20">
              <input
                type="text"
                className="form-control"
                placeholder="Name on Card"
              />
            </div>
            <div className="form-group m-b20">
              <Select
                className="form-select default-select"
                classNamePrefix="select"
                defaultValue={opetion2[0]}
                isClearable={false}
                options={opetion2}
                styles={colourStyles}
              />
            </div>
            <div className="form-group m-b20">
              <input
                name="dzOther[CreditCardNumber]"
                type="text"
                className="form-control"
                placeholder="Credit Card Number"
              />
            </div>
            <div className="form-group m-b20">
              <input
                name="dzOther[CardVerificationNumber]"
                type="text"
                className="form-control"
                placeholder="Card Verification Number"
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-gray btn-hover-2"
                type="submit"
                value="submit"
                name="submit"
              >
                Place Order Now{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
