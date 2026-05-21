import { deleteCloudinaryUploadedImage, uploadImageOnCloudinary } from "../Helper/CloudinaryHelper.js";
import {
    addBouquet,
    deleteBouquetById,
    getAllBouquets,
    getBouquetById,
    searchBouquets,
    updateBouquetById,
} from "../Repository/bouquetRepository.js";

export const insertBouquet = async (bouquetData) => {
    if(bouquetData.imagePath){
        const cloudinaryResponse = await uploadImageOnCloudinary(bouquetData.imagePath);
        const bouquet = ({
            ...bouquetData,
            image:cloudinaryResponse.secure_url,
            publicId : cloudinaryResponse.public_id
        })

        var response = await addBouquet(bouquet)
    }
    if (!response) {
        throw { reason: "not able to add bouquet in database" };
    }
    return response;
};

export const fetchAllBouquets = async () => {
    return getAllBouquets();
};

export const fetchBouquetById = async (bouquetId) => {
    return getBouquetById(bouquetId);
};

export const editBouquetById = async (bouquetId, updateData) => {
    return updateBouquetById(bouquetId, updateData);
};

export const removeBouquetById = async (bouquetId) => {
    const bouquet = await getBouquetById(bouquetId)
    const cloudinaryResponse = await deleteCloudinaryUploadedImage(bouquet.publicId)
    const response =  deleteBouquetById(bouquetId);
    return response;
};

export const searchBouquetService = async (query) => {
    return searchBouquets(query);
};
