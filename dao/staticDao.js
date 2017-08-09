var express = require('express');
var pools = require('../conf/db');
var exceptions = require('../util/exceptions');

var staticDao = {
	img: {
		getImg: function(id, dpr, res) {
			pool = pools.mysql();
			//连接数据库
			try {
				pool.getConnection(function(err, connection) {
					connection.query('select id,title,src' + dpr + ' as src,remarks from img where id=' + id, function(err, rows, fields) {
						//sql异常
						if(err) {
							exceptions.sqlEX(err);
						};
						res.send(JSON.stringify(rows));
						connection.release();
					});
				});
			} catch(e) {
				//数据库连接异常
				console.log("数据库连接异常");
				exceptions.dbEX(e);
				return;
			}
		},
		getImgs: function(pageNo, pageSize, res) {
			pool = pools.mysql();
			//连接数据库
			try {
				pool.getConnection(function(err, connection) {
					connection.query('select id,title,srcx1 as src,remarks from img limit ' + (pageNo - 1) * pageSize + ',' + pageSize, function(err, rows, fields) {
						//sql异常
						if(err) {
							exceptions.sqlEX(err);
						};
						res.send(JSON.stringify(rows));
						connection.release();
					});
				});
			} catch(e) {
				//数据库连接异常
				console.log("数据库连接异常");
				exceptions.dbEX(e);
				return;
			}
		}
	},
	video: {
		getVideos: function(pageNo, pageSize, res) {
			pool = pools.mysql();
			//连接数据库
			try {
				pool.getConnection(function(err, connection) {
					connection.query('select * from video limit ' + (pageNo - 1) * pageSize + ',' + pageSize, function(err, rows, fields) {
						//sql异常
						if(err) {
							exceptions.sqlEX(err);
						};
						res.send(JSON.stringify(rows));
						connection.release();
					});
				});
			} catch(e) {
				//数据库连接异常
				console.log("数据库连接异常");
				exceptions.dbEX(e);
				return;
			}
		}
	}
}

module.exports = staticDao;