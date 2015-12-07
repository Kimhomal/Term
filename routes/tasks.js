var express = require('express'),
    User = require('../models/User'),
    Survey = require('../models/Survey'),
    Question = require('../models/Question'),
    Options = require('../models/Options');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({message: 'Not authorized'});
  }
}

router.get('/', needAuth, function(req, res, next) {
  Survey.find({user: req.user.id}, function(err, survey) {
    if (err) {
      return res.status(500).json({message: 'internal error', desc: err});
    }
    Question.find({survey: survey.id}, function(err, question) {
      if (err) {
        return next(err);
      }
      Options.find({question: question.id}, function(err, options) {
        if (err) {
          return next(err);
        }
        res.json(options);
      });
    });
  });
});

module.exports = router;
