import express from "express";
import { loginUser, logoutUser, registerUser, verifyOtp } from "../Controller/userAuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
