const dbConnection = require('../dbConnection');

const deleteUser = (id, cb) => {
    const sql = {
      text: 'DELETE FROM tasks WHERE id=$1',
      values: [id],
    };
    dbConnection.query(sql, (err, res) => {
      if (err) {
          console.log('Error in deleting tasks', err);
        cb(err);
      } else {
        cb(null, res.rows);
      }
    });
  };
  module.exports = deleteUser;