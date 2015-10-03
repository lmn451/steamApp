var express = require('express');
var app = express();
var routes = require('./routes/index');
var http = require('http');
var path = require('path');
var users = require('./routes/users');
var routes1 = require('./routes/users');

app.use('/', routes);
app.use('/users', users );


app.set('port',3000);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');


http.createServer(app).listen(app.get('port'), function(){
  console.log('express server listening on port '+app.get('port'));
});


//middleware
/*app.use(function(req,res){
  switch (req.url) {
    case "/" : routes;
      break
   /!* case "/users" : users;
      break*!/
    default :
      res.end('page not fonud');
  }});*/
/*
app.use(function(req,res) {
  if (req.url == '/')
    res.end("time is money");
  else
    res.end("Page Not Found");
});
*/

/*// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

 app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
 });




module.exports = app;*/
