import { Request,Response } from "express";
import User from "../database/models/userModel";
import bcrypt from 'bcrypt'

export const signup=async (req:Request, res:Response)=>{
try{
    console.log("Sign up route hit::::")
// Signup Logic
const {username, email, password}=req.body;


if(!username || !email || !password){
  return res.status(500).json({
        message:"Please provide username, email, password"


    })
}

// Check if email already exist or not
const existingUser=await User.findOne({
    where:{
        email
    }
});
if (existingUser){
    return res.status(409).json({
        message:"Email already exists"
    })
}

// Hash the password
const hashedPassword=await bcrypt.hash(password,10);
// Create new user
const newUser=await User.create({
    username,
    email,
    password:hashedPassword
})
res.status(200).json({
    message:"SignUp successful",
})

}catch(error){
    console.log("Error: ",error)
    res.status(500).json({
        message:"Failed"
    })
}
}

export const signin=async (req:Request, res:Response)=>{
try{
// Signin Logic


}catch(error){
    console.log("Error: ",error)
    res.status(500).json({
        message:"Failed"
    })
}
}