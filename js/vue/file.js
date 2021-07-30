"use strict";

var saveApp = require("./save.js"),
    loadApp = require("./load.js"),
    spritesheetExportApp = require("./export.spritesheet.js"),
    framesExportApp = require("./export.frames.js"),
    GIFExportApp = require("./export.gif.js"),
    fileApp = new Vue({
  el: "#fileApp",
  data: {
    showExportFormats: !1,
    hidden: !0,
    position: {
      x: 0,
      y: 0
    }
  },
  methods: {
    show: function show(e, p) {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        var e = document.getElementById("fileButton").getBoundingClientRect();
        _this.$el.style.left = "".concat(e.x, "px"), _this.$el.style.top = "".concat(e.y + e.height + 3, "px");
      });
    },
    hide: function hide() {
      this.hidden = !0, this.showExportFormats = !1;
    },
    showSaveApp: function showSaveApp() {
      saveApp.show();
    },
    showLoadApp: function showLoadApp() {
      loadApp.show();
    },
    showSpritesheetExportApp: function showSpritesheetExportApp() {
      spritesheetExportApp.show();
    },
    showFrameExportApp: function showFrameExportApp() {
      framesExportApp.show();
    },
    showGIFExportApp: function showGIFExportApp() {
      GIFExportApp.show();
    }
  }
});

module.exports = fileApp;