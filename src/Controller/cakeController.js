import { editCakeById, fetchAllCakes, fetchCakeById, insertCake, removeCakeById } from "../Services/cakeService.js"

export const createCake = async (req, res) => {
    try {
        const response = await insertCake(req.body);
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Cake created successfully",
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to create cake",
            data: {},
            error: error,
        })
    }
};

export const getCakes = async (req, res) => {
    try {
        const response = await fetchAllCakes();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cakes fetched successfully",
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to fetch cakes",
            data: {},
            error: error,
        })
    }
};

export const getCake = async (req, res) => {
    try {
        const response = await fetchCakeById(req.params.id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cake fetched successfully",
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to fetch cake",
            data: {},
            error: error,
        })
    }
};

export const updateCake = async (req, res) => {
    try {
        const response = await editCakeById(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cake updated successfully",
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to update cake",
            data: {},
            error: error,
        })
    }
};

export const deleteCake = async (req, res) => {
    try {
        const response = await removeCakeById(req.params.id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Cake deleted successfully",
            data: response,
            error: {},
        })
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to delete cake",
            data: {},
            error: error,
        })
    }
};