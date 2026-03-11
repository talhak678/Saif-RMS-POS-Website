import React, { useContext } from "react";
import { Context } from "../context/AppContext";

const Loader: React.FC = () => {
    const { cmsConfig } = useContext(Context);

    // Dynamic Colors from CMS
    const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#ffffff";

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
                {/* Dynamic Spinner */}
                <div style={{
                    marginTop: "20px",
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

