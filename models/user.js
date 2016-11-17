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

userSchema.statics.isUserExists = function (usernameOrEmail, done) {
  User.findByUsernameOrEmail(usernameOrEmail, function (error, user) {
    return (!user || error) ? done(false) : done(true);
  });
};

userSchema.statics.authenticate = function (usernameOrEmail, password, done) {
  User.findByUsernameOrEmail(usernameOrEmail, function (error, user) {
    if (error) {
      return done('error', null);
    }
    if (user && user.checkPassword(password)) {
      delete user.saltPassword;
      delete user.hashPassword;
      return done(null, user);
    }
    else {
      return done('error', null);
    }
  });
};

userSchema.statics.findByUsernameOrEmail = function (usernameOrEmail, done) {
  var credentials = {
    $or: [
      { username: usernameOrEmail },
      { email: usernameOrEmail }
    ]
  };

  User.findOne(credentials, function (error, user) {
    done(error, user);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;