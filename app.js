const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

let today = new Date();
let input = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on a port");
});

app.get("/", function(req, res){
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render('index', {listTitle: day, newList: input});
});

app.get("/work", function(req, res){
    res.render("index", {listTitle: "Work List", newList: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.post("/", function(req,res){

    if(req.body.button == "Work List"){
        workItems.push(req.body.newItem);
        res.redirect("/work")
    }
    else {
        input.push(req.body.newItem);
        res.redirect("/");
    }

});

app.post("/work", function(req,res){
    workItems.push(req.body.newItem);
    res.redirect("/work")

});


