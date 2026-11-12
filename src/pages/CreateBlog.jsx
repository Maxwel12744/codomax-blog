import { useState } from "react";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New blog:", formData);
    alert("Blog created (demo only)");
    setFormData({ title: "", content: "" });
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Blog</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter blog title"
          required
        />

        <label>Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your blog content here..."
          rows="8"
          required
        />

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreateBlog;
