import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const POSTS_KEY = "globalspace-posts";

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

const loadPosts = () => {
  try {
    const saved = localStorage.getItem(POSTS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [userPosts, setUserPosts] = useState(loadPosts);

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

  // Returns true if the post was saved, false if storage is full
  const addPost = (post) => {
    const next = [post, ...userPosts];
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(next));
    } catch (e) {
      return false;
    }
    setUserPosts(next);
    return true;
  };

  const deletePost = (id) => {
    const next = userPosts.filter((p) => p.id !== id);
    setUserPosts(next);
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(next));
    } catch (e) {
      // ignore storage errors
    }
  };

  const allPosts = [...userPosts, ...articles];

  return (
    <Router>
      <div className="app">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home posts={allPosts} />} />
            <Route path="/explore" element={<Explore posts={allPosts} />} />
            <Route path="/post/:id" element={<Post posts={allPosts} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={<Dashboard posts={userPosts} onDelete={deletePost} />}
            />
            <Route
              path="/create-blog"
              element={<CreateBlog onAdd={addPost} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
