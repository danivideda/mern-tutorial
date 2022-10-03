const User = require('../models/userModel')

// @desc    Register user
// @route   POST /api/users/
// @access  Public
const registerUser = (req, res) => {
    res.status(200).json({ message: 'Register User' })
}

// @desc    Login user
// @route   POST /api/users/
// @access  Public
const loginUser = (req, res) => {
    res.status(200).json({ message: 'Login User' })
}

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