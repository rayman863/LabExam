var express 	= require('express');
const { body, validationResult } = require('express-validator');
var userModel 	= require.main.require('./models/adminModel'); 
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('admin/index');
});

router.get('/AllEmployeeList', function(req, res){
	userModel.getAll(function(results){
		res.render('admin/emplist', { userList : results, uname: req.session.username});
	});
});

router.get('/AddEmployee', function(req, res){
	res.render('admin/addemp');
});

router.post('/AddEmployee', [
	// username must not be empty
	body('uname').notEmpty().isLength({ min: 8 }),
	// password must be at least 8 chars long
	body('password').notEmpty().isLength({ min: 8 }).matches(
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
	  ),
	body('confirmpassword').notEmpty(),//.matches('password'),
	body('type').notEmpty(),  
	body('phone').notEmpty().isDecimal().isLength({ min: 11 }).isLength({ max: 11 }),  
	body('gender').notEmpty(),  
	body('designation').notEmpty() 
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


router.get('/Update/:id',function(req,res)
{
    user={
        userid: req.params.id
    }
    userModel.get(user,function(result)
    {
		// console.log(result);
        res.render('admin/updateemp', {
			username: result.username,
    		password: result.password,
    		type: result.type,
    		phone: result.phone,
    		gender: result.gender,
    		designation: result.designation
		});
    });
});

router.post('/Update/:id',[
	// username must not be empty
	body('uname').notEmpty(),
	// password must be at least 8 chars long
	body('password').notEmpty().isLength({ min: 8 }).matches(
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
	  ),
	body('confirmpassword').notEmpty(),//.matches('password'),
	body('type').notEmpty(),  
	body('phone').notEmpty().isDecimal().isLength({ min: 11 }).isLength({ max: 11 }),  
	body('gender').notEmpty(),  
	body('designation').notEmpty()  
  	], function(req,res)
	{
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
    var user=
    {
		username: req.body.uname,
        password: req.body.password,
        gender: req.body.gender,
        phone: req.body.phone,
		designation: req.body.designation,
		id: req.params.id
    }
    userModel.update(user,function(result)
    {
        res.redirect('admin/AllEmployeeList');
    })
})


router.get('/Delete/:id', function(req, res){
	user={
        userid: req.params.id
    }
	userModel.get(user, function(result){
		res.render('admin/deleteemp', {user: result});
	});
	
});

router.post('/Delete/:id', function(req, res){

	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin');
		}else{
			res.redirect('/admin/AllEmployeeList');
		}
	});
});





module.exports = router;