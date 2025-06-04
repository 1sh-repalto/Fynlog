import { Router } from "express";
import { signup, login, validate, logout, refreshToken } from "../controllers/authController";
import { loginValidationRules, signupValidationRules } from "../validators/userValidator";
import { validateRequest } from "../validators/validateRequest";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", loginValidationRules, validateRequest, login);
router.post("/signup", signupValidationRules, validateRequest, signup);
router.get("/validate", authMiddleware, validate);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

export default router;