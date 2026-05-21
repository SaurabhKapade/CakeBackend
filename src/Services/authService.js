import { ADMIN_PASSWORD, ADMIN_USERNAME, JWT_SECRET } from "../Config/ServerConfig.js";
import jwt  from 'jsonwebtoken'
export const loginAdmin = async(loginPayload) =>{
    const username = loginPayload.userName;
    const password = loginPayload.password;

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        throw{
            message:'No user found with given credentials',
            statusCode:404
        }
    }

    const Token = jwt.sign({username : username,ROLE:"ADMIN"},JWT_SECRET,{expiresIn:'24h'});
    console.log("generated token is ",Token);

    return Token;
}
