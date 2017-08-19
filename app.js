let express = require("express");
let app = express();
let favicon = require("serve-favicon");
let path = require("path");

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

// app.get("*", function(req, res) {
//   res.render("404");
// });

app.listen(app.get("port"), function(){
  console.log("App is listening on port 3000");
});
