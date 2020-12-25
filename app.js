var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport=require('passport');
var authStrategy=require('./dependencies/authStrategy');
var mongoose=require('mongoose');
var authenticateRouter=require('./routes/authenticate');
var bodyParser=require('body-parser');
const applyDefaultConfigs=require('./default_configs/parentConfig');
var sessions=require('express-session');
var authenticator=require('./dependencies/authenticator');
var permissionsRouter=require('./routes/permissions');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticateRouter=require('./routes/authenticate');

var app = express();
//app.use(cookieParser('123'));
//app.use(sessions({secret:'123'}));
app.use(passport.initialize());
//app.use(passport.session());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/ithelpdesk', { useNewUrlParser: true },(err) => {
  if(err)console.log(err);
});

//populating db values on first run
applyDefaultConfigs();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/authenticate',authenticateRouter);

app.use(authenticator.verifyUser,function(req,res,next){
  console.log(req.user);
  next();
});
app.use('/permissions',permissionsRouter);
app.use('/users', usersRouter);

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
