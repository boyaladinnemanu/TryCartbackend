const mongoose = require('mongoose')
const Allproducts = require('./allproducts')

const defaultAvatars = [
    "https://img.freepik.com/free-psd/3d-illustration-business-man-with-glasses_23-2149436194.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436189.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hair_23-2149436186.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436179.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses-half-shaved-head_23-2149436187.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-tank-top_23-2149436202.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/premium-psd/3d-illustration-person-with-purple-hair-glasses_23-2149436204.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses-green-hair_23-2149436201.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/premium-psd/3d-illustration-business-man-with-glasses_23-2149436193.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/premium-psd/3d-illustration-person-with-glasses-bow_23-2149436205.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-punk-hair-jacket_23-2149436198.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-bald-person_23-2149436183.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436200.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436181.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/premium-psd/3d-illustration-person-with-leather-jacket_23-2149436206.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person_23-2149436182.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/premium-psd/3d-illustration-older-person-with-glasses_23-2149436203.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-tank-top_23-2149436199.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/free-psd/3d-illustration-person-with-pink-hat_23-2149436195.jpg?uid=R196432016&w=740",
    "https://img.freepik.com/premium-psd/3d-illustration-person-with-bow_23-2149436207.jpg?uid=R196432016&w=740"
  ];
  

const registeredUserSchema = new mongoose.Schema({
    Name:{type:String,required:true,},
    Email:{type:String,required:true,unique:true,},
    Password:{type:String,required:true,},
    isPrime:{type:Boolean,default:false},
    avatar:{
        type:String,
        default:()=>defaultAvatars[17]
        
            },
    phone:{type:Number,default:null},
    dob:{type:Date,default:null},
    gender:{type:String,default:""},
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Allproducts' }],
    address:{type:String,default:""}
},{timestamps:true});

const RegisteredUser = mongoose.model("registereduser",registeredUserSchema)

module.exports = RegisteredUser

