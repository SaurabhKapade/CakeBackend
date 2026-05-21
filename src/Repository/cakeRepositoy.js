import { Cake } from "../Models/CakeModel.js"
import mongoose from "mongoose";

export const addCake = async (cakeData) => {
    try {
        const response = await Cake.create(cakeData)
        return response;
    } catch (error) {
        console.log(error)
        if (error?.name === "ValidationError") {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            throw {
                statusCode: 400,
                reason: errorMessageList[0],
                errors: errorMessageList,
            };
        }
        throw {
            statusCode: 500,
            reason: "Not able to add cake in database",
            error,
        };
    }
}

export const getAllCakes = async () => {
    try {
        return await Cake.find({}).sort({ createdAt: -1 });
    } catch (error) {
        throw {
            statusCode: 500,
            reason: "Not able to fetch cakes",
            error,
        };
    }
};

export const getCakeById = async (cakeId) => {
    try {
        const cake = await Cake.findById(cakeId);
        if (!cake) {
            throw { statusCode: 404, reason: "Cake not found" };
        }
        return cake;
    } catch (error) {
        if (error?.statusCode) throw error;
        throw {
            statusCode: 500,
            reason: "Not able to fetch cake",
            error,
        };
    }
};

export const updateCakeById = async (cakeId, updateData) => {
    try {
        const cake = await Cake.findByIdAndUpdate(
            cakeId,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!cake) {
            throw { statusCode: 404, reason: "Cake not found" };
        }
        return cake;
    } catch (error) {
        if (error?.name === "ValidationError") {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            throw {
                statusCode: 400,
                reason: "Validation failed",
                errors: errorMessageList,
            };
        }
        if (error?.statusCode) throw error;
        throw {
            statusCode: 500,
            reason: "Not able to update cake",
            error,
        };
    }
};

export const deleteCakeById = async (cakeId) => {
    try {
        const cake = await Cake.findByIdAndDelete(cakeId);
        if (!cake) {
            throw { statusCode: 404, reason: "Cake not found" };
        }
        return cake;
    } catch (error) {
        if (error?.statusCode) throw error;
        throw {
            statusCode: 500,
            reason: "Not able to delete cake",
            error,
        };
    }
};

export const searchCake = async (query) => {
    try {
        const filter = {};

        if (query?.name) {
            filter.name = { $regex: query.name, $options: "i" };
        }

        if (query?.category) {
            filter.category = { $regex: query.category, $options: "i" };
        }

        const response = await Cake.find(filter);
        return response;

    } catch (error) {
        throw {
            statusCode: 500,
            reason: "Not able to search cakes",
            error,
        };
    }
};