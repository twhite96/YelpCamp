/*jslint node: true*/
var express     = require("express"),
  app         = express(),
  favicon = require('serve-favicon'),
  bodyParser  = require("body-parser"),
  mongoose    = require("mongoose"),
  flash       = require("connect-flash"),
  passport    = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  cookieParser = require("cookie-parser"),
  path = require('path'),
  http = require('http'),
  Campground  = require("./models/campground"),
  Comment     = require("./models/comment"),
  User        = require("./models/user"),
  seedDB      = require("./seeds");
require('dotenv').load();
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    // ratingRoutes     = require("./routes/ratings"),
    indexRoutes      = require("./routes/index");

mongoose.Promise = global.Promise;

/*seedDB();*/
var databaseURL = process.env.DATABASEURL ||
'mongodb://localhost/yelp_camp';
var sessionSecret = process.env.SESSION_SECRET || 'None of your business, mate';

mongoose.connect(databaseURL);
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));
app.use(flash());
app.locals.moment = require('moment');


// passport config
app.use(require("express-session")({
  secret: "Cats are the cutest things on earth",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
// app.use("/campgrounds/:id/ratings", ratingRoutes);

app.get('*', function(req, res) {
  res.render('404');
});

app.listen(app.get('port'), function() {
  console.log('App is listening on port 3000');
});
