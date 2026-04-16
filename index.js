import express from "express";
import { PORT } from "./src/Config/ServerConfig.js";
import { connectDB } from "./src/Config/DB_Config.js"; 
import { cakeRouter } from "./src/Routes/cakeRoutes.js"
// import cookieParser from "cookie-parser";   
const app = express();

// app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cake",cakeRouter)
app.listen(PORT,async ()=>{
    await connectDB();
    console.log("Server is running on port 3000");
})

app.get("/ping",(req,res)=>{
    return res.json({
        success:true,
        message:"pong"
    })
})
