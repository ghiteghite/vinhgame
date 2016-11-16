var CryptoJS = require('../lib/aes');

var DecryptData = function (req, res, next) {

  var decrypted  = CryptoJS.AES.decrypt(req.body.data, req.body.timeStamp);
  var dataString = decrypted.toString(CryptoJS.enc.Utf8);
  req.body = JSON.parse(dataString);
  next();
};

module.exports = DecryptData;