var pavlok = require('pavlok-beta-api-login');
var os = require('os');

var alertValid = true;

function bytesToGb(bytes){
	return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

function checkMem(){
	var freeMem = os.freemem();
	var totalMem = os.totalmem();
	var usedMem = totalMem - freeMem;
	var percent = usedMem / totalMem;

	console.log(bytesToGb(usedMem) + "/" + bytesToGb(totalMem) + "GB used; " + 
		(percent * 100).toFixed(1) + "% usage");

	if(percent > 0.8 && alertValid){
		pavlok.vibrate({
			"intensity": 200,
			"message": "PC RAM usage at " + (percent * 100).toFixed(0) + "%!"
		});
		alertValid = false; //Don't alert again until we drop below 80% and then go above
		console.log("Warned about usage on your Pavlok!");
	} else {
		alertValid = true;
	}

	setTimeout(checkMem, 30000);
}

pavlok.init(
    //NOTE: Don't expect these client ID/client secrets to work.
    "9377ed97a2ccfd3bfd4b7a6d226e3f92504416ac5aeb6aa6fee96343e05fbc4e",
    "ddea1deb41de6c18097997f8d63f9296ea4565917f8617961f198bb7d145f8cd");
pavlok.login(function(result, code){
	if(result){
		checkMem();
	} else {
		console.log("Unable to sign-in to Pavlok!");
	}
});
