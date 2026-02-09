import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <div className="text-center m-t10">
      <ul className="pagination m-b15">
        <li className="page-item">
          <Link className="page-link prev" to={"#"}>
            <i className="fas fa-chevron-left"></i>
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link active" to={"#"}>
            <span>1</span>
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to={"#"}>
            <span>2</span>
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link" to={"#"}>
            <span>3</span>
          </Link>
        </li>
        <li className="page-item">
          <Link className="page-link next" to={"#"}>
            <i className="fas fa-chevron-right"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
