import { param } from "express-validator";

export const idParamValidation = [
  param("id").isInt().withMessage("ID must be an integer"),
];