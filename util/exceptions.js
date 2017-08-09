var exceptions = {
	//数据库连接异常
	dbEX:function(e){
		console.log("数据库连接异常");
	},
	//sql异常
	sqlEX:function(e){
		console.log("sql异常");
	}
}

module.exports = exceptions;
