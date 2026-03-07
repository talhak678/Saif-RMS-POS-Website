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

  // Detect when NO real image is uploaded:
  // - empty/null img
  // - via.placeholder.com URLs (they render "1920 x 800" text on the image itself)
  // - local fallback banner images (bnr1.jpg - bnr9.jpg)
  const hasNoImage =
    !img ||
    img.trim() === "" ||
    img.includes("via.placeholder.com") ||
    /\/bnr[1-9]\.jpg$/i.test(img) ||
    /\/bnr[1-9]\.png$/i.test(img);

  return (
    <div
      className="dz-bnr-inr style-1"
      style={
        hasNoImage
          ? {
            // Light gray background when no image — no background-image loaded
            background: "#f0f0f0",
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
            background: ${hasNoImage ? "transparent" : "rgba(0, 0, 0, 0.45)"} !important;
          }
          .dz-bnr-inr.style-1 .dz-bnr-inr-entry h1 {
            margin-bottom: 10px;
            color: ${primaryColor} !important;
            text-shadow: ${hasNoImage ? "none" : "0 2px 8px rgba(0,0,0,0.4)"};
          }
          .dz-bnr-inr.style-1 .dz-bnr-inr-entry p {
            color: ${hasNoImage ? "#444444" : "white"} !important;
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
          {/* Always show heading/text if user has entered it, regardless of image */}
          {showTitle && <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
