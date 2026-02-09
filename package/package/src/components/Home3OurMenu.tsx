import { useState } from "react";
import { Link } from "react-router-dom";
import { Home3OurMenuArr } from "../elements/JsonData";

const buttons = [
  { icon: "flaticon-fast-food", title: "All" },
  { icon: "flaticon-cocktail", title: "COLD DRINK" },
  { icon: "flaticon-pizza-slice", title: "PIZZA" },
  { icon: "flaticon-salad", title: "SALAD" },
  { icon: "flaticon-cupcake", title: "SWEETS" },
  { icon: "flaticon-chili-pepper", title: "SPICY" },
  { icon: "flaticon-hamburger-1", title: "BURGER" },
];

const Home3OurMenu = () => {
  const [addActive, setAddActive] = useState<number>(0);
  const [data, setData] = useState(Home3OurMenuArr);

  const filterButton = (name: string, ind: number) => {
    document.querySelectorAll(".card-container").forEach((ell) => {
      ell.setAttribute("style", "transform:scale(0);");
    });
    setAddActive(ind);

    const updateItems = Home3OurMenuArr.filter((el) => {
      return el.categery.includes(name);
    });
    setData(updateItems);
    setTimeout(() => {
      document.querySelectorAll(".card-container").forEach((ell) => {
        ell.setAttribute(
          "style",
          "transform:scale(1);transition:all .2s linear"
        );
      });
    }, 200);
  };
  return (
    <>
      <div className="row">
        <div className="col-xl-10 col-lg-9 col-md-12 wow fadeInUp">
          <div className="site-filters style-1 clearfix">
            <ul className="filters">
              {buttons.map(({ icon, title }, ind) => (
                <li
                  key={ind}
                  onClick={() => {
                    filterButton(title, ind);
                  }}
                  className={`btn ${addActive === ind ? "active" : ""}`}
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
        <div className="col-xl-2 col-lg-3 col-md-12 text-lg-end d-lg-block d-none wow fadeInUp">
          <Link
            to="/our-menu-1"
            className="btn btn-outline-primary btn-hover-3"
          >
            <span className="btn-text" data-text="View All">
              View All
            </span>
          </Link>
        </div>
      </div>
      <div className="clearfix">
        <ul id="masonry" className="row dlab-gallery-listing gallery">
          {data.map(({ img, name, price }, ind) => (
            <li
              className="card-container col-lg-4 col-md-6 m-b30 All drink pizza burger wow fadeInUp"
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
                    It is a long established fact that a reader will be
                    distracted by the readable.
                  </p>
                  <span className="price">{price}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home3OurMenu;
