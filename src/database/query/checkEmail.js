const dbConnection = require('../dbConnection');

const checkUser = (email, cb) => {
    const sql = {
      text: 'SELECT * FROM users WHERE email=$1',
      values: [email],
    };
    dbConnection.query(sql, (err, res) => {
      if (err) {
          console.log('error1')
        cb(err);
      } else {
        cb(null, res.rows);
      }
    });
  };
  module.exports = checkUser;