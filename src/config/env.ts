import "dotenv/config";
import { cleanEnv, str, url, port } from "envalid";


export const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),

  MONGODB_URL: str(),

  FRONTEND_URL: url({ default: "http://localhost:5173" }),

  JWT_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_EXPIRES_IN: str({ default: "1d" }), 
  JWT_REFRESH_EXPIRES_IN: str({ default: "7d" }),
});
