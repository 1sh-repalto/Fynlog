"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationRules = exports.signupValidationRules = void 0;
const express_validator_1 = require("express-validator");
exports.signupValidationRules = [
    (0, express_validator_1.body)("name")
        .exists({ checkFalsy: true }).withMessage("Name is required")
        .withMessage("Name is required")
        .isString()
        .withMessage("Name must be a string")
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),
    (0, express_validator_1.body)("email")
        .exists({ checkFalsy: true }).withMessage("Email is required")
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Valid email is required"),
    (0, express_validator_1.body)("password")
        .exists({ checkFalsy: true }).withMessage("Password is required")
        .withMessage("Password is required")
        .isLength({ min: 4 })
        .withMessage("Password must contain at least 4 characters"),
];
exports.loginValidationRules = [
    (0, express_validator_1.body)("email")
        .exists({ checkFalsy: true }).withMessage("Name is required")
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Valid email is required"),
    (0, express_validator_1.body)("password")
        .exists({ values: "falsy" })
        .withMessage("Password is required"),
];
