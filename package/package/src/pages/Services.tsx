import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { ServicesArr } from "../elements/JsonData";

const Services = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title="Services"
        subtitle="Services"
      />
      <section className="content-inner">
        <div className="container">
          <div className="row">
            {ServicesArr.map(({ icon, name }, ind) => (
              <div className="col-lg-3 col-sm-6 m-b30" key={ind}>
                <div className="icon-bx-wraper style-3">
                  <div className="icon-bx">
                    <div className="icon-cell">
                      <i className={icon}></i>
                    </div>
                  </div>
                  <div className="icon-content">
                    <h5 className="title">
                      <Link to="/service-detail">{name}</Link>
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

export default Services;
