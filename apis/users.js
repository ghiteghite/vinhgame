var User = require('../models/user');
var ErrorMsg = require('../configs/errorMsg');
var ResContent = require('../lib/resContent');

var Users = {
  authenticate: function (req, res) {
    var user = req.body;

    req.assert('usernameOrEmail', ErrorMsg.user.usernameOrEmail.required).notEmpty();
    req.assert('password', ErrorMsg.user.password.required).notEmpty();
    req.assert('password', ErrorMsg.user.password.length).isLength({ min: 6, max: 255 });

    var errors = req.validationErrors();
    if (errors) {
      return res.status(500).json(
        ResContent(false, 'Validation failed', errors, null)
      );
    }

    User.authenticate(user.usernameOrEmail, user.password, function (error, data) {
      if (error) {
        return res.status(500).json(
          ResContent(false, 'Authentication failed', 'Username or password is incorrect', null)
        );
      }
      else {
        return res.json(
          ResContent(true, 'Successful authentication', null, data)
        );
      }
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
      return res.status(500).json(
        ResContent(false, 'Validation failed', errors, null)
      );
    }

    var newUser = new User(user);
    newUser.encryptPassword(user.password);
    newUser.save(function (error) {
      if (error) {
        return res.status(500).json(
          ResContent(false, 'Create user failed', error, null)
        );
      }
      return res.json(
        ResContent(true, 'User created successfully', null, null)
      );
    });
  },

  hihi: function (req, res) {
    res.json({ success: true });
  }
};

module.exports = Users;