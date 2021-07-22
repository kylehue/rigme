const timeline = require("./timeline.js");
const contextMenu = require("./contextMenu.js");
const overlayApp = require("./overlay.js");
const overlayConfigApp = require("./overlay.config.js");
const fileApp = require("./file.js");
const saveApp = require("./save.js");
const loadApp = require("./load.js");
const optionApp = require("./option.js");
const paneApp = require("./pane.js");
const cropApp = require("./crop.js");
const spritesheetExportApp = require("./export.spritesheet.js");
const apps = {
	timeline: timeline,
	contextMenuApp: contextMenu,
	fileApp: fileApp,
	saveApp: saveApp,
	loadApp: loadApp,
	optionApp: optionApp,
	overlayApp: overlayApp,
	overlayConfigApp: overlayConfigApp,
	paneApp: paneApp,
	cropApp: cropApp,
	spritesheetExportApp: spritesheetExportApp
};

module.exports = apps;