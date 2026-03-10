import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AppContext";

const SocialLinks = () => {
  const { cmsConfig } = useContext(Context);
  const footerContent = cmsConfig?.config?.configJson?.home?.sections?.footer?.content || {};
  const primaryColor = cmsConfig?.config?.configJson?.theme?.sections?.colors?.content?.primaryColor || "#7da640";


  const links = [
    { icon: "fab fa-facebook-f", url: footerContent.facebook },
    { icon: "fab fa-instagram", url: footerContent.instagram },
    { icon: "fab fa-tiktok", url: footerContent.tiktok },
    // You can add more mapping here if needed
  ].filter(link => link.url);

  if (links.length === 0) {
    // Return defaults if nothing in CMS to avoid empty list
    return (
      <ul style={{ display: "flex", gap: "15px", padding: 0, listStyle: "none" }}>
        <li>
          <Link target="_blank" to="https://www.facebook.com/" style={{ fontSize: "22px", color: primaryColor }}>
            <i className="fab fa-facebook-f"></i>
          </Link>
        </li>
        <li>
          <Link target="_blank" to="https://www.instagram.com/" style={{ fontSize: "22px", color: primaryColor }}>
            <i className="fab fa-instagram"></i>
          </Link>
        </li>
        <li>
          <Link target="_blank" to="https://www.tiktok.com/" style={{ fontSize: "22px", color: primaryColor }}>
            <i className="fab fa-tiktok"></i>
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul style={{ display: "flex", gap: "15px", padding: 0, listStyle: "none" }}>
      {links.map((link, idx) => (
        <li key={idx}>
          <Link
            target="_blank"
            to={link.url.startsWith('http') ? link.url : `https://${link.url}`}
            style={{ fontSize: "22px", color: primaryColor }}
          >
            <i className={link.icon}></i>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
