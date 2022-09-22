const { json } = require('body-parser')
const express = require('express')
const Users = require('../models/User')
const test = require('../models/test')


const router = express.Router()

router.post('/add', async (req, res) => {
    const { username, first_name, last_name, email, mobile_no, password } = req.body
    const User = new Users({
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile_no: mobile_no,
        password: password
    })

    try {
        const save_user = await User.save()
        res.json(save_user)

    } catch (err) {
        res.json({ message: err})
    }
})

router.post('/update', async (req, res) => {
    const { username, links } = req.body
    
    try {
        const add_links = await Users.updateOne(
            {
                username: username
            },
            {
                $push: {
                    links: links
                }
            },
            {
                upsert: true
            }
        )
        
        res.json(add_links)

    } catch (err) {
        res.json({ message: err})
    }
})

router.post('/delete', async (req, res)=> {
    const { username, link_name } = req.body

    try {
        const delete_link = await Users.updateOne(
            {
                username: username
            },
            {
                $pull: {
                    links: {name: link_name}
                }
            }
        )
        res.status(201).json(delete_link)
    } catch (error) {
        res.json(error)
    }
})

router.post('/test', async (req, res) => {
    const { username, password } = req.body
    const tests = new test({
        username: username,
        password: password
    })

    try {
        const save_test = await tests.save()
        res.json(save_test)

    } catch (err) {
        res.json({ message: err})
    }
})

router.post('/bulk', async (req, res) => {
    const { bulk_order } = req.body
    let bulk_order_add_to_cart = []
    
    await bulk_order.map((product) => {
        bulk_order_add_to_cart.push(
            {
                updateOne: {
                    filter: {
                        product_id: product.product_id
                    },
                    update: {
                        user: product.user,
                        product_id: product.product_id,
                        $inc: {
                            qty: product.quantity
                        }
                    },
                    upsert: true
                }
            }
        )
    })

    
    Users.bulkWrite(
        bulk_order_add_to_cart, 
        {ordered: true }
    )
    .then(response => res.json(response))
    .catch(err => res.json({ message: err}))
    
})

router.get('/all',async (req, res) => {
    try {
        const all_user = await Users.find()
        res.json(all_user)
    } catch (err) {
        res,json({ message: err})
    }
})

module.exports = router