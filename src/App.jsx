import { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import Post from "./pages/Post";
import { articles } from "./data/articles";
import {
  request,
  formatBlog,
  getSavedUser,
  saveSession,
  clearSession,
} from "./api";

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {
    // storage not available, fall back to the device setting
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Pages that need a login send visitors to the Login page instead
const RequireLogin = ({ user, children }) =>
  user ? children : <Navigate to="/login" replace />;

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [user, setUser] = useState(getSavedUser);
  const [serverPosts, setServerPosts] = useState([]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  // Get every blog from the server
  const loadPosts = useCallback(async () => {
    try {
      const data = await request("/api/blogs");
      setServerPosts(data.blogs.map(formatBlog));
    } catch (error) {
      setServerPosts([]); // if the server is off, the sample articles still show
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Called by the Login and Register pages after the server accepts them
  const handleLogin = (token, loggedInUser) => {
    saveSession(token, loggedInUser);
    setUser(loggedInUser);
  };

  const handleLogout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  // Blogs from the server first, then the sample articles
  const allPosts = [...serverPosts, ...articles];

  return (
    <Router>
      <div className="app">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          onLogout={handleLogout}
        />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home posts={allPosts} />} />
            <Route path="/explore" element={<Explore posts={allPosts} />} />
            <Route path="/post/:id" element={<Post posts={allPosts} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/register"
              element={<Register onLogin={handleLogin} />}
            />
            <Route
              path="/dashboard"
              element={
                <RequireLogin user={user}>
                  <Dashboard onLogout={handleLogout} onChanged={loadPosts} />
                </RequireLogin>
              }
            />
            <Route
              path="/create-blog"
              element={
                <RequireLogin user={user}>
                  <CreateBlog onLogout={handleLogout} onCreated={loadPosts} />
                </RequireLogin>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
