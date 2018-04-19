Kitani, [18.04.18 20:05]
var mysql      = require('mysql');

var config     = require('./config.json');

var connection = mysql.createConnection({
  host     : config.dbhost,
  user     : config.dbuser,
  password : config.dbpassword,
  database : config.dbname
});



function check(){
  let defered = Promise.defer();

  connection.connect(function(err) {
    if (err) throw err;
    connection.query('SELECT count(*) FROM reserve WHERE starTp >=2', function (error, results, fields) {
      if (error) defered.reject(error);
      else{
        defered.resolve(parseInt(results[0]['count(*)']));
      }    
    });
  });

  return defered.promise;
}

check().then(function (value) {
    if(value > 0){
        connection.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
          var sql = "INSERT INTO reserve (my_id,starTp,endTp) VALUES (10,9,6)";
          connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          });
        });
      }else{
        console.log('sorry full park');
      }
}).catch(function (err) {
    // handling error here if you want 
});
 