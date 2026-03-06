import createError from "http-errors"
import jwt from "jsonwebtoken"
import { findDoctorById } from "../services/auth.service.js"

async function authDoctorCheck(req,res,next){
    try{
        const authorization = req.headers.authorization
        if(!authorization){
            throw createError(401,"Unauthorization")
        }
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token,process.env.JWT_SECRET_DOCTOR,{
            algorithms:["HS256"]
        })
    
        const user = await findDoctorById(payload.id)
        if(!user){
            throw createError(401,"Unauthorization")
        }

        req.doctor = user
        next()
    }
    catch(error){
        next(error)
    }
}

export default authDoctorCheck