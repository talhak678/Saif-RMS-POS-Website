import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";

const ServiceDetail = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr2}
        title="Services Detail"
        subtitle="Services Detail"
      />
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 order-lg-1 order-2">
              <aside className="side-bar left sticky-top">
                <div className="widget search-bx">
                  <div className="widget-title">
                    <h5 className="title m-b30">Search</h5>
                  </div>
                  <form role="search" method="post">
                    <div className="input-group">
                      <div className="input-side">
                        <input
                          name="text"
                          className="form-control"
                          placeholder="Search"
                          type="text"
                        />
                        <div className="input-group-btn">
                          <button type="reset" className="btn btn-primary">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.58366 17.5001C13.9559 17.5001 17.5003 13.9557 17.5003 9.58342C17.5003 5.21116 13.9559 1.66675 9.58366 1.66675C5.21141 1.66675 1.66699 5.21116 1.66699 9.58342C1.66699 13.9557 5.21141 17.5001 9.58366 17.5001Z"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18.3337 18.3334L16.667 16.6667"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="widget recent-posts-entry">
                  <div className="widget-title">
                    <h5 className="title m-b30">Recent Post</h5>
                  </div>
                  <div className="widget-post-bx style-1">
                    <div className="widget-post clearfix">
                      <div className="dz-media">
                        <img src={IMAGES.blog_recent_pic4} alt="/" />
                      </div>
                      <div className="dz-info">
                        <div className="dz-meta">
                          <ul>
                            <li>
                              <Link to={"#"}>STANDARD</Link>
                            </li>
                            <li className="date">
                              <Link to={"#"}>Dec 10, 2023</Link>
                            </li>
                          </ul>
                        </div>
                        <h6 className="title">
                          <Link to="/blog-standard">Come Dine with Us!</Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="widget-post-bx style-1">
                    <div className="widget-post clearfix">
                      <div className="dz-media">
                        <img src={IMAGES.blog_recent_pic5} alt="/" />
                      </div>
                      <div className="dz-info">
                        <div className="dz-meta">
                          <ul>
                            <li>
                              <Link to={"#"}>STANDARD</Link>
                            </li>
                            <li className="date">
                              <Link to={"#"}>May 12, 2023</Link>
                            </li>
                          </ul>
                        </div>
                        <h6 className="title">
                          <Link to="/blog-standard">
                            Take Link Bite Out of Life
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget widget_categories">
                  <div className="widget-title">
                    <h4 className="title">Categories</h4>
                  </div>
                  <ul>
                    <li className="cat-item">
                      <Link to="/blog-standard">All Services</Link>
                    </li>
                    <li className="cat-item">
                      <Link to="/blog-standard">Water</Link>
                    </li>
                    <li className="cat-item">
                      <Link to="/blog-standard">Residental Cleaning</Link>
                    </li>
                    <li className="cat-item">
                      <Link to="/blog-standard">Summer Pizza</Link>
                    </li>
                    <li className="cat-item">
                      <Link to="/blog-standard">Free Support</Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="col-lg-8 order-lg-2 order-1 m-b30">
              <div className="blog-single dz-card sidebar mb-0">
                <div className="dz-media rounded-md">
                  <img src={IMAGES.blog_detail_pic2} alt="/" />
                </div>
                <div className="dz-info">
                  <h2 className="title">Delivery Services in Today's World</h2>
                  <div className="dz-meta">
                    <ul>
                      <li className="dz-user">
                        <Link to={"#"}>
                          <i className="fa-solid fa-user"></i>
                          By <span>KK Sharma</span>
                        </Link>
                      </li>
                      <li className="dz-comment">
                        <Link to={"#"}>
                          <i className="fa-solid fa-message"></i>
                          24 Comments
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dz-post-text style-1">
                    <p className="m-b10">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took Link galley of type and scrambled it to make
                      Link type specimen book.
                    </p>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </p>
                  </div>
                  <blockquote className="wp-block-quote style-1">
                    <i className="flaticon-right-quote quotes"></i>
                    <p>
                      Fragment collings mauris sit amet nibh. Donec sodales
                      sagittis magna. Sed consequat,
                    </p>
                    <cite>Ronald M. Spino</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
