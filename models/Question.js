var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  survey: {type: Schema.Types.ObjectId, required: true, trim: true}, //해당 설문지
  content: {type: String, required: true, trim: true}, //질문내용
  numOptions: {type: Number, default: 0}//옵션 수
}, {
  toJSON: {
    virtuals: true,
    transform: function(question) {
      return {
        id: question._id.toString(),
        content: question.content,
        numOptions: question.numOptions
      };
    }
  },
  toObject: {virtuals: true}
});

var Question = mongoose.model('Question', schema);

module.exports = Question;
