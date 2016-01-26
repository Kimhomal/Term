var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String, required: true, trim: true},
  chap: {type: String, required: true, trim: true},
  link: {type: String}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Toon = mongoose.model('Toon', schema);

module.exports = Toon;
