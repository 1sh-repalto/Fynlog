"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const budgetController_1 = require("../controllers/budgetController");
const budgetValidator_1 = require("../validators/budgetValidator");
const validateRequest_1 = require("../validators/validateRequest");
const idParamValidator_1 = require("../validators/idParamValidator");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.default, budgetValidator_1.budgetValidationRules, validateRequest_1.validateRequest, budgetController_1.createBudget);
router.get("/", authMiddleware_1.default, budgetController_1.getBudgetsForMonth);
router.delete("/:id", authMiddleware_1.default, idParamValidator_1.idParamValidation, validateRequest_1.validateRequest, budgetController_1.deleteBudget);
exports.default = router;
