var pavlok = require('pavlok-beta-api-login');
var express = require('express');
var open = require('open');

console.log("Setting up remote...");

var app = express();

//Setup URLs
app.use(express.static(__dirname + '/public'));

//Setup Pavlok component
pavlok.init("9377ed97a2ccfd3bfd4b7a6d226e3f92504416ac5aeb6aa6fee96343e05fbc4e", 
			"ddea1deb41de6c18097997f8d63f9296ea4565917f8617961f198bb7d145f8cd", {
	"verbose": true,
	"app" : app,
	"message": "Hello from the Pavlok Remote example!",
	"callbackUrl": "http://localhost:5135/auth/pavlok/result",
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
