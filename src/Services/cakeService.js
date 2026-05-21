import { deleteCloudinaryUploadedImage, uploadImageOnCloudinary } from "../Helper/CloudinaryHelper.js"
import { addCake, deleteCakeById, getAllCakes, getCakeById, searchCake, updateCakeById } from "../Repository/cakeRepositoy.js"
export const insertCake = async(cakeData)=>{
    if(cakeData.imagePath){
        const cloudinaryResponse = await uploadImageOnCloudinary(cakeData.imagePath)
        const cake = ({
            ...cakeData,
            image : cloudinaryResponse.secure_url,
            publicId : cloudinaryResponse.public_id
        })
        var response = await addCake(cake)
    }
    if(!response){
        throw{reason:"not able to add Cake in database"} 
    }
    return response;
}

export const fetchAllCakes = async () => {
    const cakes = await getAllCakes();
    return cakes;
};

export const fetchCakeById = async (cakeId) => {
    const cake = await getCakeById(cakeId);
    return cake;
};

export const editCakeById = async (cakeId, updateData) => {
    const cake = await updateCakeById(cakeId, updateData);
    return cake;
};

export const removeCakeById = async (cakeId) => {
    const cake = await getCakeById(cakeId);
    const cloudinaryResponse = await deleteCloudinaryUploadedImage(cake.publicId);
    const response = await deleteCakeById(cakeId);
    return response;
};

export const searchCakeService = async (query) => {
    const cakes = await searchCake(query);

    if (!cakes) {
        throw { reason: "No cakes found" };
    }

    return cakes;
};