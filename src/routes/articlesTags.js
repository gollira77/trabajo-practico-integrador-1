import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { idValidator } from "../validators/paramValidator.js";
import { addTagToArticle, removeTagFromArticle } from "../controllers/articleTagController.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", addTagToArticle);
router.delete("/:id", idValidator, removeTagFromArticle);

export default router;
