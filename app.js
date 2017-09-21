/*jslint node: true*/

var express = require('express'),
  app = express(),
  favicon = require('serve-favicon'),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Campground = require('./models/campground'),
  seedDB = require('./seeds');
// Comment = require('./models/comment');

seedDB();
var databaseURL = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp';
var sessionSecret = process.env.SESSION_SECRET || 'None of your business, mate';

mongoose.connect(databaseURL);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

app.get('/', function(req, res) {
  res.render('landing');
});

//INDEX - show all campgrounds
app.get('/campgrounds', function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        campgrounds: allCampgrounds
      });
    }
  });
});

//CREATE - add new campground to DB
app.post('/campgrounds', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: desc
  };
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect('/campgrounds');
    }
  });
});

//NEW - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id)
    .populate(comments)
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        //render show template with that campground
        res.render('show', {
          campground: foundCampground
        });
      }
    });
});

// app.get("*", function(req, res) {
//   res.render("404");
// });

app.listen(app.get('port'), function() {
  console.log('App is listening on port 3000');
});
