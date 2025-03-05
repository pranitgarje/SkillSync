const express=require("express");
const router=express.Router();
const User=require("../models/User");
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
module.exports=router;