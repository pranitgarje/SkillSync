const express=require("express");
const router=express.Router();
const User=require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");
router.post("/register",async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const user=await User.create({name,email,password});
        res.status(201).json({
            message:"User registered successfully",
            user,
        })
    }
    catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
});
router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user=User.find((u)=u.email===email);
    if(!user){
        return res.status(400).json({ message: 'User Not Found' });
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
    
      res.json({
        user: { id: user._id, email: user.email },
        token: token,
      });

})
module.exports=router;