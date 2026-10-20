import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/blogModel.js";

// Helper: generate slug from title
const makeSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

// Add Blog
const addBlog = async (req, res) => {
  try {
    if (!req.files || !req.files.image1 || req.files.image1.length === 0) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const { title, excerpt, content, author, category, tags, published } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ success: false, message: "title, excerpt, content are required" });
    }

    const imageFile = req.files.image1[0];
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "nature-harvest/blogs",
    });

    const parseArr = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try { return JSON.parse(val); } catch { return val.split(",").map((s) => s.trim()); }
    };

    // Generate unique slug
    let slug = makeSlug(title);
    const existing = await Blog.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      image: result.secure_url,
      author: author || "Nature Harvest",
      category: category || "General",
      tags: parseArr(tags),
      published: published === "false" ? false : true,
    });

    return res.status(201).json({ success: true, message: "Blog added successfully", blog });
  } catch (error) {
    console.log("Add Blog Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// List All Blogs
const listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, blogs });
  } catch (error) {
    console.log("List Blogs Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Blog by Slug (for frontend)
const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let blog = await Blog.findOne({ slug, published: { $ne: false } });
    if (!blog && /^[0-9a-fA-F]{24}$/.test(slug)) {
      blog = await Blog.findOne({ _id: slug, published: { $ne: false } });
    }
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    return res.json({ success: true, blog });
  } catch (error) {
    console.log("Get Blog Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Blog
const removeBlog = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Blog ID is required" });

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    await Blog.findByIdAndDelete(id);
    return res.json({ success: true, message: "Blog removed successfully" });
  } catch (error) {
    console.log("Remove Blog Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle Published
const toggleBlogPublished = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Blog ID is required" });

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    blog.published = !blog.published;
    await blog.save();

    return res.json({ success: true, message: `Blog ${blog.published ? "published" : "unpublished"}`, blog });
  } catch (error) {
    console.log("Toggle Blog Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addBlog, listBlogs, getBlogBySlug, removeBlog, toggleBlogPublished };
