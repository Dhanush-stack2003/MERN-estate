import authRouter from './routes/Auth.route.js'
import userRouter from './routes/user.route.js'
import listRouter from './routes/List.route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongodb from 'mongoose';
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(cors())

app.use(cookieParser())

dotenv.config();

mongodb.connect(process.env.MONGODB).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err.message))

app.listen(PORT,(err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log("you are now connected on 3000")
    }
})

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/list',listRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.send({
        success:false,
        statusCode,
        message,
    })
})