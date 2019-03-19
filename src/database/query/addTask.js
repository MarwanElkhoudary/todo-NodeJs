const dbConnection = require('../dbConnection');

const addTask = (obj, user_id, cb)=>{
  let sql = {
    text:'INSERT INTO tasks (user_id, title, task, done)VALUES($1, $2, $3, $4) RETURNING *;', 
    values:[user_id ,obj.title, obj.task, false]
  };

  dbConnection.query(sql, (err, result) => {
       if(err){
         console.log('Error in adding new task', err);
       }else{
         cb(null, result)
       }
  })
}

module.exports = addTask;