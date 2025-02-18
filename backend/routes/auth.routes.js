import express from "express";
import {signup,login,logout,getUser} from "../controllers/auth.controllers.js"
import {protectRoute} from "../middleware/protectRoute.js";
// Need router from express
const router = express.Router();

//Going to add middleware after

//Tested using postman
router.post("/signup" ,signup);
router.get("/login",login );
router.get("/logout", logout);
router.get("/user", protectRoute ,getUser);
export default router;