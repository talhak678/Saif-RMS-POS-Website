import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { TeamDetailArr } from "../elements/JsonData";
import { Link } from "react-router-dom";

const TeamDetail = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr4}
        title="Team Detail"
        subtitle="Team Detail"
      />
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="team-detail">
                <div className="dz-media rounded-md">
                  <img src={IMAGES.team_detail_pic1} alt="/" />
                </div>
                <div className="dz-info">
                  <div className="head">
                    <h2 className="title">John Doe</h2>
                    <span className="sub-title text-primary">
                      Restaurant Chef
                    </span>
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                  <ul className="team-info">
                    <li>
                      <strong>Responsibility:</strong>Senior Chef
                    </li>
                    <li>
                      <strong>Experience:</strong>10 Year
                    </li>
                    <li>
                      <strong>Email:</strong>Example@gmail.com
                    </li>
                    <li>
                      <strong>Phone:</strong>+22 33 56 7675 8939
                    </li>
                  </ul>
                  <div className="dz-social-icon">
                    <ul>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-md text-dark"
                          to="https://www.facebook.com/"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-md text-dark"
                          to="https://twitter.com/"
                        >
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-md text-dark"
                          to="https://www.youtube.com/"
                        >
                          <i className="fa-brands fa-youtube"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-md text-dark"
                          to="https://www.instagram.com/"
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-md text-dark"
                          to="https://www.linkedin.com/feed/"
                        >
                          <i className="fa-brands fa-linkedin"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="team-bio">
                <h4 className="m-b10">Biography</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book. It has survived not only five centuries,
                </p>
              </div>
              <div className="row">
                <div className="col-xl-5 col-lg-6 m-b10">
                  <h4 className="m-b15">Signature Dish</h4>
                  <ul className="dish-gallery gallery-grid-2">
                    {TeamDetailArr.map(({ img, title }, ind) => (
                      <li key={ind}>
                        <Link to="/product-detail">
                          <div className="gallery-box-1">
                            <img src={img} alt="/" />
                            <span className="category">{title}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-xl-7 col-lg-6 m-b30">
                  <div className="team-skills">
                    <h4 className="m-b10">Professional Skills</h4>
                    <p className="m-b15">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    {TeamDetailArr.map(({ progress, position }, index) => (
                      <div className="progress-bx style-1" key={index}>
                        <h6 className="progress-label">
                          {position}
                          <span className="pull-end">{progress}</span>
                        </h6>
                        <div className="progress primary rounded-md m-b20">
                          <div
                            className="progress-bar rounded-md"
                            style={{ width: progress }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamDetail;
