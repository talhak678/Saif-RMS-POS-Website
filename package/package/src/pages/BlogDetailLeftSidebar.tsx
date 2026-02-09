import BlogGridLeftContent from "../elements/BlogGridLeftContent";
import CommonBanner2 from "../elements/CommonBanner2";
import { OurBlog } from "./BlogDetail";

const BlogDetailLeftSidebar = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner2 pages="Blog Detail Left Sidebar" />
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 order-lg-1 order-2">
              <BlogGridLeftContent />
            </div>
            <div className="col-xl-8 col-lg-8 order-lg-2 order-1 m-b30">
              <OurBlog />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailLeftSidebar;
