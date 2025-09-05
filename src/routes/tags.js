import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { idValidator } from "../validators/paramValidator.js";
import {createTag,listTags,getTagById,updateTag,deleteTag} from "../controllers/tagController.js";

const router = express.Router();

router.get("/", authMiddleware, listTags);
router.post("/", authMiddleware, adminMiddleware, createTag);
router.get("/:id", authMiddleware, adminMiddleware, idValidator, getTagById);
router.put("/:id", authMiddleware, adminMiddleware, idValidator, updateTag);
router.delete("/:id", authMiddleware, adminMiddleware, idValidator, deleteTag);

export default router;
