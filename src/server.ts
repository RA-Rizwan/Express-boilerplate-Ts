import { app } from "./app";
import { connectMongoDb } from "./config/db.mongo";
import { env } from "./config/env";

async function startServer() {
  await connectMongoDb();
  console.log("db connected ✅");
  app.listen(env.PORT, () => {
    console.log("Server is running on port 3000");
  });
}

startServer();
