const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname +"/date.js");
const https=require("https");

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs'); //has to be below express()
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
let day = date.getDate();
  res.render("List", {ListTitle: day,newListItems: items});
});

app.post("/", function(req, res) { //this grabs the inputs from ejs
  let item = req.body.newItem;

if(req.body.List==="Work"){
  workItems.push(item);
  res.redirect("/work");
}else{
  items.push(item);
  res.redirect("/");
}

});
app.get("/work", function(req, res) {
  res.render("List", {
    ListTitle: "Work List",
    newListItems: workItems
    });
});


app.listen(process.env.PORT|| 3000, function(){
  console.log("server on 3000");
});
