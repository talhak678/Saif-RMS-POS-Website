import { Link } from "react-router-dom";
import { BlogGrid2Arr } from "../elements/JsonData";

const BlogGridRightContent = () => {
  return (
    <div className="row">
      {BlogGrid2Arr.map(({ img, title }, ind) => (
        <div className="col-lg-6 col-md-6" key={ind}>
          <div className="dz-card style-1 overlay-shine dz-img-effect zoom m-b30">
            <div className="dz-media">
              <Link to="/blog-standard">
                <img src={img} alt="/" />
              </Link>
            </div>
            <div className="dz-info">
              <div className="dz-meta">
                <ul>
                  <li>
                    <Link to="#">
                      <i className="flaticon-calendar-date"></i> 26 Jan 2023
                    </Link>
                  </li>
                  <li className="dz-comment">
                    <Link to="#">
                      <i className="flaticon-chat-bubble"></i> 2.5K{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              <h5 className="dz-title">
                <Link to="/blog-standard">{title}</Link>
              </h5>
              <p>
                There are many variations of passages of Lorem Ipsum available
                have.
              </p>
              <Link to="/blog-standard" className="btn btn-primary btn-hover-2">
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogGridRightContent;
