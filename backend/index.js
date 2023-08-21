import express from "express";
import 'dotenv/config'
import linkRoutes from "./routes/link.route.js";
import dbConnect from "./config/dbConnect.js";
import cors from "cors"
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import ejs from "ejs"

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
  }));
app.use(bodyParser.urlencoded({extended:true}))  
app.use(express.json())
app.use(cookieParser())

app.use("/", linkRoutes)
app.use("/user", userRoutes)

// Set the view engine to EJS
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000
app.listen(PORT, async ()=>{
    await dbConnect();
    console.log(`App is listening on Port : ${PORT}`)
})