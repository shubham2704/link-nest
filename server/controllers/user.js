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
    try {
        const { username, mobile_no } = req.body

        const update_user = await Users.updateOne(
            {
                username: username
            },
            {
                mobile_no: mobile_no
            }
        )

        res.status(201).json({
            message: `User with username ${username}, Upadted successfully`,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req, res) => {

}


module.exports = {
    allUsers,
    singleUser,
    updateUser
}