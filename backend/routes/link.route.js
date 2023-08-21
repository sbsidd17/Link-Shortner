import express from "express"
import { generateShortLink, redirect, getAllLinks } from "../controller/links.controller.js";
import { isUser } from "../middleware/link.middleware.js";
import { isAdmin } from "../middleware/user.middleware.js";


const linkRoutes = express.Router()

linkRoutes.get("/",(req,res)=>{
    res.send("ShortLink Backend Running...")
})
linkRoutes.post("/", isUser, generateShortLink)
linkRoutes.get("/:shortId", redirect)
linkRoutes.post("/admin/allLinks/limit=:limit&page=:page", isAdmin ,getAllLinks)

export default linkRoutes;
