const timeline = require("./timeline.js");
const contextMenu = require("./contextMenu.js");
const overlayApp = require("./overlay.js");
const fileApp = require("./file.js");
const saveApp = require("./save.js");
const loadApp = require("./load.js");
const nav = require("./navigation.js");
const optionApp = require("./option.js");
const apps = {
	timeline: timeline,
	contextMenuApp: contextMenu,
	fileApp: fileApp,
	saveApp: saveApp,
	loadApp: loadApp,
	optionApp: optionApp,
	overlayApp: overlayApp
};

module.exports = apps;