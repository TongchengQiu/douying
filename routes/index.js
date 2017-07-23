'use strict';

var express = require('express');
var router = express.Router();

var superagent = require('superagent');
var cheerio = require('cheerio');

router.post('/getNowMovie', function(req, res) {
	var listData = [];
	superagent.get('http://movie.douban.com/nowplaying/xian/').end(function (err, _res) {
    var $ = cheerio.load(_res.text);
		$('#nowplaying .lists .list-item').each(function (idx, element) {
			listData[idx] = {};
		  var $element = $(element);
			var id= $element.attr('id');
			var title= $element.attr('data-title');
			var score= $element.attr('data-score');
			var picSrc = $element.find('img').attr('src');
			listData[idx].id = id;
			listData[idx].title = title;
			listData[idx].score = score;
			listData[idx].picSrc = picSrc;
		});
		res.json({listData: listData});
  });
});

router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
