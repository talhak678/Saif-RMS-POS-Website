import { Link } from "react-router-dom";
import CommonBanner from "../elements/CommonBanner";
import { IMAGES } from "../constent/theme";
import { TestimonialArr } from "../elements/JsonData";

const Testimonial = () => {
  return (
    <div className="page-content bg-white">
      <CommonBanner
        img={IMAGES.images_bnr5}
        title="Testimonial"
        subtitle="Customer's Commen"
      />
      <section className="content-inner-1 overflow-hidden">
        <div className="container">
          <div className="row loadmore-content">
            {TestimonialArr.map(({ img, name, diraction }, ind) => {
              if (diraction == "left") {
                return (
                  <div className="col-lg-12 m-lg-b60 m-b30" key={ind}>
                    <div className="testimonial-2">
                      <div className="dz-media">
                        <img src={img} alt="/" />
                      </div>
                      <div className="testimonial-detail">
                        <div className="testimonial-text">
                          <p>
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised
                            words which don't look even slightly believable. If
                            you are going to use a passage of Lorem Ipsum, you
                            need to be sure there isn't anything embarrassing
                            hidden in the middle of text.
                          </p>
                        </div>
                        <div className="testimonial-info">
                          <h5 className="testimonial-name">{name}</h5>
                          <span className="testimonial-position">
                            Food Expert
                          </span>
                        </div>
                        <i className="flaticon-right-quote quote"></i>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="col-lg-12 m-lg-b60 m-b30" key={ind}>
                    <div className="testimonial-2 right">
                      <div className="testimonial-detail">
                        <div className="testimonial-text">
                          <p>
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised
                            words which don't look even slightly believable. If
                            you are going to use a passage of Lorem Ipsum, you
                            need to be sure there isn't anything embarrassing
                            hidden in the middle of text.
                          </p>
                        </div>
                        <div className="testimonial-info">
                          <h5 className="testimonial-name">{name}</h5>
                          <span className="testimonial-position">
                            Food Expert
                          </span>
                        </div>
                        <i className="flaticon-right-quote quote"></i>
                      </div>
                      <div className="dz-media">
                        <img src={img} alt="/" />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="text-center m-t10">
            <Link className="btn btn-primary dz-load-more btn-hover-2" to={"#"}>
              Load More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
