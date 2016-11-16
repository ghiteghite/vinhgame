var CryptoJS = require('../lib/aes');

var ResContent = function (success, message, errors, data) {
  var timeStamp = new Date().toLocaleString();
  var dataEncrypted = data;

  if (data) {
    var dataString = JSON.stringify(data);
    var encrypted  = CryptoJS.AES.encrypt(dataString, timeStamp);
    dataEncrypted = encrypted.toString();
  }

  return {
    success: success,
    message: message,
    errors: errors,
    data: data,
    timeStamp: timeStamp
  }
};

module.exports = ResContent;