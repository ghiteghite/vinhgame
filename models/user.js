var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String
  },
  hashPassword: {
    type: String
  },
  saltPassword: {
    type: String
  },
  avatar: {
    type: String,
    default: 'images/noAvatar.jpg'
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

userSchema.methods.encryptPassword = function (password) {
  this.saltPassword = bcrypt.genSaltSync(8);
  this.hashPassword = bcrypt.hashSync(password, this.saltPassword);
};

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

userSchema.statics.isUserExists = function (usernameOrEmail, callback) {
  User.findOne({ username: usernameOrEmail, email: usernameOrEmail }, function (error, user) {
    user ? callback(true) : callback(false);
  });
};

userSchema.methods.authenticate = function (usernameOrEmail, password, done) {
  User.findOne({ username: usernameOrEmail, email: usernameOrEmail }, function (error, user) {
    if (error) {
      // username or email does not exists
    }

    var isExists = user.checkPassword(password);
    if (isExists) {
      // set token
      // res
    }
    else {
      // password does not exists
    }
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;