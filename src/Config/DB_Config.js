import mongoose from "mongoose";
import { MONGO_URL } from "./ServerConfig.js";
export const connectDB = async () => {
    if (!MONGO_URL) {
        throw new Error("MONGO_URL is missing. Set it in CakeBackend/.env");
    }
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;
    }
};
