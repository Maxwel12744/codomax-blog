import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/create-blog">Create Blog</Link>
  </nav>
);

export default Navbar;
