import { Router } from "express";
import { authSignup, authLogin, validateCookie, authLogout } from "../controllers/authController";
const router = Router();

router.post("/login", authLogin);
router.post("/signup", authSignup);
router.get("/validate", validateCookie);
router.post("/logout", authLogout);

export default router;