var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('index',{messages: req.flash()});
});

module.exports = router;
