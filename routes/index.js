var express = require('express');
var router = express.Router();
var steamApi = require('../core/steamapi');

/* GET home page. */
router.get('/', function(req, res, next) {



  steamApi.GetRecentlyPlayedGames(function (data) {

    res.render('index', {title: 'Express', data: data});
  });

});

module.exports = router;


