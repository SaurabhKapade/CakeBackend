import { Cake } from "../Models/CakeModel.js";
import { Bouquet } from "../Models/BouquetModel.js";
import { Order } from "../Models/OrderModel.js";
import {
    createOrderRepo,
    getAllOrdersRepo,
    getUserOrdersRepo,
    updateOrderStatusRepo,
} from "../Repository/orderRepository.js";

const MOBILE_RE = /^[6-9]\d{9}$/;

async function resolveProduct(productId, productType) {
    if (productType === "cake") {
        return Cake.findById(productId);
    }
    if (productType === "bouquet") {
        return Bouquet.findById(productId);
    }
    return null;
}

export const insertOrder = async (orderData) => {
    const {
        productId,
        productType,
        quantity = 1,
        customerMobile,
        notes,
        description,
    } = orderData;

    const mobileDigits = String(customerMobile || "").replace(/\D/g, "");
    const normalizedMobile =
        mobileDigits.length === 12 && mobileDigits.startsWith("91")
            ? mobileDigits.slice(2)
            : mobileDigits;

    if (!MOBILE_RE.test(normalizedMobile)) {
        throw {
            statusCode: 400,
            reason: "Enter a valid 10-digit Indian mobile number",
        };
    }

    const orderNotes = (notes || description || "").trim();
    if (!orderNotes) {
        throw {
            statusCode: 400,
            reason: "Order description is required",
        };
    }

    const product = await resolveProduct(productId, productType);
    if (!product) {
        throw { statusCode: 404, reason: "Product not found" };
    }

    const qty = Math.max(1, Math.min(99, Number(quantity) || 1));
    const price = product.price;
    const totalAmount = price * qty;

    const payload = {
        ...orderData,
        customerMobile: normalizedMobile,
        quantity: qty,
        price,
        totalAmount,
        productImage: product.image,
        productName: orderData.productName || product.name,
        notes: orderNotes,
    };

    const response = await createOrderRepo(payload);
    if (!response) {
        throw { reason: "Not able to add Order in database" };
    }
    return response;
};

export const fetchAllOrders = async () => {
    const orders = await getAllOrdersRepo();
    if (!orders) {
        throw { reason: "Not able to fetch Orders from database" };
    }
    return orders;
};

export const fetchUserOrders = async (userId) => {
    const orders = await getUserOrdersRepo(userId);
    if (!orders) {
        throw { reason: "Not able to fetch your Orders from database" };
    }
    return orders;
};

export const editOrderStatus = async (orderId, status) => {
    const order = await updateOrderStatusRepo(orderId, status);
    if (!order) {
        throw { reason: "Not able to update Order status in database" };
    }
    return order;
};

export const cancelOrderForUser = async (orderId, userId) => {
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
        throw { statusCode: 404, reason: "Order not found" };
    }
    if (order.status !== "Pending") {
        throw {
            statusCode: 400,
            reason: "Only pending orders can be cancelled",
        };
    }
    const updated = await updateOrderStatusRepo(orderId, "Cancelled");
    if (!updated) {
        throw { reason: "Not able to cancel order" };
    }
    return updated;
};
