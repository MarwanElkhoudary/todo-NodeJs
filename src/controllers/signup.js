// app.post('/create_blog', upload.single('image'), async (req, res) => {
//     const result = await cloudinary.v2.uploader.upload(req.file.path);
//     res.send(result)
//   })
const addUser = require('../database/query/addUser');
const hashPassword = require('./authentication/hashPassword');
const upload = require('./multer');
const cloudinary = require('cloudinary');
require('env2')('./config.env')
require('./cloudinary');

const {
    createCookie
} = require('./authentication/authinticate');

exports.get = (req, res) => {
    res.render('signup', {
        title: 'Sign Up',
        authenticated:false,
        css: 'style/signup.css'
    });
}

exports.post =  async (req, res) => {
    // console.log('req', req)
    const result = await cloudinary.v2.uploader.upload(req.file.path);
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
                    title: 'Sign Up',
                    authenticated:false,
                    msg:'Error',
                    css: 'style/signup.css'
                });
            } else {
                cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
                 if(error){
                    res.render('signup', {
                        title: 'Sign Up',
                        authenticated:false,
                        msg:'Error in image size',
                        css: 'style/signup.css'
                    });
                 }else{
                addUser(data, hash,result.url, (errAdd, user) => {
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
        })
    }
}