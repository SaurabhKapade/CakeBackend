import mongoose from "mongoose";

const cakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:[true,'description should be provided'],
        minlength:[10,'description should be minimum 10 character long'],
        maxlength:[200,'description should be less than or equal 200 character']
    },
    price: {
        type: Number,
        required: [true,'price should be provided'],
    },
    image: {
        type: String,
    },
    publicId: {
        type: String,
    },
    category: {
        type: String,
        
    },
    ingredients: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

export const Cake = mongoose.model("Cake", cakeSchema);