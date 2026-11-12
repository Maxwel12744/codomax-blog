const BlogCard = ({ title, author, date, excerpt }) => (
  <article className="blog-card">
    <div className="blog-card-top">
      <span className="avatar">{author.charAt(0)}</span>
      <div>
        <p className="blog-author">{author}</p>
        <p className="blog-meta">{date}</p>
      </div>
    </div>
    <h3>{title}</h3>
    <p className="blog-excerpt">{excerpt}</p>
    <button>Read more</button>
  </article>
);

export default BlogCard;
