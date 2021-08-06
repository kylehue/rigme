"use strict";

var events = require("../../../lib/events.js");

var mouse = require("../../../lib/mouse.js");

var overlayApp = require("./overlay.js");

var overlayConfig = require("./overlay.config.js");

var optionApp = new Vue({
  el: "#optionApp",
  data: {
    hidden: true,
    overlayConfigHidden: true,
    showOverlayActions: false,
    overlayConfigDisabled: true
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        var optionButtonBounds = document.getElementById("optionButton").getBoundingClientRect();
        _this.$el.style.left = "".concat(optionButtonBounds.x, "px");
        _this.$el.style.top = "".concat(optionButtonBounds.y + optionButtonBounds.height + 3, "px");
      });
    },
    toggleOverlayActions: function toggleOverlayActions(b) {
      var _this2 = this;

      this.showOverlayActions = b;
      this.$nextTick(function () {
        if (!_this2.overlayConfigDisabled) {
          document.getElementById("showOverlayConfigApp").classList.remove("disabled");
          document.getElementById("rotoscope").classList.remove("disabled");
        }
      });
    },
    hide: function hide() {
      this.hidden = true;
      this.showOverlayActions = false;
    },
    showOverlayApp: function showOverlayApp() {
      overlayApp.show();
    },
    showOverlayConfigApp: function showOverlayConfigApp() {
      overlayConfig.show();
    },
    clearJoints: function clearJoints() {
      var con = confirm("Are you sure you want to reset everything?");

      if (con) {
        events.emit("clearJoints");
        events.emit("resetTimeline");
        events.emit("resetCamera");
      }

      setTimeout(function () {
        mouse.pressed = false;
        mouse.dragged = false;
      }, 100);
    },
    resetTimeline: function resetTimeline() {
      var con = confirm("Are you sure you want to reset the timeline? (This action won't affect the keyframes)");

      if (con) {
        events.emit("resetTimeline");
      }

      setTimeout(function () {
        mouse.pressed = false;
        mouse.dragged = false;
      }, 100);
    },
    resetView: function resetView() {
      events.emit("resetCamera");
    },
    undo: function undo() {
      events.emit("undo");
    },
    redo: function redo() {
      events.emit("redo");
    },
    rotoscope: function rotoscope() {
      events.emit("rotoscope");
    }
  }
});
events.on("overlayFrames", function () {
  optionApp.overlayConfigDisabled = false;
});
module.exports = optionApp;