const Users = require('../models/User')

const getLinks = async (req, res) => {
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
            const links = [] = user.links.filter(link => link.status == "active")
            res.status(200).json({
                username: user.username,
                name: `${user.first_name} ${user.last_name}`,
                links: links
            })
        } else {
            res.status(404).json({
                message: `User with username : ${username} does not exists`
            })
        }
    } catch (error) {
        
    }
}

const addLinks = async (req, res) => {
    try {
        const { username, links } = req.body
        const add_links = await Users.updateOne(
            {
                username: username
            },
            {
                $push: {
                    links: links
                }
            }
        )
        res.status(201).json({
            message: 'Links added',
            links: add_links
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteLink = async (req, res) => {
    try {
        const { username, link_name } = req.body
        // const delete_link = await Users.updateOne(
        //     {
        //         username: username,
        //         links: {
        //             name: link_name
        //         }
        //     },
        //     {
        //         links:{
        //             status: "delete"
        //         }
        //     }
        // )

        res.status(201).json({
            message: 'Link Deleted',
            link: delete_link
        })
    } catch (error) {
        
    }
}

module.exports = {
    getLinks,
    addLinks,
    deleteLink
}