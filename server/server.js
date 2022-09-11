const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const mogon = require('morgan')

const userRouter = require('./routes/user')
const productRouter = require('./routes/product')

const port = process.env.PORT || 3000


const app = express()

app.use(body_parser.json());
app.use(mogon('dev'))

app.use('/user', userRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
    res.send('welcome to link nest')
})

mongoose.connect(
    process.env.DB_CONNECTION, 
    () => console.log('mongodb connected')
)

app.listen(port, () => console.log(`Server running on port ${port}`))