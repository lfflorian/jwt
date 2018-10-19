'use strict'

const express = require('express')
const prueba = require('../controller/prueba')
const api = express.Router()


api.get('/cheking', prueba.prueba)
api.post('/signup', prueba.signUp)
api.post('/signin', prueba.signIn)

module.exports = api