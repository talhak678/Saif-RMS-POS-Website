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
    // Static content fallback
    return (
      <div className="blog-single dz-card sidebar">
        <div className="dz-media rounded-md">
          <img src={IMAGES.blog_detail_pic1} alt="/" />
        </div>
        <div className="dz-info">
          <h1 className="title">Restaurant Has The Answer</h1>
          {/* ...rest of static content... */}
          <div className="dz-meta">
            {/* ... */}
          </div>
          <div className="dz-post-text">
            <p>To see real content, please navigate from the Blog List page.</p>
          </div>
        </div>
        <div className="dz-share-post">
          <div className="post-tags">
            {/* ... */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="blog-single dz-card sidebar">
        <div className="dz-media rounded-md">
          {blog.imageUrl ? <img src={blog.imageUrl} alt={blog.title} /> : <div className="h-64 bg-gray-200 flex items-center justify-center">No Image</div>}
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
                  <i className="flaticon-calendar-date"></i> {new Date(blog.publishedAt).toLocaleDateString()}
                </Link>
              </li>
            </ul>
          </div>
          <div className="dz-post-text">
            <p className="whitespace-pre-wrap">{blog.content}</p>
          </div>
        </div>
      </div>
      <CommentList />
    </>
  );
}
