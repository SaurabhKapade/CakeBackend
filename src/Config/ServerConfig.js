import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const OWNER_WHATSAPP_E164 =
    process.env.OWNER_WHATSAPP_E164 || "918208497945";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
export const JWT_SECRET = process.env.JWT_SECRET

export const APP_PASS = process.env.APP_PASS
export const APP_USER = process.env.APP_USER