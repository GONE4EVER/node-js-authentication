const mongoose = require('mongoose');


const tokenSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId(),
    required: true,
  },
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

