import express from "express"
import { dashboard, login, logout, signup } from "../controller/user.controller.js";
import { isLogin } from "../middleware/user.middleware.js";

const userRoutes = express.Router()

userRoutes.post("/signup", signup)
userRoutes.post("/login", login)
userRoutes.post("/dashboard", isLogin, dashboard)
userRoutes.get("/logout", logout)


export default userRoutes;