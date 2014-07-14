// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app     = express();
var port    = 	process.env.PORT || 1337;


// MIDDLEWARE
// ==============================================

var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// log every request to the console
app.use(morgan('dev'));

// pull information from html in POST
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// simulate DELETE and PUT
app.use(methodOverride());

// ROUTES
// ==============================================

// get an instance of router
var router = express.Router();

console.log('router:');
console.dir(router);

// home page route (http://localhost:8080)
router.get('/', function(req, res) {
	res.send('im the home page!');
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
	res.send('im the about page!');
});

// apply the routes to our application
app.use('/', router);


// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
