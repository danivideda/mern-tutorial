const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authMiddleware')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

router.use(authMiddleware)
router.route('/me').get(getUser)

module.exports = router