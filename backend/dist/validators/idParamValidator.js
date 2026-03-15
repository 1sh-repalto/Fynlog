"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamValidation = void 0;
const express_validator_1 = require("express-validator");
exports.idParamValidation = [
    (0, express_validator_1.param)("id").isInt().withMessage("ID must be an integer"),
];
