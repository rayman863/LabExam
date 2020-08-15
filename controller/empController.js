var express 	= require('express');
const { body, validationResult } = require('express-validator');
var userModel 	= require.main.require('./models/adminModel'); 
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('emp/index');
});





module.exports = router;