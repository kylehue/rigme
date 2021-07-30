function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function lerp(start, stop, per) {
  return per * (stop - start) + start;
}
/*
*Modified version of robashton's camera
*Repository link:
*https://github.com/robashton/camera
*/


var Camera2D = /*#__PURE__*/function () {
  function Camera2D(context, options) {
    _classCallCheck(this, Camera2D);

    options = options || {};
    this.movement = {
      x: 0,
      y: 0
    };
    this.viewport = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: 0,
      height: 0,
      scale: [1.0, 1.0]
    };
    this.distance = 0;
    this.context = context || null;
    this.fieldOfView = options.fieldOfView || Math.PI / 4.0;
    this.moveSpeed = options.moveSpeed || 1;
    this.zoomSpeed = options.zoomSpeed || 1;
    this.scaleSpeed = options.scaleSpeed || 1;
  }

  _createClass(Camera2D, [{
    key: "setContext",
    value: function setContext(context) {
      this.context = context;
      this.updateViewport();
    }
  }, {
    key: "setMoveSpeed",
    value: function setMoveSpeed(speed) {
      this.moveSpeed = speed;
    }
  }, {
    key: "setZoomSpeed",
    value: function setZoomSpeed(speed) {
      this.zoomSpeed = speed;
    }
  }, {
    key: "setScaleSpeed",
    value: function setScaleSpeed(speed) {
      this.scaleSpeed = speed;
    }
  }, {
    key: "begin",
    value: function begin(f) {
      if (typeof f != "function") return;
      this.context.save();
      this.applyScale();
      this.applyTranslation();
      f(this);
      this.context.restore();
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
      this.aspectRatio = this.context.canvas.width / this.context.canvas.height;
      this.viewport.width = lerp(this.viewport.width, this.distance * Math.tan(this.fieldOfView), this.scaleSpeed);
      this.viewport.height = lerp(this.viewport.height, this.viewport.width / this.aspectRatio, this.scaleSpeed);
      this.viewport.left = this.movement.x - this.viewport.width / 2;
      this.viewport.top = this.movement.y - this.viewport.height / 2;
      this.viewport.right = this.viewport.left + this.viewport.width;
      this.viewport.bottom = this.viewport.top + this.viewport.height;
      this.viewport.scale[0] = this.context.canvas.width / this.viewport.width;
      this.viewport.scale[1] = this.context.canvas.height / this.viewport.height;
    }
  }, {
    key: "zoomTo",
    value: function zoomTo(z) {
      this.distance = lerp(this.distance, z, this.zoomSpeed);
      this.updateViewport();
    }
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      this.movement.x = lerp(this.movement.x, x, this.moveSpeed);
      this.movement.y = lerp(this.movement.y, y, this.moveSpeed);
      this.updateViewport();
    }
  }, {
    key: "screenToWorld",
    value: function screenToWorld(x, y, obj) {
      obj = obj || {
        x: x / this.viewport.scale[0] + this.viewport.left,
        y: y / this.viewport.scale[1] + this.viewport.top
      };
      return obj;
    }
  }, {
    key: "worldToScreen",
    value: function worldToScreen(x, y, obj) {
      obj = obj || {
        x: (x - this.viewport.left) * this.viewport.scale[0],
        y: (y - this.viewport.top) * this.viewport.scale[1]
      };
      return obj;
    }
  }]);

  return Camera2D;
}();

module.exports = {
  create: function create(context, options) {
    return new Camera2D(context, options);
  }
};