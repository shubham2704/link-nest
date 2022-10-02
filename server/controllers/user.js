const Users = require('../models/User')

const allUsers = async (req, res) => {
    try {
        const all_user = await Users.find()
        res.status(200).json(all_user)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const singleUser = async (req, res) => {
    try {
        const username = req.params.username
        const user = await Users.findOne(
            {
                username: username,
            },
            {
                username: 1,
                first_name: 1,
                last_name: 1,
                links: 1
            }
        )
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({
                message: `User with username : ${username} does not exists`
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}


module.exports = {
    allUsers,
    singleUser
}