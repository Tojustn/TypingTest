import mongoose from "mongoose"

// Connecting MongoDB async function 
const connectMongoDB = async () => {
    try{
        const link = process.env.Mongo_URl;
        const connect = await mongoose.connect(link);
        console.log(`Mongo DB has been connected: ${connect.connection.host}`);
    }
    catch(error){
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectMongoDB;