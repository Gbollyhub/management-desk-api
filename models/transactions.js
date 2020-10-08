const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema(
    {
     transaction_type: {
        type: String,
        required: true
     },
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
     quantity:{
        type: Number,
        trim: true
       },
     amount:{
      type: Number,
      required: true,
      trim: true
     },
     account_balance:{
      type: Number,
      required: true,
      trim: true
     },
     ref_id: {
        type: String,
        required: true
     }

    },
    {
      timestamps: true
  }

    )

 const Transaction = mongoose.model('transactions', transactionSchema)

 module.exports = Transaction