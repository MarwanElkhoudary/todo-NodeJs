const checkEmail = require('../database/query/checkEmail');
const bcrypt = require('bcryptjs');
const {
    createCookie
} = require('./authentication/authinticate')
exports.get = (req, res) => {
    res.render('login', {
        title: 'LOGIN',
        authenticated:false,
        css: 'style/login.css'
    });
}

exports.post = (req, res) => {
    const data = req.body;
    const {
        email,
        password
    } = data;
    if (data) {
        checkEmail(email, (errCheckEmail, resCheckEmail) => {
            if (errCheckEmail) {
                res.render('login', {
                    msg: 'Error'
                });
            } else {
                if(resCheckEmail.length === 0){
                    res.render('login', {
                        msg: 'Email or Password is Wrong',
                        authenticated:false,
                        css: 'style/login.css'
                    });
                }else{
                bcrypt.compare(password, resCheckEmail[0].password, (compareError, compareResult) => {
                    if (compareResult === false) {
                        res.render('login', {
                            msg: 'Email or Password is Wrong',
                            authenticated:false,
                            css: 'style/login.css'
                        });
                    } else {
                        createCookie({
                            id: resCheckEmail[0].id,
                            name: resCheckEmail[0].fname
                        }, (errToken, token) => {
                            if (errToken) {
                                res.render('login', {
                                    msg: 'Password is Wrong',
                                    authenticated:false,
                                    css: 'style/login.css'
                                });

                            } else {
                                res.setHeader(
                                    'Set-Cookie',
                                    `data=${token};httpOnly;Max-age=90000000`,
                                );
                                res.redirect('/');
                            }
                        })
                    }
                })
            }
            }
        })
    }
}