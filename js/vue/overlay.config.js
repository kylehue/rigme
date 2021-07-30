"use strict";

var events = require("../../../lib/events.js");

var mouse = require("../../../lib/mouse.js");

var config = require("../../../lib/config.js");

var utils = require("../../../lib/utils.js");

var dom = require("../../../lib/dom.js");

var timeline = require("./timeline.js");

var minOpacity = 0;
var maxOpacity = 1;
var minScale = 0;
var maxScale = 6;
var minAngle = -Math.PI;
var maxAngle = Math.PI;
var activeSliderDrag;
var overlayFrames = [];
var overlayConfigApp = new Vue({
  el: "#overlayConfigApp",
  data: {
    hidden: true,
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
      var fromEl = document.getElementById("overlayConfigTrimStart");
      var toEl = document.getElementById("overlayConfigTrimEnd");
      var startEl = document.getElementById("overlayConfigStart");
      var from = parseInt(fromEl.value);
      var to = parseInt(toEl.value);
      var start = parseInt(startEl.value);
      this.trimStart = from ? from : 1;
      this.trimEnd = to ? to : overlayFrames.length;
      this.start = start ? start : 1;
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");
      this.validateMax(e);
      this.fixData();
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e);
      this.validateMax(e);
    },
    validateMax: function validateMax(e) {
      var value = e.target.value;
      var max = e.target.dataset.max;

      if (e.target.id == "overlayConfigTrimStart") {
        max = this.trimEnd;
      }

      if (e.target.id == "overlayConfigTrimEnd") {
        max = overlayFrames.length;
      }

      if (e.target.id == "overlayConfigStart") {
        max = timeline.app.totalFrames;
      }

      if (parseInt(value) > max) {
        e.target.value = max.toString();
      }

      this.fixData();
    },
    validateMin: function validateMin(e) {
      var value = e.target.value;
      var min = e.target.dataset.min;

      if (e.target.id == "overlayConfigTrimEnd") {
        min = this.trimStart;
      }

      if (parseInt(value) < min) {
        e.target.value = min.toString();
      }

      this.fixData();
    },
    toggleAmount: function toggleAmount(e) {
      if (e.target != document.activeElement) return;

      if (!e.target.value.length) {
        e.target.value = 1;
      }

      var isDown = e.wheelDeltaY < 0;
      var value = parseInt(e.target.value);

      if (isDown) {
        value--;
      } else {
        value++;
      }

      e.target.value = value.toString();
      this.validateAmount(e);
      this.fixData();
    },
    updateSliders: function updateSliders() {
      var _this = this;

      var sliders = document.querySelectorAll(".slider-wrapper");

      var _loop = function _loop() {
        var slider = sliders[i];
        var handle = slider.querySelector(".handle");
        var handleBounds = handle.getBoundingClientRect();
        var track = slider.querySelector(".track");
        var trackBounds = track.getBoundingClientRect();
        var positionMin = 0;
        var positionMax = trackBounds.width - handleBounds.width;
        var min = void 0,
            max = void 0,
            value = void 0;

        if (slider.dataset.label == "opacity") {
          min = minOpacity;
          max = maxOpacity;
          value = _this.opacity;
        } else if (slider.dataset.label == "scale") {
          min = minScale;
          max = maxScale;
          value = _this.scale;
        } else if (slider.dataset.label == "rotate") {
          min = minAngle;
          max = maxAngle;
          value = _this.angle;
        }

        handle.style.left = "".concat(utils.map(value, min, max, positionMin, positionMax), "px");

        slider.onmousemove = function () {
          if (mouse.dragged && !activeSliderDrag) {
            activeSliderDrag = slider;
          }
        };

        slider.onmousedown = function () {
          activeSliderDrag = slider;
        };
      };

      for (var i = 0; i < sliders.length; i++) {
        _loop();
      }

      var configData = {
        opacity: this.opacity,
        scale: this.scale,
        angle: this.angle
      };
      localStorage.setItem(config.autosave.label + ".overlay.config", JSON.stringify(configData));
    },
    show: function show() {
      var _this2 = this;

      this.hidden = false;
      this.$nextTick(function () {
        _this2.$el.style.opacity = "1";
        dom.query("#overlayConfigApp .drag").draggable({
          restrict: true,
          root: _this2.$el
        });
        events.emit("renderSleep");
        var fromEl = document.getElementById("overlayConfigTrimStart");
        var toEl = document.getElementById("overlayConfigTrimEnd");
        var startEl = document.getElementById("overlayConfigStart");
        fromEl.value = _this2.trimStart;
        toEl.value = _this2.trimEnd;
        startEl.value = _this2.start;

        _this2.updateSliders();

        _this2.fixData();
      });
    },
    hide: function hide() {
      events.emit("renderFocus");
      this.hidden = true;
    },
    reset: function reset() {
      this.opacity = maxOpacity;
      this.scale = 1;
      this.angle = 0;
      var fromEl = document.getElementById("overlayConfigTrimStart");
      var toEl = document.getElementById("overlayConfigTrimEnd");
      var startEl = document.getElementById("overlayConfigStart");
      fromEl.value = 1;
      toEl.value = overlayFrames.length;
      startEl.value = 1;
      this.fixData();
      this.updateSliders();
    },
    removeOverlay: function removeOverlay() {
      var con = confirm("Are you sure you want to remove the overlay?");

      if (con) {
        events.emit("removeOverlay");
        this.hide();
      }
    }
  }
});
events.on("overlayFrames", function (_overlayFrames) {
  overlayFrames = _overlayFrames;
  overlayConfigApp.trimEnd = overlayFrames.length;
});

function handleSliders() {
  if (activeSliderDrag) {
    var handle = activeSliderDrag.querySelector(".handle");
    var handleBounds = handle.getBoundingClientRect();
    var track = activeSliderDrag.querySelector(".track");
    var trackBounds = track.getBoundingClientRect();
    var positionMin = 0;
    var positionMax = trackBounds.width - handleBounds.width;
    var position = mouse.x - trackBounds.x - handleBounds.width / 2;
    position = utils.clamp(position, positionMin, positionMax);
    handle.style.left = "".concat(position, "px");
    var min, max, target;

    if (activeSliderDrag.dataset.label == "opacity") {
      min = minOpacity;
      max = maxOpacity;
      target = "opacity";
    } else if (activeSliderDrag.dataset.label == "scale") {
      min = minScale;
      max = maxScale;
      target = "scale";
    } else if (activeSliderDrag.dataset.label == "rotate") {
      min = minAngle;
      max = maxAngle;
      target = "angle";
    }

    var value = utils.map(position, positionMin, positionMax, min, max);
    overlayConfigApp[target] = value;
    var configData = {
      opacity: overlayConfigApp.opacity,
      scale: overlayConfigApp.scale,
      angle: overlayConfigApp.angle
    };
    localStorage.setItem(config.autosave.label + ".overlay.config", JSON.stringify(configData));
  }
} //Autosave config


utils.loadJSONData(config.autosave.label + ".overlay.config", function (data) {
  if (typeof data.opacity == "number") overlayConfigApp.opacity = data.opacity;
  if (typeof data.scale == "number") overlayConfigApp.scale = data.scale;
  if (typeof data.angle == "number") overlayConfigApp.angle = data.angle;
  overlayConfigApp.updateSliders();
});
mouse.on("mouseup", function (event) {
  activeSliderDrag = null;
});
mouse.on("mousedown", function (event) {
  handleSliders();
});
mouse.on("mousemove", function (event) {
  if (mouse.dragged) {
    handleSliders();
  }
});
module.exports = overlayConfigApp;