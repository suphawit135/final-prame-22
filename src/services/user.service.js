import {prisma} from "../libs/prisma.js"
import jwt from "jsonwebtoken"

export const editUserUser = async(id,username,hashPassword)=>{
    const result = await prisma.user.update(
        {
            where:{id:id}
        ,
        data: {
            username,
            password:hashPassword
        }
})
    return result
}
