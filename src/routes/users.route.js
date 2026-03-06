import express from "express"
import authUserCheck from "../middlewares/userAuthe.middleware.js"
import { editUserController, getMeUserController } from "../controllers/users.controllers.js"

const userRouter = express.Router()

userRouter.get("/me",authUserCheck,getMeUserController)

userRouter.put("/me",authUserCheck,editUserController)



export default userRouter