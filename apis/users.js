var User = require('../models/user');
var ErrorMsg = require('../configs/errorMsg');
var CryptoJS = require('../lib/aes');

var Users = {
  authenticate: function (req, res) {
    var user = req.body;

    User.isUserExists(user.usernameOrEmail, function (isExists) {
      if (isExists) {
        req.assert('usernameOrEmail', ErrorMsg.user.usernameOrEmail.exists).isExists();
      }
      else {
        req.assert('usernameOrEmail', ErrorMsg.user.usernameOrEmail.required).notEmpty();
        req.assert('password', ErrorMsg.user.password.required).notEmpty();
        req.assert('password', ErrorMsg.user.password.length).isLength({ min: 6, max: 255 });
      }
      var errors = req.validationErrors();
      if (errors) {
        return res.status(500).json({ success: false, message: 'Validation failed', errors: errors });
      }

      User.authenticate(user.usernameOrEmail, user.password, function (data) {
        res.json(data);
      });
    });
  },

  register: function (req, res) {
    var user = req.body;

    req.assert('username', ErrorMsg.user.username.required).notEmpty();
    req.assert('email', ErrorMsg.user.email.required).notEmpty();
    req.assert('email', ErrorMsg.user.email.invalid).isEmail();
    req.assert('password', ErrorMsg.user.password.required).notEmpty();
    req.assert('password', ErrorMsg.user.password.length).isLength({ min: 6, max: 255 });
    req.assert('password', ErrorMsg.user.password.confirm).equals(user.passwordConfirm);

    var errors = req.validationErrors();
    if (errors) {
      return res.status(500).json({ success: false, message: 'Validation failed', errors: errors });
    }

    var newUser = new User(user);
    newUser.encryptPassword(user.password);
    newUser.save(function (error) {
      if (error) {
        return res.status(500).json({ success: false, message: 'User save failed', error: error });
      }
      res.json({ success: true, message: 'User created' });
    });
  },

  hihi: function (req, res) {
    res.json({ success: true });
  }
};

module.exports = Users;