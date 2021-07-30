"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var camera = require("./../lib/camera.js"),
    engine = require("./engine.js");

var Renderer = /*#__PURE__*/function () {
  function Renderer() {
    _classCallCheck(this, Renderer);

    this.canvas = document.getElementById("gameCanvas"), this.bounds = this.canvas.getBoundingClientRect(), this.context = this.canvas.getContext("2d"), this.camera = camera.create(this.context), this.engine = engine.create(), this.offscreen = 0, this.context.offscreens = [], this._customOptions = ["fill", "stroke", "align", "close", "curve"], this._currentContext = this.context, this._render = null;

    var t = function t(_t) {
      _t.preventDefault();
    };

    this.canvas.addEventListener("drag", t), this.canvas.addEventListener("dragstart", t);
  }

  _createClass(Renderer, [{
    key: "draw",
    value: function draw(t) {
      this._render = t, "function" == typeof this._render && this._render();
    }
  }, {
    key: "redraw",
    value: function redraw() {
      "function" == typeof this._render && this._render();
    }
  }, {
    key: "render",
    value: function render(t) {
      var _this = this;

      "function" == typeof t && this.engine.run(function () {
        _this.clear(), t(), _this.context.offscreens.length && _this.drawOffscreens();
      });
    }
  }, {
    key: "getFrameCount",
    value: function getFrameCount() {
      return this.engine.frameCount;
    }
  }, {
    key: "getFrameRate",
    value: function getFrameRate() {
      return this.engine.frameRate;
    }
  }, {
    key: "setSize",
    value: function setSize(t, e) {
      this.canvas.width = t, this.canvas.height = e, this.bounds = this.canvas.getBoundingClientRect();

      var _iterator = _createForOfIteratorHelper(this.context.offscreens),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var s = _step.value;
          s.canvas.width = this.canvas.width, s.canvas.height = this.canvas.height;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "fullscreen",
    value: function fullscreen() {
      var _this2 = this;

      this.setSize(innerWidth, innerHeight), addEventListener("resize", function () {
        _this2.setSize(innerWidth, innerHeight);
      });
    }
  }, {
    key: "createLayer",
    value: function createLayer() {
      var t = document.createElement("canvas");
      t.width = this.canvas.width, t.height = this.canvas.height;
      var e = t.getContext("2d");
      var s = {
        camera: this.camera
      };
      return e.rendererData = s, this.context.offscreens.push(e), e;
    }
  }, {
    key: "drawOffscreens",
    value: function drawOffscreens() {
      var _this3 = this;

      var _loop = function _loop() {
        var t = _this3.context.offscreens[e];
        t.rendererData.camera.begin(function () {
          _this3.context.drawImage(t.canvas, 0, 0, t.canvas.width, t.canvas.height);
        }), t.clearRect(0, 0, t.canvas.width, t.canvas.height);
      };

      for (var e = 0; e < this.context.offscreens.length; e++) {
        _loop();
      }
    }
  }, {
    key: "line",
    value: function line(t, e, s, i, n, r) {
      var a = r || this.context;
      a.beginPath(), a.moveTo(t, e), a.lineTo(s, i), this._hasProperty(n, "close", function () {
        a.closePath();
      }), this._evaluateOptions(n, a);
    }
  }, {
    key: "circle",
    value: function circle(t, e, s, i, n) {
      var r = n || this.context;
      r.beginPath(), r.arc(t, e, s, 0, 2 * Math.PI), this._hasProperty(i, "close", function () {
        r.closePath();
      }), this._evaluateOptions(i, r);
    }
  }, {
    key: "rect",
    value: function rect(e, s, i, n, t, r) {
      var a = r || this.context;
      this._hasProperty(t, "align", function (t) {
        t = t.split(" ");
        t[0] && ("center" == t[0] || "middle" == t[0] ? e -= .5 * i : "right" == t[0] && (e -= i)), t[1] && ("center" == t[1] || "middle" == t[0] ? s -= .5 * n : "bottom" == t[1] && (s -= n));
      }), a.beginPath(), a.rect(e, s, i, n), this._hasProperty(t, "close", function () {
        a.closePath();
      }), this._evaluateOptions(t, a);
    }
  }, {
    key: "fromVertices",
    value: function fromVertices(h, t, e) {
      var o = e || this.context;

      if (h.length) {
        if (o.beginPath(), !this._hasProperty(t, "curve")) {
          o.moveTo(h[0].x, h[0].y);

          for (var s = 0; s < h.length; s++) {
            var i = h[s];
            o.lineTo(i.x, i.y);
          }
        }

        this._hasProperty(t, "curve", function () {
          o.beginPath();
          var t = h[0],
              e = h[1],
              s = .5 * (t.x + e.x),
              e = .5 * (t.y + e.y);
          o.moveTo(s, e);

          for (var i = 1; i < h.length; i++) {
            var n = h[i],
                r = h[i + 1 == h.length ? 0 : i + 1],
                a = .5 * (r.x + n.x),
                r = .5 * (r.y + n.y);
            o.quadraticCurveTo(n.x, n.y, a, r);
          }

          o.quadraticCurveTo(t.x, t.y, s, e), o.lineJoin = "round";
        }), this._hasProperty(t, "close", function () {
          o.closePath();
        }), this._evaluateOptions(t, o);
      }
    }
  }, {
    key: "text",
    value: function text(t, e, s, i, n) {
      var r = n || this.context;
      this._hasProperty(i, "align", function (t) {
        t = t.split(" ");
        t[0] && ("left" == t[0] ? r.textAlign = "start" : "center" == t[0] || "middle" == t[0] ? r.textAlign = "center" : "right" == t[0] && (r.textAlign = "right")), t[1] && ("top" == t[1] ? r.textBaseline = "start" : "center" == t[1] || "middle" == t[0] ? r.textBaseline = "middle" : "bottom" == t[1] && (r.textBaseline = "bottom"));
      }), r.beginPath(), this._evaluateOptions(i, r), this._hasProperty(i, "stroke", function () {
        r.strokeText(t, e, s);
      }), this._hasProperty(i, "fill", function () {
        r.fillText(t, e, s);
      }), this._hasProperty(i, "close", function () {
        r.closePath();
      });
    }
  }, {
    key: "clear",
    value: function clear(t) {
      var e = t || this.context;
      e.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "save",
    value: function save(t) {
      var e = t || this.context;
      e.save();
    }
  }, {
    key: "restore",
    value: function restore(t) {
      var e = t || this.context;
      e.restore();
    }
  }, {
    key: "clip",
    value: function clip(t) {
      var e = t || this.context;
      e.clip();
    }
  }, {
    key: "fill",
    value: function fill(t, e) {
      var s = e || this.context;
      s.fillStyle = t, s.fill();
    }
  }, {
    key: "stroke",
    value: function stroke(t, e) {
      var s = e || this.context;
      s.strokeStyle = t, s.stroke();
    }
  }, {
    key: "_evaluateOptions",
    value: function _evaluateOptions(t, e) {
      var s = e || this.context;

      if (t) {
        for (var i = Object.keys(t), n = 0; n < i.length; n++) {
          var r = i[n];
          "stroke" == r && (s.strokeStyle = t[r]), "fill" == r && (s.fillStyle = t[r]), this._customOptions.includes(r) || (s[r] = t[r]);
        }

        t.stroke && this.stroke(t.stroke, s), t.fill && this.fill(t.fill, s);
      }
    }
  }, {
    key: "_hasProperty",
    value: function _hasProperty(t, e, s) {
      if (t) return !!t[e] && ("function" == typeof s && s(t[e]), t[e]);
    }
  }]);

  return Renderer;
}();

module.exports = new Renderer();