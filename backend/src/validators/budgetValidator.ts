// validators/budgetValidator.ts
import { body } from "express-validator";

export const budgetValidationRules = [
  body("categoryId")
    .exists({ checkFalsy: true })
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),

  body("amount")
    .exists({ checkFalsy: true })
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
];
