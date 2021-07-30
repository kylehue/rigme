"use strict";

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var events = require("../../../lib/events.js");

var utils = require("../../../lib/utils.js");

var dom = require("../../../lib/dom.js");

var currentFileURL, videoDuration;
var overlayApp = new Vue({
  el: "#overlayApp",
  data: {
    hidden: true,
    closeMsg: "Close"
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = false;
      this.$nextTick(function () {
        _this.$el.style.opacity = "1";
        dom.query("#overlayApp .drag").draggable({
          restrict: true,
          root: _this.$el
        });
        events.emit("renderSleep");
      });
    },
    hide: function hide() {
      currentFileURL = undefined;
      videoDuration = undefined;
      var filenameEl = document.getElementById("overlayFilename");
      filenameEl.innerText = "Choose a file...";
      var sections = document.querySelectorAll("#overlayApp .section.disabled");

      for (var _iterator = _createForOfIteratorHelperLoose(sections), _step; !(_step = _iterator()).done;) {
        var section = _step.value;
        section.classList.add("disabled");
      }

      var addButton = document.getElementById("addOverlay");
      addButton.classList.add("disabled");
      this.hidden = true;
      events.emit("renderFocus");
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");
      this.validateMax(e);
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e);
      this.validateMax(e);
    },
    validateMax: function validateMax(e) {
      var value = e.target.value;
      var max = e.target.dataset.max;

      if (typeof videoDuration == "number") {
        if (e.target.id == "overlayStart") {
          max = videoDuration;
        }

        if (e.target.id == "overlayEnd") {
          max = videoDuration;
        }
      }

      if (parseInt(value) > max) {
        e.target.value = max.toString();
      }
    },
    validateMin: function validateMin(e) {
      var value = e.target.value;
      var min = e.target.dataset.min;

      if (e.target.id == "overlayEnd") {
        var start = parseInt(document.getElementById("overlayStart").value);
        min = start;
      }

      if (parseInt(value) < min) {
        e.target.value = min.toString();
      }
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
    },
    checkFile: function checkFile() {
      var fileEl = document.getElementById("overlayInput");
      var filenameEl = document.getElementById("overlayFilename");
      var file = fileEl.files[0];
      if (!file) return;
      filenameEl.innerText = file.name;
      var fileURL = URL.createObjectURL(file);

      if (fileURL) {
        currentFileURL = fileURL; //Get data

        var video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.controls = true;
        video.muted = true;
        video.src = fileURL;
        video.load();
        video.addEventListener("loadedmetadata", function () {
          videoDuration = video.duration;
          video.remove();
        });
        var sections = document.querySelectorAll("#overlayApp .section.disabled");

        for (var _iterator2 = _createForOfIteratorHelperLoose(sections), _step2; !(_step2 = _iterator2()).done;) {
          var section = _step2.value;
          section.classList.remove("disabled");
        }

        var addButton = document.getElementById("addOverlay");
        addButton.classList.remove("disabled");
      }
    },
    validate: function validate() {
      if (!currentFileURL) {
        return;
      }

      var frameCount = document.getElementById("overlayFrameCount").value;
      var frameRate = document.getElementById("overlayFrameRate").value;
      var start = document.getElementById("overlayStart").value;
      var end = document.getElementById("overlayEnd").value;
      var quality = document.getElementById("overlayQuality").value;
      frameCount = frameCount.length ? parseInt(frameCount) : undefined;
      frameRate = frameRate.length ? parseInt(frameRate) : undefined;
      start = start.length ? parseInt(start) : undefined;
      end = end.length ? parseInt(end) : undefined;
      quality = quality.length ? parseInt(quality) / 100 : undefined;
      var options = {
        frameCount: frameCount,
        frameRate: frameRate,
        start: start,
        end: end,
        quality: quality
      };
      events.emit("extractFrames", currentFileURL, options);
      this.hide();
    }
  }
});
module.exports = overlayApp;