var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');
var cors = require('cors');
var config = require('./config/main');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('./models/user');
var Question = require('./models/question');
var Category = require('./models/category');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect(config.database);
autoIncrement.initialize(connection);
 
// routes
var index = require('./routes/index');
var authenticate = require('./routes/authenticate')(passport);
var ques = require('./routes/question');
var cat = require('./routes/category');
var subcat = require('./routes/subcategory');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// initialize passport for user
app.use(passport.initialize());
app.use(cors());
// connect to db
var connection = mongoose.connect(config.database);
autoIncrement.initialize(connection);

// Bring in passport strategy we just defined
require('./config/passport')(passport);

app.use('/', index);
app.use('/auth', authenticate);
app.use('/question', ques);
app.use('/category', cat);
app.use('/subcategory', subcat);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
