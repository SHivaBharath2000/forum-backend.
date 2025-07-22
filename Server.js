import express from "express";
import connectDB from "./DButils/connection.js";
import registerRouter from "./Api's/register.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app=express();
const PORT=process.env.port;
//middleware
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next()
})
connectDB();

app.use('/register',registerRouter)


app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));