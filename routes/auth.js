const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const config = require('config');
const config = require('./../config/custom-environment-variables.json');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.post('/',(req, res) => {
    
    let user = User.findOne({ email: req.body.email })
    .then((user)=>{
        if (!user) {
            return res.status(400).send('Incorrect email or password.');
        }
        bcrypt.compare(req.body.password, user.password)
        .then((bresponse)=>{
            //console.log(response);
            if (!bresponse) {
                return res.status(400).send('Incorrect password.');
                }
                const token = jwt.sign({ _id: user._id },config.PrivateKey);
                res.status(200).header('x-auth-token', token).send("login successful");

        })
        .catch((error)=>{
            console.log("error in bcrypt compare",error);
        });
    })
    .catch((error)=>{
        console.log( "error is ",error);

    });
    
    
    
});
 
module.exports = router; 