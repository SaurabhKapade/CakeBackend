import express from "express";
import { createCake, deleteCake, getCake, getCakes, updateCake } from "../Controller/cakeController.js";
export const cakeRouter = express.Router()

cakeRouter.post("/add", createCake);
cakeRouter.get("/", getCakes);
cakeRouter.get("/:id", getCake);
cakeRouter.patch("/:id", updateCake);
cakeRouter.delete("/:id", deleteCake);
