import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
//Middle ware this middleware is used to verify the token
const middleware=(req,res,next)=>{
    const token=req.headers['authorization']
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }
   catch(err){
    console.log(err)
    return res.status(401).json({message:"Unauthorized"})
   }
}

export default middleware