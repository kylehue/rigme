"use strict";

var Engine = /*#__PURE__*/function () {
  function Engine() {
    this.frameRate = 0;
    this.frameCount = 0;
    this._targetFrameRate = 60;
  }

  var _proto = Engine.prototype;

  _proto.run = function run(f) {
    var startTime = performance.now();
    var lastRun = performance.now();
    var delta;
    var engine = this;

    (function animate() {
      delta = (performance.now() - startTime) / 1000;
      engine.frameRate = 1 / delta;
      startTime = performance.now();
      engine.frameCount++;
      if (typeof f == "function") f();
      requestAnimationFrame(animate);
    })();
  };

  return Engine;
}();

module.exports = {
  create: function create() {
    return new Engine();
  }
};