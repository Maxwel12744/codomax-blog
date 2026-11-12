import { Link } from "react-router-dom";

const Dashboard = ({ posts, onDelete }) => (
  <div className="page">
    <div className="dashboard-header">
      <h2>My Dashboard</h2>
      <Link to="/create-blog" className="new-blog-btn">
        + New Blog
      </Link>
    </div>

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
                onClick={() => {
                  if (window.confirm("Delete this blog?")) onDelete(post.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Dashboard;
