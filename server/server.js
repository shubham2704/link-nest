import express from "express";
import  dotenv  from "dotenv"

dotenv.config()
const port = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
    res.send('welcome to link nest')
})

app.listen(port, () => console.log(`Server running on port ${port}`))