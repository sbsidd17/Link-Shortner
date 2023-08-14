import express from "express";
import 'dotenv/config'
import linkRoutes from "./routes/link.route.js";
import dbConnect from "./config/dbConnect.js";
import cors from "cors"

const app = express();
app.use(cors({}))
app.use(express.json())

app.use("/", linkRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, async ()=>{
    await dbConnect();
    console.log(`App is listening on Port : ${PORT}`)
})