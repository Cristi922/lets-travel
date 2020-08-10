let User = require('../models/users').User;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

router.post('/login', async (req, response) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    if(user.length > 0){
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        if(comparisonResult) {
            let token = auth.generateToken(user[0]);
            response.cookie('auth_token', token);
            response.send({
                redirectURL: '/admin'
            });
        } else {
            response.status(400);
            response.send('Rejected');
        }
    } else {
        response.status(400);
        response.send('Rejected');
    }
})

router.post('/register', async (req, response) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    if(user.length === 0){
        let ecryptedPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: ecryptedPass
        })
        await newUser.save();
        response.send('Done');
    } else {
        response.send('Rejected');
    }
})

module.exports = router;