const RegisteredUser = require("../model/registereduser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function LoginUser(req,res){
    const {username,password} = req.body
    const existuser = await RegisteredUser.findOne({Name:username})
    if (!existuser) {
        return res.status(400).json({ msg: "Invalid user" });
    }
    
    const isPasswordTrue = await bcrypt.compare(password,existuser.Password);

    if(isPasswordTrue){
        const payload={
            userId:existuser._id,
            username:existuser.Name,
        };
        const jwtToken = jwt.sign(payload,"my_token");
        res.status(200).json({Jwt_Token:jwtToken});
    }else{
        res.status(400).json({msg:"Invalid Password"})
    }
    }


module.exports = {LoginUser}