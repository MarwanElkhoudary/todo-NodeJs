const express = require('express');
const home = require('./home');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const info = require('./info')
const {authorize} = require('./middleware');
const router = express.Router();



router.get('/logout', logout.get)
router.get('/signup', signup.get)
router.post('/signup', signup.post)
router.get('/login', login.get)
router.post('/login', login.post)
router.post('/',  home.post);
router.post('/delete/:id', home.delete)
router.get('/info', authorize, info.get)
router.get('/', authorize, home.get);

module.exports = router;