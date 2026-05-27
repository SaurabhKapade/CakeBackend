import { loginUserService, registerUserService, verifyOtpService } from "../Services/userAuthService.js";

export const registerUser = async (req, res) => {
    try {
        const response = await registerUserService(req.body);
        return res.status(200).json({
            success: true,
            message: response.message,
            data: {},
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Registration failed",
            data: {},
            error
        });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const response = await verifyOtpService(email, otp);
        return res.status(200).json({
            success: true,
            message: response.message,
            data: {},
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "OTP verification failed",
            data: {},
            error
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await loginUserService(email, password);
        
        res.cookie('authToken', response.token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: response, // Contains token and user object
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Login failed",
            data: {},
            error
        });
    }
};

export const logoutUser = async (req, res) => {
    res.cookie('authToken', "", {
        httpOnly: true,
        secure: false,
        maxAge: 0
    });
    return res.status(200).json({
        success: true,
        message: 'Logged out successfully',
        data: {},
        error: {}
    });
};
