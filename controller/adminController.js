var express 	= require('express');
const { body, validationResult } = require('express-validator');
var userModel 	= require.main.require('./models/adminModel'); 
var router 		= express.Router();

router.get('/', function(req, res){
	userModel.getAll(function(results){
		res.render('admin/index', { userList : results, uname: req.session.username});
	});
});


router.get('/create', function(req, res){
	res.render('admin/addemp');
});


router.post('/create', [
	// username must not be empty
	body('uname').notEmpty().isLength({ min: 8 }),
	// password must be at least 8 chars long
	body('password').notEmpty().isLength({ min: 8 }).matches(
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
	  ),
	body('confirmpassword').notEmpty().matches('password'),
	body('type').notEmpty(),  
	body('phone').notEmpty().isDecimal().isLength({ min: 11 }).isLength({ max: 11 }),  
	body('gender').notEmpty(),  
	body('designation').notEmpty(),  
  ], function(req, res){
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
	  return res.status(400).json({ errors: errors.array() });
	}
	
	var user ={
		uname 		: req.body.uname,
		password	: req.body.password,
		type		: req.body.type,
		phone		: req.body.phone,
		gender		: req.body.gender,
		designation	: req.body.designation
	}

	userModel.insert(user, function(status){
		if(status){
			res.redirect('/admin');
		}else{
			res.redirect('/admin/addemp');
		}
	});
});


router.get('/delete/:id', function(req, res){
	
	userModel.get(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
	
});

router.post('/delete/:id', function(req, res){

	userModel.delete(req.body.id, function(status){
		if(status){
			res.redirect('/home/view_users');
		}else{
			res.redirect('/home');
		}
	});
});





module.exports = router;