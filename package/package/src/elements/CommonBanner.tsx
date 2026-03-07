import { useContext } from "react";
import { Context } from "../context/AppContext";

interface propFile {
  img: string;
  title: string;
  subtitle?: string;
  description?: string;
  showTitle?: boolean;
  textAlign?: string;
}

const CommonBanner = ({ img, title, description, showTitle = true, textAlign = "center" }: propFile) => {
  const { cmsConfig } = useContext(Context);
  const primaryColor =
    cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "var(--primary)";

  // Detect placeholder images: local bnr*.jpg fallbacks, via.placeholder.com, or no image at all
  const isDefaultPlaceholder =
    !img ||
    img.trim() === "" ||
    img.includes("via.placeholder.com") ||
    /\/bnr[1-9]\.jpg$/.test(img) ||
    /\/bnr[1-9]\.png$/.test(img);

  return (
    <div
      className="dz-bnr-inr style-1"
      style={
        isDefaultPlaceholder
          ? {
            background: "#f0f0f0",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
          : {
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
      }
    >
      <style>
        {`
          .dz-bnr-inr.style-1::after {
            background: ${isDefaultPlaceholder ? "transparent" : "rgba(0, 0, 0, 0.45)"} !important;
          }
          .dz-bnr-inr.style-1 .dz-bnr-inr-entry h1 {
            margin-bottom: 10px;
            color: ${primaryColor} !important;
            text-shadow: ${isDefaultPlaceholder ? "none" : `0 2px 8px rgba(0,0,0,0.4)`};
          }
          .dz-bnr-inr.style-1 .dz-bnr-inr-entry p {
            color: ${isDefaultPlaceholder ? "#555555" : "white"} !important;
            max-width: 600px;
            margin-left: ${textAlign === "center" ? "auto" : textAlign === "right" ? "auto" : "0"};
            margin-right: ${textAlign === "center" ? "auto" : textAlign === "left" ? "auto" : "0"};
            font-size: 16px;
            opacity: 0.9;
          }
        `}
      </style>
      <div className="container" style={{ textAlign: textAlign as any }}>
        <div className="dz-bnr-inr-entry">
          {/* Only show text content when a real image is uploaded */}
          {!isDefaultPlaceholder && showTitle && <h1>{title}</h1>}
          {!isDefaultPlaceholder && description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;

