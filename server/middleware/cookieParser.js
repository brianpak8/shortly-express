const models = require('../models');

const parseCookies = (req, res, next) => {
  //console.log('tttttttttttttttttttttttt', req);
  // console.log('--------------------->', typeof(req.headers));
  //console.log('--------------->', JSON.stringify(req._setCookiesVariable));
  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!', res);
  // console.log(JSON.stringify('?????????????????????????????', req.cookie));
  var cookie = req.headers.cookie;
  //console.log('THIS IS THE COOKIE', models.Sessions.create());
  if (cookie === undefined) {
    res.cookies = {};
    // models.Sessions.create().then(function(createdSession) {
    //   console.log('---------->', createdSession);
    //   models.Session.get({id: createdSession.insertId}).then(function(session) {
    //     console.log('8888888888888888888888888888', session);
    //     res.cookie = session.hash;
    //   });
    //   //res.writeHead(statusCode, {createdSession});
    // });
    //  create a new session
    //  store session in session table
    //  use the hash to assign a new cookie in the response headers
  } else {
    console.log(res);
    var cook = cookie.split(';');
    console.log('------------>', cook);
    //cook = cook.join(' ').split('=');
    console.log('VINOOOOOOOOOOOOOOOOOOOj', cook);
    for (let i = 0; i < cook.length; i++) {
      var name = cook[i].indexOf('=');
      var key = cook[i].substring(0, name);
      var val = cook[i].substring(name + 1);
    }
    if (key[0] === ' ') {
      key = key.substring(1);
    }
    req.cookies[key] = val;

    // cook.forEach((each, index) => {
    //   if (index % 2 !== 0) {
    //     req.cookies[cook[index - 1]] = cook[index];
    //   }
    // });
    // var cookieName = cook[0];
    // req.cookies[cookieName] = cook[1];
    console.log(req);
  }
  //  cookie = JSON.parse(cookie);
  
  // if (req.headers.cookies === {}) {
    
  // }
  // console.log(req.headers.cookies);
  next();
};

module.exports = parseCookies;