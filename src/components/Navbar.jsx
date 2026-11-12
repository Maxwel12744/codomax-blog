import { Link, NavLink } from "react-router-dom";

const Navbar = ({ theme, toggleTheme }) => (
  <header className="navbar">
    <div className="container nav-inner">
      <Link to="/" className="brand">
        Global<span>Space</span>
      </Link>
      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/create-blog">Create Blog</NavLink>
        <NavLink to="/login">Login</NavLink>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          title={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <Link to="/register" className="nav-btn">
          Get Started
        </Link>
      </nav>
    </div>
  </header>
);

export default Navbar;
