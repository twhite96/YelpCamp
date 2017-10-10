var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
  {
    name: 'North Fork',
    image: 'https://photosforclass.com/download/35301859822',
    description:
      'Slow-carb drinking vinegar literally typewriter retro. Ramps air plant franzen actually copper mug. Yuccie vinyl banh mi yr etsy fixie master cleanse. Neutra austin PBR&B pour-over. Venmo literally la croix thundercats disrupt. Raclette fashion axe hella viral, prism snackwave shabby chic. Succulents pickled mixtape kinfolk edison bulb, fashion axe tattooed knausgaard messenger bag. Wayfarers truffaut brunch typewriter, seitan viral shoreditch venmo squid sriracha chicharrones plaid. Pop-up fanny pack tilde man bun locavore keytar woke poutine vexillologist authentic.'
  },
  {
    name: "Cloud's Rest",
    image: 'https://photosforclass.com/download/20607281024',
    description:
      'Kale chips forage VHS, biodiesel coloring book roof party sustainable pinterest shabby chic. Wolf tattooed actually raw denim, humblebrag meh listicle selfies shoreditch flexitarian neutra aesthetic. Asymmetrical roof party selvage tumblr, semiotics fashion axe pork belly actually copper mug tote bag cardigan swag offal. Mixtape street art lumbersexual, PBR&B taiyaki organic jianbing paleo tattooed sustainable put a bird on it bushwick everyday carry helvetica. Bicycle rights pour-over prism lomo green juice microdosing shoreditch. Direct trade la croix meditation plaid pop-up bespoke. Pitchfork selfies four loko put a bird on it tbh heirloom jean shorts single-origin coffee godard.'
  },
  {
    name: 'Fox Run',
    image: 'https://photosforclass.com/download/8137270056',
    description:
      ' Glossier live-edge iceland craft beer crucifix sustainable pop-up umami bespoke venmo kinfolk four loko. Marfa live-edge kogi yr occupy church-key fanny pack affogato gochujang XOXO unicorn. Neutra hashtag man braid gentrify lomo, art party kombucha keffiyeh deep v etsy pok pok ramps. Tilde cold-pressed trust fund umami, kombucha schlitz subway tile forage hexagon synth DIY microdosing 8-bit skateboard. Four dollar toast chartreuse street art whatever, sriracha photo booth small batch bicycle rights selvage williamsburg XOXO jianbing swag mustache. Disrupt pour-over retro put a bird on it, hammock aesthetic polaroid.'
  },
  {
    name: 'Chippewa Lake',
    image: 'https://photosforclass.com/download/9586944536',
    description:
      'Raw denim cronut fam man braid portland health goth artisan kickstarter blue bottle irony. Keffiyeh artisan hammock cornhole wayfarers. Mumblecore vinyl tousled meggings before they sold out, godard subway tile try-hard heirloom forage roof party bespoke. Woke before they sold out actually prism roof party, tumblr tote bag. Pork belly roof party hammock organic polaroid four loko selvage shabby chic. Tilde succulents salvia retro, everyday carry forage readymade live-edge pitchfork tote bag plaid. Butcher etsy cornhole, farm-to-table yr sustainable 90s. Wayfarers fashion axe tousled irony drinking vinegar bushwick. Locavore banh mi affogato, forage etsy man braid sustainable disrupt cloud bread portland twee bushwick listicle activated charcoal.'
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
