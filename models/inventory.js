const mongoose = require('mongoose')


const inventorySchema = new mongoose.Schema(
    {
     owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
     },
     item:{
        type: String,
        required: true,
        trim: true
       },
     details:{
      type: String,
      required: true,
      trim: true
     },
     stock_value:{
        type: Number,
        required: true,
        trim: true
       },
     cost:{
      type: Number,
      required: true,
      trim: true
     },
     price:{
      type: Number,
      required: true,
      trim: true
     },
     supplier:{
        type: String,
        required: true,
        trim: true
       }

    },
    {
      timestamps: true
  }

    )

 const Inventory = mongoose.model('inventorys', inventorySchema)

 module.exports = Inventory