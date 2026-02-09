import { Link } from "react-router-dom";

const SocialLinks = () => {
  return (
    <ul>
      <li>
        <Link
          target="_blank"
          className="fab fa-facebook-f"
          to="https://www.facebook.com/"
        ></Link>
      </li>
      <li>
        <Link
          target="_blank"
          className="fab fa-twitter"
          to="https://twitter.com/"
        ></Link>
      </li>
      <li>
        <Link
          target="_blank"
          className="fab fa-linkedin-in"
          to="https://www.linkedin.com/"
        ></Link>
      </li>
      <li>
        <Link
          target="_blank"
          className="fab fa-instagram"
          to="https://www.instagram.com/"
        ></Link>
      </li>
    </ul>
  );
};

export default SocialLinks;
