'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('../routes/db_config');

var formFunctions = require('../routes/formsFunctions.js');

var cors = require('cors')
//Control-Allow-Origin 
router.use(cors());

  var connection; 
  var table = 'tx_form_dependent';

  router.get('/form_dependent/has/:userId/:Year', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){

      var query = "SELECT * FROM " + table + " where UserId = ? AND Year = ?";

      conectionDB();
      var _sqlparams = [];

          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.params.Year);

      connection.query(query , _sqlparams, function (err, result, fields) {
        
        if (err){
          res.send(500, {message: err});
          connection.end();
          return;
        }
        
        if(result != undefined && result[0] != undefined){
          res.json({success:true , hasdata: true , data: result});
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

  router.get('/form_dependent/has/:userId', (req, res, next) => {

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
          res.json({success:true , hasdata: true , data: result});
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

  router.post('/form_dependent/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('firtsname') && req.body.firtsname != "" &&  
          req.body.hasOwnProperty('lastname') && req.body.lastname != "" &&  
          req.body.hasOwnProperty('ssn') && req.body.ssn != "")
      {

        
          var _sqlparams = [];

          _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.firtsname);
          _sqlparams.push(req.body.lastname);
          _sqlparams.push(req.body.relationship);
          _sqlparams.push(req.body.manymonth);
          _sqlparams.push(req.body.BirthDate);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
           _sqlparams.push(req.body.Year);

          console.log("insert child care: ",_sqlparams);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`ssn`,`firtsname`,`lastname`,`relationship`,`manymonth`,`BirthDate`,`FormInfoId`,`UserID`, `Year`) VALUES (?,?,?,?,?,?,?,?,?);";

            conectionDB();

            connection.query(queryInsert , _sqlparams, function (err, result, fields) {

              if (err){
                res.send(500, {message: err});
                connection.end();
                return;
              }

              //res.send(200, {success: true, message:"Inserted successfully"});

              connection.end();
              conectionDB();
              //return;
              return formFunctions.insert_into_forms_detail (connection, req.params.userId, result.insertId, req.body.FormInfoId, res, next);
            });
          
          // END inserting new personal profil
        
        
     }else{    
          
          // console.log("req.body.hasOwnProperty('ssn') ",req.body.hasOwnProperty('ssn') );
          // console.log("req.body.ssn != '' ",req.body.ssn != "" );
          
          // console.log("req.body.hasOwnProperty('City') ",req.body.hasOwnProperty('City') );
          // console.log("req.body.City != '' ",req.body.City != "" );
          
          // console.log("req.body.hasOwnProperty('CareProvider') ",req.body.hasOwnProperty('CareProvider') );
          // console.log("req.body.CareProvider != '' ",req.body.CareProvider != "" );
          // console.log("req.body.hasOwnProperty('State') ",req.body.hasOwnProperty('State') );
          // console.log("req.body.State != '' ",req.body.State != "" );
          

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: First Name, Last Name, SSN"});
        return;
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return;  
    }
    return;
  });
  
  router.put('/form_dependent/:DependentID', (req, res, next) => {
    if(req.params.dependentID && isInteger(req.params.DependentID) ){

      var _sqlparams = [];

          _sqlparams.push(req.body.ssn);
          _sqlparams.push(req.body.firtsname);
          _sqlparams.push(req.body.lastname);
          _sqlparams.push(req.body.relationship);
          _sqlparams.push(req.body.manymonth);
          _sqlparams.push(req.body.BirthDate);
         
          _sqlparams.push(req.params.DependentID);
   
      var queryUpdate = "UPDATE " + table + " SET `ssn` = ?,`firtsname` = ?,`lastname` = ?,`relationship` = ?,`manymonth` = ?,`BirthDate` = ?  WHERE Id =  ?;";

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
      res.send(200, {success: false, message: "The dependent id is required"});
      return;  
    }
    return;
  });

  router.delete('/form_dependent/:formId/:userId', (req, res, next) => {
    conectionDB();
    return formFunctions.delRecord(req, res, next, table, connection);  
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

