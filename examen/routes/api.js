var express = require('express');
var router = express.Router();
var data  = require('../data/dataprovider.js')

router.get('/', function(req, res, next) {
  var users = data.findAll()
  res.json(users);
});

module.exports = router;
