
var express 	= require('express');
const { body, validationResult } = require('express-validator');
var userModel 	= require.main.require('./models/adminModel');
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', [
	// username must not be empty
	body('uname').notEmpty().isLength({ min: 8 }),
	// password must be at least 8 chars long
	body('password').notEmpty().isLength({ min: 8 }).matches(
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
	  )
  ],function(req, res){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	  return res.status(400).json({ errors: errors.array() });
	}

	var user = {
		uname: req.body.uname,
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(status){
			req.session.username = user.uname;
			res.redirect('/admin');
		}else{
			res.send('invalid username/password');
		}
	});

});

module.exports = router;