import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import BlogCard from "../components/BlogCard";
import { featured, categories } from "../data/articles";

const Home = ({ posts }) => (
  <>
    <HeroCarousel />

    <section className="section">
      <div className="container">
        <span className="eyebrow">Editor's Pick</span>
        <h2>Featured Article</h2>
        <div className="featured">
          {featured.image ? (
            <img
              src={featured.image}
              alt={featured.title}
              className="featured-img"
            />
          ) : (
            <div
              className="featured-img"
              style={{ background: featured.gradient }}
            />
          )}
          <div className="featured-text">
            <span className="chip">{featured.category}</span>
            <h3>{featured.title}</h3>
            <p>{featured.excerpt}</p>
            <Link to="/explore" className="text-link">
              Explore technology articles →
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <span className="eyebrow">Knowledge and Discovery</span>
        <h2>Latest Articles</h2>
        <p className="section-sub">
          Explore ideas, tutorials and insights from the technology world.
        </p>
        <div className="blog-grid">
          {posts.slice(0, 6).map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
        <p className="view-all">
          <Link to="/explore" className="text-link">
            View all articles →
          </Link>
        </p>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <span className="eyebrow">Explore Your Interests</span>
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <Link to="/explore" key={c} className="category">
              {c}
            </Link>
          ))}
        </div>
      </div>
    </section>

    <section className="cta">
      <h2>Have Something Valuable to Share?</h2>
      <p>
        Join GlobalSpace and publish your ideas, experiences and technology
        knowledge.
      </p>
      <Link to="/create-blog" className="btn">
        Write a Blog
      </Link>
    </section>
  </>
);

export default Home;
