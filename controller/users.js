const UserModel = require('../models/users')
const bcrypt = require('bcrypt')
const { resolveMx } = require('dns')

exports.Register = async (req, res) => {
    try{
        const userExist = await UserModel.findOne({ email_address: req.body.email_address })
        if(userExist){
            return res.status(403).send({ error: "Email already exists"})
        }
        const user = new UserModel({
            "full_name": req.body.full_name,
            "email_address": req.body.email_address,
            "phone_number": req.body.phone_number,
            "password": req.body.password,
            "address": req.body.address,
            "account_balance": 1000000
        })
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send({ error: 'Error creating user'})
    }

}

exports.Login = async (req, res) => {
    try{
        const user = await UserModel.findOne({ email_address: req.body.email_address })

        if(!user){
            return res.status(401).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }

        const checkpassword = await bcrypt.compare(req.body.password, user.password)

        if(!checkpassword){
            return res.status(401).json({
                error: 'Email and password do not match'
            });
        }

        const token = await user.generateToken()

        res.send({ user: {user}, token: token})
        
    }
    catch(e){
        res.status(400).send({ error: 'Invalid Credentials'})
    }

}

exports.getProfile = async (req, res) => {
    res.send(req.user)
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        res.status(400).send({error: error})
    }
   
}



exports.findUser = async (req,res) => {
    const account_number = req.body.account_number
 try {
     const user = await UserModel.findOne({account_number: account_number})
     if(!user){
        return res.status(404).send()
       }
     res.send(user)   
 } catch (error) {
    res.status(404).send({error:"Operation Failed"})
 }
 }
 
 exports.updateUser = async (req, res) => {
    const _id = req.user._id
    const updates = Object.keys(req.body)
 
    try{
     // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
 
     const user = await UserModel.findById(_id)
 
     if(!user){
      return res.status(404).send()
     }
 
     updates.forEach((update)=>{
         user[update] = req.body[update]
     })
 
      await user.save()
 
     res.status(200).send({message: "Update Successful", user})
    }
    catch (error){
        return res.status(400).send({error: "Update Failed"})
    }
 }

 exports.Logout = async (req, res) => {
    try{
         req.user.tokens = req.user.tokens.filter( (token) => {
             return token.token !== req.token
         })
 
         await req.user.save()
          res.send({ "message": "Logout Succesfully"})
    }
    catch(e){
        res.status(500).send()
    }
 }