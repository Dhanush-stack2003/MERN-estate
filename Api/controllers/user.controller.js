import User from "../models/user-model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import bcrypt from 'bcrypt'

export const text = (req, res)=>{
 res.json({
    message:"api test working..."
 })
};


export const updateUser = async (req,res,next) => {
   if(req.user.id !== req.params.id) return next(ErrorHandler(401,"you can change your credentials only"))
try{
   if(req.body.password){
      req.body.password = bcrypt.hashSync(req.body.password,10)
   }

   const updatedUser = await User.findByIdAndUpdate(req.params.id,{
      $set:{ 
         email:req.body.email,
         username:req.body.username,
         image:req.body.image,
         password:req.body.password,
      }
   },{new:true})
      const {password,...rest} = updatedUser._doc;

      res.status(200).json(rest)
}catch(error){
   next(error)
}
}