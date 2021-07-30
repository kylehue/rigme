"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e74) { throw _e74; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e75) { didErr = true; err = _e75; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (i) {
  var n = {};

  function r(e) {
    if (n[e]) return n[e].exports;
    var t = n[e] = {
      i: e,
      l: !1,
      exports: {}
    };
    return i[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports;
  }

  r.m = i, r.c = n, r.d = function (e, t, i) {
    r.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: i
    });
  }, r.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, r.t = function (t, e) {
    if (1 & e && (t = r(t)), 8 & e) return t;
    if (4 & e && "object" == _typeof(t) && t && t.__esModule) return t;
    var i = Object.create(null);
    if (r.r(i), Object.defineProperty(i, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var n in t) {
      r.d(i, n, function (e) {
        return t[e];
      }.bind(null, n));
    }
    return i;
  }, r.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return r.d(t, "a", t), t;
  }, r.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, r.p = "", r(r.s = 22);
}([function (e, t) {
  var r = [];
  var a = 6;
  e.exports = {
    loadImage: function loadImage(e) {
      var _this = this;

      var r = new Image();
      return r.crossOrigin = "anonymous", r.src = e, new Promise(function (n, e) {
        r.onload = function () {
          var e = document.createElement("canvas"),
              t = e.getContext("2d");

          var i = _this.scaleSize(r.width, r.height, 360, 240);

          e.width = i.width, e.height = i.height, t.drawImage(r, 0, 0, e.width, e.height);
          i = e.toDataURL("image/png");
          n({
            url: i,
            width: e.width,
            height: e.height,
            image: e
          });
        };
      });
    },
    uid: function uid() {
      var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          i = "";

      function e() {
        i = "";

        for (var e = 0; e < a; e++) {
          i += t[Math.floor(Math.random() * t.length)];
        }
      }

      e();

      for (var n = performance.now(); r.includes(i);) {
        20 < performance.now() - n && a++, e();
      }

      return r.push(i), i;
    },
    lerp: function lerp(e, t, i) {
      return i * (t - e) + e;
    },
    dist: function dist(e, t, i, n) {
      return Math.sqrt((i - e) * (i - e) + (n - t) * (n - t));
    },
    map: function map(e, t, i, n, r) {
      return (e - t) / (i - t) * (r - n) + n;
    },
    random: function random() {
      if (2 == arguments.length && "number" == typeof arguments[0] && "number" == typeof arguments[1]) return Math.random() * (arguments[1] - arguments[0]) + arguments[0];
      if (1 == arguments.length && "number" == typeof arguments[0]) return Math.random() * arguments[0];
      if (Array.isArray(arguments[0])) return arguments[0][Math.floor(Math.random() * arguments[0].length)];

      if (2 < arguments.length) {
        var e = Array.prototype.slice.call(arguments);
        return e[Math.floor(Math.random() * e.length)];
      }
    },
    clamp: function clamp(e, t, i) {
      var n = e < t ? t : e;
      return n = n > i ? i : n, n;
    },
    getRandomColor: function getRandomColor() {
      return this.random(["#ff3b3b", "#ff763b", "#ffdb3b", "#c4ff3b", "#76ff3b", "#3bff8d", "#3bc1ff", "#3b48ff", "#963bff", "#de3bff", "#ff3b96"]);
    },
    loadJSONData: function loadJSONData(i, n) {
      var r = localStorage.getItem(i);

      if (r) {
        var _e,
            _t = !1;

        try {
          _e = JSON.parse(r);
        } catch (i) {
          _t = !0, console.warn("Couldn't load autosaved data.");
        }

        _e && !_t && "function" == typeof n && n(_e);
      }
    },
    degrees: function degrees(e) {
      return e * (180 / Math.PI);
    },
    radians: function radians(e) {
      return e * (Math.PI / 180);
    },
    scaleSize: function scaleSize(e, t, i, n) {
      n = Math.min(i / e, n / t);
      return {
        width: e * n,
        height: t * n
      };
    }
  };
}, function (e, t, i) {
  var n = i(0);
  var r = !1,
      i = new ( /*#__PURE__*/function () {
    function _class() {
      _classCallCheck(this, _class);

      this.emits = {}, this.listeners = [], this.maxListeners = 100;
    }

    _createClass(_class, [{
      key: "setMaxListeners",
      value: function setMaxListeners(e) {
        this.maxListeners = e;
      }
    }, {
      key: "removeListener",
      value: function removeListener(t, i) {
        var e = this.listeners.find(function (e) {
          return e[t] === i;
        });
        if (i || (e = t), e) for (var n = 0; n < this.listeners.length; n++) {
          if (this.listeners[n].id === e.id) {
            this.listeners.splice(n, 1);
            break;
          }
        }
      }
    }, {
      key: "emit",
      value: function emit(e) {
        if (e) {
          var _t2 = [];

          for (var n = 0; n < arguments.length; n++) {
            _t2.push(arguments[n]);
          }

          _t2.shift(), this.emits[e] = _t2;
          var _i = [];

          for (n = 0; n < this.listeners.length; n++) {
            var r = this.listeners[n];
            r.name === e && _i.push(r);
          }

          for (n = 0; n < _i.length; n++) {
            var _e2 = _i[n];
            "function" == typeof _e2.method && (_e2.method.apply(_e2, _t2), _e2.once && this.removeListener("id", _e2.id));
          }
        }
      }
    }, {
      key: "on",
      value: function on(e, t) {
        if (e && t && "function" == typeof t) {
          t = {
            id: n.uid(),
            name: e,
            method: t,
            once: r
          };
          return this.listeners.push(t), this.listeners.length >= this.maxListeners && (this.listeners.shift(), console.warn("Reached the max number of listeners.")), t;
        }
      }
    }, {
      key: "once",
      value: function once(e, t) {
        r = !0;
        t = this.on(e, t);
        return r = !1, t;
      }
    }]);

    return _class;
  }())();
  e.exports = i;
}, function (e, t, i) {
  var r = i(4),
      a = i(0);
  var o,
      n = [],
      s = !1,
      l = null,
      h = {};

  var c = function c(e) {
    l && "function" == typeof l._dragEnd && l._dragEnd(e), s = !1, l = null;
  };

  addEventListener("mousemove", function (n) {
    if (s && l) {
      n.preventDefault();

      var _e3 = h.x - n.clientX,
          _t3 = h.y - n.clientY,
          _i2 = {
        x: l.offsetLeft - _e3,
        y: l.offsetTop - _t3
      };

      l._restrictDrag && (_i2.x = a.clamp(_i2.x, 0, innerWidth - o.width), _i2.y = a.clamp(_i2.y, 0, innerHeight - o.height)), _i2.x < innerWidth - o.width && 0 < _i2.x && (h.x = n.clientX, l.style.left = _i2.x + "px"), _i2.x >= innerWidth - o.width && (l.style.left = innerWidth - o.width + "px"), _i2.x <= 0 && (l.style.left = "0px"), _i2.y < innerHeight - o.height && 0 < _i2.y && (h.y = n.clientY, l.style.top = _i2.y + "px"), _i2.y >= innerHeight - o.height && (l.style.top = innerHeight - o.height + "px"), _i2.y <= 0 && (l.style.top = "0px"), "function" == typeof l._drag && l._drag(n);
    }

    r.pressed || c();
  }), addEventListener("mousedown", function (e) {
    n.includes(e.target._dragRoot) && (e.preventDefault(), s = !0, l = e.target._dragRoot, o = l.getBoundingClientRect(), h.x = e.clientX, h.y = e.clientY, "function" == typeof l._dragStart && l._dragStart(e));
  }), addEventListener("mouseup", c);

  var d = /*#__PURE__*/function () {
    function d() {
      _classCallCheck(this, d);
    }

    _createClass(d, [{
      key: "query",
      value: function query(e, t) {
        if ("object" == _typeof(e)) return new p(e);
        var i = this.node || document;
        if (!t) return new p(i.querySelector(e));
        var n = i.querySelectorAll(e),
            r = [];

        for (var a = 0; a < n.length; a++) {
          var o = new p(n[a]);
          r.push(o);
        }

        return new u(r);
      }
    }, {
      key: "create",
      value: function create(e) {
        var t = document.createElement(e),
            e = new p(t);
        return this.node && this.node.appendChild(t), e;
      }
    }]);

    return d;
  }();

  var u = /*#__PURE__*/function () {
    function u(e) {
      _classCallCheck(this, u);

      this.elements = e || [];
    }

    _createClass(u, [{
      key: "on",
      value: function on(e, t) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].on(e, t);
        }
      }
    }, {
      key: "append",
      value: function append(t) {
        if (t instanceof u) for (var i = 0; i < this.elements.length; i++) {
          var _e4 = this.elements[i];

          for (var n = 0; n < t.elements.length; n++) {
            _e4.append(t.elements[n]);
          }
        } else for (i = 0; i < this.elements.length; i++) {
          this.elements[i].append(t);
        }
      }
    }, {
      key: "value",
      value: function value(e) {
        for (var t = 0; t < this.elements.length; t++) {
          this.elements[t].value(e);
        }
      }
    }, {
      key: "query",
      value: function query(t) {
        var i = [];
        var e;
        if ("string" == typeof t) for (var n = 0; n < this.elements.length; n++) {
          var _e5 = this.elements[n];
          _e5.node.matches(t) && i.push(_e5);
        } else "object" == _typeof(t) && (e = new p(t), i.push(e));
        return new u(i);
      }
    }, {
      key: "text",
      value: function text(e, t) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].text(e, t);
        }

        return this;
      }
    }, {
      key: "html",
      value: function html(e, t) {
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].html(e, t);
        }

        return this;
      }
    }, {
      key: "addClass",
      value: function addClass() {
        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        for (t = 0; t < this.elements.length; t++) {
          var _this$elements$t;

          (_this$elements$t = this.elements[t]).addClass.apply(_this$elements$t, e);
        }

        return this;
      }
    }, {
      key: "removeClass",
      value: function removeClass() {
        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        for (t = 0; t < this.elements.length; t++) {
          var _this$elements$t2;

          (_this$elements$t2 = this.elements[t]).removeClass.apply(_this$elements$t2, e);
        }

        return this;
      }
    }, {
      key: "toggleClass",
      value: function toggleClass() {
        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        for (t = 0; t < this.elements.length; t++) {
          var _this$elements$t3;

          (_this$elements$t3 = this.elements[t]).toggleClass.apply(_this$elements$t3, e);
        }

        return this;
      }
    }, {
      key: "except",
      value: function except(t) {
        var i = [];

        for (var n = 0; n < this.elements.length; n++) {
          var _e6 = this.elements[n];
          _e6.node.matches(t) || i.push(_e6);
        }

        return new u(i);
      }
    }, {
      key: "draggable",
      value: function draggable(e) {
        e = e || {};

        for (var t = 0; t < this.elements.length; t++) {
          this.elements[t].node.draggable(e);
        }
      }
    }, {
      key: "css",
      value: function css() {
        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        for (t = 0; t < this.elements.length; t++) {
          var _this$elements$t4;

          (_this$elements$t4 = this.elements[t]).css.apply(_this$elements$t4, e);
        }

        return this;
      }
    }, {
      key: "prop",
      value: function prop() {
        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        for (t = 0; t < this.elements.length; t++) {
          var _this$elements$t5;

          (_this$elements$t5 = this.elements[t]).prop.apply(_this$elements$t5, e);
        }

        return this;
      }
    }, {
      key: "attr",
      value: function attr() {
        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        for (t = 0; t < this.elements.length; t++) {
          var _this$elements$t6;

          (_this$elements$t6 = this.elements[t]).attr.apply(_this$elements$t6, e);
        }

        return this;
      }
    }, {
      key: "remove",
      value: function remove() {
        for (var t = 0; t < this.elements.length; t++) {
          var _e7 = this.elements[t];
          this.elements.splice(this.elements.indexOf(_e7), 1), _e7.remove();
        }
      }
    }]);

    return u;
  }();

  var p = /*#__PURE__*/function (_d) {
    _inherits(p, _d);

    var _super = _createSuper(p);

    function p(e) {
      var _this2;

      _classCallCheck(this, p);

      _this2 = _super.call(this), _this2.node = e;
      return _this2;
    }

    _createClass(p, [{
      key: "draggable",
      value: function draggable(e) {
        this.node._dragRoot = (e = e || {}).root || this.node, this.node._dragRoot._restrictDrag = e.restrict, this.node._dragRoot._dragStart = e.dragStart, this.node._dragRoot._dragEnd = e.dragEnd, this.node._dragRoot._drag = e.drag, n.includes(this.node._dragRoot) || n.push(this.node._dragRoot);
      }
    }, {
      key: "remove",
      value: function remove() {
        if (this.node.parentNode) this.node.parentNode.removeChild(this.node);else try {
          this.node.remove();
        } catch (e) {
          console.warn("Couldn't remove element");
        }
      }
    }, {
      key: "text",
      value: function text(e, t) {
        return e && (t ? this.node.innerText = e : this.node.innerText += e), this.node.innerText;
      }
    }, {
      key: "html",
      value: function html(e, t) {
        return e && (t ? this.node.innerHTML = e : this.node.innerHTML += e), this.node.innerHTML;
      }
    }, {
      key: "addClass",
      value: function addClass() {
        var _this$node$classList;

        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        (_this$node$classList = this.node.classList).add.apply(_this$node$classList, e);
      }
    }, {
      key: "removeClass",
      value: function removeClass() {
        var _this$node$classList2;

        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        (_this$node$classList2 = this.node.classList).remove.apply(_this$node$classList2, e);
      }
    }, {
      key: "toggleClass",
      value: function toggleClass() {
        var _this$node$classList3;

        var e = [];

        for (var t = 0; t < arguments.length; t++) {
          e.push(arguments[t]);
        }

        (_this$node$classList3 = this.node.classList).toggle.apply(_this$node$classList3, e);
      }
    }, {
      key: "hasClass",
      value: function hasClass(e) {
        return this.node.classList.contains(e);
      }
    }, {
      key: "css",
      value: function css(e) {
        if ("object" == _typeof(e)) for (var t = Object.keys(e), i = 0; i < t.length; i++) {
          var n = t[i],
              r = e[n];
          this.node.style[n] = r;
        } else 2 == arguments.length && (this.node.style[e] = arguments[1]);
        return this;
      }
    }, {
      key: "prop",
      value: function prop(e) {
        if ("object" == _typeof(e)) for (var t = Object.keys(e), i = 0; i < t.length; i++) {
          var n = t[i],
              r = e[n];
          this.node[n] = r;
        } else if (arguments.length) {
          var a = e,
              o = arguments[1];
          return void 0 !== o && (this.node[a] = o), this.node[a];
        }
        return this;
      }
    }, {
      key: "attr",
      value: function attr(e) {
        if ("object" == _typeof(e)) for (var t = Object.keys(e), i = 0; i < t.length; i++) {
          var n = t[i],
              r = e[n];
          this.node.setAttribute(n, r);
        } else if (arguments.length) {
          var a = e,
              o = arguments[1];
          return void 0 !== o && this.node.setAttribute(a, o), this.node.getAttribute(a);
        }
        return this;
      }
    }, {
      key: "append",
      value: function append(e) {
        if (e instanceof u) for (var t = 0; t < e.elements.length; t++) {
          this.node.appendChild(e.elements[t].node);
        } else e.node ? this.node.appendChild(e.node) : this.node.appendChild(e);
        return this;
      }
    }, {
      key: "value",
      value: function value(e) {
        return e && this.prop("value", e), this.node.value;
      }
    }, {
      key: "on",
      value: function on(e, t) {
        this.node.addEventListener(e, t);
      }
    }]);

    return p;
  }(d);

  i = new d();
  e.exports = i;
}, function (e, t) {
  e.exports = {
    accent: "#5984d2",
    render: {
      joint: {
        radius: 3,
        color: {
          selected: "#ff565a",
          moving: "#b5babe",
          default: "#dce0e4"
        }
      },
      segment: {
        width: 1.5,
        color: "#c7cbce"
      },
      keyframe: {
        size: 6,
        color: {
          default: "#ff4258",
          hovered: "#ee2b47",
          active: "#e31d42"
        }
      },
      timeline: {
        scrollbar: {
          color: {
            default: "rgba(240, 230, 250, 0.045)",
            hovered: "rgba(240, 230, 250, 0.06)",
            active: "rgba(240, 230, 250, 0.075)"
          }
        }
      }
    },
    world: {
      background: "#1a1c1f",
      zoom: 200,
      minZoom: 100,
      maxZoom: 1500
    },
    animation: {
      frameCount: {
        min: 1,
        max: 600
      },
      speed: {
        min: 1,
        max: 60
      },
      autoAddKeyframe: !0
    },
    riggingMode: "forwardKinematics",
    autosave: {
      label: "rigme.model",
      enabled: !0,
      threshold: 1
    },
    animateSkin: !0
  };
}, function (e, t) {
  var i = new ( /*#__PURE__*/function () {
    function _class2() {
      _classCallCheck(this, _class2);

      this.x = 0, this.y = 0, this.speedX = 0, this.speedY = 0, this.pressed = !1, this.dragged = !1, this.scrolled = !1, this.scrollTop = !1;
    }

    _createClass(_class2, [{
      key: "on",
      value: function on(e, t) {
        "function" == typeof t && addEventListener(e, t);
      }
    }]);

    return _class2;
  }())();
  i.on("mousedown", function () {
    i.pressed = !0;
  }), i.on("mouseup", function () {
    i.pressed = !1, i.dragged = !1;
  }), i.on("mousemove", function (e) {
    i.x = e.clientX, i.y = e.clientY, i.speedX = e.movementX, i.speedY = e.movementY, i.pressed ? i.dragged = !0 : i.dragged = !1;
  }), i.on("mousewheel", function () {
    i.scrolled = !0, 0 < event.wheelDelta ? i.scrollTop = !0 : i.scrollTop = !1, setTimeout(function () {
      i.scrolled = !1;
    }, 100);
  }), e.exports = i;
}, function (e, t, i) {
  var n = i(13),
      r = i(1),
      E = i(4),
      A = i(3),
      C = i(0),
      a = i(7),
      j = i(9),
      o = i(14),
      s = i(10);
  var h;
  var I = new Vue({
    el: "#timelineApp",
    data: {
      hidden: !1,
      totalFrames: parseInt(document.getElementById("frameCount").value),
      animationSpeed: parseInt(document.getElementById("animationSpeed").value),
      currentFrame: 0
    },
    methods: {
      fixData: function fixData() {
        this.animationSpeed = parseInt(document.getElementById("animationSpeed").value), this.totalFrames = parseInt(document.getElementById("frameCount").value), h.hatchMark.spacing = h.canvas.width / this.totalFrames, h.snap(), h.redraw(), h.playbackHandle.end.mark >= this.totalFrames && 1 != this.totalFrames && (h.playbackHandle.end.mark = this.totalFrames - 1, h.playbackHandle.end._x = h.markToX(h.playbackHandle.end.mark), h.redraw());
        var e = {
          frameCount: this.totalFrames,
          animationSpeed: this.animationSpeed
        };
        localStorage.setItem(A.autosave.label + ".frames.config", JSON.stringify(e));
      },
      validateFormat: function validateFormat(e) {
        h.redraw(), e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e), this.fixData();
      },
      validateAmount: function validateAmount(e) {
        this.validateMin(e), this.validateMax(e), this.fixData();
      },
      validateMax: function validateMax(e) {
        var t = e.target.value,
            i = A.animation.frameCount.max;
        "animationSpeed" == e.target.id && (i = A.animation.speed.max), parseInt(t) > i && (e.target.value = i.toString()), this.fixData();
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = A.animation.frameCount.min;
        "animationSpeed" == e.target.id && (i = A.animation.speed.min), parseInt(t) < i && (e.target.value = i.toString()), this.fixData();
      },
      addToHistory: function addToHistory() {
        this.totalFrames != this._previousTotalFrames && s.add({
          label: "Change frame count",
          value: this.totalFrames,
          group: "input"
        }), this.animationSpeed != this._previousAnimationSpeed && s.add({
          label: "Change animation speed",
          value: this.animationSpeed,
          group: "input"
        }), this._previousTotalFrames = this.totalFrames, this._previousAnimationSpeed = this.animationSpeed;
      },
      toggleAmount: function toggleAmount(i) {
        if (i.target == document.activeElement) {
          var _e8 = i.wheelDeltaY < 0,
              _t4 = parseInt(i.target.value);

          _e8 ? _t4-- : _t4++, i.target.value = _t4.toString(), I.validateAmount(i), this.fixData();
        }
      },
      setCurrentFrame: function setCurrentFrame(e) {
        this.currentFrame = e;
      }
    }
  });

  function l(e) {
    if (e = document.getElementById(e.id)) {
      e = e.getBoundingClientRect();
      return E.x >= e.x && E.x <= e.x + e.width && E.y >= e.y && E.y <= e.y + e.height;
    }
  }

  I._previousTotalFrames = I.totalFrames, I._previousAnimationSpeed = I.animationSpeed, I.$el.addEventListener("focusout", function () {}), h = new ( /*#__PURE__*/function () {
    function _class3() {
      var _this3 = this;

      _classCallCheck(this, _class3);

      this.canvas = document.getElementById("timelineGraph"), this.context = this.canvas.getContext("2d"), this.buttons = {
        previous: document.getElementById("lastFrame"),
        play: document.getElementById("playStop"),
        next: document.getElementById("nextFrame"),
        add: document.getElementById("addKeyframe"),
        delete: document.getElementById("deleteKeyframe"),
        zoomIn: document.getElementById("zoomInTimeline"),
        zoomOut: document.getElementById("zoomOutTimeline"),
        minimize: document.getElementById("minimize"),
        scrollbar: document.getElementById("timelineScrollbar")
      }, this.state = {
        isPlaying: !1,
        isDragging: !1,
        isMinimized: !1,
        currentMark: 0,
        currentFrame: 0,
        nextFrame: null,
        previousFrame: null,
        _x: 0
      }, this.hatchMark = {
        spacing: this.canvas.width / I.totalFrames,
        height: 4
      }, this.scrollbar = {}, this.playbackHandle = {
        start: {
          mark: 0,
          _x: 0
        },
        end: {
          mark: I.totalFrames - 1,
          _x: 0
        },
        width: 2,
        offset: 6
      }, this.bounds = this.canvas.getBoundingClientRect(), this.loop = null, this.addButtonEvents(), this.addMouseEvents(), this.addKeyboardEvents(), this.updateSize(), addEventListener("resize", function () {
        _this3.updateSize(), _this3.scrollbar.left = C.clamp(_this3.scrollbar.left, 0, _this3.canvas.width - _this3.scrollbar.minWidth), _this3.scrollbar.right = C.clamp(_this3.scrollbar.right, _this3.scrollbar.minWidth, _this3.canvas.width), _this3.scrollbar.width = _this3.scrollbar.right - _this3.scrollbar.left, _this3.redraw();
      }), addEventListener("load", function (e) {
        _this3.updateSize(), _this3.redraw();
      }), this.scrollbar = {
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: void 0,
        color: A.render.timeline.scrollbar.color.default,
        left: 0,
        right: this.canvas.width,
        minWidth: 50,
        zoomSensitivity: 10
      }, this._timelineHeight = void 0;
    }

    _createClass(_class3, [{
      key: "storeSelectedKeyframe",
      value: function storeSelectedKeyframe() {
        for (var i = Object.keys(j.keyframes), n = 0; n < i.length; n++) {
          var _e9 = i[n],
              _t5 = j.keyframes[_e9];
          _t5.index == this.state.currentMark ? _t5.selected = !0 : _t5.selected = !1;
        }
      }
    }, {
      key: "markToX",
      value: function markToX(e, t) {
        var i = C.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
            n = Math.round(C.clamp(i - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing),
            i = i % this.hatchMark.spacing,
            i = (e - n) * this.hatchMark.spacing + this.hatchMark.spacing / 2 - i;
        return t ? i : C.clamp(i, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
      }
    }, {
      key: "xToMark",
      value: function xToMark(e) {
        var t = C.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
            i = Math.round(C.clamp(t - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing),
            t = t % this.hatchMark.spacing,
            i = Math.round((e + t + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + i;
        return C.clamp(i, 0, I.totalFrames - 1);
      }
    }, {
      key: "addKeyboardEvents",
      value: function addKeyboardEvents() {
        var _this4 = this;

        addEventListener("keydown", function (e) {
          var t;
          Object.keys(j.keyframes), _this4.storeSelectedKeyframe(), e.ctrlKey && (67 == e.keyCode && (j.copiedKeyframe = n(j.getKeyframe("selected", !0))), 86 == e.keyCode) && (t = j.copiedKeyframe) && j.setKeyframe(_this4.state.currentMark, {
            position: a(_this4.state.currentMark * _this4.hatchMark.spacing + _this4.hatchMark.spacing / 2, 0),
            locked: 0 == _this4.state.currentMark,
            id: C.uid(),
            joints: t.joints
          });
        });
      }
    }, {
      key: "addMouseEvents",
      value: function addMouseEvents() {
        var _this5 = this;

        this.canvas.addEventListener("contextmenu", function (e) {
          var t, i;
          E.x, _this5.bounds.x, E.y, _this5.bounds.y, l(_this5.canvas) && (_this5.storeSelectedKeyframe(), t = E.x + o.width > innerWidth ? -o.width : 0, i = E.y + o.height > innerHeight ? -o.height : 0, o.show(E.x + t, E.y + i));
        });
        var u,
            p,
            f,
            g,
            m,
            y,
            v,
            b,
            k,
            w = !1,
            x = null,
            S = 0;
        this.redraw(), addEventListener("mouseup", function () {
          var e;
          w = !1, r.emit("renderFocus"), "playbackHandleStart" != x && "playbackHandleEnd" != x || (e = {
            start: _this5.playbackHandle.start.mark,
            end: _this5.playbackHandle.end.mark
          }, localStorage.setItem(A.autosave.label + ".playback.config", JSON.stringify(e))), x = null, u && (e = _this5.xToMark(_this5.state._x), _this5.setCurrentMark(e), j.deleteKeyframe(u.id), j.setKeyframe(e, {
            position: u.position,
            joints: u.joints,
            locked: 0 == e
          })), _this5.scrollbar.color = A.render.timeline.scrollbar.color.default, _this5.snap(), _this5.state.isDragging = !1, _this5.playbackHandle.start.isDragging = !1, _this5.playbackHandle.end.isDragging = !1, u = null, _this5.canvas.style.cursor = "default", _this5.redraw();
        }), addEventListener("mousedown", function () {
          var e, t, i;
          l(_this5.canvas) && (w = !0, r.emit("renderSleep"), _this5.playbackHandle.end.mark >= I.totalFrames && 1 != I.totalFrames && (_this5.playbackHandle.end.mark = I.totalFrames - 1, _this5.playbackHandle.end._x = _this5.markToX(_this5.playbackHandle.end.mark), _this5.redraw()), w && !x && (g ? (S = _this5.scrollbar.left - p, x = "scrollbar") : m ? (x = "timeline", e = _this5.markToX(_this5.playbackHandle.start.mark, !0), t = _this5.markToX(_this5.playbackHandle.end.mark, !0), i = _this5.playbackHandle.width / 2 + _this5.playbackHandle.offset / 2, p >= e - i && p <= e + i ? x = "playbackHandleStart" : p >= t - i && p <= t + i && (x = "playbackHandleEnd")) : y && (x = "keyframe")), "timeline" == x && (_this5.state.isDragging = !0, _this5.state._x = C.clamp(p, _this5.hatchMark.spacing / 2, _this5.canvas.width - _this5.hatchMark.spacing / 2), 0 <= (i = _this5.xToMark(p)) && i <= I.totalFrames && _this5.setCurrentMark(i)), o.hide());
        }), addEventListener("mousemove", function () {
          if (p = E.x - _this5.bounds.x, f = E.y - _this5.bounds.y, w || !(f < 0 || f > _this5.canvas.height || p < 0 || p > _this5.canvas.width)) {
            g = 0 <= f && f <= _this5.scrollbar.height, m = f >= _this5.scrollbar.height && f <= _this5.scrollbar.height + _this5._timelineHeight, y = f >= _this5.scrollbar.height + _this5._timelineHeight && f <= _this5.canvas.height, x || (v = p <= _this5.scrollbar.left + 10, b = p >= _this5.scrollbar.right - 10);

            var e,
                t = p >= _this5.scrollbar.left && p <= _this5.scrollbar.right && (v || b) && g,
                i = _this5.markToX(_this5.playbackHandle.start.mark, !0),
                n = _this5.markToX(_this5.playbackHandle.end.mark, !0),
                r = _this5.playbackHandle.width / 2 + _this5.playbackHandle.offset / 2;

            if (k = (p >= i - r && p <= i + r || p >= n - r && p <= n + r) && m, _this5.canvas.style.cursor = t || k ? "ew-resize" : "default", y) for (var a, o, s, l = Object.keys(j.keyframes), h = 0; h < l.length; h++) {
              var _e10 = j.keyframes[l[h]];
              "head" == _e10.type && (a = _e10.render.position.x, o = _e10.render.position.y, s = _e10.render.size, p <= a + s && p >= a - s && f <= o + s && f && f >= o - s ? (_e10.hovered = !0, _e10.render.color = A.render.keyframe.color.hovered, _this5.canvas.style.cursor = "pointer") : (_e10.hovered = !1, _e10.render.color = A.render.keyframe.color.default), _this5.redraw());
            }

            if (g && p >= _this5.scrollbar.left && p <= _this5.scrollbar.right ? _this5.scrollbar.color = A.render.timeline.scrollbar.color.hovered : _this5.scrollbar.color = A.render.timeline.scrollbar.color.default, _this5.redraw(), w) {
              if ("scrollbar" == x && (v ? (_this5.scrollbar.left = C.clamp(p, 0, _this5.scrollbar.right - _this5.scrollbar.minWidth), _this5.scrollbar.width = _this5.scrollbar.right - _this5.scrollbar.left, _this5.canvas.style.cursor = "ew-resize") : b && (_this5.scrollbar.right = C.clamp(p, _this5.scrollbar.left + _this5.scrollbar.minWidth, _this5.canvas.width), _this5.scrollbar.width = _this5.scrollbar.right - _this5.scrollbar.left, _this5.canvas.style.cursor = "ew-resize"), v || b || (_this5.scrollbar.left = C.clamp(p + S, 0, _this5.canvas.width - _this5.scrollbar.width), _this5.scrollbar.right = _this5.scrollbar.left + _this5.scrollbar.width, _this5.canvas.style.cursor = "default"), _this5.snap()), "timeline" != x && "keyframe" != x || (_this5.state.isDragging = !0, _this5.state._x = C.clamp(p, _this5.hatchMark.spacing / 2, _this5.canvas.width - _this5.hatchMark.spacing / 2), 0 <= (t = _this5.xToMark(p)) && t <= I.totalFrames && _this5.setCurrentMark(t)), "playbackHandleStart" == x && (_this5.playbackHandle.start.isDragging = !0, _this5.playbackHandle.start._x = C.clamp(p, _this5.hatchMark.spacing / 2, _this5.playbackHandle.end._x - _this5.playbackHandle.width / 2 - _this5.hatchMark.spacing), e = _this5.xToMark(p), 0 <= (e = C.clamp(e, 0, _this5.playbackHandle.end.mark - 1)) && e <= I.totalFrames && (_this5.playbackHandle.start.mark = e), _this5.canvas.style.cursor = "ew-resize"), "playbackHandleEnd" == x && (_this5.playbackHandle.end.isDragging = !0, _this5.playbackHandle.end._x = C.clamp(p, _this5.playbackHandle.start._x + _this5.playbackHandle.width / 2 + _this5.hatchMark.spacing, _this5.canvas.width - _this5.hatchMark.spacing / 2), e = _this5.xToMark(p), 0 <= (e = C.clamp(e, _this5.playbackHandle.start.mark + 1, I.totalFrames - 1)) && e <= I.totalFrames && (_this5.playbackHandle.end.mark = e), _this5.canvas.style.cursor = "ew-resize"), "keyframe" == x) if (u) _this5.state._x = C.clamp(p, _this5.hatchMark.spacing / 2, _this5.canvas.width - _this5.hatchMark.spacing / 2), u.render.position.x = _this5.state._x, u.dragged = !0, u.render.color = A.render.keyframe.color.active;else for (var c = Object.keys(j.keyframes), h = 0; h < c.length; h++) {
                var d = j.keyframes[c[h]];
                d && (d.locked || d.hovered && (u = d));
              }

              _this5.redraw();
            }
          }
        });
      }
    }, {
      key: "addButtonEvents",
      value: function addButtonEvents() {
        var _this6 = this;

        var t;
        this.buttons.previous.addEventListener("click", function () {
          var e = 0 < _this6.state.currentMark ? _this6.state.currentMark - 1 : _this6.state.currentMark;

          _this6.setCurrentMark(e);
        }), this.buttons.next.addEventListener("click", function () {
          var e = _this6.state.currentMark < I.totalFrames - 1 ? _this6.state.currentMark + 1 : _this6.state.currentMark;

          _this6.setCurrentMark(e);
        }), this.buttons.play.addEventListener("click", function () {
          _this6.state.isPlaying ? _this6.stop() : _this6.play(), _this6.redraw();
        }), this.buttons.add.addEventListener("click", function () {
          var e,
              t = j.clone()[_this6.state.currentMark];

          t && (e = t.joints), j.setKeyframe(_this6.state.currentMark, {
            locked: 0 == _this6.state.currentMark,
            joints: e
          });
        }), this.buttons.delete.addEventListener("click", function () {
          r.emit("deleteKeyframe");
        }), this.buttons.zoomIn.addEventListener("mousedown", function () {
          r.emit("checkMouseHold", "zoomIn");
        }), this.buttons.zoomOut.addEventListener("mousedown", function () {
          r.emit("checkMouseHold", "zoomOut");
        }), r.on("checkMouseHold", function (e) {
          t = setInterval(function () {
            E.pressed ? r.emit("mousehold", e) : (clearInterval(t), t = null);
          }, 1e3 / 60);
        }), r.on("mousehold", function (e) {
          var t, i;
          "zoomIn" == e ? (t = C.map(_this6.scrollbar.width, 0, _this6.canvas.width, .1, .001), i = _this6.markToX(_this6.state.currentMark, !0), _this6.scrollbar.left = C.lerp(_this6.scrollbar.left, i - _this6.scrollbar.minWidth / 2, t), _this6.scrollbar.right = C.lerp(_this6.scrollbar.right, i + _this6.scrollbar.minWidth / 2, t)) : "zoomOut" == e && (e = C.map(_this6.scrollbar.width, 0, _this6.canvas.width, .001, .1), _this6.scrollbar.left = C.lerp(_this6.scrollbar.left, 0, e), _this6.scrollbar.right = C.lerp(_this6.scrollbar.right, _this6.canvas.width, e)), _this6.scrollbar.width = _this6.scrollbar.right - _this6.scrollbar.left, _this6.snap(), _this6.redraw();
        }), this.buttons.minimize.addEventListener("click", function () {
          _this6.state.isMinimized ? _this6.maximize() : _this6.minimize();
        });
      }
    }, {
      key: "snap",
      value: function snap() {
        for (var n = Object.keys(j.keyframes), r = 0; r < n.length; r++) {
          var _e11 = n[r],
              _t6 = j.keyframes[_e11],
              _i3 = this.markToX(_t6.index, !0);

          _t6.render.position.x = _i3;
        }

        this.state._x = this.markToX(this.state.currentMark, !0), this.playbackHandle.start._x = this.markToX(this.playbackHandle.start.mark, !0), this.playbackHandle.end._x = this.markToX(this.playbackHandle.end.mark, !0), this.redraw();
      }
    }, {
      key: "updateState",
      value: function updateState(e) {
        e = void 0 === e || e;

        var t = function () {
          var e = I.totalFrames,
              t = h.state.currentMark,
              i = null;

          for (var n = parseInt(t); 0 <= n; n--) {
            var r = j.keyframes[n];

            if (r && "head" == r.type) {
              i = r.index;
              break;
            }
          }

          var a = null;

          for (n = parseInt(t) + 1; n < e; n++) {
            var o = j.keyframes[n];

            if (o && "head" == o.type) {
              a = o.index;
              break;
            }
          }

          var s = null;

          for (n = i - 1; 0 <= n; n--) {
            var l = j.keyframes[n];

            if (l && "head" == l.type) {
              s = l.index;
              break;
            }
          }

          return {
            current: i,
            next: a,
            previous: s
          };
        }();

        if (this.state.currentFrame = t.current, this.state.nextFrame = t.next, this.state.previousFrame = t.previous, e) {
          var _t7 = j.keyframes[this.state.currentMark];
          _t7 = _t7 || j.keyframes[this.state.currentFrame], "object" == _typeof(_t7) && (j.joints = _t7.joints, e = j.joints.find(function (e) {
            return e.id === _t7.activeJointId;
          }), j.activeJoint = e || j.joints[j.joints.length - 1]);
        }
      }
    }, {
      key: "redraw",
      value: function redraw() {
        this.clear(), this.draw();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }, {
      key: "draw",
      value: function draw() {
        var e = this.canvas.parentNode;
        this.canvas.width == e.offsetWidth && this.canvas.height == e.offsetHeight || (this.canvas.width = e.offsetWidth, this.canvas.height = e.offsetHeight), this.scrollbar.height = .25 * this.canvas.height, this._timelineHeight = .4 * this.canvas.height;
        var t = C.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
            i = this.canvas.width + C.map(this.scrollbar.width, 0, this.canvas.width, this.canvas.width * this.scrollbar.zoomSensitivity, 0),
            n = I.totalFrames,
            r = 5 * Math.floor(C.clamp(I.totalFrames, i / 15, Number.MAX_SAFE_INTEGER) / (i / 15)),
            a = Math.round((t - this.hatchMark.spacing / 2) / this.hatchMark.spacing),
            o = Math.round((C.map(this.scrollbar.right, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity) - this.hatchMark.spacing / 2) / this.hatchMark.spacing),
            s = this.markToX(this.state.currentMark, !0);
        s = this.state.isDragging ? this.state._x : s;
        var l = this._timelineHeight - this.hatchMark.height,
            e = this.state.currentMark + 1;
        this.createRect(this.scrollbar.left, this.scrollbar.y, this.scrollbar.right - this.scrollbar.left, this.scrollbar.height - 5, this.scrollbar.color, 4), this.createRect(0, this.scrollbar.height, this.canvas.width, this._timelineHeight, "rgba(0, 0, 0, 0.15)", 4), this.context.save(), this.context.clip(), this.hatchMark.spacing = i / n;

        for (var h, c, d, u, p, f = 0; f < n; f++) {
          f < a || o < f || (c = this.hatchMark.spacing * f + this.hatchMark.spacing / 2 - t, d = this.scrollbar.height + this._timelineHeight - this.hatchMark.height - (h = (f + 1) % r == 0 ? 2 : 0), u = this.scrollbar.height + this._timelineHeight - d, this.createRect(c - .5, d, 1, u, "rgba(255, 255, 255, 0.25)"), h && (c >= s - 5 && c <= s + 5 || this.text(f + 1, c, d - 1, "rgba(255, 255, 255, 0.25)")));
        }

        this.context.beginPath(), this.context.moveTo(s - 5, this.scrollbar.height), this.context.lineTo(s + 5, this.scrollbar.height), this.context.lineTo(s + 5, this.scrollbar.height + l - 5), this.context.lineTo(s, this.scrollbar.height + l), this.context.lineTo(s - 5, this.scrollbar.height + l - 5), this.context.closePath(), this.context.fillStyle = A.accent, this.context.fill(), this.text(e, s + 10, l / 2 + 8 + this.scrollbar.height, A.accent, "left");
        var g = this.markToX(this.playbackHandle.start.mark, !0);
        g = this.playbackHandle.start.isDragging ? this.playbackHandle.start._x : g, this.createRect(g - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, A.accent), this.createRect(0, this.scrollbar.height, g, this._timelineHeight, "rgba(0, 0, 0, 0.15)");
        var m = this.markToX(this.playbackHandle.end.mark, !0);
        m = this.playbackHandle.end.isDragging ? this.playbackHandle.end._x : m, this.createRect(m - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, A.accent), this.createRect(m, this.scrollbar.height, this.canvas.width - m, this._timelineHeight, "rgba(0, 0, 0, 0.15)"), this.context.restore();

        for (var _i4 = 0, _Object$keys = Object.keys(j.keyframes); _i4 < _Object$keys.length; _i4++) {
          p = _Object$keys[_i4];
          var _e12 = j.keyframes[p];
          _e12.render.position.y = this.scrollbar.height + this._timelineHeight + _e12.render.size + 5;
          var y = this.markToX(_e12.index, !0);
          _e12.render.position.x = _e12.dragged ? E.x - this.bounds.x : y, "head" == _e12.type && this.createKeyframe(_e12.render.position.x, _e12.render.position.y, _e12.render.size, _e12.render.color);
        }
      }
    }, {
      key: "text",
      value: function text(e, t, i, n, r) {
        this.context.beginPath(), this.context.fillStyle = n, this.context.font = "12px Catamaran", this.context.textAlign = r || "center", this.context.textBaseline = "bottom", this.context.fillText(e, t, i);
      }
    }, {
      key: "createRect",
      value: function createRect(e, t, i, n, r, a) {
        a = a || 0, this.context.beginPath(), this.context.moveTo(e + a, t), this.context.lineTo(e + i - a, t), this.context.quadraticCurveTo(e + i, t, e + i, t + a), this.context.lineTo(e + i, t + n - a), this.context.quadraticCurveTo(e + i, t + n, e + i - a, t + n), this.context.lineTo(e + a, t + n), this.context.quadraticCurveTo(e, t + n, e, t + n - a), this.context.lineTo(e, t + a), this.context.quadraticCurveTo(e, t, e + a, t), this.context.closePath(), this.context.fillStyle = r, this.context.fill();
      }
    }, {
      key: "createLine",
      value: function createLine(e, t, i, n, r) {
        this.context.beginPath(), this.context.moveTo(e, t), this.context.lineTo(i, n), this.context.strokeStyle = r, this.context.stroke();
      }
    }, {
      key: "createKeyframe",
      value: function createKeyframe(e, t, i, n) {
        this.context.beginPath(), this.context.moveTo(e, t - i / 2), this.context.lineTo(e + i / 2, t), this.context.lineTo(e, t + i / 2), this.context.lineTo(e - i / 2, t), this.context.closePath(), this.context.fillStyle = n, this.context.fill();
      }
    }, {
      key: "setCurrentMark",
      value: function setCurrentMark(e, t) {
        this.state.currentMark = e, I.setCurrentFrame(this.state.currentMark), this.updateState(t), this.redraw(), r.emit("timelineSeeked");
      }
    }, {
      key: "play",
      value: function play() {
        var _this7 = this;

        this.loop = setInterval(function () {
          _this7.state.currentMark < _this7.playbackHandle.start.mark && _this7.setCurrentMark(_this7.playbackHandle.start.mark - 1);
          var e = _this7.state.currentMark < _this7.playbackHandle.end.mark ? _this7.state.currentMark + 1 : _this7.playbackHandle.start.mark;

          _this7.setCurrentMark(e);
        }, 1e3 / I.animationSpeed), this.state.isPlaying = !0, this.buttons.play.firstChild.src = "assets/svg/round-square.svg", document.getElementById("propertyApp").classList.add("disabled");
      }
    }, {
      key: "stop",
      value: function stop() {
        clearInterval(this.loop), this.state.isPlaying = !1, this.buttons.play.firstChild.src = "assets/svg/play.svg", document.getElementById("propertyApp").classList.remove("disabled"), r.emit("timelineSeeked");
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        var _this8 = this;

        var e = function e() {
          var e = _this8.canvas.parentNode.getBoundingClientRect();

          _this8.canvas.width = e.width, _this8.canvas.height = e.height, _this8.bounds = _this8.canvas.getBoundingClientRect(), _this8.redraw();
        };

        e(), setTimeout(e, 100);
      }
    }, {
      key: "minimize",
      value: function minimize() {
        var e = I.$el.offsetHeight,
            t = document.querySelector("#timelineApp div.row-b");
        I.$el.style.transform = "translateY(".concat(e - t.offsetTop - 2, "px)"), this.buttons.minimize.style.transform = "translateY(-40px) rotate(0deg)", this.state.isMinimized = !0;
      }
    }, {
      key: "maximize",
      value: function maximize() {
        I.$el.offsetHeight, I.$el.style.transform = "translateY(0px)", this.buttons.minimize.style.transform = "translateY(-40px) rotate(180deg)", this.state.isMinimized = !1;
      }
    }]);

    return _class3;
  }())(), C.loadJSONData(A.autosave.label + ".frames.config", function (e) {
    var t = document.getElementById("frameCount"),
        i = document.getElementById("animationSpeed");
    "number" == typeof e.frameCount && (t.value = e.frameCount), "number" == typeof e.animationSpeed && (i.value = e.animationSpeed), I.fixData();
  }), C.loadJSONData(A.autosave.label + ".playback.config", function (e) {
    "number" == typeof e.start && (h.playbackHandle.start.mark = e.start), "number" == typeof e.end && (h.playbackHandle.end.mark = e.end), h.redraw();
  }), e.exports = {
    app: I,
    graph: h
  };
}, function (e, t) {
  var i = function () {
    return this;
  }();

  try {
    i = i || new Function("return this")();
  } catch (e) {
    "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (i = window);
  }

  e.exports = i;
}, function (e, t) {
  function i(e, t) {
    return Math.random() * (t - e) + e;
  }

  var n = /*#__PURE__*/function () {
    function n() {
      _classCallCheck(this, n);

      var e = "object" == _typeof(arguments[0]) ? arguments[0].x : arguments[0],
          t = "object" == _typeof(arguments[0]) ? arguments[0].y : arguments[1];
      this.x = e || 0, this.y = t || 0;
    }

    _createClass(n, [{
      key: "add",
      value: function add() {
        var e = "object" == _typeof(arguments[0]) ? arguments[0].x : arguments[0],
            t = "object" == _typeof(arguments[0]) ? arguments[0].y : arguments[1];
        return this.x += e || 0, this.y += t || 0, this;
      }
    }, {
      key: "sub",
      value: function sub() {
        var e = "object" == _typeof(arguments[0]) ? arguments[0].x : arguments[0],
            t = "object" == _typeof(arguments[0]) ? arguments[0].y : arguments[1];
        return this.x -= e || 0, this.y -= t || 0, this;
      }
    }, {
      key: "mult",
      value: function mult(e) {
        return this.x *= e, this.y *= e, this;
      }
    }, {
      key: "div",
      value: function div(e) {
        return this.x /= e, this.y /= e, this;
      }
    }, {
      key: "set",
      value: function set() {
        var e = "object" == _typeof(arguments[0]) ? arguments[0].x : arguments[0],
            t = "object" == _typeof(arguments[0]) ? arguments[0].y : arguments[1];
        return this.x = e || 0, this.y = t || 0, this;
      }
    }, {
      key: "equals",
      value: function equals() {
        var e = "object" == _typeof(arguments[0]) ? arguments[0].x : arguments[0],
            t = "object" == _typeof(arguments[0]) ? arguments[0].y : arguments[1];
        return this.x == e && this.y == t;
      }
    }, {
      key: "reset",
      value: function reset() {
        return this.x = 0, this.y = 0, this;
      }
    }, {
      key: "limit",
      value: function limit(e) {
        return e = e || 1, this.getMag() >= e && this.setMag(e), this;
      }
    }, {
      key: "lerp",
      value: function lerp(e, t) {
        return t = t || .1, "number" == typeof e.x && (this.x = t * (e.x - this.x) + this.x), "number" == typeof e.y && (this.y = t * (e.y - this.y) + this.y), this;
      }
    }, {
      key: "dist",
      value: function dist() {
        var e = "object" == _typeof(arguments[0]) ? arguments[0].x : arguments[0],
            t = "object" == _typeof(arguments[0]) ? arguments[0].y : arguments[1];
        return Math.sqrt((this.x - e) * (this.x - e) + (this.y - t) * (this.y - t));
      }
    }, {
      key: "heading",
      value: function heading() {
        var e = "object" == _typeof(arguments[0]) ? arguments[0].x : arguments[0],
            t = "object" == _typeof(arguments[0]) ? arguments[0].y : arguments[1];
        return arguments.length ? Math.atan2(t - this.y, e - this.x) : Math.atan2(this.y, this.x);
      }
    }, {
      key: "norm",
      value: function norm() {
        var e = this.getMag();
        return 0 != e && this.mult(1 / e, 1 / e), this;
      }
    }, {
      key: "copy",
      value: function copy() {
        return new n(this.x, this.y);
      }
    }, {
      key: "setMag",
      value: function setMag(e) {
        var t = this.getMag();
        return t = 0 == t ? .001 : t, this.x *= 1 / t * e, this.y *= 1 / t * e, this;
      }
    }, {
      key: "getMag",
      value: function getMag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
    }, {
      key: "random2D",
      value: function random2D(e) {
        return this.x = i(-(e = "number" != typeof e ? 1 : e), e), this.y = i(-e, e), this.setMag(e), this;
      }
    }]);

    return n;
  }();

  e.exports = function (e, t) {
    return new n(e, t);
  };
}, function (e, t) {
  var r = ["running", "walking", "dancing", "shivering", "jumping", "sleeping", "sitting", "flying", "cheering", "yielding", "punching", "kicking", "crawling", "painting", "smoking", "crouching", "driving", "sliding", "breathing", "hunting", "dying", "moving", "aroused", "tickled", "thrilled", "backflipping", "frontflipping", "falling"],
      a = ["abandoned", "able", "absolute", "adorable", "adventurous", "academic", "acceptable", "acclaimed", "accomplished", "accurate", "aching", "acidic", "acrobatic", "active", "actual", "adept", "admirable", "admired", "adolescent", "adorable", "adored", "advanced", "afraid", "affectionate", "aged", "aggravating", "aggressive", "agile", "agitated", "agonizing", "agreeable", "ajar", "alarmed", "alarming", "alert", "alienated", "alive", "all", "altruistic", "amazing", "ambitious", "ample", "amused", "amusing", "anchored", "ancient", "angelic", "angry", "anguished", "animated", "annual", "another", "antique", "anxious", "any", "apprehensive", "appropriate", "apt", "arctic", "arid", "aromatic", "artistic", "ashamed", "assured", "astonishing", "athletic", "attached", "attentive", "attractive", "austere", "authentic", "authorized", "automatic", "avaricious", "average", "aware", "awesome", "awful", "awkward", "babyish", "bad", "back", "baggy", "bare", "barren", "basic", "beautiful", "belated", "beloved", "beneficial", "better", "best", "bewitched", "big", "big-hearted", "biodegradable", "bite-sized", "bitter", "black", "black-and-white", "bland", "blank", "blaring", "bleak", "blind", "blissful", "blond", "blue", "blushing", "bogus", "boiling", "bold", "bony", "boring", "bossy", "both", "bouncy", "bountiful", "bowed", "brave", "breakable", "brief", "bright", "brilliant", "brisk", "broken", "bronze", "brown", "bruised", "bubbly", "bulky", "bumpy", "buoyant", "burdensome", "burly", "bustling", "busy", "buttery", "buzzing", "calculating", "calm", "candid", "canine", "capital", "carefree", "careful", "careless", "caring", "cautious", "cavernous", "celebrated", "charming", "cheap", "cheerful", "cheery", "chief", "chilly", "chubby", "circular", "classic", "clean", "clear", "clear-cut", "clever", "close", "closed", "cloudy", "clueless", "clumsy", "cluttered", "coarse", "cold", "colorful", "colorless", "colossal", "comfortable", "common", "compassionate", "competent", "complete", "complex", "complicated", "composed", "concerned", "concrete", "confused", "conscious", "considerate", "constant", "content", "conventional", "cooked", "cool", "cooperative", "coordinated", "corny", "corrupt", "costly", "courageous", "courteous", "crafty", "crazy", "creamy", "creative", "creepy", "criminal", "crisp", "critical", "crooked", "crowded", "cruel", "crushing", "cuddly", "cultivated", "cultured", "cumbersome", "curly", "curvy", "cute", "cylindrical", "damaged", "damp", "dangerous", "dapper", "daring", "darling", "dark", "dazzling", "dead", "deadly", "deafening", "dear", "dearest", "decent", "decimal", "decisive", "deep", "defenseless", "defensive", "defiant", "deficient", "definite", "definitive", "delayed", "delectable", "delicious", "delightful", "delirious", "demanding", "dense", "dental", "dependable", "dependent", "descriptive", "deserted", "detailed", "determined", "devoted", "different", "difficult", "digital", "diligent", "dim", "dimpled", "dimwitted", "direct", "disastrous", "discrete", "disfigured", "disgusting", "disloyal", "dismal", "distant", "downright", "dreary", "dirty", "disguised", "dishonest", "dismal", "distant", "distinct", "distorted", "dizzy", "dopey", "doting", "double", "downright", "drab", "drafty", "dramatic", "dreary", "droopy", "dry", "dual", "dull", "dutiful", "each", "eager", "earnest", "early", "easy", "easy-going", "ecstatic", "edible", "educated", "elaborate", "elastic", "elated", "elderly", "electric", "elegant", "elementary", "elliptical", "embarrassed", "embellished", "eminent", "emotional", "empty", "enchanted", "enchanting", "energetic", "enlightened", "enormous", "enraged", "entire", "envious", "equal", "equatorial", "essential", "esteemed", "ethical", "euphoric", "even", "evergreen", "everlasting", "every", "evil", "exalted", "excellent", "exemplary", "exhausted", "excitable", "excited", "exciting", "exotic", "expensive", "experienced", "expert", "extraneous", "extroverted", "extra-large", "extra-small", "fabulous", "failing", "faint", "fair", "faithful", "fake", "false", "familiar", "famous", "fancy", "fantastic", "far", "faraway", "far-flung", "far-off", "fast", "fat", "fatal", "fatherly", "favorable", "favorite", "fearful", "fearless", "feisty", "feline", "female", "feminine", "few", "fickle", "filthy", "fine", "finished", "firm", "first", "firsthand", "fitting", "fixed", "flaky", "flamboyant", "flashy", "flat", "flawed", "flawless", "flickering", "flimsy", "flippant", "flowery", "fluffy", "fluid", "flustered", "focused", "fond", "foolhardy", "foolish", "forceful", "forked", "formal", "forsaken", "forthright", "fortunate", "fragrant", "frail", "frank", "frayed", "free", "French", "fresh", "frequent", "friendly", "frightened", "frightening", "frigid", "frilly", "frizzy", "frivolous", "front", "frosty", "frozen", "frugal", "fruitful", "full", "fumbling", "functional", "funny", "fussy", "fuzzy", "gargantuan", "gaseous", "general", "generous", "gentle", "genuine", "giant", "giddy", "gigantic", "gifted", "giving", "glamorous", "glaring", "glass", "gleaming", "gleeful", "glistening", "glittering", "gloomy", "glorious", "glossy", "glum", "golden", "good", "good-natured", "gorgeous", "graceful", "gracious", "grand", "grandiose", "granular", "grateful", "grave", "gray", "great", "greedy", "green", "gregarious", "grim", "grimy", "gripping", "grizzled", "gross", "grotesque", "grouchy", "grounded", "growing", "growling", "grown", "grubby", "gruesome", "grumpy", "guilty", "gullible", "gummy", "hairy", "half", "handmade", "handsome", "handy", "happy", "happy-go-lucky", "hard", "hard-to-find", "harmful", "harmless", "harmonious", "harsh", "hasty", "hateful", "haunting", "healthy", "heartfelt", "hearty", "heavenly", "heavy", "hefty", "helpful", "helpless", "hidden", "hideous", "high", "high-level", "hilarious", "hoarse", "hollow", "homely", "honest", "honorable", "honored", "hopeful", "horrible", "hospitable", "hot", "huge", "humble", "humiliating", "humming", "humongous", "hungry", "hurtful", "husky", "icky", "icy", "ideal", "idealistic", "identical", "idle", "idiotic", "idolized", "ignorant", "ill", "illegal", "ill-fated", "ill-informed", "illiterate", "illustrious", "imaginary", "imaginative", "immaculate", "immaterial", "immediate", "immense", "impassioned", "impeccable", "impartial", "imperfect", "imperturbable", "impish", "impolite", "important", "impossible", "impractical", "impressionable", "impressive", "improbable", "impure", "inborn", "incomparable", "incompatible", "incomplete", "inconsequential", "incredible", "indelible", "inexperienced", "indolent", "infamous", "infantile", "infatuated", "inferior", "infinite", "informal", "innocent", "insecure", "insidious", "insignificant", "insistent", "instructive", "insubstantial", "intelligent", "intent", "intentional", "interesting", "internal", "international", "intrepid", "ironclad", "irresponsible", "irritating", "itchy", "jaded", "jagged", "jam-packed", "jaunty", "jealous", "jittery", "joint", "jolly", "jovial", "joyful", "joyous", "jubilant", "judicious", "juicy", "jumbo", "junior", "jumpy", "juvenile", "kaleidoscopic", "keen", "key", "kind", "kindhearted", "kindly", "klutzy", "knobby", "knotty", "knowledgeable", "knowing", "known", "kooky", "kosher", "lame", "lanky", "large", "last", "lasting", "late", "lavish", "lawful", "lazy", "leading", "lean", "leafy", "left", "legal", "legitimate", "light", "lighthearted", "likable", "likely", "limited", "limp", "limping", "linear", "lined", "liquid", "little", "live", "lively", "livid", "loathsome", "lone", "lonely", "long", "long-term", "loose", "lopsided", "lost", "loud", "lovable", "lovely", "loving", "low", "loyal", "lucky", "lumbering", "luminous", "lumpy", "lustrous", "luxurious", "mad", "made-up", "magnificent", "majestic", "major", "male", "mammoth", "married", "marvelous", "masculine", "massive", "mature", "meager", "mealy", "mean", "measly", "meaty", "medical", "mediocre", "medium", "meek", "mellow", "melodic", "memorable", "menacing", "merry", "messy", "metallic", "mild", "milky", "mindless", "miniature", "minor", "minty", "miserable", "miserly", "misguided", "misty", "mixed", "modern", "modest", "moist", "monstrous", "monthly", "monumental", "moral", "mortified", "motherly", "motionless", "mountainous", "muddy", "muffled", "multicolored", "mundane", "murky", "mushy", "musty", "muted", "mysterious", "naive", "narrow", "nasty", "natural", "naughty", "nautical", "near", "neat", "necessary", "needy", "negative", "neglected", "negligible", "neighboring", "nervous", "new", "next", "nice", "nifty", "nimble", "nippy", "nocturnal", "noisy", "nonstop", "normal", "notable", "noted", "noteworthy", "novel", "noxious", "numb", "nutritious", "nutty", "obedient", "obese", "oblong", "oily", "oblong", "obvious", "occasional", "odd", "oddball", "offbeat", "offensive", "official", "old", "old-fashioned", "only", "open", "optimal", "optimistic", "opulent", "orange", "orderly", "organic", "ornate", "ornery", "ordinary", "original", "other", "our", "outlying", "outgoing", "outlandish", "outrageous", "outstanding", "oval", "overcooked", "overdue", "overjoyed", "overlooked", "palatable", "pale", "paltry", "parallel", "parched", "partial", "passionate", "past", "pastel", "peaceful", "peppery", "perfect", "perfumed", "periodic", "perky", "personal", "pertinent", "pesky", "pessimistic", "petty", "phony", "physical", "piercing", "pink", "pitiful", "plain", "plaintive", "plastic", "playful", "pleasant", "pleased", "pleasing", "plump", "plush", "polished", "polite", "political", "pointed", "pointless", "poised", "poor", "popular", "portly", "posh", "positive", "possible", "potable", "powerful", "powerless", "practical", "precious", "present", "prestigious", "pretty", "precious", "previous", "pricey", "prickly", "primary", "prime", "pristine", "private", "prize", "probable", "productive", "profitable", "profuse", "proper", "proud", "prudent", "punctual", "pungent", "puny", "pure", "purple", "pushy", "putrid", "puzzled", "puzzling", "quaint", "qualified", "quarrelsome", "quarterly", "queasy", "querulous", "questionable", "quick", "quick-witted", "quiet", "quintessential", "quirky", "quixotic", "quizzical", "radiant", "ragged", "rapid", "rare", "rash", "raw", "recent", "reckless", "rectangular", "ready", "real", "realistic", "reasonable", "red", "reflecting", "regal", "regular", "reliable", "relieved", "remarkable", "remorseful", "remote", "repentant", "required", "respectful", "responsible", "repulsive", "revolving", "rewarding", "rich", "rigid", "right", "ringed", "ripe", "roasted", "robust", "rosy", "rotating", "rotten", "rough", "round", "rowdy", "royal", "rubbery", "rundown", "ruddy", "rude", "runny", "rural", "rusty", "sad", "safe", "salty", "same", "sandy", "sane", "sarcastic", "sardonic", "satisfied", "scaly", "scarce", "scared", "scary", "scented", "scholarly", "scientific", "scornful", "scratchy", "scrawny", "second", "secondary", "second-hand", "secret", "self-assured", "self-reliant", "selfish", "sentimental", "separate", "serene", "serious", "serpentine", "several", "severe", "shabby", "shadowy", "shady", "shallow", "shameful", "shameless", "sharp", "shimmering", "shiny", "shocked", "shocking", "shoddy", "short", "short-term", "showy", "shrill", "shy", "sick", "silent", "silky", "silly", "silver", "similar", "simple", "simplistic", "sinful", "single", "sizzling", "skeletal", "skinny", "sleepy", "slight", "slim", "slimy", "slippery", "slow", "slushy", "small", "smart", "smoggy", "smooth", "smug", "snappy", "snarling", "sneaky", "sniveling", "snoopy", "sociable", "soft", "soggy", "solid", "somber", "some", "spherical", "sophisticated", "sore", "sorrowful", "soulful", "soupy", "sour", "Spanish", "sparkling", "sparse", "specific", "spectacular", "speedy", "spicy", "spiffy", "spirited", "spiteful", "splendid", "spotless", "spotted", "spry", "square", "squeaky", "squiggly", "stable", "staid", "stained", "stale", "standard", "starchy", "stark", "starry", "steep", "sticky", "stiff", "stimulating", "stingy", "stormy", "straight", "strange", "steel", "strict", "strident", "striking", "striped", "strong", "studious", "stunning", "stupendous", "stupid", "sturdy", "stylish", "subdued", "submissive", "substantial", "subtle", "suburban", "sudden", "sugary", "sunny", "super", "superb", "superficial", "superior", "supportive", "sure-footed", "surprised", "suspicious", "svelte", "sweaty", "sweet", "sweltering", "swift", "sympathetic", "tall", "talkative", "tame", "tan", "tangible", "tart", "tasty", "tattered", "taut", "tedious", "teeming", "tempting", "tender", "tense", "tepid", "terrible", "terrific", "testy", "thankful", "that", "these", "thick", "thin", "third", "thirsty", "this", "thorough", "thorny", "those", "thoughtful", "threadbare", "thrifty", "thunderous", "tidy", "tight", "timely", "tinted", "tiny", "tired", "torn", "total", "tough", "traumatic", "treasured", "tremendous", "tragic", "trained", "tremendous", "triangular", "tricky", "trifling", "trim", "trivial", "troubled", "true", "trusting", "trustworthy", "trusty", "truthful", "tubby", "turbulent", "twin", "ugly", "ultimate", "unacceptable", "unaware", "uncomfortable", "uncommon", "unconscious", "understated", "unequaled", "uneven", "unfinished", "unfit", "unfolded", "unfortunate", "unhappy", "unhealthy", "uniform", "unimportant", "unique", "united", "unkempt", "unknown", "unlawful", "unlined", "unlucky", "unnatural", "unpleasant", "unrealistic", "unripe", "unruly", "unselfish", "unsightly", "unsteady", "unsung", "untidy", "untimely", "untried", "untrue", "unused", "unusual", "unwelcome", "unwieldy", "unwilling", "unwitting", "unwritten", "upbeat", "upright", "upset", "urban", "usable", "used", "useful", "useless", "utilized", "utter", "vacant", "vague", "vain", "valid", "valuable", "vapid", "variable", "vast", "velvety", "venerated", "vengeful", "verifiable", "vibrant", "vicious", "victorious", "vigilant", "vigorous", "villainous", "violet", "violent", "virtual", "virtuous", "visible", "vital", "vivacious", "vivid", "voluminous", "wan", "warlike", "warm", "warmhearted", "warped", "wary", "wasteful", "watchful", "waterlogged", "watery", "wavy", "wealthy", "weak", "weary", "webbed", "wee", "weekly", "weepy", "weighty", "weird", "welcome", "well-documented", "well-groomed", "well-informed", "well-lit", "well-made", "well-off", "well-to-do", "well-worn", "wet", "which", "whimsical", "whirlwind", "whispered", "white", "whole", "whopping", "wicked", "wide", "wide-eyed", "wiggly", "wild", "willing", "wilted", "winding", "windy", "winged", "wiry", "wise", "witty", "wobbly", "woeful", "wonderful", "wooden", "woozy", "wordy", "worldly", "worn", "worried", "worrisome", "worse", "worst", "worthless", "worthwhile", "worthy", "wrathful", "wretched", "writhing", "wrong", "wry", "yawning", "yearly", "yellow", "yellowish", "young", "youthful", "yummy", "zany", "zealous", "zesty", "zigzag", "rocky"],
      o = ["person", "dog", "cat", "elephant", "bird", "velociraptor", "t-rex", "worm", "fly", "mosquito", "bear", "fish", "fox", "horse", "tiger", "lion", "frog", "monkey", "people", "meat", "food", "player", "soup", "woman", "hair", "police", "lady", "pizza", "plant", "doctor", "god", "nurse", "cow"],
      s = ["Eren Yaeger", "Mikasa", "Levi Ackerman", "Nezuko", "Tanjiro", "Muzan", "Kazuto", "Kurisu", "Hachiman", "Itachi", "Naruto", "Roronoa", "Light Yagami"],
      l = ["Spider-Man", "Iron Man", "Hulk", "Thanos", "Wolverine", "Loki", "Batman", "Superman", "Aquaman", "Joker", "Lex Luthor", "Cyborg"],
      h = ["Obama", "Trump", "Abraham Lincoln", "Madonna", "Drawne Johnson", "Leonardo DiCaprio", "Will Smith", "Tom Hanks", "Tom Cruise", "Brad Pitt", "Johnny Depp", "Matt Damon", "Chris Hemsworth", "Hugh Jackman"];
  e.exports = {
    generate: function generate() {
      var e = r.concat(a),
          t = e[Math.floor(Math.random() * e.length)],
          i = o.concat(s, l, h),
          n = i[Math.floor(Math.random() * i.length)];
      return t.charAt(0).toUpperCase() + t.slice(1) + " " + n;
    }
  };
}, function (e, t, i) {
  var o = i(1),
      h = (i(4), i(7)),
      u = i(3),
      b = i(0),
      s = i(10);
  var p,
      n = document.getElementById("showSkeleton");
  var r = new ( /*#__PURE__*/function () {
    function _class4() {
      _classCallCheck(this, _class4);

      this.joints = [], this.keyframes = {}, this.totalKeyframes = 0, this.mouseBuffer = 10, this.activeJoint = null, this.bounds = {
        min: h(),
        max: h()
      }, this._moved = !1;
    }

    _createClass(_class4, [{
      key: "updateBounds",
      value: function updateBounds() {
        var e = Object.keys(this.keyframes),
            t = [],
            i = [];

        for (var n = 0; n < e.length; n++) {
          for (var r = this.keyframes[e[n]], a = 0; a < r.joints.length; a++) {
            var o = r.joints[a];
            if (t.push(o.position.x + u.render.joint.radius), i.push(o.position.y + u.render.joint.radius), t.push(o.position.x - u.render.joint.radius), i.push(o.position.y - u.render.joint.radius), o.skin.vertices) for (var s = 0; s < o.skin.vertices.length; s++) {
              t.push(o.skin.vertices[s].x), i.push(o.skin.vertices[s].y);
            }
          }
        }

        this.bounds.min.set({
          x: Math.min.apply(Math, t),
          y: Math.min.apply(Math, i)
        }), this.bounds.max.set({
          x: Math.max.apply(Math, t),
          y: Math.max.apply(Math, i)
        });
      }
    }, {
      key: "reset",
      value: function reset() {
        this.keyframes = {}, this.joints = [], this.totalKeyframes = 0, this.activeJoint = null, p.graph && (this.setKeyframe(0, {
          position: {
            x: p.graph.hatchMark.spacing / 2,
            y: 0
          },
          locked: !0,
          ignoreHistory: !0
        }), p.graph.setCurrentMark(0), p.graph.updateState()), this.updateBounds(), s.add({
          label: "Clear",
          value: this.clone(),
          group: "keyframe"
        });
      }
    }, {
      key: "clone",
      value: function clone(e) {
        return e = e || this.keyframes, this.fromJSON(this.toJSON(e));
      }
    }, {
      key: "getKeyframe",
      value: function getKeyframe(t, i) {
        var e = Object.values(this.keyframes).find(function (e) {
          return e[t] === i;
        });
        return e ? this.keyframes[e.index] : null;
      }
    }, {
      key: "editJoints",
      value: function editJoints(e) {
        for (var t = Object.values(this.keyframes), i = 0; i < t.length; i++) {
          for (var n = t[i], r = 0; r < n.joints.length; r++) {
            var a = n.joints[r];
            "function" == typeof e && e(a, n);
          }
        }
      }
    }, {
      key: "editJoint",
      value: function editJoint(t, i, n) {
        var r = Object.values(this.keyframes);

        for (var a = 0; a < r.length; a++) {
          var _e13 = r[a].joints.find(function (e) {
            return e.id === t;
          });

          if (i = n ? JSON.parse(JSON.stringify(i)) : i, _e13) for (var o = Object.keys(i), s = 0; s < o.length; s++) {
            _e13[o[s]] = i[o[s]];
          }
        }
      }
    }, {
      key: "addSubKeyframes",
      value: function addSubKeyframes(t, i) {
        if (p.graph) {
          var _e14 = Object.keys(this.keyframes);

          for (var n = 0; n < _e14.length; n++) {
            if ("sub" == this.keyframes[_e14[n]].type) {
              _e14.splice(n, 1);

              break;
            }
          }

          if (this.clone(), 1 < _e14.length) for (p.graph.updateState(), n = i - 1; t + 1 <= n; n--) {
            var r = this.clone(),
                a = r[i].joints,
                a = {
              id: b.uid(),
              type: "sub",
              index: n,
              activeJointId: r.activeJointId,
              joints: a,
              render: {
                size: 12,
                color: "red",
                position: h(n * p.graph.hatchMark.spacing + p.graph.hatchMark.spacing / 2, 0)
              }
            };
            this.keyframes[n] = a;
          }
        }

        this.updateSubKeyframes(), p.graph.updateState(), p.graph.redraw();
      }
    }, {
      key: "updateSubKeyframes",
      value: function updateSubKeyframes() {
        for (var e = Object.keys(this.keyframes), t = e.length - 1; 0 <= t; t--) {
          var _o = this.keyframes[e[t]];

          if (_o && "head" != _o.type) {
            var _e15 = null;

            for (var s = _o.index; 0 <= s; s--) {
              var i = this.keyframes[s];

              if (i && "head" == i.type) {
                _e15 = i.index;
                break;
              }
            }

            var _t8 = null;

            for (s = _o.index; s < p.app.totalFrames; s++) {
              var l = this.keyframes[s];

              if (l && "head" == l.type) {
                _t8 = l.index;
                break;
              }
            }

            var _n = b.map(_o.index, _t8, _e15, 0, 1),
                _r = this.keyframes[_t8],
                a = this.keyframes[_e15];

            var _loop = function _loop() {
              var i = _o.joints[s];

              if (i && _r && a) {
                var _e16 = _r.joints.find(function (e) {
                  return e.id === i.id;
                }),
                    _t9 = a.joints.find(function (e) {
                  return e.id === i.id;
                });

                if (_e16 && _t9) {
                  h = _e16.position.copy().lerp(_t9.position, _n);
                  c = b.lerp(_e16.length, _t9.length, _n);
                  i.length = c, i.position.set(h), u.animateSkin && _t9.skin && _e16.skin && _t9.skin.offset && _e16.skin.offset && (i.skin.offset = {
                    x: b.lerp(_e16.skin.offset.x, _t9.skin.offset.x, _n),
                    y: b.lerp(_e16.skin.offset.y, _t9.skin.offset.y, _n),
                    scaleX: b.lerp(_e16.skin.offset.scaleX, _t9.skin.offset.scaleX, _n),
                    scaleY: b.lerp(_e16.skin.offset.scaleY, _t9.skin.offset.scaleY, _n),
                    angle: b.lerp(_e16.skin.offset.angle, _t9.skin.offset.angle, _n)
                  });

                  for (d = 0; d < i.children.length; d++) {
                    var _e17 = i.children[d];
                    _e17.angle = _e17.position.heading(i.position);
                  }
                }

                i.id == a.activeJointId && (_o.activeJointId = i.id);
              }
            };

            for (s = 0; s < _o.joints.length; s++) {
              var h, c;
              var d;

              _loop();
            }

            "linear" != u.riggingMode && ("forwardKinematics" == u.riggingMode ? this.computeKinematics(_o.joints) : "inverseKinematics" == u.riggingMode && this.computeKinematics(_o.joints, !0)), this.updateSkin(_o.joints);
          }
        }
      }
    }, {
      key: "setKeyframe",
      value: function setKeyframe(e, i) {
        if ("number" == typeof e) {
          var _n2 = {
            type: "head",
            index: (i = i || {}).keyframe ? i.keyframe.index : e,
            activeJointId: i.keyframe ? i.keyframe.activeJointId : this.activeJoint ? this.activeJoint.id : null,
            joints: i.joints,
            render: {
              size: u.render.keyframe.size,
              color: u.render.keyframe.color.default,
              position: i.position || h(e * p.graph.hatchMark.spacing + p.graph.hatchMark.spacing / 2, 0)
            },
            locked: i.locked || !1
          };

          if (p.graph) {
            var _e18 = this.clone()[p.graph.state.currentFrame],
                _t10 = _e18 ? _e18.joints : [];

            i.joints && (_t10 = i.joints), _n2.joints = _t10;
          }

          var t;

          if (_n2.id = i.id || b.uid(), this.keyframes[e] = _n2, p.graph && (p.graph.updateState(), t = p.graph.state.currentFrame, e = p.graph.state.previousFrame, this.addSubKeyframes(e, t), p.graph.redraw()), !i.ignoreHistory) {
            var _e19 = Object.values(this.keyframes),
                _t11 = 0;

            for (var r = 0; r < _e19.length; r++) {
              "head" == _e19[r].type && _t11++;
            }

            var _i5 = "Add keyframe";
            return _t11 == this.totalKeyframes && (_i5 = "Move keyframe"), this.updateBounds(), s.add({
              label: _i5,
              value: this.clone(),
              group: "keyframe"
            }), this.totalKeyframes = _t11, _n2;
          }
        }
      }
    }, {
      key: "deleteKeyframe",
      value: function deleteKeyframe(n) {
        n = this.getKeyframe("id", n);

        if (n && !(Object.keys(this.keyframes).length <= 1)) {
          var _e20,
              _t12,
              _i6 = [];

          for (var r = n.index - 1; 0 <= r; r--) {
            var a = this.keyframes[r];

            if (a && ("sub" == a.type && _i6.push(a), "head" == a.type)) {
              _e20 = a;
              break;
            }
          }

          for (r = n.index + 1; r < p.app.totalFrames; r++) {
            var o = this.keyframes[r];

            if (o && ("sub" == o.type && _i6.push(o), "head" == o.type)) {
              _t12 = o;
              break;
            }
          }

          for (r = 0; r < _i6.length; r++) {
            var s = this.getKeyframe("id", _i6[r].id);
            delete this.keyframes[s.index];
          }

          delete this.keyframes[n.index], _t12 && _e20 && this.addSubKeyframes(_e20.index, _t12.index), p.graph && (p.graph.updateState(), p.graph.redraw()), this.updateBounds();
        }
      }
    }, {
      key: "updateKeyframe",
      value: function updateKeyframe(e, t) {
        for (var i = Object.keys(t), n = 0; n < i.length; n++) {
          this.keyframes[e][i[n]] = t[i[n]];
        }

        this.updateSubKeyframes();
      }
    }, {
      key: "addJoint",
      value: function addJoint(e, t, i) {
        i = i || {}, p.graph && p.graph.setCurrentMark(p.graph.state.currentFrame, !1);
        var n = i.parent || this.activeJoint,
            r = {
          id: "J" + b.uid(),
          name: "Joint " + (this.joints.length + 1),
          position: h(e, t),
          positionPrev: h(e, t),
          angle: n ? h(e, t).heading(n.position) : 0,
          parent: n || null,
          children: [],
          length: n ? n.position.dist(e, t) : 0,
          hierarchy: n ? n.hierarchy + 1 : 1,
          skin: {},
          zIndex: this.joints.length + 1
        };
        return n && n.children.push(r), i.ignoreDefaults || (this.activeJoint = r), this.joints.push(r), p.graph && this.updateKeyframe(p.graph.state.currentFrame, {
          activeJointId: this.activeJoint.id
        }), this.updateBounds(), i.ignoreHistory || s.add({
          label: "Add joint",
          value: this.clone(),
          group: "keyframe"
        }), o.emit("jointChange", this.joints), r;
      }
    }, {
      key: "selectJoint",
      value: function selectJoint(i, n) {
        if (this.joints.length) {
          var _t13 = this.joints.slice();

          _t13.sort(function (e, t) {
            return e.position.dist(i, n) - t.position.dist(i, n);
          }), this.activeJoint = this.joints.find(function (e) {
            return e.id === _t13[0].id;
          }), o.emit("jointChange", this.joints), p.graph && this.updateKeyframe(p.graph.state.currentFrame, {
            activeJointId: this.activeJoint.id
          });
        }
      }
    }, {
      key: "removeJointById",
      value: function removeJointById(i) {
        for (var n = Object.keys(this.keyframes), r = 0; r < n.length; r++) {
          var _e21 = this.keyframes[n[r]],
              _t14 = _e21.joints.find(function (e) {
            return e.id === i;
          });

          if (_t14) {
            var _t14$parent$children;

            for (var a = 0; a < _t14.children.length; a++) {
              var _e22 = _t14.children[a];
              _e22.parent = _t14.parent, _e22.length += _t14.length, this.activeJoint = _e22;
            }

            _t14.parent ? (_t14.parent.children.splice(_t14.parent.children.indexOf(_t14), 1), (_t14$parent$children = _t14.parent.children).push.apply(_t14$parent$children, _toConsumableArray(_t14.children)), this.activeJoint = _t14.parent) : this.activeJoint = _t14.children[0], _e21.joints.splice(_e21.joints.indexOf(_t14), 1);
          }
        }

        this.activeJoint && this.moveJoint(this.activeJoint.position.x, this.activeJoint.position.y), this.updateBounds(), s.add({
          label: "Remove joint",
          value: this.clone(),
          group: "keyframe"
        }), o.emit("jointChange", this.joints);
      }
    }, {
      key: "removeJointByPosition",
      value: function removeJointByPosition(t, i) {
        if (this.joints.length) for (var n = 0; n < this.joints.length; n++) {
          var _e23 = this.joints[n];
          _e23.position.dist(t, i) < u.render.joint.radius + this.mouseBuffer && this.removeJointById(_e23.id);
        }
      }
    }, {
      key: "computeKinematics",
      value: function computeKinematics(t, e) {
        if (e) for (i = t.length - 1; 0 <= i; i--) {
          var _e24 = t[i];
          _e24.parent && (_e24.parent.angle = _e24.position.heading(_e24.parent.position), _e24.parent.position.set({
            x: _e24.position.x + Math.cos(_e24.parent.angle) * _e24.length,
            y: _e24.position.y + Math.sin(_e24.parent.angle) * _e24.length
          }));
        } else for (var i = 0; i < t.length; i++) {
          for (var n = t[i], r = 0; r < n.children.length; r++) {
            var _e25 = n.children[r];
            _e25.angle = _e25.position.heading(n.position), _e25.position.set({
              x: n.position.x - Math.cos(_e25.angle) * _e25.length,
              y: n.position.y - Math.sin(_e25.angle) * _e25.length
            });
          }
        }
      }
    }, {
      key: "updateSkin",
      value: function updateSkin(u) {
        u = u || this.joints;

        for (var p = 0; p < u.length; p++) {
          var _i7 = u[p],
              _e26 = _i7.length,
              _t15 = _i7.length,
              _n3 = 0,
              _r2 = _i7.skin.crop,
              a = 0,
              _o2 = 0;
          _r2 && (a = _r2.to.x - _r2.from.x, _o2 = _r2.to.y - _r2.from.y), a > _o2 ? _t15 = Number.MAX_SAFE_INTEGER : (_e26 = Number.MAX_SAFE_INTEGER, _n3 = Math.PI / 2), _i7.skin.size = b.scaleSize(a, _o2, _e26, _t15), _i7.skin._sizeOriginal = {
            width: a,
            height: _o2
          }, _i7.skin.angleAuto = _n3;
          var _s = 0,
              l = 0,
              _h = 1,
              c = 1,
              d = 0;

          if (_i7.skin.offset && (_s = _i7.skin.offset.x || 0, l = _i7.skin.offset.y || 0, _h = _i7.skin.offset.scaleX || 0, c = _i7.skin.offset.scaleY || 0, d = _i7.skin.offset.angle || 0), _i7.parent && _r2) {
            _i7.skin.position = {
              x: (_i7.position.x + _i7.parent.position.x) / 2,
              y: (_i7.position.y + _i7.parent.position.y) / 2
            };
            var f,
                g,
                m = [{
              x: _i7.skin.position.x + _s - _i7.skin.size.width / 2,
              y: _i7.skin.position.y + l - _i7.skin.size.height / 2
            }, {
              x: _i7.skin.position.x + _s + _i7.skin.size.width / 2,
              y: _i7.skin.position.y + l - _i7.skin.size.height / 2
            }, {
              x: _i7.skin.position.x + _s + _i7.skin.size.width / 2,
              y: _i7.skin.position.y + l + _i7.skin.size.height / 2
            }, {
              x: _i7.skin.position.x + _s - _i7.skin.size.width / 2,
              y: _i7.skin.position.y + l + _i7.skin.size.height / 2
            }];

            for (var _i8 = 0, _m = m; _i8 < _m.length; _i8++) {
              f = _m[_i8];

              var _e27 = f.x - _i7.skin.position.x,
                  _t16 = f.y - _i7.skin.position.y;

              f.x = f.x + _e27 * (_h - 1), f.y = f.y + _t16 * (c - 1);
            }

            for (var _i9 = 0, _m2 = m; _i9 < _m2.length; _i9++) {
              g = _m2[_i9];
              var y = _i7.angle + _i7.skin.angleAuto + d,
                  v = (g.x - _i7.skin.position.x) * Math.cos(y) - (g.y - _i7.skin.position.y) * Math.sin(y),
                  y = (g.x - _i7.skin.position.x) * Math.sin(y) + (g.y - _i7.skin.position.y) * Math.cos(y);
              g.x = v + _i7.skin.position.x, g.y = y + _i7.skin.position.y;
            }

            _i7.skin.vertices = m;
          }
        }
      }
    }, {
      key: "moveJointById",
      value: function moveJointById(e, t, i) {
        if (this.activeJoint = this.getJoint(e), this.activeJoint) {
          var n;

          if (p.graph && (u.animation.autoAddKeyframe ? this.activeJoint.position.equals(t, i) || (n = p.graph.state.currentMark, (e = this.keyframes[n]) && "head" == e.type || this.setKeyframe(n)) : (p.graph.setCurrentMark(p.graph.state.currentFrame, !1), p.graph.updateState()), this.updateSubKeyframes()), t && i && (1 < this.activeJoint.position.dist(this.activeJoint.positionPrev) && (this._moved = !0, this.activeJoint.positionPrev.set(this.activeJoint.position.x, this.activeJoint.position.y)), this.activeJoint.position.set(t, i), "linear" == u.riggingMode)) {
            this.activeJoint.parent && (this.activeJoint.angle = this.activeJoint.position.heading(this.activeJoint.parent.position), this.activeJoint.length = this.activeJoint.position.dist(this.activeJoint.parent.position));

            for (var r = 0; r < this.activeJoint.children.length; r++) {
              var _e28 = this.activeJoint.children[r];
              _e28.length = _e28.position.dist(this.activeJoint.position);
            }
          }

          return "linear" != u.riggingMode && ("forwardKinematics" == u.riggingMode ? this.computeKinematics(this.joints) : "inverseKinematics" == u.riggingMode && this.computeKinematics(this.joints, !0)), this.updateSkin(), this.updateBounds(), this.activeJoint;
        }
      }
    }, {
      key: "moveJoint",
      value: function moveJoint(e, t) {
        this.moveJointById(this.activeJoint.id, e, t);
      }
    }, {
      key: "getJoint",
      value: function getJoint(t) {
        return this.joints.find(function (e) {
          return e.id === t;
        }) || null;
      }
    }, {
      key: "toJSON",
      value: function toJSON(e, r) {
        var t = e || this.clone(),
            a = {},
            o = Object.keys(t);

        for (var s = 0; s < o.length; s++) {
          var _i10 = t[o[s]],
              _n4 = {
            id: _i10.id,
            activeJointId: _i10.activeJointId,
            index: _i10.index,
            joints: [],
            render: _i10.render,
            type: _i10.type,
            locked: _i10.locked
          };

          for (var l = 0; l < _i10.joints.length; l++) {
            var _e29 = _i10.joints[l],
                _t17 = {
              id: _e29.id,
              name: _e29.name,
              angle: _e29.angle,
              position: _e29.position,
              positionPrev: _e29.positionPrev,
              length: _e29.length,
              parent: _e29.parent ? _e29.parent.id : null,
              hierarchy: _e29.hierarchy,
              children: [],
              skinImageSrc: _e29.skin && !r ? _e29.skin.imageSrc : void 0,
              skinCrop: _e29.skin ? _e29.skin.crop : null,
              skinOffset: _e29.skin ? _e29.skin.offset : null,
              skinPosition: _e29.skin ? _e29.skin.position : null,
              skinAngleAuto: _e29.skin ? _e29.skin.angleAuto : void 0,
              skinSize: _e29.skin ? _e29.skin.size : null,
              _skinSizeOriginal: _e29.skin ? _e29.skin._sizeOriginal : null,
              _vueCrop: _e29.skin ? _e29.skin._vueCrop : null,
              zIndex: _e29.zIndex
            };

            for (var h = 0; h < _e29.children.length; h++) {
              var c = _e29.children[h];

              _t17.children.push(c.id);
            }

            _n4.joints.push(_t17);
          }

          a[_n4.index] = _n4;
        }

        return a;
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(r) {
        if (r) {
          var _e30 = {},
              _t18 = Object.keys(r);

          var _loop2 = function _loop2() {
            var i = r[_t18[a]],
                n = (i.joints.find(function (e) {
              return e.id === i.activeJointId;
            }), []);

            for (o = 0; o < i.joints.length; o++) {
              var _e31 = i.joints[o],
                  _t19 = {
                id: _e31.id,
                name: _e31.name,
                angle: _e31.angle,
                position: h(_e31.position),
                positionPrev: h(_e31.positionPrev),
                length: _e31.length,
                hierarchy: _e31.hierarchy,
                parent: _e31.parent,
                children: _e31.children.slice(),
                skin: {
                  offset: _e31.skinOffset,
                  crop: _e31.skinCrop,
                  _vueCrop: _e31._vueCrop,
                  imageSrc: _e31.skinImageSrc,
                  position: _e31.skinPosition,
                  angleAuto: _e31.angleAuto,
                  size: _e31.skinSize,
                  _sizeOriginal: _e31._skinSizeOriginal
                },
                zIndex: _e31.zIndex
              };
              n.push(_t19);
            }

            var _loop3 = function _loop3() {
              var i = n[o];
              i.parent = n.find(function (e) {
                return e.id === i.parent;
              }) || null;

              var _loop4 = function _loop4() {
                var t = i.children[s];
                i.children[s] = n.find(function (e) {
                  return e.id === t;
                }) || null;
              };

              for (s = 0; s < i.children.length; s++) {
                _loop4();
              }
            };

            for (o = 0; o < n.length; o++) {
              _loop3();
            }

            l = {
              activeJointId: i.activeJointId,
              id: i.id,
              index: i.index,
              joints: n,
              locked: i.locked,
              render: i.render,
              type: i.type
            };
            _e30[i.index] = l;
          };

          for (var a = 0; a < _t18.length; a++) {
            var o;
            var s;
            var l;

            _loop2();
          }

          return _e30;
        }
      }
    }, {
      key: "import",
      value: function _import(e) {
        this.keyframes = this.clone(e);
        var t = Object.values(this.keyframes),
            i = 0;

        for (var n = 0; n < t.length; n++) {
          "head" == t[n].type && i++;
        }

        this.totalKeyframes = i, p.graph && ((e = this.keyframes[p.graph.state.currentMark]) && (this.activeJoint = this.getKeyframe("id", e.activeJointId), this.activeJoint && this.updateKeyframe(p.graph.state.currentFrame, {
          activeJointId: this.activeJoint.id
        })), p.graph.updateState()), this.updateSkin(), this.updateBounds(), o.emit("jointChange", this.joints);
      }
    }, {
      key: "renderTo",
      value: function renderTo(i, n) {
        var r = this.keyframes[(n = n || {}).frame];

        if (r) {
          n.position = n.position || {
            x: 0,
            y: 0
          };
          var e,
              a,
              o,
              s,
              l,
              h = -this.bounds.min.x + n.position.x,
              c = -this.bounds.min.y + n.position.y;
          if (r.joints.sort(function (e, t) {
            return e.zIndex - t.zIndex;
          }), n.showSkin) for (var d = 0; d < r.joints.length; d++) {
            var _t20 = r.joints[d];

            if (_t20.parent) {
              if (_t20.skin.imageSrc) if (_t20.skin.image) {
                if (!_t20.skin.image.width) {
                  var _e32 = new Image();

                  _e32.src = _t20.skin.imageSrc, _t20.skin.image = _e32, this.updateSkin(), this.updateBounds();
                }
              } else {
                var _e33 = new Image();

                _e33.src = _t20.skin.imageSrc, _t20.skin.image = _e33, this.updateSkin(), this.updateBounds();
              }
              _t20.skin && "object" == _typeof(_t20.skin.image) && _t20.skin.image.src && _t20.skin.position && (i.save(), i.translate(_t20.skin.position.x + h, _t20.skin.position.y + c), i.rotate(_t20.angle + _t20.skin.angleAuto), _t20.skin.offset && (e = _t20.skin.offset.x, a = _t20.skin.offset.y, o = _t20.skin.offset.scaleX, s = _t20.skin.offset.scaleY, l = _t20.skin.offset.angle, i.rotate(l), i.translate(e, a), i.scale(o, s)), i.drawImage(_t20.skin.image, _t20.skin.crop.from.x, _t20.skin.crop.from.y, _t20.skin._sizeOriginal.width, _t20.skin._sizeOriginal.height, -_t20.skin.size.width / 2, -_t20.skin.size.height / 2, _t20.skin.size.width, _t20.skin.size.height), i.restore(), _t20.skin.vertices || (this.updateSkin(), this.updateBounds()));
            }
          }

          if (n.showBones) {
            for (d = 0; d < r.joints.length; d++) {
              var t = r.joints[d];
              t.parent && (i.beginPath(), i.moveTo(t.position.x + h, t.position.y + c), i.lineTo(t.parent.position.x + h, t.parent.position.y + c), i.lineWidth = u.render.segment.width, i.lineCap = "round", i.strokeStyle = u.render.segment.color, i.stroke());
            }

            for (d = 0; d < r.joints.length; d++) {
              var _e34 = r.joints[d],
                  _t21 = _e34 === this.activeJoint ? u.render.joint.color.selected : u.render.joint.color.default;

              p.graph && (this.activeJoint && !p.graph.state.isPlaying && (this.activeJoint.children.length && (_t21 = this.activeJoint.children.includes(_e34) ? "#5bff85" : _t21), this.activeJoint.parent && (_t21 = this.activeJoint.parent === _e34 ? "#9b68e1" : _t21)), p.graph.state.isPlaying && (_t21 = u.render.joint.color.default)), i.beginPath(), i.arc(_e34.position.x + h, _e34.position.y + c, u.render.joint.radius, 0, 2 * Math.PI), i.closePath(), i.fillStyle = n.workColor ? _t21 : u.render.joint.color.default, i.fill();
            }
          }
        }
      }
    }, {
      key: "render",
      value: function render(r) {
        var a = n.checked;

        if (p.graph) {
          var _e35 = p.graph.state.previousFrame,
              _t22 = p.graph.state.currentFrame,
              _i11 = p.graph.state.nextFrame,
              _n5 = p.graph.state.currentMark;
          r.save(), r.context.globalAlpha = .1, this.renderTo(r.context, {
            frame: _e35,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: a
          }), this.renderTo(r.context, {
            frame: _t22,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: a
          }), this.renderTo(r.context, {
            frame: _i11,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: a
          }), r.restore(), this.keyframes[_n5] || (_n5 = _t22), this.renderTo(r.context, {
            frame: _n5,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: a,
            showSkin: !0,
            workColor: !0
          });
        }
      }
    }]);

    return _class4;
  }())();
  o.once("loadedApps", function (e) {
    p = e.timeline, r.setKeyframe(0, {
      locked: !0,
      ignoreHistory: !0
    });
  }), e.exports = r;
}, function (e, t, i) {
  var n = i(0),
      r = (i(3), i(1));
  i = new ( /*#__PURE__*/function () {
    function _class5() {
      _classCallCheck(this, _class5);

      this.events = [], this.present = null, this.maxStates = 300, this.eventCount = 0;
    }

    _createClass(_class5, [{
      key: "add",
      value: function add(e) {
        e = e || {}, this.present && this.events.splice(0, this.events.indexOf(this.present));
        e = {
          id: "E" + n.uid(),
          label: e.label,
          value: e.value,
          group: e.group,
          time: Date.now()
        };
        this.present = e, this.events.push(e), this.sortByLatest(), this.events.length > this.maxStates && this.events.pop(), this.eventCount++, r.emit("historyChange");
      }
    }, {
      key: "sortByLatest",
      value: function sortByLatest() {
        this.events.sort(function (e, t) {
          return t.time - e.time;
        });
      }
    }, {
      key: "sortByOldest",
      value: function sortByOldest() {
        this.events.sort(function (e, t) {
          return e.time - t.time;
        });
      }
    }, {
      key: "getLatest",
      value: function getLatest() {
        return this.events[0];
      }
    }, {
      key: "getOldest",
      value: function getOldest() {
        return this.events[this.events.length - 1];
      }
    }, {
      key: "getNext",
      value: function getNext() {
        return this.events[this.events.indexOf(this.present) - 1] || null;
      }
    }, {
      key: "getPrevious",
      value: function getPrevious() {
        return this.events[this.events.indexOf(this.present) + 1] || null;
      }
    }, {
      key: "forward",
      value: function forward() {
        this.present = this.getNext();
      }
    }, {
      key: "backward",
      value: function backward() {
        this.present = this.getPrevious();
      }
    }, {
      key: "jump",
      value: function jump(t) {
        var e = this.events.find(function (e) {
          return e.id === t;
        });
        t && (this.present = e);
      }
    }]);

    return _class5;
  }())();
  e.exports = i;
}, function (e, t, i) {
  "use strict";

  !function (a) {
    var o = i(28),
        s = i(31);

    var l = function l(e) {
      return 0 < (e = Math.round(e)) && e <= 32 ? e : e <= 0 ? 1 : 32;
    };

    e.exports = {
      parseAsync: function parseAsync(e, t, i, n) {
        var r = arguments;
        if (a.isBuffer(e) && (e = e.toString()), r.length < 2) throw new Error("Missing Callback");
        if ("function" != typeof r[r.length - 1]) throw new TypeError("Callback is not a function");

        if (n = r[r.length - 1], t = null, i = 1, 2 < r.length) {
          var _e36 = 1;
          "function" == typeof r[_e36] && (t = r[_e36++]), "number" == typeof r[_e36] && (i = l(r[_e36]));
        }

        return o.parseWrapper(e, t, i, n);
      },
      stringifyAsync: function stringifyAsync(e, t, i, n, r) {
        var a,
            o = arguments;
        if ("function" != typeof o[o.length - 1]) throw new TypeError("Callback is not a function");

        if (r = o[o.length - 1], t = null, n = 1, 2 < o.length) {
          var _e37 = 1;
          "function" != typeof o[_e37] && "object" != _typeof(o[_e37]) || (t = o[_e37++]), "number" != typeof o[_e37] && "string" != typeof o[_e37] || "number" != typeof o[_e37++] || (i = "number" == typeof (a = o[_e37++]) ? 1 <= (a = Math.round(a)) && a <= 10 ? a : a < 1 ? 0 : 10 : a.length <= 10 ? a : a.substr(0, 9)), "number" == typeof o[_e37] && (n = l(o[_e37]));
        }

        return s.stringifyWrapper(e, t, i, n, r);
      }
    };
  }.call(this, i(24).Buffer);
}, function (e, r, a) {
  !function (e) {
    var t = void 0 !== e && e || "undefined" != typeof self && self || window,
        i = Function.prototype.apply;

    function n(e, t) {
      this._id = e, this._clearFn = t;
    }

    r.setTimeout = function () {
      return new n(i.call(setTimeout, t, arguments), clearTimeout);
    }, r.setInterval = function () {
      return new n(i.call(setInterval, t, arguments), clearInterval);
    }, r.clearTimeout = r.clearInterval = function (e) {
      e && e.close();
    }, n.prototype.unref = n.prototype.ref = function () {}, n.prototype.close = function () {
      this._clearFn.call(t, this._id);
    }, r.enroll = function (e, t) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
    }, r.unenroll = function (e) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
    }, r._unrefActive = r.active = function (e) {
      clearTimeout(e._idleTimeoutId);
      var t = e._idleTimeout;
      0 <= t && (e._idleTimeoutId = setTimeout(function () {
        e._onTimeout && e._onTimeout();
      }, t));
    }, a(29), r.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, r.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate;
  }.call(this, a(6));
}, function (e, pe, t) {
  !function (e, t) {
    var f = "[object Arguments]",
        g = "[object Function]",
        m = "[object GeneratorFunction]",
        y = "[object Map]",
        v = "[object Set]",
        b = /\w*$/,
        i = /^\[object .+?Constructor\]$/,
        c = /^(?:0|[1-9]\d*)$/,
        k = {};
    k[f] = k["[object Array]"] = k["[object ArrayBuffer]"] = k["[object DataView]"] = k["[object Boolean]"] = k["[object Date]"] = k["[object Float32Array]"] = k["[object Float64Array]"] = k["[object Int8Array]"] = k["[object Int16Array]"] = k["[object Int32Array]"] = k[y] = k["[object Number]"] = k["[object Object]"] = k["[object RegExp]"] = k[v] = k["[object String]"] = k["[object Symbol]"] = k["[object Uint8Array]"] = k["[object Uint8ClampedArray]"] = k["[object Uint16Array]"] = k["[object Uint32Array]"] = !0, k["[object Error]"] = k[g] = k["[object WeakMap]"] = !1;
    var n = "object" == _typeof(e) && e && e.Object === Object && e,
        r = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
        a = n || r || Function("return this")(),
        o = pe && !pe.nodeType && pe,
        s = o && "object" == _typeof(t) && t && !t.nodeType && t,
        l = s && s.exports === o;

    function w(e, t) {
      return e.set(t[0], t[1]), e;
    }

    function x(e, t) {
      return e.add(t), e;
    }

    function S(e, t, i, n) {
      var r = -1,
          a = e ? e.length : 0;

      for (n && a && (i = e[++r]); ++r < a;) {
        i = t(i, e[r], r, e);
      }

      return i;
    }

    function E(e) {
      var t = !1;
      if (null != e && "function" != typeof e.toString) try {
        t = !!(e + "");
      } catch (e) {}
      return t;
    }

    function A(e) {
      var i = -1,
          n = Array(e.size);
      return e.forEach(function (e, t) {
        n[++i] = [t, e];
      }), n;
    }

    function h(t, i) {
      return function (e) {
        return t(i(e));
      };
    }

    function C(e) {
      var t = -1,
          i = Array(e.size);
      return e.forEach(function (e) {
        i[++t] = e;
      }), i;
    }

    var e = Array.prototype,
        n = Function.prototype,
        d = Object.prototype,
        r = a["__core-js_shared__"],
        u = (s = /[^.]+$/.exec(r && r.keys && r.keys.IE_PROTO || "")) ? "Symbol(src)_1." + s : "",
        p = n.toString,
        j = d.hasOwnProperty,
        I = d.toString,
        T = RegExp("^" + p.call(j).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        o = l ? a.Buffer : void 0,
        r = a.Symbol,
        M = a.Uint8Array,
        _ = h(Object.getPrototypeOf, Object),
        q = Object.create,
        F = d.propertyIsEnumerable,
        B = e.splice,
        s = Object.getOwnPropertySymbols,
        n = o ? o.isBuffer : void 0,
        J = h(Object.keys, Object),
        l = te(a, "DataView"),
        P = te(a, "Map"),
        e = te(a, "Promise"),
        o = te(a, "Set"),
        a = te(a, "WeakMap"),
        O = te(Object, "create"),
        R = ae(l),
        z = ae(P),
        L = ae(e),
        H = ae(o),
        D = ae(a),
        r = r ? r.prototype : void 0,
        N = r ? r.valueOf : void 0;

    function K(e) {
      var t = -1,
          i = e ? e.length : 0;

      for (this.clear(); ++t < i;) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }

    function U(e) {
      var t = -1,
          i = e ? e.length : 0;

      for (this.clear(); ++t < i;) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }

    function Y(e) {
      var t = -1,
          i = e ? e.length : 0;

      for (this.clear(); ++t < i;) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }

    function W(e) {
      this.__data__ = new U(e);
    }

    function $(e, t) {
      var i,
          n,
          r,
          a,
          o,
          s = se(e) || (n = i = e) && "object" == _typeof(n) && le(n) && j.call(i, "callee") && (!F.call(i, "callee") || I.call(i) == f) ? function (e, t) {
        for (var i = -1, n = Array(e); ++i < e;) {
          n[i] = t(i);
        }

        return n;
      }(e.length, String) : [],
          l = s.length,
          h = !!l;

      for (r in e) {
        !t && !j.call(e, r) || h && ("length" == r || (a = r, o = l, !!(o = null == o ? 9007199254740991 : o) && ("number" == typeof a || c.test(a)) && -1 < a && a % 1 == 0 && a < o)) || s.push(r);
      }

      return s;
    }

    function X(e, t, i) {
      var n = e[t];
      j.call(e, t) && oe(n, i) && (void 0 !== i || t in e) || (e[t] = i);
    }

    function V(e, t) {
      for (var i = e.length; i--;) {
        if (oe(e[i][0], t)) return i;
      }

      return -1;
    }

    function G(a, o, s, l, e, t, h) {
      var c;
      if (void 0 !== (c = l ? t ? l(a, e, t, h) : l(a) : c)) return c;
      if (!de(a)) return a;
      var i,
          n = se(a);

      if (n) {
        if (e = (i = a).length, r = i.constructor(e), e && "string" == typeof i[0] && j.call(i, "index") && (r.index = i.index, r.input = i.input), c = r, !o) return function (e, t) {
          var i = -1,
              n = e.length;

          for (t = t || Array(n); ++i < n;) {
            t[i] = e[i];
          }

          return t;
        }(a, c);
      } else {
        var d = ne(a),
            r = d == g || d == m;
        if (he(a)) return function (e) {
          if (o) return e.slice();
          var t = new e.constructor(e.length);
          return e.copy(t), t;
        }(a);

        if ("[object Object]" == d || d == f || r && !t) {
          if (E(a)) return t ? a : {};
          if (c = "function" != typeof (r = r ? {} : a).constructor || re(r) ? {} : de(r = _(r)) ? q(r) : {}, !o) return r = a, p = (p = c) && Q(a, ue(a), p), Q(r, ie(r), p);
        } else {
          if (!k[d]) return t ? a : {};

          c = function (e, t, i) {
            var n,
                r,
                a,
                o,
                s = e.constructor;

            switch (d) {
              case "[object ArrayBuffer]":
                return Z(e);

              case "[object Boolean]":
              case "[object Date]":
                return new s(+e);

              case "[object DataView]":
                return a = e, o = i ? Z(a.buffer) : a.buffer, new a.constructor(o, a.byteOffset, a.byteLength);

              case "[object Float32Array]":
              case "[object Float64Array]":
              case "[object Int8Array]":
              case "[object Int16Array]":
              case "[object Int32Array]":
              case "[object Uint8Array]":
              case "[object Uint8ClampedArray]":
              case "[object Uint16Array]":
              case "[object Uint32Array]":
                return o = e, a = i ? Z(o.buffer) : o.buffer, new o.constructor(a, o.byteOffset, o.length);

              case y:
                return r = e, S(i ? t(A(r), !0) : A(r), w, new r.constructor());

              case "[object Number]":
              case "[object String]":
                return new s(e);

              case "[object RegExp]":
                return (n = new (r = e).constructor(r.source, b.exec(r))).lastIndex = r.lastIndex, n;

              case v:
                return n = e, S(i ? t(C(n), !0) : C(n), x, new n.constructor());

              case "[object Symbol]":
                return N ? Object(N.call(e)) : {};
            }
          }(a, G, o);
        }
      }

      var u,
          p = (h = h || new W()).get(a);
      return p || (h.set(a, c), function (e) {
        for (var t, i, n = -1, r = e ? e.length : 0; ++n < r && !1 !== (t = e[n], i = n, u && (t = a[i = t]), void X(c, i, G(t, o, s, l, i, a, h)));) {
          ;
        }
      }((u = !n ? s ? (t = ie, n = ue(p = a), se(p) ? n : function (e, t) {
        for (var i = -1, n = t.length, r = e.length; ++i < n;) {
          e[r + i] = t[i];
        }

        return e;
      }(n, t(p))) : ue(a) : u) || a), c);
    }

    function Z(e) {
      var t = new e.constructor(e.byteLength);
      return new M(t).set(new M(e)), t;
    }

    function Q(e, t, i, n) {
      i = i || {};

      for (var r = -1, a = t.length; ++r < a;) {
        var o = t[r],
            s = n ? n(i[o], e[o], o, i, e) : void 0;
        X(i, o, void 0 === s ? e[o] : s);
      }

      return i;
    }

    function ee(e, t) {
      var i = e.__data__;
      return ("string" == (e = _typeof(t)) || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t) ? i["string" == typeof t ? "string" : "hash"] : i.map;
    }

    function te(e, t) {
      e = null == e ? void 0 : e[t];
      return !de(t = e) || u && u in t || !(ce(t) || E(t) ? T : i).test(ae(t)) ? void 0 : e;
    }

    K.prototype.clear = function () {
      this.__data__ = O ? O(null) : {};
    }, K.prototype.delete = function (e) {
      return this.has(e) && delete this.__data__[e];
    }, K.prototype.get = function (e) {
      var t = this.__data__;

      if (O) {
        var i = t[e];
        return "__lodash_hash_undefined__" === i ? void 0 : i;
      }

      return j.call(t, e) ? t[e] : void 0;
    }, K.prototype.has = function (e) {
      var t = this.__data__;
      return O ? void 0 !== t[e] : j.call(t, e);
    }, K.prototype.set = function (e, t) {
      return this.__data__[e] = O && void 0 === t ? "__lodash_hash_undefined__" : t, this;
    }, U.prototype.clear = function () {
      this.__data__ = [];
    }, U.prototype.delete = function (e) {
      var t = this.__data__,
          e = V(t, e);
      return !(e < 0 || (e == t.length - 1 ? t.pop() : B.call(t, e, 1), 0));
    }, U.prototype.get = function (e) {
      var t = this.__data__,
          e = V(t, e);
      return e < 0 ? void 0 : t[e][1];
    }, U.prototype.has = function (e) {
      return -1 < V(this.__data__, e);
    }, U.prototype.set = function (e, t) {
      var i = this.__data__,
          n = V(i, e);
      return n < 0 ? i.push([e, t]) : i[n][1] = t, this;
    }, Y.prototype.clear = function () {
      this.__data__ = {
        hash: new K(),
        map: new (P || U)(),
        string: new K()
      };
    }, Y.prototype.delete = function (e) {
      return ee(this, e).delete(e);
    }, Y.prototype.get = function (e) {
      return ee(this, e).get(e);
    }, Y.prototype.has = function (e) {
      return ee(this, e).has(e);
    }, Y.prototype.set = function (e, t) {
      return ee(this, e).set(e, t), this;
    }, W.prototype.clear = function () {
      this.__data__ = new U();
    }, W.prototype.delete = function (e) {
      return this.__data__.delete(e);
    }, W.prototype.get = function (e) {
      return this.__data__.get(e);
    }, W.prototype.has = function (e) {
      return this.__data__.has(e);
    }, W.prototype.set = function (e, t) {
      var i = this.__data__;

      if (i instanceof U) {
        var n = i.__data__;
        if (!P || n.length < 199) return n.push([e, t]), this;
        i = this.__data__ = new Y(n);
      }

      return i.set(e, t), this;
    };

    var ie = s ? h(s, Object) : function () {
      return [];
    },
        ne = function ne(e) {
      return I.call(e);
    };

    function re(e) {
      var t = e && e.constructor;
      return e === ("function" == typeof t && t.prototype || d);
    }

    function ae(e) {
      if (null != e) {
        try {
          return p.call(e);
        } catch (e) {}

        try {
          return e + "";
        } catch (e) {}
      }

      return "";
    }

    function oe(e, t) {
      return e === t || e != e && t != t;
    }

    (l && "[object DataView]" != ne(new l(new ArrayBuffer(1))) || P && ne(new P()) != y || e && "[object Promise]" != ne(e.resolve()) || o && ne(new o()) != v || a && "[object WeakMap]" != ne(new a())) && (ne = function ne(e) {
      var t = I.call(e),
          e = "[object Object]" == t ? e.constructor : void 0,
          e = e ? ae(e) : void 0;
      if (e) switch (e) {
        case R:
          return "[object DataView]";

        case z:
          return y;

        case L:
          return "[object Promise]";

        case H:
          return v;

        case D:
          return "[object WeakMap]";
      }
      return t;
    });
    var se = Array.isArray;

    function le(e) {
      return null != e && "number" == typeof (t = e.length) && -1 < t && t % 1 == 0 && t <= 9007199254740991 && !ce(e);
      var t;
    }

    var he = n || function () {
      return !1;
    };

    function ce(e) {
      e = de(e) ? I.call(e) : "";
      return e == g || e == m;
    }

    function de(e) {
      var t = _typeof(e);

      return e && ("object" == t || "function" == t);
    }

    function ue(e) {
      return (le(e) ? $ : function (e) {
        if (!re(e)) return J(e);
        var t,
            i = [];

        for (t in Object(e)) {
          j.call(e, t) && "constructor" != t && i.push(t);
        }

        return i;
      })(e);
    }

    t.exports = function (e) {
      return G(e, !0, !0);
    };
  }.call(this, t(6), t(37)(e));
}, function (e, t, i) {
  var n = i(13),
      r = i(9),
      a = i(3),
      o = i(0),
      s = i(7),
      l = new Vue({
    el: "#contextMenuApp",
    data: {
      selectedKeyframe: null,
      hidden: !0,
      position: {
        x: 0,
        y: 0
      },
      width: document.getElementById("contextMenuApp").offsetWidth,
      height: document.getElementById("contextMenuApp").offsetHeight
    },
    methods: {
      show: function show(e, t) {
        var _this9 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this9.width = _this9.$el.offsetWidth, _this9.height = _this9.$el.offsetHeight, _this9.position.x = e, _this9.position.y = t, _this9.$el.style.left = _this9.position.x + "px", _this9.$el.style.top = _this9.position.y + "px";
        });
      },
      hide: function hide() {
        this.hidden = !0;
      },
      copy: function copy() {
        r.copiedKeyframe = n(r.getKeyframe("selected", !0));
      },
      paste: function paste() {
        var e = i(5),
            t = r.copiedKeyframe;
        t && r.setKeyframe(e.graph.state.currentMark, {
          position: s(e.graph.state.currentMark * e.graph.hatchMark.spacing + e.graph.hatchMark.spacing / 2, a.render.keyframe.y),
          locked: 0 == e.graph.state.currentMark,
          id: o.uid(),
          joints: t.joints
        });
      }
    }
  });
  window.contextMenuApp = l, e.exports = l;
}, function (e, t, i) {
  var o = i(1),
      n = (i(0), i(2));
  var s,
      a,
      i = new Vue({
    el: "#overlayApp",
    data: {
      hidden: !0,
      closeMsg: "Close"
    },
    methods: {
      show: function show() {
        var _this10 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this10.$el.style.opacity = "1", n.query("#overlayApp .drag").draggable({
            restrict: !0,
            root: _this10.$el
          }), o.emit("renderSleep");
        });
      },
      hide: function hide() {
        var e;
        a = s = void 0, document.getElementById("overlayFilename").innerText = "Choose a file...";

        var _iterator = _createForOfIteratorHelper(document.querySelectorAll("#overlayApp .section.disabled")),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            e = _step.value;
            e.classList.add("disabled");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        document.getElementById("addOverlay").classList.add("disabled"), this.hidden = !0, o.emit("renderFocus");
      },
      validateFormat: function validateFormat(e) {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e);
      },
      validateAmount: function validateAmount(e) {
        this.validateMin(e), this.validateMax(e);
      },
      validateMax: function validateMax(e) {
        var t = e.target.value,
            i = e.target.dataset.max;
        "number" == typeof a && ("overlayStart" == e.target.id && (i = a), "overlayEnd" == e.target.id && (i = a)), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "overlayEnd" == e.target.id && (i = parseInt(document.getElementById("overlayStart").value)), parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(i) {
        if (i.target == document.activeElement) {
          i.target.value.length || (i.target.value = 1);

          var _e38 = i.wheelDeltaY < 0,
              _t23 = parseInt(i.target.value);

          _e38 ? _t23-- : _t23++, i.target.value = _t23.toString(), this.validateAmount(i);
        }
      },
      checkFile: function checkFile() {
        var e = document.getElementById("overlayInput"),
            t = document.getElementById("overlayFilename"),
            i = e.files[0];

        if (i) {
          t.innerText = i.name;
          var n,
              r = URL.createObjectURL(i);

          if (r) {
            s = r;

            var _e39 = document.createElement("video");

            _e39.crossOrigin = "anonymous", _e39.controls = !0, _e39.muted = !0, _e39.src = r, _e39.load(), _e39.addEventListener("loadedmetadata", function () {
              a = _e39.duration, _e39.remove();
            });

            var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll("#overlayApp .section.disabled")),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                n = _step2.value;
                n.classList.remove("disabled");
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            document.getElementById("addOverlay").classList.remove("disabled");
          }
        }
      },
      validate: function validate() {
        if (s) {
          var _e40 = document.getElementById("overlayFrameCount").value,
              _t24 = document.getElementById("overlayFrameRate").value,
              _i12 = document.getElementById("overlayStart").value,
              _n6 = document.getElementById("overlayEnd").value,
              r = document.getElementById("overlayQuality").value;
          _e40 = _e40.length ? parseInt(_e40) : void 0, _t24 = _t24.length ? parseInt(_t24) : void 0, _i12 = _i12.length ? parseInt(_i12) : void 0, _n6 = _n6.length ? parseInt(_n6) : void 0, r = r.length ? parseInt(r) / 100 : void 0;
          var a = {
            frameCount: _e40,
            frameRate: _t24,
            start: _i12,
            end: _n6,
            quality: r
          };
          o.emit("extractFrames", s, a), this.hide();
        }
      }
    }
  });
  e.exports = i;
}, function (e, t, i) {
  var n = i(1),
      h = i(4),
      c = i(3),
      d = i(0),
      r = i(2),
      a = i(5);
  var u,
      p = -Math.PI,
      f = Math.PI,
      o = [];
  var g = new Vue({
    el: "#overlayConfigApp",
    data: {
      hidden: !0,
      closeMsg: "Close",
      opacity: 1,
      scale: 1,
      angle: 0,
      trimStart: 1,
      trimEnd: a.app.totalFrames,
      start: 1
    },
    methods: {
      fixData: function fixData() {
        var e = document.getElementById("overlayConfigTrimStart"),
            t = document.getElementById("overlayConfigTrimEnd"),
            i = document.getElementById("overlayConfigStart"),
            e = parseInt(e.value),
            t = parseInt(t.value),
            i = parseInt(i.value);
        this.trimStart = e || 1, this.trimEnd = t || o.length, this.start = i || 1;
      },
      validateFormat: function validateFormat(e) {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e), this.fixData();
      },
      validateAmount: function validateAmount(e) {
        this.validateMin(e), this.validateMax(e);
      },
      validateMax: function validateMax(e) {
        var t = e.target.value,
            i = e.target.dataset.max;
        "overlayConfigTrimStart" == e.target.id && (i = this.trimEnd), "overlayConfigTrimEnd" == e.target.id && (i = o.length), "overlayConfigStart" == e.target.id && (i = a.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString()), this.fixData();
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "overlayConfigTrimEnd" == e.target.id && (i = this.trimStart), parseInt(t) < i && (e.target.value = i.toString()), this.fixData();
      },
      toggleAmount: function toggleAmount(i) {
        if (i.target == document.activeElement) {
          i.target.value.length || (i.target.value = 1);

          var _e41 = i.wheelDeltaY < 0,
              _t25 = parseInt(i.target.value);

          _e41 ? _t25-- : _t25++, i.target.value = _t25.toString(), this.validateAmount(i), this.fixData();
        }
      },
      updateSliders: function updateSliders() {
        var _this11 = this;

        var _loop5 = function _loop5() {
          var e = void 0,
              t = void 0,
              i = void 0,
              n = s[l],
              r = n.querySelector(".handle"),
              a = r.getBoundingClientRect(),
              o = n.querySelector(".track").getBoundingClientRect().width - a.width;
          "opacity" == n.dataset.label ? (e = 0, t = 1, i = _this11.opacity) : "scale" == n.dataset.label ? (e = 0, t = 6, i = _this11.scale) : "rotate" == n.dataset.label && (e = p, t = f, i = _this11.angle), r.style.left = d.map(i, e, t, 0, o) + "px", n.onmousemove = function () {
            h.dragged && !u && (u = n);
          }, n.onmousedown = function () {
            u = n;
          };
        };

        for (var s = document.querySelectorAll(".slider-wrapper"), l = 0; l < s.length; l++) {
          _loop5();
        }

        var e = {
          opacity: this.opacity,
          scale: this.scale,
          angle: this.angle
        };
        localStorage.setItem(c.autosave.label + ".overlay.config", JSON.stringify(e));
      },
      show: function show() {
        var _this12 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this12.$el.style.opacity = "1", r.query("#overlayConfigApp .drag").draggable({
            restrict: !0,
            root: _this12.$el
          }), n.emit("renderSleep");
          var e = document.getElementById("overlayConfigTrimStart"),
              t = document.getElementById("overlayConfigTrimEnd"),
              i = document.getElementById("overlayConfigStart");
          e.value = _this12.trimStart, t.value = _this12.trimEnd, i.value = _this12.start, _this12.updateSliders(), _this12.fixData();
        });
      },
      hide: function hide() {
        n.emit("renderFocus"), this.hidden = !0;
      },
      reset: function reset() {
        this.opacity = 1, this.scale = 1, this.angle = 0;
        var e = document.getElementById("overlayConfigTrimStart"),
            t = document.getElementById("overlayConfigTrimEnd"),
            i = document.getElementById("overlayConfigStart");
        e.value = 1, t.value = o.length, i.value = 1, this.fixData(), this.updateSliders();
      },
      removeOverlay: function removeOverlay() {
        confirm("Are you sure you want to remove the overlay?") && (n.emit("removeOverlay"), this.hide());
      }
    }
  });

  function s() {
    if (u) {
      var _e42,
          _t26,
          _i13,
          _n7 = u.querySelector(".handle"),
          _r3 = _n7.getBoundingClientRect(),
          _a = u.querySelector(".track").getBoundingClientRect(),
          _o3 = _a.width - _r3.width,
          _s2 = h.x - _a.x - _r3.width / 2;

      _s2 = d.clamp(_s2, 0, _o3), _n7.style.left = _s2 + "px", "opacity" == u.dataset.label ? (_e42 = 0, _t26 = 1, _i13 = "opacity") : "scale" == u.dataset.label ? (_e42 = 0, _t26 = 6, _i13 = "scale") : "rotate" == u.dataset.label && (_e42 = p, _t26 = f, _i13 = "angle");
      var l = d.map(_s2, 0, _o3, _e42, _t26);
      g[_i13] = l;
      l = {
        opacity: g.opacity,
        scale: g.scale,
        angle: g.angle
      };
      localStorage.setItem(c.autosave.label + ".overlay.config", JSON.stringify(l));
    }
  }

  n.on("overlayFrames", function (e) {
    o = e, g.trimEnd = o.length;
  }), d.loadJSONData(c.autosave.label + ".overlay.config", function (e) {
    "number" == typeof e.opacity && (g.opacity = e.opacity), "number" == typeof e.scale && (g.scale = e.scale), "number" == typeof e.angle && (g.angle = e.angle), g.updateSliders();
  }), h.on("mouseup", function (e) {
    u = null;
  }), h.on("mousedown", function (e) {
    s();
  }), h.on("mousemove", function (e) {
    h.dragged && s();
  }), e.exports = g;
}, function (e, t, i) {
  var n = i(1),
      r = i(2),
      a = i(8),
      o = new Vue({
    el: "#saveApp",
    data: {
      hidden: !0,
      closeMsg: "Close",
      defaultTitle: a.generate()
    },
    methods: {
      show: function show() {
        var _this13 = this;

        this.defaultTitle = a.generate(), this.hidden = !1, this.$nextTick(function () {
          _this13.$el.style.opacity = "1", r.query("#saveApp .drag").draggable({
            restrict: !0,
            root: _this13.$el
          }), setTimeout(function () {
            document.getElementById("saveFilename").focus();
          }, 100), n.emit("renderSleep");
        });
      },
      hide: function hide() {
        this.hidden = !0, n.emit("renderFocus");
      },
      checkFilename: function checkFilename(e) {
        var t = document.getElementById("download");
        e.target.value.length ? t.classList.remove("disabled") : t.classList.add("disabled");
      },
      validate: function validate() {
        var e = document.getElementById("saveFilename").value;
        e.length && n.emit("saveProject", e);
      }
    }
  });
  e.exports = o;
}, function (e, t, i) {
  var o = i(11),
      n = i(1),
      s = i(2);
  var l,
      i = new Vue({
    el: "#loadApp",
    data: {
      hidden: !0,
      closeMsg: "Close",
      errorMessage: "",
      fileError: !1
    },
    methods: {
      show: function show() {
        var _this14 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this14.$el.style.opacity = "1", s.query("#loadApp .drag").draggable({
            restrict: !0,
            root: _this14.$el
          }), n.emit("renderSleep");
        });
      },
      hide: function hide() {
        l = void 0, n.emit("renderFocus"), s.query("#import").addClass("disabled"), this.fileError = !1, this.hidden = !0;
      },
      checkFile: function checkFile() {
        var _this15 = this;

        var e = s.query("#importInput"),
            i = s.query("#loadFilename"),
            n = e.node.files[0];

        if (n) {
          var _e43 = n.name,
              _t27 = _e43.split(".")[_e43.split(".").length - 1],
              r = s.query("#import");

          var a;
          r.addClass("disabled"), r.text("Processing...", !0), "rigme" == _t27 && (i.text(_e43, !0), (a = URL.createObjectURL(n)) && fetch(a).then(function (e) {
            e.text().then(function (e) {
              var i,
                  n = !1;

              try {
                o.parseAsync(e, function (e, t) {
                  e ? n = !0 : (i = t, n = !1, l = i, r.text("Load", !0), r.removeClass("disabled"), _this15.fileError = !1);
                });
              } catch (e) {
                r.addClass("disabled"), _this15.errorMessage = "This file is corrupted.", _this15.fileError = !0;
              }
            });
          }));
        }
      },
      validate: function validate() {
        l && (n.emit("loadProject", l), this.hide());
      }
    }
  });
  e.exports = i;
}, function (e, t, i) {
  var c = i(1),
      d = i(0),
      u = i(2),
      o = i(5),
      s = i(8),
      n = new Vue({
    el: "#spritesheetExportApp",
    data: {
      hidden: !0
    },
    methods: {
      show: function show() {
        var _this16 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this16.$el.style.opacity = "1", u.query("#spritesheetExportApp .drag").draggable({
            restrict: !0,
            root: _this16.$el
          }), u.query("#spritesheetExportApp .custom-checkbox", !0).on("click", function (e) {
            u.query(e.target).query(".checkbox").toggleClass("checked");
          }), u.query("#spritesheetName").value(s.generate());
          var e = o.graph.playbackHandle.start.mark + 1,
              t = o.graph.playbackHandle.end.mark + 1,
              i = rigModel.bounds,
              n = i.max.x - i.min.x,
              r = i.max.y - i.min.y,
              a = Math.ceil(Math.sqrt(t - e));
          u.query("#spritesheetStart").value(e), u.query("#spritesheetEnd").value(t), u.query("#spritesheetCellWidth").value(n.toFixed(2)), u.query("#spritesheetCellHeight").value(r.toFixed(2)), u.query("#spritesheetRowCount").value(a), setTimeout(function () {
            document.getElementById("spritesheetName").focus();
          }, 100), c.emit("renderSleep");
        });
      },
      hide: function hide() {
        this.hidden = !0, c.emit("renderFocus");
      },
      validateFormat: function validateFormat(e) {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e);
      },
      validateAmount: function validateAmount(e) {
        this.validateMin(e), this.validateMax(e);
      },
      validateMax: function validateMax(e) {
        var t = e.target.value,
            i = e.target.dataset.max;
        "spritesheetRowCount" == e.target.id && (i = parseInt(u.query("#spritesheetEnd").value()) - parseInt(u.query("#spritesheetStart").value()) + 1), "spritesheetStart" == e.target.id && (i = parseInt(u.query("#spritesheetEnd").value())), "spritesheetEnd" == e.target.id && (i = o.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "spritesheetEnd" == e.target.id && (i = parseInt(u.query("#spritesheetStart").value())), parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(i) {
        if (i.target == document.activeElement) {
          i.target.value.length || (i.target.value = 1);

          var _e44 = i.wheelDeltaY < 0,
              _t28 = parseFloat(i.target.value);

          _e44 ? _t28-- : _t28++, "spritesheetCellWidth" != i.target.id && "spritesheetCellHeight" != i.target.id || (_t28 = _t28.toFixed(2)), i.target.value = _t28.toString(), this.validateAmount(i);
        }
      },
      validate: function validate() {
        var e = u.query("#spritesheetName").value(),
            t = parseInt(u.query("#spritesheetStart").value()),
            i = parseInt(u.query("#spritesheetEnd").value()),
            n = i - t + 1,
            r = parseFloat(u.query("#spritesheetCellWidth").value()),
            a = parseFloat(u.query("#spritesheetCellHeight").value()),
            o = parseInt(u.query("#spritesheetRowCount").value()),
            s = u.query("#spritesheetShowSkin").query(".checkbox").hasClass("checked"),
            l = u.query("#spritesheetShowBones").query(".checkbox").hasClass("checked"),
            h = Math.ceil(n / o);
        c.emit("exportSpritesheet", {
          name: e.length ? e : d.uid(),
          start: t,
          end: i,
          totalFrames: n,
          cellWidth: r,
          cellHeight: a,
          rows: o,
          cols: h,
          showSkin: s,
          showBones: l
        });
      }
    }
  });
  e.exports = n;
}, function (e, t, i) {
  var l = i(1),
      h = i(0),
      c = i(2),
      a = i(5),
      o = i(8),
      n = new Vue({
    el: "#framesExportApp",
    data: {
      hidden: !0
    },
    methods: {
      show: function show() {
        var _this17 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this17.$el.style.opacity = "1", c.query("#framesExportApp .drag").draggable({
            restrict: !0,
            root: _this17.$el
          }), c.query("#framesExportApp .custom-checkbox", !0).on("click", function (e) {
            c.query(e.target).query(".checkbox").toggleClass("checked");
          }), c.query("#framesExportName").value(o.generate());
          var e = a.graph.playbackHandle.start.mark + 1,
              t = a.graph.playbackHandle.end.mark + 1,
              i = rigModel.bounds,
              n = i.max.x - i.min.x,
              r = i.max.y - i.min.y;
          c.query("#framesExportStart").value(e), c.query("#framesExportEnd").value(t), c.query("#framesExportWidth").value(n.toFixed(2)), c.query("#framesExportHeight").value(r.toFixed(2)), setTimeout(function () {
            document.getElementById("framesExportName").focus();
          }, 100), l.emit("renderSleep");
        });
      },
      hide: function hide() {
        this.hidden = !0, l.emit("renderFocus");
      },
      validateFormat: function validateFormat(e) {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e);
      },
      validateAmount: function validateAmount(e) {
        this.validateMin(e), this.validateMax(e);
      },
      validateMax: function validateMax(e) {
        var t = e.target.value,
            i = e.target.dataset.max;
        "framesExportStart" == e.target.id && (i = parseInt(c.query("#framesExportEnd").value())), "framesExportEnd" == e.target.id && (i = a.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "framesExportEnd" == e.target.id && (i = parseInt(c.query("#framesExportStart").value())), parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(i) {
        if (i.target == document.activeElement) {
          i.target.value.length || (i.target.value = 1);

          var _e45 = i.wheelDeltaY < 0,
              _t29 = parseFloat(i.target.value);

          _e45 ? _t29-- : _t29++, "framesExportWidth" != i.target.id && "framesExportHeight" != i.target.id || (_t29 = _t29.toFixed(2)), i.target.value = _t29.toString(), this.validateAmount(i);
        }
      },
      validate: function validate() {
        var e = c.query("#framesExportName").value(),
            t = parseInt(c.query("#framesExportStart").value()),
            i = parseInt(c.query("#framesExportEnd").value()),
            n = i - t + 1,
            r = parseFloat(c.query("#framesExportWidth").value()),
            a = parseFloat(c.query("#framesExportHeight").value()),
            o = c.query("#framesExportShowSkin").query(".checkbox").hasClass("checked"),
            s = c.query("#framesExportShowBones").query(".checkbox").hasClass("checked");
        l.emit("exportFrames", {
          name: e.length ? e : h.uid(),
          start: t,
          end: i,
          totalFrames: n,
          frameWidth: r,
          frameHeight: a,
          showSkin: o,
          showBones: s
        });
      }
    }
  });
  e.exports = n;
}, function (e, t, i) {
  var h = i(1),
      c = i(0),
      d = i(2),
      a = i(5),
      o = i(8),
      n = new Vue({
    el: "#GIFExportApp",
    data: {
      hidden: !0
    },
    methods: {
      show: function show() {
        var _this18 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this18.$el.style.opacity = "1", d.query("#GIFExportApp .drag").draggable({
            restrict: !0,
            root: _this18.$el
          }), d.query("#GIFExportApp .custom-checkbox", !0).on("click", function (e) {
            d.query(e.target).query(".checkbox").toggleClass("checked");
          }), d.query("#GIFExportName").value(o.generate());
          var e = a.graph.playbackHandle.start.mark + 1,
              t = a.graph.playbackHandle.end.mark + 1,
              i = rigModel.bounds,
              n = i.max.x - i.min.x,
              r = i.max.y - i.min.y;
          d.query("#GIFExportStart").value(e), d.query("#GIFExportEnd").value(t), d.query("#GIFExportWidth").value(n.toFixed(2)), d.query("#GIFExportHeight").value(r.toFixed(2)), setTimeout(function () {
            document.getElementById("GIFExportName").focus();
          }, 100), h.emit("renderSleep");
        });
      },
      hide: function hide() {
        this.hidden = !0, h.emit("renderFocus");
      },
      validateFormat: function validateFormat(e) {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e);
      },
      validateAmount: function validateAmount(e) {
        this.validateMin(e), this.validateMax(e);
      },
      validateMax: function validateMax(e) {
        var t = e.target.value,
            i = e.target.dataset.max;
        "GIFExportStart" == e.target.id && (i = parseInt(d.query("#GIFExportEnd").value())), "GIFExportEnd" == e.target.id && (i = a.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "GIFExportEnd" == e.target.id && (i = parseInt(d.query("#GIFExportStart").value())), parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(i) {
        if (i.target == document.activeElement) {
          i.target.value.length || (i.target.value = 1);

          var _e46 = i.wheelDeltaY < 0,
              _t30 = parseFloat(i.target.value);

          _e46 ? _t30-- : _t30++, "GIFExportWidth" != i.target.id && "GIFExportHeight" != i.target.id || (_t30 = _t30.toFixed(2)), i.target.value = _t30.toString(), this.validateAmount(i);
        }
      },
      validate: function validate() {
        var e = d.query("#GIFExportName").value(),
            t = parseInt(d.query("#GIFExportStart").value()),
            i = parseInt(d.query("#GIFExportEnd").value()),
            n = i - t + 1,
            r = parseFloat(d.query("#GIFExportWidth").value()),
            a = parseFloat(d.query("#GIFExportHeight").value()),
            o = d.query("#GIFExportBackground").value(),
            s = d.query("#GIFExportShowSkin").query(".checkbox").hasClass("checked"),
            l = d.query("#GIFExportShowBones").query(".checkbox").hasClass("checked");
        h.emit("exportGIF", {
          name: e.length ? e : c.uid(),
          start: t,
          end: i,
          totalFrames: n,
          width: r,
          height: a,
          showSkin: s,
          showBones: l,
          background: o
        });
      }
    }
  });
  e.exports = n;
}, function (e, t, i) {
  var u = i(23),
      l = i(11),
      p = i(32),
      f = i(2),
      o = i(1),
      L = i(7),
      n = i(4),
      r = i(35),
      h = i(0),
      g = i(3),
      H = i(36),
      D = i(9),
      c = i(10),
      a = i(42);
  o.emit("loadedApps", H), window.rigModel = D;
  var s,
      d,
      m = [],
      y = !1,
      v = null,
      b = g.world.zoom,
      k = L(),
      w = L(),
      x = L(),
      S = {
    pan: "pan",
    select: "select",
    add: "add",
    move: "move",
    remove: "remove"
  },
      E = {
    KeyQ: S.pan,
    KeyW: S.select,
    KeyE: S.move,
    KeyR: S.add,
    KeyT: S.remove
  },
      A = {},
      C = S.pan;
  A.add = "assets/svg/joint-plus.svg", A.select = "assets/svg/joint-click.svg", A.move = "assets/svg/joint-arrow.svg", A.remove = "assets/svg/joint-trash.svg", A.pan = "assets/svg/quad-arrow.svg";
  var j = {
    add: f.query("#addJoint"),
    select: f.query("#selectJoint"),
    move: f.query("#moveJoint"),
    remove: f.query("#removeJoint"),
    pan: f.query("#panCamera")
  },
      I = Object.keys(j);

  function T(e) {
    C = e, D.action = e, f.query("#toolApp button", !0).removeClass("active-tool"), f.query(j[e].node).addClass("active-tool"), G.query("img").prop("src", A[e]);
  }

  var _loop6 = function _loop6() {
    var e = _I[_i14];
    j[e].on("click", function () {
      T(S[e]);
    });
  };

  for (var _i14 = 0, _I = I; _i14 < _I.length; _i14++) {
    _loop6();
  }

  i = function i(e) {
    return e.preventDefault();
  };

  f.query(document).on("contextmenu", i), f.query("div", !0).on("drag", i), f.query("div", !0).on("dragstart", i);

  var M = f.query("#materialApp"),
      _ = f.query("#propertyApp #materials");

  function q(e) {
    var i = h.uid();
    var t = URL.createObjectURL(e),
        n = f.create("button"),
        r = n.create("img");
    n.addClass("item"), r.attr("src", t), n.node.addEventListener("click", function () {
      var t, e;
      t = i, (e = m.find(function (e) {
        return e.id === t;
      })) && (_.value(e.src), _.query("label", !0).text(e.file.name, !0), o.emit("materialChange", _.value()));
    }), M.append(n);

    var a = _.query(".options").create("p");

    return a.node.dataset.value = t, a.node.dataset.parentId = "#materials", a.text(e.name), M.node.scrollTop = M.node.scrollHeight, {
      id: i,
      file: e,
      src: t,
      el: n
    };
  }

  function F(i) {
    var n = ["image/gif", "image/jpeg", "image/png", "image/svg+xml"];

    for (var r = 0; r < i.length; r++) {
      var _e47 = void 0,
          _t31 = i[r];

      for (var a, o = 0; o < m.length; o++) {
        var s = m[o];

        if (s.file.name == _t31.name && s.file.lastModified == _t31.lastModified && s.file.size == _t31.size && s.file.type == _t31.type) {
          _e47 = s;
          break;
        }
      }

      n.includes(_t31.type) && (a = q(_t31), m.push(a)), _e47 && _e47.el.remove();
    }
  }

  var B = f.query(".checkbox.checked", !0);

  for (var J = 0; J < B.elements.length; J++) {
    B.elements[J].node.parentNode.checked = !0;
  }

  f.query(".custom-checkbox", !0).on("click", function (e) {
    var t = f.query(e.target).query(".checkbox");
    t.toggleClass("checked"), f.query(e.target).prop("checked", t.hasClass("checked")), "animateSkin" == e.target.id && (g.animateSkin = t.hasClass("checked"));
  });
  var P = f.query("#selectOptions");
  P.on("mousedown", function (e) {
    var t = e.target.dataset.value,
        i = e.target.dataset.parentId,
        n = f.query(i);
    n.value(t), n.query("label").text(e.target.innerText, !0), "#materials" == i && o.emit("materialChange", t);
  }), f.query("#propertyApp").on("mousewheel", function () {
    P.css("display", "none");
  }), f.query(".custom-select", !0).on("mouseup", function (e) {
    var t = f.query(e.target, !0).query(".options");
    var i, n;
    P.html(t.html(), !0), "flex" != P.node.style.display ? (n = (i = t.node.parentNode.getBoundingClientRect()).x, e = i.y + i.height + 5, P.css({
      display: "flex",
      left: n + "px",
      top: e + "px",
      width: i.width + "px"
    }), e + (e = P.node.getBoundingClientRect()).height >= innerHeight && P.css("top", i.y - e.height - 5 + "px"), n + e.width >= innerWidth && P.css("left", i.x - e.width + i.width + "px")) : P.css("display", "none");
  }), M.on("drop", function (e) {
    e.preventDefault(), F(e.dataTransfer.files), f.query("#dropIcon").css("visibility", "hidden");
  });
  var O = f.query("#addMaterial");
  O.on("change", function () {
    F(O.node.files);
  }), M.on("dragenter", function (e) {
    f.query("#dropIcon").css("visibility", "visible");
  }), M.on("dragleave", function (e) {
    f.query("#dropIcon").css("visibility", "hidden");
  }), M.on("dragover", function (e) {
    e.preventDefault();
  }), M.on("mousedown", function (e) {
    for (var t = 0; t < M.node.children.length; t++) {
      M.node.children[t].classList.remove("selected");
    }
  });
  var N = [];
  o.on("saveProject", function (i) {
    var n = f.query("#download");
    n.addClass("disabled"), n.text("Processing...", !0);
    var e = D.toJSON(null, !0),
        t = {
      frameCount: H.timeline.app.totalFrames,
      animationSpeed: H.timeline.app.animationSpeed,
      start: H.timeline.graph.playbackHandle.start.mark,
      end: H.timeline.graph.playbackHandle.end.mark,
      overlay: {
        opacity: H.overlayConfigApp.opacity,
        scale: H.overlayConfigApp.scale,
        angle: H.overlayConfigApp.angle,
        trimStart: H.overlayConfigApp.trimStart,
        trimEnd: H.overlayConfigApp.trimEnd,
        start: H.overlayConfigApp.start
      }
    },
        r = [];

    for (var a = 0; a < N.length; a++) {
      var o = N[a];
      r.push(o.src);
    }

    var s = {
      model: e,
      config: t,
      overlay: r
    };
    l.stringifyAsync(s, function (e, t) {
      try {
        new TextEncoder().encode(t);

        var _n8 = u.createWriteStream(i + ".rigme");

        new Response(t).body.pipeTo(_n8).then(function (e) {}, function (e) {
          console.warn(e);
        });
      } catch (e) {
        console.warn(e);
      }

      f.query("#download").removeClass("disabled"), n.text("Save", !0);
    });
  }), window.onunload = function () {
    writableStream.abort();
  }, o.on("loadProject", function (i) {
    var e;

    if (i.model ? (e = D.fromJSON(i.model), D.reset(), D.import(e)) : console.warn("Couldn't load model."), i.config ? ("number" == typeof i.config.frameCount && (document.getElementById("frameCount").value = i.config.frameCount), "number" == typeof i.config.animationSpeed && (document.getElementById("animationSpeed").value = i.config.animationSpeed), H.timeline.app.fixData(), "number" == typeof i.config.start && (H.timeline.graph.playbackHandle.start.mark = i.config.start), "number" == typeof i.config.end && (H.timeline.graph.playbackHandle.end.mark = i.config.end), H.timeline.graph.redraw(), "number" == typeof i.config.overlay.opacity && (H.overlayConfigApp.opacity = i.config.overlay.opacity), "number" == typeof i.config.overlay.scale && (H.overlayConfigApp.scale = i.config.overlay.scale), "number" == typeof i.config.overlay.angle && (H.overlayConfigApp.angle = i.config.overlay.angle), H.overlayConfigApp.updateSliders(), "number" == typeof i.config.overlay.trimStart && (H.overlayConfigApp.trimStart = i.config.overlay.trimStart), "number" == typeof i.config.overlay.trimEnd && (H.overlayConfigApp.trimEnd = i.config.overlay.trimEnd), "number" == typeof i.config.overlay.start && (H.overlayConfigApp.start = i.config.overlay.start)) : console.warn("Couldn't load configurations."), i.overlay) {
      if (0 < i.overlay.length) {
        N = [], H.optionApp.overlayConfigHidden = !1;

        for (var n = 0; n < i.overlay.length; n++) {
          var _e48 = i.overlay[n],
              _t32 = new Image();

          _t32.src = _e48, N.push(_t32);
        }

        o.emit("overlayFrames", N);
      }
    } else console.warn("Couldn't load overlay.");

    c.add({
      label: "Load",
      value: D.clone(),
      group: "keyframe"
    });
  });
  var R = f.query("#progressBarWrapper"),
      z = f.query("#progressBar"),
      K = f.query("#progressBarWrapper button"),
      U = f.query("#progressBarWrapper p");
  o.on("loadProgress", function (e, t, i) {
    "flex" != R.node.style.display && R.css("display", "flex"), U.text() != t && U.text(t, !0), "function" == typeof i && K.node.onclick != i && (K.node.onclick = i), 100 <= e && o.emit("doneProgress"), z.css("width", e + "%");
  }), o.on("doneProgress", function () {
    R.css("display", "none"), z.css("width", "0");
  }), o.on("extractFrames", function (e, t) {
    function i() {
      H.optionApp.overlayConfigHidden = !1, o.emit("overlayFrames", N), o.emit("doneProgress");
    }

    N = [], o.emit("loadProgress", 0, "Extracting frames..."), a(e, {
      frameCount: t.frameCount,
      frameRate: t.frameRate,
      start: t.start,
      end: t.end,
      quality: t.quality,
      drop: !1,
      progress: function progress(e, t) {
        var _this19 = this;

        o.emit("loadProgress", t, "Extracting frames...", function () {
          _this19.drop = !0, i();
        }), N.push(e);
      },
      done: function done(e) {
        N = e, i();
      }
    });
  }), o.on("removeOverlay", function () {
    N = [], H.optionApp.overlayConfigHidden = !0;
  }), o.on("rotoscope", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var z;
    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!N.length) {
              _context3.next = 2;
              break;
            }

            return _context3.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var e, y, v, b, k, w, x, S, E, A, C, j, I, T, M, _, q, F, B, J, P, O, R, _loop7;

              return regeneratorRuntime.wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      e = posenet.load({
                        architecture: "MobileNetV1",
                        outputStride: 16,
                        inputResolution: {
                          width: 257,
                          height: 200
                        },
                        quantBytes: 2,
                        multiplier: .75,
                        flipHorizontal: !1
                      });
                      o.emit("loadProgress", 0, "Feeding frames to PoseNet..."), o.emit("changeRiggingMode", "linear"), D.reset();
                      y = D.addJoint(0, 0);
                      y.name = "Head";
                      v = D.addJoint(0, 0);
                      v.name = "Chin";
                      b = D.addJoint(0, 0);
                      b.name = "Neck";
                      k = D.addJoint(0, 0);
                      k.name = "Abdomen";
                      w = D.addJoint(0, 0);
                      w.name = "Groin", D.activeJoint = b;
                      x = D.addJoint(0, 0);
                      x.name = "Right Shoulder";
                      S = D.addJoint(0, 0);
                      S.name = "Right Elbow";
                      E = D.addJoint(0, 0);
                      E.name = "Right Wrist";
                      A = D.addJoint(0, 0);
                      A.name = "Right Hand", D.activeJoint = b;
                      C = D.addJoint(0, 0);
                      C.name = "Left Shoulder";
                      j = D.addJoint(0, 0);
                      j.name = "Left Elbow";
                      I = D.addJoint(0, 0);
                      I.name = "Left Wrist";
                      T = D.addJoint(0, 0);
                      T.name = "Left Hand", D.activeJoint = w;
                      M = D.addJoint(0, 0);
                      M.name = "Right Hip";
                      _ = D.addJoint(0, 0);
                      _.name = "Right Knee";
                      q = D.addJoint(0, 0);
                      q.name = "Right Ankle";
                      F = D.addJoint(0, 0);
                      F.name = "Right Foot", D.activeJoint = w;
                      B = D.addJoint(0, 0);
                      B.name = "Left Hip";
                      J = D.addJoint(0, 0);
                      J.name = "Left Knee";
                      P = D.addJoint(0, 0);
                      P.name = "Left Ankle";
                      R = D.addJoint(0, 0);
                      R.name = "Left Foot";
                      _loop7 = /*#__PURE__*/regeneratorRuntime.mark(function _loop7() {
                        var m;
                        return regeneratorRuntime.wrap(function _loop7$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                m = N[z];
                                _context.next = 3;
                                return e.then(function (e) {
                                  return e.estimateSinglePose(m);
                                }).then(function (h) {
                                  var e = z / (N.length - 1) * 100;

                                  if (o.emit("loadProgress", e, "Rotoscoping...", function () {
                                    z = N.length, e = 100, o.emit("doneProgress");
                                  }), 100 != e) {
                                    var _e49 = [],
                                        _t33 = [];

                                    for (var c = 0; c < h.keypoints.length; c++) {
                                      var d = h.keypoints[c];
                                      _e49.push(d.position.x), _t33.push(d.position.y);
                                    }

                                    var _i15 = Math.min.apply(Math, _e49),
                                        _n9 = Math.min.apply(Math, _t33),
                                        _r4 = Math.max.apply(Math, _e49),
                                        _a2 = Math.max.apply(Math, _t33),
                                        _o4 = (_i15 + _r4) / 2,
                                        _s3 = (_n9 + _a2) / 2;

                                    for (c = 0; c < h.keypoints.length; c++) {
                                      var _e50 = h.keypoints[c].position,
                                          _t34 = _e50.x - _o4,
                                          _i16 = _e50.y - _s3;

                                      _e50.x = _e50.x + _t34 * (H.overlayConfigApp.scale - 1), _e50.y = _e50.y + _i16 * (H.overlayConfigApp.scale - 1);
                                    }

                                    for (c = 0; c < h.keypoints.length; c++) {
                                      var _e51 = h.keypoints[c].position,
                                          _t35 = (_e51.x - _o4) * Math.cos(H.overlayConfigApp.angle) - (_e51.y - _s3) * Math.sin(H.overlayConfigApp.angle),
                                          _i17 = (_e51.x - _o4) * Math.sin(H.overlayConfigApp.angle) + (_e51.y - _s3) * Math.cos(H.overlayConfigApp.angle);

                                      _e51.x = _t35 + _o4, _e51.y = _i17 + _s3;
                                    }

                                    for (c = 0; c < h.keypoints.length; c++) {
                                      var _e52 = h.keypoints[c];

                                      switch (_e52.position.x -= m.width / 2, _e52.position.y -= m.height / 2, _e52.part) {
                                        case "leftShoulder":
                                          x = D.moveJointById(x.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "leftElbow":
                                          S = D.moveJointById(S.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "leftWrist":
                                          E = D.moveJointById(E.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "rightShoulder":
                                          C = D.moveJointById(C.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "rightElbow":
                                          j = D.moveJointById(j.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "rightWrist":
                                          I = D.moveJointById(I.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "leftHip":
                                          M = D.moveJointById(M.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "leftKnee":
                                          _ = D.moveJointById(_.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "leftAnkle":
                                          q = D.moveJointById(q.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "rightHip":
                                          B = D.moveJointById(B.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "rightKnee":
                                          J = D.moveJointById(J.id, _e52.position.x, _e52.position.y);
                                          break;

                                        case "rightAnkle":
                                          P = D.moveJointById(P.id, _e52.position.x, _e52.position.y);
                                      }
                                    }

                                    var _l = L({
                                      x: (M.position.x + B.position.x) / 2,
                                      y: (M.position.y + B.position.y) / 2
                                    });

                                    w = D.moveJointById(w.id, _l.x, _l.y);

                                    var u = _l.heading(b.position),
                                        p = _l.dist(b.position),
                                        f = _l.x + Math.cos(u) * (p / 2),
                                        g = _l.y + Math.sin(u) * (p / 2);

                                    k = D.moveJointById(k.id, f, g);
                                    u = L({
                                      x: (x.position.x + C.position.x) / 2,
                                      y: (x.position.y + C.position.y) / 2
                                    }), f = x.position.heading(C.position) - Math.PI / 2, g = p / 2, p = p / 6;
                                    b = D.moveJointById(b.id, u.x, u.y), v = D.moveJointById(v.id, u.x, u.y - p);
                                    p = v.position.x - Math.cos(f) * g, f = v.position.y - Math.sin(f) * g;
                                    y = D.moveJointById(y.id, p, f);
                                    g = x.position.heading(E.position), p = S.position.dist(E.position) / 2, f = E.position.x + Math.cos(g) * p, g = E.position.y + Math.sin(g) * p;
                                    A = D.moveJointById(A.id, f, g);
                                    p = C.position.heading(I.position), f = j.position.dist(I.position) / 2, g = I.position.x + Math.cos(p) * f, p = I.position.y + Math.sin(p) * f;
                                    T = D.moveJointById(T.id, g, p);
                                    f = M.position.heading(_.position), g = q.position.dist(_.position) / 4, p = q.position.x + Math.cos(f) * g, f = q.position.y + Math.sin(f) * g;
                                    F = D.moveJointById(F.id, p, f);
                                    g = B.position.heading(J.position), p = P.position.dist(J.position) / 4, f = P.position.x + Math.cos(g) * p, p = P.position.y + Math.sin(g) * p;

                                    if (R = D.moveJointById(R.id, f, p), O) {
                                      var _loop8 = function _loop8() {
                                        var i = O.keypoints[c],
                                            n = h.keypoints.find(function (e) {
                                          return e.part == i.part;
                                        });

                                        if (n) {
                                          var _e53 = L(i.position),
                                              _t36 = L(n.position);

                                          if (_e53.dist(_t36) > 10 * H.overlayConfigApp.scale) {
                                            H.timeline.graph.setCurrentMark(z), H.timeline.graph.updateState(), D.setKeyframe(z), O = JSON.parse(JSON.stringify(h));
                                            return "break";
                                          }
                                        }
                                      };

                                      for (c = 0; c < O.keypoints.length; c++) {
                                        var _ret = _loop8();

                                        if (_ret === "break") break;
                                      }
                                    } else H.timeline.graph.setCurrentMark(z), D.setKeyframe(z), O = JSON.parse(JSON.stringify(h));
                                  }
                                });

                              case 3:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _loop7);
                      });
                      z = 0;

                    case 46:
                      if (!(z < N.length)) {
                        _context2.next = 51;
                        break;
                      }

                      return _context2.delegateYield(_loop7(), "t0", 48);

                    case 48:
                      z++;
                      _context2.next = 46;
                      break;

                    case 51:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee);
            })(), "t0", 2);

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }))), window.events = o, o.on("exportSpritesheet", function (e) {
    var t = document.createElement("canvas");
    t.width = e.cellWidth * e.cols, t.height = e.cellHeight * e.rows;
    var i,
        n = t.getContext("2d");

    for (var r = e.start - 1; r <= e.end - 1; r++) {
      var a = r - e.start + 1,
          o = Math.floor(a % e.cols) * e.cellWidth,
          s = Math.floor(a / e.cols) * e.cellHeight,
          a = D.keyframes[r];
      a && (i = r, D.updateSkin(a.joints)), D.renderTo(n, {
        frame: D.keyframes[r] ? r : i,
        position: {
          x: o,
          y: s
        },
        showSkin: e.showSkin,
        showBones: e.showBones
      });
    }

    var l = t.toDataURL("image/png"),
        h = document.createElement("a");
    h.download = e.name, h.href = l, h.click();
  }), o.on("exportFrames", function (s) {
    var l = f.query("#exportFrames");
    l.text("Processing...", !0), l.addClass("disabled");
    var h = 0,
        c = 0;
    var d = new ZIP({
      start: function start(r) {
        var a;

        var _loop9 = function _loop9() {
          var e = document.createElement("canvas");
          e.width = s.frameWidth, e.height = s.frameHeight;
          var t = e.getContext("2d"),
              i = o - s.start + 1,
              n = D.keyframes[o];
          n && (a = o, D.updateSkin(n.joints)), D.renderTo(t, {
            frame: D.keyframes[o] ? o : a,
            showSkin: s.showSkin,
            showBones: s.showBones
          }), e.toBlob(function (e) {
            var t = {
              name: "frames/".concat(i, ".png"),
              stream: function stream() {
                return e.stream();
              }
            };

            if (r.enqueue(t), h++, c += e.size, h >= s.totalFrames) {
              r.close();

              var _h2 = u.createWriteStream(s.name + ".zip", {
                size: c
              });

              d.pipeTo(_h2), l.text("Export", !0), l.removeClass("disabled");
            }
          }, "image/png");
        };

        for (var o = s.start - 1; o <= s.end - 1; o++) {
          _loop9();
        }
      }
    });
  }), o.on("exportGIF", function (n) {
    var r = f.query("#exportGIF");
    r.text("Processing...", !0), r.addClass("disabled");
    var a = new GIF({
      workers: 4,
      quality: 10,
      repeat: 0,
      width: n.width,
      height: n.height,
      dither: !0,
      workerScript: "lib/gif.worker.js"
    });
    var o;

    for (var s = n.start - 1; s <= n.end - 1; s++) {
      var _e54 = document.createElement("canvas");

      _e54.width = n.width, _e54.height = n.height;

      var _t37 = _e54.getContext("2d"),
          _i18 = D.keyframes[s];

      _i18 && (o = s, D.updateSkin(_i18.joints)), _t37.fillStyle = n.background, _t37.fillRect(0, 0, _e54.width, _e54.height), D.renderTo(_t37, {
        frame: D.keyframes[s] ? s : o,
        showSkin: n.showSkin,
        showBones: n.showBones
      }), a.addFrame(_e54, {
        delay: 1e3 / H.timeline.app.animationSpeed
      });
    }

    a.render(), a.on("finished", function (e) {
      try {
        a.abort(), r.text("Export", !0), r.removeClass("disabled");

        var _t38 = u.createWriteStream(n.name + ".gif", {
          size: e.size
        }),
            _i19 = e.stream();

        if (window.WritableStream && _i19.pipeTo) return _i19.pipeTo(_t38);
      } catch (e) {
        console.warn(e);
      }
    });
  }), o.on("changeRiggingMode", function (e) {
    switch (Y.removeClass("selected"), e) {
      case "linear":
        f.query("#riggingMode #linear").addClass("selected"), g.riggingMode = "linear";
        break;

      case "inverse":
        f.query("#riggingMode #inverseKinematics").addClass("selected"), g.riggingMode = "inverseKinematics";
        break;

      case "forward":
        f.query("#riggingMode #forwardKinematics").addClass("selected"), g.riggingMode = "forwardKinematics";
    }
  });
  var Y = f.query("#riggingMode button", !0);
  Y.on("click", function (e) {
    o.emit("changeRiggingMode", e.target.dataset.mode);
  });
  var W = f.query("#autoAddKeyframe");
  W.on("click", function () {
    W.toggleClass("selected"), W.hasClass("selected") ? g.animation.autoAddKeyframe = !0 : g.animation.autoAddKeyframe = !1;
  }), f.query("#focusRig").on("click", function () {
    D.bounds && D.joints.length && (k.x = (D.bounds.min.x + D.bounds.max.x) / 2, k.y = (D.bounds.min.y + D.bounds.max.y) / 2);
  });
  var $ = f.query("#displayCropApp");

  function X(s) {
    var l = f.query("#propertyApp");

    if (s) {
      H.timeline.graph.state.isPlaying || l.removeClass("disabled");

      var _e55 = l.query("#jointName"),
          _t39 = l.query("#jointLength"),
          _i20 = l.query("#jointZIndex");

      _e55.value(s.name), _t39.value(s.length.toFixed(2)), _i20.value(parseInt(s.zIndex)), _i20.node._lastValue || (_i20.node._lastValue = _i20.value()), _e55.node._lastValue || (_e55.node._lastValue = _e55.value());

      var _n10 = l.query("#jointX"),
          _r5 = l.query("#jointY"),
          _a3 = l.query("#jointAngle");

      _n10.value(s.position.x.toFixed(2)), _r5.value(s.position.y.toFixed(2));

      var _o5 = h.degrees(h.map(s.angle, -Math.PI, Math.PI, 0, 2 * Math.PI));

      if (_a3.value(_o5.toFixed(2)), s.skin && (s.skin.imageSrc ? $.removeClass("disabled") : $.addClass("disabled"), s.skin.offset)) {
        var _e56 = f.query("#skinPositionX"),
            _t40 = f.query("#skinPositionY"),
            _i21 = f.query("#skinScaleX"),
            _n11 = f.query("#skinScaleY"),
            _r6 = f.query("#skinAngle");

        _e56.value(s.skin.offset.x.toFixed(2)), _t40.value(s.skin.offset.y.toFixed(2)), _i21.value(s.skin.offset.scaleX.toFixed(2)), _n11.value(s.skin.offset.scaleY.toFixed(2));

        var _a4 = h.degrees(s.skin.offset.angle);

        _r6.value(_a4.toFixed(2)), _e56.node._lastValue || (_e56.node._lastValue = _e56.value()), _t40.node._lastValue || (_t40.node._lastValue = _t40.value()), _i21.node._lastValue || (_i21.node._lastValue = _i21.value()), _n11.node._lastValue || (_n11.node._lastValue = _n11.value()), _r6.node._lastValue || (_r6.node._lastValue = _r6.value());
      }
    } else l.addClass("disabled");
  }

  var V;
  $.on("click", function () {
    var t = D.activeJoint;

    if (t && t.skin && t.skin.imageSrc) {
      var _e57 = new Image();

      _e57.src = t.skin.imageSrc, _e57.onload = function () {
        t.skin._vueCrop && (H.cropApp.cropFrom = t.skin._vueCrop.from, H.cropApp.cropTo = t.skin._vueCrop.to), H.cropApp.show(_e57), s = t;
      };
    }
  }), f.query("#removeSkin").on("click", function () {
    var t = D.activeJoint;

    if (t && t.skin && t.skin.imageSrc) {
      var _e58 = JSON.parse(JSON.stringify(t.skin));

      delete _e58.imageSrc, delete _e58.image, D.editJoint(t.id, {
        skin: _e58
      }), c.add({
        label: "Remove joint skin",
        value: D.clone(),
        group: "keyframe"
      });
    }
  }), f.query("#resetOffset").on("click", function () {
    var t = D.activeJoint;

    if (t && t.skin && t.skin.offset && (0 != t.skin.offset.x || 0 != t.skin.offset.y || 1 != t.skin.offset.scaleX || 1 != t.skin.offset.scaleY || 0 != t.skin.offset.angle)) {
      var _e59 = JSON.parse(JSON.stringify(t.skin));

      _e59.offset.x = 0, _e59.offset.y = 0, _e59.offset.scaleX = 1, _e59.offset.scaleY = 1, _e59.offset.angle = 0, D.editJoint(t.id, {
        skin: _e59
      }, !0), X(t), c.add({
        label: "Reset transform offset",
        value: D.clone(),
        group: "keyframe"
      }), D.updateSkin(), D.updateBounds();
    }
  }), o.on("crop", function (i, n) {
    D.editJoints(function (e, t) {
      e.id === s.id && (e.skin.crop = JSON.parse(JSON.stringify(i)), e.skin._vueCrop = {
        from: {
          x: n.from.x,
          y: n.from.y
        },
        to: {
          x: n.to.x,
          y: n.to.y
        }
      }, D.updateSkin(t.joints));
    }), D.updateSubKeyframes(), D.updateBounds(), c.add({
      label: "Crop skin",
      value: D.clone(),
      group: "keyframe"
    });
  }), o.on("materialChange", function (e) {
    var s = D.activeJoint;
    e ? ($.removeClass("disabled"), h.loadImage(e).then(function (o) {
      if (s) {
        var _e60 = parseFloat(f.query("#skinPositionX").value()),
            _t41 = parseFloat(f.query("#skinPositionY").value()),
            _i22 = parseFloat(f.query("#skinScaleX").value()),
            _n12 = parseFloat(f.query("#skinScaleY").value()),
            _r7 = parseFloat(f.query("#skinAngle").value()),
            _a5 = {
          from: {
            x: 0,
            y: 0
          },
          to: {
            x: o.width,
            y: o.height
          }
        };

        s.skin && (s.skin.crop && (_a5.from.x = s.skin.crop.from.x, _a5.from.y = s.skin.crop.from.y, _a5.to.x = s.skin.crop.to.x, _a5.to.y = s.skin.crop.to.y), s.skin.offset = {
          x: _e60 || 0,
          y: _t41 || 0,
          scaleX: _i22 || 0,
          scaleY: _n12 || 0,
          angle: h.radians(h.map(_r7, 0, 360, -180, 180)) + Math.PI || 0
        }), D.editJoints(function (e, t) {
          var i;
          e.id === s.id && (e.skin.imageSrc = o.url, e.skin.image = new Image(), e.skin.image.src = o.url, e.skin.crop = JSON.parse(JSON.stringify(_a5)), "object" == _typeof(i = s.skin._vueCrop) && i && (e.skin._vueCrop = JSON.parse(JSON.stringify(i)) || null), D.updateSkin(t.joints));
        }), D.updateSubKeyframes(), D.updateBounds(), c.add({
          label: "Change skin",
          value: D.clone(),
          group: "keyframe"
        });
      }
    })) : $.addClass("disabled");
  }), o.on("timelineSeeked", function () {
    var e;
    H.timeline.graph.state.isPlaying || ((e = D.activeJoint) && X(e), o.emit("jointChange", D.joints), d = "timeline");
  }), o.on("jointChange", function (i) {
    i = i || D.joints;
    var e = f.query("#jointApp");

    for (var n = 0; n < i.length; n++) {
      var t = i[n];
      e.query("#" + t.id).node || (t = function (t, e) {
        var i = f.create("div");
        i.addClass("joint");
        var n = i.create("button");
        n.addClass("name", "darko-d"), n.create("img").attr("src", "assets/svg/joint.svg"), n.create("p").text(e), i.create("div").addClass("children"), i.attr("id", t), f.query("#jointApp button.name.active", !0).removeClass("active"), (e = D.joints.find(function (e) {
          return e.id === t;
        })) && D.activeJoint == e && n.addClass("active");
        var r = f.query("#jointApp");
        return r.node.scrollTop = r.node.scrollHeight, r.node.scrollLeft = r.node.scrollWidth, n.on("click", function () {
          var e;
          n.hasClass("active") || (f.query("#jointApp button.name.active").removeClass("active"), n.addClass("active"), (e = D.joints.find(function (e) {
            return e.id === t;
          })) && D.selectJoint(e.position.x, e.position.y)), H.timeline.graph.state.isPlaying && H.timeline.graph.stop(), d = "joints";
        }), n.on("dblclick", function () {
          k.set(D.activeJoint.position);
        }), i;
      }(t.id, t.name), e.append(t));
    }

    var _loop10 = function _loop10() {
      var t = r.elements[n],
          e = i.find(function (e) {
        return e.id === t.node.id;
      });
      e && e.parent && f.query("#" + e.parent.id + " > .children").append(t);
    };

    for (var r = f.query("#jointApp > *", !0), n = 0; n < r.elements.length; n++) {
      _loop10();
    }

    var a = f.query("#jointApp .joint", !0);

    var _loop11 = function _loop11() {
      var i = a.elements[n],
          e = D.joints.find(function (e) {
        return e.id === i.node.id;
      });
      if (e) i.node.id === D.activeJoint.id ? i.query("button.name", !0).addClass("active") : i.query("button.name.active", !0).removeClass("active"), i.query("button.name").text(e.name, !0);else {
        var _t42 = f.query(i.node.parentNode.parentNode);

        if (_t42) {
          var _e61;

          _e61 = _t42.hasClass("joint") ? f.query("#" + _t42.node.id + " > .children") : f.query("#jointApp");
          o = f.query("#" + i.node.id + " > .children > .joint", !0);

          _e61.append(o);
        }

        i.remove();
      }
    };

    for (n = 0; n < a.elements.length; n++) {
      var o;

      _loop11();
    }

    X(D.activeJoint), D.activeJoint && (D.activeJoint.parent ? (f.query(f.query("#jointAngle").node.parentNode).css("display", "flex"), f.query(f.query("#jointLength").node.parentNode).css("display", "flex"), f.query(".section.skinning", !0).css("display", "flex")) : (f.query(f.query("#jointAngle").node.parentNode).css("display", "none"), f.query(f.query("#jointLength").node.parentNode).css("display", "none"), f.query(".section.skinning").css("display", "none")));
  }), o.on("jointNameInputChange", function (e) {
    var t = D.activeJoint;
    var i;
    t && (i = f.query("#jointName").value(), t.name = i, D.editJoint(t.id, {
      name: i
    }), o.emit("jointChange"), e || c.add({
      label: "Change joint name",
      value: D.clone(),
      group: "keyframe"
    }));
  }), o.on("jointZIndexInputChange", function (e) {
    var t = D.activeJoint;
    var i;
    t && (i = f.query("#jointZIndex").value(), t.zIndex = i, D.editJoint(t.id, {
      zIndex: i
    }), o.emit("jointChange"), e || c.add({
      label: "Change joint Z-Index",
      value: D.clone(),
      group: "keyframe"
    }));
  }), o.on("jointSkinningInputChange", function (o) {
    var s = D.activeJoint;

    if (s) {
      var _e62 = s.skin,
          _t43 = parseFloat(f.query("#skinPositionX").value()),
          _i23 = parseFloat(f.query("#skinPositionY").value()),
          _n13 = parseFloat(f.query("#skinScaleX").value()),
          _r8 = parseFloat(f.query("#skinScaleY").value()),
          _a6 = parseFloat(f.query("#skinAngle").value());

      _e62.offset = {
        x: _t43,
        y: _i23,
        scaleX: _n13,
        scaleY: _r8,
        angle: h.radians(h.map(_a6, 0, 360, -180, 180)) + Math.PI
      }, g.animateSkin || D.editJoint(s.id, {
        skin: _e62
      }, !0), o || c.add({
        label: "Change skin offset",
        value: D.clone(),
        group: "keyframe"
      }), D.updateSubKeyframes(), D.updateBounds();
    }
  }), o.on("jointPositionInputChange", function () {
    var e, t;
    D.activeJoint && (e = parseFloat(f.query("#jointX").value()) || 0, t = parseFloat(f.query("#jointY").value()) || 0, D.moveJoint(e, t));
  }), o.on("jointAngleInputChange", function () {
    var e,
        t,
        i = D.activeJoint;
    i && i.parent && (e = parseFloat(f.query("#jointAngle").value()) || 0, e = h.radians(h.map(e, 0, 360, -180, 180)), t = i.parent.position.x - Math.cos(e) * i.length, i = i.parent.position.y - Math.sin(e) * i.length, D.moveJoint(t, i));
  }), o.on("jointLengthInputChange", function () {
    var e = D.activeJoint;
    var t;
    e && (t = parseFloat(f.query("#jointLength").value()) || 0, e.length = t, D.moveJoint(e.position.x, e.position.y));
  }), o.on("undo", function () {
    var t = c.getPrevious();

    if (t) {
      "keyframe" == t.group && (D.import(t.value), c.backward(), H.timeline.graph.updateState(), H.timeline.graph.redraw(), X(D.activeJoint)), f.query(".history.current", !0).removeClass("current");

      var _e63 = f.query("#" + t.id);

      _e63.addClass("current"), f.query("#historyApp").node.scrollTop = _e63.node.offsetTop;
    }
  }), o.on("redo", function () {
    var t = c.getNext();

    if (t) {
      "keyframe" == t.group && (D.import(t.value), c.forward(), H.timeline.graph.updateState(), H.timeline.graph.redraw(), X(D.activeJoint)), f.query(".history.current", !0).removeClass("current");

      var _e64 = f.query("#" + t.id);

      _e64.addClass("current"), f.query("#historyApp").node.scrollTop = _e64.node.offsetTop;
    }
  }), o.on("historyChange", function () {
    var e;
    c.eventCount % g.autosave.threshold == 0 && (e = D.toJSON(null, !0), localStorage.setItem(g.autosave.label, JSON.stringify(e)));

    var _loop12 = function _loop12() {
      var t = i.elements[n].node;
      c.events.find(function (e) {
        return e.id === t.id;
      }) || t.remove();
    };

    for (var i = f.query("#historyApp .history", !0), n = 0; n < i.elements.length; n++) {
      _loop12();
    }

    !function (e) {
      var t = f.query("#historyApp");
      t.query(".history.current", !0).removeClass("current");
      var i = t.create("div");
      i.attr("id", e.id), i.addClass("history", "current"), i.create("p").text(e.label), t.node.scrollTop = t.node.scrollHeight, i.on("click", function () {
        "keyframe" == e.group && (t.query(".history.current", !0).removeClass("current"), i.addClass("current"), c.jump(e.id), D.import(e.value), H.timeline.graph.updateState(), H.timeline.graph.redraw(), X(D.activeJoint), H.timeline.graph.state.isPlaying && H.timeline.graph.stop());
      });
    }(c.getLatest());
  }), h.loadJSONData(g.autosave.label, function (e) {
    D.import(D.fromJSON(e)), c.add({
      label: "Load autosave",
      value: D.clone(),
      group: "keyframe"
    });
  }), o.on("clearJoints", function () {
    D.joints.length && f.query("#jointApp *").remove(), D.reset(), f.query("#propertyApp").addClass("disabled");
  }), o.on("resetTimeline", function () {
    document.getElementById("frameCount").value = 30, document.getElementById("animationSpeed").value = 30, H.timeline.app.fixData(), H.timeline.graph.scrollbar.left = 0, H.timeline.graph.scrollbar.right = H.timeline.graph.canvas.width, H.timeline.graph.scrollbar.width = H.timeline.graph.canvas.width, H.timeline.graph.setCurrentMark(0), H.timeline.graph.playbackHandle.start.mark = 0, H.timeline.graph.playbackHandle.start._x = H.timeline.graph.markToX(H.timeline.graph.playbackHandle.start.mark), H.timeline.graph.playbackHandle.end.mark = H.timeline.app.totalFrames - 1, H.timeline.graph.playbackHandle.end._x = H.timeline.graph.markToX(H.timeline.graph.playbackHandle.end.mark), H.timeline.graph.redraw();
  }), o.on("resetCamera", function () {
    w.reset(), k.reset(), b = g.world.zoom;
  }), o.on("deleteKeyframe", function () {
    var e = D.getKeyframe("index", H.timeline.graph.state.currentFrame);
    e && ("head" != e.type || e.locked || (D.deleteKeyframe(e.id), c.add({
      label: "Delete keyframe",
      value: D.clone(),
      group: "keyframe"
    })));
  }), o.on("renderSleep", function () {
    y = !0;
  }), o.on("renderFocus", function () {
    y = !1;
  }), f.query("#fileButton").on("mouseup", function () {
    var e = H.fileApp;
    e.hidden && e.show(n.x + 5, n.y + 5);
  }), f.query("#optionButton").on("mouseup", function () {
    var e = H.optionApp;
    e.hidden && e.show(n.x + 5, n.y + 5);
  }), r.on("keydown", function (e) {
    var t = S[E[e.code]];
    t && (T(t), C = t), e.ctrlKey && (90 == e.keyCode && o.emit("undo"), 89 == e.keyCode && o.emit("redo")), e.shiftKey && C == S.add && D.activeJoint && (v = v || D.activeJoint), 32 == e.keyCode && C != S.pan && (V = C, T(S.pan)), 46 == e.keyCode && ("joints" == d ? (e = D.activeJoint) && D.removeJointById(e.id) : "timeline" == d && o.emit("deleteKeyframe"));
  }), r.on("keyup", function (e) {
    v = v && null, V && (T(V), V = void 0);
  }), n.on("mouseup", function () {
    D._moved && (c.add({
      label: "Move joint",
      value: D.clone(),
      group: "keyframe"
    }), X(D.activeJoint), D._moved = !1);
  }), n.on("mousedown", function () {
    H.fileApp.hide(), H.optionApp.hide(), H.contextMenuApp.hide(), P.css("display", "none");
  }), n.on("mousemove", function () {
    n.dragged || w.set(x), n.x <= p.bounds.x || n.x >= p.bounds.x + p.bounds.width || n.y <= p.bounds.y || n.y >= p.bounds.y + p.bounds.height ? G.css("display", "none") : G.css({
      display: "block",
      top: n.y - 10 + "px",
      left: n.x + 9 + "px"
    });
  });
  var G = f.query("#actionPreview");

  function Z() {
    var e = f.query("#toolApp"),
        t = f.query(".canvas-container"),
        i = f.query("#navigation"),
        e = t.node.offsetWidth - 1 - e.node.offsetWidth,
        i = innerHeight - i.node.offsetHeight - H.timeline.app.$el.offsetHeight;
    p.setSize(e, i);
  }

  p.canvas.addEventListener("mousemove", function (e) {
    n.dragged && !y && C === S.pan && (k.set({
      x: w.x - x.x + p.camera.movement.x,
      y: w.y - x.y + p.camera.movement.y
    }), k.x = h.clamp(k.x, -9e3, 9e3), k.y = h.clamp(k.y, -9e3, 9e3)), C !== S.move || y || n.pressed && (d = "joints", D.moveJoint(x.x, x.y));
  }), p.canvas.addEventListener("click", function () {
    var e;
    H.overlayApp.hidden && H.overlayConfigApp.hidden && H.fileApp.hidden && H.loadApp.hidden && H.saveApp.hidden && H.optionApp.hidden && (C == S.add && (v && (e = D.activeJoint.position.x - x.x + v.position.x, e = D.addJoint(e, x.y, {
      parent: v,
      ignoreHistory: !0,
      ignoreDefaults: !0
    }), v = e), D.addJoint(x.x, x.y), d = "joints"), C === S.remove && (D.selectJoint(x.x, x.y), D.removeJointByPosition(x.x, x.y), d = "joints"), C === S.select && (D.selectJoint(x.x, x.y), d = "joints"));
  }), p.canvas.addEventListener("mousewheel", function () {
    n.scrollTop ? b -= 100 : b += 100, b = h.clamp(b, g.world.minZoom, g.world.maxZoom);
  }), window.dom = f, addEventListener("resize", function () {
    Z(), H.fileApp.hide(), H.optionApp.hide(), H.contextMenuApp.hide();
  }), Z(), p.camera.setZoomSpeed(.2), p.camera.setMoveSpeed(.6);
  var Q = f.query("#showBounds"),
      ee = f.query("#showGrid");
  p.draw(function () {
    var u = H.overlayApp.hidden && H.overlayConfigApp.hidden && H.fileApp.hidden && H.loadApp.hidden && H.saveApp.hidden && H.optionApp.hidden;
    x.set(p.camera.screenToWorld(n.x - p.bounds.x, n.y - p.bounds.y)), p.rect(0, 0, p.bounds.width, p.bounds.height, {
      fill: g.world.background
    }), p.camera.begin(function () {
      p.camera.moveTo(k.x, k.y), p.camera.zoomTo(b);
      var e = new Array(H.overlayConfigApp.start - 1),
          t = H.overlayConfigApp.trimStart - 1,
          i = H.overlayConfigApp.trimEnd - 1,
          n = N.slice(0).splice(t, i - t),
          r = e.concat(n)[H.timeline.graph.state.currentMark];
      var a, o, s, l;

      if (r && (p.save(), p.context.globalAlpha = H.overlayConfigApp.opacity, p.context.scale(H.overlayConfigApp.scale, H.overlayConfigApp.scale), p.context.rotate(H.overlayConfigApp.angle), p.context.drawImage(r, -r.width / 2, -r.height / 2), p.restore()), u && C === S.add && (l = "rgba(240, 230, 255, 0.75)", p.save(), p.context.globalCompositeOperation = "overlay", (o = D.activeJoint) && (p.line(x.x, x.y, o.position.x, o.position.y, {
        lineWidth: g.render.segment.width,
        lineCap: "round",
        stroke: l
      }), v) && (s = o.position.x - x.x + v.position.x, p.line(s, x.y, v.position.x, v.position.y, {
        lineWidth: g.render.segment.width,
        lineCap: "round",
        stroke: l
      }), p.circle(s, x.y, g.render.joint.radius, {
        fill: l
      })), p.circle(x.x, x.y, g.render.joint.radius, {
        fill: l
      }), p.restore()), ee.prop("checked")) {
        for (var h = 1e4, c = -b - h; c < b + h; c += 20) {
          p.line(c, p.camera.viewport.top - h, c, p.camera.viewport.bottom + h, {
            stroke: "rgba(240, 230, 250, 0.2)",
            lineWidth: .2
          });
        }

        for (var d = -b - h; d < b + h; d += 20) {
          p.line(p.camera.viewport.left - h, d, p.camera.viewport.right + h, d, {
            stroke: "rgba(240, 230, 250, 0.2)",
            lineWidth: .2
          });
        }
      }

      Q.prop("checked") && (a = "rgba(225, 50, 255, 0.5)", o = D.bounds.max.x - D.bounds.min.x, s = D.bounds.max.y - D.bounds.min.y, l = parseInt(o) + "x" + parseInt(s), p.text(l, D.bounds.min.x, D.bounds.min.y, {
        align: "left bottom",
        font: "10px Consolas",
        fill: a
      }), p.rect(D.bounds.min.x, D.bounds.min.y, o, s, {
        lineWidth: .35,
        stroke: a
      })), D.render(p);
    });
  }), p.render(function () {
    p.redraw();
  }), r.on("keyup", function () {
    16 === r.code && (console.log(c), console.log(D), console.log(N));
  });
}, function (e, t, i) {
  var _this20 = this;

  var n = function n() {
    "use strict";

    var h = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : _this20;
    h.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
    var c = null,
        d = !1;
    var e = h.WebStreamsPolyfill || {},
        u = h.isSecureContext;
    var p = /constructor/i.test(h.HTMLElement) || !!h.safari || !!h.WebKitPoint;
    var f = u || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate",
        g = {
      createWriteStream: function createWriteStream(i, e, t) {
        var _ref2;

        var n = {
          size: null,
          pathname: null,
          writableStrategy: void 0,
          readableStrategy: void 0
        },
            r = 0,
            a = null,
            o = null,
            s = null;

        if (Number.isFinite(e) ? ((_ref2 = [e, t], t = _ref2[0], e = _ref2[1], _ref2), console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), n.size = t, n.writableStrategy = e) : e && e.highWaterMark ? (console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), n.size = t, n.writableStrategy = e) : n = e || {}, !p) {
          var _c2;

          c = c || (u ? m : function (e) {
            var t = document.createDocumentFragment(),
                i = {
              frame: h.open(e, "popup", "width=200,height=100"),
              loaded: !1,
              isIframe: !1,
              isPopup: !0,
              remove: function remove() {
                i.frame.close();
              },
              addEventListener: function addEventListener() {
                t.addEventListener.apply(t, arguments);
              },
              dispatchEvent: function dispatchEvent() {
                t.dispatchEvent.apply(t, arguments);
              },
              removeEventListener: function removeEventListener() {
                t.removeEventListener.apply(t, arguments);
              },
              postMessage: function postMessage() {
                var _i$frame;

                (_i$frame = i.frame).postMessage.apply(_i$frame, arguments);
              }
            },
                n = function n(e) {
              e.source === i.frame && (i.loaded = !0, h.removeEventListener("message", n), i.dispatchEvent(new Event("load")));
            };

            return h.addEventListener("message", n), i;
          })(g.mitm), o = new MessageChannel(), i = encodeURIComponent(i.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
          var _p = {
            transferringReadable: d,
            pathname: n.pathname || Math.random().toString().slice(-6) + "/" + i,
            headers: {
              "Content-Type": "application/octet-stream; charset=utf-8",
              "Content-Disposition": "attachment; filename*=UTF-8''" + i
            }
          };
          n.size && (_p.headers["Content-Length"] = n.size);
          var _e65 = [_p, "*", [o.port2]];

          if (d) {
            var _h3 = "iframe" == f ? void 0 : {
              transform: function transform(e, t) {
                if (!(e instanceof Uint8Array)) throw new TypeError("Can only wirte Uint8Arrays");
                r += e.length, t.enqueue(e), a && (location.href = a, a = null);
              },
              flush: function flush() {
                a && (location.href = a);
              }
            };

            s = new g.TransformStream(_h3, n.writableStrategy, n.readableStrategy);
            var _c = s.readable;
            o.port1.postMessage({
              readableStream: _c
            }, [_c]);
          }

          o.port1.onmessage = function (e) {
            e.data.download && ("navigate" == f ? (c.remove(), c = null, r ? location.href = e.data.download : a = e.data.download) : (c.isPopup && (c.remove(), c = null, "iframe" == f && m(g.mitm)), m(e.data.download)));
          }, c.loaded ? (_c2 = c).postMessage.apply(_c2, _e65) : c.addEventListener("load", function () {
            var _c3;

            (_c3 = c).postMessage.apply(_c3, _e65);
          }, {
            once: !0
          });
        }

        var l = [];
        return !p && s && s.writable || new g.WritableStream({
          write: function write(e) {
            if (!(e instanceof Uint8Array)) throw new TypeError("Can only wirte Uint8Arrays");
            p ? l.push(e) : (o.port1.postMessage(e), r += e.length, a && (location.href = a, a = null));
          },
          close: function close() {
            if (p) {
              var _e66 = new Blob(l, {
                type: "application/octet-stream; charset=utf-8"
              }),
                  _t44 = document.createElement("a");

              _t44.href = URL.createObjectURL(_e66), _t44.download = i, _t44.click();
            } else o.port1.postMessage("end");
          },
          abort: function abort() {
            l = [], o.port1.postMessage("abort"), o.port1.onmessage = null, o.port1.close(), o.port2.close(), o = null;
          }
        }, n.writableStrategy);
      },
      WritableStream: h.WritableStream || e.WritableStream,
      supported: !0,
      version: {
        full: "2.0.5",
        major: 2,
        minor: 0,
        dot: 5
      },
      mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
    };

    function m(e) {
      if (!e) throw new Error("meh");
      var t = document.createElement("iframe");
      return t.hidden = !0, t.src = e, t.loaded = !1, t.name = "iframe", t.isIframe = !0, t.postMessage = function () {
        var _t$contentWindow;

        return (_t$contentWindow = t.contentWindow).postMessage.apply(_t$contentWindow, arguments);
      }, t.addEventListener("load", function () {
        t.loaded = !0;
      }, {
        once: !0
      }), document.body.appendChild(t), t;
    }

    try {
      new Response(new ReadableStream()), !u || "serviceWorker" in navigator || (p = !0);
    } catch (h) {
      p = !0;
    }

    return function () {
      try {
        (function () {
          var _TransformStream = new TransformStream(),
              e = _TransformStream.readable,
              t = new MessageChannel();

          t.port1.postMessage(e, [e]), t.port1.close(), t.port2.close(), d = !0, Object.defineProperty(g, "TransformStream", {
            configurable: !1,
            writable: !1,
            value: TransformStream
          });
        })();
      } catch (e) {}
    }(), g;
  };

  e.exports = n();
}, function (e, M, _) {
  "use strict";

  !function (e) {
    var s = _(25),
        a = _(26),
        o = _(27);

    function i() {
      return d.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }

    function r(e, t) {
      if (i() < t) throw new RangeError("Invalid typed array length");
      return d.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = d.prototype : (e = null === e ? new d(t) : e).length = t, e;
    }

    function d(e, t, i) {
      if (!(d.TYPED_ARRAY_SUPPORT || this instanceof d)) return new d(e, t, i);
      if ("number" != typeof e) return n(this, e, t, i);
      if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
      return h(this, e);
    }

    function n(e, t, i, n) {
      if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
      return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, i, n) {
        if (t.byteLength, i < 0 || t.byteLength < i) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < i + (n || 0)) throw new RangeError("'length' is out of bounds");
        return t = void 0 === i && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, i) : new Uint8Array(t, i, n), d.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = d.prototype : e = c(e, t), e;
      }(e, t, i, n) : "string" == typeof t ? function (e, t, i) {
        if (!d.isEncoding(i = "string" != typeof i || "" === i ? "utf8" : i)) throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | p(t, i),
            i = (e = r(e, n)).write(t, i);
        return e = i !== n ? e.slice(0, i) : e;
      }(e, t, i) : function (e, t) {
        if (d.isBuffer(t)) {
          var i = 0 | u(t.length);
          return 0 === (e = r(e, i)).length || t.copy(e, 0, 0, i), e;
        }

        if (t) {
          if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (i = t.length) != i ? r(e, 0) : c(e, t);
          if ("Buffer" === t.type && o(t.data)) return c(e, t.data);
        }

        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }(e, t);
    }

    function l(e) {
      if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
      if (e < 0) throw new RangeError('"size" argument must not be negative');
    }

    function h(e, t) {
      if (l(t), e = r(e, t < 0 ? 0 : 0 | u(t)), !d.TYPED_ARRAY_SUPPORT) for (var i = 0; i < t; ++i) {
        e[i] = 0;
      }
      return e;
    }

    function c(e, t) {
      var i = t.length < 0 ? 0 : 0 | u(t.length);
      e = r(e, i);

      for (var n = 0; n < i; n += 1) {
        e[n] = 255 & t[n];
      }

      return e;
    }

    function u(e) {
      if (e >= i()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i().toString(16) + " bytes");
      return 0 | e;
    }

    function p(e, t) {
      if (d.isBuffer(e)) return e.length;
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
      var i = (e = "string" != typeof e ? "" + e : e).length;
      if (0 === i) return 0;

      for (var n = !1;;) {
        switch (t) {
          case "ascii":
          case "latin1":
          case "binary":
            return i;

          case "utf8":
          case "utf-8":
          case void 0:
            return j(e).length;

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * i;

          case "hex":
            return i >>> 1;

          case "base64":
            return I(e).length;

          default:
            if (n) return j(e).length;
            t = ("" + t).toLowerCase(), n = !0;
        }
      }
    }

    function t(e, t, i) {
      var n,
          r,
          a,
          o = !1;
      if ((t = void 0 === t || t < 0 ? 0 : t) > this.length) return "";
      if ((i = void 0 === i || i > this.length ? this.length : i) <= 0) return "";
      if ((i >>>= 0) <= (t >>>= 0)) return "";

      for (e = e || "utf8";;) {
        switch (e) {
          case "hex":
            return function (e, t, i) {
              var n = e.length;
              (!i || i < 0 || n < i) && (i = n);

              for (var r = "", a = t = !t || t < 0 ? 0 : t; a < i; ++a) {
                r += function (e) {
                  return e < 16 ? "0" + e.toString(16) : e.toString(16);
                }(e[a]);
              }

              return r;
            }(this, t, i);

          case "utf8":
          case "utf-8":
            return v(this, t, i);

          case "ascii":
            return function (e, t, i) {
              var n = "";
              i = Math.min(e.length, i);

              for (var r = t; r < i; ++r) {
                n += String.fromCharCode(127 & e[r]);
              }

              return n;
            }(this, t, i);

          case "latin1":
          case "binary":
            return function (e, t, i) {
              var n = "";
              i = Math.min(e.length, i);

              for (var r = t; r < i; ++r) {
                n += String.fromCharCode(e[r]);
              }

              return n;
            }(this, t, i);

          case "base64":
            return n = this, a = i, 0 === (r = t) && a === n.length ? s.fromByteArray(n) : s.fromByteArray(n.slice(r, a));

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return function (e, t, i) {
              for (var n = e.slice(t, i), r = "", a = 0; a < n.length; a += 2) {
                r += String.fromCharCode(n[a] + 256 * n[a + 1]);
              }

              return r;
            }(this, t, i);

          default:
            if (o) throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), o = !0;
        }
      }
    }

    function f(e, t, i) {
      var n = e[t];
      e[t] = e[i], e[i] = n;
    }

    function g(e, t, i, n, r) {
      if (0 === e.length) return -1;

      if ("string" == typeof i ? (n = i, i = 0) : 2147483647 < i ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, (i = (i = isNaN(i) ? r ? 0 : e.length - 1 : i) < 0 ? e.length + i : i) >= e.length) {
        if (r) return -1;
        i = e.length - 1;
      } else if (i < 0) {
        if (!r) return -1;
        i = 0;
      }

      if ("string" == typeof t && (t = d.from(t, n)), d.isBuffer(t)) return 0 === t.length ? -1 : m(e, t, i, n, r);
      if ("number" == typeof t) return t &= 255, d.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? (r ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(e, t, i) : m(e, [t], i, n, r);
      throw new TypeError("val must be string, number or Buffer");
    }

    function m(e, t, i, n, r) {
      var a = 1,
          o = e.length,
          s = t.length;

      if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
        if (e.length < 2 || t.length < 2) return -1;
        o /= a = 2, s /= 2, i /= 2;
      }

      function l(e, t) {
        return 1 === a ? e[t] : e.readUInt16BE(t * a);
      }

      if (r) for (var h = -1, c = i; c < o; c++) {
        if (l(e, c) === l(t, -1 === h ? 0 : c - h)) {
          if (c - (h = -1 === h ? c : h) + 1 === s) return h * a;
        } else -1 !== h && (c -= c - h), h = -1;
      } else for (c = i = o < i + s ? o - s : i; 0 <= c; c--) {
        for (var d = !0, u = 0; u < s; u++) {
          if (l(e, c + u) !== l(t, u)) {
            d = !1;
            break;
          }
        }

        if (d) return c;
      }
      return -1;
    }

    function y(e, t, i, n) {
      return T(function (e) {
        for (var t = [], i = 0; i < e.length; ++i) {
          t.push(255 & e.charCodeAt(i));
        }

        return t;
      }(t), e, i, n);
    }

    function v(e, t, i) {
      i = Math.min(e.length, i);

      for (var n = [], r = t; r < i;) {
        var a,
            o,
            s,
            l,
            h = e[r],
            c = null,
            d = 239 < h ? 4 : 223 < h ? 3 : 191 < h ? 2 : 1;
        if (r + d <= i) switch (d) {
          case 1:
            h < 128 && (c = h);
            break;

          case 2:
            128 == (192 & (a = e[r + 1])) && 127 < (l = (31 & h) << 6 | 63 & a) && (c = l);
            break;

          case 3:
            a = e[r + 1], o = e[r + 2], 128 == (192 & a) && 128 == (192 & o) && 2047 < (l = (15 & h) << 12 | (63 & a) << 6 | 63 & o) && (l < 55296 || 57343 < l) && (c = l);
            break;

          case 4:
            a = e[r + 1], o = e[r + 2], s = e[r + 3], 128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && 65535 < (l = (15 & h) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) && l < 1114112 && (c = l);
        }
        null === c ? (c = 65533, d = 1) : 65535 < c && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), r += d;
      }

      return function (e) {
        var t = e.length;
        if (t <= 4096) return String.fromCharCode.apply(String, e);

        for (var i = "", n = 0; n < t;) {
          i += String.fromCharCode.apply(String, e.slice(n, n += 4096));
        }

        return i;
      }(n);
    }

    function b(e, t, i) {
      if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
      if (i < e + t) throw new RangeError("Trying to access beyond buffer length");
    }

    function k(e, t, i, n, r, a) {
      if (!d.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (r < t || t < a) throw new RangeError('"value" argument is out of bounds');
      if (i + n > e.length) throw new RangeError("Index out of range");
    }

    function w(e, t, i, n) {
      t < 0 && (t = 65535 + t + 1);

      for (var r = 0, a = Math.min(e.length - i, 2); r < a; ++r) {
        e[i + r] = (t & 255 << 8 * (n ? r : 1 - r)) >>> 8 * (n ? r : 1 - r);
      }
    }

    function x(e, t, i, n) {
      t < 0 && (t = 4294967295 + t + 1);

      for (var r = 0, a = Math.min(e.length - i, 4); r < a; ++r) {
        e[i + r] = t >>> 8 * (n ? r : 3 - r) & 255;
      }
    }

    function S(e, t, i, n) {
      if (i + n > e.length) throw new RangeError("Index out of range");
      if (i < 0) throw new RangeError("Index out of range");
    }

    function E(e, t, i, n, r) {
      return r || S(e, 0, i, 4), a.write(e, t, i, n, 23, 4), i + 4;
    }

    function A(e, t, i, n, r) {
      return r || S(e, 0, i, 8), a.write(e, t, i, n, 52, 8), i + 8;
    }

    M.Buffer = d, M.SlowBuffer = function (e) {
      return d.alloc(+(e = +e != e ? 0 : e));
    }, M.INSPECT_MAX_BYTES = 50, d.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
      try {
        var e = new Uint8Array(1);
        return e.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function foo() {
            return 42;
          }
        }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
      } catch (e) {
        return !1;
      }
    }(), M.kMaxLength = i(), d.poolSize = 8192, d._augment = function (e) {
      return e.__proto__ = d.prototype, e;
    }, d.from = function (e, t, i) {
      return n(null, e, t, i);
    }, d.TYPED_ARRAY_SUPPORT && (d.prototype.__proto__ = Uint8Array.prototype, d.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && d[Symbol.species] === d && Object.defineProperty(d, Symbol.species, {
      value: null,
      configurable: !0
    })), d.alloc = function (e, t, i) {
      return n = null, t = t, i = i, l(e = e), !(e <= 0) && void 0 !== t ? "string" == typeof i ? r(n, e).fill(t, i) : r(n, e).fill(t) : r(n, e);
      var n;
    }, d.allocUnsafe = function (e) {
      return h(null, e);
    }, d.allocUnsafeSlow = function (e) {
      return h(null, e);
    }, d.isBuffer = function (e) {
      return !(null == e || !e._isBuffer);
    }, d.compare = function (e, t) {
      if (!d.isBuffer(e) || !d.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
      if (e === t) return 0;

      for (var i = e.length, n = t.length, r = 0, a = Math.min(i, n); r < a; ++r) {
        if (e[r] !== t[r]) {
          i = e[r], n = t[r];
          break;
        }
      }

      return i < n ? -1 : n < i ? 1 : 0;
    }, d.isEncoding = function (e) {
      switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;

        default:
          return !1;
      }
    }, d.concat = function (e, t) {
      if (!o(e)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e.length) return d.alloc(0);
      if (void 0 === t) for (r = t = 0; r < e.length; ++r) {
        t += e[r].length;
      }

      for (var i = d.allocUnsafe(t), n = 0, r = 0; r < e.length; ++r) {
        var a = e[r];
        if (!d.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
        a.copy(i, n), n += a.length;
      }

      return i;
    }, d.byteLength = p, d.prototype._isBuffer = !0, d.prototype.swap16 = function () {
      var e = this.length;
      if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

      for (var t = 0; t < e; t += 2) {
        f(this, t, t + 1);
      }

      return this;
    }, d.prototype.swap32 = function () {
      var e = this.length;
      if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

      for (var t = 0; t < e; t += 4) {
        f(this, t, t + 3), f(this, t + 1, t + 2);
      }

      return this;
    }, d.prototype.swap64 = function () {
      var e = this.length;
      if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

      for (var t = 0; t < e; t += 8) {
        f(this, t, t + 7), f(this, t + 1, t + 6), f(this, t + 2, t + 5), f(this, t + 3, t + 4);
      }

      return this;
    }, d.prototype.toString = function () {
      var e = 0 | this.length;
      return 0 == e ? "" : 0 === arguments.length ? v(this, 0, e) : t.apply(this, arguments);
    }, d.prototype.equals = function (e) {
      if (!d.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
      return this === e || 0 === d.compare(this, e);
    }, d.prototype.inspect = function () {
      var e = "",
          t = M.INSPECT_MAX_BYTES;
      return 0 < this.length && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "), this.length > t && (e += " ... ")), "<Buffer " + e + ">";
    }, d.prototype.compare = function (e, t, i, n, r) {
      if (!d.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
      if (void 0 === i && (i = e ? e.length : 0), void 0 === n && (n = 0), void 0 === r && (r = this.length), (t = void 0 === t ? 0 : t) < 0 || i > e.length || n < 0 || r > this.length) throw new RangeError("out of range index");
      if (r <= n && i <= t) return 0;
      if (r <= n) return -1;
      if (i <= t) return 1;
      if (this === e) return 0;

      for (var a = (r >>>= 0) - (n >>>= 0), o = (i >>>= 0) - (t >>>= 0), s = Math.min(a, o), l = this.slice(n, r), h = e.slice(t, i), c = 0; c < s; ++c) {
        if (l[c] !== h[c]) {
          a = l[c], o = h[c];
          break;
        }
      }

      return a < o ? -1 : o < a ? 1 : 0;
    }, d.prototype.includes = function (e, t, i) {
      return -1 !== this.indexOf(e, t, i);
    }, d.prototype.indexOf = function (e, t, i) {
      return g(this, e, t, i, !0);
    }, d.prototype.lastIndexOf = function (e, t, i) {
      return g(this, e, t, i, !1);
    }, d.prototype.write = function (e, t, i, n) {
      if (void 0 === t) n = "utf8", i = this.length, t = 0;else if (void 0 === i && "string" == typeof t) n = t, i = this.length, t = 0;else {
        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t |= 0, isFinite(i) ? (i |= 0, void 0 === n && (n = "utf8")) : (n = i, i = void 0);
      }
      var r = this.length - t;
      if ((void 0 === i || r < i) && (i = r), 0 < e.length && (i < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      n = n || "utf8";

      for (var a, o, s, l, h, c, d = !1;;) {
        switch (n) {
          case "hex":
            return function (e, t, i, n) {
              i = Number(i) || 0;
              var r = e.length - i;
              if ((!n || (n = Number(n)) > r) && (n = r), (r = t.length) % 2 != 0) throw new TypeError("Invalid hex string");
              r / 2 < n && (n = r / 2);

              for (var a = 0; a < n; ++a) {
                var o = parseInt(t.substr(2 * a, 2), 16);
                if (isNaN(o)) return a;
                e[i + a] = o;
              }

              return a;
            }(this, e, t, i);

          case "utf8":
          case "utf-8":
            return h = t, c = i, T(j(e, (l = this).length - h), l, h, c);

          case "ascii":
            return y(this, e, t, i);

          case "latin1":
          case "binary":
            return y(this, e, t, i);

          case "base64":
            return a = this, o = t, s = i, T(I(e), a, o, s);

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return a = t, o = i, T(function (e, t) {
              for (var i, n, r = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) {
                n = (i = e.charCodeAt(a)) >> 8, r.push(i % 256), r.push(n);
              }

              return r;
            }(e, (s = this).length - a), s, a, o);

          default:
            if (d) throw new TypeError("Unknown encoding: " + n);
            n = ("" + n).toLowerCase(), d = !0;
        }
      }
    }, d.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    }, d.prototype.slice = function (e, t) {
      var i = this.length;
      if ((e = ~~e) < 0 ? (e += i) < 0 && (e = 0) : i < e && (e = i), (t = void 0 === t ? i : ~~t) < 0 ? (t += i) < 0 && (t = 0) : i < t && (t = i), t < e && (t = e), d.TYPED_ARRAY_SUPPORT) (r = this.subarray(e, t)).__proto__ = d.prototype;else for (var n = t - e, r = new d(n, void 0), a = 0; a < n; ++a) {
        r[a] = this[a + e];
      }
      return r;
    }, d.prototype.readUIntLE = function (e, t, i) {
      e |= 0, t |= 0, i || b(e, t, this.length);

      for (var n = this[e], r = 1, a = 0; ++a < t && (r *= 256);) {
        n += this[e + a] * r;
      }

      return n;
    }, d.prototype.readUIntBE = function (e, t, i) {
      e |= 0, t |= 0, i || b(e, t, this.length);

      for (var n = this[e + --t], r = 1; 0 < t && (r *= 256);) {
        n += this[e + --t] * r;
      }

      return n;
    }, d.prototype.readUInt8 = function (e, t) {
      return t || b(e, 1, this.length), this[e];
    }, d.prototype.readUInt16LE = function (e, t) {
      return t || b(e, 2, this.length), this[e] | this[e + 1] << 8;
    }, d.prototype.readUInt16BE = function (e, t) {
      return t || b(e, 2, this.length), this[e] << 8 | this[e + 1];
    }, d.prototype.readUInt32LE = function (e, t) {
      return t || b(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
    }, d.prototype.readUInt32BE = function (e, t) {
      return t || b(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
    }, d.prototype.readIntLE = function (e, t, i) {
      e |= 0, t |= 0, i || b(e, t, this.length);

      for (var n = this[e], r = 1, a = 0; ++a < t && (r *= 256);) {
        n += this[e + a] * r;
      }

      return n >= (r *= 128) && (n -= Math.pow(2, 8 * t)), n;
    }, d.prototype.readIntBE = function (e, t, i) {
      e |= 0, t |= 0, i || b(e, t, this.length);

      for (var n = t, r = 1, a = this[e + --n]; 0 < n && (r *= 256);) {
        a += this[e + --n] * r;
      }

      return a >= (r *= 128) && (a -= Math.pow(2, 8 * t)), a;
    }, d.prototype.readInt8 = function (e, t) {
      return t || b(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
    }, d.prototype.readInt16LE = function (e, t) {
      t || b(e, 2, this.length);
      e = this[e] | this[e + 1] << 8;
      return 32768 & e ? 4294901760 | e : e;
    }, d.prototype.readInt16BE = function (e, t) {
      t || b(e, 2, this.length);
      e = this[e + 1] | this[e] << 8;
      return 32768 & e ? 4294901760 | e : e;
    }, d.prototype.readInt32LE = function (e, t) {
      return t || b(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
    }, d.prototype.readInt32BE = function (e, t) {
      return t || b(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
    }, d.prototype.readFloatLE = function (e, t) {
      return t || b(e, 4, this.length), a.read(this, e, !0, 23, 4);
    }, d.prototype.readFloatBE = function (e, t) {
      return t || b(e, 4, this.length), a.read(this, e, !1, 23, 4);
    }, d.prototype.readDoubleLE = function (e, t) {
      return t || b(e, 8, this.length), a.read(this, e, !0, 52, 8);
    }, d.prototype.readDoubleBE = function (e, t) {
      return t || b(e, 8, this.length), a.read(this, e, !1, 52, 8);
    }, d.prototype.writeUIntLE = function (e, t, i, n) {
      e = +e, t |= 0, i |= 0, n || k(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
      var r = 1,
          a = 0;

      for (this[t] = 255 & e; ++a < i && (r *= 256);) {
        this[t + a] = e / r & 255;
      }

      return t + i;
    }, d.prototype.writeUIntBE = function (e, t, i, n) {
      e = +e, t |= 0, i |= 0, n || k(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
      var r = i - 1,
          a = 1;

      for (this[t + r] = 255 & e; 0 <= --r && (a *= 256);) {
        this[t + r] = e / a & 255;
      }

      return t + i;
    }, d.prototype.writeUInt8 = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 1, 255, 0), d.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
    }, d.prototype.writeUInt16LE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : w(this, e, t, !0), t + 2;
    }, d.prototype.writeUInt16BE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : w(this, e, t, !1), t + 2;
    }, d.prototype.writeUInt32LE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : x(this, e, t, !0), t + 4;
    }, d.prototype.writeUInt32BE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : x(this, e, t, !1), t + 4;
    }, d.prototype.writeIntLE = function (e, t, i, n) {
      e = +e, t |= 0, n || k(this, e, t, i, (n = Math.pow(2, 8 * i - 1)) - 1, -n);
      var r = 0,
          a = 1,
          o = 0;

      for (this[t] = 255 & e; ++r < i && (a *= 256);) {
        e < 0 && 0 === o && 0 !== this[t + r - 1] && (o = 1), this[t + r] = (e / a >> 0) - o & 255;
      }

      return t + i;
    }, d.prototype.writeIntBE = function (e, t, i, n) {
      e = +e, t |= 0, n || k(this, e, t, i, (n = Math.pow(2, 8 * i - 1)) - 1, -n);
      var r = i - 1,
          a = 1,
          o = 0;

      for (this[t + r] = 255 & e; 0 <= --r && (a *= 256);) {
        e < 0 && 0 === o && 0 !== this[t + r + 1] && (o = 1), this[t + r] = (e / a >> 0) - o & 255;
      }

      return t + i;
    }, d.prototype.writeInt8 = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 1, 127, -128), d.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & (e = e < 0 ? 255 + e + 1 : e), t + 1;
    }, d.prototype.writeInt16LE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : w(this, e, t, !0), t + 2;
    }, d.prototype.writeInt16BE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : w(this, e, t, !1), t + 2;
    }, d.prototype.writeInt32LE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 4, 2147483647, -2147483648), d.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : x(this, e, t, !0), t + 4;
    }, d.prototype.writeInt32BE = function (e, t, i) {
      return e = +e, t |= 0, i || k(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : x(this, e, t, !1), t + 4;
    }, d.prototype.writeFloatLE = function (e, t, i) {
      return E(this, e, t, !0, i);
    }, d.prototype.writeFloatBE = function (e, t, i) {
      return E(this, e, t, !1, i);
    }, d.prototype.writeDoubleLE = function (e, t, i) {
      return A(this, e, t, !0, i);
    }, d.prototype.writeDoubleBE = function (e, t, i) {
      return A(this, e, t, !1, i);
    }, d.prototype.copy = function (e, t, i, n) {
      if (i = i || 0, n || 0 === n || (n = this.length), t >= e.length && (t = e.length), (n = 0 < n && n < i ? i : n) === i) return 0;
      if (0 === e.length || 0 === this.length) return 0;
      if ((t = t || 0) < 0) throw new RangeError("targetStart out of bounds");
      if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
      if (n < 0) throw new RangeError("sourceEnd out of bounds");
      n > this.length && (n = this.length);
      var r,
          a = (n = e.length - t < n - i ? e.length - t + i : n) - i;
      if (this === e && i < t && t < n) for (r = a - 1; 0 <= r; --r) {
        e[r + t] = this[r + i];
      } else if (a < 1e3 || !d.TYPED_ARRAY_SUPPORT) for (r = 0; r < a; ++r) {
        e[r + t] = this[r + i];
      } else Uint8Array.prototype.set.call(e, this.subarray(i, i + a), t);
      return a;
    }, d.prototype.fill = function (e, t, i, n) {
      if ("string" == typeof e) {
        var r;
        if ("string" == typeof t ? (n = t, t = 0, i = this.length) : "string" == typeof i && (n = i, i = this.length), 1 === e.length && (r = e.charCodeAt(0)) < 256 && (e = r), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
        if ("string" == typeof n && !d.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
      } else "number" == typeof e && (e &= 255);

      if (t < 0 || this.length < t || this.length < i) throw new RangeError("Out of range index");
      if (i <= t) return this;
      if (t >>>= 0, i = void 0 === i ? this.length : i >>> 0, "number" == typeof (e = e || 0)) for (s = t; s < i; ++s) {
        this[s] = e;
      } else for (var a = d.isBuffer(e) ? e : j(new d(e, n).toString()), o = a.length, s = 0; s < i - t; ++s) {
        this[s + t] = a[s % o];
      }
      return this;
    };
    var C = /[^+\/0-9A-Za-z-_]/g;

    function j(e, t) {
      var i;
      t = t || 1 / 0;

      for (var n = e.length, r = null, a = [], o = 0; o < n; ++o) {
        if (55295 < (i = e.charCodeAt(o)) && i < 57344) {
          if (!r) {
            if (56319 < i) {
              -1 < (t -= 3) && a.push(239, 191, 189);
              continue;
            }

            if (o + 1 === n) {
              -1 < (t -= 3) && a.push(239, 191, 189);
              continue;
            }

            r = i;
            continue;
          }

          if (i < 56320) {
            -1 < (t -= 3) && a.push(239, 191, 189), r = i;
            continue;
          }

          i = 65536 + (r - 55296 << 10 | i - 56320);
        } else r && -1 < (t -= 3) && a.push(239, 191, 189);

        if (r = null, i < 128) {
          if (--t < 0) break;
          a.push(i);
        } else if (i < 2048) {
          if ((t -= 2) < 0) break;
          a.push(i >> 6 | 192, 63 & i | 128);
        } else if (i < 65536) {
          if ((t -= 3) < 0) break;
          a.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128);
        } else {
          if (!(i < 1114112)) throw new Error("Invalid code point");
          if ((t -= 4) < 0) break;
          a.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128);
        }
      }

      return a;
    }

    function I(e) {
      return s.toByteArray(function (e) {
        if ((e = ((t = e).trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")).replace(C, "")).length < 2) return "";

        for (var t; e.length % 4 != 0;) {
          e += "=";
        }

        return e;
      }(e));
    }

    function T(e, t, i, n) {
      for (var r = 0; r < n && !(r + i >= t.length || r >= e.length); ++r) {
        t[r + i] = e[r];
      }

      return r;
    }
  }.call(this, _(6));
}, function (e, t, i) {
  "use strict";

  t.byteLength = function (e) {
    var t = c(e),
        e = t[0],
        t = t[1];
    return 3 * (e + t) / 4 - t;
  }, t.toByteArray = function (e) {
    for (var t, i = c(e), n = i[0], i = i[1], r = new h(3 * (n + i) / 4 - i), a = 0, o = 0 < i ? n - 4 : n, s = 0; s < o; s += 4) {
      t = l[e.charCodeAt(s)] << 18 | l[e.charCodeAt(s + 1)] << 12 | l[e.charCodeAt(s + 2)] << 6 | l[e.charCodeAt(s + 3)], r[a++] = t >> 16 & 255, r[a++] = t >> 8 & 255, r[a++] = 255 & t;
    }

    return 2 === i && (t = l[e.charCodeAt(s)] << 2 | l[e.charCodeAt(s + 1)] >> 4, r[a++] = 255 & t), 1 === i && (t = l[e.charCodeAt(s)] << 10 | l[e.charCodeAt(s + 1)] << 4 | l[e.charCodeAt(s + 2)] >> 2, r[a++] = t >> 8 & 255, r[a++] = 255 & t), r;
  }, t.fromByteArray = function (e) {
    for (var t, i = e.length, n = i % 3, r = [], a = 0, o = i - n; a < o; a += 16383) {
      r.push(function (e, t, i) {
        for (var n, r = [], a = t; a < i; a += 3) {
          n = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), r.push(s[(n = n) >> 18 & 63] + s[n >> 12 & 63] + s[n >> 6 & 63] + s[63 & n]);
        }

        return r.join("");
      }(e, a, o < a + 16383 ? o : a + 16383));
    }

    return 1 == n ? (t = e[i - 1], r.push(s[t >> 2] + s[t << 4 & 63] + "==")) : 2 == n && (t = (e[i - 2] << 8) + e[i - 1], r.push(s[t >> 10] + s[t >> 4 & 63] + s[t << 2 & 63] + "=")), r.join("");
  };

  for (var s = [], l = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = 0, a = n.length; r < a; ++r) {
    s[r] = n[r], l[n.charCodeAt(r)] = r;
  }

  function c(e) {
    var t = e.length;
    if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
    e = e.indexOf("=");
    return [e = -1 === e ? t : e, e === t ? 0 : 4 - e % 4];
  }

  l["-".charCodeAt(0)] = 62, l["_".charCodeAt(0)] = 63;
}, function (e, t) {
  t.read = function (e, t, i, n, r) {
    var a,
        o,
        s = 8 * r - n - 1,
        l = (1 << s) - 1,
        h = l >> 1,
        c = -7,
        d = i ? r - 1 : 0,
        u = i ? -1 : 1,
        i = e[t + d];

    for (d += u, a = i & (1 << -c) - 1, i >>= -c, c += s; 0 < c; a = 256 * a + e[t + d], d += u, c -= 8) {
      ;
    }

    for (o = a & (1 << -c) - 1, a >>= -c, c += n; 0 < c; o = 256 * o + e[t + d], d += u, c -= 8) {
      ;
    }

    if (0 === a) a = 1 - h;else {
      if (a === l) return o ? NaN : 1 / 0 * (i ? -1 : 1);
      o += Math.pow(2, n), a -= h;
    }
    return (i ? -1 : 1) * o * Math.pow(2, a - n);
  }, t.write = function (e, t, i, n, r, a) {
    var o,
        s,
        l = 8 * a - r - 1,
        h = (1 << l) - 1,
        c = h >> 1,
        d = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        u = n ? 0 : a - 1,
        p = n ? 1 : -1,
        a = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;

    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, o = h) : (o = Math.floor(Math.log(t) / Math.LN2), t * (n = Math.pow(2, -o)) < 1 && (o--, n *= 2), 2 <= (t += 1 <= o + c ? d / n : d * Math.pow(2, 1 - c)) * n && (o++, n /= 2), h <= o + c ? (s = 0, o = h) : 1 <= o + c ? (s = (t * n - 1) * Math.pow(2, r), o += c) : (s = t * Math.pow(2, c - 1) * Math.pow(2, r), o = 0)); 8 <= r; e[i + u] = 255 & s, u += p, s /= 256, r -= 8) {
      ;
    }

    for (o = o << r | s, l += r; 0 < l; e[i + u] = 255 & o, u += p, o /= 256, l -= 8) {
      ;
    }

    e[i + u - p] |= 128 * a;
  };
}, function (e, t) {
  var i = {}.toString;

  e.exports = Array.isArray || function (e) {
    return "[object Array]" == i.call(e);
  };
}, function (e, t, i) {
  "use strict";

  !function (e) {
    t.parseWrapper = function (l, a, h, i) {
      var c = 0,
          d = 0,
          u = l,
          p = 0,
          f = " ",
          g = "";

      function m(e) {
        this.name = "ParseError", this.message = e, this.text = u;
      }

      var y = function y() {
        for (f = u.charAt(p), p++; f && f <= " ";) {
          y();
        }

        return f;
      },
          v = function v() {
        for (g = ""; g += f, y(), f.match(/[a-z]/i);) {
          ;
        }

        return u = u.slice(p - 1), p = 0, g;
      };

      var o = function o(e, t) {
        var i = "",
            n,
            r = e[t];
        if (r && "object" == _typeof(r)) for (i in r) {
          Object.prototype.hasOwnProperty.call(r, i) && (n = o(r, i), void 0 !== n ? r[i] = n : delete r[i]);
        }
        return a.call(e, t, r);
      },
          n = "",
          r = /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function e() {
                  var t, i, n, r, a, o, s;
                  return regeneratorRuntime.wrap(function e$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          i = {}, n = [], o = "", s = function s() {
                            o += f, y();
                          };

                          if (!("number" == typeof u || "boolean" == typeof u || null === u)) {
                            _context4.next = 3;
                            break;
                          }

                          return _context4.abrupt("return", (u = "", l));

                        case 3:
                          if (!(void 0 === u)) {
                            _context4.next = 5;
                            break;
                          }

                          return _context4.abrupt("return", (u = void 0, l));

                        case 5:
                          if (!("[" === u.charAt(0) && "]" === u.charAt(1))) {
                            _context4.next = 7;
                            break;
                          }

                          return _context4.abrupt("return", (u = "", []));

                        case 7:
                          if (!("{" === u.charAt(0) && "}" === u.charAt(1))) {
                            _context4.next = 9;
                            break;
                          }

                          return _context4.abrupt("return", (u = "", {}));

                        case 9:
                          _context4.t1 = ++c > 512 * h;

                          if (!_context4.t1) {
                            _context4.next = 14;
                            break;
                          }

                          c = 0;
                          _context4.next = 14;
                          return;

                        case 14:
                          1 !== d && y();
                          _context4.t0 = f;
                          _context4.next = _context4.t0 === "{" ? 18 : _context4.t0 === "[" ? 33 : _context4.t0 === '"' ? 44 : _context4.t0 === "0" ? 45 : _context4.t0 === "1" ? 45 : _context4.t0 === "2" ? 45 : _context4.t0 === "3" ? 45 : _context4.t0 === "4" ? 45 : _context4.t0 === "5" ? 45 : _context4.t0 === "6" ? 45 : _context4.t0 === "7" ? 45 : _context4.t0 === "8" ? 45 : _context4.t0 === "9" ? 45 : _context4.t0 === "-" ? 45 : _context4.t0 === "t" ? 47 : _context4.t0 === "f" ? 48 : _context4.t0 === "n" ? 49 : 50;
                          break;

                        case 18:
                          if (!(y(), "}" === f)) {
                            _context4.next = 20;
                            break;
                          }

                          return _context4.abrupt("return", (u = u.slice(p), p = 0, i));

                        case 20:
                          '"' !== f && y();
                          d = 1;
                          return _context4.delegateYield(e(), "t2", 23);

                        case 23:
                          t = _context4.t2;
                          d = 0;
                          y();
                          return _context4.delegateYield(e(), "t3", 27);

                        case 27:
                          i[t] = _context4.t3;
                          y();

                          if (!("}" === f)) {
                            _context4.next = 31;
                            break;
                          }

                          return _context4.abrupt("return", (u = u.slice(p), p = 0, i));

                        case 31:
                          if ("," === f) {
                            _context4.next = 20;
                            break;
                          }

                        case 32:
                          return _context4.abrupt("return", new m("Bad object"));

                        case 33:
                          if (!(y(), "]" === f)) {
                            _context4.next = 35;
                            break;
                          }

                          return _context4.abrupt("return", (u = u.slice(p), p = 0, n));

                        case 35:
                          f = u.charAt(--p);

                        case 36:
                          return _context4.delegateYield(e(), "t4", 37);

                        case 37:
                          r = _context4.t4;
                          n.push(r);
                          y();

                          if (!("]" === f)) {
                            _context4.next = 42;
                            break;
                          }

                          return _context4.abrupt("return", (u = u.slice(p), p = 0, n));

                        case 42:
                          if ("," === f) {
                            _context4.next = 36;
                            break;
                          }

                        case 43:
                          return _context4.abrupt("return", new m("Bad array"));

                        case 44:
                          return _context4.abrupt("return", (u = u.slice(p - 1), p = 0, '"' === u.charAt(0) && '"' === u.charAt(1) ? (u = u.slice(2), p = 0, "") : (y(), function () {
                            var r = " ",
                                e = p,
                                a = 0,
                                t = 0;

                            for (;;) {
                              for (a = u.indexOf('"', e + 1), e = a, f = u.charAt(e - 1); "\\" === f;) {
                                t++, f = u.charAt(e - (t + 1));
                              }

                              if (t % 2 == 0) {
                                r = u.substring(p, a), u = u.slice(++a), t = 0;
                                break;
                              }

                              t = 0;
                            }

                            for (a = r.indexOf("\\"); 0 <= a;) {
                              var _e67 = {
                                '"': '"',
                                "'": "'",
                                "/": "/",
                                "\\": "\\",
                                b: "\b",
                                f: "\f",
                                n: "\n",
                                r: "\r",
                                t: "\t"
                              },
                                  _t45 = 0,
                                  _i24 = 0,
                                  _n14 = 0;

                              if (p = a, f = r.charAt(++p), "u" === f) {
                                for (_n14 = 0, _i24 = 0; _i24 < 4 && (_t45 = parseInt(f = r.charAt(++p), 16), isFinite(_t45)); _i24 += 1) {
                                  _n14 = 16 * _n14 + _t45;
                                }

                                r = r.slice(0, a) + String.fromCharCode(_n14) + r.slice(a + 6), p = a;
                              } else {
                                if ("string" != typeof _e67[f]) break;
                                r = r.slice(0, a) + _e67[f] + r.slice(a + 2), p = a + 1;
                              }

                              a = r.indexOf("\\", p);
                            }

                            return p = 0, r;
                          }())));

                        case 45:
                          for ("-" === f && s(); s(), ("." === f || "e" === f || "E" === f || "-" === f || "+" === f || f >= String.fromCharCode(65) && f <= String.fromCharCode(70)) && s(), "-" === f || "+" === f || isFinite(f) && "" !== f;) {
                            ;
                          }

                          return _context4.abrupt("return", (a = Number(o), u = u.slice(p - 1), p = 0, a));

                        case 47:
                          return _context4.abrupt("return", (g = v(), "true" === g || new m("Unexpected character")));

                        case 48:
                          return _context4.abrupt("return", (g = v(), "false" !== g && new m("Unexpected character")));

                        case 49:
                          return _context4.abrupt("return", (g = v(), "null" === g ? null : new m("Unexpected character")));

                        case 50:
                          return _context4.abrupt("return", new m("Unexpected character"));

                        case 51:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, e);
                })(), "t0", 1);

              case 1:
                n = _context5.t0;

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee3);
      })(),
          s,
          b = function b() {
        e(function () {
          if (s = r.next(), s && !0 === s.done) {
            if (void 0 === n) return i(new m("Unexpected Character"), null);
            if (n instanceof m) return i(n, null);
            if ("string" != typeof (t = "}" === (t = u).charAt(0) || "]" === t.charAt(0) ? t.substring(1, t.length) : t) || t.trim()) return i(new m("Unexpected Character"), null);
            if (null === a) return i(null, n);

            if ("function" == typeof a) {
              var e = o({
                "": n
              }, "");
              return i(null, e);
            }
          }

          var t;
          b();
        });
      };

      return b();
    };
  }.call(this, i(12).setImmediate);
}, function (e, t, i) {
  !function (e, p) {
    !function (i) {
      "use strict";

      var n, t, r, e, a, o, s, l, h, c;

      function d(e) {
        delete o[e];
      }

      function u(e) {
        if (s) setTimeout(u, 0, e);else {
          var i = o[e];

          if (i) {
            s = !0;

            try {
              !function () {
                var e = i.callback,
                    t = i.args;

                switch (t.length) {
                  case 0:
                    e();
                    break;

                  case 1:
                    e(t[0]);
                    break;

                  case 2:
                    e(t[0], t[1]);
                    break;

                  case 3:
                    e(t[0], t[1], t[2]);
                    break;

                  default:
                    e.apply(void 0, t);
                }
              }();
            } finally {
              d(e), s = !1;
            }
          }
        }
      }

      i.setImmediate || (a = 1, s = !(o = {}), l = i.document, h = (h = Object.getPrototypeOf && Object.getPrototypeOf(i)) && h.setTimeout ? h : i, c = "[object process]" === {}.toString.call(i.process) ? function (e) {
        p.nextTick(function () {
          u(e);
        });
      } : function () {
        if (i.postMessage && !i.importScripts) {
          var e = !0,
              t = i.onmessage;
          return i.onmessage = function () {
            e = !1;
          }, i.postMessage("", "*"), i.onmessage = t, e;
        }
      }() ? (r = "setImmediate$" + Math.random() + "$", e = function e(_e68) {
        _e68.source === i && "string" == typeof _e68.data && 0 === _e68.data.indexOf(r) && u(+_e68.data.slice(r.length));
      }, i.addEventListener ? i.addEventListener("message", e, !1) : i.attachEvent("onmessage", e), function (e) {
        i.postMessage(r + e, "*");
      }) : i.MessageChannel ? ((t = new MessageChannel()).port1.onmessage = function (e) {
        u(e.data);
      }, function (e) {
        t.port2.postMessage(e);
      }) : l && "onreadystatechange" in l.createElement("script") ? (n = l.documentElement, function (e) {
        var t = l.createElement("script");
        t.onreadystatechange = function () {
          u(e), t.onreadystatechange = null, n.removeChild(t), t = null;
        }, n.appendChild(t);
      }) : function (e) {
        setTimeout(u, 0, e);
      }, h.setImmediate = function (e) {
        "function" != typeof e && (e = new Function("" + e));

        for (var t = new Array(arguments.length - 1), i = 0; i < t.length; i++) {
          t[i] = arguments[i + 1];
        }

        return o[a] = {
          callback: e,
          args: t
        }, c(a), a++;
      }, h.clearImmediate = d);
    }("undefined" == typeof self ? void 0 === e ? this : e : self);
  }.call(this, i(6), i(30));
}, function (e, t) {
  var i,
      n,
      e = e.exports = {};

  function r() {
    throw new Error("setTimeout has not been defined");
  }

  function a() {
    throw new Error("clearTimeout has not been defined");
  }

  function o(t) {
    if (i === setTimeout) return setTimeout(t, 0);
    if ((i === r || !i) && setTimeout) return i = setTimeout, setTimeout(t, 0);

    try {
      return i(t, 0);
    } catch (e) {
      try {
        return i.call(null, t, 0);
      } catch (e) {
        return i.call(this, t, 0);
      }
    }
  }

  !function () {
    try {
      i = "function" == typeof setTimeout ? setTimeout : r;
    } catch (e) {
      i = r;
    }

    try {
      n = "function" == typeof clearTimeout ? clearTimeout : a;
    } catch (e) {
      n = a;
    }
  }();
  var s,
      l = [],
      h = !1,
      c = -1;

  function d() {
    h && s && (h = !1, s.length ? l = s.concat(l) : c = -1, l.length && u());
  }

  function u() {
    if (!h) {
      var e = o(d);
      h = !0;

      for (var t = l.length; t;) {
        for (s = l, l = []; ++c < t;) {
          s && s[c].run();
        }

        c = -1, t = l.length;
      }

      s = null, h = !1, function (t) {
        if (n === clearTimeout) return clearTimeout(t);
        if ((n === a || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);

        try {
          n(t);
        } catch (e) {
          try {
            return n.call(null, t);
          } catch (e) {
            return n.call(this, t);
          }
        }
      }(e);
    }
  }

  function p(e, t) {
    this.fun = e, this.array = t;
  }

  function f() {}

  e.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (1 < arguments.length) for (var i = 1; i < arguments.length; i++) {
      t[i - 1] = arguments[i];
    }
    l.push(new p(e, t)), 1 !== l.length || h || o(u);
  }, p.prototype.run = function () {
    this.fun.apply(null, this.array);
  }, e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.version = "", e.versions = {}, e.on = f, e.addListener = f, e.once = f, e.off = f, e.removeListener = f, e.removeAllListeners = f, e.emit = f, e.prependListener = f, e.prependOnceListener = f, e.listeners = function (e) {
    return [];
  }, e.binding = function (e) {
    throw new Error("process.binding is not supported");
  }, e.cwd = function () {
    return "/";
  }, e.chdir = function (e) {
    throw new Error("process.chdir is not supported");
  }, e.umask = function () {
    return 0;
  };
}, function (e, t, i) {
  "use strict";

  !function (c) {
    var v = [],
        d = "";

    function b(e) {
      this.name = "Error", this.message = e;
    }

    var k = function k(e, t) {
      var i = "",
          n = "",
          r = new RegExp("/[\\'\0-\x1F\x7F-\x9F\xAD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF]/g");
      e = e.replace(/\\/gi, "\\\\");
      var a,
          o = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"'
      };

      for (a in o) {
        var s = new RegExp(a, "gi");
        e = e.replace(s, o[a]);
      }

      return r.lastIndex = 0, r.test(e) ? (n = e.replace(r, function (e) {
        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
      }), 1 === t ? (n += d, n += n, d = "", '"' + n + '"') : 2 === t ? '"' + n + '"' : void (d += n)) : 1 === t ? (i += d, i += e, d = "", '"' + i + '"') : 2 === t ? '"' + e + '"' : void (d += e);
    };

    t.stringifyWrapper = function (e, t, i, n, r) {
      var a,
          o = "";
      "number" == typeof i ? o = " ".repeat(i) : "string" == typeof i && (o = i);

      var s = /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function t(i, n, r, a, o) {
                  var s, l, h, c, d, u, p, f, g, m, y, _e70, _e69;

                  return regeneratorRuntime.wrap(function t$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          s = 0, l = "", h = "", c = 0, u = "", p = n[i], f = 0, g = "", y = 0;
                          _context6.t1 = ++e > 512 * o;

                          if (!_context6.t1) {
                            _context6.next = 6;
                            break;
                          }

                          e = 0;
                          _context6.next = 6;
                          return h;

                        case 6:
                          "function" == typeof r && (p = r.call(n, i, p));
                          _context6.t0 = _typeof(p);
                          _context6.next = _context6.t0 === "string" ? 10 : _context6.t0 === "number" ? 27 : _context6.t0 === "boolean" ? 28 : _context6.t0 === "null" ? 28 : _context6.t0 === "undefined" ? 29 : _context6.t0 === "object" ? 30 : 79;
                          break;

                        case 10:
                          if (!(1e5 < p.length)) {
                            _context6.next = 25;
                            break;
                          }

                          _e70 = 0;

                        case 12:
                          if (!(_e70 < p.length)) {
                            _context6.next = 23;
                            break;
                          }

                          f = 0;
                          _context6.next = 16;
                          return p;

                        case 16:
                          m = p.substr(_e70, 1e5);
                          y += m.length;
                          y === p.length && (f = 1);
                          g = k(m, f);

                        case 20:
                          _e70 += 1e5;
                          _context6.next = 12;
                          break;

                        case 23:
                          _context6.next = 26;
                          break;

                        case 25:
                          g = k(p, 2);

                        case 26:
                          return _context6.abrupt("return", g);

                        case 27:
                          return _context6.abrupt("return", isFinite(p) ? String(p) : "null");

                        case 28:
                          return _context6.abrupt("return", String(p));

                        case 29:
                          return _context6.abrupt("return");

                        case 30:
                          if (p) {
                            _context6.next = 32;
                            break;
                          }

                          return _context6.abrupt("return", "null");

                        case 32:
                          _e69 = function _e69(e) {
                            return 0 === u.length ? e ? "{}" : "[]" : e ? a ? "{\n" + a + u.join(",\n" + a) + "\n}" : "{" + u.join(",") + "}" : a ? "[\n" + a + u.join(",\n" + a) + "\n]" : "[" + u.join(",") + "]";
                          };

                          if (!(u = [], p && "function" == typeof p.toJSON)) {
                            _context6.next = 35;
                            break;
                          }

                          return _context6.abrupt("return", (u.push('"' + p.toJSON(i) + '"'), 0 === u.length ? "{}" : a ? a + u.join(",\n" + a) + "\n" : u.join(",")));

                        case 35:
                          if (!(p && p.constructor === Array)) {
                            _context6.next = 48;
                            break;
                          }

                          c = p.length, s = 0;

                        case 37:
                          if (!(s < c)) {
                            _context6.next = 47;
                            break;
                          }

                          _context6.t2 = void 0;
                          return _context6.delegateYield(t(s, p, r, a, o) || "null", "t3", 40);

                        case 40:
                          _context6.t4 = d = _context6.t3;
                          _context6.t5 = _context6.t2 !== _context6.t4;

                          if (!_context6.t5) {
                            _context6.next = 44;
                            break;
                          }

                          u.push(d);

                        case 44:
                          s += 1;
                          _context6.next = 37;
                          break;

                        case 47:
                          return _context6.abrupt("return", _e69(!1));

                        case 48:
                          if (!(r && "object" == _typeof(r))) {
                            _context6.next = 62;
                            break;
                          }

                          c = r.length, s = 0;

                        case 50:
                          if (!(s < c)) {
                            _context6.next = 60;
                            break;
                          }

                          _context6.t6 = "string" == typeof r[s];

                          if (!_context6.t6) {
                            _context6.next = 57;
                            break;
                          }

                          l = r[s];
                          return _context6.delegateYield(t(l, p, r, a, o), "t7", 55);

                        case 55:
                          h = _context6.t7;
                          void 0 !== h && u.push(k(l, 2) + (a ? ": " : ":") + h);

                        case 57:
                          s += 1;
                          _context6.next = 50;
                          break;

                        case 60:
                          _context6.next = 78;
                          break;

                        case 62:
                          _context6.t8 = regeneratorRuntime.keys((v.push(p), p));

                        case 63:
                          if ((_context6.t9 = _context6.t8()).done) {
                            _context6.next = 77;
                            break;
                          }

                          l = _context6.t9.value;

                          if (!("object" == _typeof(p[l]) && null !== p[l] && void 0 !== p[l])) {
                            _context6.next = 69;
                            break;
                          }

                          if (!(-1 !== v.indexOf(p[l]))) {
                            _context6.next = 68;
                            break;
                          }

                          return _context6.abrupt("return", new b("Circular Structure Detected"));

                        case 68:
                          v.push(p[l]);

                        case 69:
                          _context6.t10 = Object.hasOwnProperty.call(p, l);

                          if (!_context6.t10) {
                            _context6.next = 74;
                            break;
                          }

                          return _context6.delegateYield(t(l, p, r, a, o), "t11", 72);

                        case 72:
                          h = _context6.t11;
                          void 0 !== h && u.push(k(l, 2) + (a ? ": " : ":") + h);

                        case 74:
                          v = v.filter(function (e, t, i) {
                            return e !== p[l];
                          });
                          _context6.next = 63;
                          break;

                        case 77:
                          v = v.filter(function (e, t, i) {
                            return e !== p;
                          });

                        case 78:
                          return _context6.abrupt("return", _e69(!0));

                        case 79:
                          return _context6.abrupt("return", new b("Unexpected Character"));

                        case 80:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, t);
                })("", {
                  "": e
                }, t, o, 1), "t0", 1);

              case 1:
                a = _context7.t0;

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee4);
      })(),
          l,
          h = function h() {
        c(function () {
          return l = s.next(), l && !0 === l.done ? (d = "", v = [], "object" == _typeof(a) ? r(a, null) : r(null, a)) : void h();
        });
      };

      return h();
    };
  }.call(this, i(12).setImmediate);
}, function (e, t, i) {
  var n = i(33),
      r = i(34);
  e.exports = new ( /*#__PURE__*/function () {
    function _class6() {
      _classCallCheck(this, _class6);

      this.canvas = document.getElementById("gameCanvas"), this.bounds = this.canvas.getBoundingClientRect(), this.context = this.canvas.getContext("2d"), this.camera = n.create(this.context), this.engine = r.create(), this.offscreen = 0, this.context.offscreens = [], this._customOptions = ["fill", "stroke", "align", "close", "curve"], this._currentContext = this.context, this._render = null;

      var e = function e(_e71) {
        _e71.preventDefault();
      };

      this.canvas.addEventListener("drag", e), this.canvas.addEventListener("dragstart", e);
    }

    _createClass(_class6, [{
      key: "draw",
      value: function draw(e) {
        this._render = e, "function" == typeof this._render && this._render();
      }
    }, {
      key: "redraw",
      value: function redraw() {
        "function" == typeof this._render && this._render();
      }
    }, {
      key: "render",
      value: function render(e) {
        var _this21 = this;

        "function" == typeof e && this.engine.run(function () {
          _this21.clear(), e(), _this21.context.offscreens.length && _this21.drawOffscreens();
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
      value: function setSize(e, t) {
        this.canvas.width = e, this.canvas.height = t, this.bounds = this.canvas.getBoundingClientRect();

        var _iterator3 = _createForOfIteratorHelper(this.context.offscreens),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var i = _step3.value;
            i.canvas.width = this.canvas.width, i.canvas.height = this.canvas.height;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }, {
      key: "fullscreen",
      value: function fullscreen() {
        var _this22 = this;

        this.setSize(innerWidth, innerHeight), addEventListener("resize", function () {
          _this22.setSize(innerWidth, innerHeight);
        });
      }
    }, {
      key: "createLayer",
      value: function createLayer() {
        var e = document.createElement("canvas");
        e.width = this.canvas.width, e.height = this.canvas.height;
        var t = e.getContext("2d"),
            i = {
          camera: this.camera
        };
        return t.rendererData = i, this.context.offscreens.push(t), t;
      }
    }, {
      key: "drawOffscreens",
      value: function drawOffscreens() {
        var _this23 = this;

        var _loop13 = function _loop13() {
          var e = _this23.context.offscreens[t];
          e.rendererData.camera.begin(function () {
            _this23.context.drawImage(e.canvas, 0, 0, e.canvas.width, e.canvas.height);
          }), e.clearRect(0, 0, e.canvas.width, e.canvas.height);
        };

        for (var t = 0; t < this.context.offscreens.length; t++) {
          _loop13();
        }
      }
    }, {
      key: "line",
      value: function line(e, t, i, n, r, a) {
        var o = a || this.context;
        o.beginPath(), o.moveTo(e, t), o.lineTo(i, n), this._hasProperty(r, "close", function () {
          o.closePath();
        }), this._evaluateOptions(r, o);
      }
    }, {
      key: "circle",
      value: function circle(e, t, i, n, r) {
        var a = r || this.context;
        a.beginPath(), a.arc(e, t, i, 0, 2 * Math.PI), this._hasProperty(n, "close", function () {
          a.closePath();
        }), this._evaluateOptions(n, a);
      }
    }, {
      key: "rect",
      value: function rect(t, i, n, r, e, a) {
        var o = a || this.context;
        this._hasProperty(e, "align", function (e) {
          e = e.split(" ");
          e[0] && ("center" == e[0] || "middle" == e[0] ? t -= .5 * n : "right" == e[0] && (t -= n)), e[1] && ("center" == e[1] || "middle" == e[0] ? i -= .5 * r : "bottom" == e[1] && (i -= r));
        }), o.beginPath(), o.rect(t, i, n, r), this._hasProperty(e, "close", function () {
          o.closePath();
        }), this._evaluateOptions(e, o);
      }
    }, {
      key: "fromVertices",
      value: function fromVertices(s, e, t) {
        var l = t || this.context;

        if (s.length) {
          if (l.beginPath(), !this._hasProperty(e, "curve")) {
            l.moveTo(s[0].x, s[0].y);

            for (var i = 0; i < s.length; i++) {
              var n = s[i];
              l.lineTo(n.x, n.y);
            }
          }

          this._hasProperty(e, "curve", function () {
            l.beginPath();
            var e = s[0],
                t = s[1],
                i = .5 * (e.x + t.x),
                t = .5 * (e.y + t.y);
            l.moveTo(i, t);

            for (var n = 1; n < s.length; n++) {
              var r = s[n],
                  a = s[n + 1 == s.length ? 0 : n + 1],
                  o = .5 * (a.x + r.x),
                  a = .5 * (a.y + r.y);
              l.quadraticCurveTo(r.x, r.y, o, a);
            }

            l.quadraticCurveTo(e.x, e.y, i, t), l.lineJoin = "round";
          }), this._hasProperty(e, "close", function () {
            l.closePath();
          }), this._evaluateOptions(e, l);
        }
      }
    }, {
      key: "text",
      value: function text(e, t, i, n, r) {
        var a = r || this.context;
        this._hasProperty(n, "align", function (e) {
          e = e.split(" ");
          e[0] && ("left" == e[0] ? a.textAlign = "start" : "center" == e[0] || "middle" == e[0] ? a.textAlign = "center" : "right" == e[0] && (a.textAlign = "right")), e[1] && ("top" == e[1] ? a.textBaseline = "start" : "center" == e[1] || "middle" == e[0] ? a.textBaseline = "middle" : "bottom" == e[1] && (a.textBaseline = "bottom"));
        }), a.beginPath(), this._evaluateOptions(n, a), this._hasProperty(n, "stroke", function () {
          a.strokeText(e, t, i);
        }), this._hasProperty(n, "fill", function () {
          a.fillText(e, t, i);
        }), this._hasProperty(n, "close", function () {
          a.closePath();
        });
      }
    }, {
      key: "clear",
      value: function clear(e) {
        (e || this.context).clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }, {
      key: "save",
      value: function save(e) {
        (e || this.context).save();
      }
    }, {
      key: "restore",
      value: function restore(e) {
        (e || this.context).restore();
      }
    }, {
      key: "clip",
      value: function clip(e) {
        (e || this.context).clip();
      }
    }, {
      key: "fill",
      value: function fill(e, t) {
        var i = t || this.context;
        i.fillStyle = e, i.fill();
      }
    }, {
      key: "stroke",
      value: function stroke(e, t) {
        var i = t || this.context;
        i.strokeStyle = e, i.stroke();
      }
    }, {
      key: "_evaluateOptions",
      value: function _evaluateOptions(e, t) {
        var i = t || this.context;

        if (e) {
          for (var n = Object.keys(e), r = 0; r < n.length; r++) {
            var a = n[r];
            "stroke" == a && (i.strokeStyle = e[a]), "fill" == a && (i.fillStyle = e[a]), this._customOptions.includes(a) || (i[a] = e[a]);
          }

          e.stroke && this.stroke(e.stroke, i), e.fill && this.fill(e.fill, i);
        }
      }
    }, {
      key: "_hasProperty",
      value: function _hasProperty(e, t, i) {
        if (e) return !!e[t] && ("function" == typeof i && i(e[t]), e[t]);
      }
    }]);

    return _class6;
  }())();
}, function (e, t) {
  function i(e, t, i) {
    return i * (t - e) + e;
  }

  var n = /*#__PURE__*/function () {
    function n(e, t) {
      _classCallCheck(this, n);

      t = t || {}, this.movement = {
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
      }, this.distance = 0, this.context = e || null, this.fieldOfView = t.fieldOfView || Math.PI / 4, this.moveSpeed = t.moveSpeed || 1, this.zoomSpeed = t.zoomSpeed || 1, this.scaleSpeed = t.scaleSpeed || 1;
    }

    _createClass(n, [{
      key: "setContext",
      value: function setContext(e) {
        this.context = e, this.updateViewport();
      }
    }, {
      key: "setMoveSpeed",
      value: function setMoveSpeed(e) {
        this.moveSpeed = e;
      }
    }, {
      key: "setZoomSpeed",
      value: function setZoomSpeed(e) {
        this.zoomSpeed = e;
      }
    }, {
      key: "setScaleSpeed",
      value: function setScaleSpeed(e) {
        this.scaleSpeed = e;
      }
    }, {
      key: "begin",
      value: function begin(e) {
        "function" == typeof e && (this.context.save(), this.applyScale(), this.applyTranslation(), e(this), this.context.restore());
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
        this.aspectRatio = this.context.canvas.width / this.context.canvas.height, this.viewport.width = i(this.viewport.width, this.distance * Math.tan(this.fieldOfView), this.scaleSpeed), this.viewport.height = i(this.viewport.height, this.viewport.width / this.aspectRatio, this.scaleSpeed), this.viewport.left = this.movement.x - this.viewport.width / 2, this.viewport.top = this.movement.y - this.viewport.height / 2, this.viewport.right = this.viewport.left + this.viewport.width, this.viewport.bottom = this.viewport.top + this.viewport.height, this.viewport.scale[0] = this.context.canvas.width / this.viewport.width, this.viewport.scale[1] = this.context.canvas.height / this.viewport.height;
      }
    }, {
      key: "zoomTo",
      value: function zoomTo(e) {
        this.distance = i(this.distance, e, this.zoomSpeed), this.updateViewport();
      }
    }, {
      key: "moveTo",
      value: function moveTo(e, t) {
        this.movement.x = i(this.movement.x, e, this.moveSpeed), this.movement.y = i(this.movement.y, t, this.moveSpeed), this.updateViewport();
      }
    }, {
      key: "screenToWorld",
      value: function screenToWorld(e, t, i) {
        return i || {
          x: e / this.viewport.scale[0] + this.viewport.left,
          y: t / this.viewport.scale[1] + this.viewport.top
        };
      }
    }, {
      key: "worldToScreen",
      value: function worldToScreen(e, t, i) {
        return i || {
          x: (e - this.viewport.left) * this.viewport.scale[0],
          y: (t - this.viewport.top) * this.viewport.scale[1]
        };
      }
    }]);

    return n;
  }();

  e.exports = {
    create: function create(e, t) {
      return new n(e, t);
    }
  };
}, function (e, t) {
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);

      this.frameRate = 0, this.frameCount = 0, this._targetFrameRate = 60;
    }

    _createClass(i, [{
      key: "run",
      value: function run(t) {
        var _i25,
            n = performance.now(),
            r = (performance.now(), this);

        !function e() {
          _i25 = (performance.now() - n) / 1e3, r.frameRate = 1 / _i25, n = performance.now(), r.frameCount++, "function" == typeof t && t(), requestAnimationFrame(e);
        }();
      }
    }]);

    return i;
  }();

  e.exports = {
    create: function create() {
      return new i();
    }
  };
}, function (e, t) {
  var i = new ( /*#__PURE__*/function () {
    function _class7() {
      _classCallCheck(this, _class7);

      this.code = null, this.name = null, this.activeKeys = {};
    }

    _createClass(_class7, [{
      key: "check",
      value: function check(e) {
        return "number" == typeof e ? e in this.activeKeys : Object.values(this.activeKeys).includes(e);
      }
    }, {
      key: "on",
      value: function on(e, t) {
        "function" == typeof t && addEventListener(e, t);
      }
    }]);

    return _class7;
  }())();
  i.on("keydown", function (e) {
    i.code = e.keyCode, i.name = e.code, i.activeKeys[i.code] = i.name;
  }), i.on("keyup", function (e) {
    i.code = e.keyCode, i.name = e.code, delete i.activeKeys[i.code];
  }), e.exports = i;
}, function (e, t, i) {
  var n = i(5),
      r = i(14),
      a = i(15),
      o = i(16),
      i = {
    timeline: n,
    contextMenuApp: r,
    fileApp: i(38),
    saveApp: i(17),
    loadApp: i(18),
    optionApp: i(39),
    overlayApp: a,
    overlayConfigApp: o,
    paneApp: i(40),
    cropApp: i(41),
    spritesheetExportApp: i(19),
    framesExportApp: i(20),
    GIFExportApp: i(21)
  };
  e.exports = i;
}, function (e, t) {
  e.exports = function (e) {
    return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
      enumerable: !0,
      get: function get() {
        return e.l;
      }
    }), Object.defineProperty(e, "id", {
      enumerable: !0,
      get: function get() {
        return e.i;
      }
    }), e.webpackPolyfill = 1), e;
  };
}, function (e, t, i) {
  var n = i(17),
      r = i(18),
      a = i(19),
      o = i(20),
      s = i(21),
      l = new Vue({
    el: "#fileApp",
    data: {
      showExportFormats: !1,
      hidden: !0,
      position: {
        x: 0,
        y: 0
      }
    },
    methods: {
      show: function show(e, t) {
        var _this24 = this;

        this.hidden = !1, this.$nextTick(function () {
          var e = document.getElementById("fileButton").getBoundingClientRect();
          _this24.$el.style.left = e.x + "px", _this24.$el.style.top = e.y + e.height + 3 + "px";
        });
      },
      hide: function hide() {
        this.hidden = !0, this.showExportFormats = !1;
      },
      showSaveApp: function showSaveApp() {
        n.show();
      },
      showLoadApp: function showLoadApp() {
        r.show();
      },
      showSpritesheetExportApp: function showSpritesheetExportApp() {
        a.show();
      },
      showFrameExportApp: function showFrameExportApp() {
        o.show();
      },
      showGIFExportApp: function showGIFExportApp() {
        s.show();
      }
    }
  });
  e.exports = l;
}, function (e, t, i) {
  var n = i(1),
      r = i(4),
      a = i(15),
      o = i(16),
      s = new Vue({
    el: "#optionApp",
    data: {
      hidden: !0,
      overlayConfigHidden: !0,
      showOverlayActions: !1,
      overlayConfigDisabled: !0,
      position: {
        x: 0,
        y: 0
      }
    },
    methods: {
      show: function show(e, t) {
        var _this25 = this;

        this.hidden = !1, this.$nextTick(function () {
          var e = document.getElementById("optionButton").getBoundingClientRect();
          _this25.$el.style.left = e.x + "px", _this25.$el.style.top = e.y + e.height + 3 + "px";
        });
      },
      toggleOverlayActions: function toggleOverlayActions(e) {
        var _this26 = this;

        this.showOverlayActions = e, this.$nextTick(function () {
          _this26.overlayConfigDisabled || (document.getElementById("showOverlayConfigApp").classList.remove("disabled"), document.getElementById("rotoscope").classList.remove("disabled"));
        });
      },
      hide: function hide() {
        this.hidden = !0, this.showOverlayActions = !1;
      },
      showOverlayApp: function showOverlayApp() {
        a.show();
      },
      showOverlayConfigApp: function showOverlayConfigApp() {
        o.show();
      },
      clearJoints: function clearJoints() {
        confirm("Are you sure you want to reset everything?") && (n.emit("clearJoints"), n.emit("resetTimeline"), n.emit("resetCamera")), setTimeout(function () {
          r.pressed = !1, r.dragged = !1;
        }, 100);
      },
      resetTimeline: function resetTimeline() {
        confirm("Are you sure you want to reset the timeline? (This action won't affect the keyframes)") && n.emit("resetTimeline"), setTimeout(function () {
          r.pressed = !1, r.dragged = !1;
        }, 100);
      },
      resetView: function resetView() {
        n.emit("resetCamera");
      },
      undo: function undo() {
        n.emit("undo");
      },
      redo: function redo() {
        n.emit("redo");
      },
      rotoscope: function rotoscope() {
        n.emit("rotoscope");
      }
    }
  });
  n.on("overlayFrames", function () {
    s.overlayConfigDisabled = !1;
  }), e.exports = s;
}, function (e, t, i) {
  var r = i(1),
      n = (i(0), i(2)),
      a = i(3),
      o = ["skinPositionX", "skinPositionY", "skinScaleX", "skinScaleY", "skinAngle"],
      s = new Vue({
    el: "#paneApp",
    data: {
      hideJoints: !1,
      hideProperties: !0,
      hideHistory: !0,
      showLength: !a.animation.linear
    },
    methods: {
      handleFocusOut: function handleFocusOut(e) {
        var t = e.target;
        t.value.length && t.value || (t.value = 0), t._lastValue != t.value && (o.includes(t.id) ? r.emit("jointSkinningInputChange") : "jointZIndex" == t.id ? r.emit("jointZIndexInputChange") : "jointName" == t.id && r.emit("jointNameInputChange")), t._lastValue = t.value;
      },
      handleInput: function handleInput() {
        r.emit("jointNameInputChange", !0);
      },
      validateFormat: function validateFormat(e) {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), "jointX" == e.target.id || "jointY" == e.target.id ? r.emit("jointPositionInputChange") : "jointAngle" == e.target.id ? r.emit("jointAngleInputChange") : "jointLength" == e.target.id ? r.emit("jointLengthInputChange") : "jointZIndex" == e.target.id && r.emit("jointZIndexInputChange"), o.includes(e.target.id) && r.emit("jointSkinningInputChange", !0);
      },
      toggleAmount: function toggleAmount(n) {
        if (n.target == document.activeElement) {
          n.preventDefault(), n.target.value.length || (n.target.value = 1);

          var _e72 = n.wheelDeltaY < 0,
              _t46 = parseFloat(n.target.value),
              _i26 = 1;

          "skinScaleX" != n.target.id && "skinScaleY" != n.target.id || (_i26 = .1), _e72 ? _t46 -= _i26 : _t46 += _i26, n.target.value = _t46.toFixed(2), "jointX" == n.target.id || "jointY" == n.target.id ? r.emit("jointPositionInputChange") : "jointAngle" == n.target.id ? r.emit("jointAngleInputChange") : "jointLength" == n.target.id ? r.emit("jointLengthInputChange") : "jointZIndex" == n.target.id && (r.emit("jointZIndexInputChange", !0), n.target.value = parseInt(n.target.value)), o.includes(n.target.id) && r.emit("jointSkinningInputChange", !0);
        }
      },
      showJoints: function showJoints() {
        this.hideJoints = !1, this.hideProperties = !0, this.hideHistory = !0, n.query("#jointsTab").addClass("active"), n.query("#propertiesTab").removeClass("active"), n.query("#historyTab").removeClass("active"), n.query("#jointApp").removeClass("hidden"), n.query("#propertyApp").addClass("hidden"), n.query("#historyApp").addClass("hidden");
      },
      showProperties: function showProperties() {
        this.hideProperties = !1, this.hideJoints = !0, this.hideHistory = !0, n.query("#jointsTab").removeClass("active"), n.query("#propertiesTab").addClass("active"), n.query("#historyTab").removeClass("active"), n.query("#jointApp").addClass("hidden"), n.query("#propertyApp").removeClass("hidden"), n.query("#historyApp").addClass("hidden");
      },
      showHistory: function showHistory() {
        this.hideHistory = !1, this.hideJoints = !0, this.hideProperties = !0, n.query("#jointsTab").removeClass("active"), n.query("#propertiesTab").removeClass("active"), n.query("#historyTab").addClass("active"), n.query("#jointApp").addClass("hidden"), n.query("#propertyApp").addClass("hidden"), n.query("#historyApp").removeClass("hidden");
      }
    }
  });
  e.exports = s;
}, function (e, t, i) {
  var n = i(1),
      r = i(2),
      a = i(0),
      o = i(3),
      s = new Vue({
    el: "#cropApp",
    data: {
      cropFrom: {
        x: 0,
        y: 0
      },
      cropTo: null,
      cropBoundsThickness: 6,
      canvas: null,
      context: null,
      image: null,
      imageSize: null,
      hidden: !0
    },
    methods: {
      show: function show(e) {
        var _this27 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this27.$el.style.opacity = "1", r.query("#cropApp .drag").draggable({
            restrict: !0,
            root: _this27.$el
          }), _this27.canvas = document.getElementById("cropCanvas"), _this27.context = _this27.canvas.getContext("2d"), _this27.image = e, _this27.imageSize = a.scaleSize(_this27.image.width, _this27.image.height, _this27.canvas.parentNode.offsetWidth, _this27.canvas.parentNode.offsetWidth), _this27.canvas.width = _this27.imageSize.width, _this27.canvas.height = _this27.imageSize.height, _this27.cropTo || (_this27.cropTo = {
            x: _this27.imageSize.width,
            y: _this27.imageSize.height
          }), _this27.redraw();
        }), n.emit("renderSleep");
      },
      redraw: function redraw() {
        if (this.canvas && this.context && this.image) {
          var _e73 = this.context;
          _e73.clearRect(0, 0, this.canvas.width, this.canvas.height), _e73.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height), _e73.beginPath(), _e73.moveTo(this.cropFrom.x, this.cropFrom.y), _e73.lineTo(this.cropTo.x, this.cropFrom.y), _e73.lineTo(this.cropTo.x, this.cropTo.y), _e73.lineTo(this.cropFrom.x, this.cropTo.y), _e73.lineTo(this.cropFrom.x, this.cropFrom.y), _e73.lineTo(0, 0), _e73.lineTo(0, this.canvas.height), _e73.lineTo(this.canvas.width, this.canvas.height), _e73.lineTo(this.canvas.width, 0), _e73.lineTo(0, 0), _e73.closePath(), _e73.fillStyle = "rgba(0, 0, 0, 0.4)", _e73.fill(), _e73.save(), _e73.clip(), t = _e73, i = this.cropFrom.x - this.cropBoundsThickness / 2, n = this.cropFrom.y - this.cropBoundsThickness / 2, r = this.cropTo.x - this.cropFrom.x + this.cropBoundsThickness, a = this.cropTo.y - this.cropFrom.y + this.cropBoundsThickness, t.beginPath(), t.rect(i, n, r, a), t.closePath(), _e73.fillStyle = o.accent, _e73.fill(), _e73.restore();
        }

        var t, i, n, r, a;
      },
      hide: function hide() {
        this.hidden = !0, this.canvas = null, this.context = null, n.emit("renderFocus");
      },
      getCrop: function getCrop() {
        return {
          from: {
            x: a.map(this.cropFrom.x, 0, this.imageSize.width, 0, this.image.width),
            y: a.map(this.cropFrom.y, 0, this.imageSize.height, 0, this.image.height)
          },
          to: {
            x: a.map(this.cropTo.x, 0, this.imageSize.width, 0, this.image.width),
            y: a.map(this.cropTo.y, 0, this.imageSize.width, 0, this.image.width)
          }
        };
      },
      save: function save() {
        this.hide(), n.emit("crop", this.getCrop(), {
          from: this.cropFrom,
          to: this.cropTo
        });
      },
      reset: function reset() {
        this.cropFrom = {
          x: 0,
          y: 0
        }, this.cropTo = {
          x: this.canvas.width,
          y: this.canvas.height
        }, this.redraw();
      }
    }
  });

  function l(e, t) {
    var i = e >= s.cropFrom.x - s.cropBoundsThickness && e <= s.cropFrom.x + s.cropBoundsThickness && t >= s.cropFrom.y - s.cropBoundsThickness && t <= s.cropTo.y + s.cropBoundsThickness,
        n = e >= s.cropTo.x - s.cropBoundsThickness && e <= s.cropTo.x + s.cropBoundsThickness && t >= s.cropFrom.y - s.cropBoundsThickness && t <= s.cropTo.y + s.cropBoundsThickness;
    return {
      top: t >= s.cropFrom.y - s.cropBoundsThickness && t <= s.cropFrom.y + s.cropBoundsThickness && e >= s.cropFrom.x - s.cropBoundsThickness && e <= s.cropTo.x + s.cropBoundsThickness,
      right: n,
      bottom: t >= s.cropTo.y - s.cropBoundsThickness && t <= s.cropTo.y + s.cropBoundsThickness && e >= s.cropFrom.x - s.cropBoundsThickness && e <= s.cropTo.x + s.cropBoundsThickness,
      left: i
    };
  }

  var h,
      c,
      d,
      u,
      p = r.query("body"),
      f = !1;
  addEventListener("mousedown", function (e) {
    var t, i;
    s.canvas && s.context && (i = e.clientX, t = e.clientY, i = i - (e = s.canvas.getBoundingClientRect()).x, e = t - e.y, f = !0, h = l(i, e), c = {
      x: i - s.cropFrom.x,
      y: e - s.cropFrom.y
    }, d = s.cropTo.x - s.cropFrom.x, u = s.cropTo.y - s.cropFrom.y);
  }), addEventListener("mouseup", function () {
    f = !1;
  }), addEventListener("mousemove", function (e) {
    var t,
        i = e.clientX,
        n = e.clientY;
    s.canvas && s.context && (n = l(e = i - (t = s.canvas.getBoundingClientRect()).x, i = n - t.y), t = e >= s.cropFrom.x + s.cropBoundsThickness / 2 && e <= s.cropTo.x - s.cropBoundsThickness / 2 && i >= s.cropFrom.y + s.cropBoundsThickness / 2 && i <= s.cropTo.y - s.cropBoundsThickness / 2, f ? (h.top && (s.cropFrom.y = i, s.redraw()), h.left && (s.cropFrom.x = e, s.redraw()), h.bottom && (s.cropTo.y = i, s.redraw()), h.right && (s.cropTo.x = e, s.redraw()), h.top || h.bottom || h.left || h.right || !t || (s.cropFrom.x = e - c.x, s.cropFrom.y = i - c.y, s.cropTo.x = s.cropFrom.x + d, s.cropTo.y = s.cropFrom.y + u, s.redraw()), s.cropFrom.y = a.clamp(s.cropFrom.y, 0, s.cropTo.y), s.cropFrom.x = a.clamp(s.cropFrom.x, 0, s.cropTo.x), s.cropTo.y = a.clamp(s.cropTo.y, s.cropFrom.y, s.canvas.height), s.cropTo.x = a.clamp(s.cropTo.x, s.cropFrom.x, s.canvas.width)) : ((n.left || n.right) && p.css("cursor", "ew-resize"), (n.top || n.bottom) && p.css("cursor", "ns-resize"), n.top && n.left && p.css("cursor", "nw-resize"), n.top && n.right && p.css("cursor", "ne-resize"), n.bottom && n.left && p.css("cursor", "sw-resize"), n.bottom && n.right && p.css("cursor", "se-resize"), n.top || n.bottom || n.left || n.right || p.css("cursor", "unset"), t && p.css("cursor", "move")));
  }), e.exports = s;
}, function (e, t, i) {
  var p = i(1),
      f = i(0);
  var g;

  e.exports = function (e, h) {
    if (!(h = h || {}).drop) {
      var c = document.createElement("canvas"),
          d = c.getContext("2d"),
          _u = document.createElement("video");

      _u.crossOrigin = "anonymous", _u.controls = !0, _u.muted = !0, _u.src = e, _u.load();
      var r = [],
          n = h.start || 1,
          a = h.frameRate || 24,
          o = h.quality || .1,
          s = h.width || 640,
          l = h.height || 480;

      _u.addEventListener("loadedmetadata", function () {
        var e = h.end || _u.duration,
            t = h.frameCount || (e - n) * a,
            i = f.scaleSize(_u.videoWidth, _u.videoHeight, s, l);
        c.width = i.width, c.height = i.height, _u.currentTime = n, _u.addEventListener("seeked", function () {
          !h.drop && r.length < t ? (p.emit("extractKeyframeProgress", t), _u.currentTime += 1 / a) : p.emit("extractKeyframeDone", r);
        });
      });

      var _i27 = p.on("extractKeyframeProgress", function (e) {
        d.drawImage(_u, 0, 0, c.width, c.height);
        var t = c.toDataURL("image/jpeg", o),
            i = new Image();
        i.crossOrigin = "anonymous", i.src = t;
        var n = {
          image: i,
          time: _u.currentTime
        };
        r.push(n), d.clearRect(0, 0, c.width, c.height), "function" == typeof h.progress && (g = r.length / e * 100, h.progress(n.image, g));
      });

      p.once("extractKeyframeDone", function (e) {
        e.sort(function (e, t) {
          return e.time - t.time;
        });

        for (var t = 0; t < e.length; t++) {
          e[t] = e[t].image;
        }

        h.done(e), p.removeListener(_i27), c.remove();
      });
    }
  };
}]);