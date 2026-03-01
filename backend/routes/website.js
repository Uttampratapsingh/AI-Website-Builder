import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { changeWebsite, generateWebsite, getAllWebsites, getWebsitesById } from "../controllers/website.js";


const websiteRouter = express.Router();

websiteRouter.post("/generate",isAuth, generateWebsite);
websiteRouter.post("/update",isAuth, changeWebsite);

websiteRouter.get("/get-by-id/:id",isAuth, getWebsitesById);
websiteRouter.get("/get-all",isAuth, getAllWebsites);

export default websiteRouter;