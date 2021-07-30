"use strict";

var timeline = require("./timeline.js"),
    contextMenu = require("./contextMenu.js"),
    overlayApp = require("./overlay.js"),
    overlayConfigApp = require("./overlay.config.js"),
    fileApp = require("./file.js"),
    saveApp = require("./save.js"),
    loadApp = require("./load.js"),
    optionApp = require("./option.js"),
    paneApp = require("./pane.js"),
    cropApp = require("./crop.js"),
    spritesheetExportApp = require("./export.spritesheet.js"),
    framesExportApp = require("./export.frames.js"),
    GIFExportApp = require("./export.gif.js"),
    apps = {
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