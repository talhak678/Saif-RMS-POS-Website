import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useRef, useState } from "react";
// import Particles from "react-particles";
// import { loadSlim } from "tsparticles-slim";
// import { Engine } from "tsparticles-engine";

const UnderMaintenance = () => {
  const [input, setInput] = useState<string>("");
  const form = useRef<HTMLFormElement | null>(null);

  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadSlim(engine);
  // }, []);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    setInput("");
    if (form.current) {
      emailjs
        .sendForm(
          "emailId",
          "template_0byuv32",
          form.current,
          "qUDIPykc776NYHv4m"
        )
        .then(
          () => {
            toast.success("Successfully send!");
          },
          (error) => {
            toast.error(error.text);
          }
        );
    }
  };

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <div className="page-content bg-white">
        <section className="content-inner under-construction" id="app-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5">
                <div className="inner-construction">
                  <h3 className="dz-head">
                    We are digging
                    <br /> deep down
                  </h3>
                  <p className="const-p">
                    We are currently facing some issues with our system and our
                    team is working hard to resolve it. You can subscribe to our
                    mailing list if you want to get notified
                  </p>
                  <div className="space-right m-b25">
                    <form
                      className="dzSubscribe"
                      method="post"
                      ref={form}
                      onSubmit={sendEmail}
                    >
                      <div className="dzSubscribeMsg text-white"></div>
                      <div className="input-group">
                        <input
                          name="dzEmail"
                          required
                          type="text"
                          value={input}
                          onChange={(e) => {
                            setInput(e.target.value);
                          }}
                          className="form-control"
                          placeholder="Enter Your Email:"
                        />
                        <button
                          name="submit"
                          value="submit"
                          type="submit"
                          className="btn btn-primary w-100 btn-hover-3"
                        >
                          <span className="btn-text" data-text="Subscribe">
                            Subscribe
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                  <p className="font-14">You can also follow us on</p>
                  <div className="dz-social-icon">
                    <ul>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-social btn-md text-dark"
                          to="https://www.facebook.com/"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-social btn-md text-dark"
                          to="https://twitter.com/"
                        >
                          <i className="fab fa-twitter"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-social btn-md text-dark"
                          to="https://www.youtube.com/"
                        >
                          <i className="fa-brands fa-youtube"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-social btn-md text-dark"
                          to="https://www.instagram.com/"
                        >
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link
                          target="_blank"
                          className="btn-social btn-md text-dark"
                          to="https://www.linkedin.com/"
                        >
                          <i className="fa-brands fa-linkedin-in"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-7">
                <div className="construction-media">
                  <img
                    className="move-1"
                    src={IMAGES.background_pic18}
                    alt="/"
                  />
                </div>
              </div>
            </div>
          </div>
          {/*           <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: {
                color: {
                  value: "",
                },
              },
              fpsLimit: 100,
              interactivity: {
                events: {
                  onClick: {
                    enable: false,
                    mode: "push",
                  },
                  onHover: {
                    enable: false,
                    mode: "repulse",
                  },
                  resize: true,
                },
                modes: {
                  push: {
                    quantity: 0,
                  },
                  repulse: {
                    distance: 0,
                    duration: 2,
                  },
                },
              },
              particles: {
                color: {
                  value: "#999b91",
                },
                links: {
                  color: "#fff",
                  enable: false,
                  opacity: 1,
                  width: 0.2,
                },
                move: {
                  direction: "top",
                  enable: true,

                  random: true,
                  speed: 1,
                  straight: true,
                },
                number: {
                  density: {
                    enable: true,
                    area: 1500,
                  },
                  value: 80,
                },
                opacity: {
                  value: 1,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 2 },
                },
              },
              detectRetina: true,
            }}
          /> */}
        </section>
      </div>
    </>
  );
};

export default UnderMaintenance;
