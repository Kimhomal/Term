var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('index',{messages: req.flash()});
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

module.exports = router;
