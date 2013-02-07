var fs = require("fs");
var config = JSON.parse(fs.readFileSync("config.json"));
var host = config.host;
var port = config.port;

var express = require("express");

var app = express();
app.use(app.router);
app.use( express.static(__dirname + "/public"));

app.get("/", function( request, response ){
	response.send("tehdb is here");
});

app.get("/hello/:text", function( req, res){
	res.send( "hi " + req.params.text );
});

var users = {
	"1" : {
		"name" : "mursa"
	},
	"2" : {
		"name" : "tehdb"
	}
};

app.get("/user/:id", function(req, res){
	var user = users[req.params.id];
	if(user) {
		res.send( user.name + " found");
	} else {
		res.send("user not found", 404);
	}
});

app.listen( port, host);