const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Explicitly hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Original password length: ${password.length}`);
        console.log(`Hashed password length: ${hashedPassword.length}`);
        
        // Create user with explicitly hashed password
        const user = new User({
            name, 
            email, 
            password: hashedPassword
        });
        
        // Save the user (without triggering pre-save hook)
        await user.save({ validateBeforeSave: false });
        
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        });
    }
    catch(error) {
        console.error("Registration error:", error);
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    
    try {
        // Find user by email - THIS WAS THE ISSUE
        // You were using User.find() as a filter function, which is incorrect
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: 'User Not Found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        
        // Create JWT token
        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET || 'fallback_secret_not_for_production', 
            { expiresIn: '1h' }
        );
        
        res.json({
            user: { id: user._id, email: user.email, name: user.name },
            token: token,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get('/dashboard', verifyToken, (req, res) => {
    res.json({message: `welcome ${req.user._id}`});
});

module.exports = router;