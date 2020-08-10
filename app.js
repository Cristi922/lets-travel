let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');


app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', { useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),  
    filename: (req, file, cb) => cb(null, file.originalname),  
})

app.use(multer({storage: imageStorage}).single('imageFile'));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);


app.get('/sight', async (req, response) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    response.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})


app.get('/admin', (req, response) => {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        response.render('admin');
    } else {
        response.redirect('/login');
    }  
})

app.get('/login', (req, response) => {
    response.render('login');
})


let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));

