const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create().then(function(session) {
      var sessionId = session.insertId;
      return models.Sessions.get({ id: sessionId }).then(function(session) {
        req.session = session;
        req.session.hash = session.hash;
        res.cookies['shortlyid'] = {value: session.hash};
        next();
      });
    }).catch(function(err) {
      console.error(err);
    });
  } else {
    var hashId = req.cookies.shortlyid;
    return models.Sessions.get({ hash: hashId }).then(function(session) {
      req.session = session;
      req.session.hash = session.hash;
      res.cookies['shortlyid'] = {value: session.hash};
      next();
    }).catch(function(err) {
      console.error('nononono');
    });
    //  get cookie off request
    //  cookie will be hash from last session
    //  use cookie/hash to lookup in sessions table
    //  get userId and assign to sessions property on req
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

