import express from "express"
import { authRoutes } from "../modules/auth/auth.routes";
export const router = express.Router();

router.use("/auth", authRoutes);

router.get("/health", (req, res) => {
    res.json({
      success: true,
      message: "Server is running",
      timestamp: new Date().toISOString(),
    });
})