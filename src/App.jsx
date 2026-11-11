import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Simple placeholder page components
const Home = () => (
  <div style={{ padding: "20px" }}>
    <h2>Home Page</h2>
  </div>
);
const Login = () => (
  <div style={{ padding: "20px" }}>
    <h2>Login Page</h2>
  </div>
);
const Register = () => (
  <div style={{ padding: "20px" }}>
    <h2>Register Page</h2>
  </div>
);
const Dashboard = () => (
  <div style={{ padding: "20px" }}>
    <h2>Dashboard Page</h2>
  </div>
);
const CreateBlog = () => (
  <div style={{ padding: "20px" }}>
    <h2>Create Blog Page</h2>
  </div>
);

export default function App() {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          padding: "15px",
          background: "#f4f4f4",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-blog">Create Blog</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
    </Router>
  );
}
