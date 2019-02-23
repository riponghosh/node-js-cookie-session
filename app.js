var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


var session;
app.use(sessions({
	secret:"aabbcc",
	resave:false,
	saveUninitialized:true
}))
app.get('/session', function(req, res, next) {
  res.send(req.session.id);
});

app.get('/cookies-req', function(req, res, next) {
  res.send(req.cookies);
});
app.get('/cookies-res', function(req, res, next) {
  res.send(res.cookie("mytest","mytestCookie"));
});

module.exports = app;
