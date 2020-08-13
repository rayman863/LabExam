var express 	= require('express');
var exSession 	= require('express-session');
var bodyParser 	= require('body-parser');
var login 		= require('./controller/loginController');
var admin 		= require('./controller/adminController');
var emp 		= require('./controller/empController');
var logout 		= require('./controller/logout');
//var admin		= require('./controller/adminController');
var app 		= express();

//config
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret @*#', saveUninitialized: true, resave: false}));

app.use('/login', login);
app.use('/admin', admin);
//app.use('/emp', emp);
app.use('/logout', logout);


app.get('/', function(req, res){
	res.send("this is index page!<br> <a href='/login'> login</a> ");
});

app.listen(3000, function(){
	console.log('express http server started at...3000');
});