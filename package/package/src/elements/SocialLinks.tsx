import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const SocialLinks = () => {
  const { cmsConfig } = useContext(Context);
  const footerContent = cmsConfig?.config?.configJson?.home?.sections?.footer?.content || {};

  const links = [
    { icon: "fab fa-facebook-f", url: footerContent.facebook },
    { icon: "fab fa-instagram", url: footerContent.instagram },
    { icon: "fab fa-tiktok", url: footerContent.tiktok },
    // You can add more mapping here if needed
  ].filter(link => link.url);

  if (links.length === 0) {
    // Return defaults if nothing in CMS to avoid empty list
    return (
      <ul>
        <li><Link target="_blank" className="fab fa-facebook-f" to="https://www.facebook.com/"></Link></li>
        <li><Link target="_blank" className="fab fa-instagram" to="https://www.instagram.com/"></Link></li>
        <li><Link target="_blank" className="fab fa-tiktok" to="https://www.tiktok.com/"></Link></li>
      </ul>
    );
  }

  return (
    <ul>
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            target="_blank"
            className={link.icon}
            to={link.url.startsWith('http') ? link.url : `https://${link.url}`}
          ></Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
