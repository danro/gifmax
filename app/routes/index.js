var request = require('request');
var cheerio = require('cheerio');

var title = 'GIFMAX: Maxgif, but lighter.';

function requestPath(id, callback) {
  // get image path from HTML
  request({ uri: 'http://maxgif.com/'+id }, function (error, response, body) {
    if (error) {
      callback();
    } else {
      var $ = cheerio.load(body);
      callback($('head').find('meta[property="og:image"]').attr('content'));
    }
  });
}

function requestToken(callback) {
  request({ uri: 'http://maxgif.com/r.json', json: true }, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    callback(body.token);
  });
}

exports.index = function(req, res){
  // load by specific id
  if (req.params.id) {
    requestToken(function (nextToken) {
      requestPath(req.params.id, function (path) {
        res.render('index', { title: title, img: path, token: '', link: nextToken });
      });
    });
  // or load random tokens
  } else {
    requestToken(function (thisToken) {
      requestToken(function (nextToken) {
        requestPath(thisToken, function (path) {
          res.render('index', { title: title, img: path, token: thisToken, link: nextToken});
        });
      });
    });
  }
};
