import React, { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

const Loader: React.FC = () => {
    const { cmsConfig } = useContext(Context);
    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

    // Match Header logo logic for exact consistency
    const logo = cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
        cmsConfig?.config?.configJson?.home?.sections?.header?.content?.logoUrl ||
        cmsConfig?.restaurantLogo ||
        IMAGES.logo;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            transition: "opacity 0.5s ease"
        }}>
            <div style={{
                position: "relative",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                {/* Rotating ring */}
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `3px solid transparent`,
                    borderTop: `3px solid ${primaryColor}`,
                    animation: "spin 1.5s linear infinite"
                }}></div>

                {/* Pulse circle */}
                <div style={{
                    position: "absolute",
                    width: "80%",
                    height: "80%",
                    borderRadius: "50%",
                    backgroundColor: `${primaryColor}10`,
                    animation: "pulse 2s ease-in-out infinite"
                }}></div>

                {/* Logo */}
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                        zIndex: 2
                    }}
                />
            </div>

            <h4 style={{
                marginTop: "24px",
                fontWeight: 600,
                color: "#222",
                letterSpacing: "1px",
                fontFamily: "Poppins, sans-serif"
            }}>
                Setting Up Your Experience...
            </h4>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0% { transform: scale(0.85); opacity: 0.5; }
                        50% { transform: scale(1); opacity: 0.8; }
                        100% { transform: scale(0.85); opacity: 0.5; }
                    }
                `}
            </style>
        </div>
    );
};

export default Loader;
