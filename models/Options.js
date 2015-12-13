var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  question: {type: Schema.Types.ObjectId, required: true, trim: true}, //해당 질문
  content: {type: String, required: true, trim: true}, //옵션 내용
  number: {type: Number, required: true, trim: true}
}, {
  toJSON: {
    virtuals: true,
    transform: function(options) {
      return {
        id: options._id.toString(),
        content: options.content
      };
    }
  },
  toObject: {virtuals: true}
});

var Options = mongoose.model('Options', schema);

module.exports = Options;
