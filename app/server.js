/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , stylus = require('stylus')
  , jade = require('jade')
  , nib = require('nib')
  , request = require('request')
;

// helpers
var basePath = path.resolve(__dirname, '../')
  , root = function (p) { return path.join(basePath, p); }
  , pkjs = JSON.parse(fs.readFileSync(root('package.json')))
;

var app = express();

// import nib into .styl compiles
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib())
    .import('nib');
}

// import nib into jade:stylus filter
jade.filters.stylus = function (str, options){
  var ret;
  str = str.replace(/\\n/g, '\n');
  stylus(str, options)
    .set('compress', true)
    .use(nib())
    .import('nib')
    .render(function(err, css){
      if (err) throw err;
      ret = css.replace(/\n/g, '\\n');
  });
  return '<style type="text/css">' + ret + '</style>';
};

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', basePath + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(basePath + '/public/images/favicon.gif'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);
  app.use(stylus.middleware({ src: basePath + '/public' , compile: compile }));
  app.use(express.static(path.join(basePath, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/:id?', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
