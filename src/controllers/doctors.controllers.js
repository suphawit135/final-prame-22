import { editDoctorUser } from "../services/doctor.service.js"
import bcrypt from "bcrypt"

export function getMeDoctorController(req,res){
    const {id,username,specialization} = req.doctor
    res.status(200).json({
        id,
        username,
        specialization
    })
}

export async function editDoctorController(req,res,next){
    const {id} = req.doctor
    const {username,specialization,password}=req.body
    try{
        const hashPassword = await bcrypt.hash(password,3)
        await editDoctorUser(id,username,specialization,hashPassword)
        res.status(200).json({
            message : "Doctor Profile Update"
        })
    }
    catch(error){
        next(error)
    }

}