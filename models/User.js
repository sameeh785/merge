const moongose = require('mongoose')
const UserSchema = moongose.Schema({
  name: {
    type: String,
    required: true


  },
  email: {
    type: String,
    required: true




  },
  password: {
    type: String,
    required: true



  },
  avatar: {
    type: String

  },
  date: {
    type: Date,
    default: Date.now

  }
});





module.exports = User = moongose.model('users', UserSchema);
