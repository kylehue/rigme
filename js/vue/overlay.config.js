"use strict";

var events = require("../../../lib/events.js"),
    mouse = require("../../../lib/mouse.js"),
    config = require("../../../lib/config.js"),
    utils = require("../../../lib/utils.js"),
    dom = require("../../../lib/dom.js"),
    timeline = require("./timeline.js");

var minOpacity = 0,
    maxOpacity = 1,
    minScale = 0,
    maxScale = 6,
    minAngle = -Math.PI,
    maxAngle = Math.PI,
    activeSliderDrag,
    overlayFrames = [];
var overlayConfigApp = new Vue({
  el: "#overlayConfigApp",
  data: {
    hidden: !0,
    closeMsg: "Close",
    opacity: maxOpacity,
    scale: 1,
    angle: 0,
    trimStart: 1,
    trimEnd: timeline.app.totalFrames,
    start: 1
  },
  methods: {
    fixData: function fixData() {
      var e = document.getElementById("overlayConfigTrimStart"),
          t = document.getElementById("overlayConfigTrimEnd"),
          a = document.getElementById("overlayConfigStart"),
          e = parseInt(e.value),
          t = parseInt(t.value),
          a = parseInt(a.value);
      this.trimStart = e || 1, this.trimEnd = t || overlayFrames.length, this.start = a || 1;
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e), this.fixData();
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e), this.validateMax(e);
    },
    validateMax: function validateMax(e) {
      var t = e.target.value;
      var a = e.target.dataset.max;
      "overlayConfigTrimStart" == e.target.id && (a = this.trimEnd), "overlayConfigTrimEnd" == e.target.id && (a = overlayFrames.length), "overlayConfigStart" == e.target.id && (a = timeline.app.totalFrames), parseInt(t) > a && (e.target.value = a.toString()), this.fixData();
    },
    validateMin: function validateMin(e) {
      var t = e.target.value;
      var a = e.target.dataset.min;
      "overlayConfigTrimEnd" == e.target.id && (a = this.trimStart), parseInt(t) < a && (e.target.value = a.toString()), this.fixData();
    },
    toggleAmount: function toggleAmount(t) {
      if (t.target == document.activeElement) {
        t.target.value.length || (t.target.value = 1);
        var a = t.wheelDeltaY < 0;
        var e = parseInt(t.target.value);
        a ? e-- : e++, t.target.value = e.toString(), this.validateAmount(t), this.fixData();
      }
    },
    updateSliders: function updateSliders() {
      var _this = this;

      var _loop = function _loop() {
        var e = n[o],
            t = e.querySelector(".handle");
        s = t.getBoundingClientRect();
        var a = e.querySelector(".track");
        s = a.getBoundingClientRect().width - s.width;
        var i = void 0,
            l = void 0,
            r = void 0;
        "opacity" == e.dataset.label ? (i = minOpacity, l = maxOpacity, r = _this.opacity) : "scale" == e.dataset.label ? (i = minScale, l = maxScale, r = _this.scale) : "rotate" == e.dataset.label && (i = minAngle, l = maxAngle, r = _this.angle), t.style.left = "".concat(utils.map(r, i, l, 0, s), "px"), e.onmousemove = function () {
          mouse.dragged && !activeSliderDrag && (activeSliderDrag = e);
        }, e.onmousedown = function () {
          activeSliderDrag = e;
        };
      };

      for (var n = document.querySelectorAll(".slider-wrapper"), o = 0; o < n.length; o++) {
        var s;

        _loop();
      }

      var e = {
        opacity: this.opacity,
        scale: this.scale,
        angle: this.angle
      };
      localStorage.setItem(config.autosave.label + ".overlay.config", JSON.stringify(e));
    },
    show: function show() {
      var _this2 = this;

      this.hidden = !1, this.$nextTick(function () {
        _this2.$el.style.opacity = "1", dom.query("#overlayConfigApp .drag").draggable({
          restrict: !0,
          root: _this2.$el
        }), events.emit("renderSleep");
        var e = document.getElementById("overlayConfigTrimStart"),
            t = document.getElementById("overlayConfigTrimEnd"),
            a = document.getElementById("overlayConfigStart");
        e.value = _this2.trimStart, t.value = _this2.trimEnd, a.value = _this2.start, _this2.updateSliders(), _this2.fixData();
      });
    },
    hide: function hide() {
      events.emit("renderFocus"), this.hidden = !0;
    },
    reset: function reset() {
      this.opacity = maxOpacity, this.scale = 1, this.angle = 0;
      var e = document.getElementById("overlayConfigTrimStart"),
          t = document.getElementById("overlayConfigTrimEnd"),
          a = document.getElementById("overlayConfigStart");
      e.value = 1, t.value = overlayFrames.length, a.value = 1, this.fixData(), this.updateSliders();
    },
    removeOverlay: function removeOverlay() {
      confirm("Are you sure you want to remove the overlay?") && (events.emit("removeOverlay"), this.hide());
    }
  }
});

function handleSliders() {
  if (activeSliderDrag) {
    var e = activeSliderDrag.querySelector(".handle");
    var r = e.getBoundingClientRect();
    var t = activeSliderDrag.querySelector(".track");
    var n = t.getBoundingClientRect(),
        o = n.width - r.width,
        r = mouse.x - n.x - r.width / 2,
        r = utils.clamp(r, 0, o);
    e.style.left = "".concat(r, "px");
    var a, i, l;
    "opacity" == activeSliderDrag.dataset.label ? (a = minOpacity, i = maxOpacity, l = "opacity") : "scale" == activeSliderDrag.dataset.label ? (a = minScale, i = maxScale, l = "scale") : "rotate" == activeSliderDrag.dataset.label && (a = minAngle, i = maxAngle, l = "angle");
    o = utils.map(r, 0, o, a, i);
    overlayConfigApp[l] = o;
    o = {
      opacity: overlayConfigApp.opacity,
      scale: overlayConfigApp.scale,
      angle: overlayConfigApp.angle
    };
    localStorage.setItem(config.autosave.label + ".overlay.config", JSON.stringify(o));
  }
}

events.on("overlayFrames", function (e) {
  overlayFrames = e, overlayConfigApp.trimEnd = overlayFrames.length;
}), utils.loadJSONData(config.autosave.label + ".overlay.config", function (e) {
  "number" == typeof e.opacity && (overlayConfigApp.opacity = e.opacity), "number" == typeof e.scale && (overlayConfigApp.scale = e.scale), "number" == typeof e.angle && (overlayConfigApp.angle = e.angle), overlayConfigApp.updateSliders();
}), mouse.on("mouseup", function (e) {
  activeSliderDrag = null;
}), mouse.on("mousedown", function (e) {
  handleSliders();
}), mouse.on("mousemove", function (e) {
  mouse.dragged && handleSliders();
}), module.exports = overlayConfigApp;