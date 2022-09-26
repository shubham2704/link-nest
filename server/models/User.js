const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true
    },
    links: [
        {
            name: {
                type:String,
                required: true
            },
            link: {
                type:String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Users', userSchema)