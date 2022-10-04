const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// @desc    Register user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please input all fields required')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists. Please use another email address.')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (newUser) {
        res.status(201).json({
            message: 'Register User Success',
            data: {
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc    Login user
// @route   POST /api/users/
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email and password
    const user = await User.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            message: 'Login user successfull',
            data: {
                _id: user.id,
                name: user.name,
                email: user.email
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user
// @route   GET /api/users/
// @access  Public
const getUser = (req, res) => {
    res.status(200).json({ message: 'Display User Data' })
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}