import User from "../DButils/dataStructure.js";
import express from "express";

const registerRouter = express.Router();

registerRouter.post("/adduser", async (req, res) => {
  try {
    const { name, email, password,admin } = req.body;
    const user = new User({ name, email, password ,admin});
    await user.save();
    res.send({code:1});
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
     console.log(error);
    res.status(500).json({ message: "Error registering user" });
   
  }
});


registerRouter.get("/getusers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
})


export default registerRouter
