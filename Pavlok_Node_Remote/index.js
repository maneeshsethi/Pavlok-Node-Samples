var pavlok = require('pavlok-beta-api-login');
var express = require('express');
var open = require('open');

console.log("Setting up remote...");

var app = express();

//Setup URLs
app.use(express.static(__dirname + '/public'));

//Setup Pavlok component
pavlok.init("32c8cc7c70f5b25f7368774570fb3aeee7975ff54a0052be9bcba6cc1706c65e", 
			"4f7c43e85065536307cd6567a4ae7728f68533d866398f8665d565a11ccb1d8f", {
	"verbose": true,
	"app" : app,
	"message": "Hello from the Pavlok Remote example!",
	"callbackUrl": "https://pavlok-remote-b7gthmpw.porter.run/auth/pavlok/result/auth/pavlok/result",
	"callbackUrlPath": "/auth/pavlok/result",
	"successUrl": "/",
	"errorUrl": "/error"
});
app.get("/", function(req, result){
	if(pavlok.isLoggedIn(req)){
		result.redirect("main.html");
	} else {
		result.redirect("login.html");
	}
});
app.get("/auth", function(req, result){
	pavlok.auth(req, result);
});
app.get("/zap", function(req, result){
	pavlok.zap({
		"request": req
	});
	console.log("Zapped!");
	result.redirect("main.html");
});
app.get("/vibrate", function(req, result){
	pavlok.vibrate({
		"request": req
	});
	console.log("Vibrated!");
	result.redirect("main.html");
});
app.get("/beep", function(req, result){
	pavlok.beep({
		"request": req
	});
	console.log("Beeped!");
	result.redirect("main.html");
});
app.get("/pattern", function(req, result){
	pavlok.pattern({
		"request": req,
		"pattern": [ "beep", "vibrate", "zap" ],
		"count": 2
	});
	console.log("Pattern'd!");
	result.redirect("main.html");
});
app.get("/logout", function(req, result){
	pavlok.logout(req);
	result.redirect("/");	
});

app.listen(5135, function(){
	console.log("Visit the IP address of this machine, or http://localhost:5135/.");
});
