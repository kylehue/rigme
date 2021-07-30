"use strict";

var events = require("../../../lib/events.js"),
    mouse = require("../../../lib/mouse.js"),
    overlayApp = require("./overlay.js"),
    overlayConfig = require("./overlay.config.js"),
    optionApp = new Vue({
  el: "#optionApp",
  data: {
    hidden: !0,
    overlayConfigHidden: !0,
    showOverlayActions: !1,
    overlayConfigDisabled: !0,
    position: {
      x: 0,
      y: 0
    }
  },
  methods: {
    show: function show(e, t) {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        var e = document.getElementById("optionButton").getBoundingClientRect();
        _this.$el.style.left = "".concat(e.x, "px"), _this.$el.style.top = "".concat(e.y + e.height + 3, "px");
      });
    },
    toggleOverlayActions: function toggleOverlayActions(e) {
      var _this2 = this;

      this.showOverlayActions = e, this.$nextTick(function () {
        _this2.overlayConfigDisabled || (document.getElementById("showOverlayConfigApp").classList.remove("disabled"), document.getElementById("rotoscope").classList.remove("disabled"));
      });
    },
    hide: function hide() {
      this.hidden = !0, this.showOverlayActions = !1;
    },
    showOverlayApp: function showOverlayApp() {
      overlayApp.show();
    },
    showOverlayConfigApp: function showOverlayConfigApp() {
      overlayConfig.show();
    },
    clearJoints: function clearJoints() {
      confirm("Are you sure you want to reset everything?") && (events.emit("clearJoints"), events.emit("resetTimeline"), events.emit("resetCamera")), setTimeout(function () {
        mouse.pressed = !1, mouse.dragged = !1;
      }, 100);
    },
    resetTimeline: function resetTimeline() {
      confirm("Are you sure you want to reset the timeline? (This action won't affect the keyframes)") && events.emit("resetTimeline"), setTimeout(function () {
        mouse.pressed = !1, mouse.dragged = !1;
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
  optionApp.overlayConfigDisabled = !1;
}), module.exports = optionApp;