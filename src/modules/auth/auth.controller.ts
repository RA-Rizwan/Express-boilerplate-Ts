import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { ApiResponseUtil } from "../../utils/apiResponse.js";
import { MESSAGES } from "../../constants/messages.constant.js";

export class AuthController {
  private authService = new AuthService();

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, firstName, lastName } = req.body;

      const result = await this.authService.register({
        email,
        password,
        firstName,
        lastName,
      });

      res
        .status(201)
        .json(ApiResponseUtil.success(result, MESSAGES.USER_CREATED));
    } catch (error: any) {
      res.status(400).json(ApiResponseUtil.error(error.message));
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      res.json(ApiResponseUtil.success(result, MESSAGES.AUTH_SUCCESS));
    } catch (error: any) {
      res.status(401).json(ApiResponseUtil.error(error.message));
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      const result = await this.authService.refreshToken(refreshToken);

      res.json(ApiResponseUtil.success(result, MESSAGES.SUCCESS));
    } catch (error: any) {
      res.status(401).json(ApiResponseUtil.error(error.message));
    }
  };

  forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;

      await this.authService.forgotPassword(email);

      res.json(ApiResponseUtil.success(null, MESSAGES.PASSWORD_RESET_SENT));
    } catch (error: any) {
      res.status(400).json(ApiResponseUtil.error(error.message));
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token, newPassword } = req.body;

      await this.authService.resetPassword(token, newPassword);

      res.json(ApiResponseUtil.success(null, MESSAGES.PASSWORD_RESET_SUCCESS));
    } catch (error: any) {
      res.status(400).json(ApiResponseUtil.error(error.message));
    }
  };
}
