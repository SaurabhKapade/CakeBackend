import { error } from "console";
import { cloudinary } from "../Config/cloudinaryConfig.js";
import fs from "fs"

export const uploadImageOnCloudinary = async (imagePath)=>{
    try{
        const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
        return{
            secure_url : cloudinaryResponse.secure_url,
            public_id : cloudinaryResponse.public_id
        }
    }catch(error){
        console.log(error);
    }
}

export const deleteCloudinaryUploadedImage = async (public_id)=>{
    try{
        const response = await cloudinary.uploader.destroy(public_id)
        return response
    }catch(error){
        console.log(error)
    }
}