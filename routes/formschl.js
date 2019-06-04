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
  var table = 'tx_form_schl';

  router.get('/form_schl/has/:userId/:Year', (req, res, next) => {

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

  router.get('/form_schl/has/:userId', (req, res, next) => {

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

  router.post('/form_schl/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('tsj') && req.body.tsj != "" &&
        req.body.hasOwnProperty('Fed') && req.body.Fed != "" && 
        req.body.hasOwnProperty('Name') && req.body.Name != "")
      {

        
          var _sqlparams = [];

          _sqlparams.push(req.params.userId);
          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.body.Year);
          _sqlparams.push(req.body.tsj);
          _sqlparams.push(req.body.fort);
          _sqlparams.push(req.body.MultiForm);
          _sqlparams.push(req.body.NotIssued ? 1 : 0);
          _sqlparams.push(req.body.Fed);
          _sqlparams.push(req.body.Name);
          _sqlparams.push(req.body.Address);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);
          _sqlparams.push(req.body.AName);
          _sqlparams.push(req.body.AName2);
          _sqlparams.push(req.body.AAddress);
          _sqlparams.push(req.body.ACity);
          _sqlparams.push(req.body.AState);
          _sqlparams.push(req.body.Azip);
          _sqlparams.push(req.body.RealTax ? req.body.RealTax : 0);
          _sqlparams.push(req.body.PrimaryRes ? 1 : 0);
          _sqlparams.push(req.body.MortgageInterest ? req.body.MortgageInterest : 0);
          _sqlparams.push(req.body.OutMortgage ? req.body.OutMortgage : 0);
          _sqlparams.push(req.body.MortgageOrig ? req.body.MortgageOrig : 0);
          _sqlparams.push(req.body.RefundOver ? req.body.RefundOver : 0);
          _sqlparams.push(req.body.MortgageInsurance ? req.body.MortgageInsurance : 0);
          _sqlparams.push(req.body.Qualifed ? 1 : 0);
          _sqlparams.push(req.body.PointsPaid ? req.body.PointsPaid : 0);
          _sqlparams.push(req.body.SameAddress ? 1 : 0);
          _sqlparams.push(req.body.AddressProperty);
          _sqlparams.push(req.body.Address1);
          _sqlparams.push(req.body.Address2);
          _sqlparams.push(req.body.Address3);
          _sqlparams.push(req.body.Description);
          _sqlparams.push(req.body.FormName);
           

          console.log("insert child care: ",_sqlparams);

            //if record doesn't exist we create it
            //inserting new rpersonal profile
            var queryInsert = "INSERT INTO " + table + " (`UserId`, `FormInfoId`, `Year`, `tsj`, `fort`, `MultiForm`, `NotIssued`, `Fed`, `Name`, `Address`, `City`, `State`, `Zip`, `AName`, `AName2`, `AAddress`, `ACity`, `AState`, `Azip`, `RealTax`, `PrimaryRes`, `MortgageInterest`, `OutMortgage`, `MortgageOrig`, `RefundOver`, `MortgageInsurance`, `Qualifed`, `PointsPaid`, `SameAddress`, `AddressProperty`, `Address1`, `Address2`, `Address3`, `Description`, `FormName`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

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
          
          console.log("req.body.hasOwnProperty('tsj') ",req.body.hasOwnProperty('tsj') );
           console.log("req.body.hasOwnProperty('Fed') ",req.body.hasOwnProperty('Fed') );
            console.log("req.body.hasOwnProperty('Name') ",req.body.hasOwnProperty('Name') );
          
          

          console.log(req.body);

        res.send(200, {success: false, message: "One of this fields has no value: Tsj, Fed, Name"});
        return;
     }

    }else{
      res.send(200, {success: false, message: "User Id is required"});
      return;  
    }
    return;
  });
  
  router.put('/form_schl/:SchlId', (req, res, next) => {
    if(req.params.SchlId && isInteger(req.params.SchlId) ){

      var _sqlparams = [];

          _sqlparams.push(req.body.tsj);
          _sqlparams.push(req.body.fort);
          _sqlparams.push(req.body.MultiForm);
          _sqlparams.push(req.body.NotIssued ? 1 : 0);
          _sqlparams.push(req.body.Fed);
          _sqlparams.push(req.body.Name);
          _sqlparams.push(req.body.Address);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);
          _sqlparams.push(req.body.AName);
          _sqlparams.push(req.body.AName2);
          _sqlparams.push(req.body.AAddress);
          _sqlparams.push(req.body.ACity);
          _sqlparams.push(req.body.AState);
          _sqlparams.push(req.body.Azip);
          _sqlparams.push(req.body.RealTax ? req.body.RealTax : 0);
          _sqlparams.push(req.body.PrimaryRes ? 1 : 0);
          _sqlparams.push(req.body.MortgageInterest ? req.body.MortgageInterest : 0);
          _sqlparams.push(req.body.OutMortgage ? req.body.OutMortgage : 0);
          _sqlparams.push(req.body.MortgageOrig ? req.body.MortgageOrig : 0);
          _sqlparams.push(req.body.RefundOver ? req.body.RefundOver : 0);
          _sqlparams.push(req.body.MortgageInsurance ? req.body.MortgageInsurance : 0);
          _sqlparams.push(req.body.Qualifed ? 1 : 0);
          _sqlparams.push(req.body.PointsPaid ? req.body.PointsPaid : 0);
          _sqlparams.push(req.body.SameAddress ? 1 : 0);
          _sqlparams.push(req.body.AddressProperty);
          _sqlparams.push(req.body.Address1);
          _sqlparams.push(req.body.Address2);
          _sqlparams.push(req.body.Address3);
          _sqlparams.push(req.body.Description);
          _sqlparams.push(req.body.FormName);
         
          _sqlparams.push(req.params.SchlId);
   
      var queryUpdate = "UPDATE " + table + " SET `tsj`= ?,`fort`= ?,`MultiForm`= ?,`NotIssued`= ?,`Fed`= ?,`Name`= ?,`Address`= ?,`City`= ?,`State`= ?,`Zip`= ?,`AName`= ?,`AName2`= ?,`AAddress`= ?,`ACity`= ?,`AState`= ?,`Azip`= ?,`RealTax`= ?,`PrimaryRes`= ?,`MortgageInterest`= ?,`OutMortgage`= ?,`MortgageOrig`= ?,`RefundOver`= ?,`MortgageInsurance`= ?,`Qualifed`= ?,`PointsPaid`= ?,`SameAddress`= ?,`AddressProperty`= ?,`Address1`= ?,`Address2`= ?,`Address3`= ?,`Description`= ?, `FormName`= ?   WHERE Id =  ?;";

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
      res.send(200, {success: false, message: "The Form id is required"});
      return;  
    }
    return;
  });

  router.delete('/form_schl/:formId/:userId', (req, res, next) => {
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

