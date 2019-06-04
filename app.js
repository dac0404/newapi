var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var childcareRouter = require('./routes/childcare');
var form1095aRouter = require('./routes/form1095a');
var form1099mRouter = require('./routes/form1099m');
var form1099rRouter = require('./routes/form1099r');
var form8863Router = require('./routes/form8863');
var formdependentRouter = require('./routes/formdependent');
var forminfoRouter = require('./routes/forminfo');
var formschaRouter = require('./routes/formscha');
var formschlRouter = require('./routes/formschl');
var formspouseRouter = require('./routes/formspouse');
var formw2gRouter = require('./routes/formw2g');
var personalProfileRouter = require('./routes/personalProfile');
var schbRouter = require('./routes/schb');
var schcRouter = require('./routes/schc');
var sendemailRouter = require('./routes/sendemail');
var studentloanRouter = require('./routes/studentloan');
var unemploymentRouter = require('./routes/unemployment');
var userRouter = require('./routes/user');
var formw2Router = require('./routes/formw2');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', childcareRouter);
app.use('/', form1095aRouter);
app.use('/', form1099mRouter);
app.use('/', form1099rRouter);
app.use('/', form8863Router);
app.use('/', formdependentRouter);
app.use('/', forminfoRouter);
app.use('/', formschaRouter);
app.use('/', formschlRouter);
app.use('/', formspouseRouter);
app.use('/', formw2gRouter);
app.use('/', personalProfileRouter);
app.use('/', schbRouter);
app.use('/', schcRouter);
app.use('/', sendemailRouter);
app.use('/', studentloanRouter);
app.use('/', unemploymentRouter);
app.use('/', userRouter);
app.use('/', formw2Router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
