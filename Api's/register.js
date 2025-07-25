import User from "../DButils/dataStructure.js";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import  middleware  from "./login/login.js";

dotenv.config();

const registerRouter = express.Router();

// REGISTER ROUTE
registerRouter.post("/adduser", async (req, res) => {
  try {
    const { name, email, password, admin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password, admin });
    await user.save();

    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

// LOGIN ROUTE
registerRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(password)
    console.log(user.password)
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email ,name:user.name,admin:user.admin}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login", error });
  }
});


//token verify using middleware
registerRouter.get('/verify',middleware,async(req,res)=>{
  try{
    const {user}=req
    res.status(200).json({user})
  }catch(error){
     console.log(error)  
  }
  
})

export default registerRouter;
