var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  user: {type: Schema.Types.ObjectId, index: true, required: true},
  title: {type: String, required: true, trim: true},//설문지 제목
  descript: {type: String, required: true, trim: true},//설문지 내용
  numQuestion: {type: Number, default: 0},//설문지 질문 수
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {
    virtuals: true,
    transform: function(survey) {
      return {
        id: survey._id.toString(),
        title: survey.title,
        descript: survey.descript,
        numQuestion: survey.numQuestion
      };
    }
  },
  toObject: {virtuals: true}
});

var Survey = mongoose.model('Survey', schema);

module.exports = Survey;
