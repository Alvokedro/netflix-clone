import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json())
app.use(cookieParser())

import connectDB from "./db/connect.js"
import authRoute from "./routes/auth.route.js"
import movieRoute from "./routes/movie.route.js"
import tvShowRoute from "./routes/tvShow.route.js"
import searchRoute from "./routes/search.route.js";
import { protectedRoute } from "./middlewares/protecteRoute.js";

const PORT = process.env.PORT;
const CONNECT_URI = process.env.CONNECT_URI;


app.use("/api/v1/netflix/auth",authRoute)
app.use("/api/v1/netflix/movie",protectedRoute,movieRoute)
app.use("/api/v1/netflix/tvshow",protectedRoute,tvShowRoute)
app.use("/api/v1/netflix/search",protectedRoute,searchRoute)


const start = async() => {
    try {
        await connectDB(CONNECT_URI);
        app.listen(PORT,() => {
            console.log("Server running on PORT " + PORT);
        })
    } catch (error) {
        console.error(error.message)
    }
}

start();
