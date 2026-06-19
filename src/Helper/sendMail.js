import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { APP_PASS, APP_USER } from '../Config/ServerConfig.js';
dotenv.config();

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user:APP_USER,
        pass: APP_PASS
    }
});

export const sendMail = async (to, subject, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `"Cake Studio By Royal" <${APP_USER}>`,
            to,
            subject: subject || "Your Verification Code",

            text: `Your OTP is ${otp}. It will expire soon.`,

            html: `
            <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
                <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px; border:1px solid #eee;">
                    
                    <h2 style="color:#333;">🔐 Email Verification</h2>
                    
                    <p>Hello,</p>
                    
                    <p>Use the following OTP to complete your verification:</p>
                    
                    <div style="text-align:center; margin:20px 0;">
                        <span style="
                            display:inline-block;
                            font-size:28px;
                            letter-spacing:6px;
                            font-weight:bold;
                            background:#f0f0f0;
                            padding:10px 20px;
                            border-radius:8px;
                            color:#111;
                        ">
                            ${otp}
                        </span>
                    </div>

                    <p style="color:#555;">
                        ⚠️ This OTP is valid for a limited time. Do not share it with anyone.
                    </p>

                    <hr style="margin:20px 0;" />

                    <p style="font-size:12px; color:#888;">
                        If you didn’t request this, you can ignore this email.
                    </p>
                </div>
            </div>
            `
        });

        return info;

    } catch (error) {
        console.log("Nodemailer error:", error);

        throw {
            message: "Can't send OTP right now. Please try again later."
        };
    }
};
