import cors from "cors";
import { env } from "../config/env";


  const corsOptions = {
   origin: [env.FRONTEND_URL],
 };

export const corsMiddleware =cors(corsOptions)