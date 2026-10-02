import { signJWT } from "../utlis/jwt.js";
import User from "../model/user.js";
import { hashPassword } from "../utlis/bcrypt.js";
import bcrypt from "bcrypt"; // Ensure bcrypt is available, or use your utility

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Direct bcrypt compare (agar schema mein method na ho toh yeh kabhi fail nahi hoga)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = signJWT({ userId: user._id });
        res.json({ token });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: err.message || "Internal server error" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        const encryptedPassword = await hashPassword(password);
        
        const newUser = new User({ 
            fullName, 
            username, 
            email, 
            password: encryptedPassword 
        });
        
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: err.message || "Internal server error" });
    }
};