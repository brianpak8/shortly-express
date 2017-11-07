const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(req.cookies.shortlyId)
  .then(function(hash) {
    if (!hash) {
      throw hash;
    } else {
      return models.Sessions.get({ hash });
    }
  })
  .tap(function(session) {
    if (!session) {
      throw session;
    }
  })
  .catch(function() {
    return models.Sessions.create()
      .then(function(results) {
        return models.Sessions.get({id: results.insertId});
      })
      .tap(function(session) {
        res.cookie('shortlyid', session.hash);
      });
  })
  .then(function(session) {
    req.session = session;
    next();
  });
};
  // if (Object.keys(req.cookies).length === 0) {
  //   models.Sessions.create().then(function(session) {
  //     var sessionId = session.insertId;
  //     return models.Sessions.get({ id: sessionId }).then(function(session) {
  //       req.session = session;
  //       req.session.hash = session.hash;
  //       res.cookies['shortlyid'] = {value: session.hash};
  //       next();
  //     });
  //   }).catch(function(err) {
  //     console.error(err);
  //   });
  // } else {
  //   var hashId = req.cookies.shortlyid;
  //   return models.Sessions.get({ hash: hashId }).then(function(session) {
  //     req.session = session;
  //     req.session.hash = session.hash;
  //     res.cookies['shortlyid'] = {value: session.hash};
  //     next();
  //   }).catch(function(err) {
  //     console.error('nononono');
  //     res.end()
  //   });
  //   //  get cookie off request
  //   //  cookie will be hash from last session
  //   //  use cookie/hash to lookup in sessions table
  //   //  get userId and assign to sessions property on req
  // }
  //};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

