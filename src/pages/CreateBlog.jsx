import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/articles";

// Shrinks the photo so it fits in browser storage
const resizeImage = (file, maxWidth = 1000) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas
          .getContext("2d")
          .drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const CreateBlog = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or WEBP).");
      return;
    }
    try {
      const resized = await resizeImage(file);
      setImage(resized);
      setError("");
    } catch (err) {
      setError("That image could not be read. Try a different one.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = content.trim();
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const post = {
      id: Date.now(),
      category,
      title: title.trim(),
      content: text,
      excerpt: text.length > 140 ? text.slice(0, 140).trim() + "…" : text,
      meta: `${category} • ${date}`,
      image,
      gradient: "linear-gradient(135deg, #4338ca, #7c3aed)",
    };

    const saved = onAdd(post);
    if (!saved) {
      setError("Could not save your blog. Try a smaller image.");
      return;
    }
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Blog</h2>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          maxLength={100}
          required
        />

        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label htmlFor="image">Cover image (optional)</label>
        <input id="image" type="file" accept="image/*" onChange={handleImage} />

        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview of your cover" />
            <button
              type="button"
              className="remove-image"
              onClick={() => setImage("")}
            >
              Remove image
            </button>
          </div>
        )}

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          rows="8"
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default CreateBlog;
