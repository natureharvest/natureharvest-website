import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";
import ProductVariant from "../models/productVariantModel.js";

// ─── PRODUCT (Category) Controllers ────────────────────────────────────────────

// Add Product
const addProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.image1 || req.files.image1.length === 0) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const { number, name, category, description, origin, packaging, quality, availability } = req.body;

    if (!number || !name || !category || !description) {
      return res.status(400).json({ success: false, message: "number, name, category, description are required" });
    }

    const imageFile = req.files.image1[0];
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "nature-harvest/products",
    });

    const product = await Product.create({
      number,
      name,
      category,
      description,
      image: result.secure_url,
      origin: origin || "India",
      packaging: packaging || "Available as per buyer requirement",
      quality: quality || "Premium Export Quality",
      availability: availability || "Global Supply",
    });

    return res.status(201).json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.log("Add Product Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// List All Products
const listProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, products });
  } catch (error) {
    console.log("List Products Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Product ID is required" });

    await Product.findByIdAndDelete(id);
    return res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log("Remove Product Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── PRODUCT VARIANT Controllers ───────────────────────────────────────────────

// Add Variant
const addVariant = async (req, res) => {
  try {
    if (!req.files || !req.files.image1 || req.files.image1.length === 0) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const {
      categoryId,
      name,
      description,
      keyFeatures,
      globalQualityStandards,
      qualityStandards,
      rating,
      reviews,
    } = req.body;

    if (!categoryId || !name || !description) {
      return res.status(400).json({ success: false, message: "categoryId, name, description are required" });
    }

    const imageFile = req.files.image1[0];
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "nature-harvest/product-variants",
    });

    const parseArr = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      try { return JSON.parse(val); } catch { return val.split(",").map((s) => s.trim()); }
    };

    const variant = await ProductVariant.create({
      categoryId,
      name,
      description,
      image: result.secure_url,
      keyFeatures: parseArr(keyFeatures),
      globalQualityStandards: parseArr(globalQualityStandards),
      qualityStandards: parseArr(qualityStandards),
      rating: parseFloat(rating) || 0,
      reviews: parseInt(reviews) || 0,
    });

    return res.status(201).json({ success: true, message: "Variant added successfully", variant });
  } catch (error) {
    console.log("Add Variant Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// List Variants (optionally filter by categoryId)
const listVariants = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { categoryId } : {};
    const variants = await ProductVariant.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, variants });
  } catch (error) {
    console.log("List Variants Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Variant
const removeVariant = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Variant ID is required" });

    await ProductVariant.findByIdAndDelete(id);
    return res.json({ success: true, message: "Variant removed successfully" });
  } catch (error) {
    console.log("Remove Variant Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, addVariant, listVariants, removeVariant };
