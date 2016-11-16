var Users = require('../apis/users');

var Routes = function (app) {
  app.post('/authenticate', Users.authenticate);
  app.post('/register', Users.register);
  app.get('/hihi', Users.hihi)
};

module.exports.draw = Routes;