import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transactionController";
import authMiddleware from "../middlewares/authMiddleware";
import { transactionValidationRules } from "../validators/transactionValidator";
import { validateRequest } from "../validators/validateRequest";

const router = Router();

router.post("/", authMiddleware, transactionValidationRules, validateRequest, createTransaction);
router.get("/", authMiddleware, getTransactions);

export default router;