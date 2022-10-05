const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Set goal
// @route   POST /api/goals/
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field.')
    }

    const createdGoal = await Goal.create({
        user: req.user._id,
        text: req.body.text
    })

    const newGoal = await Goal.findById(createdGoal.id)

    res.status(200).json({
        message: 'Goal set',
        data: newGoal
    })
})

// @desc    Get goals
// @route   GET /api/goals/
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id })

    res.status(200).json({
        message: 'Get goals',
        data: goals
    })
})


// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const payload = req.body
    const goal = await Goal.findById(req.params.id)
    const user = await User.findById(req.user.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goal.id, payload, { new: true })

    res.status(200).json({ message: 'Goal updated', data: updatedGoal })
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    const user = await User.findById(req.user.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const deletedGoal = await goal.delete()

    res.status(200).json({ message: 'Goal deleted', data: deletedGoal })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}