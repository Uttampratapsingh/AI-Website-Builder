import express from "express";
import { getUser } from "../controllers/user.js";
import isAuth from "../middlewares/isAuth.js";


const userRouter = express.Router();

userRouter.get("/me",isAuth, getUser);

export default userRouter;