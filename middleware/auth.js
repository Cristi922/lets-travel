let auth = require('../controllers/auth');


function checkAuth(req, response, next) {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        next();
    } else{
        response.status(400);
        response.send('Not authorized!');
    }
}

module.exports = checkAuth;