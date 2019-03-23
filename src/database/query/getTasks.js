const dbConnection = require('../dbConnection');

const getTasks = (user_id, cb) => {
    const sql = {
      text: 'SELECT * FROM tasks WHERE user_id=$1',
      values: [user_id],
    };
    dbConnection.query(sql, (err, res) => {
      if (err) {
          console.log('Error in getting tasks', err)
      } else {
        cb(null, res.rows);
      }
    });
  };
  module.exports = getTasks;