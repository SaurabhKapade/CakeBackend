import {
    editBouquetById,
    fetchAllBouquets,
    fetchBouquetById,
    insertBouquet,
    removeBouquetById,
    searchBouquetService,
} from "../Services/bouquetService.js";

export const createBouquet = async (req, res) => {
    try {
        const product = ({
            ...req.body,
            imagePath : req.file.path
        })
        const response = await insertBouquet(product);
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Bouquet created successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to create bouquet",
            data: {},
            error: error,
        });
    }
};

export const getBouquets = async (req, res) => {
    try {
        const response = await fetchAllBouquets();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bouquets fetched successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to fetch bouquets",
            data: {},
            error: error,
        });
    }
};

export const getBouquet = async (req, res) => {
    try {
        const response = await fetchBouquetById(req.params.id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bouquet fetched successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to fetch bouquet",
            data: {},
            error: error,
        });
    }
};

export const updateBouquet = async (req, res) => {
    try {
        const response = await editBouquetById(req.params.id, req.body);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bouquet updated successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to update bouquet",
            data: {},
            error: error,
        });
    }
};

export const deleteBouquet = async (req, res) => {
    try {
        const response = await removeBouquetById(req.params.id);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bouquet deleted successfully",
            data: response,
            error: {},
        });
    } catch (error) {
        return res.status(error?.statusCode || 400).json({
            success: false,
            statusCode: error?.statusCode || 400,
            message: error?.reason || "Not able to delete bouquet",
            data: {},
            error: error,
        });
    }
};

export const searchBouquet = async (req, res) => {
    try {
        const { name = "", category } = req.query;
        const bouquets = await searchBouquetService({ name, category });
        return res.json({
            success: true,
            data: bouquets,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Search failed",
        });
    }
};
