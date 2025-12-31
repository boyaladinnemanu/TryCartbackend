const RegisteredUser = require("../model/registereduser")

async function makeprimeuser(req,res){
    const userId = req.user.userId
    const username = req.user.username
    try{
        const user = await RegisteredUser.findOneAndUpdate(
            {_id:userId},
            {isPrime:true},
            {new:true}
        );

        if(!user){
            return res.status(401).json({msg:"user not found"})
        }
        return res.status(200).json({msg:`${username} upgraded to Prime`})
    }catch(err){
        return res.status(401).json({msg:"somthing went wrong",err})
    }
}

module.exports = {makeprimeuser}