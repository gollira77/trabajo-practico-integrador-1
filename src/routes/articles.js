import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { idValidator } from "../validators/paramValidator.js";
import {createArticle,listPublishedArticles,getArticleById,listUserArticles,getUserArticleById,updateArticle,deleteArticle} from "../controllers/articleController.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", createArticle);
router.get("/", listPublishedArticles);
router.get("/:id", idValidator, getArticleById);
router.get("/user/me", listUserArticles);
router.get("/user/:id", idValidator, getUserArticleById);
router.put("/:id", idValidator, updateArticle);
router.delete("/:id", idValidator, deleteArticle);

export default router;
