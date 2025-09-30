import mongoose from "mongoose"
import { env } from "./env"

export const connectMongoDb = async (): Promise<void> => {

     await mongoose.connect(env.MONGODB_URL);

};