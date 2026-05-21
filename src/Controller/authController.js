import { loginAdmin } from "../Services/authService.js";

export const login = async(req,res)=>{
    try{
        console.log(req.body);
        const loginPayload = req.body;
        const response = await loginAdmin(loginPayload);
        console.log("response is ",response);
        res.cookie('authToken',response,{
            httpOnly:true,
            secure:false,
            maxAge:24*60*60*1000
        });
        return res.status(200).json({
            success:true,
            message:'login Successfully',
            data:response,
            error:{}
        });
    }catch(error){
        console.log("e is ",error)
        return res.status(error.statusCode).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        });
    }

};

export const logOut = async(req,res)=>{
    res.cookie('authToken',"",{
        httpOnly:true,
        secure:false
    })
    return res.status(200).json({
        success:true,
        message:'loggedOut Successfully',
        data:{},
        error:{}
    })
}