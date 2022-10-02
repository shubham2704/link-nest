const express = require('express')
const authRouter = require('./auth')
const userRouter = require('./user')
const linksRouter = require('./links')

const router = express.Router()

router
    .use('/auth', authRouter)
    .use('/user', userRouter)
    .use('/link', linksRouter)

module.exports = router