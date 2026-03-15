"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const idParamValidator_1 = require("../validators/idParamValidator");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.default, userController_1.getAllUsers);
router.delete("/:id", authMiddleware_1.default, idParamValidator_1.idParamValidation, userController_1.deleteUser);
exports.default = router;
