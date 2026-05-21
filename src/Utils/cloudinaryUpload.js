import { cloudinary } from "../Config/cloudinaryConfig.js";

/**
 * @param {Buffer} buffer
 * @returns {Promise<{ secure_url: string, public_id: string }>}
 */
export function uploadPaymentScreenshotBuffer(buffer) {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "cake-orders/payments",
                resource_type: "image",
            },
            (error, result) => {
                if (error) reject(error);
                else
                    resolve({
                        secure_url: result.secure_url,
                        public_id: result.public_id,
                    });
            }
        );
        stream.end(buffer);
    });
}
