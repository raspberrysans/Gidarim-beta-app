const express = require('express');
const router = express.Router();
const registerTemplateCopy = require('../Models/registermodels');
const bcrypt = require('bcrypt');
router.post('/register', async (request, response) => {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(request.body.password, saltPassword);
    const registeredUser = new registerTemplateCopy({
        userid: request.body.userid,
        password: securePassword,
        fullname: request.body.fullname,
        dateOfBirth: request.body.dateOfBirth,
        email: request.body.email,
    });
    registeredUser.save()
    .then(data => {
        response.json(data);
    })
    .catch(error => {
        response.json(error);
    })
});

module.exports = router;