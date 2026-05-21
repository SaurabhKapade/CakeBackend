import { Bouquet } from "../Models/BouquetModel.js";

export const addBouquet = async (bouquetData) => {
    try {
        return await Bouquet.create(bouquetData);
    } catch (error) {
        if (error?.name === "ValidationError") {
            const errorMessageList = Object.keys(error.errors).map(
                (property) => error.errors[property].message
            );
            throw {
                statusCode: 400,
                reason: "Validation failed",
                errors: errorMessageList,
            };
        }
        throw {
            statusCode: 500,
            reason: "Not able to add bouquet in database",
            error,
        };
    }
};

export const getAllBouquets = async () => {
    try {
        return await Bouquet.find({}).sort({ createdAt: -1 });
    } catch (error) {
        throw {
            statusCode: 500,
            reason: "Not able to fetch bouquets",
            error,
        };
    }
};

export const getBouquetById = async (bouquetId) => {
    try {
        const bouquet = await Bouquet.findById(bouquetId);
        if (!bouquet) {
            throw { statusCode: 404, reason: "Bouquet not found" };
        }
        return bouquet;
    } catch (error) {
        if (error?.statusCode) throw error;
        throw {
            statusCode: 500,
            reason: "Not able to fetch bouquet",
            error,
        };
    }
};

export const updateBouquetById = async (bouquetId, updateData) => {
    try {
        const bouquet = await Bouquet.findByIdAndUpdate(
            bouquetId,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );
        if (!bouquet) {
            throw { statusCode: 404, reason: "Bouquet not found" };
        }
        return bouquet;
    } catch (error) {
        if (error?.name === "ValidationError") {
            const errorMessageList = Object.keys(error.errors).map(
                (property) => error.errors[property].message
            );
            throw {
                statusCode: 400,
                reason: "Validation failed",
                errors: errorMessageList,
            };
        }
        if (error?.statusCode) throw error;
        throw {
            statusCode: 500,
            reason: "Not able to update bouquet",
            error,
        };
    }
};

export const deleteBouquetById = async (bouquetId) => {
    try {
        const bouquet = await Bouquet.findByIdAndDelete(bouquetId);
        if (!bouquet) {
            throw { statusCode: 404, reason: "Bouquet not found" };
        }
        return bouquet;
    } catch (error) {
        if (error?.statusCode) throw error;
        throw {
            statusCode: 500,
            reason: "Not able to delete bouquet",
            error,
        };
    }
};

export const searchBouquets = async (query) => {
    try {
        const filter = {};

        if (query?.name) {
            filter.name = { $regex: query.name, $options: "i" };
        }

        if (query?.category) {
            filter.category = { $regex: query.category, $options: "i" };
        }

        return await Bouquet.find(filter);
    } catch (error) {
        throw {
            statusCode: 500,
            reason: "Not able to search bouquets",
            error,
        };
    }
};
