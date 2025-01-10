import User from '../models/user-model.js';
import bcrypt from 'bcrypt'

export const signup = async(req,res) => {
    try{
        const {username,email,password} = req.body;
        const HashedPassword = bcrypt.hashSync(password,10);
        const user = User({username,email,password:HashedPassword});
        await user.save()
        console.log(user)
        res.status(201).json("new user created");
    }catch(err){
        console.log(err.message)
        res.status(500).json(err.message)
    }
}