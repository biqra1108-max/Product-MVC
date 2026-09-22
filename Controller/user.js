import {signJWT} from "../utlis/jwt.js";
import User from "../model/user.js";
import {hashPassword} from "../utlis/bcrypt.js";

export const loginUser = async (req,res) =>{
    try{
        const{email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({error: "Email and password required"});
        }
        const user = await User.findOne({email});
        const isPasswordValid = await user.comparePassword(password,user.password);
    if(!user||! isPasswordValid){
        return res.status(401).json({error: "Invalid credentials"});
    }
    const token = signJWT({userId: user._id});
    res.json({token});
} catch(err){
    res.status(500).json({error: "Internal server error"});
}

};

export const createUser = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({error: "Email and password required"})
        }
        const encryptedPassword = await hashPassword(password);
        const newUser = new User({email :email,password: encryptedPassword});
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch(err){
        res.status(500).json({error: "Internal server error"});
    }
};