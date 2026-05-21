import multer from "multer";
import path from "path";

const storageconfiguration = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, "uploads/");
    },
    filename: (req, file, next) => {
        next(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

export const uploader = multer({ storage: storageconfiguration });
