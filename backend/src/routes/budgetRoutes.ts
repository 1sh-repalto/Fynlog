import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  createBudget,
  deleteBudget,
  getBudgetsForMonth,
} from "../controllers/budgetController";
import { budgetValidationRules } from "../validators/budgetValidator";
import { validateRequest } from "../validators/validateRequest";
import { idParamValidation } from "../validators/idParamValidator";

const router = Router();

router.post(
  "/",
  authMiddleware,
  budgetValidationRules,
  validateRequest,
  createBudget
);
router.get("/", authMiddleware, getBudgetsForMonth);
router.delete(
  "/:id",
  authMiddleware,
  idParamValidation,
  validateRequest,
  deleteBudget
);

export default router;
