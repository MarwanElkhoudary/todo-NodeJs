exports.authorize = (req, res, next) => {
  if (req.headers.cookie) {
    next();
  } else {
    res.redirect('/login');
  }
};