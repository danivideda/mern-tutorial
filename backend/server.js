const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000
const { errorHandler } = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()

// Request payload encoding middlewares
// app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Goal routes
app.use(
    '/api/goals', // route
    require('./routes/goalRoutes') // router that consist of different api.METODS
)

// User routes
app.use(
    '/api/users', // route
    require('./routes/userRoutes') // router that consist of different api.METODS
)

// Error middleware
app.use(
    errorHandler // middleware to handle error
)

app.listen(port, () => console.log(`Server started on port ${port}`))