import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";
dotenv.config();

//Declare ES module for import 
const app = express();

//Accept JSON
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Starts server on port and callback
app.listen(PORT, ()=>{
    console.log(`App run on http://localhost:${PORT}/`)
    connectMongoDB();
})