import {
    cancelOrderForUser,
    editOrderStatus,
    fetchAllOrders,
    fetchUserOrders,
    insertOrder,
} from "../Services/orderService.js";

export const createOrder = async (req, res) => {
    try {
        const orderData = { ...req.body, userId: req.user.userId };
        const response = await insertOrder(orderData);
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Order created successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to create order",
            data: {},
            error: error,
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const response = await fetchAllOrders();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Orders fetched successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to fetch orders",
            data: {},
            error: error,
        });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const response = await fetchUserOrders(req.user.userId);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Orders fetched successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to fetch your orders",
            data: {},
            error: error,
        });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const response = await cancelOrderForUser(
            req.params.id,
            req.user.userId
        );
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order cancelled successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to cancel order",
            data: {},
            error: error,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const response = await editOrderStatus(req.params.id, status);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Order status updated successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to update order status",
            data: {},
            error: error,
        });
    }
};
