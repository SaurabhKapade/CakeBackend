import { createHash, randomInt, randomBytes } from "crypto";
import { OTP_PEPPER } from "../Config/ServerConfig.js";

export function generateOtpCode() {
    return String(randomInt(100000, 1000000));
}

export function hashOtp(phoneDigits, code) {
    return createHash("sha256")
        .update(`${OTP_PEPPER}:${phoneDigits}:${code}`)
        .digest("hex");
}

export function generateSessionToken() {
    return randomBytes(32).toString("hex");
}
