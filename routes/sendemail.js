var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('../routes/db_config');

var cors = require('cors')
//Control-Allow-Origin 
router.use(cors());

var nodemailer = require('nodemailer');

var email = require("emailjs");
var wEmail;
var EmailType;
var message;

	router.get('/SendingEmailForgotPass/', (req,res,next) =>{
		wEmail = req.params.email;

		var transporter = nodemailer.createTransport({
		  //host: 'server.pupilo.tax',
    	  //port: 25,
		  //auth: {
		    //user: 'info@pupilo.tax',
		    //pass: 'W3lcome.Blue@2018'
		  //}
		  service: 'gmail',
		 auth: {
		        user: 'pupilotaxapp@gmail.com',
		        pass: 'W3lcomepp'
		    }
		});

		var mailOptions = {
		  //from: 'info@pupilo.tax',
		  from: 'pupilotaxapp@gmail.com',
		  to: wEmail,
		  subject: 'Password Reset Notification',
		  html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /><title>Demystifying Email Design</title><meta name='viewport' content='width=device-width, initial-scale=1.0' /></head><body style='margin: 0; padding: 0;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='padding: 10px 0 30px 0;'><table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc; border-collapse: collapse;'><tr><td align='center' bgcolor='#70bbd9' style='padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;' height='108px' width='531px'><img src='http://www.pupilo.tax/wp-content/uploads/2018/01/logo_pag_web-1.png' alt='Creating Email Magic' style='display: block; width:100%; height:100%' /></td></tr><tr><td bgcolor='#ffffff' style='padding: 40px 30px 40px 30px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #153643; font-family: Arial, sans-serif; font-size: 24px;'><b>Link to Reset Password !</b></td></tr><tr><td style='padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;'><a href='http://accounts.pupilo.tax/#/forgotpassword/?target=" + wEmail + "' target='_blank'><p>Click here to reset your password</p></a></td></tr><tr><td>&nbsp;</td></tr></table></td></tr><tr><td bgcolor='#ee4c50' style='padding: 30px 30px 30px 30px; width: 531px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;' width='75%'>Pupilo Agency. Inc. | 206 South Broadway | Yonkers NY 10705<br /><a href='#' style='color: #ffffff;'><font color='#ffffff'>Unsubscribe</font></a> instantly</td><td align='right' width='25%'><table border='0' cellpadding='0' cellspacing='0'><tr><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://twitter.com/pupiloagency' target='_blank' style='color: #ffffff;'><img src='http://www.macarpentry.co.uk/wp-content/uploads/2016/09/twitter-logo-silhouette.png' alt='Twitter' width='38' height='38' style='display: block;' border='0' /></a></td>	<td style='font-size: 0; line-height: 0;' width='20'>&nbsp;</td><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://www.facebook.com/Pupilo.Tax' target='_blank' style='color: #ffffff;'><img src='https://md3.dnc.techtunes.com.bd/tDrive/tuner/itrifat/401500/facebook-512.png' alt='Facebook' width='38' height='38' style='display: block;' border='0' /></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>"
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    res.send(400, {success: false});
		  } else {
		    res.send(200, {success:true});
		  }
		});

		// message = {
		//    text:	"Email to reset password", 
		//    from:	"info@pupilo.tax", 
		//    to:		wEmail,
		//    subject:	"Password Reset Notification",
		//    attachment: 
		//    [
		//       {data:"<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /><title>Demystifying Email Design</title><meta name='viewport' content='width=device-width, initial-scale=1.0' /></head><body style='margin: 0; padding: 0;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='padding: 10px 0 30px 0;'><table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc; border-collapse: collapse;'><tr><td align='center' bgcolor='#70bbd9' style='padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;' height='108px' width='531px'><img src='http://www.pupilo.tax/wp-content/uploads/2018/01/logo_pag_web-1.png' alt='Creating Email Magic' style='display: block; width:100%; height:100%' /></td></tr><tr><td bgcolor='#ffffff' style='padding: 40px 30px 40px 30px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #153643; font-family: Arial, sans-serif; font-size: 24px;'><b>Link to Reset Password !</b></td></tr><tr><td style='padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;'><a href='http://accounts.pupilo.tax/#/forgotpassword/?target=" + wEmail + "' target='_blank'><p>Click here to reset your password</p></a></td></tr><tr><td>&nbsp;</td></tr></table></td></tr><tr><td bgcolor='#ee4c50' style='padding: 30px 30px 30px 30px; width: 531px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;' width='75%'>Pupilo Agency. Inc. | 206 South Broadway | Yonkers NY 10705<br /><a href='#' style='color: #ffffff;'><font color='#ffffff'>Unsubscribe</font></a> instantly</td><td align='right' width='25%'><table border='0' cellpadding='0' cellspacing='0'><tr><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://twitter.com/pupiloagency' target='_blank' style='color: #ffffff;'><img src='http://www.macarpentry.co.uk/wp-content/uploads/2016/09/twitter-logo-silhouette.png' alt='Twitter' width='38' height='38' style='display: block;' border='0' /></a></td>	<td style='font-size: 0; line-height: 0;' width='20'>&nbsp;</td><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://www.facebook.com/Pupilo.Tax' target='_blank' style='color: #ffffff;'><img src='https://md3.dnc.techtunes.com.bd/tDrive/tuner/itrifat/401500/facebook-512.png' alt='Facebook' width='38' height='38' style='display: block;' border='0' /></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>", alternative:true}
		//       // ,
		//       // {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
		//    ]
		// };
		// var xserver = email.server.connect({
		// 	user:	"info@pupilo.tax", 
		// 	password:"W3lcome.Blue@2018", 
		// 	host:	"mail.pupilo.tax"
		// });
	
		// xserver.send(message, function(err, message) {
		// 	if (err == null){
		// 		res.send(200, {success:true});
		// 	}else{
		// 		console.log(err);
		// 		res.send(500, {success: false});
		// 	}
		//  });

	});

	router.post('/SendingEmailConfirmation/:email', (req,res,next) =>{
		wEmail = req.params.email;

		var transporter = nodemailer.createTransport({
		  //host: 'server.pupilo.tax',
    	  //port: 25,
		  //auth: {
		    //user: 'info@pupilo.tax',
		    //pass: 'W3lcome.Blue@2018'
		  //}
		  service: 'gmail',
		 auth: {
		        user: 'pupilotaxapp@gmail.com',
		        pass: 'W3lcomepp'
		    }
		});

		var mailOptions = {
		  //from: 'info@pupilo.tax',
		  from: 'pupilotaxapp@gmail.com',
		  to: wEmail,
		  subject: 'Email Confirmation',
		  html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /><title>Demystifying Email Design</title><meta name='viewport' content='width=device-width, initial-scale=1.0' /></head><body style='margin: 0; padding: 0;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='padding: 10px 0 30px 0;'><table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc; border-collapse: collapse;'><tr><td align='center' bgcolor='#70bbd9' style='padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;' height='108px' width='531px'><img src='http://www.pupilo.tax/wp-content/uploads/2018/01/logo_pag_web-1.png' alt='Creating Email Magic' style='display: block; width:100%; height:100%' /></td></tr><tr><td bgcolor='#ffffff' style='padding: 40px 30px 40px 30px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #153643; font-family: Arial, sans-serif; font-size: 24px;'><b>Link to Confirm E-Mail !</b></td></tr><tr><td style='padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;'><a href='http://accounts.pupilo.tax/#/emailconfirmation/?target=" + wEmail + "?toconfirm=true' target='_blank'><p>Click here to confirm your e-mail</p></a></td></tr><tr><td>&nbsp;</td></tr></table></td></tr><tr><td bgcolor='#ee4c50' style='padding: 30px 30px 30px 30px; width: 531px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;' width='75%'>Pupilo Agency. Inc. | 206 South Broadway | Yonkers NY 10705<br /><a href='#' style='color: #ffffff;'><font color='#ffffff'>Unsubscribe</font></a> instantly</td><td align='right' width='25%'><table border='0' cellpadding='0' cellspacing='0'><tr><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://twitter.com/pupiloagency' target='_blank' style='color: #ffffff;'><img src='http://www.macarpentry.co.uk/wp-content/uploads/2016/09/twitter-logo-silhouette.png' alt='Twitter' width='38' height='38' style='display: block;' border='0' /></a></td>	<td style='font-size: 0; line-height: 0;' width='20'>&nbsp;</td><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://www.facebook.com/Pupilo.Tax' target='_blank' style='color: #ffffff;'><img src='https://md3.dnc.techtunes.com.bd/tDrive/tuner/itrifat/401500/facebook-512.png' alt='Facebook' width='38' height='38' style='display: block;' border='0' /></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>"
		  //text: 'That was easy!'
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    res.send(400, {success: false});
		  } else {
		    res.send(200, {success:true});
		  }
		});

		// var xserver 	= email.server.connect({
		// 	user:	"info@pupilo.tax", 
		// 	password:"W3lcome.Blue@2018", 
		// 	host:	"server.pupilo.tax"
		// });

		// xserver.send({
		//    text:    "i hope this works", 
		//    from:    "info@pupilo.tax", 
		//    to:      wEmail,
		//    subject: "testing emailjs"
		// }, function(err, message) { 
		// 	if (err == null){
		// 		res.send(200, {success:true});
		// 	}else{
		// 		console.log(err);
		// 		res.send(400, {success: false});
		// 	}
		// });


		// message	= {
		//    text:	"Email to confirmation", 
		//    from:	"info@pupilo.tax", 
		//    to:		wEmail,
		//    subject:	"Email Confirmation",
		//    attachment: 
		//    [
		//       {data:"<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /><title>Demystifying Email Design</title><meta name='viewport' content='width=device-width, initial-scale=1.0' /></head><body style='margin: 0; padding: 0;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='padding: 10px 0 30px 0;'><table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border: 1px solid #cccccc; border-collapse: collapse;'><tr><td align='center' bgcolor='#70bbd9' style='padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;' height='108px' width='531px'><img src='http://www.pupilo.tax/wp-content/uploads/2018/01/logo_pag_web-1.png' alt='Creating Email Magic' style='display: block; width:100%; height:100%' /></td></tr><tr><td bgcolor='#ffffff' style='padding: 40px 30px 40px 30px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #153643; font-family: Arial, sans-serif; font-size: 24px;'><b>Link to Confirm E-Mail !</b></td></tr><tr><td style='padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;'><a href='http://accounts.pupilo.tax/#/emailconfirmation/?target=" + wEmail + "?toconfirm=true' target='_blank'><p>Click here to confirm your e-mail</p></a></td></tr><tr><td>&nbsp;</td></tr></table></td></tr><tr><td bgcolor='#ee4c50' style='padding: 30px 30px 30px 30px; width: 531px;'><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td style='color: #ffffff; font-family: Arial, sans-serif; font-size: 14px;' width='75%'>Pupilo Agency. Inc. | 206 South Broadway | Yonkers NY 10705<br /><a href='#' style='color: #ffffff;'><font color='#ffffff'>Unsubscribe</font></a> instantly</td><td align='right' width='25%'><table border='0' cellpadding='0' cellspacing='0'><tr><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://twitter.com/pupiloagency' target='_blank' style='color: #ffffff;'><img src='http://www.macarpentry.co.uk/wp-content/uploads/2016/09/twitter-logo-silhouette.png' alt='Twitter' width='38' height='38' style='display: block;' border='0' /></a></td>	<td style='font-size: 0; line-height: 0;' width='20'>&nbsp;</td><td style='font-family: Arial, sans-serif; font-size: 12px; font-weight: bold;'><a href='https://www.facebook.com/Pupilo.Tax' target='_blank' style='color: #ffffff;'><img src='https://md3.dnc.techtunes.com.bd/tDrive/tuner/itrifat/401500/facebook-512.png' alt='Facebook' width='38' height='38' style='display: block;' border='0' /></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>", alternative:true}
		//       // ,
		//       // {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
		//    ]
		// };

		
		// xserver.send(message, function(err, message) {
		// 	if (err == null){
		// 		res.send(200, {success:true});
		// 	}else{
		// 		console.log(err);
		// 		res.send(400, {success: false});
		// 	}
		//  });

	});

	module.exports = router;