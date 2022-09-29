const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc    Get goals
// @route   GET /api/goals/
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc    Set goal
// @route   SET /api/goals/
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field.')
    }

    const goals = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goals)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goalId = req.params.id
    const payload = req.body
    const goal = await Goal.findById(goalId)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goalId, payload, { new: true })

    res.status(200).json({message: 'Goal updated', data: updatedGoal})
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goalId = req.params.id
    const goal = await Goal.findById(goalId)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const deletedGoal = await Goal.findByIdAndDelete(goalId)

    res.status(200).json({ message: 'Goal deleted', data: deletedGoal })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}