const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.post('/',(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Incorrect email or password.');
    }
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect password.');
    }
    const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
    res.header('x-auth-token', token).send("login successful");
});
 
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
 
    return Joi.validate(req, schema);
}
 
module.exports = router; 