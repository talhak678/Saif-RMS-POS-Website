import { useState } from "react";
import ModalVideo from "react-modal-video";
import { IMAGES } from "../constent/theme";

const ModalVideoBox = ({ title, description, videoUrl, thumbnailUrl }: { title?: string; description?: string; videoUrl?: string; thumbnailUrl?: string }) => {
  const [open, setOpen] = useState(false);

  // Check if it's a YouTube URL
  const isYouTube = (url: string) => {
    return /youtube\.com|youtu\.be/.test(url);
  };

  // Extract YouTube ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const useYouTube = videoUrl ? isYouTube(videoUrl) : true;
  const videoId = useYouTube ? getYouTubeId(videoUrl || "") || "XJb1G9iRoL4" : null;

  return (
    <>
      <style>
        {`
          .custom-video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .custom-video-container {
            width: 90%;
            max-width: 1000px;
            position: relative;
          }
          .close-video {
            position: absolute;
            top: -40px;
            right: 0;
            color: #fff;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
            padding: 10px;
          }
          .custom-video-container video {
            width: 100%;
            border-radius: 8px;
            box-shadow: 0 0 30px rgba(0,0,0,0.5);
          }
        `}
      </style>

      {open && useYouTube && (
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 1 }}
          isOpen={open}
          videoId={videoId as string}
          onClose={() => setOpen(false)}
        />
      )}

      {open && !useYouTube && (
        <div className="custom-video-modal" onClick={() => setOpen(false)}>
          <div className="custom-video-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-video" onClick={() => setOpen(false)}>×</button>
            <video src={videoUrl} controls autoPlay />
          </div>
        </div>
      )}

      <section className="content-inner pb-0">
        <div className="container" id="video-section">
          <div className="section-head text-center">
            <h2 className="title">{title || "We Invite you to Visit Our Restaurant"}</h2>
            <p className="about-p">
              {description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="about-media dz-media rounded-md">
                <img src={thumbnailUrl || IMAGES.background_pic11} alt="/" />
                <button
                  className="video video-btn popup-youtube"
                  style={{ border: 'none', background: 'none' }}
                  onClick={() => setOpen(true)}
                >
                  <i className="fa-solid fa-play"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalVideoBox;
