import express, { text } from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import textRoutes from "./routes/text.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

//Declare ES module for import 
const app = express();

//Accept JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // to parse form data in url encoded format
// Parse cookies
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// route calls
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/text",textRoutes);


// Starts server on port and callback
app.listen(PORT, ()=>{
    console.log(`App run on http://localhost:${PORT}/`)
    connectMongoDB();
})