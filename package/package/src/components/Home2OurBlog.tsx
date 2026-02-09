import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";

const Home2OurBlog = () => {
  return (
    <section className="content-inner overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-12">
            <div className="section-head">
              <h2 className="title wow flipInX">Recent News & Updates</h2>
            </div>
            <div className="dz-card style-2 blog-half wow fadeInUp m-b30">
              <div className="dz-media">
                <Link to="/blog-standard">
                  <img src={IMAGES.blog_grid2_pic1} alt="/" />
                </Link>
                <div className="dz-date">12 Feb 2023</div>
              </div>
              <div className="dz-info">
                <h4 className="dz-title">
                  <Link to="/blog-standard">
                    Chill Out with These Refreshing
                  </Link>
                </h4>
                <div className="dz-meta">
                  <ul>
                    <li className="dz-user">
                      <Link to="#">
                        <i className="fa-solid fa-user"></i>
                        By <span>RK Gupta</span>
                      </Link>
                    </li>
                    <li className="dz-comment">
                      <Link to="#">
                        <i className="fa-solid fa-message"></i>
                        10 Comments
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="btn-wrapper p-t10">
                  <Link
                    to="/blog-standard"
                    className="btn btn-primary btn-hover-2"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
            <div className="dz-card style-2 blog-half wow fadeInUp m-b30">
              <div className="dz-media">
                <Link to="/blog-standard">
                  <img src={IMAGES.blog_grid2_pic2} alt="/" />
                </Link>
                <div className="dz-date">24 Feb 2023</div>
              </div>
              <div className="dz-info">
                <h4 className="dz-title">
                  <Link to="/blog-standard">
                    Taste Excitement: A Sneak Peek into the
                  </Link>
                </h4>
                <div className="dz-meta">
                  <ul>
                    <li className="dz-user">
                      <Link to="#">
                        <i className="fa-solid fa-user"></i>
                        By <span>KK Sharma</span>
                      </Link>
                    </li>
                    <li className="dz-comment">
                      <Link to="#">
                        <i className="fa-solid fa-message"></i>
                        24 Comments
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="btn-wrapper p-t10">
                  <Link
                    to="/blog-standard"
                    className="btn btn-primary btn-hover-2"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-12 m-b30 wow fadeInUp">
            <div
              className="dz-card style-3 dz-card-large"
              style={{ backgroundImage: `url(${IMAGES.blog_large_pic1})` }}
            >
              <video autoPlay loop muted>
                <source src={IMAGES.video} type="video/mp4" />
              </video>
              <div className="dz-info">
                <h3 className="dz-title">
                  <Link to="/blog-standard" className="text-white">
                    Exploring the World of Pizza
                  </Link>
                </h3>
                <div className="dz-meta">
                  <ul>
                    <li className="dz-date">14 Feb 2023</li>
                    <li className="dz-user">
                      <Link to="#">
                        <i className="fa-solid fa-user"></i>
                        By <span>KK Sharma</span>
                      </Link>
                    </li>
                    <li className="dz-comment">
                      <Link to="#">
                        <i className="fa-solid fa-message"></i>
                        15 Comments
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home2OurBlog;
