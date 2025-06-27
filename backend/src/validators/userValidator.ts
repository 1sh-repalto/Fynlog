import { body } from "express-validator";

export const signupValidationRules = [
  body("name")
    .exists({ checkFalsy: true }).withMessage("Name is required")
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("email")
    .exists({ checkFalsy: true }).withMessage("Email is required")
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .exists({ checkFalsy: true }).withMessage("Password is required")
    .withMessage("Password is required")
    .isLength({ min: 4 })
    .withMessage("Password must contain at least 4 characters"),
];

export const loginValidationRules = [
  body("email")
    .exists({ checkFalsy: true }).withMessage("Name is required")
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),
  body("password")
    .exists({ values: "falsy" })
    .withMessage("Password is required"),
];
