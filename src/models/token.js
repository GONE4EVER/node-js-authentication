const mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
  access: {
    type: String,
    required: true,
  },
  refresh: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Token', tokenSchema);

