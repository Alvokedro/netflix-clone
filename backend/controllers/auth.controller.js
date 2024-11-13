import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { generateTokenandSetCookie } from "../utils/generateToken.js";

export const signup = async(req,res) => {
    const { username,email,password } = req.body;

    try {
        if(!username || !email || !password){
            return res.status(400).json({ success : false , message : "All fields required" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ success : false , message : "Invalid email format"})
        }
        if(password.length < 6){
            return res.status(400).json({ success : false , message : "Password must be atleast 6 character" })
        }

        const isUserExisted = await User.findOne({email});
        if(isUserExisted){
            return res.status(401).json({ success : false , message : "Email already existed" })
        }
        const hashPassword = await bcrypt.hash(password,12);

        const newUser = new User({
            username,
            email,
            password : hashPassword
        })

        generateTokenandSetCookie(newUser._id,res)
        await newUser.save()
        res.status(201).json({ success : true, user : {
            ...newUser._doc,
            password : ""
        }})

    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}


export const login = async(req,res) => {
    const { email,password } = req.body;

    try {
        if(!email || !password){
            return res.status(400).json({ success : false , message : "All fields required" })
        }
        
        const isUserExisted = await User.findOne({email});
        if(!isUserExisted){
            return res.status(401).json({ success : false , message : "Invalid email or password" })
        }
        const checkPassword = await bcrypt.compare(password,isUserExisted.password)

        if(!checkPassword){
            return res.status(400).json({ success : false , message : "Invalid email or password" })
        }
        generateTokenandSetCookie(isUserExisted._id,res)

        res.status(201).json({ success : true, user : {
            ...isUserExisted._doc,
            password : ""
        }})

    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const logout = async(req,res) => {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success : true , message : "Log out successfully" })

    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}

export const authCheck = async(req,res) => {
    try {
        res.status(200).json({ message : true, user : req.user })
    } catch (error) {
        res.status(500).json({ success : false , message : "Internal server error" })
    }
}