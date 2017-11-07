const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (!req.cookie) {
    models.Sessions.create().then(function(session) {
      var sessionId = session.insertId;
      models.Sessions.get({ id: sessionId }).then(function(session) {
        req.session = session;
        req.session.hash = session.hash;
        res.cookies['shortlyid'] = {value: session.hash};
        next();
      });
    }).catch(function(err) {
      console.error(err);
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

