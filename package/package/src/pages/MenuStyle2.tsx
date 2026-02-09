import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { useRef, useState } from "react";
import { MenuStyle2Arr } from "../elements/JsonData";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

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

const MenuStyle2 = () => {
  const [active, setActive] = useState<number>(0);
  const [data, setData] = useState<MenuFile[]>(MenuStyle2Arr);
  const cardRef = useRef<HTMLLIElement[]>([]); 
  const heartRef = useRef<HTMLSpanElement[]>([]);

  const filterGallery = (name: string) => {
    if (cardRef.current) {
      cardRef.current.forEach((ele) => {
        if (ele) {
          ele.style.transform = "scale(0)";
        }
      });

      const updateItems = MenuStyle2Arr.filter((el: MenuFile) =>
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

  const HearHandler = (i: number) => {
    heartRef.current[i].classList.toggle("heart-blast");
  };
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title="Our Menu 2"
        subtitle="Our Menu 2"
      />

      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="site-filters style-2 clearfix mb-lg-5 mb-md-4 ">
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
          </div>
          <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            selector={".lg-item"}
            elementClassNames="clearfix"
          >
            <ul id="masonry" className="row dlab-gallery-listing gallery">
              {data.map(({ img, name }, ind) => (
                <li
                  className="card-container col-lg-4 col-md-6 col-sm-6"
                  style={{ transition: "all .2s" }}
                  key={ind}
                  ref={(node) => {
                    if (node) {
                      cardRef.current.push(node);
                    }
                  }}
                >
                  <div className="dz-img-box style-8" data-src={img}>
                    <Link to={img} className="dz-media lg-item">
                      <img src={img} alt="" width="800" height="650" />
                    </Link>
                    <div className="dz-content">
                      <div className="dz-head">
                        <h6 className="title">
                          <Link to="/product-detail">{name}</Link>
                        </h6>
                        <span
                          className="heart"
                          onClick={() => {
                            HearHandler(ind);
                          }}
                          ref={(el) => {
                            if (el) {
                              heartRef.current.push(el);
                            }
                          }}
                        ></span>
                      </div>
                      <p className="category">Fast Food</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </LightGallery>
        </div>
      </section>
    </div>
  );
};

export default MenuStyle2;
