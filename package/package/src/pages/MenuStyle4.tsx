import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { useContext, useRef, useState } from "react";
import { MenuStyle4Arr } from "../elements/JsonData";
import OurMenuFilter from "../elements/OurMenuFilter";
import { Context } from "../context/AppContext";

const Buttons = [
  { icon: "flaticon-fast-food", title: "ALL" },
  { icon: "flaticon-cocktail", title: "COLD DRINK" },
  { icon: "flaticon-pizza-slice", title: "PIZZA" },
  { icon: "flaticon-salad", title: "SALAD" },
  { icon: "flaticon-cupcake", title: "SWEETS" },
  { icon: "flaticon-chili-pepper", title: "SPICY" },
  { icon: "flaticon-hamburger-1", title: "BURGER" },
];

interface MenuFile {
  img: string;
  categery: string;
  name: string;
  price: string;
}

const MenuStyle4 = () => {
  const [active, setActive] = useState<number>(0);
  const [hoverActive, setHoverActive] = useState<number>();
  const [data, setData] = useState<MenuFile[]>(MenuStyle4Arr);
  const cardRef = useRef<HTMLLIElement[]>([]); 
  const { setShowCategeryFilter } = useContext(Context);
  const filterGallery = (name: string) => {
    if (cardRef.current) {
      cardRef.current.forEach((ele) => {
        if (ele) {
          ele.style.transform = "scale(0)";
        }
      });

      const updateItems = MenuStyle4Arr.filter((el: MenuFile) =>
        el.categery.includes(name)
      );

      setData(updateItems);

      setTimeout(() => {
        cardRef.current.forEach((ele) => {
          if (ele) {
            ele.style.transform = "scale(1)";
          }
        });
      }, 100);
    }
  };

  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr4}
        title="Our Menu 4"
        subtitle="Our Menu 4"
      />

      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 col-lg-9 col-md-12">
              <div className="site-filters style-1 clearfix">
                <ul className="filters">
                  {Buttons.map(({ icon, title }, ind) => (
                    <li
                      className={active === ind ? "active" : ""}
                      key={ind}
                      onClick={() => {
                        setActive(ind);
                        filterGallery(title);
                      }}
                    >
                      <Link to="#">
                        <span>
                          <i className={icon}></i>
                        </span>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-12 text-lg-end mb-lg-0 m-b30 d-flex d-lg-block align-items-center justify-content-between">
              <strong className="filter-item-show d-lg-none">
                51,740 items
              </strong>
              <Link
                to={"#"}
                className="btn btn-primary filter-btn btn-hover-2"
                onClick={() => {
                  setShowCategeryFilter(true);
                }}
              >
                Filter{" "}
                <span>
                  <i className="icon-filter m-l5"></i>
                </span>
              </Link>
            </div>
            <OurMenuFilter />
          </div>

          <ul id="masonry" className="row">
            {data.map(({ img, name, price }, ind) => (
              <li
                className="card-container col-xl-3 col-lg-4 col-md-6 m-b30 "
                style={{ transition: "all .2s" }}
                key={ind}
                ref={(node) => {
                  if (node) {
                    cardRef.current.push(node);
                  }
                }}
              >
                <div
                  className={`dz-img-box style-4 box-hover ${
                    hoverActive === ind ? "active" : ""
                  }`}
                  onMouseEnter={() => {
                    setHoverActive(ind);
                  }}
                >
                  <div className="menu-detail">
                    <div className="dz-media">
                      <img src={img} alt="/" />
                    </div>
                    <div className="dz-content">
                      <h5 className="title">
                        <Link to="/product-detail">{name}</Link>
                      </h5>
                      <p>Delicious and Spicy</p>
                    </div>
                  </div>
                  <div className="menu-footer">
                    <span>Regular Price</span>
                    <h5 className="price">{price}</h5>
                  </div>
                  <Link className="detail-btn" to="/product-detail">
                    <i className="fa-solid fa-plus"></i>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MenuStyle4;
