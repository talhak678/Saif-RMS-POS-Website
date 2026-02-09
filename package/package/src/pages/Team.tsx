import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { Link } from "react-router-dom";
import { teamArr } from "../elements/JsonData";

const Team = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner img={IMAGES.banner_bnr2} title="Team" subtitle="Team" />
      <section className="content-inner line-img">
        <div className="container">
          <div className="row">
            {teamArr.map(({ img, name }, ind) => (
              <div className="col-lg-3 col-sm-6 m-b30" key={ind}>
                <div className="dz-team style-1">
                  <div className="dz-media">
                    <img src={img} alt="/" />
                  </div>
                  <div className="dz-content">
                    <div className="clearfix">
                      <h6 className="dz-name">
                        <Link to="/team-detail">{name}</Link>
                      </h6>
                      <span className="dz-position">Senior Chef</span>
                    </div>
                    <ul className="team-social">
                      <li>
                        <Link className="share-btn" to="#">
                          <i className="flaticon-share"></i>
                        </Link>
                        <ul className="sub-team-social">
                          <li>
                            <Link
                              className="fb-btn"
                              to="https://www.facebook.com/"
                              target="_blank"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="tw-btn"
                              to="https://twitter.com/"
                              target="_blank"
                            >
                              <i className="fab fa-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="in-btn"
                              to="https://www.instagram.com/"
                              target="_blank"
                            >
                              <i className="fab fa-instagram"></i>
                            </Link>
                          </li>
                          <li>
                            <Link
                              className="lin-btn"
                              to="https://www.linkedin.com/"
                              target="_blank"
                            >
                              <i className="fa-brands fa-linkedin-in"></i>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
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

export default Team;
