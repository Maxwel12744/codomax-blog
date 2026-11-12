import BlogCard from "../components/BlogCard";
import { articles } from "../data/articles";

const Explore = () => (
  <section className="section">
    <div className="container">
      <span className="eyebrow">Browse</span>
      <h2>Explore Articles</h2>
      <p className="section-sub">Find articles on every technology topic.</p>
      <div className="blog-grid">
        {articles.map((a) => (
          <BlogCard key={a.id} {...a} />
        ))}
      </div>
    </div>
  </section>
);

export default Explore;
