var mysql = require('mysql');

module.exports = {
	mysql: function() {
		var pool = mysql.createPool({
			host: 'localhost',
			user: 'root',
			password: 'root',
			database: 'warjyhome',
			port: 3306
		});
		return pool;
	}
};