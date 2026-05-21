import express from 'express'
import { login, logOut } from '../Controller/authController.js';
export const authRouter = express.Router();

authRouter.post("/login",login)
authRouter.post("/logout",logOut)