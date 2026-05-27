import express from "express";
import {
    cancelOrder,
    createOrder,
    getMyOrders,
    getOrders,
    updateOrderStatus,
} from "../Controller/orderController.js";
import { isAdmin, isUser } from "../Validation/authValidator.js";

const router = express.Router();

router.post("/", isUser, createOrder);
router.get("/myorders", isUser, getMyOrders);
router.patch("/:id/cancel", isUser, cancelOrder);
router.get("/", isAdmin, getOrders);
router.put("/:id/status", isAdmin, updateOrderStatus);

export default router;
