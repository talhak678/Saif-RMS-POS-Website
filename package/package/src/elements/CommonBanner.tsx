interface propFile {
  img: string;
  title: string;
  subtitle?: string;
}

const CommonBanner = ({ img, title }: propFile) => {
  return (
    <div
      className="dz-bnr-inr style-1 text-center bg-parallax"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <style>
        {`
          .dz-bnr-inr.style-1::after {
            background: rgba(0, 0, 0, 0.3) !important;
          }
          .dz-bnr-inr.style-1 .dz-bnr-inr-entry h1 {
            margin-bottom: 0;
            text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
          }
        `}
      </style>
      <div className="container">
        <div className="dz-bnr-inr-entry">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
