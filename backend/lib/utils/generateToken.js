import jwt from "jsonwebtoken";

// All you gotta know is it generates token using my random .env
// Then it creates a cookie 
export const generateTokenAndSetCookie = (userId, res) => {
    // Generating a jwt token using userId as payload, and JWT_SECRET to encode it
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
  
    // Create cookie that persists holding users jwt token, then send the cookie back the client that the user will use
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // in milliseconds
      httpOnly: true, // prevent XSS attacks cross-site script attacks
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
      secure: process.env.NODE_ENV !== "development", // True if NODE_ENV isnt equal to development
    });
  };
  
  export default generateTokenAndSetCookie;
  