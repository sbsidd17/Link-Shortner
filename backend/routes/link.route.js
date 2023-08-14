import express from "express"
import { generateShortLink, redirect } from "../controller/links.controller.js";

const linkRoutes = express.Router()

linkRoutes.get("/",(req,res)=>{
    res.send("ShortLink Backend Running...")
})
linkRoutes.post("/", generateShortLink)
linkRoutes.get("/:shortId", redirect)

export default linkRoutes;
