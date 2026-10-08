import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";
import {
  addProduct,
  listProducts,
  removeProduct,
  addVariant,
  listVariants,
  removeVariant,
} from "../controllers/productController.js";

const router = express.Router();

// ── Product (Category) Routes ──────────────────────────────────────────────────
router.post("/add", adminAuth, upload.fields([{ name: "image1", maxCount: 1 }]), addProduct);
router.get("/list", listProducts);                        // public
router.post("/remove", adminAuth, removeProduct);

// ── Product Variant Routes ─────────────────────────────────────────────────────
router.post("/variant/add", adminAuth, upload.fields([{ name: "image1", maxCount: 1 }]), addVariant);
router.get("/variant/list", listVariants);               // public; ?categoryId=xxx to filter
router.post("/variant/remove", adminAuth, removeVariant);

export default router;
