var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var data = require("sdk/self").data;
const {Cc, Ci} = require("chrome");
const gClipboardHelper =Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper);


var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: {
    "16": "./icon16.png",
    "32": "./icon32.png",
    "64": "./icon64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: self.data.url("panel.html"),
  contentScriptFile: [
    data.url("vendor/js/jquery-1.11.3.min.js"),
    data.url("vendor/js/materialize.min.js"),
    data.url("panel.gen.js")
  ],
  onHide: handleHide,
  width: 350,
  height: 150,
});

panel.on("show", function() {
  panel.port.emit("show");
});

panel.on("message", function(message) {
  gClipboardHelper.copyString(message);
});

function handleChange(state) {
  if (state.checked) {

    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}