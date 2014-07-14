// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    = process.env.PORT || 1337;

// MIDDLEWARE
// ==============================================

var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(logger('dev'));

// pull information from html in POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// simulate DELETE and PUT
app.use(methodOverride());

// ROUTES
// ==============================================

// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

	// continue doing what we were doing and go to the route
	next();
});

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
	res.send('im the home page!');
});

// apply the routes to our application
app.use('/', router);

// login routes
app.route('/login')

	// show the form (GET http://localhost:8080/login)
	.get(function(req, res) {
		res.send('this is the login form');
	})

	// process the form (POST http://localhost:8080/login)
	.post(function(req, res) {
		console.log('processing');
		res.send('processing the login form!');
	});

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
