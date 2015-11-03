var express = require('express');
var router = express.Router();

var superagent = require('superagent');
var cheerio = require('cheerio');

router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'douYing'
	});
});

router.post('/search', function (req, res) {
	var listData = [];
	var cont = req.body.cont;
	var searchUrl = "http://movie.douban.com/subject_search?search_text=" + cont;
	superagent.get(searchUrl).end(function (err, _res) {
		var $ = cheerio.load(_res.text);
		$('#content .item').each(function (idx, element) {
			listData[idx] = {};
			var $element = $(element);
			var id= $element.find('.nbg').attr('href').split("/")[4];
			var title= $element.find('img').attr('alt');
			var score= $element.find('.rating_nums').text();
			var picSrc = $element.find('img').attr('src');
			listData[idx].id = id;
			listData[idx].title = title;
			listData[idx].score = score;
			listData[idx].picSrc = picSrc;
		});
		if(listData.length === 0) {
			res.json({status: 1});
		}
		res.json({status: 0,listData: listData});
	});
});

router.post('/getNowMovie', function(req, res) {
	var listData = [];
	superagent.get("http://movie.douban.com/nowplaying/xian/").end(function (err, _res) {
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

router.post('/detail', function (req, res) {
	var data = {};
	var id = req.body.id;
	var detailUrl = "http://movie.douban.com/subject/" + id + "/";
	superagent.get(detailUrl).end(function (err, _res) {
		var $ = cheerio.load(_res.text);
		data.mainpic = $("#mainpic img").attr('src');
		data.name = $("#content").find('span[property="v:itemreviewed"]').text();
		data.director = $("#content").find('#info span:nth-child(1) .attrs').text();
		data.editor = $("#content").find('#info span:nth-child(3) .attrs').text();
		data.actor = $("#content").find('#info .actor .attrs').text();
		data.genre = $("#content").find('span[property="v:genre"]').text();
		data.date = $("#content").find('span[property="v:initialReleaseDate"]').text();
		data.runtime = $("#content").find('span[property="v:runtime"]').text();
		data.score = $("#interest_sectl").find('strong[property="v:average"]').text();
		data.report = $("#link-report").find('span[property="v:summary"]').text();
		data.picGroup = [];
		$('#related-pic .related-pic-bd img').each(function (idx, element) {
		    var $element = $(element);
			data.picGroup[idx]= $element.attr('src');

		});
		res.json({status: 0,data: data});
	});

});

module.exports = router;
