import { Link } from "react-router-dom";

const Navbar = () => (
  <nav
    style={{
      display: "flex",
      gap: "20px",
      padding: "15px",
      background: "#222",
    }}
  >
    <Link to="/" style={{ color: "white" }}>
      Home
    </Link>
    <Link to="/login" style={{ color: "white" }}>
      Login
    </Link>
    <Link to="/register" style={{ color: "white" }}>
      Register
    </Link>
    <Link to="/dashboard" style={{ color: "white" }}>
      Dashboard
    </Link>
    <Link to="/create-blog" style={{ color: "white" }}>
      Create Blog
    </Link>
  </nav>
);

export default Navbar;
