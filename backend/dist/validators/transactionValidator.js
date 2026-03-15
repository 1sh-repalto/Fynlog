"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.transactionValidationRules = [
    (0, express_validator_1.body)("amount")
        .exists()
        .withMessage("Amount is required")
        .isNumeric()
        .withMessage("Amount must be a number"),
    (0, express_validator_1.body)("categoryId")
        .exists()
        .withMessage("Category ID is required")
        .isInt()
        .withMessage("Category ID must be an integer"),
    (0, express_validator_1.body)("type")
        .exists()
        .withMessage("Transaction type is required")
        .isIn(["income", "expense"])
        .withMessage("Type must be 'income' or 'expense'"),
    (0, express_validator_1.body)("date")
        .exists()
        .withMessage("Date is required")
        .isISO8601()
        .withMessage("Date must be a valid ISO date"),
    (0, express_validator_1.body)("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .isLength({ max: 255 })
        .withMessage("Description cannot exceed 255 characters"),
];
