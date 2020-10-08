const express = require('express')
const { Register, Login, getProfile, findUser, updateUser, Logout, getAllUsers } = require('../controller/users')
const { Auth } = require('../middleware/auth')

const router = new express.Router()

router.post('/create-account', Register)

router.post('/login', Login)

router.post('/logout', Auth, Logout)

router.get('/profile', Auth, getProfile)

router.post('/user', Auth, findUser)

router.get('/users', getAllUsers)

router.patch('/update-account',Auth, updateUser)

module.exports = router