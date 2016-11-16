// Require modules
var
  express     = require('express'),
  bodyParser  = require('body-parser'),
  validator   = require('express-validator'),
  session     = require('express-session'),
  jwt         = require('jsonwebtoken'),
  mongoose    = require('mongoose');

// Require custom middlewares
var
  decryptData = require('./middleWare/decryptData'),
  encryptData = require('./middleWare/encryptData'),
  allowOrigin = require('./middleWare/allowOrigin');

// Require configs
var
  db            = require('./configs/db'),
  routes        = require('./configs/routes'),
  sessionConfig = require('./configs/session');


// Server configuration
var app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Session config
app.use(session({
  secret: sessionConfig.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: sessionConfig.maxAge
  }
}));

// Request validation
app.use(validator());

// Set static dir
app.use(express.static(__dirname + '/assets'));

// Decrypt request
app.use(decryptData);

// Encrypt response
app.use(encryptData);

// Allow origin
app.use(allowOrigin);

// Draw route
routes.draw(app);

// Connect to mongodb
mongoose.connect(db.mongo.uri);


app.listen(process.env.PORT || 3000);


// mongoose.connect('mongodb://admin:123456@127.0.0.1:27017/admin');
/* mongoose.connect('mongodb://ghiteze:Tanthe123@ds153677.mlab.com:53677/heroku_bxjd6pp5');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we\'re connected!');
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String
  },
  hashPassword: {
    type: String,
    required: true
  },
  saltPassword: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date
});

var User = mongoose.model('User', userSchema);*/

// create
/*var user = new User({
  username: 'hihi',
  email: 'hihi@gmail.com',
  hashPassword: '52442',
  saltPassword: '3424'
});

user.save(function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(user);
});
*/



// update
/*User.findOne({ username: 'hihi' }, function (err, user) {
  user.username = 'ahihi';
  user.save(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(user);
  });
});*/




// get one
/*User.findOne({ username: 'ghiteze' }, function (err, user) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(user);
});*/



// get all
/*User.find(function (err, users) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(users);
});*/



// delete
/*User.findOne({ username: 'ahihi' }, function (err, user) {
  if (err) {
    console.log(err);
    return;
  }

  User.remove({ _id: user._id }, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Deleted');
  })
});*/
