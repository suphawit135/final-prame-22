import {prisma} from "../libs/prisma.js"
import jwt from "jsonwebtoken"

export const editDoctorUser = async(id,username,specialization,hashPassword)=>{
    const result = await prisma.doctor.update(
        {
            where:{id:id}
        ,
        data: {
            username,
            specialization,
            password:hashPassword
        }
})
    return result
}
