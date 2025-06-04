import { body } from "express-validator";

export const transactionValidationRules = [
  body("amount")
    .exists()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number"),
  body("categoryId")
    .exists()
    .withMessage("Category ID is required")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("type")
    .exists()
    .withMessage("Transaction type is required")
    .isIn(["income", "expense"])
    .withMessage("Type must be 'income' or 'expense'"),
  body("date")
    .exists()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Date must be a valid ISO date"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),
];
