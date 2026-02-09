import BlogGridLeftContent from "../elements/BlogGridLeftContent";
import CommonBanner2 from "../elements/CommonBanner2";
import { OurBlog } from "./BlogDetail";
const BlogDetailRightSidebar = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner2 pages="Blog Detail Right Sidebar" />
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 m-b30">
              <OurBlog />
            </div>
            <div className="col-xl-4 col-lg-4">
              <BlogGridLeftContent />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailRightSidebar;
