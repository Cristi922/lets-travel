let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, async (req, response) => {
    response.send(await CallbackRequest.find());
});

router.post('/', async (req, response) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    response.send('Accepted');
});
router.delete('/:id', authMiddleware, async (req, response) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    response.send('Deleted');
});

module.exports = router;