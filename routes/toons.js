var express = require('express');
var router = express.Router();

router.get('/', function(rea, res, next){
  res.render('toons');
});

module.exports = router;
