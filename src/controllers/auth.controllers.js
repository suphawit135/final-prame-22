import createError from "http-errors"
import { createDoctor, createDoctorToken, createUser, createUserToken, findDoctorUserByUsername, findUserUserByUsername } from "../services/auth.service.js"
import bcrypt from "bcrypt"
import { use } from "react"

export async function registerDoctorController(req,res,next){
    const {username,password,specialization} = req.body
    try{
        const user = await findDoctorUserByUsername(username)
        if(user){
            throw createError(400,"User already Exist")
        }
        const hashPassword = await bcrypt.hash(password,3)
        const newDoctorUser = await createDoctor(username,hashPassword,specialization)
        res.status(201).json({
            message : "Doctor registered successfully",
            user:{
                id:newDoctorUser.id,
                username:newDoctorUser.username,
                specialization:newDoctorUser.specialization
            }
        })
    }
    catch(error){
        next(error)
    }
}
export async function registerUserController(req,res,next){
    const {username,password} = req.body
    try{
        const user = await findUserUserByUsername(username)
        if(user){
            throw createError(400,"User already Exist")
        }
        const hashPassword = await bcrypt.hash(password,3)
        const newUserUser = await createUser(username,hashPassword)
        res.status(201).json({
            message : "User registered successfully",
            user:{
                id:newUserUser.id,
                username:newUserUser.username
            }
        })
    }
    catch(error){
        next(error)
    }
}


export async function loginDoctorController(req,res,next){
    const {username,password} = req.body 
    try{
        const user = await findDoctorUserByUsername(username)
        const isMatch = await bcrypt.compare(password,user.password)
        if(!user || !isMatch){
            throw createError(401,"Invalid Login")
        }
        const token = await createDoctorToken(user)
        res.status(201).json({
            message:"Doctor Login Success",
            token: token,
            user:{
                id: user.id,
                username: user.username,
                specialization : user.specialization
            }
        })
    }
    catch(error){
        next(error)
    }
}
export async function loginUserController(req,res,next){
    const {username,password} = req.body 
    try{
        const user = await findUserUserByUsername(username)
        const isMatch = await bcrypt.compare(password,user.password)
        if(!user || !isMatch){
            throw createError(401,"Invalid Login")
        }
        const token = await createUserToken(user)
        res.status(201).json({
            message:"User Login Success",
            token: token,
            user:{
                id: user.id,
                username: user.username
            }
        })
    }
    catch(error){
        next(error)
    }
}