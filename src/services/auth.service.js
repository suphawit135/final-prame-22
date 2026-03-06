import { use } from "react"
import {prisma} from "../libs/prisma.js"
import jwt from "jsonwebtoken"

export const findDoctorUserByUsername = async (username)=>{
    const user = await prisma.doctor.findFirst({
        where:{
            username:username
        }
    })
    return user
}

export const findUserUserByUsername = async (username)=>{
    const user = await prisma.user.findFirst({
        where:{
            username:username
        }
    })
    return user
}



export const createDoctor = async(username,hashPassword,specialization)=>{
    const newDoctorUser = await prisma.doctor.create({
        data:{
            username,
            password:hashPassword,
            specialization
        }
    })
    return newDoctorUser
}

export const createUser = async(username,hashPassword)=>{
    const newUserUser = await prisma.user.create({
        data:{
            username,
            password:hashPassword        }
    })
    return newUserUser
}

export const createDoctorToken = async(user)=>{
    const payload ={
        id:user.id,
        username:user.username,
        specialization:user.specialization
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET_DOCTOR,{
        algorithm:'HS256',
        expiresIn:'1d'
    })
    return token
}
export const createUserToken = async(user)=>{
    const payload ={
        id:user.id,
        username:user.username,
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET_USER,{
        algorithm:'HS256',
        expiresIn:'1d'
    })
    return token
}

export const findDoctorById = async (id)=>{
    const user = await prisma.doctor.findFirst({
        where:{
            id:id
        }
    })
    return user
}
export const findUserById = async (id)=>{
    const user = await prisma.user.findFirst({
        where:{
            id:id
        }
    })
    return user
}