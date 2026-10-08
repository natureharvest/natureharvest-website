import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

import {
  addImage,
  listImage,
  removeImage,
} from "../controllers/gallaryController.js";

const router = express.Router();

router.post(
  "/addimage",
  adminAuth,
  upload.fields([{ name: "image1", maxCount: 1 }]),
  addImage
);

router.post(
  "/removeimage",
  adminAuth,
  removeImage
);

router.get(
  "/listimage",
  listImage
);

export default router;