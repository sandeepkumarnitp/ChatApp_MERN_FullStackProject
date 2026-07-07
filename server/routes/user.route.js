import express from "express";
import { getOtherUsers, getProfile, login, logout, register } from "../controllers/user.controller.js";
import { authMiddleware, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register",authMiddleware,register);
router.post("/login",authMiddleware,login);
router.post("/logout", isAuthenticated, logout);
router.get("/get-profile", isAuthenticated, getProfile);
router.get("/get-other-users", isAuthenticated, getOtherUsers);

export default router;