const addUser = require('../database/query/addUser');
const hashPassword = require('./authentication/hashPassword');
const {
    createCookie
} = require('./authentication/authinticate')
exports.get = (req, res) => {
    res.render('signup', {
        title: 'Sign Up',
        authenticated:false,
        css: 'style/signup.css'
    });
}

exports.post = (req, res) => {
    const data = req.body;
    const {
        fname,
        lname,
        email,
        password,
        image,
        spec,
        hobbies,
        abstract
    } = data;

    if (data) {
        hashPassword(password, (err, hash) => {
            if (err) {
                res.render('signup', {
                    msg: 'Error'
                });
            } else {
                addUser(data, hash, (errAdd, user) => {
                    if (errAdd) {
                        res.render('signup', {
                            title: 'Sign Up',
                            authenticated:false,
                            msg:'This email is already registered, please choose another one',
                            css: 'style/signup.css'
                        });
                    } else {
                        createCookie({
                            id: user.rows[0].id,
                            name: user.rows[0].fname
                        }, (errToken, token) => {
                            if (errToken) {
                                res.render('/login');
                            } else {
                                console.log('token', token)
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
        })
    }
}