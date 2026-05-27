import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
    },
    customerMobile: {
        type: String,
        required: [true, 'Customer mobile number is required'],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // we can't use a strict ref because it can be a Cake or a Bouquet
        // so we'll handle the lookup manually or via a dynamic ref if needed,
        // but for now we just store the ID.
    },
    productType: {
        type: String,
        required: true,
        enum: ['cake', 'bouquet'],
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
    },
    notes: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Order = mongoose.model("Order", orderSchema);
