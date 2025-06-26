import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createBudget,
  deleteBudget,
  getBudgetsForMonth,
} from "../controllers/budgetController";

const router = Router();

router.post("/", authMiddleware, createBudget);
router.get("/", authMiddleware, getBudgetsForMonth);
router.delete("/:id", authMiddleware, deleteBudget)

export default router;
