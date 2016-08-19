var mongoose = require('mongoose')

module.exports = mongoose.model('Contact', new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: Number
}))
