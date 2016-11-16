var Db = {
  mongo: {
    uri: process.env.MONGODB_URI || 'mongodb://heroku_bxjd6pp5:uis2547a0l0uuvgukqsh3e5hvp@ds153677.mlab.com:53677/heroku_bxjd6pp5'
  }
};

module.exports = Db;