var express = require("express");
var app = express();
var favicon = require("serve-favicon");
var path = require("path");
var http = require("http");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

app.get("/", function(req, res){
  res.render("home");
});

var campgrounds = [
  {name: "Bear Run", image:"https://s3.us-east-2.amazonaws.com/yelpcamp96/Bear.jpg"},
  {name: "Camp Reilly", image:"https://s3.us-east-2.amazonaws.com/yelpcamp96/Camp_Reily.jpg"},
  {name: "Pinchot Park", image:"https://s3.us-east-2.amazonaws.com/yelpcamp96/Pinchot.jpg"},
];

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push();
  res.redirect("/campgrounds");
});

// app.get("*", function(req, res) {
//   res.render("404");
// });

app.listen(app.get("port"), function(){
  console.log("App is listening on port 3000");
});
