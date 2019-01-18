const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
 
router.post('/',(req, res) => {
    const user = User.findOne({ email: req.body.email })
    .then((user)=>{
        if (user) {
            return res.status(400).send('That user already exisits!');
        } else {
            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    console.log('salt error ' + err.message);
                } else {
                    //console.log("here is salt",salt);
                    bcrypt.hash(user.password, salt, function (err, hash) {
                        if (err) {
                            console.log('hashing error: ' + err.message);
                        } else {
                            user.password = hash;
                            //console.log(" here is hashed password",user.password);
                            user.save()
                            .then(()=>{
                               // console.log(" entry is saved");
                                //console.log(user.password);
                                res.send(user);
                            })
                            .catch((error)=>{
                                return res.send(" bad input"+ error);
                            });
                            
                        }
                    });
                }
            });
        }
    })
    .catch((err)=>{
        console.log(err);
        return res.status(500).send('That user already exisits!'+ err);

    });
    
});
router.get('/',(req,res)=>{
        const user = User.find()
        .then((user)=>{
            if(!user){
                console.log("database is empty..no users");
                return res.status(404).send(" databse is khali");
            }
            return res.status(200).send(user);
        })
        .catch((error)=>{
            console.log(error);
        });

});
module.exports = router;