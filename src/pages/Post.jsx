import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { request, formatBlog } from "../api";

const Post = ({ posts }) => {
  const { id } = useParams();
  const localPost = posts.find((p) => String(p.id) === id);

  // If the blog is not in the list yet (for example, the page was opened
  // directly from a link), ask the server for it.
  const [fetched, setFetched] = useState(null);
  const [missingId, setMissingId] = useState(null);

  useEffect(() => {
    if (localPost) return;
    let cancelled = false;

    request(`/api/blogs/${id}`)
      .then((data) => {
        if (!cancelled) setFetched(formatBlog(data.blog));
      })
      .catch(() => {
        if (!cancelled) setMissingId(id);
      });

    return () => {
      cancelled = true;
    };
  }, [id, localPost]);

  const post =
    localPost || (fetched && String(fetched.id) === id ? fetched : null);

  if (!post) {
    if (missingId === id) {
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
        <p>Loading...</p>
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
      <p className="blog-meta">
        {post.authorName ? `By ${post.authorName} • ` : ""}
        {post.meta}
      </p>

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
