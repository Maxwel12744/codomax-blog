import { Link } from "react-router-dom";

const myBlogs = [
  {
    id: 1,
    title: "RETURN TO WORK FORMULA",
    date: "Nov 12, 2026",
    status: "Published",
  },
  {
    id: 2,
    title: "Getting Started with React",
    date: "Nov 10, 2026",
    status: "Published",
  },
  {
    id: 3,
    title: "Understanding CSS Flexbox",
    date: "Nov 8, 2026",
    status: "Draft",
  },
];

const Dashboard = () => (
  <div className="page">
    <div className="dashboard-header">
      <h2>My Dashboard</h2>
      <Link to="/create-blog" className="new-blog-btn">
        + New Blog
      </Link>
    </div>

    <p>You have {myBlogs.length} blogs.</p>

    <div className="dashboard-list">
      {myBlogs.map((blog) => (
        <div key={blog.id} className="dashboard-item">
          <div>
            <h3>{blog.title}</h3>
            <p className="blog-meta">{blog.date}</p>
          </div>
          <div className="dashboard-actions">
            <span className={`status ${blog.status.toLowerCase()}`}>
              {blog.status}
            </span>
            <button>Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Dashboard;
