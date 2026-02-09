import { Link } from "react-router-dom";

interface propFile {
  img: string;
  title: string;
  subtitle: string;
}

const CommonBanner = ({ img, title, subtitle }: propFile) => {
  return (
    <div
      className="dz-bnr-inr style-1 text-center bg-parallax bg-parallax"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="dz-bnr-inr-entry">
          <h1>{title}</h1>
          <nav aria-label="breadcrumb" className="breadcrumb-row">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {subtitle}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
