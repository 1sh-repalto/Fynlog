import { Router } from "express";
import { authRegister, authLogin, validateCookie, logout } from "../controllers/authController";
const router = Router();

router.post("/login", authLogin);
router.post("/signup", authRegister);
router.get("/validate", validateCookie);
router.post("/logout", logout);

export default router;