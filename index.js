const express = require('express')
const app = express()
const bodyParser = require('body-Parser')
const api = require('./route')
const mongoose = require('mongoose')

const PORT = 3000
mongoose.connect('mongodb://localhost/jwt', { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)

app.listen(PORT, function(){
    console.log('Server is runing on Port', PORT);
});