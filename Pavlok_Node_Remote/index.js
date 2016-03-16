var pavlok = require('pavlok-beta-api-login');
var express = require('express');
var open = require('open');

function setupRemote(){
	console.log("Setting up remote...");
	
	var app = express();
	app.use(express.static(__dirname + '/public'));
	app.get("/", function(req, result){
		result.redirect("index.html");
	});	
	app.get("/zap", function(req, result){
		pavlok.zap();
		console.log("Zapped!");
		result.redirect("index.html");
	});
	app.get("/vibrate", function(req, result){
		pavlok.vibrate();
		console.log("Vibrated!");
		result.redirect("index.html");
	});
	app.get("/beep", function(req, result){
		pavlok.beep();
		console.log("Beeped!");
		result.redirect("index.html");
	});

	app.listen(5000, function(){
		open("http://localhost:5000/");
	});
};

pavlok.init(
    //NOTE: Don't expect these client ID/client secrets to work.
    "9377ed97a2ccfd3bfd4b7a6d226e3f92504416ac5aeb6aa6fee96343e05fbc4e",
    "ddea1deb41de6c18097997f8d63f9296ea4565917f8617961f198bb7d145f8cd",
	{
		message: "Node Remote"
	});
pavlok.login(function(result, code){
	if(result){
		setupRemote();
	} else {
		console.log("Unable to sign-in to Pavlok!");
	}
});
