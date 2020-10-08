const mongoose = require('mongoose')


const plannerSchema = new mongoose.Schema(
    {
     owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
     },
     details:{
      type: String,
      required: true,
      trim: true
     },
     completed:{
        type: Boolean,
        required: true
       },
       date_due:{
        type: String,
        required: true,
        trim: true
       },


    },
    {
      timestamps: true
  }

    )

 const Planner = mongoose.model('planners', plannerSchema)

 module.exports = Planner