const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('products', productSchema)