"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactionController_1 = require("../controllers/transactionController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const transactionValidator_1 = require("../validators/transactionValidator");
const validateRequest_1 = require("../validators/validateRequest");
const idParamValidator_1 = require("../validators/idParamValidator");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, transactionValidator_1.transactionValidationRules, validateRequest_1.validateRequest, transactionController_1.createTransaction);
router.get("/all", authMiddleware_1.default, transactionController_1.getAllTransactions);
router.delete("/:id", authMiddleware_1.default, idParamValidator_1.idParamValidation, transactionController_1.deleteTransaction);
router.get("/monthly", authMiddleware_1.default, transactionController_1.getMonthlyTransactions);
router.get("/paginated", authMiddleware_1.default, transactionController_1.getPaginatedTransactions);
exports.default = router;
