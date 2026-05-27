import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel.js";
import { sendMail } from "../Helper/sendMail.js";
import { JWT_SECRET } from "../Config/ServerConfig.js";

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUserService = async (userData) => {
    const { username, email, password } = userData;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    console.log("im inside service", existingUser);
    if (existingUser) {
        if (existingUser.isVerified) {
            throw { message: "User with this email already exists", statusCode: 400 };
        } else {
            // Re-send OTP if not verified yet
            const otp = generateOtp();
            existingUser.otp = otp;
            existingUser.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins
            
            // update password in case they tried a different one this time
            existingUser.password = await bcrypt.hash(password, 10);
            await existingUser.save();

            await sendMail(email, "Your Sweet Slice Verification OTP", `Your OTP is ${otp}`);
            return { message: "OTP sent to email. Please verify to complete registration." };
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: "user",
        isVerified: false,
        otp: otp,
        otpExpires: Date.now() + 5 * 60 * 1000,
    });

    await newUser.save();

    await sendMail(email, "Your Sweet Slice Verification OTP", `Your OTP is ${otp}`);

    return { message: "OTP sent to email. Please verify to complete registration." };
};

export const verifyOtpService = async (email, otp) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }

    if (user.isVerified) {
        throw { message: "User is already verified", statusCode: 400 };
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
        throw { message: "Invalid or expired OTP", statusCode: 400 };
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return { message: "User verified successfully" };
};

export const loginUserService = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw { message: "No user found with given credentials", statusCode: 404 };
    }

    if (!user.isVerified) {
        throw { message: "Please verify your email first", statusCode: 403 };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw { message: "Invalid password", statusCode: 401 };
    }

    const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    // Exclude password from the returned user object
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.otp;
    delete userResponse.otpExpires;

    return { token, user: userResponse };
};
