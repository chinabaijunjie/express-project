var mongoose = require('../utils/database.js');
var User = mongoose.model('clients', {
  username: String,
  password: String,
})
module.exports = {
  register(username, password, cb) {
    var user = new User({
      username: username,
      password: password,
    });
    user.save(function(err) {
      cb(err)
    })
  },

  findUser(findParams, cb) {
    User.findOne(findParams).then((result) => {
      cb(result)
    }).catch(() => {
      cb("error");
    })
  }
}