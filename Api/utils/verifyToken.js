import {ErrorHandler} from '../utils/ErrorHandler.js'
import jwt from 'jsonwebtoken'

export const VerifyToken = (req,res,next) => {
    const Token = req.cookies.ACCESS_TOKEN;
    if(!Token) return next(ErrorHandler(401,'unAuthorized'))
    jwt.verify(Token,process.env.JSON_TOKEN,(err,user)=>{
         if(err) return next(ErrorHandler(403),"forbidden")
         req.user = user;
         next();
    })
}