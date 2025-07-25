import mongoose from "mongoose";
import bcrypt from "bcrypt"

const registerSchema=new mongoose.Schema({
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

registerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// registerSchema.pre("save", async function(next) {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });


const User=mongoose.model("user",registerSchema)
export default User