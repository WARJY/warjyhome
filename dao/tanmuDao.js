var express = require('express');
var pools = require('../conf/db');
var exceptions = require('../util/exceptions');

var tanmuDao = {

	//查询
	search: function(pageNo, res) {
		var pageSize = 10;
		pool = pools.mysql();
		//连接数据库
		try {
			pool.getConnection(function(err, connection) {
				connection.query('select content from tanmu order by id limit ' + parseInt( parseInt( pageSize * (pageNo - 1)) + 1) + ',' + pageSize, function(err, rows, fields) {
					//sql异常
					if(err) {
						exceptions.sqlEX(err);
					};
					console.log(JSON.stringify(rows));
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

	//添加
	add: function(content, ip, timing ,res) {
		pool = pools.mysql();
		//连接数据库
		try {
			pool.getConnection(function(err, connection) {
				connection.query('insert into tanmu (content,ip,timing) value("' + content + '","' + ip + '","' + timing + ')', function(err, rows, fields) {
					//sql异常
					if(err) {
						exceptions.sqlEX(err);
					};
					if(rows == undefined){
						res.send(0);
					}else{
						res.send(JSON.stringify(rows));
					}
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

module.exports = tanmuDao;