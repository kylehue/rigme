"use strict";

var timeline = require("./timeline.js");

var contextMenu = require("./contextMenu.js");

var overlayApp = require("./overlay.js");

var overlayConfigApp = require("./overlay.config.js");

var fileApp = require("./file.js");

var saveApp = require("./save.js");

var loadApp = require("./load.js");

var optionApp = require("./option.js");

var paneApp = require("./pane.js");

var cropApp = require("./crop.js");

var spritesheetExportApp = require("./export.spritesheet.js");

var framesExportApp = require("./export.frames.js");

var GIFExportApp = require("./export.gif.js");

var apps = {
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
  spritesheetExportApp: spritesheetExportApp,
  framesExportApp: framesExportApp,
  GIFExportApp: GIFExportApp
};
module.exports = apps;