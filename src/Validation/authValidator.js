import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../Config/ServerConfig.js";

export const isAdmin = (req, res, next) => {
    const token = req.cookies['authToken'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No auth token provided, Login to complete action"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            userName: decoded.username,
            role: decoded.ROLE
        };
        console.log("req user is", req.user);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Invalid token provided"
        });
    }
};

export const isUser = (req, res, next) => {
    const token = req.cookies['authToken'];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No auth token provided, Login to complete action"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token provided"
        });
    }
};
