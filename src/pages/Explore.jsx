import BlogCard from "../components/BlogCard";

const Explore = ({ posts }) => (
  <section className="section">
    <div className="container">
      <span className="eyebrow">Browse</span>
      <h2>Explore Articles</h2>
      <p className="section-sub">Find articles on every technology topic.</p>
      <div className="blog-grid">
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  </section>
);

export default Explore;
