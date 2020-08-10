let Email = require('../models/emails').Email;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, async (req, response) => {
    response.send(await Email.find());
});

router.post('/', async (req, response) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new Date()
    })
    await newEmail.save();
    response.send('Accepted');
});

router.delete('/:id', authMiddleware, async (req, response) => {
    await Email.deleteOne({id: req.params.id});
    response.send('Deleted');
});

module.exports = router;