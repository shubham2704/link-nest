const Users = require('../models/User')

const allUsers = async (req, res) => {
    try {
        const all_user = await Users.find()
        res.status(200).json(all_user)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    allUsers,
}