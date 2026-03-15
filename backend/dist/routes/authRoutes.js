"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userValidator_1 = require("../validators/userValidator");
const validateRequest_1 = require("../validators/validateRequest");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/login", userValidator_1.loginValidationRules, validateRequest_1.validateRequest, authController_1.login);
router.post("/signup", userValidator_1.signupValidationRules, validateRequest_1.validateRequest, authController_1.signup);
router.get("/validate", authMiddleware_1.default, authController_1.validate);
router.post("/refresh", authController_1.refreshToken);
router.post("/logout", authController_1.logout);
router.get('/session-status', authController_1.sessionStatus);
exports.default = router;
