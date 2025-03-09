import { Router } from "express";
import { authRegister, authLogin } from "../controllers/authController";
const router = Router();

router.post("/login", authLogin);
router.post("/signup", authRegister);

export default router;