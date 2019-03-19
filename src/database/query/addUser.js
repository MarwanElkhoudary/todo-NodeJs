const dbConnection = require('../dbConnection');

const addUser = (obj, hash, cb)=>{
  let sql = {
    text:'INSERT INTO users (fname, lname, email, password, image, spec, hobbies, abstract)VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;', 
    values:[obj.fname, obj.lname, obj.email, hash, obj.image, obj.spec, obj.hobbies, obj.abstract]
  };

  dbConnection.query(sql, (err, result) => {
       if(err){
         console.log('Error in adding new user', err);
       }else{
         cb(null, result)
       }
  })
}

module.exports = addUser;