import express from "express";
import {register,login,logout,getProfile,updateProfile,} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { registerValidator, loginValidator } from "../validators/authValidator.js";
import { updateProfileValidator } from "../validators/profileValidator.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfileValidator, updateProfile);

export default router;
