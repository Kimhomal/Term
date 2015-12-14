var express = require('express'),
    User = require('../models/User'),
    Survey = require('../models/Survey'),
    Question = require('../models/Question'),
    Options = require('../models/Options');
var router = express.Router();

function needAuth(req, res, next){
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다!');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  res.render('surveys');
});

router.post('/', needAuth, function(req, res, next) {
  if(!req.body.title) {
    req.flash('danger', '설문지 제목을 입력하세요!');
    res.redirect('back');
  }
  var survey = new Survey();
  res.redirect('surveys');
});
module.exports = router;
