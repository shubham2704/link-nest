const express = require('express')
const Users = require('../models/User')
const linksController = require('../controllers/links')
const router = express.Router()

router
    .get('/:username', linksController.getLinks)
    .post('/add-links', linksController.addLinks)
    .post('/delete-link', linksController.deleteLink)

module.exports = router