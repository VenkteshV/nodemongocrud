

// app/routes.js

var Detail = require('../app/models/details');
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================


	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});
	app.get('/forms', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('forms.ejs', { message: req.flash('loginMessage') });
	});


	app.post('/forms', function(req, res){
	  new Detail({
	    _id : req.body.id,
	    firstname  : req.body.firstname,
	    lastname   : req.body.lastname,
			company    : req.body.company,
			location	 : req.body.location,
			package    : req.body.package,
			higher     : req.body.higher,
			cgpa       : req.body.cgpa
	  }).save(function(err, prd){
	    if(err) console.log(err);
	    else    res.send("Alumni Successfully Added !");
	  });
	});

	app.get('/tables', function(req,res) {
    Detail.find({}, function(err, dtls) {
    console.log("\ndetails !");
    console.log(dtls);
    renderResult(res, dtls, "Alumni List ");
});});

function renderResult(res, dtls, msg) {
  res.render('tables.ejs', {message:msg, details:dtls},
    function(err, result) {
      if (!err) {res.end(result);}
      else {res.end('Oops ! An error occurred.');
        console.log(err);}
});}
	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	app.post('/forms/delete', function(req, res, next) {
	   var userId = req.body.userId || req.query.userId;
		 console.log(userId);
	   Detail.remove({_id: userId}, function(err, res) {
	       if (err) { res.json={"err": err}; } else { res.json={"success": true}};
	   });
	});
};


function isLoggedIn(req, res, next) {


	if (req.isAuthenticated())
		return next();


	res.redirect('/');
}
