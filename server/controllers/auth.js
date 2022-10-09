const Users = require('../models/User')

const signup = async (req, res) => {
    try {
        const { username, first_name, last_name, email, mobile_no, password } = req.body
        const status = 'active'
        const User = new Users({
            username: username,
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile_no: mobile_no,
            password: password,
            status: status
        })

        const save_user = await User.save()
        res.status(201).json({ message: `User with username: ${username} created`})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const check = await Users.find(
            {
                $or: [
                    {username: username},
                    {email: email}
                ]
            }
        )

        if (check.length) {
            const user = check[0]
            if (user.status === "active") {
                if (password == user.password) {
                    res.status(200).json({
                        message: 'Login successfull',
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        links: user.links 
                    })
                } else {
                    res.status(200).json({
                        message: 'Enter the correct password'
                    })
                }
            } else {
                res.status(200).json({
                    message: `User is deleted, Do you want to resume your account`
                })
            }
        } else {
            res.status(404).json({
                message: `User with ${username || email } does not exist`
            })
        }
    } catch (error) {
        res.status(500).json(error.message)   
    }
}

module.exports = {
    signup,
    login
}