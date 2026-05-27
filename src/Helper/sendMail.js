import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { APP_PASS } from '../Config/ServerConfig.js';
dotenv.config();

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user:'saurabhkapade60@gmail.com',
        pass: APP_PASS
    }
});

export const sendMail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
        });
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};
