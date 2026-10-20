import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    number: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    origin: { type: String, default: "India" },
    packaging: { type: String, default: "Available as per buyer requirement" },
    quality: { type: String, default: "Premium Export Quality" },
    availability: { type: String, default: "Global Supply" },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
