'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const User = require('../model/user')
const jwt = require('jsonwebtoken')

function prueba(req, res){
    res.json({
       "Tutorial": "Welcome to the Node express JWT Tutorial"
    })
}

//sign Up = registrarse
function signUp (req, res){
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) res.status(500).json({ error : 'Hubo un problema, el error reportado es ' + err })

        const user = new User({
            email: req.body.email,
            password: hash
        });

        user.save().then(function(result) {
            console.log(result)
            res.status(200).json({ mensaje : 'se a creado el nuevo usuario'})
        }).catch(error => {
            res.status(500).json({ error : 'Hubo un problema, el error reportado es ' + err })
          });
      })
}

//sign In = Logearse
function signIn (req, res){
    User.findOne({ email: req.body.email }).exec()
    .then(function(user) {
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if (err) return res.status(401).json({ error : 'Acceso no autorisado' })
            if (result) {
                const JWToken = jwt.sign({
                    email: user.email,
                    _id: user._id
                }, 'secret',
                {
                    expiresIn : '2h'
                });

                return res.status(200).json({ mensaje : 'Bienvenido', token: JWToken })
            }
            return res.status(401).json({ error : 'Acceso no autorisado' })
        })
    }).catch(error => {
        res.status(500).json({ error : 'Hubo un problema, el error reportado es ' + error })
    })
}

module.exports = {
    prueba,
    signUp,
    signIn
}