import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
// import { useCallback } from "react";
// import Particles from "react-particles";
// import { loadSlim } from "tsparticles-slim";
// import { Engine } from "tsparticles-engine";

const Error404 = () => {
  // const particlesInit = useCallback(async (engine: Engine) => {
  //   await loadSlim(engine);
  // }, []);

  return (
    <>
      <div className="page-content bg-white">
        <div
          className="content-inner overflow-hidden pt-4 error-page"
          id="app-banner"
          style={{
            backgroundImage: `url(${IMAGES.background_bg1})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div className="inner-content text-center">
              <h1 className="error-head">404</h1>
              <h3 className="error-para">Opps! Page not Found</h3>
              <p>Sorry. The page you are looking for is not found</p>
              <Link to="/" className="btn btn-md btn-primary btn-hover-1">
                <span>Back to Home</span>
              </Link>
            </div>
            {/* 
            <Particles
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
                    value: "#fff",
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
                    value: { min: 2, max: 3 },
                  },
                },
                detectRetina: true,
              }}
            />
             */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
