import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import { idParamValidation } from "../validators/idParamValidator";
const router = Router();

router.get("/", authMiddleware, getAllUsers);
router.delete("/:id", authMiddleware, idParamValidation, deleteUser);

export default router;
