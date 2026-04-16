import mongoose from "mongoose";
import { MONGO_URL } from "./ServerConfig.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}
