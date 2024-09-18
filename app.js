const path = require('path')
const express = require('express')
const router = require('./router/index')


const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/', router)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})