import express from "express";
import 'dotenv/config'
import linkRoutes from "./routes/link.route.js";
import dbConnect from "./config/dbConnect.js";
import cors from "cors"
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));
  
app.use(express.json())
app.use(cookieParser())

app.use("/", linkRoutes)
app.use("/user", userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, async ()=>{
    await dbConnect();
    console.log(`App is listening on Port : ${PORT}`)
})