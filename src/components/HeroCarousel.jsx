import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((index) => (index + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className={`hero-slide ${i === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
      ))}
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>Learn, build and share ideas from around the world</h1>
        <p>
          Stories and lessons from a developer's journey, written to help other
          beginners grow.
        </p>
        <div className="hero-actions">
          <Link to="/explore" className="btn">
            Explore Articles
          </Link>
          <Link to="/register" className="btn btn-light">
            Create Account
          </Link>
        </div>
      </div>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={i === current ? "dot active" : "dot"}
            onClick={() => setCurrent(i)}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
