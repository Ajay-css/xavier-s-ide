import express from "express";
import { createFile, getFiles, getFile, updateFile, deleteFile } from "../controllers/fileController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createFile);
router.get("/", protect, getFiles);        // ✅ query param approach
router.get("/single/:id", protect, getFile);
router.put("/:id", protect, updateFile);
router.delete("/:id", protect, deleteFile);

export default router;