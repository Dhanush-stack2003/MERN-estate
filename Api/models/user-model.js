const mongodb = require('mongoose');

const userSchema =new mongodb.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User = mongodb.model('User',userSchema);

module.exports = User