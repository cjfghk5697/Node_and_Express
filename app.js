var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var mongoDB="mongodb+srv://han:5697ys1253@cluster0.zitgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});
var db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//series는 전부다 해야 끝남, waterfall은 하나하나 하는데 하나 끝나면 결과값 주고 다음으로 넘어감
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog',catalogRouter);
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
