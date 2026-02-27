import { useState } from "react";
import ModalVideo from "react-modal-video";
import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";

const ModalVideoBox = ({ title, description, videoUrl }: { title?: string; description?: string; videoUrl?: string }) => {
  const [open, setOpen] = useState(false);

  // Extract video ID from youtube URL if possible
  const getVideoId = (url: string) => {
    if (!url) return "XJb1G9iRoL4";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "XJb1G9iRoL4";
  };

  const videoId = getVideoId(videoUrl || "");

  return (
    <>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 1 }}
        isOpen={open}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />
      <section className="content-inner pb-0">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="title">{title || "We Invite you to Visit Our Restaurant"}</h2>
            <p className="about-p">
              {description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="about-media dz-media rounded-md">
                <img src={IMAGES.background_pic11} alt="/" />
                <Link
                  className="video video-btn popup-youtube"
                  to={"#"}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <i className="fa-solid fa-play"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalVideoBox;
