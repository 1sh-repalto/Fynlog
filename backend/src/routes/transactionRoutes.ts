import { Router } from "express";
import { createTransaction, getTransactions } from "../controllers/transactionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);

export default router;