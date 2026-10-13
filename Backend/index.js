//  import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/mongodb.js";
// import connectCloudinary from "./config/cloudinary.js";

// // Routes Imports
// import sendMail from "./routes/emailSend.js";
// import adminRouter from "./routes/adminRoute.js";
// import imageRouter from "./routes/gallaryRoute.js";
// import productRouter from "./routes/productRoute.js";
// import blogRouter from "./routes/blogRoute.js";
// import dns from 'dns';
// dns.setServers(['8.8.8.8', '1.1.1.1']);

// dotenv.config();

// const app = express();

// // Database & Cloudinary Connections
// connectDB();
// connectCloudinary();

// // Middlewares
// app.use(
//   cors({

//     origin: ["http://localhost:5173","https://natureharvest-website.vercel.app","https://natureharvest.co.in"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // API Endpoints
// app.use("/api/email", sendMail);
// app.use("/api/admin", adminRouter);
// app.use("/api/gallery", imageRouter);   // http://localhost:3000/api/gallery/addimage
// app.use("/api/products", productRouter); // http://localhost:3000/api/products/list
// app.use("/api/blogs", blogRouter);       // http://localhost:3000/api/blogs/list

// app.get("/", (req, res) => {
//   res.send("Welcome to Nature Harvest API");
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import sendMail from "./routes/emailSend.js";
import adminRouter from "./routes/adminRoute.js";
import imageRouter from "./routes/gallaryRoute.js";
import productRouter from "./routes/productRoute.js";
import blogRouter from "./routes/blogRoute.js";
import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

// DB errors ab server ko crash nahi karenge, logs mein dikhenge
connectDB().catch((err) => console.error("MongoDB connection failed:", err));
try {
  connectCloudinary();
} catch (err) {
  console.error("Cloudinary config failed:", err);
}

// ---- CORS (sabse upar, routes se pehle) ----
const allowedOrigins = [
  "http://localhost:5173",
  "https://natureharvest-website.vercel.app",
  "https://natureharvest-phi.vercel.app",
  "https://natureharvest.co.in",
  "https://www.natureharvest.co.in",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Postman/curl (no origin) ya allowed origin ko allow karo
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS: " + origin));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Endpoints
app.use("/api/email", sendMail);
app.use("/api/admin", adminRouter);
app.use("/api/gallery", imageRouter);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Nature Harvest API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});