"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Circle = /*#__PURE__*/function () {
  function Circle(x, y, radius) {
    _classCallCheck(this, Circle);

    this.position = {
      x: x,
      y: y
    };
    this.size = {
      x: 1,
      y: 1
    };
    this.bounds = {};
    this.radius = radius;
    this.angle = 0;
    this.vertices = [];
    this.sides = Math.ceil(Math.max(10, Math.min(24, this.radius)));
    this.updateVertices();
  }

  _createClass(Circle, [{
    key: "updateVertices",
    value: function updateVertices(_sides) {
      var sides = _sides || this.sides;
      this.vertices = [];

      for (var angle = -Math.PI; angle < Math.PI; angle += Math.PI * 2 / sides) {
        var vertex = {
          x: this.position.x + Math.cos(angle) * this.radius,
          y: this.position.y + Math.sin(angle) * this.radius,
          angle: angle
        };
        this.vertices.push(vertex);
      }

      this.updateBounds();
    }
  }, {
    key: "updateBounds",
    value: function updateBounds() {
      var x = [];
      var y = [];

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        x.push(vertex.x);
        y.push(vertex.y);
      }

      this.bounds = {
        min: {
          x: Math.min.apply(Math, x),
          y: Math.min.apply(Math, y)
        },
        max: {
          x: Math.max.apply(Math, x),
          y: Math.max.apply(Math, y)
        }
      };
    }
  }, {
    key: "setRadius",
    value: function setRadius(radius) {
      if (radius == this.radius) return;
      this.radius = radius;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        vertex.x = this.position.x + Math.cos(vertex.angle + this.angle) * this.radius;
        vertex.y = this.position.y + Math.sin(vertex.angle + this.angle) * this.radius;
      }

      this.updateBounds();
    }
  }, {
    key: "scale",
    value: function scale(x, y) {
      if (x == this.size.x && y == this.size.y) return;
      var sizeDelta = {
        x: x - this.size.x,
        y: y - this.size.y
      };
      this.size.x = x;
      this.size.y = y;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var vertexDelta = {
          x: vertex.x - this.position.x,
          y: vertex.y - this.position.y
        };
        vertex.x = this.position.x + vertexDelta.x * (1 + sizeDelta.x);
        vertex.y = this.position.y + vertexDelta.y * (1 + sizeDelta.y);
      }

      this.updateBounds();
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      if (x == this.position.x && y == this.position.y) return;
      var delta = {
        x: x - this.position.x,
        y: y - this.position.y
      };
      this.position.x = x;
      this.position.y = y;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        vertex.x += delta.x;
        vertex.y += delta.y;
      }

      this.updateBounds();
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      if (angle == this.angle) return;
      var delta = angle - this.angle;
      this.angle = angle;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var x = (vertex.x - this.position.x) * Math.cos(delta) - (vertex.y - this.position.y) * Math.sin(delta);
        var y = (vertex.x - this.position.x) * Math.sin(delta) + (vertex.y - this.position.y) * Math.cos(delta);
        vertex.x = this.position.x + x;
        vertex.y = this.position.y + y;
      }

      this.updateBounds();
    }
  }]);

  return Circle;
}();

var Rectangle = /*#__PURE__*/function () {
  function Rectangle(x, y, width, height) {
    _classCallCheck(this, Rectangle);

    this.position = {
      x: x,
      y: y
    };
    this.size = {
      x: 1,
      y: 1
    };
    this.bounds = {};
    this.angle = 0;
    this.vertices = [];
    this.updateVertices(width, height);
  }

  _createClass(Rectangle, [{
    key: "updateVertices",
    value: function updateVertices(width, height) {
      this.vertices = [{
        x: this.position.x - width * 0.5,
        y: this.position.y - height * 0.5
      }, {
        x: this.position.x + width * 0.5,
        y: this.position.y - height * 0.5
      }, {
        x: this.position.x + width * 0.5,
        y: this.position.y + height * 0.5
      }, {
        x: this.position.x - width * 0.5,
        y: this.position.y + height * 0.5
      }];
      this.updateBounds();
    }
  }, {
    key: "updateBounds",
    value: function updateBounds() {
      var x = [];
      var y = [];

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        x.push(vertex.x);
        y.push(vertex.y);
      }

      this.bounds = {
        min: {
          x: Math.min.apply(Math, x),
          y: Math.min.apply(Math, y)
        },
        max: {
          x: Math.max.apply(Math, x),
          y: Math.max.apply(Math, y)
        }
      };
    }
  }, {
    key: "scale",
    value: function scale(x, y) {
      if (x == this.size.x && y == this.size.y) return;
      var sizeDelta = {
        x: x - this.size.x,
        y: y - this.size.y
      };
      this.size.x = x;
      this.size.y = y;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var vertexDelta = {
          x: vertex.x - this.position.x,
          y: vertex.y - this.position.y
        };
        vertex.x = this.position.x + vertexDelta.x * (1 + sizeDelta.x);
        vertex.y = this.position.y + vertexDelta.y * (1 + sizeDelta.y);
      }

      this.updateBounds();
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      if (x == this.position.x && y == this.position.y) return;
      var delta = {
        x: x - this.position.x,
        y: y - this.position.y
      };
      this.position.x = x;
      this.position.y = y;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        vertex.x += delta.x;
        vertex.y += delta.y;
      }

      this.updateBounds();
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      if (angle == this.angle) return;
      var delta = angle - this.angle;
      this.angle = angle;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var x = (vertex.x - this.position.x) * Math.cos(delta) - (vertex.y - this.position.y) * Math.sin(delta);
        var y = (vertex.x - this.position.x) * Math.sin(delta) + (vertex.y - this.position.y) * Math.cos(delta);
        vertex.x = this.position.x + x;
        vertex.y = this.position.y + y;
      }

      this.updateBounds();
    }
  }]);

  return Rectangle;
}();

