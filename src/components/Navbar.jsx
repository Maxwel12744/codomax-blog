import { Link, NavLink } from "react-router-dom";

const Navbar = ({ theme, toggleTheme, user, onLogout }) => (
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

        {user ? (
          <>
            <span className="nav-user">Hi, {user.name.split(" ")[0]}</span>
            <button type="button" className="nav-logout" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}

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

        {!user && (
          <Link to="/register" className="nav-btn">
            Get Started
          </Link>
        )}
      </nav>
    </div>
  </header>
);

export default Navbar;
