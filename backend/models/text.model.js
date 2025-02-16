import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    source: {
        type: String,
        default: "User-Generated",
    },
})

const Text = new mongoose.model("Text",textSchema)

export default Text