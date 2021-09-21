const mongoose = require('mongoose');
const registerTemplate = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    fullname:{
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    dateOfRegistration: {
        type: Date,
        default: Date.now()
    }

});
module.exports = mongoose.model('myTable', registerTemplate);