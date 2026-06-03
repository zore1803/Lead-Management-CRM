import { body, validationResult } from "express-validator";
import { allowedStatuses } from "../utils/queryBuilder.js";

export const leadValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("status").optional().isIn(allowedStatuses).withMessage("Invalid status")
];

export function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg
    });
  }

  next();
}
