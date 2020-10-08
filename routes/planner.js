const express = require('express')
const router = new express.Router()
const { createPlanner, getPlanner, updatePlanner, deletePlanner } = require('../controller/planner')
const { Auth } = require('../middleware/auth')

router.post('/create-planner', Auth, createPlanner )

router.get('/planner', Auth, getPlanner )

router.patch('/update-planner/:id', Auth, updatePlanner )

router.delete('/delete-planner/:id', Auth, deletePlanner )

    

module.exports = router