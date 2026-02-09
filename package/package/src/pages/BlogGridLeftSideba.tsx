import { IMAGES } from "../constent/theme";
import BlogGridLeftContent from "../elements/BlogGridLeftContent";
import BlogGridRightContent from "../elements/BlogGridRightContent";
import CommonBanner from "../elements/CommonBanner";
import Pagination from "../elements/Pagination";

const BlogGridLeftSideba = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr3}
        title="Blog Grid Left Sidebar"
        subtitle="Blog Grid Left Sidebar"
      />
      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 order-lg-1 order-2">
              <BlogGridLeftContent />
            </div>
            <div className="col-xl-8 col-lg-8 order-lg-2 order-1 m-b30">
              <BlogGridRightContent />
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogGridLeftSideba;
