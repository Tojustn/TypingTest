import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
    },
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    }],
    topWPM:{
        type: Number,
        default: 0,
    },
    avgWPM:{
        type: Number,
        default: 0,
    },
},
    {
        timestamps: true,
    }
);


const User = new mongoose.model("User", userSchema);

export default User;