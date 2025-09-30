import { Router } from "express";
import { forgotPasswordValidation, loginValidation, registerValidation, resetPasswordValidation } from "./auth.validation";
import { validateRequest } from "../../middlewares/validation.middleware";
import { AuthController } from "./auth.controller";

const router = Router();
const authController = new AuthController();


router.post("/register", registerValidation,validateRequest,authController.register);
router.post("/login", loginValidation,validateRequest,authController.login);
router.post("/refresh-token",authController.refreshToken);
router.post("/forget-password", forgotPasswordValidation,validateRequest,authController.forgotPassword);
router.post("/reset-password", resetPasswordValidation,validateRequest,authController.resetPassword);

export {router as authRoutes}