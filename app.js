const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on a port");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jasonData = JSON.stringify(data);
    const options = {
        method: "POST",
        auth: "robin19:0b274548ac04c5675d9b32a7617cb97b-us13"
    }

    const url = "https://us13.api.mailchimp.com/3.0/lists/e40ed57e6a";

    const request = https.request(url, options, function(response){
        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jasonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


