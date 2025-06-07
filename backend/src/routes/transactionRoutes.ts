import { Router } from "express";
import { createTransaction, getAllTransactions, getMonthlyTransactions, getPaginatedTransactions } from "../controllers/transactionController";
import authMiddleware from "../middlewares/authMiddleware";
import { transactionValidationRules } from "../validators/transactionValidator";
import { validateRequest } from "../validators/validateRequest";

const router = Router();

router.post("/", authMiddleware, transactionValidationRules, validateRequest, createTransaction);
router.get("/all", authMiddleware, getAllTransactions);
router.get("/monthly", authMiddleware, getMonthlyTransactions);
router.get("/paginated", authMiddleware, getPaginatedTransactions);

export default router;