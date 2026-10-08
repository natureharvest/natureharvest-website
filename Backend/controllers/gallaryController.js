 import { v2 as cloudinary } from "cloudinary";
import Gallery from "../models/galllaryModel.js";

// Add Image Controller
const addImage = async (req, res) => {
    try {
        // Router ke upload.fields ke hisab se req.files.image1 check karein
        if (!req.files || !req.files.image1 || req.files.image1.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Image file is required",
            });
        }

        // Field 'image1' se pehli file extract karein
        const imageFile = req.files.image1[0];

        // Cloudinary par file upload karein
        const result = await cloudinary.uploader.upload(imageFile.path, {
            folder: "nature-harvest/gallery",
        });

        // Database mein Save karein
        const image = await Gallery.create({
            image: result.secure_url,
            publicId: result.public_id,
        });

        return res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image,
        });

    } catch (error) {
        console.log("Add Image Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// List All Images Controller
const listImage = async (req, res) => {
    try {
        const images = await Gallery.find({});
        return res.json({
            success: true,
            images,
        });
    } catch (error) {
        console.log("List Image Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Remove Image Controller
const removeImage = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Image ID is required",
            });
        }

        const imageItem = await Gallery.findById(id);

        if (!imageItem) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }

        // Cloudinary se delete karein
        if (imageItem.publicId) {
            await cloudinary.uploader.destroy(imageItem.publicId);
        }

        // Database se delete karein
        await Gallery.findByIdAndDelete(id);

        return res.json({
            success: true,
            message: "Image removed successfully",
        });

    } catch (error) {
        console.log("Remove Image Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export { addImage, listImage, removeImage };