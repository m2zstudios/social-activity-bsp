import { NavLink } from "react-router-dom";
import "./Stylings/Header.css";

const Header = () => {
  return (
    <header className="news-header">
      
      {/* Top Strip */}
      <div className="top-strip">
        <span>24×7 NEWS • SOCIAL ACTIVITY BSP</span>
      </div>

      {/* Logo Row */}
      <div className="logo-row">
        <NavLink to="/" className="logo-link">
        <img src="/Logo.png" alt="Social Activity BSP News" />
        </NavLink>
      </div>

      {/* Navigation Bar */}
      <nav className="news-nav">
        <NavLink to="/" className="news-link">Home</NavLink>
        <NavLink to="/category/politics" className="news-link">Politics</NavLink>
        <NavLink to="/category/sports" className="news-link">Sports</NavLink>
        <NavLink to="/category/tech" className="news-link">Tech</NavLink>
        <NavLink to="/category/entertainment" className="news-link">Entertainment</NavLink>
        <NavLink to="/profile" className="news-link">Account</NavLink>
        <NavLink to="/auth" className="news-link">Sign In</NavLink>
        <NavLink to="/admin" className="news-admin">Admin</NavLink>
      </nav>

    </header>
  );
};

export default Header;
