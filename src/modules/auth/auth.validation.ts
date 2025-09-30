import { body } from "express-validator"
import { REGEX_PATTERNS } from "../../constants/regex.constant";

export const registerValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
    body("password")
  .matches(REGEX_PATTERNS.PASSWORD)
    .withMessage(
      "Password must be at least 8 characters with uppercase, lowercase, number and special character"
    ),

  body("firstName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name must be between 2 and 50 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name must be between 2 and 50 characters"),

];

export const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const forgotPasswordValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),
];

export const resetPasswordValidation = [
  body("token").notEmpty().withMessage("Reset token is required"),
  body("newPassword")
    .matches(REGEX_PATTERNS.PASSWORD)
    .withMessage(
      "Password must be at least 8 characters with uppercase, lowercase, number and special character"
    ),
];
