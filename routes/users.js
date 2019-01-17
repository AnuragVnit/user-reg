const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
 
router.post('/',(req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    User.findOne({ email: req.body.email })
    .then((user)=>{
        if (user) {
            return res.status(400).send('That user already exisits!');
        } else {
            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            const { error } = validate(user);
            if (error) {
                console.log(" yaha fata");
                return res.status(400).send(error.details[0].message);

            }
            const salt = bcrypt.genSalt(10);
            user.password = bcrypt.hash(user.password, salt);
            user.save();
            res.send(user);
        }
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).send('That user already exisits!'+ err);

    });
    
});
// function validatee(user) {
//     const schema = {
//         name: Joi.string().min(3).max(255).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().required().password()
//     };
 
//     return Joi.validate(user, schema);
// }
 
module.exports = router;