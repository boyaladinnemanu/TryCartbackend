const mongoose = require('mongoose')
//create schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    jobTitle:{
        type:String,
    }
},{timestamps:true});
//user model
const User = mongoose.model('user',userSchema)

module.exports = User