import authRouter from './routes/Auth.route.js'
import userRouter from './routes/user.route.js'
import listRouter from './routes/List.route.js'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongodb from 'mongoose';
import path from 'path';

const app = express();

app.use(express.json());

app.use(cookieParser())

dotenv.config();

mongodb.connect(process.env.MONGODB).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err.message))

const __dirname = path.resolve();

app.listen(3000,(err)=>{
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

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.send({
        success:false,
        statusCode,
        message,
    })
})