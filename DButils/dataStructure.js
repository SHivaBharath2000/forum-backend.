import mongoose from "mongoose";


const register=new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      unique:true,
      required:true
    },
    password:{
      type:String,
      required:true
    },
    admin:{
      type:Boolean,
      default:false
    }
})

const User=mongoose.model("user",register)
export default User