import { NavLink } from "react-router-dom";
import "./Stylings/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h3>SocialActivity BSP News</h3>
          <p>
            Bringing you the latest and verified news from around the world.
          </p>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li>
              <NavLink to="/category/politics">Politics</NavLink>
            </li>
            <li>
              <NavLink to="/category/sports">Sports</NavLink>
            </li>
            <li>
              <NavLink to="/category/tech">Technology</NavLink>
            </li>
            <li>
              <NavLink to="/category/entertainment">Entertainment</NavLink>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/privacy">Privacy Policy</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          </ul>
        </div>

        {/* Follow Us + Disclaimer */}
        <div className="footer-section">
          <h4>Follow Us</h4>

  <div className="socials">
    <a
      href="https://www.youtube.com/@SocialActivityBspNews"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Youtube Channel"
    >
      <img
        src="https://cdn.simpleicons.org/youtube/ffffff"
        alt="Youtube"
      />
    </a>

    <a
      href="https://x.com/SocialActiv_BSP"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
    >
      <img
        src="https://cdn.simpleicons.org/x/ffffff"
        alt="X"
      />
    </a>

    <a
      href="https://www.facebook.com/people/Social-Activity-BSP/61586024742689/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
    >
      <img
        src="https://cdn.simpleicons.org/facebook/ffffff"
        alt="Facebook"
      />
    </a>

    <a
      href="https://www.instagram.com/socialactivitybsp/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <img
        src="https://cdn.simpleicons.org/instagram/ffffff"
        alt="Instagram"
      />
    </a>
  </div>

          {/* Disclaimer */}
          <p className="footer-disclaimer">
            Disclaimer: All news published on SocialActivity BSP News is
            collected from trusted sources and social media. We do not claim
            absolute accuracy. If you have any objection, please contact us.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SocialActivity BSP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
