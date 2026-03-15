"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetValidationRules = void 0;
// validators/budgetValidator.ts
const express_validator_1 = require("express-validator");
exports.budgetValidationRules = [
    (0, express_validator_1.body)("categoryId")
        .exists({ checkFalsy: true })
        .withMessage("Category ID is required")
        .isInt()
        .withMessage("Category ID must be an integer"),
    (0, express_validator_1.body)("amount")
        .exists({ checkFalsy: true })
        .withMessage("Amount is required")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be a positive number"),
];
