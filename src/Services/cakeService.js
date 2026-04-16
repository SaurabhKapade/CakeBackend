import { addCake, deleteCakeById, getAllCakes, getCakeById, updateCakeById } from "../Repository/cakeRepositoy.js"
export const insertCake = async(cakeData)=>{
    const cake = await addCake(cakeData)
    if(!cake){
        throw{reason:"not able to add Cake in database"} 
    }
    return cake;
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
    const cake = await deleteCakeById(cakeId);
    return cake;
};