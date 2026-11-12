const BlogCard = ({ title, author, date, excerpt }) => (
  <div className="blog-card">
    <h3>{title}</h3>
    <p className="blog-meta">
      By {author} • {date}
    </p>
    <p>{excerpt}</p>
    <button>Read more</button>
  </div>
);

export default BlogCard;
