interface propFile {
  img: string;
  title: string;
  subtitle?: string;
  description?: string;
  showTitle?: boolean;
  textAlign?: string;
}

const CommonBanner = ({ img, title, description, showTitle = true, textAlign = "center" }: propFile) => {
  return (
    <div
      className="dz-bnr-inr style-1 bg-parallax"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>
        {`
          .dz-bnr-inr.style-1::after {
            background: rgba(0, 0, 0, 0.4) !important;
          }
          .dz-bnr-inr.style-1 .dz-bnr-inr-entry h1 {
            margin-bottom: 10px;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
          }
          .dz-bnr-inr.style-1 .dz-bnr-inr-entry p {
            color: white;
            max-width: 600px;
            margin-left: ${textAlign === 'center' ? 'auto' : textAlign === 'right' ? 'auto' : '0'};
            margin-right: ${textAlign === 'center' ? 'auto' : textAlign === 'left' ? 'auto' : '0'};
            font-size: 16px;
            opacity: 0.9;
          }
        `}
      </style>
      <div className="container" style={{ textAlign: textAlign as any }}>
        <div className="dz-bnr-inr-entry">
          {showTitle && <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
