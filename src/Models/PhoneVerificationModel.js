import mongoose from "mongoose";

const phoneVerificationSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    codeHash: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    lastOtpSentAt: {
        type: Date,
        default: Date.now,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    sessionToken: {
        type: String,
        default: null,
    },
    sessionExpiresAt: {
        type: Date,
        default: null,
    },
});

export const PhoneVerification = mongoose.model(
    "PhoneVerification",
    phoneVerificationSchema
);
