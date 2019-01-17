const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
// const config = JSON.parse(require('./config/custom-environment-variables.json'));
const config = require('./config/custom-environment-variables.json');
console.log("FATA ",config, typeof config);
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();
if (!config.PrivateKey) {
    console.error('FATAL ERROR: PrivateKey is not defined.');
    process.exit(1);
}
mongoose.connect('mongodb://localhost/user_reg')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));