const express = require('express')
const router = new express.Router()
const { createTransaction, getTransaction} = require('../controller/transactions')
const { Auth } = require('../middleware/auth')

router.post('/create-transaction',Auth, createTransaction )

router.get('/transactions', Auth, getTransaction )

    

module.exports = router