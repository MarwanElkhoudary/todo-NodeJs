const dbConnection = require('../dbConnection');

const deleteUser = (id, cb) => {
    console.log(55555, id)
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
        console.log('dddddddddddddddddd', res)
      }
    });
  };
  module.exports = deleteUser;