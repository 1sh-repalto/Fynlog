import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createBudget,
  getBudgetsForMonth,
} from "../controllers/budgetController";

const router = Router();

router.post("/", authMiddleware, createBudget);
router.get("/", authMiddleware, getBudgetsForMonth);

export default router;
