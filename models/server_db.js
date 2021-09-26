var db = require("../db");

save_user_information = (data) =>  new Promise((resolve, reject) => {        
      //var stringSQL = "INSERT INTO lottery_information (amount, email) SET ('20', 'wesleychong21@gmail.com')";
      db.query('INSERT INTO lottery_information  set ?', data,  function (err, results, fields) {   
          if (err) {
            reject("could not insert into lattery information");
          }

          resolve("Successful");
      });
    })  

    get_total_amount = (data) =>  new Promise((resolve, reject) => {        
      //var stringSQL = "INSERT INTO lottery_information (amount, email) SET ('20', 'wesleychong21@gmail.com')";
      db.query('select sum(amount) as total_amount from lottery_information' ,null,  function (err, results, fields) {   
          if (err) {
            reject("could not get total amount");
          }

          resolve(results);
      });
    })  
 

module.exports = {
  save_user_information
}