var Polygon = /*#__PURE__*/function () {
  function Polygon(x, y, radius, sides) {
    _classCallCheck(this, Polygon);

    this.position = {
      x: x,
      y: y
    };
    this.size = {
      x: 1,
      y: 1
    };
    this.bounds = {};
    this.radius = radius;
    this.angle = 0;
    this.vertices = [];
    this.sides = sides;
    this.updateVertices();
  }

  _createClass(Polygon, [{
    key: "updateVertices",
    value: function updateVertices(sides) {
      this.sides = sides ? sides : this.sides;
      this.vertices = [];

      for (var angle = -Math.PI; angle < Math.PI; angle += Math.PI * 2 / this.sides) {
        var vertex = {
          x: this.position.x + Math.cos(angle) * this.radius,
          y: this.position.y + Math.sin(angle) * this.radius,
          angle: angle
        };
        this.vertices.push(vertex);
      }

      this.updateBounds();
    }
  }, {
    key: "updateBounds",
    value: function updateBounds() {
      var x = [];
      var y = [];

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        x.push(vertex.x);
        y.push(vertex.y);
      }

      this.bounds = {
        min: {
          x: Math.min.apply(Math, x),
          y: Math.min.apply(Math, y)
        },
        max: {
          x: Math.max.apply(Math, x),
          y: Math.max.apply(Math, y)
        }
      };
    }
  }, {
    key: "setRadius",
    value: function setRadius(radius) {
      if (radius == this.radius) return;
      this.radius = radius;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        vertex.x = this.position.x + Math.cos(vertex.angle + this.angle) * this.radius;
        vertex.y = this.position.y + Math.sin(vertex.angle + this.angle) * this.radius;
      }

      this.updateBounds();
    }
  }, {
    key: "scale",
    value: function scale(x, y) {
      if (x == this.size.x && y == this.size.y) return;
      var sizeDelta = {
        x: x - this.size.x,
        y: y - this.size.y
      };
      this.size.x = x;
      this.size.y = y;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var vertexDelta = {
          x: vertex.x - this.position.x,
          y: vertex.y - this.position.y
        };
        vertex.x = this.position.x + vertexDelta.x * (1 + sizeDelta.x);
        vertex.y = this.position.y + vertexDelta.y * (1 + sizeDelta.y);
      }

      this.updateBounds();
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      if (x == this.position.x && y == this.position.y) return;
      var delta = {
        x: x - this.position.x,
        y: y - this.position.y
      };
      this.position.x = x;
      this.position.y = y;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        vertex.x += delta.x;
        vertex.y += delta.y;
      }

      this.updateBounds();
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      if (angle == this.angle) return;
      var delta = angle - this.angle;
      this.angle = angle;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var x = (vertex.x - this.position.x) * Math.cos(delta) - (vertex.y - this.position.y) * Math.sin(delta);
        var y = (vertex.x - this.position.x) * Math.sin(delta) + (vertex.y - this.position.y) * Math.cos(delta);
        vertex.x = this.position.x + x;
        vertex.y = this.position.y + y;
      }

      this.updateBounds();
    }
  }]);

  return Polygon;
}();

module.exports = {
  circle: function circle(x, y, radius) {
    x = x || 0;
    y = y || 0;
    radius = radius || 0;
    return new Circle(x, y, radius);
  },
  rect: function rect(x, y, width, height) {
    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;
    return new Rectangle(x, y, width, height);
  },
  polygon: function polygon(x, y, radius, sides) {
    x = x || 0;
    y = y || 0;
    radius = radius || 0;
    sides = sides || 0;
    return new Polygon(x, y, radius, sides);
  },
  SAT: function SAT(shapeA, shapeB) {
    var getAxes = function getAxes(vertices) {
      var axes = [];

      for (var i = 0; i < vertices.length; i++) {
        var currentVertex = vertices[i];
        var nextVertex = vertices[i + 1 == vertices.length ? 0 : i + 1];
        var axisNormal = {
          x: nextVertex.y - currentVertex.y,
          y: -(nextVertex.x - currentVertex.x)
        };
        axes.push(axisNormal);
      }

      return axes;
    };

    var getProjection = function getProjection(axis, vertices) {
      var min = Infinity;
      var max = -Infinity;

      for (var i = 0; i < this.vertices.length; i++) {
        var vertex = this.vertices[i];
        var projection = axis.x * vertex.x + axis.y * vertex.y;
        min = projection < min ? projection : min;
        max = projection > max ? projection : max;
      }

      return {
        min: min,
        max: max
      };
    };

    var getResult = function getResult(verticesA, verticesB) {
      var axesA = getAxes(verticesA);
      var axesB = getAxes(verticesB);

      for (var i = 0; i < axesA.length; i++) {
        var axis = axesA[i];
        var projectionA = getProjection(axis, verticesA);
        var projectionB = getProjection(axis, verticesB);

        if (!(projectionB.max >= projectionA.min && projectionA.max >= projectionB.min)) {
          return false;
        }
      }

      for (var i = 0; i < axesB.length; i++) {
        var _axis = axesB[i];

        var _projectionA = getProjection(_axis, verticesA);

        var _projectionB = getProjection(_axis, verticesB);

        if (!(_projectionB.max >= _projectionA.min && _projectionA.max >= _projectionB.min)) {
          return false;
        }
      }

      return true;
    };

    return getResult(shapeA.vertices, shapeB.vertices);
  }
};