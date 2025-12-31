const RegisteredUser = require('../model/registereduser')
const bcrypt = require('bcrypt');


async function handelAllRegisteredUsers(req,res){
    const allusers = await RegisteredUser.find({})
    return res.status(200).json(allusers)
}

async function handelCreateRegisterUser(req,res){
    const {userName,userEmail,userPassword} = req.body;
    if(!userName||!userEmail||!userPassword){
        return res.status(400).json({msg:"All fields are required.."})
    }
    const hashedpassword = await bcrypt.hash(userPassword,10);
    const isuserexist = await RegisteredUser.findOne({Email:userEmail})
    if(isuserexist){
        return res.status(400).json({msg:"user already exist"})
    }else{
        const NewUser = await RegisteredUser.create({
            Name:userName,
            Email:userEmail,
            Password:hashedpassword,
        })

        return res.status(200).json({msg:"Registered"})
    }
}
async function handelgetRegisterUser(req,res) {
    try{
        const userId = req.user.userId;
        const user = await RegisteredUser.findById(userId)
        return res.status(200).json(user)
    }catch(err){
        return res.status(401).json({msg:"failed to get the user"})
    }
}

async function handelpatchRegisterUser(req,res){
    try{
        const userId = req.user.userId;
        const user = await RegisteredUser.findOneAndUpdate(
            {_id:userId},
            {...req.body},
            {new:true}
        )
        if(!user){
            return res.status(401).json({msg:"user not found"})
        }
        return res.status(200).json({msg:"user data updated"})

    }catch(err){
        return res.status(401).json({msg:"somthing went wrong",err})
    }
}

async function handelgetuserfavorites(req,res) {
    try {
        const user = await RegisteredUser.findById(req.params.userId);
        res.json({ favorites: user.favorites });
      } catch (error) {
        res.status(500).json({ msg: 'Error fetching favorites', error: error.message });
      }
}

async function handeluserfavorites(req,res){
    try {
        const user = await RegisteredUser.findByIdAndUpdate(
          req.params.userId, 
          { $set: { favorites: req.body.favorites } }, // Only update the favorites field
          { new: true } // Return the updated user object after the update
        );
    
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
    
        res.status(200).json({ msg: 'Favorites updated successfully', favorites: user.favorites });
      } catch (error) {
        res.status(500).json({ msg: 'Error updating favorites', error: error.message });
      }
}

module.exports = {handelCreateRegisterUser,
    handelAllRegisteredUsers,
    handelgetRegisterUser,
    handelgetuserfavorites,
    handeluserfavorites,
    handelpatchRegisterUser}