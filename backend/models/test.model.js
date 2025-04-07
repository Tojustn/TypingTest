import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text:{
        type: Array,
        required: true,
    },
    // WPM before accuracy considerations
    rawWPM:{
        type: Number,
        required: false,
    },
    adjWPM:{
        type: Number, 
        required: true,
    },
    accuracy: {
        type: Number,
        required: false,
    },
    totalTime: {
        type: Number,
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
