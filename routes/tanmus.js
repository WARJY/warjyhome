var express = require('express');
var router = express.Router();
var tanmus = require('../dao/tanmuDao');
var sd = require('silly-datetime');

router.get('/get.do', function(req, res) {
	var pageNo = req.query.pageNo;
	console.log(pageNo);
	tanmus.search(pageNo, res);
});

router.get('/insert.do', function(req, res) {
	var content = req.query.content;
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress;
	var timing = sd.format(new Date(), 'YYYY-MM-DD HH:mm');;
	tanmus.add(content, ip, timing, res);
});

module.exports = router;