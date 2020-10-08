const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema(
    {

     full_name: {
         type: String,
         required: true,
         trim: true
     },
     
     email_address: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
         validate(value){
             if(!validator.isEmail(value)){
                 throw new Error("Invalid Email Address")
             }
         }
     },
     phone_number:{
         type: String,
         required: true,
         trim: true
     },
     address:{
        type: String,
        required: true,
        trim: true
    },
     account_balance:{
        type: Number,
        required: true,
        trim:true
     },
     password:{
        type: String,
        required: true,
        trim:true
     },
     tokens: [
        {
            token: {
                type: String
            }
        }
    ]
    },
    {
        timestamps: true
    }
)

userSchema.virtual('transactions', {
    ref: 'transactions',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('inventorys', {
    ref: 'inventorys',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('planners', {
    ref: 'planners',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'spiralpay2020api!!final')
    user.tokens = user.tokens.concat({token: token})

    await user.save()
    return token
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
     console.log('Middleware running')
    next()
})

const user = mongoose.model('users', userSchema) ;
module.exports = user ;