let Post = require('../models/posts').Post;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
let authMiddleware = require('../middleware/auth');


router.get('/', async (req, response) => {
    let posts = await Post.find();
    response.send(posts);
})

router.get('/:id', async (req, response) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    response.send(post);
})

router.post('/', authMiddleware, async (req, response) => {
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageUrl) {
        imgPath = reqBody.imageUrl;
    } else {
        imgPath = req.file.path.substring(req.file.path.indexOf('\\'), req.file.path.length);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    await newPost.save(); 
    response.send('Created!');
})

router.delete('/:id', authMiddleware, async (req, response) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    response.send('Deleted!');
})

router.put('/:id', authMiddleware, async (req, response) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    response.send('Updated!');
})

module.exports = router;