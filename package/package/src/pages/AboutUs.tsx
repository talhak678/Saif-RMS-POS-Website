import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import ModalVideoBox from "../elements/ModalVideoBox";
import { AboutServiceArr } from "../elements/JsonData";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title={"About Us"}
        subtitle={"About Us"}
      />
      <ModalVideoBox />
      <section className="content-inner">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title">What We Do</h2>
          </div>
          <div className="row">
            {AboutServiceArr.map(({ icon, title }, ind) => (
              <div className="col-lg-3 col-sm-6 m-b30" key={ind}>
                <div className="icon-bx-wraper style-3">
                  <div className="icon-bx">
                    <div className="icon-cell">
                      <i className={icon}></i>
                    </div>
                  </div>
                  <div className="icon-content">
                    <h5 className="title">
                      <Link to="/service-detail">{title}</Link>
                    </h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
