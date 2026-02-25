import React, { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

const Loader: React.FC = () => {
    const { cmsConfig } = useContext(Context);
    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#fe9f10";

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
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: "absolute",
                width: "400px",
                height: "400px",
                background: `radial-gradient(circle, ${primaryColor}15 0%, transparent 70%)`,
                borderRadius: "50%",
                top: "20%",
                left: "10%",
                filter: "blur(60px)",
                animation: "float 8s ease-in-out infinite"
            }}></div>
            <div style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                background: `radial-gradient(circle, ${primaryColor}10 0%, transparent 70%)`,
                borderRadius: "50%",
                bottom: "15%",
                right: "5%",
                filter: "blur(50px)",
                animation: "float 6s ease-in-out infinite reverse"
            }}></div>

            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2
            }}>
                <div style={{
                    position: "relative",
                    width: "140px",
                    height: "140px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {/* Elaborate Spinner */}
                    <svg viewBox="0 0 100 100" style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        transform: "rotate(-90deg)"
                    }}>
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke="#f3f3f3"
                            strokeWidth="3"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke={primaryColor}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray="290"
                            style={{
                                animation: "dash 2s ease-in-out infinite"
                            }}
                        />
                    </svg>

                    {/* Logo with Soft Pulse */}
                    <div style={{
                        width: "85px",
                        height: "85px",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        padding: "12px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        animation: "logoScale 2s ease-in-out infinite"
                    }}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "40px" }}>
                    <h3 style={{
                        fontSize: "22px",
                        fontWeight: 800,
                        color: "#1a1a1a",
                        textTransform: "uppercase",
                        letterSpacing: "4px",
                        margin: 0,
                        fontFamily: "'Outfit', 'Poppins', sans-serif"
                    }}>
                        {cmsConfig?.restaurantName || "SAIF GRILL"}
                    </h3>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "6px",
                        marginTop: "12px"
                    }}>
                        {[0, 1, 2].map(i => (
                            <div key={i} style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: primaryColor,
                                animation: `dotPulse 1.5s ease-in-out ${i * 0.2}s infinite`
                            }}></div>
                        ))}
                    </div>
                </div>
            </div>

            <style>
                {`
                    @keyframes dash {
                        0% { stroke-dashoffset: 290; transform: rotate(0deg); }
                        50% { stroke-dashoffset: 70; transform: rotate(180deg); }
                        100% { stroke-dashoffset: 290; transform: rotate(360deg); }
                    }
                    @keyframes logoScale {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translate(0, 0); }
                        50% { transform: translate(20px, -30px); }
                    }
                    @keyframes dotPulse {
                        0%, 100% { opacity: 0.3; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                `}
            </style>
        </div>
    );
};

export default Loader;
