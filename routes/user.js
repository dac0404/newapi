'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('../routes/db_config');

var cors = require('cors')
//Control-Allow-Origin 
router.use(cors());

  var connection; 
  var table = 'tx_user';
  //var wemail;

  router.post('/user/login/', (req, res, next) => {
    
    if(req.body != undefined){
      req.body = JSON.parse(JSON.stringify(req.body));
      
      if( req.body.hasOwnProperty('email')){
      
        if(req.body.email != "" ){

          var query = "Select id, email_confirmed From " + table + " WHERE email = ?";

          conectionDB();

          connection.query(query , [req.body.email], function (err, result, fields) {
            connection.end();
            if (err){
              res.send(500, {message: err});
              return;
            }

            if(result != undefined && result[0] != undefined){
                var user = result[0];
                if (user.email_confirmed == 0 || user.email_confirmed == ""){
                  res.json({
                    success: false,
                    message: 'Email not confirmed, check your email and try again!',
                    id: user.id
                  });
                  return;
                }
                res.json({
                  success: true,
                  message: 'logged in successfully!',
                  id: user.id
                });

              
            }else{
              //user dont exist so we create a new one 
              var query = "INSERT INTO " + table + " (`email`) VALUES (?);";
              conectionDB();

              connection.query(query , [req.body.email], function (err, result, fields) {
        
                if (err){
                  res.send(500, {message: err});
                  connection.end();
                  return;
                }
                
               res.json({
                  success: true,
                  message: 'logged in successfully!',
                  id: result.insertId
                });

                connection.end();

                return;
              });
            }
            
            connection.end();

            return;
          });

        }else{
          //data cant be null
          res.send(200, {success:false, message:"Data can't be null"});
        }
      }else{
        //missin parameter
        res.send(200, {success:false, message:"Missing parameters"});
      }
    }else{
      //missin parameter
        res.send(200, {success:false, message:"Wrong format"});
    }

    return;
  });

  router.put('/emailconfirmation', (req, res, next) =>{
    //wemail = req.body.email;
    //req.body = JSON.parse(JSON.stringify(req.body));
    //console.log(wemail);
    if (req.body.email != ""){
      var query = "UPDATE tx_user SET email_confirmed = 1 where email = ?"

      conectionDB();

      connection.query(query,[req.body.email], function(err, result, fields){
        if (err){
          res.send(500, {message: err});
          return;
        }

        if(result != undefined && result[0] != undefined){
          res.json({
            success: false,
          });
          return;
        }else{
          res.json({
            success: true,
          });
          return;
        }
      });
    }
  });


  function conectionDB(){
      
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {              
      if(err) {                                     
        console.log('error when connecting to db:', err);
        throw err; 
      }                                     
    }); 

    connection.on('error', function(err) {
      console.log('db error', err.code);
      /*if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        conectionDB();                         
      } else {                                      
        throw err;                                  
      }*/
    });                               
  }

 module.exports = router; 



