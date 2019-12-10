const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Token',
  },
});


module.exports = mongoose.model('User', userSchema);

