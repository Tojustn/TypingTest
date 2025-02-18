import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if (!token) {
          return res.status(401).json({ error: "Unauthorized: No Token Provided" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        if (!decoded) {
          return res.status(401).json({ error: "Unauthorized: Invalid Token" });
        }
        // select is meant to exclude the password field
        const user = await User.findById(decoded.userId).select("-password");
    
        if (!user) {
          return res.status(401).json({ error: "Unauthorized: User not found" });
        }
    
        req.user = user;
        // Call protected function
        next();
    }
    catch(error){
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}
