const timeline = require("./timeline.js");
const contextMenu = require("./contextMenu.js");
const apps = {
	timeline: timeline,
	toolApp: document.getElementById("toolApp"),
	contextMenuApp: contextMenu
};

module.exports = apps;