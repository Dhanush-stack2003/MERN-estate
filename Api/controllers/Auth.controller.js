import User from "../models/user-model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try{
    const { username, email, password } = req.body;
    const HashedPassword = bcrypt.hashSync(password, 10);
    const user = User({ username, email, password: HashedPassword });
    await user.save();
    console.log(user);
    const {password:pass,...rest} = user
    res.status(201).json(rest);c
  }catch (err) {
    console.log(err.message);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(ErrorHandler(401, "user not found!"));
    const passwordCheck = bcrypt.compareSync(password, validUser.password);
    if (!passwordCheck) return next(ErrorHandler(404, "wrong credentials!"));
    const jwtToken = jwt.sign({ id: validUser._id }, process.env.JSON_TOKEN);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("ACCESS_TOKEN", jwtToken, { httpOnly: true });
    res.status(200);
    res.json(rest);
    console.log(rest);
  } catch (err) {
    next(err.message);
  }
};

export const google = async(req,res,next) => {
  try{
    const userVerify =await User.findOne({email:req.body.email})
    if(userVerify){
      const jwtToken = jwt.sign({id:userVerify._id},process.env.JSON_TOKEN);
      const {password:pass,...rest} = userVerify._doc;
      res.cookie('ACCESS_TOKEN',jwtToken,{httpOnly:true})
      res.status(200)
      res.json(rest)
    }else{
    const generatePassword =
      Math.random()+toString(36).slice(-8) + Math.random()+toString(36).slice(-8);
    const HashedPassword = bcrypt.hashSync(generatePassword,10);
    const user =User({
      username: req.body.username.split('').join("").toLowerCase() + Math.random() + toString(36).slice(-8),
      email: req.body.email,
      password: HashedPassword,
      image:req.body.image
    });
    await user.save();
    const jwtToken = jwt.sign({id:user._id},process.env.JSON_TOKEN)
    const {password:pass,...rest} = user._doc
    res.cookie('ACCESS_TOKEN',jwtToken,{ httpOnly:true })
    res.status(200)
    res.json(rest)
    }
  }catch(error){
    next(error)
}
}
