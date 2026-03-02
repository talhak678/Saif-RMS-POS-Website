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
      <section className="content-inner p-b0">
        <div className="container">
          <div className="row justify-content-center loadmore-content">
            {cmsConfig?.blogs?.map((blog: any, ind: number) => (
              <div className="col-xl-6 col-lg-8" key={blog.id || ind}>
                <div className="dz-card style-1 blog-half overlay-shine dz-img-effect zoom m-b30">
                  <div className="dz-media rounded-md">
                    <Link to="/blog-standard" state={{ blog }}>
                      <img src={blog.imageUrl || IMAGES.blog_grid2_pic1} alt={blog.title} className="object-cover h-64 w-full" />
                    </Link>
                  </div>
                  <div className="dz-info">
                    <div className="dz-meta">
                      <ul>
                        <li className="dz-date">
                          <Link to="#">
                            <i className="flaticon-calendar-date"></i> {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </Link>
                        </li>
                        <li className="dz-user">
                          <Link to="#">
                            <i className="flaticon-user"></i> {blog.author || "Admin"}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h4 className="dz-title">
                      <Link to="/blog-standard" state={{ blog }}>{blog.title}</Link>
                    </h4>
                    <p className="line-clamp-2">
                      {blog.snippet || (blog.content && blog.content.substring(0, 120) + "...") || "No description available."}
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
              <div className="text-center py-20 w-full">
                <h3 className="text-gray-400">No blog posts found.</h3>
              </div>
            )}
          </div>
          {cmsConfig?.blogs?.length > 0 && (
            <div className="text-center m-t10 m-b30">
              <Link
                className="btn btn-primary dz-load-more btn-hover-2"
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
