"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function lerp(t, e, i) {
  return i * (e - t) + t;
}

var Camera2D = /*#__PURE__*/function () {
  function Camera2D(t, e) {
    _classCallCheck(this, Camera2D);

    e = e || {}, this.movement = {
      x: 0,
      y: 0
    }, this.viewport = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
      scale: [1, 1]
    }, this.distance = 0, this.context = t || null, this.fieldOfView = e.fieldOfView || Math.PI / 4, this.moveSpeed = e.moveSpeed || 1, this.zoomSpeed = e.zoomSpeed || 1, this.scaleSpeed = e.scaleSpeed || 1;
  }

  _createClass(Camera2D, [{
    key: "setContext",
    value: function setContext(t) {
      this.context = t, this.updateViewport();
    }
  }, {
    key: "setMoveSpeed",
    value: function setMoveSpeed(t) {
      this.moveSpeed = t;
    }
  }, {
    key: "setZoomSpeed",
    value: function setZoomSpeed(t) {
      this.zoomSpeed = t;
    }
  }, {
    key: "setScaleSpeed",
    value: function setScaleSpeed(t) {
      this.scaleSpeed = t;
    }
  }, {
    key: "begin",
    value: function begin(t) {
      "function" == typeof t && (this.context.save(), this.applyScale(), this.applyTranslation(), t(this), this.context.restore());
    }
  }, {
    key: "applyScale",
    value: function applyScale() {
      this.context.scale(this.viewport.scale[0], this.viewport.scale[1]);
    }
  }, {
    key: "applyTranslation",
    value: function applyTranslation() {
      this.context.translate(-this.viewport.left, -this.viewport.top);
    }
  }, {
    key: "updateViewport",
    value: function updateViewport() {
      this.aspectRatio = this.context.canvas.width / this.context.canvas.height, this.viewport.width = lerp(this.viewport.width, this.distance * Math.tan(this.fieldOfView), this.scaleSpeed), this.viewport.height = lerp(this.viewport.height, this.viewport.width / this.aspectRatio, this.scaleSpeed), this.viewport.left = this.movement.x - this.viewport.width / 2, this.viewport.top = this.movement.y - this.viewport.height / 2, this.viewport.right = this.viewport.left + this.viewport.width, this.viewport.bottom = this.viewport.top + this.viewport.height, this.viewport.scale[0] = this.context.canvas.width / this.viewport.width, this.viewport.scale[1] = this.context.canvas.height / this.viewport.height;
    }
  }, {
    key: "zoomTo",
    value: function zoomTo(t) {
      this.distance = lerp(this.distance, t, this.zoomSpeed), this.updateViewport();
    }
  }, {
    key: "moveTo",
    value: function moveTo(t, e) {
      this.movement.x = lerp(this.movement.x, t, this.moveSpeed), this.movement.y = lerp(this.movement.y, e, this.moveSpeed), this.updateViewport();
    }
  }, {
    key: "screenToWorld",
    value: function screenToWorld(t, e, i) {
      return i = i || {
        x: t / this.viewport.scale[0] + this.viewport.left,
        y: e / this.viewport.scale[1] + this.viewport.top
      };
    }
  }, {
    key: "worldToScreen",
    value: function worldToScreen(t, e, i) {
      return i = i || {
        x: (t - this.viewport.left) * this.viewport.scale[0],
        y: (e - this.viewport.top) * this.viewport.scale[1]
      };
    }
  }]);

  return Camera2D;
}();

module.exports = {
  create: function create(t, e) {
    return new Camera2D(t, e);
  }
};