import BlogCard from "../components/BlogCard";

const posts = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Maxwel",
    date: "Nov 12, 2026",
    excerpt:
      "React makes it easy to build interactive user interfaces using components.",
  },
  {
    id: 2,
    title: "Understanding CSS Flexbox",
    author: "Maxwel",
    date: "Nov 10, 2026",
    excerpt:
      "Flexbox is a powerful layout tool for aligning items in rows and columns.",
  },
  {
    id: 3,
    title: "JavaScript Basics",
    author: "Maxwel",
    date: "Nov 8, 2026",
    excerpt:
      "Variables, functions, and arrays are the building blocks of JavaScript.",
  },
  {
    id: 4,
    title: "Why Version Control Matters",
    author: "Maxwel",
    date: "Nov 5, 2026",
    excerpt:
      "Git helps you track changes and collaborate safely on any project.",
  },
];

const Home = () => (
  <div className="page">
    <h2>Latest Blogs</h2>
    <div className="blog-grid">
      {posts.map((post) => (
        <BlogCard key={post.id} {...post} />
      ))}
    </div>
  </div>
);

export default Home;
