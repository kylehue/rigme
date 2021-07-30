"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Engine = /*#__PURE__*/function () {
  function Engine() {
    _classCallCheck(this, Engine);

    this.frameRate = 0, this.frameCount = 0, this._targetFrameRate = 60;
  }

  _createClass(Engine, [{
    key: "run",
    value: function run(n) {
      var t = performance.now();
      performance.now();
      var r,
          o = this;
      !function e() {
        r = (performance.now() - t) / 1e3, o.frameRate = 1 / r, t = performance.now(), o.frameCount++, "function" == typeof n && n(), requestAnimationFrame(e);
      }();
    }
  }]);

  return Engine;
}();

module.exports = {
  create: function create() {
    return new Engine();
  }
};