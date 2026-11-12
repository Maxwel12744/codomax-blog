import { Link, useParams } from "react-router-dom";

const Post = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((p) => String(p.id) === id);

  if (!post) {
    return (
      <div className="post-wrap">
        <h2>Blog not found</h2>
        <Link to="/explore" className="text-link">
          ← Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="post-wrap">
      <Link to="/explore" className="text-link">
        ← Back to articles
      </Link>
      <span className="chip post-chip">{post.category}</span>
      <h1 className="post-title">{post.title}</h1>
      <p className="blog-meta">{post.meta}</p>

      {post.image ? (
        <img src={post.image} alt={post.title} className="post-cover" />
      ) : (
        <div
          className="post-cover"
          style={{ background: post.gradient, height: "260px" }}
        />
      )}

      <div className="post-body">{post.content || post.excerpt}</div>
    </div>
  );
};

export default Post;
