const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()



mongoose.connect('mongodb+srv://aliasgbolly:Gbolly16@farmco.x5lku.mongodb.net/FarmCo?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}).then( () => {
console.log("Database connected")
})

mongoose.connection.on("error", err => {
    console.log(`DB connection error : ${ err.message }`)
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.use(cors())

const userRoutes = require('./routes/users')
const transactionsRoutes = require('./routes/transactions')
const plannerRoutes = require('./routes/planner')
const inventoryRoutes = require('./routes/inventory')


app.use(express.json())
app.use(userRoutes)
app.use(transactionsRoutes)
app.use(plannerRoutes)
app.use(inventoryRoutes)


const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Server running on Port '+ port)
})