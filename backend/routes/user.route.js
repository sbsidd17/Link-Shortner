import express from "express"
import { dashboard, login, signup } from "../controller/user.controller.js";
import { isLogin } from "../middleware/user.middleware.js";

const userRoutes = express.Router()

userRoutes.post("/signup", signup)
userRoutes.post("/login", login)
userRoutes.get("/dashboard", isLogin, dashboard)

export default userRoutes;