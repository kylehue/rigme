var saveApp = require("./save.js");

var loadApp = require("./load.js");

var spritesheetExportApp = require("./export.spritesheet.js");

var framesExportApp = require("./export.frames.js");

var GIFExportApp = require("./export.gif.js");

var fileApp = new Vue({
  el: "#fileApp",
  data: {
    showExportFormats: false,
    hidden: true,
    position: {
      x: 0,
      y: 0
    }
  },
  methods: {
    show: function show(x, y) {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        var fileButtonBounds = document.getElementById("fileButton").getBoundingClientRect();
        _this.$el.style.left = "".concat(fileButtonBounds.x, "px");
        _this.$el.style.top = "".concat(fileButtonBounds.y + fileButtonBounds.height + 3, "px");
      });
    },
    hide: function hide() {
      this.hidden = true;
      this.showExportFormats = false;
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