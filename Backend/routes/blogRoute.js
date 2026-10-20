import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";
import {
  addBlog,
  listBlogs,
  getBlogBySlug,
  removeBlog,
  toggleBlogPublished,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/add", adminAuth, upload.fields([{ name: "image1", maxCount: 1 }]), addBlog);
router.get("/list", listBlogs);                          // public
router.get("/:slug", getBlogBySlug);                    // public – single blog by slug
router.post("/remove", adminAuth, removeBlog);
router.post("/toggle-published", adminAuth, toggleBlogPublished);

export default router;
