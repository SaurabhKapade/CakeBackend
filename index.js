import express from "express";
import cors from "cors";
import { PORT } from "./src/Config/ServerConfig.js";
import { connectDB } from "./src/Config/DB_Config.js";
import { cakeRouter } from "./src/Routes/cakeRoutes.js";
import { bouquetRouter } from "./src/Routes/bouquetRoutes.js";
import { authRouter } from "./src/Routes/authRoutes.js";
import orderRouter from "./src/Routes/orderRoutes.js";
import userAuthRouter from "./src/Routes/userAuthRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        // allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cake", cakeRouter);
app.use("/bouquet", bouquetRouter);
app.use("/auth",authRouter)
app.use("/api/auth", userAuthRouter);
app.use("/api/orders", orderRouter);

app.get("/ping", (req, res) => {
    return res.json({
        success: true,
        message: "pong",
    });
});

async function start() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
});
