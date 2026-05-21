import express from "express";
import {
    createBouquet,
    deleteBouquet,
    getBouquet,
    getBouquets,
    searchBouquet,
    updateBouquet,
} from "../Controller/bouquetController.js";
import {isAdmin} from "../Validation/authValidator.js"
import { uploader } from "../Middlewares/multerMiddleware.js";

export const bouquetRouter = express.Router();

bouquetRouter.post("/add",isAdmin,uploader.single("image"), createBouquet);
bouquetRouter.get("/search", searchBouquet);
bouquetRouter.get("/", getBouquets);
bouquetRouter.get("/:id", getBouquet);
bouquetRouter.patch("/update/:id",isAdmin,updateBouquet);
bouquetRouter.delete("/:id",isAdmin,deleteBouquet);
