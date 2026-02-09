import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommentList from "../elements/CommentList";
import CommonBanner2 from "../elements/CommonBanner2";

const BlogGutenberg = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner2 pages="Blog Open Gutenberg" />
      <div className="content-inner overflow-hidden">
        <div className="min-container">
          <div className="blog-single dz-card">
            <div className="post-header">
              <h1 className="dz-title">
                Uncovering Taste of Tradition & Celebrating Timeless Recipes
              </h1>
              <div className="dz-meta">
                <ul>
                  <li className="dz-user">
                    <Link to={"#"}>
                      <i className="flaticon-user"></i> By{" "}
                      <span>KK Sharma</span>
                    </Link>
                  </li>
                  <li className="dz-date">
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
            </div>
            <div className="dz-media alignfullwide">
              <img src={IMAGES.background_pic20} alt="/" />
            </div>
            <div className="dz-info">
              <div className="dz-post-text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book.
                </p>
                <blockquote className="wp-block-quote">
                  <p>
                    Create An Information Architecture That’s Easy To Use Way
                    Precise Usability Considerations For Partially
                  </p>
                  <cite>Ronald M. Spino</cite>
                  <i className="flaticon-right-quote quotes"></i>
                </blockquote>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.{" "}
                </p>
                <figure className="wp-container-5 wp-block-gallery-3 wp-block-gallery has-nested-images columns-3 is-cropped alignwide">
                  <figure className="wp-block-image size-large">
                    <img src={IMAGES.blog_detail_pic3} alt="/" />
                  </figure>
                  <figure className="wp-block-image size-large">
                    <img src={IMAGES.blog_detail_pic4} alt="/" />
                  </figure>
                  <figure className="wp-block-image size-large">
                    <img src={IMAGES.blog_detail_pic5} alt="/" />
                  </figure>
                  <figure className="wp-block-image size-large">
                    <img src={IMAGES.blog_detail_pic6} alt="/" />
                  </figure>
                  <figure className="wp-block-image size-large">
                    <img src={IMAGES.blog_detail_pic7} alt="/" />
                  </figure>
                </figure>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <div className="alignfullwide">
                  <img src={IMAGES.background_pic21} alt="/" />
                </div>

                <p>
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.{" "}
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>

                <div className="author-box m-b30">
                  <div className="author-profile-info">
                    <div className="author-profile-pic">
                      <img src={IMAGES.blog_detail_author} alt="/" />
                    </div>
                    <div className="author-profile-content">
                      <h6>I am John Doe</h6>
                      <p>I am Link Senior Chief in London</p>
                      <img src={IMAGES.blog_detail_signin} alt="/" />
                      <ul className="social-icon m-b0">
                        <li>
                          <Link
                            to="https://www.facebook.com/dexignzone"
                            target="_blank"
                          >
                            <i className="fa-brands fa-facebook-f"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://www.instagram.com/dexignzone/"
                            target="_blank"
                          >
                            <i className="fa-brands fa-instagram"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://twitter.com/dexignzones"
                            target="_blank"
                          >
                            <i className="fa-brands fa-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://www.behance.net/dexignzone"
                            target="_blank"
                          >
                            <i className="fa-brands fa-behance"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <ul>
                  <li>A wonderful serenity has taken possession.</li>
                  <li>
                    Of my entire soul, like these sweet mornings of spring
                    which.
                  </li>
                  <li>I enjoy with my whole heart.</li>
                  <li>
                    This spot, which was created For the bliss of souls like
                    mine.
                  </li>
                </ul>

                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took Link galley of type and scrambled it to make Link
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
              <div className="dz-share-post">
                <div className="post-tags">
                  <h6 className="font-14 m-b0 m-r10 d-inline">Tags:</h6>
                  <Link to="/product-detail">Pizza Veronese</Link>
                  <Link to="/product-detail">Chicken</Link>
                  <Link to="/product-detail">Pizza</Link>
                  <Link to="/product-detail">Burger</Link>
                  <Link to="/product-detail">Sandwich</Link>
                </div>
                <div className="dz-social-icon">
                  <ul>
                    <li>
                      <Link
                        target="_blank"
                        className="btn-social btn-sm text-primary"
                        to="https://www.facebook.com/"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="btn-social btn-sm text-primary"
                        to="https://twitter.com/"
                      >
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="btn-social btn-sm text-primary"
                        to="https://www.instagram.com/"
                      >
                        <i className="fab fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="btn-social btn-sm text-primary"
                        to="https://www.linkedin.com/"
                      >
                        <i className="fa-brands fa-linkedin-in"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <CommentList />
        </div>
      </div>
    </div>
  );
};

export default BlogGutenberg;
