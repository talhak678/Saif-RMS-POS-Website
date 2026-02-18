import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const BlogList = () => {
  const { cmsConfig, cmsLoading } = useContext(Context);

  const bannerConfig = cmsConfig?.config?.configJson?.blogs?.sections?.banner;
  const bannerEnabled = bannerConfig?.enabled !== false;
  const bannerContent = bannerConfig?.content || { title: "Blog List", breadcrumb: "Blog List", imageUrl: IMAGES.images_bnr3 };

  if (cmsLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="page-content" style={{ backgroundColor: cmsConfig?.config?.backgroundColor || "white" }}>
      {bannerEnabled && <CommonBanner
        img={bannerContent.imageUrl || IMAGES.images_bnr3}
        title={bannerContent.title}
        subtitle={bannerContent.breadcrumb}
      />}
      <section className="content-inner-1">
        <div className="container">
          <div className="row justify-content-center loadmore-content">
            {cmsConfig?.blogs?.map((blog: any) => (
              <div className="col-xl-6 col-lg-8" key={blog.id}>
                <div className="dz-card style-1 blog-half overlay-shine dz-img-effect zoom m-b30">
                  <div className="dz-media">
                    <Link to="/blog-standard" state={{ blog }}>
                      <img src={blog.imageUrl || IMAGES.blog_grid2_pic1} alt={blog.title} className="object-cover h-64 w-full" />
                    </Link>
                  </div>
                  <div className="dz-info">
                    <div className="dz-meta">
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="flaticon-calendar-date"></i> {new Date(blog.publishedAt).toLocaleDateString()}
                          </Link>
                        </li>
                        <li className="dz-comment">
                          <Link to="#">
                            <i className="flaticon-user"></i> {blog.author || "Admin"}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h5 className="dz-title">
                      <Link to="/blog-standard" state={{ blog }}>{blog.title}</Link>
                    </h5>
                    <p className="line-clamp-3">
                      {blog.snippet || blog.content.substring(0, 100) + "..."}
                    </p>
                    <div className="read-btn">
                      <Link
                        to="/blog-standard"
                        state={{ blog }}
                        className="btn btn-primary btn-hover-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {(!cmsConfig?.blogs || cmsConfig.blogs.length === 0) && (
              <div className="text-center py-10 w-full">No blog posts found.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;
