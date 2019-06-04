var mysql = require('mysql');
var connection;

// var db_config = {
//   host: "localhost",
//   user: "root",
//   password: "1234",
//   database: "admin_tax_pupilo",
//   multipleStatements: true
// };


var db_config = {
  host: "69.87.220.221",
  user: "mysql_pupilo",
  password: "W3lcome.557223",
  database: "admin_tax_pupilo",
  multipleStatements: true
};

// var db_config = {
//   host: "69.87.220.221",
//   user: "mysql_pupilo",
//   password: "W3lcome.557223",
//   database: "pupilotaxapp",
//   multipleStatements: true
// };

// connection = mysql.createConnection(db_config);
// connection.connect(function(err) {              
//   if(err) {                                     
//     console.log('error when connecting to db:', err);
//     throw err; 
//   }                                     
// }); 

// connection.on('error', function(err) {
//   console.log('db error', err.code);
// });  

module.exports = db_config;