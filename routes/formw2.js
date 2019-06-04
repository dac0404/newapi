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
  var table = 'tx_form_w2';

  router.get('/w2/has/:userId/:Year', (req, res, next) => {

    if(req.params.userId && isInteger(req.params.userId) ){

      var query = "SELECT * FROM " + table + " where UserId = ? AND Ts = ?";

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

  router.get('/w2/has/:userId', (req, res, next) => {

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

  router.post('/w2/:userId', (req, res, next) => {
    if(req.params.userId && isInteger(req.params.userId) ){
      if( req.body.hasOwnProperty('Ts') && req.body.Ts  != "" && 
          req.body.hasOwnProperty('FormName') && req.body.FormName  != "" &&
          req.body.hasOwnProperty('Ein') && req.body.Ein  != "" &&
          req.body.hasOwnProperty('Name') && req.body.Name  != "" && 
          //req.body.hasOwnProperty('ControlNumber') && req.body.ControlNumber  != "" && 
          req.body.hasOwnProperty('Address') && req.body.Address  != "" &&
          req.body.hasOwnProperty('City') && req.body.City  != "" && 
          req.body.hasOwnProperty('State') && req.body.State  != "" &&
          req.body.hasOwnProperty('Zip') && req.body.Zip  != "")
          
          
      {

          var _sqlparams = [];

          _sqlparams.push(req.body.Ts);
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ein);
          _sqlparams.push(req.body.Name);
          //_sqlparams.push(req.body.ControlNumber);
          _sqlparams.push(req.body.Address);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);

          _sqlparams.push(req.body.box1);
          _sqlparams.push(req.body.box2);
          _sqlparams.push(req.body.box3);
          _sqlparams.push(req.body.box4);
          _sqlparams.push(req.body.box5);
          _sqlparams.push(req.body.box6);
          _sqlparams.push(req.body.box7);
          _sqlparams.push(req.body.box8);
          _sqlparams.push(req.body.box9);
          _sqlparams.push(req.body.box10);
          _sqlparams.push(req.body.box11);
          _sqlparams.push(req.body.box12);
          _sqlparams.push(req.body.box12b);
          _sqlparams.push(req.body.box12c);
          _sqlparams.push(req.body.box13a);
          _sqlparams.push(req.body.box13b);
          _sqlparams.push(req.body.box13c);
          _sqlparams.push(req.body.box14aa);
          _sqlparams.push(req.body.box14ab);
          _sqlparams.push(req.body.box14ac);
          _sqlparams.push(req.body.box14ad);
          _sqlparams.push(req.body.box14ba);
          _sqlparams.push(req.body.box14bb);
          _sqlparams.push(req.body.box14bc);
          _sqlparams.push(req.body.box14bd);
          _sqlparams.push(req.body.box15a);
          _sqlparams.push(req.body.box15b);
          _sqlparams.push(req.body.box16);
          _sqlparams.push(req.body.box17);
          _sqlparams.push(req.body.box18);
          _sqlparams.push(req.body.box19);
          _sqlparams.push(req.body.box20a);
          _sqlparams.push(req.body.box20b);

          _sqlparams.push(req.body.FormInfoId);
          _sqlparams.push(req.params.userId);
          //if record doesn't exist we create it
          //inserting new rpersonal profile
          var queryInsert = "INSERT INTO " + table + " (`Ts`, `FormName`, `Ein`, `Name`, `Address`, `City`, `State`, `Zip`,`box1`,`box2`,`box3`,`box4`,`box5`,`box6`,`box7`,`box8`,`box9`,`box10`,`box11`,`box12`,`box12b`,`box12c`,`box13a`,`box13b`,`box13c`,`box14aa`,`box14ab`,`box14ac`,`box14ad`,`box14ba`,`box14bb`,`box14bc`,`box14bd`,`box15a`,`box15b`,`box16`,`box17`,`box18`,`box19`,`box20a`,`box20b`, `FormInfoId`, `UserID`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

          conectionDB();

          connection.query(queryInsert , _sqlparams, function (err, result, fields) {

            if (err){
              res.send(500, {message: err});
              connection.end();
              return;
            }

            //LLAMAR A LA FUNCION
            connection.end();
            conectionDB();

            return formFunctions.insert_into_forms_detail (connection, req.params.userId, result.insertId, req.body.FormInfoId, res, next);

          });
        
     }else{    
        res.send(200, {success: false, message: "One of this fields has no value: FirstName,Minitial,LastName,JrSr,BirthDate,Ssn,Occupation,Address,Apt,City,State,Zip,PhoneNumber1,Ext1,StateResident,LivedAnother201,Tax,Legally,MaritalStatus,Spouse"});
        return;
     }

    }else{
      res.send(200, {success: false, message: "User id is required"});
      return;  
    }
    return;
  });
  
  router.put('/w2/:w2Id', (req, res, next) => {
      var _sqlparams = [];
          _sqlparams.push(req.body.Ts);
          _sqlparams.push(req.body.FormName);
          _sqlparams.push(req.body.Ein);
          _sqlparams.push(req.body.Name);
          //_sqlparams.push(req.body.ControlNumber);
          _sqlparams.push(req.body.Address);
          _sqlparams.push(req.body.City);
          _sqlparams.push(req.body.State);
          _sqlparams.push(req.body.Zip);

          _sqlparams.push(req.body.box1);
          _sqlparams.push(req.body.box2);
          _sqlparams.push(req.body.box3);
          _sqlparams.push(req.body.box4);
          _sqlparams.push(req.body.box5);
          _sqlparams.push(req.body.box6);
          _sqlparams.push(req.body.box7);
          _sqlparams.push(req.body.box8);
          _sqlparams.push(req.body.box9);
          _sqlparams.push(req.body.box10);
          _sqlparams.push(req.body.box11);
          _sqlparams.push(req.body.box12);
          _sqlparams.push(req.body.box12b);
          _sqlparams.push(req.body.box12c);
          _sqlparams.push(req.body.box13a);
          _sqlparams.push(req.body.box13b);
          _sqlparams.push(req.body.box13c);
          _sqlparams.push(req.body.box14aa);
          _sqlparams.push(req.body.box14ab);
          _sqlparams.push(req.body.box14ac);
          _sqlparams.push(req.body.box14ad);
          _sqlparams.push(req.body.box14ba);
          _sqlparams.push(req.body.box14bb);
          _sqlparams.push(req.body.box14bc);
          _sqlparams.push(req.body.box14bd);
          _sqlparams.push(req.body.box15a);
          _sqlparams.push(req.body.box15b);
          _sqlparams.push(req.body.box16);
          _sqlparams.push(req.body.box17);
          _sqlparams.push(req.body.box18);
          _sqlparams.push(req.body.box19);
          _sqlparams.push(req.body.box20a);
          _sqlparams.push(req.body.box20b);
          _sqlparams.push(req.params.w2Id);
   
      var queryInsert = "UPDATE " + table + " SET `Ts` = ?, `FormName` = ?,`Ein` = ?,`Name` = ?,`Address` = ?,`City` = ?,`State` = ?,`Zip`= ?,`box1`= ?,`box2`= ?,`box3`= ?,`box4`= ?,`box5`= ?,`box6`= ?,`box7`= ?,`box8`= ?,`box9`= ?,`box10`= ?,`box11`= ?,`box12`= ?,`box12b`= ?,`box12c`= ?,`box13a`= ?,`box13b`= ?,`box13c`= ?,`box14aa`= ?,`box14ab`= ?,`box14ac`= ?,`box14ad`= ?,`box14ba`= ?,`box14bb`= ?,`box14bc`= ?,`box14bd`= ?,`box15a`= ?,`box15b`= ?,`box16`= ?,`box17`= ?,`box18`= ?,`box19`= ?,`box20a`= ?,`box20b`= ? WHERE Id = ?";
      //var queryInsert = "call SaveW2(?,?,?,?,?,?,?,?,?,?);"

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
  });

  router.delete('/w2/:formId/:userId', (req, res, next) => {
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

