import express from "express"
import "dotenv/config"
import authRouter from "./routes/auth.routes.js"
import doctorRouter from "./routes/doctors.route.js"
import userRouter from "./routes/users.route.js"
import errHandler from "./middlewares/errHandler.js"

const PORT = process.env.PORT
const app=express()

app.use(express.json())

app.use("/auth",authRouter)

app.use("/users",userRouter)
app.use("/doctors",doctorRouter)

app.use("/health-records",(req,res)=>{
    res.json("healt record path")
})
app.use("/doctor-notes",(req,res)=>{
    res.json("doctor note path")
})

app.use(errHandler)

app.listen(PORT,()=>{
     console.log(`Server running on port http://localhost:${PORT}`)
})