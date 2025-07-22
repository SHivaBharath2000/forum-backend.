import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB=async()=>{
    try{
        const URI=process.env.url
        const connect=await mongoose.connect(URI)
        console.log("Connected to DB");
    }catch(error){
        console.log(error);
    }
}

export default connectDB