import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { useContext, useRef, useState } from "react";
import { MenuStyle3Arr } from "../elements/JsonData";
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
}

const MenuStyle3 = () => {
  const [active, setActive] = useState<number>(0);
  const [data, setData] = useState<MenuFile[]>(MenuStyle3Arr);
  const cardRef = useRef<HTMLLIElement[]>([]); // Assuming the refs are for li elements
  const { setShowCategeryFilter } = useContext(Context);

  const filterGallery = (name: string) => {
    if (cardRef.current) {
      cardRef.current.forEach((ele) => {
        if (ele) {
          ele.style.transform = "scale(0)";
        }
      });

      const updateItems = MenuStyle3Arr.filter((el: MenuFile) =>
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
    <>
      <div className="page-content bg-white">
        <CommonBanner
          img={IMAGES.images_bnr3}
          title="Our Menu 3"
          subtitle="Our Menu 3"
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
              {data.map(({ img, name }, ind) => (
                <li
                  className="card-container col-lg-4 col-md-6 m-b30"
                  style={{ transition: "all .2s" }}
                  key={ind}
                  ref={(node) => {
                    if (node) {
                      cardRef.current.push(node);
                    }
                  }}
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
                        It is a long established fact that a reader will be
                        distracted by the readable.
                      </p>
                      <span className="price">$4.56</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

export default MenuStyle3;
