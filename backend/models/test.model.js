import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Text",
        required: true,
    },
    // WPM before accuracy considerations
    rawWPM:{
        type: Number,
        required: false,
    },
    accuracy: {
        type: Number,
        required: false,
    },
    totalTime: {
        type: Time,
        required: false,

    },
    timestamp:{
        type: Date,
        default: Date.now,
        required: true,
    },
})

const Test = mongoose.model("Test", testSchema);

export default Test;