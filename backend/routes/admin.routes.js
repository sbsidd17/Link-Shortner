import express from "express"
import { deleteLink, deleteUser, getAllLinks, getAllUsers } from "../controller/admin.controller.js"
import { isAdmin } from "../middleware/admin.middleware.js";

const adminRoute = express.Router()

adminRoute.post("/all-links/limit=:limit&page=:page", isAdmin , getAllLinks)
adminRoute.post("/all-links", isAdmin , getAllLinks)
adminRoute.post("/delete-link/:id", isAdmin, deleteLink)
adminRoute.post("/all-users", isAdmin, getAllUsers)
adminRoute.post("/delete-user/:id", isAdmin, deleteUser)

export {adminRoute}