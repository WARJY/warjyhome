var express = require('express');
var router = express.Router();
var staticDao = require('../dao/staticDao');

router.get('/img.do', function(req, res) {
	var id = req.query.id;
	var dpr = req.query.dpr;
	staticDao.img.getImg(id,dpr,res);
});

router.get('/imgs.do', function(req, res) {
	var pageNo = req.query.pageNo;
	var pageSize = 6;
	staticDao.img.getImgs(pageNo,pageSize,res);
});

router.get('/videos.do', function(req, res){
	var pageNo = req.query.pageNo;
	var pageSize = 6;
	staticDao.video.getVideos(pageNo,pageSize,res);
});

module.exports = router;