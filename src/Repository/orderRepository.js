import { Order } from "../Models/OrderModel.js";

export const createOrderRepo = async (orderData) => {
    try {
        const order = new Order(orderData);
        await order.save();
        return order;
    } catch (error) {
        console.log(error);
        throw { reason: "Something went wrong while creating order", statusCode: 500 };
    }
};

const orderPopulate = { path: "userId", select: "username email" };

export const getAllOrdersRepo = async () => {
    try {
        const orders = await Order.find()
            .populate(orderPopulate)
            .sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        console.log(error);
        throw { reason: "Something went wrong while fetching orders", statusCode: 500 };
    }
};

export const updateOrderStatusRepo = async (orderId, status) => {
    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status, updatedAt: Date.now() },
            { new: true }
        ).populate(orderPopulate);
        return order;
    } catch (error) {
        console.log(error);
        throw { reason: "Something went wrong while updating order status", statusCode: 500 };
    }
};

export const getUserOrdersRepo = async (userId) => {
    try {
        const orders = await Order.find({ userId })
            .populate(orderPopulate)
            .sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        console.log(error);
        throw { reason: "Something went wrong while fetching user orders", statusCode: 500 };
    }
};
