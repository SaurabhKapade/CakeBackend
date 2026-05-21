import express from "express";
import { createCake, deleteCake, getCake, getCakes, searchCake, updateCake } from "../Controller/cakeController.js";
import { uploader } from "../Middlewares/multerMiddleware.js";
import { isAdmin } from "../Validation/authValidator.js";


export const cakeRouter = express.Router();

cakeRouter.post("/add",isAdmin, uploader.single("image"), createCake);
cakeRouter.get("/search", searchCake);
cakeRouter.get("/", getCakes);
cakeRouter.get("/:id", getCake);
cakeRouter.patch("/update/:id",isAdmin,updateCake);
cakeRouter.delete("/:id",isAdmin,deleteCake);
