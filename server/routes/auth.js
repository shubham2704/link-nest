const express = require('express')
const Users = require('../models/User')
const authController = require('../controllers/auth')

const router = express.Router()

router
    .post('/signup', authController.signup)
    .post('/login', authController.login)

module.exports = router