import bcrypt from "bcrypt"
import { editUserUser } from "../services/user.service.js"


export function getMeUserController(req,res){
    const {id,username} = req.user
    res.status(200).json({
        id,
        username
    })
}

export async function editUserController(req,res,next){
    const {id} = req.user
    const {username,password}=req.body
    try{
        const hashPassword = await bcrypt.hash(password,3)
        await editUserUser(id,username,hashPassword)
        res.status(200).json({
            message : "User Profile Update"
        })
    }
    catch(error){
        next(error)
    }

}

