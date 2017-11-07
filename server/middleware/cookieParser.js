const models = require('../models');


const parseCookies = (req, res, next) => {
  req.cookies = {};

  if (req.headers.cookie) {
    
    if (req.headers.cookie.length < 60) {
      req.cookies[req.headers.cookie.substring(0, 9)] = req.headers.cookie.substring(10);
    } else {
      var split = req.headers.cookie.split(';');
      
      for (var i = 0; i < split.length; i++) {
        var index = split[i].indexOf('=');
        var key = split[i].substring(0, index);
        var val = split[i].substring(index + 1);
        if (key[0] === ' ') {
          key = key.substring(1);
        }
        req.cookies[key] = val;
      }
    }
  }
  
  next();
};

module.exports = parseCookies;