import React, { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

const Loader: React.FC = () => {
    const { cmsConfig } = useContext(Context);

    // Dynamic Colors from CMS
    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ffffff";
    const restaurantName = cmsConfig?.restaurantName || "SAIF POS";

    const cmsLogo = cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
        cmsConfig?.config?.configJson?.home?.sections?.header?.content?.logoUrl ||
        cmsConfig?.restaurantLogo;

    // Default fallback logo (Kababjees for this project)
    const KABABJEES_LOGO = "https://www.kababjees.com/assets/images/kababjees_logo.png";

    // Dynamic Logo Selection
    // If we have a valid CMS logo that isn't the dummy template logo, use it.
    // Otherwise, use the Kababjees placeholder.
    const logo = (cmsLogo && !cmsLogo.includes("swigo") && cmsLogo !== IMAGES.logo)
        ? cmsLogo
        : KABABJEES_LOGO;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.98)", // Deep black transparent
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100000,
        }}>
            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2
            }}>
                {/* Center Logo Area */}
                <div style={{
                    width: "220px",
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "logoPulse 2.5s ease-in-out infinite",
                    position: "relative"
                }}>
                    {/* Dynamic Glow Effect */}
                    <div style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: `radial-gradient(circle, ${primaryColor}33 0%, transparent 70%)`,
                        filter: "blur(20px)",
                        zIndex: -1
                    }}></div>

                    <img
                        src={logo}
                        alt={restaurantName}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.1))"
                        }}
                    />
                </div>

                {/* Dynamic Spinner */}
                <div style={{
                    marginTop: "40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "15px"
                }}>
                    <div style={{
                        width: "48px",
                        height: "48px",
                        border: "3px solid rgba(255, 255, 255, 0.05)",
                        borderTop: `3px solid ${primaryColor}`,
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }}></div>

                    <span style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "4px",
                        textTransform: "uppercase",
                        marginLeft: "4px"
                    }}>
                        Loading...
                    </span>
                </div>
            </div>

            <style>
                {`
                    @keyframes logoPulse {
                        0%, 100% { transform: scale(1); opacity: 0.9; }
                        50% { transform: scale(1.05); opacity: 1; }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default Loader;
