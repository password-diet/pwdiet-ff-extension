let dwGen = require("diceware-password-generator");
let elem = document.getElementById('panel-content');

self.port.on("show", function onShow() {
	let passphrase = dwGen();
	elem.innerHTML = passphrase;
    self.postMessage(passphrase);
});


