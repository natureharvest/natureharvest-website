import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    categoryId: { type: String, required: true }, // matches Product._id or custom string
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    keyFeatures: { type: [String], default: [] },
    globalQualityStandards: { type: [String], default: [] },
    qualityStandards: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProductVariant =
  mongoose.models.ProductVariant ||
  mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;
