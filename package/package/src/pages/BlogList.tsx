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
        description={bannerContent.description}
        showTitle={bannerContent.showTitle !== "false"}
        textAlign={bannerContent.textAlign}
      />}
      <section className="content-inner">
        <div className="container">
          <div className="row loadmore-content">
            {cmsConfig?.blogs?.map((blog: any, ind: number) => (
              <div className="col-lg-4 col-md-6 d-flex" key={blog.id || ind}>
                <div className="dz-card style-1 overlay-shine dz-img-effect zoom m-b30 d-flex flex-column w-100">
                  <div className="dz-media" style={{ height: '240px', overflow: 'hidden', minHeight: '240px' }}>
                    <Link to="/blog-standard" state={{ blog }} style={{ height: '100%', display: 'block' }}>
                      <img src={blog.imageUrl || IMAGES.blog_grid2_pic1} alt={blog.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    </Link>
                  </div>
                  <div className="dz-info d-flex flex-column flex-grow-1">
                    <div className="dz-meta">
                      <ul>
                        <li className="dz-date">
                          <Link to="#">
                            <i className="flaticon-calendar-date"></i> {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </Link>
                        </li>
                        <li className="dz-comment">
                          <Link to="#">
                            <i className="flaticon-chat-bubble"></i> No Comments
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h5 className="dz-title line-clamp-2" style={{ height: '2.8rem' }}>
                      <Link to="/blog-standard" state={{ blog }}>{blog.title}</Link>
                    </h5>
                    <p className="line-clamp-3">
                      {blog.snippet || (blog.content && blog.content.substring(0, 100) + "...") || "No description available."}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to="/blog-standard"
                        state={{ blog }}
                        className="btn btn-primary"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {(!cmsConfig?.blogs || cmsConfig.blogs.length === 0) && (
              <div className="text-center py-20 w-full">
                <h3 className="text-gray-400">No blog posts found.</h3>
              </div>
            )}
          </div>
          {cmsConfig?.blogs?.length > 0 && (
            <div className="text-center m-t10 m-b30">
              <Link
                className="btn btn-primary dz-load-more"
                to={"#"}
              >
                Load More
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogList;

