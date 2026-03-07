import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommentList from "../elements/CommentList";
import CommonBanner2 from "../elements/CommonBanner2";

const BlogDetail = () => {
  const location = useLocation();
  const blog = location.state?.blog;

  return (
    <div className="page-content bg-white">
      <CommonBanner2 pages={blog?.title || "Blog Standard"} />
      <section className="content-inner">
        <div className="min-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <OurBlog blog={blog} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;

export function OurBlog({ blog }: { blog?: any }) {
  if (!blog) {
    return (
      <div className="blog-single dz-card sidebar">
        <div className="dz-media rounded-md">
          <img src={IMAGES.blog_detail_pic1} alt="/" />
        </div>
        <div className="dz-info">
          <h1 className="title">Blog Post Not Found</h1>
          <div className="dz-post-text">
            <p>Please navigate back to the blog list and select a post to view.</p>
          </div>
          <div className="read-btn">
            <Link to="/blog-list" className="btn btn-primary ">Back to Blogs</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="blog-single dz-card sidebar">
        <div className="dz-media rounded-md">
          <img src={blog.imageUrl || IMAGES.blog_detail_pic1} alt={blog.title} className="w-full object-cover" />
        </div>
        <div className="dz-info">
          <h1 className="title">{blog.title}</h1>
          <div className="dz-meta">
            <ul>
              <li className="dz-user">
                <Link to={"#"}>
                  <i className="flaticon-user"></i> By <span>{blog.author || "Admin"}</span>
                </Link>
              </li>
              <li className="dz-date">
                <Link to={"#"}>
                  <i className="flaticon-calendar-date"></i> {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </Link>
              </li>
              <li className="dz-comment">
                <Link to={"#"}>
                  <i className="flaticon-chat-bubble"></i> No Comments
                </Link>
              </li>
            </ul>
          </div>
          <div className="dz-post-text">
            <div className="whitespace-pre-wrap text-gray-600 leading-relaxed font-medium">
              {blog.content}
            </div>
            {blog.snippet && (
              <blockquote className="wp-block-quote">
                <p>{blog.snippet}</p>
                <cite>{blog.author || "Admin"}</cite>
                <i className="flaticon-right-quote quotes"></i>
              </blockquote>
            )}
          </div>
        </div>

        <div className="dz-share-post">
          <div className="post-tags">
            <h6 className="font-14 m-b0 m-r10 d-inline">Tags:</h6>
            <Link to="#">Food</Link>
            <Link to="#">Restaurant</Link>
          </div>
          <div className="dz-social-icon">
            <ul>
              <li>
                <Link target="_blank" className="btn-social btn-sm text-primary" to="https://www.facebook.com/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link target="_blank" className="btn-social btn-sm text-primary" to="https://twitter.com/">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link target="_blank" className="btn-social btn-sm text-primary" to="https://www.instagram.com/">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <CommentList />
    </>
  );
}
