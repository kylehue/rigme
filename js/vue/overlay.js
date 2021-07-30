"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var events = require("../../../lib/events.js"),
    utils = require("../../../lib/utils.js"),
    dom = require("../../../lib/dom.js");

var currentFileURL, videoDuration;
var overlayApp = new Vue({
  el: "#overlayApp",
  data: {
    hidden: !0,
    closeMsg: "Close"
  },
  methods: {
    show: function show() {
      var _this = this;

      this.hidden = !1, this.$nextTick(function () {
        _this.$el.style.opacity = "1", dom.query("#overlayApp .drag").draggable({
          restrict: !0,
          root: _this.$el
        }), events.emit("renderSleep");
      });
    },
    hide: function hide() {
      videoDuration = currentFileURL = void 0;
      var e = document.getElementById("overlayFilename");
      var t;
      e.innerText = "Choose a file...";

      var _iterator = _createForOfIteratorHelper(document.querySelectorAll("#overlayApp .section.disabled")),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          t = _step.value;
          t.classList.add("disabled");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var a = document.getElementById("addOverlay");
      a.classList.add("disabled"), this.hidden = !0, events.emit("renderFocus");
    },
    validateFormat: function validateFormat(e) {
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e);
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e), this.validateMax(e);
    },
    validateMax: function validateMax(e) {
      var t = e.target.value;
      var a = e.target.dataset.max;
      "number" == typeof videoDuration && ("overlayStart" == e.target.id && (a = videoDuration), "overlayEnd" == e.target.id && (a = videoDuration)), parseInt(t) > a && (e.target.value = a.toString());
    },
    validateMin: function validateMin(e) {
      var t,
          a = e.target.value;
      var l = e.target.dataset.min;
      "overlayEnd" == e.target.id && (t = parseInt(document.getElementById("overlayStart").value), l = t), parseInt(a) < l && (e.target.value = l.toString());
    },
    toggleAmount: function toggleAmount(t) {
      if (t.target == document.activeElement) {
        t.target.value.length || (t.target.value = 1);
        var a = t.wheelDeltaY < 0;
        var e = parseInt(t.target.value);
        a ? e-- : e++, t.target.value = e.toString(), this.validateAmount(t);
      }
    },
    checkFile: function checkFile() {
      var t = document.getElementById("overlayInput");
      var e = document.getElementById("overlayFilename");
      t = t.files[0];

      if (t) {
        e.innerText = t.name;
        var a,
            t = URL.createObjectURL(t);

        if (t) {
          currentFileURL = t;
          var l = document.createElement("video");
          l.crossOrigin = "anonymous", l.controls = !0, l.muted = !0, l.src = t, l.load(), l.addEventListener("loadedmetadata", function () {
            videoDuration = l.duration, l.remove();
          });

          var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll("#overlayApp .section.disabled")),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              a = _step2.value;
              a.classList.remove("disabled");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          var _e = document.getElementById("addOverlay");

          _e.classList.remove("disabled");
        }
      }
    },
    validate: function validate() {
      if (currentFileURL) {
        var e = document.getElementById("overlayFrameCount").value,
            t = document.getElementById("overlayFrameRate").value,
            a = document.getElementById("overlayStart").value,
            l = document.getElementById("overlayEnd").value,
            r = document.getElementById("overlayQuality").value;
        e = e.length ? parseInt(e) : void 0, t = t.length ? parseInt(t) : void 0, a = a.length ? parseInt(a) : void 0, l = l.length ? parseInt(l) : void 0, r = r.length ? parseInt(r) / 100 : void 0;
        var n = {
          frameCount: e,
          frameRate: t,
          start: a,
          end: l,
          quality: r
        };
        events.emit("extractFrames", currentFileURL, n), this.hide();
      }
    }
  }
});
module.exports = overlayApp;