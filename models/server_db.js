var db = require("../db");

save_user_information = (data) =>

  new Promise((resolve, reject) => {    
    
      //var stringSQL = "INSERT INTO lottery_information (amount, email) SET ('20', 'wesleychong21@gmail.com')";
      db.query('INSERT INTO lottery_information  set ?', data,  function (err, results, fields) {   
          if (err) {
            reject("could not insert into lattery information");
          }

          resolve("Successful");
      });
    })
 
  
 

module.exports = {
  save_user_information
}
