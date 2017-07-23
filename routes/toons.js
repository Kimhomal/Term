var express = require('express'),
    Toon = require('../models/Toon');
var router = express.Router();

router.get('/', function(req, res, next){
  Toon.find({}, function(err, toons) {
    if(err){
      return next(err);
    }
    res.render('toons', {toons: toons});
  });
});

router.get('/new', function(req, res, next){
  res.render('toons/new', {messages: req.flash()});
});

router.post('/', function(req, res, next){
  Toon.findOne({name: req.body.name, chap: req.body.chap}, function(err, toon){
    if(err){
      return next(err);
    }
    if(toon){
      req.flash('danger', '동일한 링크가 이미 존재합니다.');
      return res.redirect('back');
    }
    var newToon = new Toon({
      name: req.body.name,
      chap: req.body.chap,
      link: req.body.link
    });
    newToon.save(function(err){
      if(err){
        next(err);
      }else{
        req.flash('success', '링크 추가 완료되었습니다');
        res.redirect('toons');
      }
    });
  });
});

router.delete('/:name', function(req, res, next) {
  Toon.findOneAndRemove({name: req.params.name}, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', '링크가 삭제되었습니다.');
    res.redirect('/toons');
  });
});

module.exports = router;
