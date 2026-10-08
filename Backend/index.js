 import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

// Routes Imports
import sendMail from "./routes/emailSend.js";
import adminRouter from "./routes/adminRoute.js";
import imageRouter from "./routes/gallaryRoute.js";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const app = express();

// Database & Cloudinary Connections
connectDB();
connectCloudinary();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "https://natureharvest-phi.vercel.app","https://natureharvest.co.in"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoints
app.use("/api/email", sendMail);
app.use("/api/admin", adminRouter);
app.use("/api/gallery", imageRouter);   // http://localhost:3000/api/gallery/addimage
app.use("/api/products", productRouter); // http://localhost:3000/api/products/list
app.use("/api/blogs", blogRouter);       // http://localhost:3000/api/blogs/list

app.get("/", (req, res) => {
  res.send("Welcome to Nature Harvest API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});