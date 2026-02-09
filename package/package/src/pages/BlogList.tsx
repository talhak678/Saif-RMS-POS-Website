import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { BlogGrid2Arr } from "../elements/JsonData";
import { useState } from "react";

interface ArrType {
  img2: string;
  title: string;
}
const BlogList = () => {
  const [data, setData] = useState<ArrType[]>(BlogGrid2Arr);

  const loadMore = () => {
    const newData = [...data];

    for (let i = 0; i < 2; i++) {
      const key = Math.floor(Math.random() * BlogGrid2Arr.length);
      const newElement = {
        img2: BlogGrid2Arr[key].img2,
        title: BlogGrid2Arr[key].title,
      };
      newData.push(newElement);
    }

    setData(newData);
  };

  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr3}
        title="Blog List"
        subtitle="Blog List"
      />
      <section className="content-inner-1">
        <div className="container">
          <div className="row justify-content-center loadmore-content">
            {data.map(({ img2, title }, ind) => (
              <div className="col-xl-6 col-lg-8" key={ind}>
                <div className="dz-card style-1 blog-half overlay-shine dz-img-effect zoom m-b30">
                  <div className="dz-media">
                    <Link to="/blog-standard">
                      <img src={img2} alt="/" />
                    </Link>
                  </div>
                  <div className="dz-info">
                    <div className="dz-meta">
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="flaticon-calendar-date"></i> 15 Feb
                            2023
                          </Link>
                        </li>
                        <li className="dz-comment">
                          <Link to="#">
                            <i className="flaticon-chat-bubble"></i> 1.5K
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h5 className="dz-title">
                      <Link to="/blog-standard">{title}</Link>
                    </h5>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have.
                    </p>
                    <div className="read-btn">
                      <Link
                        to="/blog-standard"
                        className="btn btn-primary btn-hover-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center m-t10">
            <Link
              className="btn btn-primary dz-load-more btn-hover-2"
              to={"#"}
              onClick={loadMore}
            >
              Load More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;
