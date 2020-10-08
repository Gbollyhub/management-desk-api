const express = require('express')
const router = new express.Router()
const { createInventory, getInventory, updateInventory, deleteInventory } = require('../controller/inventory')
const { Auth } = require('../middleware/auth')

router.post('/create-inventory',Auth, createInventory )

router.get('/inventory', Auth, getInventory )

router.patch('/update-inventory/:id', Auth, updateInventory )

router.delete('/delete-inventory/:id', Auth, deleteInventory )

    

module.exports = router