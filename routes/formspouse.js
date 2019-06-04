'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('../routes/db_config');

var cors = require('cors')
//Control-Allow-Origin 
router.use(cors());

  var connection; 
  var table = 'tx_form_spouse';

  router.get('/form_spouse/has/:userId', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){

      var query = "SELECT * FROM " + table + " where UserId = ?";

      conectionDB();

      connection.query(query , [req.params.userId], function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          connection.end();
          return;
        }
        
        if(result != undefined && result[0] != undefined){
          res.json({success:true , hasdata: true , data: result[0]});
          connection.end();
          return;
        }else{
          //missin parameter
          res.json({success:true , hasdata: false});
          connection.end();
          return;
        }

      });

    }else{
      res.send(200, {success: false, message: "Param must be a number"});
      return;  
    }
    return;
  });

  router.post('/form_spouse/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('FirstName') && req.body.FirstName != "" &&  
          req.body.hasOwnProperty('LastName') && req.body.LastName != "" && 
          req.body.hasOwnProperty('BirthDate') && req.body.BirthDate != "" && 
          req.body.hasOwnProperty('ssn') && req.body.ssn != "")
      {

        //querying if a personal profile already exists
        var querySelect = "SELECT * FROM " + table + " WHERE UserID =  ?";

        conectionDB();

        connection.query(querySelect , [req.params.userId], function (err, result, fields) {

          if (err){
            res.send(500, {message: err});
            connection.end();
            return;
          }
          connection.end();
          var _sqlparams = [];

          _sqlparams.push(req.body.FirstName);
          _sqlparams.push(req.body.LastName);
          _sqlparams.push(req.body.BirthDate);
          _sqlparams.push(req.body.DeathDate);
          _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.Occupation);
          _sqlparams.push(req.body.PhoneNumber);
          _sqlparams.push(req.body.Ext);
          _sqlparams.push(req.body.PhoneNumber2);
          _sqlparams.push(req.body.Ext2);
          _sqlparams.push(req.body.PhoneType1);
          _sqlparams.push(req.body.PhoneType2);
          _sqlparams.push(req.body.FormInfoID);
          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.Year);

          console.log("insert personal profile: ",_sqlparams);

          //if record exist we should update
          if(result != undefined && result[0] != undefined){

            //if record does exist we update it
            var queryInsert = "UPDATE " + table + " SET `FirstName` = ?,`LastName` = ?,`BirthDate` = ?,`DeathDate` = ?,`ssn` = ?,`Occupation` = ?,`PhoneNumber` = ?,`Ext` = ?,`PhoneNumber2` = ?,`Ext2` = ?,`PhoneType1` = ?, `PhoneType2` = ?,`FormInfoID` = ?  WHERE UserID =  ?;";

            conectionDB();

            connection.query(queryInsert , _sqlparams, function (err, result, fields) {

              if (err){
                res.send(500, {message: err});
                connection.end();
                return;
              }

              res.send(200, {success: true, message:"Updated successfully"});

              connection.end();

              return;
            });            

          }else{
            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`FirstName`,`LastName`,`BirthDate`,`DeathDate`,`ssn`,`Occupation`,`PhoneNumber`,`Ext`,`PhoneNumber2`,`Ext2`,`PhoneType1`, `PhoneType2` ,`FormInfoID`,`UserID`, `Year`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

            conectionDB();

            connection.query(queryInsert , _sqlparams, function (err, result, fields) {

              if (err){
                res.send(500, {message: err});
                connection.end();
                return;
              }

              res.send(200, {success: true, message:"Inserted successfully"});

              connection.end();

              return;
            });
          }
          // END inserting new personal profile
        });
        
        
     }else{    
          
          console.log("req.body.hasOwnProperty('FirstName') ",req.body.hasOwnProperty('FirstName') );
          console.log("req.body.FirstName != '' ",req.body.FirstName != "" );
          
          console.log("req.body.hasOwnProperty('LastName') ",req.body.hasOwnProperty('LastName') );
          console.log("req.body.LastName != '' ",req.body.LastName != "" );
          
          console.log("req.body.hasOwnProperty('BirthDate') ",req.body.hasOwnProperty('BirthDate') );
          console.log("req.body.BirthDate != '' ",req.body.BirthDate != "" );
          console.log("req.body.hasOwnProperty('ssn') ",req.body.hasOwnProperty('ssn') );
          console.log("req.body.Ssn != '' ",req.body.Ssn != "" );
          

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: FirstName,LastName,BirthDate,ssn"});
        return;
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return;  
    }
    return;
  });
  
  router.put('/form_spouse/:FormSpouseID', (req, res, next) => {
    if(req.params.FormSpouseID && isInteger(req.params.FormSpouseID) ){

      var _sqlparams = [];

          _sqlparams.push(req.body.FirstName);
          _sqlparams.push(req.body.LastName);
          _sqlparams.push(req.body.BirthDate);
          _sqlparams.push(req.body.DeathDate);
          _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.Occupation);
          _sqlparams.push(req.body.PhoneNumber);
          _sqlparams.push(req.body.Ext);
          _sqlparams.push(req.body.PhoneNumber2);
          _sqlparams.push(req.body.Ext2);
          _sqlparams.push(req.body.PhoneType1);
          _sqlparams.push(req.body.PhoneType2);
         
          _sqlparams.push(req.params.FormSpouseID);
   
      var queryUpdate = "UPDATE " + table + " SET `FirstName` = ?,`LastName` = ?,`BirthDate` = ?,`DeathDate` = ?,`ssn` = ?,`Occupation` = ?,`PhoneNumber` = ?,`Ext` = ?,`PhoneNumber2` = ?,`Ext2` = ?,`PhoneType1` = ?, `PhoneType2` = ?  WHERE Id =  ?;";

      conectionDB();

      connection.query(queryUpdate , _sqlparams, function (err, result, fields) {

        if (err){
          res.send(500, {message: err});
          connection.end();
          return;
        }

        res.send(200, {success: true, message:"Updated successfully"});

        connection.end();

        return;
      });            

    } else{
      res.send(200, {success: false, message: "The SpouseForm id is required"});
      return;  
    }
    return;
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

  function isInteger(str){
    var reg = /^\d+$/;
    return reg.test(str);
  }

module.exports = router;

