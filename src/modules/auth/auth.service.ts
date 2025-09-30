import * as jwt from "jsonwebtoken";
import type { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

import crypto from "crypto";
import { env } from "../../config/env";
import { BcryptUtil } from "../../utils/bcrypt.util";
import { MESSAGES } from "../../constants/messages.constant";
import { UserModel, type IUser } from "../../models/user.model";

const JWT = ((jwt as unknown as { default?: any }).default ?? jwt) as {
  sign: (payload: string | object | Buffer, secret: Secret, options?: SignOptions) => string;
  verify: (token: string, secret: Secret) => string | JwtPayload;
};

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  user: Omit<IUser, "password">;
  accessToken: string;
  refreshToken: string;
}

interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export class AuthService {
  async register(data: RegisterData): Promise<LoginResponse> {
    const existing = await UserModel.findOne({ email: data.email }).lean();
    if (existing) throw new Error(MESSAGES.USER_ALREADY_EXISTS);

    const hashed = await BcryptUtil.hash(data.password);

    const userDoc = await UserModel.create({
      ...data,
      password: hashed,
      emailVerificationToken: crypto.randomBytes(32).toString("hex"),
    });

    const userObj = userDoc.toObject();
    delete (userObj as any).password;

    const tokens = this.generateTokens({
      id: userDoc.id,
      email: userDoc.email,
      role: userDoc.role,
    });

    return { user: userObj as any, ...tokens };
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const userDoc = await UserModel.findOne({ email });
    if (!userDoc || !userDoc.password) throw new Error(MESSAGES.INVALID_CREDENTIALS);

    const ok = await BcryptUtil.compare(password, userDoc.password);
    if (!ok) throw new Error(MESSAGES.INVALID_CREDENTIALS);

    const userObj = userDoc.toObject();
    delete (userObj as any).password;

    const tokens = this.generateTokens({
      id: userDoc.id,
      email: userDoc.email,
      role: userDoc.role,
    });

    return { user: userObj as any, ...tokens };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = JWT.verify(refreshToken, env.JWT_REFRESH_SECRET as Secret) as JWTPayload;

      const user = await UserModel.findById(decoded.id).lean();
      if (!user) throw new Error(MESSAGES.USER_NOT_FOUND);

      const accessToken = this.generateAccessToken({
        id: String(user._id),
        email: user.email,
        role: user.role as string,
      });

      return { accessToken };
    } catch {
      throw new Error(MESSAGES.TOKEN_INVALID);
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await UserModel.findOne({ email });
    if (!user) return; 
    user.passwordResetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await UserModel.findOne({ passwordResetToken: token });
    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new Error(MESSAGES.TOKEN_INVALID);
    }
    user.password = await BcryptUtil.hash(newPassword);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
  }

  // ===== JWT helpers =====
  private generateTokens(user: { id: string; email: string; role: string }) {
    const payload: JWTPayload = { id: user.id, email: user.email, role: user.role };
    const accessOpts: SignOptions  = { expiresIn: env.JWT_EXPIRES_IN };          
    const refreshOpts: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN }; 

    const accessToken  = JWT.sign(payload, env.JWT_SECRET as Secret, accessOpts);
    const refreshToken = JWT.sign(payload, env.JWT_REFRESH_SECRET as Secret, refreshOpts);

    return { accessToken, refreshToken };
  }

  private generateAccessToken(user: { id: string; email: string; role: string }) {
    const payload: JWTPayload = { id: user.id, email: user.email, role: user.role };
    const opts: SignOptions = { expiresIn: env.JWT_EXPIRES_IN };
    return JWT.sign(payload, env.JWT_SECRET as Secret, opts);
  }
}
