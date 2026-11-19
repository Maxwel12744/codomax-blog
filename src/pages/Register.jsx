import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api";

const Register = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check on the page first, so the server is not bothered for a simple mistake
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await request("/api/auth/register", {
        method: "POST",
        body: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      });
      onLogin(data.token, data.user); // save the login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <span className="eyebrow">Join Our Community</span>
        <h2>Create Your Account</h2>
        <p className="auth-sub">
          Register to publish articles and share your technology knowledge.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password (6 or more characters)"
            required
          />

          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
