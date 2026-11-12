const BlogCard = ({ category, title, excerpt, meta, image, gradient }) => (
  <article className="blog-card">
    {image ? (
      <img src={image} alt={title} className="card-img" />
    ) : (
      <div className="card-img" style={{ background: gradient }} />
    )}
    <div className="card-body">
      <span className="chip">{category}</span>
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <small>{meta}</small>
    </div>
  </article>
);

export default BlogCard;
