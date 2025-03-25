import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/categoryController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getAllCategories);
router.post("/", authMiddleware, createCategory);
//router.delete("/:id", authMiddleware, deleteCategory);

export default router;