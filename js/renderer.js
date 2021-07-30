"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var camera = require("./../lib/camera.js");

var engine = require("./engine.js");

var Renderer = /*#__PURE__*/function () {
  function Renderer() {
    _classCallCheck(this, Renderer);

    this.canvas = document.getElementById("gameCanvas");
    this.bounds = this.canvas.getBoundingClientRect();
    this.context = this.canvas.getContext("2d");
    this.camera = camera.create(this.context);
    this.engine = engine.create();
    this.offscreen = 0;
    this.context.offscreens = [];
    this._customOptions = ["fill", "stroke", "align", "close", "curve"];
    this._currentContext = this.context;
    this._render = null;

    var _preventDefault = function _preventDefault(event) {
      event.preventDefault();
    };

    this.canvas.addEventListener("drag", _preventDefault);
    this.canvas.addEventListener("dragstart", _preventDefault);
  }

  _createClass(Renderer, [{
    key: "draw",
    value: function draw(f) {
      this._render = f;

      if (typeof this._render == "function") {
        this._render();
      }
    }
  }, {
    key: "redraw",
    value: function redraw() {
      if (typeof this._render == "function") {
        this._render();
      }
    }
  }, {
    key: "render",
    value: function render(f) {
      var _this = this;

      if (typeof f !== "function") return;
      this.engine.run(function () {
        _this.clear();

        f();
        if (!_this.context.offscreens.length) return;

        _this.drawOffscreens();
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
    value: function setSize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.bounds = this.canvas.getBoundingClientRect();

      var _iterator = _createForOfIteratorHelper(this.context.offscreens),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var context = _step.value;
          context.canvas.width = this.canvas.width;
          context.canvas.height = this.canvas.height;
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

      this.setSize(innerWidth, innerHeight);
      addEventListener("resize", function () {
        _this2.setSize(innerWidth, innerHeight);
      });
    }
  }, {
    key: "createLayer",
    value: function createLayer() {
      var canvas = document.createElement("canvas");
      canvas.width = this.canvas.width;
      canvas.height = this.canvas.height;
      var context = canvas.getContext("2d");
      var data = {
        camera: this.camera
      };
      context.rendererData = data;
      this.context.offscreens.push(context);
      return context;
    }
  }, {
    key: "drawOffscreens",
    value: function drawOffscreens() {
      var _this3 = this;

      var _loop = function _loop() {
        var context = _this3.context.offscreens[i];
        context.rendererData.camera.begin(function () {
          _this3.context.drawImage(context.canvas, 0, 0, context.canvas.width, context.canvas.height);
        });
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      };

      for (var i = 0; i < this.context.offscreens.length; i++) {
        _loop();
      }
    }
  }, {
    key: "line",
    value: function line(x1, y1, x2, y2, options, context) {
      var ctx = context || this.context;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);

      this._hasProperty(options, "close", function () {
        ctx.closePath();
      });

      this._evaluateOptions(options, ctx);
    }
  }, {
    key: "circle",
    value: function circle(x, y, radius, options, context) {
      var ctx = context || this.context;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      this._hasProperty(options, "close", function () {
        ctx.closePath();
      });

      this._evaluateOptions(options, ctx);
    }
  }, {
    key: "rect",
    value: function rect(x, y, width, height, options, context) {
      var ctx = context || this.context;

      this._hasProperty(options, "align", function (opt) {
        var alignment = opt.split(" ");

        if (alignment[0]) {
          if (alignment[0] == "center" || alignment[0] == "middle") {
            x -= width * 0.5;
          } else if (alignment[0] == "right") {
            x -= width;
          }
        }

        if (alignment[1]) {
          if (alignment[1] == "center" || alignment[0] == "middle") {
            y -= height * 0.5;
          } else if (alignment[1] == "bottom") {
            y -= height;
          }
        }
      });

      ctx.beginPath();
      ctx.rect(x, y, width, height);

      this._hasProperty(options, "close", function () {
        ctx.closePath();
      });

      this._evaluateOptions(options, ctx);
    }
  }, {
    key: "fromVertices",
    value: function fromVertices(vertices, options, context) {
      var ctx = context || this.context;
      if (!vertices.length) return;
      ctx.beginPath();

      if (!this._hasProperty(options, "curve")) {
        ctx.moveTo(vertices[0].x, vertices[0].y);

        for (var i = 0; i < vertices.length; i++) {
          var vertex = vertices[i];
          ctx.lineTo(vertex.x, vertex.y);
        }
      }

      this._hasProperty(options, "curve", function () {
        ctx.beginPath();
        var first = vertices[0];
        var next = vertices[1];
        var mx = (first.x + next.x) * 0.5;
        var my = (first.y + next.y) * 0.5;
        ctx.moveTo(mx, my);

        for (var i = 1; i < vertices.length; i++) {
          var current = vertices[i];
          var _next = vertices[i + 1 == vertices.length ? 0 : i + 1];

          var _mx = (_next.x + current.x) * 0.5;

          var _my = (_next.y + current.y) * 0.5;

          ctx.quadraticCurveTo(current.x, current.y, _mx, _my);
        }

        ctx.quadraticCurveTo(first.x, first.y, mx, my);
        ctx.lineJoin = "round";
      });

      this._hasProperty(options, "close", function () {
        ctx.closePath();
      });

      this._evaluateOptions(options, ctx);
    }
  }, {
    key: "text",
    value: function text(_text, x, y, options, context) {
      var ctx = context || this.context;

      this._hasProperty(options, "align", function (opt) {
        var alignment = opt.split(" ");

        if (alignment[0]) {
          if (alignment[0] == "left") {
            ctx.textAlign = "start";
          } else if (alignment[0] == "center" || alignment[0] == "middle") {
            ctx.textAlign = "center";
          } else if (alignment[0] == "right") {
            ctx.textAlign = "right";
          }
        }

        if (alignment[1]) {
          if (alignment[1] == "top") {
            ctx.textBaseline = "start";
          } else if (alignment[1] == "center" || alignment[0] == "middle") {
            ctx.textBaseline = "middle";
          } else if (alignment[1] == "bottom") {
            ctx.textBaseline = "bottom";
          }
        }
      });

      ctx.beginPath();

      this._evaluateOptions(options, ctx);

      this._hasProperty(options, "stroke", function () {
        ctx.strokeText(_text, x, y);
      });

      this._hasProperty(options, "fill", function () {
        ctx.fillText(_text, x, y);
      });

      this._hasProperty(options, "close", function () {
        ctx.closePath();
      });
    }
  }, {
    key: "clear",
    value: function clear(context) {
      var ctx = context || this.context;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "save",
    value: function save(context) {
      var ctx = context || this.context;
      ctx.save();
    }
  }, {
    key: "restore",
    value: function restore(context) {
      var ctx = context || this.context;
      ctx.restore();
    }
  }, {
    key: "clip",
    value: function clip(context) {
      var ctx = context || this.context;
      ctx.clip();
    }
  }, {
    key: "fill",
    value: function fill(color, context) {
      var ctx = context || this.context;
      ctx.fillStyle = color;
      ctx.fill();
    }
  }, {
    key: "stroke",
    value: function stroke(color, context) {
      var ctx = context || this.context;
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  }, {
    key: "_evaluateOptions",
    value: function _evaluateOptions(options, context) {
      var ctx = context || this.context;
      if (!options) return;
      var keys = Object.keys(options);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key == "stroke") ctx.strokeStyle = options[key];
        if (key == "fill") ctx.fillStyle = options[key];
        if (this._customOptions.includes(key)) continue;
        ctx[key] = options[key];
      }

      if (options.stroke) this.stroke(options.stroke, ctx);
      if (options.fill) this.fill(options.fill, ctx);
    }
  }, {
    key: "_hasProperty",
    value: function _hasProperty(options, name, callback) {
      if (options) {
        if (!options[name]) return false;
        if (typeof callback == "function") callback(options[name]);
        return options[name];
      }
    }
  }]);

  return Renderer;
}();

module.exports = new Renderer();