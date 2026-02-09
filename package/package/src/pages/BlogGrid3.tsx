import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import CommonBanner from "../elements/CommonBanner";
import { BlogGrid3Arr } from "../elements/JsonData";
import { useState } from "react";

interface ArrType {
  img: string;
  title: string;
}
const BlogGrid3 = () => {
  const [data, setData] = useState<ArrType[]>(BlogGrid3Arr);

  const loadMore = () => {
    const newData = [...data]; 

    for (let i = 0; i < 3; i++) {
      const key = Math.floor(Math.random() * BlogGrid3Arr.length);
      const newElement = {
        img: BlogGrid3Arr[key].img,
        title: BlogGrid3Arr[key].title,
      }; 

      newData.push(newElement); 
    }
    setData(newData); 
  };

  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.banner_bnr1}
        title="Blog Grid 2"
        subtitle="Blog Grid 2"
      />
      <section className="content-inner-1">
        <div className="container">
          <div className="row loadmore-content">
            {data.map(({ img, title }, ind) => (
              <div className="col-lg-4 col-md-6" key={ind}>
                <div className="dz-card style-1 overlay-shine dz-img-effect zoom m-b30">
                  <div className="dz-media">
                    <Link to="/blog-standard">
                      <img src={img} alt="/" />
                    </Link>
                  </div>
                  <div className="dz-info">
                    <div className="dz-meta">
                      <ul>
                        <li>
                          <Link to="#">
                            <i className="flaticon-calendar-date"></i> 26 Jan
                            2023
                          </Link>
                        </li>
                        <li className="dz-comment">
                          <Link to="#">
                            <i className="flaticon-chat-bubble"></i> 2.5K{" "}
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <h5 className="dz-title">
                      <Link to="/blog-standard">{title}</Link>
                    </h5>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available have.
                    </p>
                    <Link
                      to="/blog-standard"
                      className="btn btn-primary btn-hover-2"
                    >
                      Read More
                    </Link>
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

export default BlogGrid3;
