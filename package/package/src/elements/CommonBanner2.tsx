import { Link } from "react-router-dom";

interface propType {
  pages: string;
}

const CommonBanner2 = ({ pages }: propType) => {
  return (
    <div className="dz-breadcrumb-bnr">
      <div className="container">
        <nav aria-label="breadcrumb" className="breadcrumb-row">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">Blog</li>
            <li className="breadcrumb-item active" aria-current="page">
              {pages}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CommonBanner2;
