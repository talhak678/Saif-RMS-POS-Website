import { useState } from "react";

const ModalVideoBox = ({ title, description, videoUrl, thumbnailUrl }: { title?: string; description?: string; videoUrl?: string; thumbnailUrl?: string }) => {
  const [playing, setPlaying] = useState(false);

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
          .video-wrapper {
            position: relative;
            width: 100%;
            margin: 0 auto;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          .video-container {
            position: relative;
            padding-bottom: 56.25%; /* 16:9 */
            height: 0;
            background: #000;
          }
          .video-container iframe,
          .video-container video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
          .video-thumbnail-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2;
            transition: opacity 0.3s;
          }
          .play-btn-main {
            width: 80px;
            height: 80px;
            background: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            border: none;
            cursor: pointer;
            box-shadow: 0 0 0 0 rgba(255,255,255,0.4);
            animation: pulse-play 2s infinite;
            transition: transform 0.3s;
          }
          .play-btn-main:hover {
            transform: scale(1.1);
          }
          @keyframes pulse-play {
            0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
            70% { box-shadow: 0 0 0 20px rgba(255,255,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          }
          .close-inline-video {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 10;
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            backdrop-filter: blur(5px);
          }
        `}
      </style>

      <section className="content-inner pb-0">
        <div className="container" id="video-section">
          <div className="section-head text-center">
            <h2 className="title">{title || "We Invite you to Visit Our Restaurant"}</h2>
            <p className="about-p">
              {description || `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
            </p>
          </div>
          <div className="row">
            <div className="col-lg-12 px-0 px-md-3">
              <div className="video-wrapper">
                {!playing ? (
                  <div
                    className="video-thumbnail-overlay"
                    style={thumbnailUrl
                      ? { backgroundImage: `url(${thumbnailUrl})` }
                      : { background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }
                    }
                  >
                    <button className="play-btn-main" onClick={() => setPlaying(true)}>
                      <i className="fa-solid fa-play"></i>
                    </button>
                  </div>
                ) : (
                  <button className="close-inline-video" onClick={() => setPlaying(false)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}

                <div className="video-container">
                  {playing && (
                    useYouTube ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video src={videoUrl} controls autoPlay />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ModalVideoBox;
