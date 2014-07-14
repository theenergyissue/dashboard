// server.js

// BASE SETUP
// ==============================================

var secrets = require(__dirname + '/secrets');

var express = require('express');
var app     = express();
var port    = process.env.PORT || 1337;

// MIDDLEWARE
// ==============================================

var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');

//set render engine to EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

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

app.use(session({secret: 'keyboard cat'}))


// AUTHENTICATION
// ==============================================

var tumblr = require('tumblr'),
    passport = require('passport'),
    util = require('util'),
    TumblrStrategy = require('passport-tumblr').Strategy;

//Setup Express to work with passport
app.use(passport.initialize());
app.use(passport.session());


// Use the TumblrStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Tumblr profile), and
//   invoke a callback with a user object.
passport.use(new TumblrStrategy({
    consumerKey: secrets.TUMBLR_CONSUMER_KEY,
    consumerSecret: secrets.TUMBLR_SECRET_KEY,
    callbackURL: "http://analytics.theenergyissue.com/auth/tumblr/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      console.log('token: ' + token);
      console.log('tokenSecret: ' + tokenSecret);

      // To keep the example simple, the user's Tumblr profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Tumblr account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));



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
	res.render('index.ejs', { title: 'The Energy Issue Analytics' }, function(err, html){

  });
});



// GET /auth/tumblr
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Tumblr authentication will involve redirecting
//   the user to tumblr.com.  After authorization, Tumblr will redirect the user
//   back to this application at /auth/tumblr/callback
app.get('/auth/tumblr',
  passport.authenticate('tumblr'),
  function(req, res){
    // The request will be redirected to Tumblr for authentication, so this
    // function will not be called.
  });

// GET /auth/tumblr/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/tumblr/callback',
  passport.authenticate('tumblr', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
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
