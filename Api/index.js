import userRouter from './routes/user.route.js';

import authRouter from './routes/Auth.route.js';

import dotenv from 'dotenv';

import express from 'express';

import mongodb from 'mongoose';

const app = express();

app.use(express.json());

dotenv.config();

mongodb.connect(process.env.MONGODB).then(()=>console.log("mongodb connected")).catch((err)=>console.log(err.message))

app.listen(3000,(err)=>{
    if(err){
        console.log(err.message)
    }
    else{
        console.log("you are now connected on 3000")
    }
})

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)