/*jslint node: true*/

var express = require('express'),
  app = express(),
  favicon = require('serve-favicon'),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var databaseURL = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp';
var sessionSecret = process.env.SESSION_SECRET || 'None of your business, mate';

mongoose.connect(databaseURL);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

Campground.create(
  {
    name: 'Camp Reilly',
    image: 'https://s3.us-east-2.amazonaws.com/yelpcamp96/Camp_Reily.jpg',
    description:
      "Great memories here, can host weddings, has a chapel, if you're into that kind of thing."
  },
  function(err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log('Made a campground');
      console.log(campground);
    }
  }
);

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: allCampgrounds });
    }
  });
});

app.post('/campgrounds', function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
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

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.get('/campgrounds/:id', function(req, res) {
  //Find campground with one id
  //Then show on the show route
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { campground: foundCampground });
    }
  });
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push();
  res.redirect('/campgrounds');
});

// app.get("*", function(req, res) {
//   res.render("404");
// });

app.listen(app.get('port'), function() {
  console.log('App is listening on port 3000');
});
