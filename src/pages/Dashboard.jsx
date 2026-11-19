import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { request, formatBlog } from "../api";

const Dashboard = ({ onLogout, onChanged }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get only this user's blogs from the server
  const loadMyPosts = useCallback(async () => {
    try {
      const data = await request("/api/blogs/mine", { auth: true });
      setPosts(data.blogs.map(formatBlog));
      setError("");
    } catch (err) {
      if (err.status === 401) {
        onLogout(); // the login has expired
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    loadMyPosts();
  }, [loadMyPosts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await request(`/api/blogs/${id}`, { method: "DELETE", auth: true });
      await loadMyPosts(); // refresh this list
      onChanged(); // refresh the blogs on Home and Explore
    } catch (err) {
      if (err.status === 401) {
        onLogout();
        return;
      }
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="dashboard-header">
        <h2>My Dashboard</h2>
        <Link to="/create-blog" className="new-blog-btn">
          + New Blog
        </Link>
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {loading ? (
        <p>Loading your blogs...</p>
      ) : (
        <>
          <p>
            You have {posts.length} {posts.length === 1 ? "blog" : "blogs"}.
          </p>

          {posts.length === 0 ? (
            <div className="empty-state">
              <p>You haven't published anything yet.</p>
              <Link to="/create-blog" className="btn">
                Write your first blog
              </Link>
            </div>
          ) : (
            <div className="dashboard-list">
              {posts.map((post) => (
                <div key={post.id} className="dashboard-item">
                  <div className="dash-info">
                    {post.image ? (
                      <img src={post.image} alt="" className="dash-thumb" />
                    ) : (
                      <div
                        className="dash-thumb"
                        style={{ background: post.gradient }}
                      />
                    )}
                    <div>
                      <h3>{post.title}</h3>
                      <p className="blog-meta">{post.meta}</p>
                    </div>
                  </div>
                  <div className="dashboard-actions">
                    <span className="status published">Published</span>
                    <Link to={`/post/${post.id}`} className="view-link">
                      View
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
