const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.use(
    '/api/goals', // route
    express.urlencoded({ extended: false }), // middleware to parse the urlencoded payload
    require('./routes/goalRoutes'), // router that consist of different api.METODS
    errorHandler // middleware to handle error
)

app.listen(port, () => console.log(`Server started on port ${port}`))