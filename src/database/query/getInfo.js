const dbConnection = require('../dbConnection');

const getInfo = (id, cb) => {
    const sql = {
      text: 'SELECT * FROM users WHERE id=$1',
      values: [id],
    };
    dbConnection.query(sql, (err, res) => {
      if (err) {
          console.log('Error in getting info from users table', err)
      } else {
        cb(null, res.rows);
      }
    });
  };
  module.exports = getInfo;