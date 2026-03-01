import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { generateWebsite, getWebsitesById } from "../controllers/website.js";


const websiteRouter = express.Router();

websiteRouter.post("/generate",isAuth, generateWebsite);

websiteRouter.get("/get-by-id/:id",isAuth, getWebsitesById);

export default websiteRouter;