import { useState } from "react";
import { Home2AreMenuArr } from "../elements/JsonData";
import { Link } from "react-router-dom";
const buttons = [
  { icon: "flaticon-fast-food", title: "All" },
  { icon: "flaticon-cocktail", title: "COLD DRINK" },
  { icon: "flaticon-pizza-slice", title: "PIZZA" },
  { icon: "flaticon-salad", title: "SALAD" },
  { icon: "flaticon-cupcake", title: "SWEETS" },
  { icon: "flaticon-chili-pepper", title: "SPICY" },
  { icon: "flaticon-hamburger-1", title: "BURGER" },
];

interface Menus {
  img: string;
  name: string;
  price: string;
  categery: string;
}
const Home2AreMenu = () => {
  const [addActive, setActive] = useState<number>(0);
  const [data, setData] = useState<Menus[]>(Home2AreMenuArr);

  const filterButton = (name: string, ind: number) => {
    document.querySelectorAll(".card-container").forEach((ell) => {
      ell.setAttribute("style", "transform:scale(0);");
    });
    setActive(ind);
    const updateData = Home2AreMenuArr.filter((el) =>
      el.categery.includes(name)
    );
    setData(updateData);
    setTimeout(() => {
      document.querySelectorAll(".card-container").forEach((ell) => {
        ell.setAttribute(
          "style",
          "transform:scale(1);transition:all .5s linear"
        );
      });
    }, 200);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12 text-center wow fadeInUp">
          <div className="site-filters style-2 clearfix">
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
      </div>
      <div className="clearfix">
        <ul id="masonry" className="row dlab-gallery-listing gallery">
          {data.map(({ img, name, price }, ind) => (
            <li
              className="card-container col-lg-6 col-md-6 m-b5 All drink sweet salad"
              key={ind}
            >
              <div className="dz-img-box style-6 wow fadeInUp">
                <div className="dz-media">
                  <img src={img} alt="/" />
                </div>
                <div className="dz-content">
                  <div className="dz-head">
                    <span className="header-text">
                      <Link to="/our-menu-1">{name}</Link>
                    </span>
                    <span className="img-line"></span>
                    <span className="header-price">{price}</span>
                  </div>
                  <p className="dz-body">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home2AreMenu;
