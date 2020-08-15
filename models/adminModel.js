var db = require('./db');

module.exports ={

	get: function(user, callback){
		var sql = "select * from admin where empid=?";
		db.getResults(sql, [user.userid], function(result){
			if(result.length > 0){
				console.log(result);
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAll: function(callback){
		var sql = "select * from admin";
		db.getResults(sql, null,  function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	validate: function(user, callback){
		var sql = "select * from admin where username=? and password=?";
		db.getResults(sql, [user.uname, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	insert: function(user, callback){
		var sql = "INSERT INTO `admin`(`username`, `password`, `type`, `phone`, `gender`, `designation`) VALUES (?,?,?,?,?,?)";

		db.execute(sql, [user.uname, user.password, user.type, user.phone, user.gender, user.designation], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update: function(user, callback){
		var sql = "update admin set username=?, password=?, phone=?, gender=?, designation=? where empid=?";
		db.execute(sql, [user.username, user.password, user.phone, user.gender, user.designation, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql = "delete from user where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}