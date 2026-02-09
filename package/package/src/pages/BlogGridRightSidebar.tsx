import { Pagination } from "react-bootstrap";
import BlogGridLeftContent from "../elements/BlogGridLeftContent";
import BlogGridRightContent from "../elements/BlogGridRightContent";
import CommonBanner from "../elements/CommonBanner";
import { IMAGES } from "../constent/theme";

const BlogGridRightSidebar = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr3}
        title="Blog Grid Right Sidebar"
        subtitle="Blog Grid Right Sidebar"
      />
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8 m-b30">
              <BlogGridRightContent />
              <Pagination />
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

export default BlogGridRightSidebar;
