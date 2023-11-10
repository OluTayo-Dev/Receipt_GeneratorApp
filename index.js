import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import authRoute from "./src/route/authRoute.js";
import profileRoute from "./src/route/profileRoute.js";
import invoiceRoute from "./src/route/invoiceRoute.js";
import bodyParser from "body-parser";
import cors from "cors";


dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
    cors({
        origin: "http://localhost:3000"
    })
);

app.use("/api/auth", authRoute)
app.use("/api/auth", profileRoute)
app.use("/api/auth", invoiceRoute)

async function connect() {
    try{
        app.listen(6002, () => {
            connectDB(process.env.MONGODB_PASSWORD);
            console.log("234 Receipt proect server is running on port 6002 ")
        })
    } catch (err) {
        console.log(err)
    }
}
connect();




