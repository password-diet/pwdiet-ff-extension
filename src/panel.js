let dwGen = require("diceware-password-generator");

$(function() {
	let $elem = $('#passphrase');
	$('#genbutton').click($.proxy(function () {
		let passphrase = dwGen();
		$elem.html(passphrase);
	    self.postMessage(passphrase);
	    $('#copy-success').html('✓ passphrase copied to clipboard');
 	},this));
});


self.port.on("show", function onShow() {
	$('#copy-success').html('');
	$('#passphrase').html('Click the button below');
});


