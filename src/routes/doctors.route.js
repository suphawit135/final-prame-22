import express from "express";
import { editDoctorController, getMeDoctorController } from "../controllers/doctors.controllers.js";
import authDoctorCheck from "../middlewares/docAuthen.middleware.js";

const doctorRouter = express.Router()

doctorRouter.get("/me",authDoctorCheck,getMeDoctorController)

doctorRouter.put("/me",authDoctorCheck,editDoctorController)



export default doctorRouter