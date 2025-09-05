import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { idValidator } from "../validators/paramValidator.js";
import {listUsers,getUserById,updateUser,deleteUser} from "../controllers/userController.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);
router.get("/", listUsers);
router.get("/:id", idValidator, getUserById);
router.put("/:id", idValidator, updateUser);
router.delete("/:id", idValidator, deleteUser);

export default router;
