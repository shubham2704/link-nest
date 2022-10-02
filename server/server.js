const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const mogon = require('morgan')

const indexRouter = require('./routes/index')

const port = process.env.PORT || 3000


const app = express()

app.use(body_parser.json());
app.use(mogon('dev'))

app.use('/api', indexRouter)

app.get('/', (req, res) => {
    res.send('welcome to link nest API')
})

mongoose.connect(
    process.env.DB_CONNECTION, 
)
.then(() => console.log('Mongo DB Connected'))
.catch((err) => console.log(err))

app.listen(port, () => console.log(`Server running on port ${port}`))