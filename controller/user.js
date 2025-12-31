const User = require("../model/user")

async function handelallusers(req,res){
    const allusers = await User.find({})
    return res.json(allusers)
}

async function handelGetusersbyid(req,res){
    const user = await User.findById(req.params.id)
    if(!user){
        return res.status(404).json({msg:"404 not found"})
    }
    return res.json(user)
}

async function handelPutuserbyid(req,res){
    return res.json({status:'pending'})
}

async function handelDeleteuserbyid(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg:'user deleted'})
}

async function handelCreateuser(req,res){
    const body = req.body;
    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
        return res.status(400).json({msg:"all fields required.."})
    }
    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
    })
    return res.status(201).json({msg:'Registered'})
}

module.exports ={handelallusers,handelGetusersbyid,handelPutuserbyid,handelDeleteuserbyid,handelCreateuser}