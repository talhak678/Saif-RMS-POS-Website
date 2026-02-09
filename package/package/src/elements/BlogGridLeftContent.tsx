import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
const BlogGridLeftContent = () => {
  return (
    <aside className="side-bar sticky-top left">
      <div className="widget">
        <div className="widget-title">
          <h4 className="title">Search</h4>
        </div>
        <div className="search-bx">
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
      </div>
      <div className="widget widget_categories">
        <div className="widget-title">
          <h4 className="title">Categories</h4>
        </div>
        <ul>
          <li className="cat-item">
            <Link to="/blog-standard">Pepperoni Pizza</Link>
          </li>
          <li className="cat-item">
            <Link to="/blog-standard">Apricot Chicken</Link>
          </li>
          <li className="cat-item">
            <Link to="/blog-standard">Pizza Veronese</Link>
          </li>
          <li className="cat-item">
            <Link to="/blog-standard">Summer Pizza</Link>
          </li>
          <li className="cat-item">
            <Link to="/blog-standard">Italian Tuna</Link>
          </li>
        </ul>
      </div>

      <div className="widget recent-posts-entry">
        <div className="widget-title">
          <h4 className="title">Latest Post</h4>
        </div>
        <div className="widget-post-bx">
          <div className="widget-post clearfix">
            <div className="dz-media">
              <img src={IMAGES.recent_blog_pic1} alt="/" />
            </div>
            <div className="dz-info">
              <h6 className="title">
                <Link to="/blog-standard">Explore the Food Taste</Link>
              </h6>
              <div className="dz-meta">
                <ul>
                  <li>
                    <Link to={"#"}>
                      <i className="flaticon-calendar-date"></i>
                      10 Dec, 2023
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"}>
                      <i className="flaticon-chat-bubble"></i>
                      2.5K
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="widget-post clearfix">
            <div className="dz-media">
              <img src={IMAGES.recent_blog_pic2} alt="/" />
            </div>
            <div className="dz-info">
              <h6 className="title">
                <Link to="/blog-standard">Secrets of Delicious Food</Link>
              </h6>
              <div className="dz-meta">
                <ul>
                  <li>
                    <Link to={"#"}>
                      <i className="flaticon-calendar-date"></i>
                      16 May, 2023
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"}>
                      <i className="flaticon-chat-bubble"></i>
                      1.5K
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="widget-post clearfix">
            <div className="dz-media">
              <img src={IMAGES.recent_blog_pic3} alt="/" />
            </div>
            <div className="dz-info">
              <h6 className="title">
                <Link to="/blog-standard"> Inspiration for Food</Link>
              </h6>
              <div className="dz-meta">
                <ul>
                  <li>
                    <Link to={"#"}>
                      <i className="flaticon-calendar-date"></i>
                      20 Jan, 2023
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"}>
                      <i className="flaticon-chat-bubble"></i>
                      3.5K
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="widget widget_tag_cloud mb-3">
        <div className="widget-title">
          <h4 className="title">Popular Tags</h4>
        </div>
        <div className="tagcloud">
          <Link to="/product-detail">Pizza</Link>
          <Link to="/product-detail">Chicken</Link>
          <Link to="/product-detail">Pizza Veronese</Link>
          <Link to="/product-detail">Burger</Link>
          <Link to="/product-detail">Sandwich</Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogGridLeftContent;
