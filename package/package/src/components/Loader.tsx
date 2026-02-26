import React, { useContext } from "react";
import { Context } from "../context/AppContext";
import { IMAGES } from "../constent/theme";

const Loader: React.FC = () => {
    const { cmsConfig } = useContext(Context);

    const headerContent = cmsConfig?.config?.configJson?.home?.sections?.header?.content || {};

    const logo = cmsConfig?.config?.configJson?.theme?.sections?.logos?.content?.mainLogo ||
        headerContent.logoUrl ||
        cmsConfig?.restaurantLogo ||
        IMAGES.logo;

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
            zIndex: 100000, // Ensure it's above everything
        }}>
            <div style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                zIndex: 2
            }}>
                {/* Center Logo with Pulse Animation */}
                <div style={{
                    width: "240px",
                    height: "120px",
                    backgroundColor: "#ffffff", // White background box like in the header
                    padding: "20px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "logoPulse 2s ease-in-out infinite",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
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

                {/* Subtle Progress Indicator */}
                <div style={{
                    marginTop: "30px",
                    width: "40px",
                    height: "40px",
                    border: "3px solid rgba(255, 255, 255, 0.1)",
                    borderTop: "3px solid #ffffff",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                }}></div>
            </div>

            <style>
                {`
                    @keyframes logoPulse {
                        0%, 100% { transform: scale(1); opacity: 0.8; }
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
