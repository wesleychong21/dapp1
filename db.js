var mysql = require('mysql');
var db_config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webapp'
   
}

var connection;

function handleDisconnect()
{
    connection = mysql.createConnection(db_config);
    connection.connect(function(err){
        if(err){
            console.log('error when connecting to db :', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err){
        if(err.code === 'PROTOLC_CONNECTION_LOST'){
            handleDisconnect();
        } else {
            throw err;
        }
    });

}