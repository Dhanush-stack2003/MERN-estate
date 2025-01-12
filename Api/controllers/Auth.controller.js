import User from "../models/user-model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try{
    const { username, email, password } = req.body;
    const HashedPassword = bcrypt.hashSync(password, 10);
    const user = User({ username, email, password: HashedPassword });
    await user.save();
    console.log(user);
    res.status(201).json("new user created");
    res.redirect('/sign-in')
  }catch (err) {
    console.log(err.message);
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "user not found!"));
    const passwordCheck = bcrypt.compareSync(password, validUser.password);
    if (!passwordCheck) return next(errorHandler(404, "wrong credentials!"));
    const jwtToken = jwt.sign({ id: validUser._id }, process.env.JSON_TOKEN);
    const { password: pass, ...rest } = validUser._id;
    res.cookie("ACCESS_TOKEN", jwtToken, { httpOnly: true });
    res.status(200);
    res.json(rest);
  } catch (err) {
    next(err.message);
  }
};
