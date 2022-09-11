const { json } = require('body-parser')
const express = require('express')
const Users = require('../models/User')


const router = express.Router()

router.post('/add', async (req, res) => {
    const { user, product_id, quantity } = req.body
    const User = new Users({
        user: user,
        product_id: product_id,
        qty: quantity
    })

    try {
        const save_user = await User.save()
        res.json(save_user)

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