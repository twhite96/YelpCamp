var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
  {
    name: 'North Fork',
    image: 'https://photosforclass.com/download/35301859822',
    description: 'Love this beautiful site!'
  },
  {
    name: "Cloud's Rest",
    image: 'https://photosforclass.com/download/20607281024',
    description: 'Great time, great beer.'
  },
  {
    name: 'Fox Run',
    image: 'https://photosforclass.com/download/8137270056',
    description: 'Terrible storm while we were there but all in all great site.'
  },
  {
    name: 'Chippewa Lake',
    image: 'https://photosforclass.com/download/9586944536',
    description: 'Not bad. Cruise ship ruined the peace.'
  }
];
function seedDB() {
  //remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('removed campgrounds');
    //add a few campgrounds
    data.forEach(function(seed) {
      Campground.create(seed, function(err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log('added a campground');
          // create a comment
          Comment.create(
            {
              text: 'This place is great, but I wish there was internet',
              author: 'Homer'
            },
            function(err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('Created new comment');
              }
            }
          );
        }
      });
    });
  });
}

//add a few comments

module.exports = seedDB;
