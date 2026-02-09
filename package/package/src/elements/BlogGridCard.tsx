import { Link } from "react-router-dom";

interface propType {
  img: string;
  title: string;
}
const BlogGridCard = ({ img, title }: propType) => {
  return (
    <div className="card-container">
      <div className="dz-card style-1 overlay-shine dz-img-effect zoom  mt-0">
        <div className="dz-media">
          <Link to="/blog-standard">
            <img src={img} alt="/" />
          </Link>
        </div>
        <div className="dz-info">
          <div className="dz-meta">
            <ul>
              <li>
                <Link to={"#"}>
                  <i className="flaticon-calendar-date"></i> 26 Jan 2023
                </Link>
              </li>
              <li className="dz-comment">
                <Link to={"#"}>
                  <i className="flaticon-chat-bubble"></i> 2.5K{" "}
                </Link>
              </li>
            </ul>
          </div>
          <h5 className="dz-title">
            <Link to="/blog-standard">{title}</Link>
          </h5>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have.
          </p>
          <Link to="/blog-standard" className="btn btn-primary btn-hover-2">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogGridCard;
