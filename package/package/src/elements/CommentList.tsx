import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useRef } from "react";

const CommentList = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  return (
    <>
      <div className="clear" id="comment-list">
        <div className="comments-area" id="comments">
          <h4 className="comments-title">Comments (03)</h4>
          <div className="clearfix">
            <ul className="comment-list">
              <li className="comment">
                <div className="comment-body">
                  <div className="comment-author vcard">
                    <img
                      className="avatar photo"
                      src={IMAGES.testimonial_mini_pic1}
                      alt="/"
                    />
                    <cite className="fn">Monsur Rahman Lito</cite>
                  </div>
                  <p className="font-14 mb-0">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took Link galley of type and scrambled it to make
                    Link type specimen book.
                  </p>
                  <div className="reply">
                    <Link to={"#"} className="comment-reply-link">
                      Reply
                    </Link>
                  </div>
                </div>
                <ol className="children">
                  <li className="comment odd parent">
                    <div className="comment-body">
                      <div className="comment-author vcard">
                        <img
                          className="avatar photo"
                          src={IMAGES.testimonial_mini_pic2}
                          alt="/"
                        />
                        <cite className="fn">Jake Johnson</cite>
                      </div>
                      <p className="font-14 mb-0">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took Link galley of type and
                        scrambled it to make Link type specimen book.
                      </p>
                      <div className="reply">
                        <Link to={"#"} className="comment-reply-link">
                          Reply
                        </Link>
                      </div>
                    </div>
                  </li>
                </ol>
              </li>
              <li className="comment">
                <div className="comment-body">
                  <div className="comment-author vcard">
                    <img
                      className="avatar photo"
                      src={IMAGES.testimonial_mini_pic3}
                      alt="/"
                    />
                    <cite className="fn">John Doe</cite>
                  </div>
                  <p className="font-14 mb-0">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <div className="reply">
                    <Link to={"#"} className="comment-reply-link">
                      Reply
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
            <div className="comment-respond style-1" id="respond">
              <h4 className="comment-reply-title" id="reply-title">
                Good Comments
                <small>
                  <Link to={"#"} id="cancel-comment-reply-link" rel="nofollow">
                    Cancel reply
                  </Link>
                </small>
              </h4>
              <form
                className="comment-form"
                id="commentform"
                method="post"
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <p className="comment-form-author">
                  <label htmlFor="author">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="dzName"
                    placeholder="Author"
                    id="author"
                  />
                </p>
                <p className="comment-form-email">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    name="dzEmail"
                    id="email"
                  />
                </p>
                <p className="comment-form-comment">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    rows={8}
                    name="comment"
                    placeholder="Type Comment Here"
                    id="comment"
                  ></textarea>
                </p>
                <p className="form-submit">
                  <button
                    type="reset"
                    className="btn btn-primary btn-hover-1"
                    id="submit"
                    onReset={() => {
                      formRef.current?.reset();
                    }}
                  >
                    <span>Submit Now</span>
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentList;
