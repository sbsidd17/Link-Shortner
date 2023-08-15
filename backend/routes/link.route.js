import express from "express"
import { generateShortLink, redirect } from "../controller/links.controller.js";
import { isUser } from "../middleware/link.middleware.js";


const linkRoutes = express.Router()

linkRoutes.get("/",(req,res)=>{
    res.send("ShortLink Backend Running...")
})
linkRoutes.post("/", isUser, generateShortLink)
linkRoutes.get("/:shortId", redirect)

export default linkRoutes;
