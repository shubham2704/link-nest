const { json } = require('body-parser')
const express = require('express')
const products = require('../models/Product')

const router = express.Router()

router.post('/add', async (req, res) => {
    const { user, product_id, quantity } = req.body
    const product = new products({
        user: user,
        product_id: product_id,
        qty: quantity
    })

    try {
        const save_product = await product.save()
        res.json(save_product)

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
                        user: product.user,
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

    
    products.bulkWrite(
        bulk_order_add_to_cart, 
        {ordered: true }
    )
    .then(response => res.json(response))
    .catch(err => res.json({ message: err}))
    
})

router.get('/all',async (req, res) => {
    try {
        const all_products = await products.find()
        res.json(all_products)
    } catch (err) {
        res,json({ message: err})
    }
})

router.get('/multiple', async (req, res) => {
    const ids = [87878, 10]

    // const results = await products.find().where('product_id').in(ids).exec()
    const results = await products.find({'product_id': {$in: ids}})

    res.status(200).json(results)
})


module.exports = router