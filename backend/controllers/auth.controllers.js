import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../lib/utils/generateToken.js";
import bcryptjs from "bcryptjs"
// async (using await to get Promise signup function taking a req returning res
export const signup = async (req,res)=>{
    try{
        const {username, password, email} = req.body;
        if(!username || !password || !email){
            return res.status(400).json({error: "All fields required"});
        }

        // Make sure its valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid error"})
        }
        // Make sure user is unique
        const existingUser = await User.findOne({username});
        if (existingUser){
            return res.status(400).json({error: "Username was taken"});
        }

        const existingEmail = await User.findOne({email});
        if (existingEmail){
            return res.status(400).json({error: "Email was taken"})
        }

        if (password.length < 7){
            return res.status(400).json({error: "Password not long enough"})
        }
        if (password === username){
            return res.status(400).json({error: "Password cannot be the same as the username"})
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        // Create newUser using hashedPassword
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        if (newUser){
            await newUser.save();
            return res.status(200).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email
            })
        }
    }
    // Catch signup errors
    catch(error){
        console.error("Signup error:", error);
        res.status(500).json({ error: "Interval Server Error for Signup" });
    }
}

//Login will 
export const login = async(req,res)=>{
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});

        const isPasswordCorrect = await bcryptjs.compare(password, user?.password);

        if(!isPasswordCorrect || !user){
            res.status(400).json({error: "Username or Password incorrect"})
        }
        await generateTokenAndSetCookie(user._id,res)

        res.status(200).json({
            _id : user._id,
            username: user.username,
            email: user.email,
        })
        
    }   
    catch(error){
        console.log(error);
        res.status(500).json({error: "Login Error"});
    }
}
    
export const logout = async (req,res) =>{
    try{
        res.cookie("jwt","", {maxAge: 0});
        res.status(200).json({success: "true"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Logout Error"});
    }
}

export const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error: "Couldn't fetch user info"})
    }
}
