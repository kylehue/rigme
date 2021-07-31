"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e77) { throw _e77; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e78) { didErr = true; err = _e78; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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

!function (e) {
  var t = {};

  function i(n) {
    if (t[n]) return t[n].exports;
    var r = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
  }

  i.m = e, i.c = t, i.d = function (e, t, n) {
    i.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: n
    });
  }, i.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, i.t = function (e, t) {
    if (1 & t && (e = i(e)), 8 & t) return e;
    if (4 & t && "object" == _typeof(e) && e && e.__esModule) return e;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var r in e) {
      i.d(n, r, function (t) {
        return e[t];
      }.bind(null, r));
    }
    return n;
  }, i.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return i.d(t, "a", t), t;
  }, i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, i.p = "", i(i.s = 22);
}([function (e, t) {
  var i = [];
  var n = 6;
  e.exports = {
    loadImage: function loadImage(e) {
      var _this = this;

      var t = new Image();
      return t.crossOrigin = "anonymous", t.src = e, new Promise(function (e, i) {
        t.onload = function () {
          var i = document.createElement("canvas"),
              n = i.getContext("2d");

          var r = _this.scaleSize(t.width, t.height, 360, 240);

          i.width = r.width, i.height = r.height, n.drawImage(t, 0, 0, i.width, i.height);
          var a = i.toDataURL("image/png");
          e({
            url: a,
            width: i.width,
            height: i.height,
            image: i
          });
        };
      });
    },
    uid: function uid() {
      var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
          t = "";

      function r() {
        t = "";

        for (var i = 0; i < n; i++) {
          t += e[Math.floor(Math.random() * e.length)];
        }
      }

      r();
      var a = performance.now();

      for (; i.includes(t);) {
        performance.now() - a > 20 && n++, r();
      }

      return i.push(t), t;
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

      if (arguments.length > 2) {
        var _e = Array.prototype.slice.call(arguments);

        return _e[Math.floor(Math.random() * _e.length)];
      }
    },
    clamp: function clamp(e, t, i) {
      var n = e < t ? t : e;
      return n = n > i ? i : n, n;
    },
    getRandomColor: function getRandomColor() {
      return this.random(["#ff3b3b", "#ff763b", "#ffdb3b", "#c4ff3b", "#76ff3b", "#3bff8d", "#3bc1ff", "#3b48ff", "#963bff", "#de3bff", "#ff3b96"]);
    },
    loadJSONData: function loadJSONData(e, t) {
      var i = localStorage.getItem(e);

      if (i) {
        var _e2,
            _n = !1;

        try {
          _e2 = JSON.parse(i);
        } catch (e) {
          _n = !0, console.warn("Couldn't load autosaved data.");
        }

        _e2 && !_n && "function" == typeof t && t(_e2);
      }
    },
    degrees: function degrees(e) {
      return e * (180 / Math.PI);
    },
    radians: function radians(e) {
      return e * (Math.PI / 180);
    },
    scaleSize: function scaleSize(e, t, i, n) {
      var r = Math.min(i / e, n / t);
      return {
        width: e * r,
        height: t * r
      };
    }
  };
}, function (e, t, i) {
  var n = i(0);
  var r = !1;
  var a = new ( /*#__PURE__*/function () {
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
      value: function removeListener(e, t) {
        var i = this.listeners.find(function (i) {
          return i[e] === t;
        });
        if (t || (i = e), i) for (var n = 0; n < this.listeners.length; n++) {
          if (this.listeners[n].id === i.id) {
            this.listeners.splice(n, 1);
            break;
          }
        }
      }
    }, {
      key: "emit",
      value: function emit(e) {
        if (!e) return;
        var t = [];

        for (var i = 0; i < arguments.length; i++) {
          t.push(arguments[i]);
        }

        t.shift(), this.emits[e] = t;
        var n = [];

        for (i = 0; i < this.listeners.length; i++) {
          var _t = this.listeners[i];
          _t.name === e && n.push(_t);
        }

        for (i = 0; i < n.length; i++) {
          var _e3 = n[i];
          "function" == typeof _e3.method && (_e3.method.apply(_e3, t), _e3.once && this.removeListener("id", _e3.id));
        }
      }
    }, {
      key: "on",
      value: function on(e, t) {
        if (!e || !t || "function" != typeof t) return;
        var i = {
          id: n.uid(),
          name: e,
          method: t,
          once: r
        };
        return this.listeners.push(i), this.listeners.length >= this.maxListeners && (this.listeners.shift(), console.warn("Reached the max number of listeners.")), i;
      }
    }, {
      key: "once",
      value: function once(e, t) {
        r = !0;
        var i = this.on(e, t);
        return r = !1, i;
      }
    }]);

    return _class;
  }())();
  e.exports = a;
}, function (e, t, i) {
  var n = i(4),
      r = i(0);
  var a,
      o = [],
      s = !1,
      l = null,
      h = {};

  var c = function c(e) {
    l && "function" == typeof l._dragEnd && l._dragEnd(e), s = !1, l = null;
  };

  addEventListener("mousemove", function (e) {
    if (s && l) {
      e.preventDefault();
      var _t2 = {
        x: h.x - e.clientX,
        y: h.y - e.clientY
      },
          _i = {
        x: l.offsetLeft - _t2.x,
        y: l.offsetTop - _t2.y
      };
      l._restrictDrag && (_i.x = r.clamp(_i.x, 0, innerWidth - a.width), _i.y = r.clamp(_i.y, 0, innerHeight - a.height)), _i.x < innerWidth - a.width && _i.x > 0 && (h.x = e.clientX, l.style.left = _i.x + "px"), _i.x >= innerWidth - a.width && (l.style.left = innerWidth - a.width + "px"), _i.x <= 0 && (l.style.left = "0px"), _i.y < innerHeight - a.height && _i.y > 0 && (h.y = e.clientY, l.style.top = _i.y + "px"), _i.y >= innerHeight - a.height && (l.style.top = innerHeight - a.height + "px"), _i.y <= 0 && (l.style.top = "0px"), "function" == typeof l._drag && l._drag(e);
    }

    n.pressed || c();
  }), addEventListener("mousedown", function (e) {
    o.includes(e.target._dragRoot) && (e.preventDefault(), s = !0, l = e.target._dragRoot, a = l.getBoundingClientRect(), h.x = e.clientX, h.y = e.clientY, "function" == typeof l._dragStart && l._dragStart(e));
  }), addEventListener("mouseup", c);

  var d = /*#__PURE__*/function () {
    function d() {
      _classCallCheck(this, d);
    }

    _createClass(d, [{
      key: "query",
      value: function query(e, t) {
        if ("object" == _typeof(e)) return new p(e);
        var i = this.node ? this.node : document;
        if (!t) return new p(i.querySelector(e));
        var n = i.querySelectorAll(e),
            r = [];

        for (var a = 0; a < n.length; a++) {
          var _e4 = new p(n[a]);

          r.push(_e4);
        }

        return new u(r);
      }
    }, {
      key: "create",
      value: function create(e) {
        var t = document.createElement(e),
            i = new p(t);
        return this.node && this.node.appendChild(t), i;
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
      value: function append(e) {
        if (e instanceof u) for (var t = 0; t < this.elements.length; t++) {
          var _n2 = this.elements[t];

          for (var i = 0; i < e.elements.length; i++) {
            _n2.append(e.elements[i]);
          }
        } else for (t = 0; t < this.elements.length; t++) {
          this.elements[t].append(e);
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
      value: function query(e) {
        var t = [];
        if ("string" == typeof e) for (var i = 0; i < this.elements.length; i++) {
          var _n3 = this.elements[i];
          _n3.node.matches(e) && t.push(_n3);
        } else if ("object" == _typeof(e)) {
          var _i2 = new p(e);

          t.push(_i2);
        }
        return new u(t);
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
      value: function except(e) {
        var t = [];

        for (var i = 0; i < this.elements.length; i++) {
          var _n4 = this.elements[i];
          _n4.node.matches(e) || t.push(_n4);
        }

        return new u(t);
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
        for (var e = 0; e < this.elements.length; e++) {
          var _t3 = this.elements[e];
          this.elements.splice(this.elements.indexOf(_t3), 1), _t3.remove();
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
        e = e || {}, this.node._dragRoot = e.root || this.node, this.node._dragRoot._restrictDrag = e.restrict, this.node._dragRoot._dragStart = e.dragStart, this.node._dragRoot._dragEnd = e.dragEnd, this.node._dragRoot._drag = e.drag, o.includes(this.node._dragRoot) || o.push(this.node._dragRoot);
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
        if ("object" == _typeof(e)) {
          var _i3 = Object.keys(e);

          for (var t = 0; t < _i3.length; t++) {
            var _n5 = _i3[t],
                _r = e[_n5];
            this.node.style[_n5] = _r;
          }
        } else 2 == arguments.length && (this.node.style[arguments[0]] = arguments[1]);

        return this;
      }
    }, {
      key: "prop",
      value: function prop(e) {
        if ("object" == _typeof(e)) {
          var _i4 = Object.keys(e);

          for (var t = 0; t < _i4.length; t++) {
            var _n6 = _i4[t],
                _r2 = e[_n6];
            this.node[_n6] = _r2;
          }
        } else if (arguments.length) {
          var _e5 = arguments[0],
              _t4 = arguments[1];
          return void 0 !== _t4 && (this.node[_e5] = _t4), this.node[_e5];
        }

        return this;
      }
    }, {
      key: "attr",
      value: function attr(e) {
        if ("object" == _typeof(e)) {
          var _i5 = Object.keys(e);

          for (var t = 0; t < _i5.length; t++) {
            var _n7 = _i5[t],
                _r3 = e[_n7];
            this.node.setAttribute(_n7, _r3);
          }
        } else if (arguments.length) {
          var _e6 = arguments[0],
              _t5 = arguments[1];
          return void 0 !== _t5 && this.node.setAttribute(_e6, _t5), this.node.getAttribute(_e6);
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

  var f = new d();
  e.exports = f;
}, function (e, t) {
  e.exports = {
    accent: "#5984d2",
    render: {
      joint: {
        radius: 3,
        color: {
          selected: "#ff565a",
          moving: "#b5babe",
          "default": "#dce0e4"
        }
      },
      segment: {
        width: 1.5,
        color: "#c7cbce"
      },
      keyframe: {
        size: 6,
        color: {
          "default": "#ff4258",
          hovered: "#ee2b47",
          active: "#e31d42"
        }
      },
      timeline: {
        scrollbar: {
          color: {
            "default": "rgba(240, 230, 250, 0.045)",
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
    i.scrolled = !0, event.wheelDelta > 0 ? i.scrollTop = !0 : i.scrollTop = !1, setTimeout(function () {
      i.scrolled = !1;
    }, 100);
  }), e.exports = i;
}, function (e, t, i) {
  var n = i(13),
      r = i(1),
      a = i(4),
      o = i(3),
      s = i(0),
      l = i(7),
      h = i(9),
      c = i(14),
      d = i(10);
  var u;
  var p = new Vue({
    el: "#timelineApp",
    data: {
      hidden: !1,
      totalFrames: parseInt(document.getElementById("frameCount").value),
      animationSpeed: parseInt(document.getElementById("animationSpeed").value),
      currentFrame: 0
    },
    methods: {
      fixData: function fixData() {
        this.animationSpeed = parseInt(document.getElementById("animationSpeed").value), this.totalFrames = parseInt(document.getElementById("frameCount").value), u.hatchMark.spacing = u.canvas.width / this.totalFrames, u.snap(), u.redraw(), u.playbackHandle.end.mark >= this.totalFrames && 1 != this.totalFrames && (u.playbackHandle.end.mark = this.totalFrames - 1, u.playbackHandle.end._x = u.markToX(u.playbackHandle.end.mark), u.redraw());
        var e = {
          frameCount: this.totalFrames,
          animationSpeed: this.animationSpeed
        };
        localStorage.setItem(o.autosave.label + ".frames.config", JSON.stringify(e));
      },
      validateFormat: function validateFormat(e) {
        u.redraw(), e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(e), this.fixData();
      },
      validateAmount: function validateAmount(e) {
        this.validateMin(e), this.validateMax(e), this.fixData();
      },
      validateMax: function validateMax(e) {
        var t = e.target.value,
            i = o.animation.frameCount.max;
        "animationSpeed" == e.target.id && (i = o.animation.speed.max), parseInt(t) > i && (e.target.value = i.toString()), this.fixData();
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = o.animation.frameCount.min;
        "animationSpeed" == e.target.id && (i = o.animation.speed.min), parseInt(t) < i && (e.target.value = i.toString()), this.fixData();
      },
      addToHistory: function addToHistory() {
        this.totalFrames != this._previousTotalFrames && d.add({
          label: "Change frame count",
          value: this.totalFrames,
          group: "input"
        }), this.animationSpeed != this._previousAnimationSpeed && d.add({
          label: "Change animation speed",
          value: this.animationSpeed,
          group: "input"
        }), this._previousTotalFrames = this.totalFrames, this._previousAnimationSpeed = this.animationSpeed;
      },
      toggleAmount: function toggleAmount(e) {
        if (e.target != document.activeElement) return;
        var t = e.wheelDeltaY < 0,
            i = parseInt(e.target.value);
        t ? i-- : i++, e.target.value = i.toString(), p.validateAmount(e), this.fixData();
      },
      setCurrentFrame: function setCurrentFrame(e) {
        this.currentFrame = e;
      }
    }
  });
  p._previousTotalFrames = p.totalFrames, p._previousAnimationSpeed = p.animationSpeed, p.$el.addEventListener("focusout", function () {});
  u = new ( /*#__PURE__*/function () {
    function _class3() {
      var _this3 = this;

      _classCallCheck(this, _class3);

      this.canvas = document.getElementById("timelineGraph"), this.context = this.canvas.getContext("2d"), this.buttons = {
        previous: document.getElementById("lastFrame"),
        play: document.getElementById("playStop"),
        next: document.getElementById("nextFrame"),
        add: document.getElementById("addKeyframe"),
        "delete": document.getElementById("deleteKeyframe"),
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
        spacing: this.canvas.width / p.totalFrames,
        height: 4
      }, this.scrollbar = {}, this.playbackHandle = {
        start: {
          mark: 0,
          _x: 0
        },
        end: {
          mark: p.totalFrames - 1,
          _x: 0
        },
        width: 2,
        offset: 6
      }, this.bounds = this.canvas.getBoundingClientRect(), this.loop = null, this.addButtonEvents(), this.addMouseEvents(), this.addKeyboardEvents(), this.updateSize(), addEventListener("resize", function () {
        _this3.updateSize(), _this3.scrollbar.left = s.clamp(_this3.scrollbar.left, 0, _this3.canvas.width - _this3.scrollbar.minWidth), _this3.scrollbar.right = s.clamp(_this3.scrollbar.right, _this3.scrollbar.minWidth, _this3.canvas.width), _this3.scrollbar.width = _this3.scrollbar.right - _this3.scrollbar.left, _this3.redraw();
      }), addEventListener("load", function (e) {
        _this3.updateSize(), _this3.redraw();
      }), this.scrollbar = {
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: void 0,
        color: o.render.timeline.scrollbar.color["default"],
        left: 0,
        right: this.canvas.width,
        minWidth: 50,
        zoomSensitivity: 10
      }, this._timelineHeight = void 0;
    }

    _createClass(_class3, [{
      key: "storeSelectedKeyframe",
      value: function storeSelectedKeyframe() {
        var e = Object.keys(h.keyframes);

        for (var t = 0; t < e.length; t++) {
          var _i6 = e[t],
              _n8 = h.keyframes[_i6];
          _n8.index == this.state.currentMark ? _n8.selected = !0 : _n8.selected = !1;
        }
      }
    }, {
      key: "markToX",
      value: function markToX(e, t) {
        var i = s.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
            n = Math.round(s.clamp(i - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing),
            r = i % this.hatchMark.spacing,
            a = (e - n) * this.hatchMark.spacing + this.hatchMark.spacing / 2 - r;
        return t ? a : s.clamp(a, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
      }
    }, {
      key: "xToMark",
      value: function xToMark(e) {
        var t = s.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
            i = Math.round(s.clamp(t - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing),
            n = t % this.hatchMark.spacing,
            r = Math.round((e + n + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + i;
        return s.clamp(r, 0, p.totalFrames - 1);
      }
    }, {
      key: "addKeyboardEvents",
      value: function addKeyboardEvents() {
        var _this4 = this;

        addEventListener("keydown", function (e) {
          Object.keys(h.keyframes);

          if (_this4.storeSelectedKeyframe(), e.ctrlKey && (67 == e.keyCode && (h.copiedKeyframe = n(h.getKeyframe("selected", !0))), 86 == e.keyCode)) {
            var _e7 = h.copiedKeyframe;
            _e7 && h.setKeyframe(_this4.state.currentMark, {
              position: l(_this4.state.currentMark * _this4.hatchMark.spacing + _this4.hatchMark.spacing / 2, 0),
              locked: 0 == _this4.state.currentMark,
              id: s.uid(),
              joints: _e7.joints
            });
          }
        });
      }
    }, {
      key: "addMouseEvents",
      value: function addMouseEvents() {
        var _this5 = this;

        this.canvas.addEventListener("contextmenu", function (e) {
          if (e.target != _this5.canvas) return;
          a.x, _this5.bounds.x, a.y, _this5.bounds.y;

          _this5.storeSelectedKeyframe();

          var t = a.x + c.width > innerWidth ? -c.width : 0,
              i = a.y + c.height > innerHeight ? -c.height : 0;
          c.show(a.x + t, a.y + i);
        });
        var e,
            t,
            i,
            n,
            l,
            d,
            u,
            f,
            g,
            m = !1,
            y = null,
            v = 0;
        this.redraw(), addEventListener("mouseup", function () {
          if (m = !1, r.emit("renderFocus"), "playbackHandleStart" == y || "playbackHandleEnd" == y) {
            var _e8 = {
              start: _this5.playbackHandle.start.mark,
              end: _this5.playbackHandle.end.mark
            };
            localStorage.setItem(o.autosave.label + ".playback.config", JSON.stringify(_e8));
          }

          if (y = null, e) {
            var _t6 = _this5.xToMark(_this5.state._x);

            _this5.setCurrentMark(_t6), h.deleteKeyframe(e.id);
            h.setKeyframe(_t6, {
              position: e.position,
              joints: e.joints,
              locked: 0 == _t6
            });
          }

          _this5.scrollbar.color = o.render.timeline.scrollbar.color["default"], _this5.snap(), _this5.state.isDragging = !1, _this5.playbackHandle.start.isDragging = !1, _this5.playbackHandle.end.isDragging = !1, e = null, _this5.canvas.style.cursor = "default", _this5.redraw();
        }), addEventListener("mousedown", function (e) {
          if (e.target == _this5.canvas) {
            if (m = !0, r.emit("renderSleep"), _this5.playbackHandle.end.mark >= p.totalFrames && 1 != p.totalFrames && (_this5.playbackHandle.end.mark = p.totalFrames - 1, _this5.playbackHandle.end._x = _this5.markToX(_this5.playbackHandle.end.mark), _this5.redraw()), m && !y) if (n) v = _this5.scrollbar.left - t, y = "scrollbar";else if (l) {
              y = "timeline";

              var _e9 = _this5.markToX(_this5.playbackHandle.start.mark, !0),
                  _i7 = _this5.markToX(_this5.playbackHandle.end.mark, !0),
                  _n9 = _this5.playbackHandle.width / 2 + _this5.playbackHandle.offset / 2;

              t >= _e9 - _n9 && t <= _e9 + _n9 ? y = "playbackHandleStart" : t >= _i7 - _n9 && t <= _i7 + _n9 && (y = "playbackHandleEnd");
            } else d && (y = "keyframe");

            if ("timeline" == y) {
              _this5.state.isDragging = !0, _this5.state._x = s.clamp(t, _this5.hatchMark.spacing / 2, _this5.canvas.width - _this5.hatchMark.spacing / 2);

              var _e10 = _this5.xToMark(t);

              _e10 >= 0 && _e10 <= p.totalFrames && _this5.setCurrentMark(_e10);
            }

            c.hide();
          }
        }), addEventListener("mousemove", function () {
          if (t = a.x - _this5.bounds.x, i = a.y - _this5.bounds.y, !m && (i < 0 || i > _this5.canvas.height || t < 0 || t > _this5.canvas.width)) return;
          n = i >= 0 && i <= _this5.scrollbar.height, l = i >= _this5.scrollbar.height && i <= _this5.scrollbar.height + _this5._timelineHeight, d = i >= _this5.scrollbar.height + _this5._timelineHeight && i <= _this5.canvas.height;
          y || (u = t <= _this5.scrollbar.left + 10, f = t >= _this5.scrollbar.right - 10);

          var r = t >= _this5.scrollbar.left && t <= _this5.scrollbar.right && (u || f) && n,
              c = _this5.markToX(_this5.playbackHandle.start.mark, !0),
              b = _this5.markToX(_this5.playbackHandle.end.mark, !0),
              k = _this5.playbackHandle.width / 2 + _this5.playbackHandle.offset / 2;

          if (g = (t >= c - k && t <= c + k || t >= b - k && t <= b + k) && l, _this5.canvas.style.cursor = r || g ? "ew-resize" : "default", d) {
            var _e11 = Object.keys(h.keyframes);

            for (var x = 0; x < _e11.length; x++) {
              var _n10 = h.keyframes[_e11[x]];

              if ("head" == _n10.type) {
                var _e12 = _n10.render.position.x,
                    _r4 = _n10.render.position.y,
                    _a = _n10.render.size;
                t <= _e12 + _a && t >= _e12 - _a && i <= _r4 + _a && i && i >= _r4 - _a ? (_n10.hovered = !0, _n10.render.color = o.render.keyframe.color.hovered, _this5.canvas.style.cursor = "pointer", _this5.redraw()) : (_n10.hovered = !1, _n10.render.color = o.render.keyframe.color["default"], _this5.redraw());
              }
            }
          }

          if (n && t >= _this5.scrollbar.left && t <= _this5.scrollbar.right ? (_this5.scrollbar.color = o.render.timeline.scrollbar.color.hovered, _this5.redraw()) : (_this5.scrollbar.color = o.render.timeline.scrollbar.color["default"], _this5.redraw()), m) {
            if ("scrollbar" == y && (u ? (_this5.scrollbar.left = s.clamp(t, 0, _this5.scrollbar.right - _this5.scrollbar.minWidth), _this5.scrollbar.width = _this5.scrollbar.right - _this5.scrollbar.left, _this5.canvas.style.cursor = "ew-resize") : f && (_this5.scrollbar.right = s.clamp(t, _this5.scrollbar.left + _this5.scrollbar.minWidth, _this5.canvas.width), _this5.scrollbar.width = _this5.scrollbar.right - _this5.scrollbar.left, _this5.canvas.style.cursor = "ew-resize"), u || f || (_this5.scrollbar.left = s.clamp(t + v, 0, _this5.canvas.width - _this5.scrollbar.width), _this5.scrollbar.right = _this5.scrollbar.left + _this5.scrollbar.width, _this5.canvas.style.cursor = "default"), _this5.snap()), "timeline" == y || "keyframe" == y) {
              _this5.state.isDragging = !0, _this5.state._x = s.clamp(t, _this5.hatchMark.spacing / 2, _this5.canvas.width - _this5.hatchMark.spacing / 2);

              var _e13 = _this5.xToMark(t);

              _e13 >= 0 && _e13 <= p.totalFrames && _this5.setCurrentMark(_e13);
            }

            if ("playbackHandleStart" == y) {
              _this5.playbackHandle.start.isDragging = !0, _this5.playbackHandle.start._x = s.clamp(t, _this5.hatchMark.spacing / 2, _this5.playbackHandle.end._x - _this5.playbackHandle.width / 2 - _this5.hatchMark.spacing);

              var _e14 = _this5.xToMark(t);

              _e14 = s.clamp(_e14, 0, _this5.playbackHandle.end.mark - 1), _e14 >= 0 && _e14 <= p.totalFrames && (_this5.playbackHandle.start.mark = _e14), _this5.canvas.style.cursor = "ew-resize";
            }

            if ("playbackHandleEnd" == y) {
              _this5.playbackHandle.end.isDragging = !0, _this5.playbackHandle.end._x = s.clamp(t, _this5.playbackHandle.start._x + _this5.playbackHandle.width / 2 + _this5.hatchMark.spacing, _this5.canvas.width - _this5.hatchMark.spacing / 2);

              var _e15 = _this5.xToMark(t);

              _e15 = s.clamp(_e15, _this5.playbackHandle.start.mark + 1, p.totalFrames - 1), _e15 >= 0 && _e15 <= p.totalFrames && (_this5.playbackHandle.end.mark = _e15), _this5.canvas.style.cursor = "ew-resize";
            }

            if ("keyframe" == y) if (e) _this5.state._x = s.clamp(t, _this5.hatchMark.spacing / 2, _this5.canvas.width - _this5.hatchMark.spacing / 2), e.render.position.x = _this5.state._x, e.dragged = !0, e.render.color = o.render.keyframe.color.active;else {
              var _t7 = Object.keys(h.keyframes);

              for (x = 0; x < _t7.length; x++) {
                var _i8 = h.keyframes[_t7[x]];
                _i8 && (_i8.locked || _i8.hovered && (e = _i8));
              }
            }

            _this5.redraw();
          }
        });
      }
    }, {
      key: "addButtonEvents",
      value: function addButtonEvents() {
        var _this6 = this;

        this.buttons.previous.addEventListener("click", function () {
          var e = _this6.state.currentMark > 0 ? _this6.state.currentMark - 1 : _this6.state.currentMark;

          _this6.setCurrentMark(e);
        }), this.buttons.next.addEventListener("click", function () {
          var e = _this6.state.currentMark < p.totalFrames - 1 ? _this6.state.currentMark + 1 : _this6.state.currentMark;

          _this6.setCurrentMark(e);
        }), this.buttons.play.addEventListener("click", function () {
          _this6.state.isPlaying ? _this6.stop() : _this6.play(), _this6.redraw();
        }), this.buttons.add.addEventListener("click", function () {
          var e,
              t = h.clone()[_this6.state.currentMark];

          t && (e = t.joints), h.setKeyframe(_this6.state.currentMark, {
            locked: 0 == _this6.state.currentMark,
            joints: e
          });
        }), this.buttons["delete"].addEventListener("click", function () {
          r.emit("deleteKeyframe");
        });
        a.on("mousewheel", function (e) {
          if (e.target == _this6.canvas) {
            if (a.scrollTop) {
              if (_this6.scrollbar.width > _this6.scrollbar.minWidth + 5) {
                var _e16 = s.map(_this6.scrollbar.width, 0, _this6.canvas.width, .5, .001),
                    _t8 = _this6.markToX(_this6.state.currentMark, !0);

                _this6.scrollbar.left = s.lerp(_this6.scrollbar.left, _t8 - _this6.scrollbar.minWidth / 2, _e16), _this6.scrollbar.right = s.lerp(_this6.scrollbar.right, _t8 + _this6.scrollbar.minWidth / 2, _e16);
              }
            } else {
              var _e17 = s.map(_this6.scrollbar.width, 0, _this6.canvas.width, .001, .5);

              _this6.scrollbar.left = s.lerp(_this6.scrollbar.left, 0, _e17), _this6.scrollbar.right = s.lerp(_this6.scrollbar.right, _this6.canvas.width, _e17);
            }

            _this6.scrollbar.width = _this6.scrollbar.right - _this6.scrollbar.left, _this6.snap(), _this6.redraw();
          }
        }), this.buttons.minimize.addEventListener("click", function () {
          _this6.state.isMinimized ? _this6.maximize() : _this6.minimize();
        });
      }
    }, {
      key: "snap",
      value: function snap() {
        var e = Object.keys(h.keyframes);

        for (var t = 0; t < e.length; t++) {
          var _i9 = e[t],
              _n11 = h.keyframes[_i9],
              _r5 = this.markToX(_n11.index, !0);

          _n11.render.position.x = _r5;
        }

        this.state._x = this.markToX(this.state.currentMark, !0), this.playbackHandle.start._x = this.markToX(this.playbackHandle.start.mark, !0), this.playbackHandle.end._x = this.markToX(this.playbackHandle.end.mark, !0), this.redraw();
      }
    }, {
      key: "updateState",
      value: function updateState(e) {
        e = void 0 === e || e;

        var t = function () {
          var e = p.totalFrames,
              t = u.state.currentMark,
              i = null;

          for (var n = parseInt(t); n >= 0; n--) {
            var _e18 = h.keyframes[n];

            if (_e18 && "head" == _e18.type) {
              i = _e18.index;
              break;
            }
          }

          var r = null;

          for (n = parseInt(t) + 1; n < e; n++) {
            var _e19 = h.keyframes[n];

            if (_e19 && "head" == _e19.type) {
              r = _e19.index;
              break;
            }
          }

          var a = null;

          for (n = i - 1; n >= 0; n--) {
            var _e20 = h.keyframes[n];

            if (_e20 && "head" == _e20.type) {
              a = _e20.index;
              break;
            }
          }

          return {
            current: i,
            next: r,
            previous: a
          };
        }();

        if (this.state.currentFrame = t.current, this.state.nextFrame = t.next, this.state.previousFrame = t.previous, e) {
          var _e21 = h.keyframes[this.state.currentMark];

          if (_e21 = _e21 || h.keyframes[this.state.currentFrame], "object" == _typeof(_e21)) {
            h.joints = _e21.joints;

            var _t9 = h.joints.find(function (t) {
              return t.id === _e21.activeJointId;
            });

            h.activeJoint = _t9 || h.joints[h.joints.length - 1];
          }
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
        var t = s.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
            i = this.canvas.width + s.map(this.scrollbar.width, 0, this.canvas.width, this.canvas.width * this.scrollbar.zoomSensitivity, 0),
            n = p.totalFrames,
            r = 5 * Math.floor(s.clamp(p.totalFrames, i / 15, Number.MAX_SAFE_INTEGER) / (i / 15)),
            l = Math.round((t - this.hatchMark.spacing / 2) / this.hatchMark.spacing),
            c = Math.round((s.map(this.scrollbar.right, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity) - this.hatchMark.spacing / 2) / this.hatchMark.spacing),
            d = this.markToX(this.state.currentMark, !0);
        d = this.state.isDragging ? this.state._x : d;
        var u = this._timelineHeight - this.hatchMark.height,
            f = this.state.currentMark + 1;
        this.createRect(this.scrollbar.left, this.scrollbar.y, this.scrollbar.right - this.scrollbar.left, this.scrollbar.height - 5, this.scrollbar.color, 4), this.createRect(0, this.scrollbar.height, this.canvas.width, this._timelineHeight, "rgba(0, 0, 0, 0.15)", 4), this.context.save(), this.context.clip(), this.hatchMark.spacing = i / n;

        for (var g = 0; g < n; g++) {
          if (g < l || g > c) continue;

          var _e22 = (g + 1) % r == 0 ? 2 : 0,
              _i10 = this.hatchMark.spacing * g + this.hatchMark.spacing / 2 - t,
              _n12 = this.scrollbar.height + this._timelineHeight - this.hatchMark.height - _e22,
              _a2 = 1,
              _o = this.scrollbar.height + this._timelineHeight - _n12;

          if (this.createRect(_i10 - _a2 / 2, _n12, _a2, _o, "rgba(255, 255, 255, 0.25)"), _e22) {
            _i10 >= d - 5 && _i10 <= d + 5 || this.text(g + 1, _i10, _n12 - 1, "rgba(255, 255, 255, 0.25)");
          }
        }

        this.context.beginPath(), this.context.moveTo(d - 5, this.scrollbar.height), this.context.lineTo(d + 5, this.scrollbar.height), this.context.lineTo(d + 5, this.scrollbar.height + u - 5), this.context.lineTo(d, this.scrollbar.height + u), this.context.lineTo(d - 5, this.scrollbar.height + u - 5), this.context.closePath(), this.context.fillStyle = o.accent, this.context.fill(), this.text(f, d + 10, u / 2 + 8 + this.scrollbar.height, o.accent, "left");
        var m = this.markToX(this.playbackHandle.start.mark, !0);
        m = this.playbackHandle.start.isDragging ? this.playbackHandle.start._x : m, this.createRect(m - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, o.accent), this.createRect(0, this.scrollbar.height, m, this._timelineHeight, "rgba(0, 0, 0, 0.15)");
        var y = this.markToX(this.playbackHandle.end.mark, !0);
        y = this.playbackHandle.end.isDragging ? this.playbackHandle.end._x : y, this.createRect(y - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, o.accent), this.createRect(y, this.scrollbar.height, this.canvas.width - y, this._timelineHeight, "rgba(0, 0, 0, 0.15)"), this.context.restore();
        var v = Object.keys(h.keyframes);

        for (var _i11 = 0, _v = v; _i11 < _v.length; _i11++) {
          var _e23 = _v[_i11];
          var _t10 = h.keyframes[_e23];
          _t10.render.position.y = this.scrollbar.height + this._timelineHeight + _t10.render.size + 5;

          var _i12 = this.markToX(_t10.index, !0);

          _t10.render.position.x = _t10.dragged ? a.x - this.bounds.x : _i12, "head" == _t10.type && this.createKeyframe(_t10.render.position.x, _t10.render.position.y, _t10.render.size, _t10.render.color);
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
        this.state.currentMark = e, p.setCurrentFrame(this.state.currentMark), this.updateState(t), this.redraw(), r.emit("timelineSeeked");
      }
    }, {
      key: "play",
      value: function play() {
        var _this7 = this;

        this.loop = setInterval(function () {
          _this7.state.currentMark < _this7.playbackHandle.start.mark && _this7.setCurrentMark(_this7.playbackHandle.start.mark - 1);
          var e = _this7.state.currentMark < _this7.playbackHandle.end.mark ? _this7.state.currentMark + 1 : _this7.playbackHandle.start.mark;

          _this7.setCurrentMark(e);
        }, 1e3 / p.animationSpeed), this.state.isPlaying = !0, this.buttons.play.firstChild.src = "assets/svg/round-square.svg", document.getElementById("propertyApp").classList.add("disabled");
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
        var e = p.$el.offsetHeight,
            t = document.querySelector("#timelineApp div.row-b");
        p.$el.style.transform = "translateY(".concat(e - t.offsetTop - 2, "px)"), this.buttons.minimize.style.transform = "translateY(-40px) rotate(0deg)", this.state.isMinimized = !0;
      }
    }, {
      key: "maximize",
      value: function maximize() {
        p.$el.offsetHeight;
        p.$el.style.transform = "translateY(0px)", this.buttons.minimize.style.transform = "translateY(-40px) rotate(180deg)", this.state.isMinimized = !1;
      }
    }]);

    return _class3;
  }())(), s.loadJSONData(o.autosave.label + ".frames.config", function (e) {
    var t = document.getElementById("frameCount"),
        i = document.getElementById("animationSpeed");
    "number" == typeof e.frameCount && (t.value = e.frameCount), "number" == typeof e.animationSpeed && (i.value = e.animationSpeed), p.fixData();
  }), s.loadJSONData(o.autosave.label + ".playback.config", function (e) {
    "number" == typeof e.start && (u.playbackHandle.start.mark = e.start), "number" == typeof e.end && (u.playbackHandle.end.mark = e.end), u.redraw();
  }), e.exports = {
    app: p,
    graph: u
  };
}, function (e, t) {
  var i;

  i = function () {
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
        return e = "number" != typeof e ? 1 : e, this.x = i(-e, e), this.y = i(-e, e), this.setMag(e), this;
      }
    }]);

    return n;
  }();

  e.exports = function (e, t) {
    return new n(e, t);
  };
}, function (e, t) {
  var i = ["running", "walking", "dancing", "shivering", "jumping", "sleeping", "sitting", "flying", "cheering", "yielding", "punching", "kicking", "crawling", "painting", "smoking", "crouching", "driving", "sliding", "breathing", "hunting", "dying", "moving", "aroused", "tickled", "thrilled", "backflipping", "frontflipping", "falling"],
      n = ["abandoned", "able", "absolute", "adorable", "adventurous", "academic", "acceptable", "acclaimed", "accomplished", "accurate", "aching", "acidic", "acrobatic", "active", "actual", "adept", "admirable", "admired", "adolescent", "adorable", "adored", "advanced", "afraid", "affectionate", "aged", "aggravating", "aggressive", "agile", "agitated", "agonizing", "agreeable", "ajar", "alarmed", "alarming", "alert", "alienated", "alive", "all", "altruistic", "amazing", "ambitious", "ample", "amused", "amusing", "anchored", "ancient", "angelic", "angry", "anguished", "animated", "annual", "another", "antique", "anxious", "any", "apprehensive", "appropriate", "apt", "arctic", "arid", "aromatic", "artistic", "ashamed", "assured", "astonishing", "athletic", "attached", "attentive", "attractive", "austere", "authentic", "authorized", "automatic", "avaricious", "average", "aware", "awesome", "awful", "awkward", "babyish", "bad", "back", "baggy", "bare", "barren", "basic", "beautiful", "belated", "beloved", "beneficial", "better", "best", "bewitched", "big", "big-hearted", "biodegradable", "bite-sized", "bitter", "black", "black-and-white", "bland", "blank", "blaring", "bleak", "blind", "blissful", "blond", "blue", "blushing", "bogus", "boiling", "bold", "bony", "boring", "bossy", "both", "bouncy", "bountiful", "bowed", "brave", "breakable", "brief", "bright", "brilliant", "brisk", "broken", "bronze", "brown", "bruised", "bubbly", "bulky", "bumpy", "buoyant", "burdensome", "burly", "bustling", "busy", "buttery", "buzzing", "calculating", "calm", "candid", "canine", "capital", "carefree", "careful", "careless", "caring", "cautious", "cavernous", "celebrated", "charming", "cheap", "cheerful", "cheery", "chief", "chilly", "chubby", "circular", "classic", "clean", "clear", "clear-cut", "clever", "close", "closed", "cloudy", "clueless", "clumsy", "cluttered", "coarse", "cold", "colorful", "colorless", "colossal", "comfortable", "common", "compassionate", "competent", "complete", "complex", "complicated", "composed", "concerned", "concrete", "confused", "conscious", "considerate", "constant", "content", "conventional", "cooked", "cool", "cooperative", "coordinated", "corny", "corrupt", "costly", "courageous", "courteous", "crafty", "crazy", "creamy", "creative", "creepy", "criminal", "crisp", "critical", "crooked", "crowded", "cruel", "crushing", "cuddly", "cultivated", "cultured", "cumbersome", "curly", "curvy", "cute", "cylindrical", "damaged", "damp", "dangerous", "dapper", "daring", "darling", "dark", "dazzling", "dead", "deadly", "deafening", "dear", "dearest", "decent", "decimal", "decisive", "deep", "defenseless", "defensive", "defiant", "deficient", "definite", "definitive", "delayed", "delectable", "delicious", "delightful", "delirious", "demanding", "dense", "dental", "dependable", "dependent", "descriptive", "deserted", "detailed", "determined", "devoted", "different", "difficult", "digital", "diligent", "dim", "dimpled", "dimwitted", "direct", "disastrous", "discrete", "disfigured", "disgusting", "disloyal", "dismal", "distant", "downright", "dreary", "dirty", "disguised", "dishonest", "dismal", "distant", "distinct", "distorted", "dizzy", "dopey", "doting", "double", "downright", "drab", "drafty", "dramatic", "dreary", "droopy", "dry", "dual", "dull", "dutiful", "each", "eager", "earnest", "early", "easy", "easy-going", "ecstatic", "edible", "educated", "elaborate", "elastic", "elated", "elderly", "electric", "elegant", "elementary", "elliptical", "embarrassed", "embellished", "eminent", "emotional", "empty", "enchanted", "enchanting", "energetic", "enlightened", "enormous", "enraged", "entire", "envious", "equal", "equatorial", "essential", "esteemed", "ethical", "euphoric", "even", "evergreen", "everlasting", "every", "evil", "exalted", "excellent", "exemplary", "exhausted", "excitable", "excited", "exciting", "exotic", "expensive", "experienced", "expert", "extraneous", "extroverted", "extra-large", "extra-small", "fabulous", "failing", "faint", "fair", "faithful", "fake", "false", "familiar", "famous", "fancy", "fantastic", "far", "faraway", "far-flung", "far-off", "fast", "fat", "fatal", "fatherly", "favorable", "favorite", "fearful", "fearless", "feisty", "feline", "female", "feminine", "few", "fickle", "filthy", "fine", "finished", "firm", "first", "firsthand", "fitting", "fixed", "flaky", "flamboyant", "flashy", "flat", "flawed", "flawless", "flickering", "flimsy", "flippant", "flowery", "fluffy", "fluid", "flustered", "focused", "fond", "foolhardy", "foolish", "forceful", "forked", "formal", "forsaken", "forthright", "fortunate", "fragrant", "frail", "frank", "frayed", "free", "French", "fresh", "frequent", "friendly", "frightened", "frightening", "frigid", "frilly", "frizzy", "frivolous", "front", "frosty", "frozen", "frugal", "fruitful", "full", "fumbling", "functional", "funny", "fussy", "fuzzy", "gargantuan", "gaseous", "general", "generous", "gentle", "genuine", "giant", "giddy", "gigantic", "gifted", "giving", "glamorous", "glaring", "glass", "gleaming", "gleeful", "glistening", "glittering", "gloomy", "glorious", "glossy", "glum", "golden", "good", "good-natured", "gorgeous", "graceful", "gracious", "grand", "grandiose", "granular", "grateful", "grave", "gray", "great", "greedy", "green", "gregarious", "grim", "grimy", "gripping", "grizzled", "gross", "grotesque", "grouchy", "grounded", "growing", "growling", "grown", "grubby", "gruesome", "grumpy", "guilty", "gullible", "gummy", "hairy", "half", "handmade", "handsome", "handy", "happy", "happy-go-lucky", "hard", "hard-to-find", "harmful", "harmless", "harmonious", "harsh", "hasty", "hateful", "haunting", "healthy", "heartfelt", "hearty", "heavenly", "heavy", "hefty", "helpful", "helpless", "hidden", "hideous", "high", "high-level", "hilarious", "hoarse", "hollow", "homely", "honest", "honorable", "honored", "hopeful", "horrible", "hospitable", "hot", "huge", "humble", "humiliating", "humming", "humongous", "hungry", "hurtful", "husky", "icky", "icy", "ideal", "idealistic", "identical", "idle", "idiotic", "idolized", "ignorant", "ill", "illegal", "ill-fated", "ill-informed", "illiterate", "illustrious", "imaginary", "imaginative", "immaculate", "immaterial", "immediate", "immense", "impassioned", "impeccable", "impartial", "imperfect", "imperturbable", "impish", "impolite", "important", "impossible", "impractical", "impressionable", "impressive", "improbable", "impure", "inborn", "incomparable", "incompatible", "incomplete", "inconsequential", "incredible", "indelible", "inexperienced", "indolent", "infamous", "infantile", "infatuated", "inferior", "infinite", "informal", "innocent", "insecure", "insidious", "insignificant", "insistent", "instructive", "insubstantial", "intelligent", "intent", "intentional", "interesting", "internal", "international", "intrepid", "ironclad", "irresponsible", "irritating", "itchy", "jaded", "jagged", "jam-packed", "jaunty", "jealous", "jittery", "joint", "jolly", "jovial", "joyful", "joyous", "jubilant", "judicious", "juicy", "jumbo", "junior", "jumpy", "juvenile", "kaleidoscopic", "keen", "key", "kind", "kindhearted", "kindly", "klutzy", "knobby", "knotty", "knowledgeable", "knowing", "known", "kooky", "kosher", "lame", "lanky", "large", "last", "lasting", "late", "lavish", "lawful", "lazy", "leading", "lean", "leafy", "left", "legal", "legitimate", "light", "lighthearted", "likable", "likely", "limited", "limp", "limping", "linear", "lined", "liquid", "little", "live", "lively", "livid", "loathsome", "lone", "lonely", "long", "long-term", "loose", "lopsided", "lost", "loud", "lovable", "lovely", "loving", "low", "loyal", "lucky", "lumbering", "luminous", "lumpy", "lustrous", "luxurious", "mad", "made-up", "magnificent", "majestic", "major", "male", "mammoth", "married", "marvelous", "masculine", "massive", "mature", "meager", "mealy", "mean", "measly", "meaty", "medical", "mediocre", "medium", "meek", "mellow", "melodic", "memorable", "menacing", "merry", "messy", "metallic", "mild", "milky", "mindless", "miniature", "minor", "minty", "miserable", "miserly", "misguided", "misty", "mixed", "modern", "modest", "moist", "monstrous", "monthly", "monumental", "moral", "mortified", "motherly", "motionless", "mountainous", "muddy", "muffled", "multicolored", "mundane", "murky", "mushy", "musty", "muted", "mysterious", "naive", "narrow", "nasty", "natural", "naughty", "nautical", "near", "neat", "necessary", "needy", "negative", "neglected", "negligible", "neighboring", "nervous", "new", "next", "nice", "nifty", "nimble", "nippy", "nocturnal", "noisy", "nonstop", "normal", "notable", "noted", "noteworthy", "novel", "noxious", "numb", "nutritious", "nutty", "obedient", "obese", "oblong", "oily", "oblong", "obvious", "occasional", "odd", "oddball", "offbeat", "offensive", "official", "old", "old-fashioned", "only", "open", "optimal", "optimistic", "opulent", "orange", "orderly", "organic", "ornate", "ornery", "ordinary", "original", "other", "our", "outlying", "outgoing", "outlandish", "outrageous", "outstanding", "oval", "overcooked", "overdue", "overjoyed", "overlooked", "palatable", "pale", "paltry", "parallel", "parched", "partial", "passionate", "past", "pastel", "peaceful", "peppery", "perfect", "perfumed", "periodic", "perky", "personal", "pertinent", "pesky", "pessimistic", "petty", "phony", "physical", "piercing", "pink", "pitiful", "plain", "plaintive", "plastic", "playful", "pleasant", "pleased", "pleasing", "plump", "plush", "polished", "polite", "political", "pointed", "pointless", "poised", "poor", "popular", "portly", "posh", "positive", "possible", "potable", "powerful", "powerless", "practical", "precious", "present", "prestigious", "pretty", "precious", "previous", "pricey", "prickly", "primary", "prime", "pristine", "private", "prize", "probable", "productive", "profitable", "profuse", "proper", "proud", "prudent", "punctual", "pungent", "puny", "pure", "purple", "pushy", "putrid", "puzzled", "puzzling", "quaint", "qualified", "quarrelsome", "quarterly", "queasy", "querulous", "questionable", "quick", "quick-witted", "quiet", "quintessential", "quirky", "quixotic", "quizzical", "radiant", "ragged", "rapid", "rare", "rash", "raw", "recent", "reckless", "rectangular", "ready", "real", "realistic", "reasonable", "red", "reflecting", "regal", "regular", "reliable", "relieved", "remarkable", "remorseful", "remote", "repentant", "required", "respectful", "responsible", "repulsive", "revolving", "rewarding", "rich", "rigid", "right", "ringed", "ripe", "roasted", "robust", "rosy", "rotating", "rotten", "rough", "round", "rowdy", "royal", "rubbery", "rundown", "ruddy", "rude", "runny", "rural", "rusty", "sad", "safe", "salty", "same", "sandy", "sane", "sarcastic", "sardonic", "satisfied", "scaly", "scarce", "scared", "scary", "scented", "scholarly", "scientific", "scornful", "scratchy", "scrawny", "second", "secondary", "second-hand", "secret", "self-assured", "self-reliant", "selfish", "sentimental", "separate", "serene", "serious", "serpentine", "several", "severe", "shabby", "shadowy", "shady", "shallow", "shameful", "shameless", "sharp", "shimmering", "shiny", "shocked", "shocking", "shoddy", "short", "short-term", "showy", "shrill", "shy", "sick", "silent", "silky", "silly", "silver", "similar", "simple", "simplistic", "sinful", "single", "sizzling", "skeletal", "skinny", "sleepy", "slight", "slim", "slimy", "slippery", "slow", "slushy", "small", "smart", "smoggy", "smooth", "smug", "snappy", "snarling", "sneaky", "sniveling", "snoopy", "sociable", "soft", "soggy", "solid", "somber", "some", "spherical", "sophisticated", "sore", "sorrowful", "soulful", "soupy", "sour", "Spanish", "sparkling", "sparse", "specific", "spectacular", "speedy", "spicy", "spiffy", "spirited", "spiteful", "splendid", "spotless", "spotted", "spry", "square", "squeaky", "squiggly", "stable", "staid", "stained", "stale", "standard", "starchy", "stark", "starry", "steep", "sticky", "stiff", "stimulating", "stingy", "stormy", "straight", "strange", "steel", "strict", "strident", "striking", "striped", "strong", "studious", "stunning", "stupendous", "stupid", "sturdy", "stylish", "subdued", "submissive", "substantial", "subtle", "suburban", "sudden", "sugary", "sunny", "super", "superb", "superficial", "superior", "supportive", "sure-footed", "surprised", "suspicious", "svelte", "sweaty", "sweet", "sweltering", "swift", "sympathetic", "tall", "talkative", "tame", "tan", "tangible", "tart", "tasty", "tattered", "taut", "tedious", "teeming", "tempting", "tender", "tense", "tepid", "terrible", "terrific", "testy", "thankful", "that", "these", "thick", "thin", "third", "thirsty", "this", "thorough", "thorny", "those", "thoughtful", "threadbare", "thrifty", "thunderous", "tidy", "tight", "timely", "tinted", "tiny", "tired", "torn", "total", "tough", "traumatic", "treasured", "tremendous", "tragic", "trained", "tremendous", "triangular", "tricky", "trifling", "trim", "trivial", "troubled", "true", "trusting", "trustworthy", "trusty", "truthful", "tubby", "turbulent", "twin", "ugly", "ultimate", "unacceptable", "unaware", "uncomfortable", "uncommon", "unconscious", "understated", "unequaled", "uneven", "unfinished", "unfit", "unfolded", "unfortunate", "unhappy", "unhealthy", "uniform", "unimportant", "unique", "united", "unkempt", "unknown", "unlawful", "unlined", "unlucky", "unnatural", "unpleasant", "unrealistic", "unripe", "unruly", "unselfish", "unsightly", "unsteady", "unsung", "untidy", "untimely", "untried", "untrue", "unused", "unusual", "unwelcome", "unwieldy", "unwilling", "unwitting", "unwritten", "upbeat", "upright", "upset", "urban", "usable", "used", "useful", "useless", "utilized", "utter", "vacant", "vague", "vain", "valid", "valuable", "vapid", "variable", "vast", "velvety", "venerated", "vengeful", "verifiable", "vibrant", "vicious", "victorious", "vigilant", "vigorous", "villainous", "violet", "violent", "virtual", "virtuous", "visible", "vital", "vivacious", "vivid", "voluminous", "wan", "warlike", "warm", "warmhearted", "warped", "wary", "wasteful", "watchful", "waterlogged", "watery", "wavy", "wealthy", "weak", "weary", "webbed", "wee", "weekly", "weepy", "weighty", "weird", "welcome", "well-documented", "well-groomed", "well-informed", "well-lit", "well-made", "well-off", "well-to-do", "well-worn", "wet", "which", "whimsical", "whirlwind", "whispered", "white", "whole", "whopping", "wicked", "wide", "wide-eyed", "wiggly", "wild", "willing", "wilted", "winding", "windy", "winged", "wiry", "wise", "witty", "wobbly", "woeful", "wonderful", "wooden", "woozy", "wordy", "worldly", "worn", "worried", "worrisome", "worse", "worst", "worthless", "worthwhile", "worthy", "wrathful", "wretched", "writhing", "wrong", "wry", "yawning", "yearly", "yellow", "yellowish", "young", "youthful", "yummy", "zany", "zealous", "zesty", "zigzag", "rocky"],
      r = ["person", "dog", "cat", "elephant", "bird", "velociraptor", "t-rex", "worm", "fly", "mosquito", "bear", "fish", "fox", "horse", "tiger", "lion", "frog", "monkey", "people", "meat", "food", "player", "soup", "woman", "hair", "police", "lady", "pizza", "plant", "doctor", "god", "nurse", "cow"],
      a = ["Eren Yaeger", "Mikasa", "Levi Ackerman", "Nezuko", "Tanjiro", "Muzan", "Kazuto", "Kurisu", "Hachiman", "Itachi", "Naruto", "Roronoa", "Light Yagami"],
      o = ["Spider-Man", "Iron Man", "Hulk", "Thanos", "Wolverine", "Loki", "Batman", "Superman", "Aquaman", "Joker", "Lex Luthor", "Cyborg"],
      s = ["Obama", "Trump", "Abraham Lincoln", "Madonna", "Drawne Johnson", "Leonardo DiCaprio", "Will Smith", "Tom Hanks", "Tom Cruise", "Brad Pitt", "Johnny Depp", "Matt Damon", "Chris Hemsworth", "Hugh Jackman"];
  e.exports = {
    generate: function generate() {
      var e = i.concat(n),
          t = e[Math.floor(Math.random() * e.length)],
          l = r.concat(a, o, s),
          h = l[Math.floor(Math.random() * l.length)];
      return t.charAt(0).toUpperCase() + t.slice(1) + " " + h;
    }
  };
}, function (e, t, i) {
  var n = i(1),
      r = (i(4), i(7)),
      a = i(3),
      o = i(0),
      s = i(10);
  var l,
      h = document.getElementById("showSkeleton");
  var c = new ( /*#__PURE__*/function () {
    function _class4() {
      _classCallCheck(this, _class4);

      this.joints = [], this.keyframes = {}, this.totalKeyframes = 0, this.mouseBuffer = 10, this.activeJoint = null, this.bounds = {
        min: r(),
        max: r()
      }, this._moved = !1;
    }

    _createClass(_class4, [{
      key: "updateBounds",
      value: function updateBounds() {
        var e = Object.keys(this.keyframes),
            t = [],
            i = [];

        for (var n = 0; n < e.length; n++) {
          var _s = this.keyframes[e[n]];

          for (var r = 0; r < _s.joints.length; r++) {
            var _e24 = _s.joints[r];
            if (t.push(_e24.position.x + a.render.joint.radius), i.push(_e24.position.y + a.render.joint.radius), t.push(_e24.position.x - a.render.joint.radius), i.push(_e24.position.y - a.render.joint.radius), _e24.skin.vertices) for (var o = 0; o < _e24.skin.vertices.length; o++) {
              t.push(_e24.skin.vertices[o].x), i.push(_e24.skin.vertices[o].y);
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
        this.keyframes = {}, this.joints = [], this.totalKeyframes = 0, this.activeJoint = null, l.graph && (this.setKeyframe(0, {
          position: {
            x: l.graph.hatchMark.spacing / 2,
            y: 0
          },
          locked: !0,
          ignoreHistory: !0
        }), l.graph.setCurrentMark(0), l.graph.updateState()), this.updateBounds(), s.add({
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
      value: function getKeyframe(e, t) {
        var i = Object.values(this.keyframes).find(function (i) {
          return i[e] === t;
        });
        return i ? this.keyframes[i.index] : null;
      }
    }, {
      key: "editJoints",
      value: function editJoints(e) {
        var t = Object.values(this.keyframes);

        for (var i = 0; i < t.length; i++) {
          var _r6 = t[i];

          for (var n = 0; n < _r6.joints.length; n++) {
            var _t11 = _r6.joints[n];
            "function" == typeof e && e(_t11, _r6);
          }
        }
      }
    }, {
      key: "editJoint",
      value: function editJoint(e, t, i) {
        var n = Object.values(this.keyframes);

        for (var r = 0; r < n.length; r++) {
          var _o2 = n[r].joints.find(function (t) {
            return t.id === e;
          });

          if (t = i ? JSON.parse(JSON.stringify(t)) : t, _o2) {
            var _e25 = Object.keys(t);

            for (var a = 0; a < _e25.length; a++) {
              _o2[_e25[a]] = t[_e25[a]];
            }
          }
        }
      }
    }, {
      key: "addSubKeyframes",
      value: function addSubKeyframes(e, t) {
        if (l.graph) {
          var _n13 = Object.keys(this.keyframes);

          for (var i = 0; i < _n13.length; i++) {
            if ("sub" == this.keyframes[_n13[i]].type) {
              _n13.splice(i, 1);

              break;
            }
          }

          this.clone();

          if (_n13.length > 1) {
            l.graph.updateState();

            for (i = t - 1; i >= e + 1; i--) {
              var _e26 = this.clone(),
                  _n14 = _e26[t].joints,
                  _a3 = {
                id: o.uid(),
                type: "sub",
                index: i,
                activeJointId: _e26.activeJointId,
                joints: _n14,
                render: {
                  size: 12,
                  color: "red",
                  position: r(i * l.graph.hatchMark.spacing + l.graph.hatchMark.spacing / 2, 0)
                }
              };

              this.keyframes[i] = _a3;
            }
          }
        }

        this.updateSubKeyframes(), l.graph.updateState(), l.graph.redraw();
      }
    }, {
      key: "updateSubKeyframes",
      value: function updateSubKeyframes() {
        var e = Object.keys(this.keyframes);

        for (var t = e.length - 1; t >= 0; t--) {
          var _r7 = this.keyframes[e[t]];
          if (!_r7) continue;
          if ("head" == _r7.type) continue;
          var _s2 = null;

          for (var i = _r7.index; i >= 0; i--) {
            var _e27 = this.keyframes[i];

            if (_e27 && "head" == _e27.type) {
              _s2 = _e27.index;
              break;
            }
          }

          var _h = null;

          for (i = _r7.index; i < l.app.totalFrames; i++) {
            var _e28 = this.keyframes[i];

            if (_e28 && "head" == _e28.type) {
              _h = _e28.index;
              break;
            }
          }

          var _c = o.map(_r7.index, _h, _s2, 0, 1),
              d = this.keyframes[_h],
              u = this.keyframes[_s2];

          var _loop = function _loop() {
            var e = _r7.joints[i];

            if (e && d && u) {
              var _t12 = d.joints.find(function (t) {
                return t.id === e.id;
              }),
                  _i13 = u.joints.find(function (t) {
                return t.id === e.id;
              });

              if (_t12 && _i13) {
                var _r8 = _t12.position.copy().lerp(_i13.position, _c),
                    _s3 = o.lerp(_t12.length, _i13.length, _c);

                e.length = _s3, e.position.set(_r8), a.animateSkin && _i13.skin && _t12.skin && _i13.skin.offset && _t12.skin.offset && (e.skin.offset = {
                  x: o.lerp(_t12.skin.offset.x, _i13.skin.offset.x, _c),
                  y: o.lerp(_t12.skin.offset.y, _i13.skin.offset.y, _c),
                  scaleX: o.lerp(_t12.skin.offset.scaleX, _i13.skin.offset.scaleX, _c),
                  scaleY: o.lerp(_t12.skin.offset.scaleY, _i13.skin.offset.scaleY, _c),
                  angle: o.lerp(_t12.skin.offset.angle, _i13.skin.offset.angle, _c)
                });

                for (n = 0; n < e.children.length; n++) {
                  var _t13 = e.children[n];
                  _t13.angle = _t13.position.heading(e.position);
                }
              }

              e.id == u.activeJointId && (_r7.activeJointId = e.id);
            }
          };

          for (i = 0; i < _r7.joints.length; i++) {
            var n;

            _loop();
          }

          "linear" != a.riggingMode && ("forwardKinematics" == a.riggingMode ? this.computeKinematics(_r7.joints) : "inverseKinematics" == a.riggingMode && this.computeKinematics(_r7.joints, !0)), this.updateSkin(_r7.joints);
        }
      }
    }, {
      key: "setKeyframe",
      value: function setKeyframe(e, t) {
        if ("number" != typeof e) return;
        var i = {
          type: "head",
          index: (t = t || {}).keyframe ? t.keyframe.index : e,
          activeJointId: t.keyframe ? t.keyframe.activeJointId : this.activeJoint ? this.activeJoint.id : null,
          joints: t.joints,
          render: {
            size: a.render.keyframe.size,
            color: a.render.keyframe.color["default"],
            position: t.position || r(e * l.graph.hatchMark.spacing + l.graph.hatchMark.spacing / 2, 0)
          },
          locked: t.locked || !1
        };

        if (l.graph) {
          var _e29 = this.clone()[l.graph.state.currentFrame],
              _n15 = _e29 ? _e29.joints : [];

          t.joints && (_n15 = t.joints), i.joints = _n15;
        }

        if (i.id = t.id || o.uid(), this.keyframes[e] = i, l.graph) {
          l.graph.updateState();
          var _e30 = l.graph.state.currentFrame,
              _t14 = l.graph.state.previousFrame;
          this.addSubKeyframes(_t14, _e30), l.graph.redraw();
        }

        if (!t.ignoreHistory) {
          var _e31 = Object.values(this.keyframes),
              _t15 = 0;

          for (var n = 0; n < _e31.length; n++) {
            "head" == _e31[n].type && _t15++;
          }

          var _r9 = "Add keyframe";
          return _t15 == this.totalKeyframes && (_r9 = "Move keyframe"), this.updateBounds(), s.add({
            label: _r9,
            value: this.clone(),
            group: "keyframe"
          }), this.totalKeyframes = _t15, i;
        }
      }
    }, {
      key: "deleteKeyframe",
      value: function deleteKeyframe(e) {
        var t = this.getKeyframe("id", e);
        if (!t) return;
        if (Object.keys(this.keyframes).length <= 1) return;
        var i,
            n,
            r = [];

        for (var a = t.index - 1; a >= 0; a--) {
          var _e32 = this.keyframes[a];

          if (_e32 && ("sub" == _e32.type && r.push(_e32), "head" == _e32.type)) {
            i = _e32;
            break;
          }
        }

        for (a = t.index + 1; a < l.app.totalFrames; a++) {
          var _e33 = this.keyframes[a];

          if (_e33 && ("sub" == _e33.type && r.push(_e33), "head" == _e33.type)) {
            n = _e33;
            break;
          }
        }

        for (a = 0; a < r.length; a++) {
          var _e34 = this.getKeyframe("id", r[a].id);

          delete this.keyframes[_e34.index];
        }

        delete this.keyframes[t.index], n && i && this.addSubKeyframes(i.index, n.index), l.graph && (l.graph.updateState(), l.graph.redraw()), this.updateBounds();
      }
    }, {
      key: "updateKeyframe",
      value: function updateKeyframe(e, t) {
        var i = Object.keys(t);

        for (var n = 0; n < i.length; n++) {
          this.keyframes[e][i[n]] = t[i[n]];
        }

        this.updateSubKeyframes();
      }
    }, {
      key: "addJoint",
      value: function addJoint(e, t, i) {
        i = i || {}, l.graph && l.graph.setCurrentMark(l.graph.state.currentFrame, !1);
        var a = i.parent || this.activeJoint,
            h = {
          id: "J" + o.uid(),
          name: "Joint " + (this.joints.length + 1),
          position: r(e, t),
          positionPrev: r(e, t),
          angle: a ? r(e, t).heading(a.position) : 0,
          parent: a || null,
          children: [],
          length: a ? a.position.dist(e, t) : 0,
          hierarchy: a ? a.hierarchy + 1 : 1,
          skin: {
            offset: {
              x: 0,
              y: 0,
              scaleX: 1,
              scaleY: 1,
              angle: 0
            }
          },
          zIndex: this.joints.length + 1
        };
        return a && a.children.push(h), i.ignoreDefaults || (this.activeJoint = h), this.joints.push(h), l.graph && this.updateKeyframe(l.graph.state.currentFrame, {
          activeJointId: this.activeJoint.id
        }), this.updateBounds(), i.ignoreHistory || s.add({
          label: "Add joint",
          value: this.clone(),
          group: "keyframe"
        }), n.emit("jointChange", this.joints), h;
      }
    }, {
      key: "selectJoint",
      value: function selectJoint(e, t) {
        if (!this.joints.length) return;
        var i = this.joints.slice();
        i.sort(function (i, n) {
          return i.position.dist(e, t) - n.position.dist(e, t);
        }), this.activeJoint = this.joints.find(function (e) {
          return e.id === i[0].id;
        }), n.emit("jointChange", this.joints), l.graph && this.updateKeyframe(l.graph.state.currentFrame, {
          activeJointId: this.activeJoint.id
        });
      }
    }, {
      key: "removeJointById",
      value: function removeJointById(e) {
        var t = Object.keys(this.keyframes);

        for (var i = 0; i < t.length; i++) {
          var _n16 = this.keyframes[t[i]],
              _a4 = _n16.joints.find(function (t) {
            return t.id === e;
          });

          if (_a4) {
            var _a4$parent$children;

            for (var r = 0; r < _a4.children.length; r++) {
              var _e35 = _a4.children[r];
              _e35.parent = _a4.parent, _e35.length += _a4.length, this.activeJoint = _e35;
            }

            _a4.parent ? (_a4.parent.children.splice(_a4.parent.children.indexOf(_a4), 1), (_a4$parent$children = _a4.parent.children).push.apply(_a4$parent$children, _toConsumableArray(_a4.children)), this.activeJoint = _a4.parent) : this.activeJoint = _a4.children[0], _n16.joints.splice(_n16.joints.indexOf(_a4), 1);
          }
        }

        this.activeJoint && this.moveJoint(this.activeJoint.position.x, this.activeJoint.position.y), this.updateBounds(), s.add({
          label: "Remove joint",
          value: this.clone(),
          group: "keyframe"
        }), n.emit("jointChange", this.joints);
      }
    }, {
      key: "removeJointByPosition",
      value: function removeJointByPosition(e, t) {
        if (this.joints.length) for (var i = 0; i < this.joints.length; i++) {
          var _n17 = this.joints[i];
          _n17.position.dist(e, t) < a.render.joint.radius + this.mouseBuffer && this.removeJointById(_n17.id);
        }
      }
    }, {
      key: "computeKinematics",
      value: function computeKinematics(e, t) {
        if (t) for (i = e.length - 1; i >= 0; i--) {
          var _t16 = e[i];
          _t16.parent && (_t16.parent.angle = _t16.position.heading(_t16.parent.position), _t16.parent.position.set({
            x: _t16.position.x + Math.cos(_t16.parent.angle) * _t16.length,
            y: _t16.position.y + Math.sin(_t16.parent.angle) * _t16.length
          }));
        } else for (var i = 0; i < e.length; i++) {
          var _t17 = e[i];

          for (var n = 0; n < _t17.children.length; n++) {
            var _e36 = _t17.children[n];
            _e36.angle = _e36.position.heading(_t17.position), _e36.position.set({
              x: _t17.position.x - Math.cos(_e36.angle) * _e36.length,
              y: _t17.position.y - Math.sin(_e36.angle) * _e36.length
            });
          }
        }
      }
    }, {
      key: "updateSkin",
      value: function updateSkin(e) {
        e = e || this.joints;

        for (var t = 0; t < e.length; t++) {
          var _i14 = e[t],
              _n18 = _i14.length,
              _r10 = _i14.length,
              _a5 = 0,
              _s4 = _i14.skin.crop,
              _l = 0,
              _h2 = 0;
          _s4 && (_l = _s4.to.x - _s4.from.x, _h2 = _s4.to.y - _s4.from.y), _l > _h2 ? _r10 = Number.MAX_SAFE_INTEGER : (_n18 = Number.MAX_SAFE_INTEGER, _a5 = Math.PI / 2), _i14.skin.size = o.scaleSize(_l, _h2, _n18, _r10), _i14.skin._sizeOriginal = {
            width: _l,
            height: _h2
          }, _i14.skin.angleAuto = _a5;
          var _c2 = 0,
              d = 0,
              u = 1,
              p = 1,
              f = 0;

          if (_i14.skin.offset && (_c2 = _i14.skin.offset.x || 0, d = _i14.skin.offset.y || 0, u = _i14.skin.offset.scaleX || 0, p = _i14.skin.offset.scaleY || 0, f = _i14.skin.offset.angle || 0), _i14.parent && _s4) {
            _i14.skin.position = {
              x: (_i14.position.x + _i14.parent.position.x) / 2,
              y: (_i14.position.y + _i14.parent.position.y) / 2
            };
            var _e37 = [{
              x: _i14.skin.position.x + _c2 - _i14.skin.size.width / 2,
              y: _i14.skin.position.y + d - _i14.skin.size.height / 2
            }, {
              x: _i14.skin.position.x + _c2 + _i14.skin.size.width / 2,
              y: _i14.skin.position.y + d - _i14.skin.size.height / 2
            }, {
              x: _i14.skin.position.x + _c2 + _i14.skin.size.width / 2,
              y: _i14.skin.position.y + d + _i14.skin.size.height / 2
            }, {
              x: _i14.skin.position.x + _c2 - _i14.skin.size.width / 2,
              y: _i14.skin.position.y + d + _i14.skin.size.height / 2
            }];

            for (var _i15 = 0, _e38 = _e37; _i15 < _e38.length; _i15++) {
              var _t18 = _e38[_i15];
              var _e39 = {
                x: _t18.x - _i14.skin.position.x,
                y: _t18.y - _i14.skin.position.y
              };
              _t18.x = _t18.x + _e39.x * (u - 1), _t18.y = _t18.y + _e39.y * (p - 1);
            }

            for (var _i16 = 0, _e40 = _e37; _i16 < _e40.length; _i16++) {
              var _t19 = _e40[_i16];

              var _e41 = _i14.angle + _i14.skin.angleAuto + f,
                  _n19 = (_t19.x - _i14.skin.position.x) * Math.cos(_e41) - (_t19.y - _i14.skin.position.y) * Math.sin(_e41),
                  _r11 = (_t19.x - _i14.skin.position.x) * Math.sin(_e41) + (_t19.y - _i14.skin.position.y) * Math.cos(_e41);

              _t19.x = _n19 + _i14.skin.position.x, _t19.y = _r11 + _i14.skin.position.y;
            }

            _i14.skin.vertices = _e37;
          }
        }
      }
    }, {
      key: "moveJointById",
      value: function moveJointById(e, t, i) {
        if (this.activeJoint = this.getJoint(e), this.activeJoint) {
          if (l.graph) {
            if (a.animation.autoAddKeyframe) {
              if (!this.activeJoint.position.equals(t, i)) {
                var _e42 = l.graph.state.currentMark,
                    _t20 = this.keyframes[_e42];
                _t20 ? "head" != _t20.type && this.setKeyframe(_e42) : this.setKeyframe(_e42);
              }
            } else l.graph.setCurrentMark(l.graph.state.currentFrame, !1), l.graph.updateState();

            this.updateSubKeyframes();
          }

          if (t && i && (this.activeJoint.position.dist(this.activeJoint.positionPrev) > 1 && (this._moved = !0, this.activeJoint.positionPrev.set(this.activeJoint.position.x, this.activeJoint.position.y)), this.activeJoint.position.set(t, i), "linear" == a.riggingMode)) {
            this.activeJoint.parent && (this.activeJoint.angle = this.activeJoint.position.heading(this.activeJoint.parent.position), this.activeJoint.length = this.activeJoint.position.dist(this.activeJoint.parent.position));

            for (var n = 0; n < this.activeJoint.children.length; n++) {
              var _e43 = this.activeJoint.children[n];
              _e43.length = _e43.position.dist(this.activeJoint.position);
            }
          }

          return "linear" != a.riggingMode && ("forwardKinematics" == a.riggingMode ? this.computeKinematics(this.joints) : "inverseKinematics" == a.riggingMode && this.computeKinematics(this.joints, !0)), this.updateSkin(), this.updateBounds(), this.activeJoint;
        }
      }
    }, {
      key: "moveJoint",
      value: function moveJoint(e, t) {
        this.moveJointById(this.activeJoint.id, e, t);
      }
    }, {
      key: "getJoint",
      value: function getJoint(e) {
        return this.joints.find(function (t) {
          return t.id === e;
        }) || null;
      }
    }, {
      key: "toJSON",
      value: function toJSON(e, t) {
        var i = e || this.clone(),
            n = {},
            r = Object.keys(i);

        for (var a = 0; a < r.length; a++) {
          var _e44 = i[r[a]],
              _l2 = {
            id: _e44.id,
            activeJointId: _e44.activeJointId,
            index: _e44.index,
            joints: [],
            render: _e44.render,
            type: _e44.type,
            locked: _e44.locked
          };

          for (var o = 0; o < _e44.joints.length; o++) {
            var _i17 = _e44.joints[o],
                _n20 = {
              id: _i17.id,
              name: _i17.name,
              angle: _i17.angle,
              position: _i17.position,
              positionPrev: _i17.positionPrev,
              length: _i17.length,
              parent: _i17.parent ? _i17.parent.id : null,
              hierarchy: _i17.hierarchy,
              children: [],
              skinImageSrc: _i17.skin && !t ? _i17.skin.imageSrc : void 0,
              skinCrop: _i17.skin ? _i17.skin.crop : null,
              skinOffset: _i17.skin ? _i17.skin.offset : null,
              skinPosition: _i17.skin ? _i17.skin.position : null,
              skinAngleAuto: _i17.skin ? _i17.skin.angleAuto : void 0,
              skinSize: _i17.skin ? _i17.skin.size : null,
              _skinSizeOriginal: _i17.skin ? _i17.skin._sizeOriginal : null,
              _vueCrop: _i17.skin ? _i17.skin._vueCrop : null,
              zIndex: _i17.zIndex
            };

            for (var s = 0; s < _i17.children.length; s++) {
              var _e45 = _i17.children[s];

              _n20.children.push(_e45.id);
            }

            _l2.joints.push(_n20);
          }

          n[_l2.index] = _l2;
        }

        return n;
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(e) {
        if (!e) return;
        var t = {},
            i = Object.keys(e);

        var _loop2 = function _loop2() {
          var s = e[i[n]],
              l = (s.joints.find(function (e) {
            return e.id === s.activeJointId;
          }), []);

          for (a = 0; a < s.joints.length; a++) {
            var _e46 = s.joints[a],
                _t21 = {
              id: _e46.id,
              name: _e46.name,
              angle: _e46.angle,
              position: r(_e46.position),
              positionPrev: r(_e46.positionPrev),
              length: _e46.length,
              hierarchy: _e46.hierarchy,
              parent: _e46.parent,
              children: _e46.children.slice(),
              skin: {
                offset: _e46.skinOffset,
                crop: _e46.skinCrop,
                _vueCrop: _e46._vueCrop,
                imageSrc: _e46.skinImageSrc,
                position: _e46.skinPosition,
                angleAuto: _e46.angleAuto,
                size: _e46.skinSize,
                _sizeOriginal: _e46._skinSizeOriginal
              },
              zIndex: _e46.zIndex
            };
            l.push(_t21);
          }

          var _loop3 = function _loop3() {
            var e = l[a];
            e.parent = l.find(function (t) {
              return t.id === e.parent;
            }) || null;

            var _loop4 = function _loop4() {
              var t = e.children[o];
              e.children[o] = l.find(function (e) {
                return e.id === t;
              }) || null;
            };

            for (o = 0; o < e.children.length; o++) {
              _loop4();
            }
          };

          for (a = 0; a < l.length; a++) {
            _loop3();
          }

          var h = {
            activeJointId: s.activeJointId,
            id: s.id,
            index: s.index,
            joints: l,
            locked: s.locked,
            render: s.render,
            type: s.type
          };
          t[s.index] = h;
        };

        for (var n = 0; n < i.length; n++) {
          var a;
          var o;

          _loop2();
        }

        return t;
      }
    }, {
      key: "import",
      value: function _import(e) {
        this.keyframes = this.clone(e);
        var t = Object.values(this.keyframes),
            i = 0;

        for (var r = 0; r < t.length; r++) {
          "head" == t[r].type && i++;
        }

        if (this.totalKeyframes = i, l.graph) {
          var _e47 = this.keyframes[l.graph.state.currentMark];
          _e47 && (this.activeJoint = this.getKeyframe("id", _e47.activeJointId), this.activeJoint && this.updateKeyframe(l.graph.state.currentFrame, {
            activeJointId: this.activeJoint.id
          })), l.graph.updateState();
        }

        this.updateSkin(), this.updateBounds(), n.emit("jointChange", this.joints);
      }
    }, {
      key: "renderTo",
      value: function renderTo(e, t) {
        t = t || {};
        var i = this.keyframes[t.frame];
        if (!i) return;
        t.position = t.position || {
          x: 0,
          y: 0
        };
        var n = -this.bounds.min.x + t.position.x,
            r = -this.bounds.min.y + t.position.y;
        if (i.joints.sort(function (e, t) {
          return e.zIndex - t.zIndex;
        }), t.showSkin) for (var o = 0; o < i.joints.length; o++) {
          var _t22 = i.joints[o];

          if (_t22.parent) {
            if (_t22.skin.imageSrc) if (_t22.skin.image) {
              if (!_t22.skin.image.width) {
                var _e48 = new Image();

                _e48.src = _t22.skin.imageSrc, _t22.skin.image = _e48, this.updateSkin(), this.updateBounds();
              }
            } else {
              var _e49 = new Image();

              _e49.src = _t22.skin.imageSrc, _t22.skin.image = _e49, this.updateSkin(), this.updateBounds();
            }

            if (_t22.skin && "object" == _typeof(_t22.skin.image) && _t22.skin.image.src && _t22.skin.position) {
              if (e.save(), e.translate(_t22.skin.position.x + n, _t22.skin.position.y + r), e.rotate(_t22.angle + _t22.skin.angleAuto), _t22.skin.offset) {
                var _i18 = _t22.skin.offset.x,
                    _n21 = _t22.skin.offset.y,
                    _r12 = _t22.skin.offset.scaleX,
                    _a6 = _t22.skin.offset.scaleY,
                    _o3 = _t22.skin.offset.angle;
                e.rotate(_o3), e.translate(_i18, _n21), e.scale(_r12, _a6);
              }

              e.drawImage(_t22.skin.image, _t22.skin.crop.from.x, _t22.skin.crop.from.y, _t22.skin._sizeOriginal.width, _t22.skin._sizeOriginal.height, -_t22.skin.size.width / 2, -_t22.skin.size.height / 2, _t22.skin.size.width, _t22.skin.size.height), e.restore(), _t22.skin.vertices || (this.updateSkin(), this.updateBounds());
            }
          }
        }

        if (t.showBones) {
          for (o = 0; o < i.joints.length; o++) {
            var _t23 = i.joints[o];
            _t23.parent && (e.beginPath(), e.moveTo(_t23.position.x + n, _t23.position.y + r), e.lineTo(_t23.parent.position.x + n, _t23.parent.position.y + r), e.lineWidth = a.render.segment.width, e.lineCap = "round", e.strokeStyle = a.render.segment.color, e.stroke());
          }

          for (o = 0; o < i.joints.length; o++) {
            var _s5 = i.joints[o],
                _h3 = _s5 === this.activeJoint ? a.render.joint.color.selected : a.render.joint.color["default"];

            l.graph && (this.activeJoint && !l.graph.state.isPlaying && (this.activeJoint.children.length && (_h3 = this.activeJoint.children.includes(_s5) ? "#5bff85" : _h3), this.activeJoint.parent && (_h3 = this.activeJoint.parent === _s5 ? "#9b68e1" : _h3)), l.graph.state.isPlaying && (_h3 = a.render.joint.color["default"])), e.beginPath(), e.arc(_s5.position.x + n, _s5.position.y + r, a.render.joint.radius, 0, 2 * Math.PI), e.closePath(), e.fillStyle = t.workColor ? _h3 : a.render.joint.color["default"], e.fill();
          }
        }
      }
    }, {
      key: "render",
      value: function render(e) {
        var t = h.checked;

        if (l.graph) {
          var _i19 = l.graph.state.previousFrame,
              _n22 = l.graph.state.currentFrame,
              _r13 = l.graph.state.nextFrame,
              _a7 = l.graph.state.currentMark;
          e.save(), e.context.globalAlpha = .1, this.renderTo(e.context, {
            frame: _i19,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: t
          }), this.renderTo(e.context, {
            frame: _n22,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: t
          }), this.renderTo(e.context, {
            frame: _r13,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: t
          }), e.restore(), this.keyframes[_a7] || (_a7 = _n22), this.renderTo(e.context, {
            frame: _a7,
            position: {
              x: this.bounds.min.x,
              y: this.bounds.min.y
            },
            showBones: t,
            showSkin: !0,
            workColor: !0
          });
        }
      }
    }]);

    return _class4;
  }())();
  n.once("loadedApps", function (e) {
    l = e.timeline, c.setKeyframe(0, {
      locked: !0,
      ignoreHistory: !0
    });
  }), e.exports = c;
}, function (e, t, i) {
  var n = i(0),
      r = (i(3), i(1));
  var a = new ( /*#__PURE__*/function () {
    function _class5() {
      _classCallCheck(this, _class5);

      this.events = [], this.present = null, this.maxStates = 300, this.eventCount = 0;
    }

    _createClass(_class5, [{
      key: "add",
      value: function add(e) {
        e = e || {}, this.present && this.events.splice(0, this.events.indexOf(this.present));
        var t = {
          id: "E" + n.uid(),
          label: e.label,
          value: e.value,
          group: e.group,
          time: Date.now()
        };
        this.present = t, this.events.push(t), this.sortByLatest(), this.events.length > this.maxStates && this.events.pop(), this.eventCount++, r.emit("historyChange");
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
      value: function jump(e) {
        var t = this.events.find(function (t) {
          return t.id === e;
        });
        e && (this.present = t);
      }
    }]);

    return _class5;
  }())();
  e.exports = a;
}, function (e, t, i) {
  "use strict";

  (function (t) {
    var n = i(28),
        r = i(31);

    var a = function a(e) {
      return (e = Math.round(e)) > 0 && e <= 32 ? e : e <= 0 ? 1 : 32;
    };

    e.exports = {
      parseAsync: function parseAsync(e, i, r, o) {
        var s = arguments;
        if (t.isBuffer(e) && (e = e.toString()), s.length < 2) throw new Error("Missing Callback");
        if ("function" != typeof s[s.length - 1]) throw new TypeError("Callback is not a function");

        if (o = s[s.length - 1], i = null, r = 1, s.length > 2) {
          var _e50 = 1;
          "function" == typeof s[_e50] && (i = s[_e50++]), "number" == typeof s[_e50] && (r = a(s[_e50]));
        }

        return n.parseWrapper(e, i, r, o);
      },
      stringifyAsync: function stringifyAsync(e, t, i, n, o) {
        var s = arguments;
        if ("function" != typeof s[s.length - 1]) throw new TypeError("Callback is not a function");

        if (o = s[s.length - 1], t = null, n = 1, s.length > 2) {
          var _e51 = 1;
          "function" != typeof s[_e51] && "object" != _typeof(s[_e51]) || (t = s[_e51++]), "number" != typeof s[_e51] && "string" != typeof s[_e51] || "number" != typeof s[_e51++] || (i = function (e) {
            return "number" == typeof e ? (e = Math.round(e)) >= 1 && e <= 10 ? e : e < 1 ? 0 : 10 : e.length <= 10 ? e : e.substr(0, 9);
          }(s[_e51++])), "number" == typeof s[_e51] && (n = a(s[_e51]));
        }

        return r.stringifyWrapper(e, t, i, n, o);
      }
    };
  }).call(this, i(24).Buffer);
}, function (e, t, i) {
  (function (e) {
    var n = void 0 !== e && e || "undefined" != typeof self && self || window,
        r = Function.prototype.apply;

    function a(e, t) {
      this._id = e, this._clearFn = t;
    }

    t.setTimeout = function () {
      return new a(r.call(setTimeout, n, arguments), clearTimeout);
    }, t.setInterval = function () {
      return new a(r.call(setInterval, n, arguments), clearInterval);
    }, t.clearTimeout = t.clearInterval = function (e) {
      e && e.close();
    }, a.prototype.unref = a.prototype.ref = function () {}, a.prototype.close = function () {
      this._clearFn.call(n, this._id);
    }, t.enroll = function (e, t) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = t;
    }, t.unenroll = function (e) {
      clearTimeout(e._idleTimeoutId), e._idleTimeout = -1;
    }, t._unrefActive = t.active = function (e) {
      clearTimeout(e._idleTimeoutId);
      var t = e._idleTimeout;
      t >= 0 && (e._idleTimeoutId = setTimeout(function () {
        e._onTimeout && e._onTimeout();
      }, t));
    }, i(29), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate;
  }).call(this, i(6));
}, function (e, t, i) {
  (function (e, i) {
    var n = "[object Arguments]",
        r = "[object Function]",
        a = "[object GeneratorFunction]",
        o = "[object Map]",
        s = "[object Set]",
        l = /\w*$/,
        h = /^\[object .+?Constructor\]$/,
        c = /^(?:0|[1-9]\d*)$/,
        d = {};
    d[n] = d["[object Array]"] = d["[object ArrayBuffer]"] = d["[object DataView]"] = d["[object Boolean]"] = d["[object Date]"] = d["[object Float32Array]"] = d["[object Float64Array]"] = d["[object Int8Array]"] = d["[object Int16Array]"] = d["[object Int32Array]"] = d[o] = d["[object Number]"] = d["[object Object]"] = d["[object RegExp]"] = d[s] = d["[object String]"] = d["[object Symbol]"] = d["[object Uint8Array]"] = d["[object Uint8ClampedArray]"] = d["[object Uint16Array]"] = d["[object Uint32Array]"] = !0, d["[object Error]"] = d[r] = d["[object WeakMap]"] = !1;
    var u = "object" == _typeof(e) && e && e.Object === Object && e,
        p = "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) && self && self.Object === Object && self,
        f = u || p || Function("return this")(),
        g = t && !t.nodeType && t,
        m = g && "object" == _typeof(i) && i && !i.nodeType && i,
        y = m && m.exports === g;

    function v(e, t) {
      return e.set(t[0], t[1]), e;
    }

    function b(e, t) {
      return e.add(t), e;
    }

    function k(e, t, i, n) {
      var r = -1,
          a = e ? e.length : 0;

      for (n && a && (i = e[++r]); ++r < a;) {
        i = t(i, e[r], r, e);
      }

      return i;
    }

    function x(e) {
      var t = !1;
      if (null != e && "function" != typeof e.toString) try {
        t = !!(e + "");
      } catch (e) {}
      return t;
    }

    function w(e) {
      var t = -1,
          i = Array(e.size);
      return e.forEach(function (e, n) {
        i[++t] = [n, e];
      }), i;
    }

    function S(e, t) {
      return function (i) {
        return e(t(i));
      };
    }

    function E(e) {
      var t = -1,
          i = Array(e.size);
      return e.forEach(function (e) {
        i[++t] = e;
      }), i;
    }

    var A,
        j = Array.prototype,
        C = Function.prototype,
        T = Object.prototype,
        I = f["__core-js_shared__"],
        M = (A = /[^.]+$/.exec(I && I.keys && I.keys.IE_PROTO || "")) ? "Symbol(src)_1." + A : "",
        _ = C.toString,
        q = T.hasOwnProperty,
        F = T.toString,
        B = RegExp("^" + _.call(q).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
        J = y ? f.Buffer : void 0,
        P = f.Symbol,
        O = f.Uint8Array,
        R = S(Object.getPrototypeOf, Object),
        z = Object.create,
        L = T.propertyIsEnumerable,
        H = j.splice,
        D = Object.getOwnPropertySymbols,
        N = J ? J.isBuffer : void 0,
        K = S(Object.keys, Object),
        Y = me(f, "DataView"),
        U = me(f, "Map"),
        W = me(f, "Promise"),
        $ = me(f, "Set"),
        X = me(f, "WeakMap"),
        V = me(Object, "create"),
        G = xe(Y),
        Z = xe(U),
        Q = xe(W),
        ee = xe($),
        te = xe(X),
        ie = P ? P.prototype : void 0,
        ne = ie ? ie.valueOf : void 0;

    function re(e) {
      var t = -1,
          i = e ? e.length : 0;

      for (this.clear(); ++t < i;) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }

    function ae(e) {
      var t = -1,
          i = e ? e.length : 0;

      for (this.clear(); ++t < i;) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }

    function oe(e) {
      var t = -1,
          i = e ? e.length : 0;

      for (this.clear(); ++t < i;) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }

    function se(e) {
      this.__data__ = new ae(e);
    }

    function le(e, t) {
      var i = Se(e) || function (e) {
        return function (e) {
          return function (e) {
            return !!e && "object" == _typeof(e);
          }(e) && Ee(e);
        }(e) && q.call(e, "callee") && (!L.call(e, "callee") || F.call(e) == n);
      }(e) ? function (e, t) {
        for (var i = -1, n = Array(e); ++i < e;) {
          n[i] = t(i);
        }

        return n;
      }(e.length, String) : [],
          r = i.length,
          a = !!r;

      for (var o in e) {
        !t && !q.call(e, o) || a && ("length" == o || be(o, r)) || i.push(o);
      }

      return i;
    }

    function he(e, t, i) {
      var n = e[t];
      q.call(e, t) && we(n, i) && (void 0 !== i || t in e) || (e[t] = i);
    }

    function ce(e, t) {
      for (var i = e.length; i--;) {
        if (we(e[i][0], t)) return i;
      }

      return -1;
    }

    function de(e, t, i, h, c, u, p) {
      var f;
      if (h && (f = u ? h(e, c, u, p) : h(e)), void 0 !== f) return f;
      if (!Ce(e)) return e;
      var g = Se(e);

      if (g) {
        if (f = function (e) {
          var t = e.length,
              i = e.constructor(t);
          t && "string" == typeof e[0] && q.call(e, "index") && (i.index = e.index, i.input = e.input);
          return i;
        }(e), !t) return function (e, t) {
          var i = -1,
              n = e.length;
          t || (t = Array(n));

          for (; ++i < n;) {
            t[i] = e[i];
          }

          return t;
        }(e, f);
      } else {
        var m = ve(e),
            y = m == r || m == a;
        if (Ae(e)) return function (e, t) {
          if (t) return e.slice();
          var i = new e.constructor(e.length);
          return e.copy(i), i;
        }(e, t);

        if ("[object Object]" == m || m == n || y && !u) {
          if (x(e)) return u ? e : {};
          if (f = function (e) {
            return "function" != typeof e.constructor || ke(e) ? {} : (t = R(e), Ce(t) ? z(t) : {});
            var t;
          }(y ? {} : e), !t) return function (e, t) {
            return fe(e, ye(e), t);
          }(e, function (e, t) {
            return e && fe(t, Te(t), e);
          }(f, e));
        } else {
          if (!d[m]) return u ? e : {};

          f = function (e, t, i, n) {
            var r = e.constructor;

            switch (t) {
              case "[object ArrayBuffer]":
                return pe(e);

              case "[object Boolean]":
              case "[object Date]":
                return new r(+e);

              case "[object DataView]":
                return function (e, t) {
                  var i = t ? pe(e.buffer) : e.buffer;
                  return new e.constructor(i, e.byteOffset, e.byteLength);
                }(e, n);

              case "[object Float32Array]":
              case "[object Float64Array]":
              case "[object Int8Array]":
              case "[object Int16Array]":
              case "[object Int32Array]":
              case "[object Uint8Array]":
              case "[object Uint8ClampedArray]":
              case "[object Uint16Array]":
              case "[object Uint32Array]":
                return function (e, t) {
                  var i = t ? pe(e.buffer) : e.buffer;
                  return new e.constructor(i, e.byteOffset, e.length);
                }(e, n);

              case o:
                return function (e, t, i) {
                  return k(t ? i(w(e), !0) : w(e), v, new e.constructor());
                }(e, n, i);

              case "[object Number]":
              case "[object String]":
                return new r(e);

              case "[object RegExp]":
                return function (e) {
                  var t = new e.constructor(e.source, l.exec(e));
                  return t.lastIndex = e.lastIndex, t;
                }(e);

              case s:
                return function (e, t, i) {
                  return k(t ? i(E(e), !0) : E(e), b, new e.constructor());
                }(e, n, i);

              case "[object Symbol]":
                return a = e, ne ? Object(ne.call(a)) : {};
            }

            var a;
          }(e, m, de, t);
        }
      }

      p || (p = new se());
      var S = p.get(e);
      if (S) return S;
      if (p.set(e, f), !g) var A = i ? function (e) {
        return function (e, t, i) {
          var n = t(e);
          return Se(e) ? n : function (e, t) {
            for (var i = -1, n = t.length, r = e.length; ++i < n;) {
              e[r + i] = t[i];
            }

            return e;
          }(n, i(e));
        }(e, Te, ye);
      }(e) : Te(e);
      return function (e, t) {
        for (var i = -1, n = e ? e.length : 0; ++i < n && !1 !== t(e[i], i, e);) {
          ;
        }
      }(A || e, function (n, r) {
        A && (n = e[r = n]), he(f, r, de(n, t, i, h, r, e, p));
      }), f;
    }

    function ue(e) {
      return !(!Ce(e) || (t = e, M && M in t)) && (je(e) || x(e) ? B : h).test(xe(e));
      var t;
    }

    function pe(e) {
      var t = new e.constructor(e.byteLength);
      return new O(t).set(new O(e)), t;
    }

    function fe(e, t, i, n) {
      i || (i = {});

      for (var r = -1, a = t.length; ++r < a;) {
        var o = t[r],
            s = n ? n(i[o], e[o], o, i, e) : void 0;
        he(i, o, void 0 === s ? e[o] : s);
      }

      return i;
    }

    function ge(e, t) {
      var i,
          n,
          r = e.__data__;
      return ("string" == (n = _typeof(i = t)) || "number" == n || "symbol" == n || "boolean" == n ? "__proto__" !== i : null === i) ? r["string" == typeof t ? "string" : "hash"] : r.map;
    }

    function me(e, t) {
      var i = function (e, t) {
        return null == e ? void 0 : e[t];
      }(e, t);

      return ue(i) ? i : void 0;
    }

    re.prototype.clear = function () {
      this.__data__ = V ? V(null) : {};
    }, re.prototype["delete"] = function (e) {
      return this.has(e) && delete this.__data__[e];
    }, re.prototype.get = function (e) {
      var t = this.__data__;

      if (V) {
        var i = t[e];
        return "__lodash_hash_undefined__" === i ? void 0 : i;
      }

      return q.call(t, e) ? t[e] : void 0;
    }, re.prototype.has = function (e) {
      var t = this.__data__;
      return V ? void 0 !== t[e] : q.call(t, e);
    }, re.prototype.set = function (e, t) {
      return this.__data__[e] = V && void 0 === t ? "__lodash_hash_undefined__" : t, this;
    }, ae.prototype.clear = function () {
      this.__data__ = [];
    }, ae.prototype["delete"] = function (e) {
      var t = this.__data__,
          i = ce(t, e);
      return !(i < 0) && (i == t.length - 1 ? t.pop() : H.call(t, i, 1), !0);
    }, ae.prototype.get = function (e) {
      var t = this.__data__,
          i = ce(t, e);
      return i < 0 ? void 0 : t[i][1];
    }, ae.prototype.has = function (e) {
      return ce(this.__data__, e) > -1;
    }, ae.prototype.set = function (e, t) {
      var i = this.__data__,
          n = ce(i, e);
      return n < 0 ? i.push([e, t]) : i[n][1] = t, this;
    }, oe.prototype.clear = function () {
      this.__data__ = {
        hash: new re(),
        map: new (U || ae)(),
        string: new re()
      };
    }, oe.prototype["delete"] = function (e) {
      return ge(this, e)["delete"](e);
    }, oe.prototype.get = function (e) {
      return ge(this, e).get(e);
    }, oe.prototype.has = function (e) {
      return ge(this, e).has(e);
    }, oe.prototype.set = function (e, t) {
      return ge(this, e).set(e, t), this;
    }, se.prototype.clear = function () {
      this.__data__ = new ae();
    }, se.prototype["delete"] = function (e) {
      return this.__data__["delete"](e);
    }, se.prototype.get = function (e) {
      return this.__data__.get(e);
    }, se.prototype.has = function (e) {
      return this.__data__.has(e);
    }, se.prototype.set = function (e, t) {
      var i = this.__data__;

      if (i instanceof ae) {
        var n = i.__data__;
        if (!U || n.length < 199) return n.push([e, t]), this;
        i = this.__data__ = new oe(n);
      }

      return i.set(e, t), this;
    };

    var ye = D ? S(D, Object) : function () {
      return [];
    },
        ve = function ve(e) {
      return F.call(e);
    };

    function be(e, t) {
      return !!(t = null == t ? 9007199254740991 : t) && ("number" == typeof e || c.test(e)) && e > -1 && e % 1 == 0 && e < t;
    }

    function ke(e) {
      var t = e && e.constructor;
      return e === ("function" == typeof t && t.prototype || T);
    }

    function xe(e) {
      if (null != e) {
        try {
          return _.call(e);
        } catch (e) {}

        try {
          return e + "";
        } catch (e) {}
      }

      return "";
    }

    function we(e, t) {
      return e === t || e != e && t != t;
    }

    (Y && "[object DataView]" != ve(new Y(new ArrayBuffer(1))) || U && ve(new U()) != o || W && "[object Promise]" != ve(W.resolve()) || $ && ve(new $()) != s || X && "[object WeakMap]" != ve(new X())) && (ve = function ve(e) {
      var t = F.call(e),
          i = "[object Object]" == t ? e.constructor : void 0,
          n = i ? xe(i) : void 0;
      if (n) switch (n) {
        case G:
          return "[object DataView]";

        case Z:
          return o;

        case Q:
          return "[object Promise]";

        case ee:
          return s;

        case te:
          return "[object WeakMap]";
      }
      return t;
    });
    var Se = Array.isArray;

    function Ee(e) {
      return null != e && function (e) {
        return "number" == typeof e && e > -1 && e % 1 == 0 && e <= 9007199254740991;
      }(e.length) && !je(e);
    }

    var Ae = N || function () {
      return !1;
    };

    function je(e) {
      var t = Ce(e) ? F.call(e) : "";
      return t == r || t == a;
    }

    function Ce(e) {
      var t = _typeof(e);

      return !!e && ("object" == t || "function" == t);
    }

    function Te(e) {
      return Ee(e) ? le(e) : function (e) {
        if (!ke(e)) return K(e);
        var t = [];

        for (var i in Object(e)) {
          q.call(e, i) && "constructor" != i && t.push(i);
        }

        return t;
      }(e);
    }

    i.exports = function (e) {
      return de(e, !0, !0);
    };
  }).call(this, i(6), i(37)(e));
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
        var e = i(5);
        var t = r.copiedKeyframe;
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
  var n = i(1),
      r = (i(0), i(2));
  var a, o;
  var s = new Vue({
    el: "#overlayApp",
    data: {
      hidden: !0,
      closeMsg: "Close"
    },
    methods: {
      show: function show() {
        var _this10 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this10.$el.style.opacity = "1", r.query("#overlayApp .drag").draggable({
            restrict: !0,
            root: _this10.$el
          }), n.emit("renderSleep");
        });
      },
      hide: function hide() {
        a = void 0, o = void 0, document.getElementById("overlayFilename").innerText = "Choose a file...";
        var e = document.querySelectorAll("#overlayApp .section.disabled");

        var _iterator = _createForOfIteratorHelper(e),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _t24 = _step.value;

            _t24.classList.add("disabled");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        document.getElementById("addOverlay").classList.add("disabled"), this.hidden = !0, n.emit("renderFocus");
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
        "number" == typeof o && ("overlayStart" == e.target.id && (i = o), "overlayEnd" == e.target.id && (i = o)), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;

        if ("overlayEnd" == e.target.id) {
          i = parseInt(document.getElementById("overlayStart").value);
        }

        parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(e) {
        if (e.target != document.activeElement) return;
        e.target.value.length || (e.target.value = 1);
        var t = e.wheelDeltaY < 0,
            i = parseInt(e.target.value);
        t ? i-- : i++, e.target.value = i.toString(), this.validateAmount(e);
      },
      checkFile: function checkFile() {
        var e = document.getElementById("overlayInput"),
            t = document.getElementById("overlayFilename"),
            i = e.files[0];
        if (!i) return;
        t.innerText = i.name;
        var n = URL.createObjectURL(i);

        if (n) {
          a = n;

          var _e52 = document.createElement("video");

          _e52.crossOrigin = "anonymous", _e52.controls = !0, _e52.muted = !0, _e52.src = n, _e52.load(), _e52.addEventListener("loadedmetadata", function () {
            o = _e52.duration, _e52.remove();
          });

          var _t25 = document.querySelectorAll("#overlayApp .section.disabled");

          var _iterator2 = _createForOfIteratorHelper(_t25),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _e53 = _step2.value;

              _e53.classList.remove("disabled");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          document.getElementById("addOverlay").classList.remove("disabled");
        }
      },
      validate: function validate() {
        if (!a) return;
        var e = document.getElementById("overlayFrameCount").value,
            t = document.getElementById("overlayFrameRate").value,
            i = document.getElementById("overlayStart").value,
            r = document.getElementById("overlayEnd").value,
            o = document.getElementById("overlayQuality").value;
        e = e.length ? parseInt(e) : void 0, t = t.length ? parseInt(t) : void 0, i = i.length ? parseInt(i) : void 0, r = r.length ? parseInt(r) : void 0, o = o.length ? parseInt(o) / 100 : void 0;
        var s = {
          frameCount: e,
          frameRate: t,
          start: i,
          end: r,
          quality: o
        };
        n.emit("extractFrames", a, s), this.hide();
      }
    }
  });
  e.exports = s;
}, function (e, t, i) {
  var n = i(1),
      r = i(4),
      a = i(3),
      o = i(0),
      s = i(2),
      l = i(5);
  var h,
      c = -Math.PI,
      d = Math.PI,
      u = [];
  var p = new Vue({
    el: "#overlayConfigApp",
    data: {
      hidden: !0,
      closeMsg: "Close",
      opacity: 1,
      scale: 1,
      angle: 0,
      trimStart: 1,
      trimEnd: l.app.totalFrames,
      start: 1
    },
    methods: {
      fixData: function fixData() {
        var e = document.getElementById("overlayConfigTrimStart"),
            t = document.getElementById("overlayConfigTrimEnd"),
            i = document.getElementById("overlayConfigStart"),
            n = parseInt(e.value),
            r = parseInt(t.value),
            a = parseInt(i.value);
        this.trimStart = n || 1, this.trimEnd = r || u.length, this.start = a || 1;
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
        "overlayConfigTrimStart" == e.target.id && (i = this.trimEnd), "overlayConfigTrimEnd" == e.target.id && (i = u.length), "overlayConfigStart" == e.target.id && (i = l.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString()), this.fixData();
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "overlayConfigTrimEnd" == e.target.id && (i = this.trimStart), parseInt(t) < i && (e.target.value = i.toString()), this.fixData();
      },
      toggleAmount: function toggleAmount(e) {
        if (e.target != document.activeElement) return;
        e.target.value.length || (e.target.value = 1);
        var t = e.wheelDeltaY < 0,
            i = parseInt(e.target.value);
        t ? i-- : i++, e.target.value = i.toString(), this.validateAmount(e), this.fixData();
      },
      updateSliders: function updateSliders() {
        var _this11 = this;

        var e = document.querySelectorAll(".slider-wrapper");

        var _loop5 = function _loop5() {
          var i = void 0,
              n = void 0,
              a = void 0,
              s = e[t],
              l = s.querySelector(".handle"),
              u = l.getBoundingClientRect(),
              p = 0,
              f = s.querySelector(".track").getBoundingClientRect().width - u.width;
          "opacity" == s.dataset.label ? (i = 0, n = 1, a = _this11.opacity) : "scale" == s.dataset.label ? (i = 0, n = 6, a = _this11.scale) : "rotate" == s.dataset.label && (i = c, n = d, a = _this11.angle), l.style.left = o.map(a, i, n, p, f) + "px", s.onmousemove = function () {
            r.dragged && !h && (h = s);
          }, s.onmousedown = function () {
            h = s;
          };
        };

        for (var t = 0; t < e.length; t++) {
          _loop5();
        }

        var i = {
          opacity: this.opacity,
          scale: this.scale,
          angle: this.angle
        };
        localStorage.setItem(a.autosave.label + ".overlay.config", JSON.stringify(i));
      },
      show: function show() {
        var _this12 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this12.$el.style.opacity = "1", s.query("#overlayConfigApp .drag").draggable({
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
        e.value = 1, t.value = u.length, i.value = 1, this.fixData(), this.updateSliders();
      },
      removeOverlay: function removeOverlay() {
        confirm("Are you sure you want to remove the overlay?") && (n.emit("removeOverlay"), this.hide());
      }
    }
  });

  function f() {
    if (h) {
      var _e54,
          _t26,
          _i20,
          _n23 = h.querySelector(".handle"),
          _s6 = _n23.getBoundingClientRect(),
          _l3 = h.querySelector(".track").getBoundingClientRect(),
          _u = 0,
          _f = _l3.width - _s6.width,
          g = r.x - _l3.x - _s6.width / 2;

      g = o.clamp(g, _u, _f), _n23.style.left = g + "px", "opacity" == h.dataset.label ? (_e54 = 0, _t26 = 1, _i20 = "opacity") : "scale" == h.dataset.label ? (_e54 = 0, _t26 = 6, _i20 = "scale") : "rotate" == h.dataset.label && (_e54 = c, _t26 = d, _i20 = "angle");
      var m = o.map(g, _u, _f, _e54, _t26);
      p[_i20] = m;
      var y = {
        opacity: p.opacity,
        scale: p.scale,
        angle: p.angle
      };
      localStorage.setItem(a.autosave.label + ".overlay.config", JSON.stringify(y));
    }
  }

  n.on("overlayFrames", function (e) {
    u = e, p.trimEnd = u.length;
  }), o.loadJSONData(a.autosave.label + ".overlay.config", function (e) {
    "number" == typeof e.opacity && (p.opacity = e.opacity), "number" == typeof e.scale && (p.scale = e.scale), "number" == typeof e.angle && (p.angle = e.angle), p.updateSliders();
  }), r.on("mouseup", function (e) {
    h = null;
  }), r.on("mousedown", function (e) {
    f();
  }), r.on("mousemove", function (e) {
    r.dragged && f();
  }), e.exports = p;
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
  var n = i(11),
      r = i(1),
      a = i(2);
  var o;
  var s = new Vue({
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
          _this14.$el.style.opacity = "1", a.query("#loadApp .drag").draggable({
            restrict: !0,
            root: _this14.$el
          }), r.emit("renderSleep");
        });
      },
      hide: function hide() {
        o = void 0, r.emit("renderFocus"), a.query("#import").addClass("disabled"), this.fileError = !1, this.hidden = !0;
      },
      checkFile: function checkFile() {
        var _this15 = this;

        var e = a.query("#importInput"),
            t = a.query("#loadFilename"),
            i = e.node.files[0];
        if (!i) return;
        var r = i.name,
            s = r.split(".")[r.split(".").length - 1],
            l = a.query("#import");

        if (l.addClass("disabled"), l.text("Processing...", !0), "rigme" == s) {
          t.text(r, !0);

          var _e55 = URL.createObjectURL(i);

          _e55 && fetch(_e55).then(function (e) {
            e.text().then(function (e) {
              var t,
                  i = !1;

              try {
                n.parseAsync(e, function (e, n) {
                  e ? i = !0 : (t = n, i = !1, o = t, l.text("Load", !0), l.removeClass("disabled"), _this15.fileError = !1);
                });
              } catch (e) {
                l.addClass("disabled"), _this15.errorMessage = "This file is corrupted.", _this15.fileError = !0;
              }
            });
          });
        }
      },
      validate: function validate() {
        o && (r.emit("loadProject", o), this.hide());
      }
    }
  });
  e.exports = s;
}, function (e, t, i) {
  var n = i(1),
      r = i(0),
      a = i(2),
      o = i(5),
      s = i(8),
      l = new Vue({
    el: "#spritesheetExportApp",
    data: {
      hidden: !0
    },
    methods: {
      show: function show() {
        var _this16 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this16.$el.style.opacity = "1", a.query("#spritesheetExportApp .drag").draggable({
            restrict: !0,
            root: _this16.$el
          }), a.query("#spritesheetExportApp .custom-checkbox", !0).on("click", function (e) {
            a.query(e.target).query(".checkbox").toggleClass("checked");
          }), a.query("#spritesheetName").value(s.generate());
          var e = o.graph.playbackHandle.start.mark + 1,
              t = o.graph.playbackHandle.end.mark + 1,
              i = rigModel.bounds,
              r = i.max.x - i.min.x,
              l = i.max.y - i.min.y,
              h = Math.ceil(Math.sqrt(t - e));
          a.query("#spritesheetStart").value(e), a.query("#spritesheetEnd").value(t), a.query("#spritesheetCellWidth").value(r.toFixed(2)), a.query("#spritesheetCellHeight").value(l.toFixed(2)), a.query("#spritesheetRowCount").value(h), setTimeout(function () {
            document.getElementById("spritesheetName").focus();
          }, 100), n.emit("renderSleep");
        });
      },
      hide: function hide() {
        this.hidden = !0, n.emit("renderFocus");
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

        if ("spritesheetRowCount" == e.target.id) {
          i = parseInt(a.query("#spritesheetEnd").value()) - parseInt(a.query("#spritesheetStart").value()) + 1;
        }

        "spritesheetStart" == e.target.id && (i = parseInt(a.query("#spritesheetEnd").value())), "spritesheetEnd" == e.target.id && (i = o.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "spritesheetEnd" == e.target.id && (i = parseInt(a.query("#spritesheetStart").value())), parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(e) {
        if (e.target != document.activeElement) return;
        e.target.value.length || (e.target.value = 1);
        var t = e.wheelDeltaY < 0,
            i = parseFloat(e.target.value);
        t ? i-- : i++, "spritesheetCellWidth" != e.target.id && "spritesheetCellHeight" != e.target.id || (i = i.toFixed(2)), e.target.value = i.toString(), this.validateAmount(e);
      },
      validate: function validate() {
        var e = a.query("#spritesheetName").value(),
            t = parseInt(a.query("#spritesheetStart").value()),
            i = parseInt(a.query("#spritesheetEnd").value()),
            o = i - t + 1,
            s = parseFloat(a.query("#spritesheetCellWidth").value()),
            l = parseFloat(a.query("#spritesheetCellHeight").value()),
            h = parseInt(a.query("#spritesheetRowCount").value()),
            c = a.query("#spritesheetShowSkin").query(".checkbox").hasClass("checked"),
            d = a.query("#spritesheetShowBones").query(".checkbox").hasClass("checked"),
            u = Math.ceil(o / h);
        n.emit("exportSpritesheet", {
          name: e.length ? e : r.uid(),
          start: t,
          end: i,
          totalFrames: o,
          cellWidth: s,
          cellHeight: l,
          rows: h,
          cols: u,
          showSkin: c,
          showBones: d
        });
      }
    }
  });
  e.exports = l;
}, function (e, t, i) {
  var n = i(1),
      r = i(0),
      a = i(2),
      o = i(5),
      s = i(8),
      l = new Vue({
    el: "#framesExportApp",
    data: {
      hidden: !0
    },
    methods: {
      show: function show() {
        var _this17 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this17.$el.style.opacity = "1", a.query("#framesExportApp .drag").draggable({
            restrict: !0,
            root: _this17.$el
          }), a.query("#framesExportApp .custom-checkbox", !0).on("click", function (e) {
            a.query(e.target).query(".checkbox").toggleClass("checked");
          }), a.query("#framesExportName").value(s.generate());
          var e = o.graph.playbackHandle.start.mark + 1,
              t = o.graph.playbackHandle.end.mark + 1,
              i = rigModel.bounds,
              r = i.max.x - i.min.x,
              l = i.max.y - i.min.y;
          a.query("#framesExportStart").value(e), a.query("#framesExportEnd").value(t), a.query("#framesExportWidth").value(r.toFixed(2)), a.query("#framesExportHeight").value(l.toFixed(2)), setTimeout(function () {
            document.getElementById("framesExportName").focus();
          }, 100), n.emit("renderSleep");
        });
      },
      hide: function hide() {
        this.hidden = !0, n.emit("renderFocus");
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
        "framesExportStart" == e.target.id && (i = parseInt(a.query("#framesExportEnd").value())), "framesExportEnd" == e.target.id && (i = o.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "framesExportEnd" == e.target.id && (i = parseInt(a.query("#framesExportStart").value())), parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(e) {
        if (e.target != document.activeElement) return;
        e.target.value.length || (e.target.value = 1);
        var t = e.wheelDeltaY < 0,
            i = parseFloat(e.target.value);
        t ? i-- : i++, "framesExportWidth" != e.target.id && "framesExportHeight" != e.target.id || (i = i.toFixed(2)), e.target.value = i.toString(), this.validateAmount(e);
      },
      validate: function validate() {
        var e = a.query("#framesExportName").value(),
            t = parseInt(a.query("#framesExportStart").value()),
            i = parseInt(a.query("#framesExportEnd").value()),
            o = i - t + 1,
            s = parseFloat(a.query("#framesExportWidth").value()),
            l = parseFloat(a.query("#framesExportHeight").value()),
            h = a.query("#framesExportShowSkin").query(".checkbox").hasClass("checked"),
            c = a.query("#framesExportShowBones").query(".checkbox").hasClass("checked");
        n.emit("exportFrames", {
          name: e.length ? e : r.uid(),
          start: t,
          end: i,
          totalFrames: o,
          frameWidth: s,
          frameHeight: l,
          showSkin: h,
          showBones: c
        });
      }
    }
  });
  e.exports = l;
}, function (e, t, i) {
  var n = i(1),
      r = i(0),
      a = i(2),
      o = i(5),
      s = i(8),
      l = new Vue({
    el: "#GIFExportApp",
    data: {
      hidden: !0
    },
    methods: {
      show: function show() {
        var _this18 = this;

        this.hidden = !1, this.$nextTick(function () {
          _this18.$el.style.opacity = "1", a.query("#GIFExportApp .drag").draggable({
            restrict: !0,
            root: _this18.$el
          }), a.query("#GIFExportApp .custom-checkbox", !0).on("click", function (e) {
            a.query(e.target).query(".checkbox").toggleClass("checked");
          }), a.query("#GIFExportName").value(s.generate());
          var e = o.graph.playbackHandle.start.mark + 1,
              t = o.graph.playbackHandle.end.mark + 1,
              i = rigModel.bounds,
              r = i.max.x - i.min.x,
              l = i.max.y - i.min.y;
          a.query("#GIFExportStart").value(e), a.query("#GIFExportEnd").value(t), a.query("#GIFExportWidth").value(r.toFixed(2)), a.query("#GIFExportHeight").value(l.toFixed(2)), setTimeout(function () {
            document.getElementById("GIFExportName").focus();
          }, 100), n.emit("renderSleep");
        });
      },
      hide: function hide() {
        this.hidden = !0, n.emit("renderFocus");
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
        "GIFExportStart" == e.target.id && (i = parseInt(a.query("#GIFExportEnd").value())), "GIFExportEnd" == e.target.id && (i = o.app.totalFrames), parseInt(t) > i && (e.target.value = i.toString());
      },
      validateMin: function validateMin(e) {
        var t = e.target.value,
            i = e.target.dataset.min;
        "GIFExportEnd" == e.target.id && (i = parseInt(a.query("#GIFExportStart").value())), parseInt(t) < i && (e.target.value = i.toString());
      },
      toggleAmount: function toggleAmount(e) {
        if (e.target != document.activeElement) return;
        e.target.value.length || (e.target.value = 1);
        var t = e.wheelDeltaY < 0,
            i = parseFloat(e.target.value);
        t ? i-- : i++, "GIFExportWidth" != e.target.id && "GIFExportHeight" != e.target.id || (i = i.toFixed(2)), e.target.value = i.toString(), this.validateAmount(e);
      },
      validate: function validate() {
        var e = a.query("#GIFExportName").value(),
            t = parseInt(a.query("#GIFExportStart").value()),
            i = parseInt(a.query("#GIFExportEnd").value()),
            o = i - t + 1,
            s = parseFloat(a.query("#GIFExportWidth").value()),
            l = parseFloat(a.query("#GIFExportHeight").value()),
            h = a.query("#GIFExportBackground").value(),
            c = a.query("#GIFExportShowSkin").query(".checkbox").hasClass("checked"),
            d = a.query("#GIFExportShowBones").query(".checkbox").hasClass("checked");
        n.emit("exportGIF", {
          name: e.length ? e : r.uid(),
          start: t,
          end: i,
          totalFrames: o,
          width: s,
          height: l,
          showSkin: c,
          showBones: d,
          background: h
        });
      }
    }
  });
  e.exports = l;
}, function (e, t, i) {
  var n = i(23),
      r = i(11),
      a = i(32),
      o = i(2),
      s = i(1),
      l = i(7),
      h = i(4),
      c = i(35),
      d = i(0),
      u = i(3),
      p = i(36),
      f = i(9),
      g = i(10),
      m = i(42);
  s.emit("loadedApps", p), window.rigModel = f;
  var y,
      v,
      b = [],
      k = !1,
      x = null,
      w = u.world.zoom,
      S = l(),
      E = l(),
      A = l(),
      j = {
    pan: "pan",
    select: "select",
    add: "add",
    move: "move",
    remove: "remove"
  },
      C = {
    KeyQ: j.pan,
    KeyW: j.select,
    KeyE: j.move,
    KeyR: j.add,
    KeyT: j.remove
  },
      T = {},
      I = j.pan;
  T.add = "assets/svg/joint-plus.svg", T.select = "assets/svg/joint-click.svg", T.move = "assets/svg/joint-arrow.svg", T.remove = "assets/svg/joint-trash.svg", T.pan = "assets/svg/quad-arrow.svg";

  var M = {
    add: o.query("#addJoint"),
    select: o.query("#selectJoint"),
    move: o.query("#moveJoint"),
    remove: o.query("#removeJoint"),
    pan: o.query("#panCamera")
  },
      _ = Object.keys(M);

  function q(e) {
    I = e, f.action = e, o.query("#toolApp button", !0).removeClass("active-tool"), o.query(M[e].node).addClass("active-tool"), Q.query("img").prop("src", T[e]);
  }

  var _loop6 = function _loop6() {
    var e = _arr[_i21];
    M[e].on("click", function () {
      q(j[e]);
    });
  };

  for (var _i21 = 0, _arr = _; _i21 < _arr.length; _i21++) {
    _loop6();
  }

  var F = function F(e) {
    return e.preventDefault();
  };

  o.query(document).on("contextmenu", F), o.query("div", !0).on("drag", F), o.query("div", !0).on("dragstart", F);
  var B = o.query("#materialApp"),
      J = o.query("#propertyApp #materials");

  function P(e) {
    var t = d.uid();
    var i = URL.createObjectURL(e),
        n = o.create("button"),
        r = n.create("img");
    n.addClass("item"), r.attr("src", i), n.node.addEventListener("click", function () {
      !function (e) {
        var t = b.find(function (t) {
          return t.id === e;
        });
        t && (J.value(t.src), J.query("label", !0).text(t.file.name, !0), s.emit("materialChange", J.value()));
      }(t);
    }), B.append(n);
    var a = J.query(".options").create("p");
    return a.node.dataset.value = i, a.node.dataset.parentId = "#materials", a.text(e.name), B.node.scrollTop = B.node.scrollHeight, {
      id: t,
      file: e,
      src: i,
      el: n
    };
  }

  function O(e) {
    var t = ["image/gif", "image/jpeg", "image/png", "image/svg+xml"];

    for (var i = 0; i < e.length; i++) {
      var _r14 = void 0,
          _a8 = e[i];

      for (var n = 0; n < b.length; n++) {
        var _e56 = b[n];

        if (_e56.file.name == _a8.name && _e56.file.lastModified == _a8.lastModified && _e56.file.size == _a8.size && _e56.file.type == _a8.type) {
          _r14 = _e56;
          break;
        }
      }

      if (t.includes(_a8.type)) {
        var _e57 = P(_a8);

        b.push(_e57);
      }

      _r14 && _r14.el.remove();
    }
  }

  var R = o.query(".checkbox.checked", !0);

  for (var z = 0; z < R.elements.length; z++) {
    R.elements[z].node.parentNode.checked = !0;
  }

  o.query(".custom-checkbox", !0).on("click", function (e) {
    var t = o.query(e.target).query(".checkbox");
    t.toggleClass("checked"), o.query(e.target).prop("checked", t.hasClass("checked")), "animateSkin" == e.target.id && (u.animateSkin = t.hasClass("checked"));
  });
  var L = o.query("#selectOptions");
  L.on("mousedown", function (e) {
    var t = e.target.dataset.value,
        i = e.target.dataset.parentId,
        n = o.query(i);
    n.value(t), n.query("label").text(e.target.innerText, !0), "#materials" == i && s.emit("materialChange", t);
  }), o.query("#propertyApp").on("mousewheel", function () {
    L.css("display", "none");
  }), o.query(".custom-select", !0).on("mouseup", function (e) {
    var t = o.query(e.target, !0).query(".options");

    if (L.html(t.html(), !0), "flex" != L.node.style.display) {
      var _e58 = t.node.parentNode.getBoundingClientRect(),
          _i22 = _e58.x,
          _n24 = _e58.y + _e58.height + 5;

      L.css({
        display: "flex",
        left: _i22 + "px",
        top: _n24 + "px",
        width: _e58.width + "px"
      });

      var _r15 = L.node.getBoundingClientRect();

      _n24 + _r15.height >= innerHeight && L.css("top", _e58.y - _r15.height - 5 + "px"), _i22 + _r15.width >= innerWidth && L.css("left", _e58.x - _r15.width + _e58.width + "px");
    } else L.css("display", "none");
  }), B.on("drop", function (e) {
    e.preventDefault(), O(e.dataTransfer.files), o.query("#dropIcon").css("visibility", "hidden");
  });
  var H = o.query("#addMaterial");
  H.on("change", function () {
    O(H.node.files);
  }), B.on("dragenter", function (e) {
    o.query("#dropIcon").css("visibility", "visible");
  }), B.on("dragleave", function (e) {
    o.query("#dropIcon").css("visibility", "hidden");
  }), B.on("dragover", function (e) {
    e.preventDefault();
  }), B.on("mousedown", function (e) {
    for (var t = 0; t < B.node.children.length; t++) {
      B.node.children[t].classList.remove("selected");
    }
  });
  var D = [];
  s.on("saveProject", function (e) {
    var t = o.query("#download");
    t.addClass("disabled"), t.text("Processing...", !0);
    var i = f.toJSON(null, !0),
        a = {
      frameCount: p.timeline.app.totalFrames,
      animationSpeed: p.timeline.app.animationSpeed,
      start: p.timeline.graph.playbackHandle.start.mark,
      end: p.timeline.graph.playbackHandle.end.mark,
      overlay: {
        opacity: p.overlayConfigApp.opacity,
        scale: p.overlayConfigApp.scale,
        angle: p.overlayConfigApp.angle,
        trimStart: p.overlayConfigApp.trimStart,
        trimEnd: p.overlayConfigApp.trimEnd,
        start: p.overlayConfigApp.start
      }
    },
        s = [];

    for (var l = 0; l < D.length; l++) {
      var _e59 = D[l];
      s.push(_e59.src);
    }

    var h = {
      model: i,
      config: a,
      overlay: s
    };
    r.stringifyAsync(h, function (i, r) {
      try {
        new TextEncoder().encode(r);

        var _t27 = n.createWriteStream(e + ".rigme");

        new Response(r).body.pipeTo(_t27).then(function (e) {}, function (e) {
          console.warn(e);
        });
      } catch (e) {
        console.warn(e);
      }

      o.query("#download").removeClass("disabled"), t.text("Save", !0);
    });
  }), addEventListener("unload", function () {
    writableStream && writableStream.abort();
  }), s.on("loadProject", function (e) {
    if (e.model) {
      var _t28 = f.fromJSON(e.model);

      f.reset(), f["import"](_t28);
    } else console.warn("Couldn't load model.");

    if (e.config ? ("number" == typeof e.config.frameCount && (document.getElementById("frameCount").value = e.config.frameCount), "number" == typeof e.config.animationSpeed && (document.getElementById("animationSpeed").value = e.config.animationSpeed), p.timeline.app.fixData(), "number" == typeof e.config.start && (p.timeline.graph.playbackHandle.start.mark = e.config.start), "number" == typeof e.config.end && (p.timeline.graph.playbackHandle.end.mark = e.config.end), p.timeline.graph.redraw(), "number" == typeof e.config.overlay.opacity && (p.overlayConfigApp.opacity = e.config.overlay.opacity), "number" == typeof e.config.overlay.scale && (p.overlayConfigApp.scale = e.config.overlay.scale), "number" == typeof e.config.overlay.angle && (p.overlayConfigApp.angle = e.config.overlay.angle), p.overlayConfigApp.updateSliders(), "number" == typeof e.config.overlay.trimStart && (p.overlayConfigApp.trimStart = e.config.overlay.trimStart), "number" == typeof e.config.overlay.trimEnd && (p.overlayConfigApp.trimEnd = e.config.overlay.trimEnd), "number" == typeof e.config.overlay.start && (p.overlayConfigApp.start = e.config.overlay.start)) : console.warn("Couldn't load configurations."), e.overlay) {
      if (e.overlay.length > 0) {
        D = [], p.optionApp.overlayConfigHidden = !1;

        for (var t = 0; t < e.overlay.length; t++) {
          var _i23 = e.overlay[t],
              _n25 = new Image();

          _n25.src = _i23, D.push(_n25);
        }

        s.emit("overlayFrames", D);
      }
    } else console.warn("Couldn't load overlay.");

    g.add({
      label: "Load",
      value: f.clone(),
      group: "keyframe"
    });
  });
  var N = o.query("#progressBarWrapper"),
      K = o.query("#progressBar"),
      Y = o.query("#progressBarWrapper button"),
      U = o.query("#progressBarWrapper p");
  s.on("loadProgress", function (e, t, i) {
    "flex" != N.node.style.display && N.css("display", "flex"), U.text() != t && U.text(t, !0), "function" == typeof i && Y.node.onclick != i && (Y.node.onclick = i), e >= 100 && s.emit("doneProgress"), K.css("width", e + "%");
  }), s.on("doneProgress", function () {
    N.css("display", "none"), K.css("width", "0");
  }), s.on("extractFrames", function (e, t) {
    function i() {
      p.optionApp.overlayConfigHidden = !1, s.emit("overlayFrames", D), s.emit("doneProgress");
    }

    D = [], s.emit("loadProgress", 0, "Extracting frames..."), m(e, {
      frameCount: t.frameCount,
      frameRate: t.frameRate,
      start: t.start,
      end: t.end,
      quality: t.quality,
      drop: !1,
      progress: function progress(e, t) {
        var _this19 = this;

        s.emit("loadProgress", t, "Extracting frames...", function () {
          _this19.drop = !0, i();
        }), D.push(e);
      },
      done: function done(e) {
        D = e, i();
      }
    });
  }), s.on("removeOverlay", function () {
    D = [], p.optionApp.overlayConfigHidden = !0;
  }), s.on("rotoscope", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var e, t, i, n, r, a, o, h, c, d, g, m, y, v, b, k, x, w, S, E, A, j, C, _loop7, T;

    return regeneratorRuntime.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (D.length) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
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
            s.emit("loadProgress", 0, "Feeding frames to PoseNet..."), f.reset();
            t = f.addJoint(0, 0);
            t.name = "Head";
            i = f.addJoint(0, 0);
            i.name = "Chin";
            n = f.addJoint(0, 0);
            n.name = "Neck";
            r = f.addJoint(0, 0);
            r.name = "Abdomen";
            a = f.addJoint(0, 0);
            a.name = "Groin", f.activeJoint = n;
            o = f.addJoint(0, 0);
            o.name = "Right Shoulder";
            h = f.addJoint(0, 0);
            h.name = "Right Elbow";
            c = f.addJoint(0, 0);
            c.name = "Right Wrist";
            d = f.addJoint(0, 0);
            d.name = "Right Hand", f.activeJoint = n;
            g = f.addJoint(0, 0);
            g.name = "Left Shoulder";
            m = f.addJoint(0, 0);
            m.name = "Left Elbow";
            y = f.addJoint(0, 0);
            y.name = "Left Wrist";
            v = f.addJoint(0, 0);
            v.name = "Left Hand", f.activeJoint = a;
            b = f.addJoint(0, 0);
            b.name = "Right Hip";
            k = f.addJoint(0, 0);
            k.name = "Right Knee";
            x = f.addJoint(0, 0);
            x.name = "Right Ankle";
            w = f.addJoint(0, 0);
            w.name = "Right Foot", f.activeJoint = a;
            S = f.addJoint(0, 0);
            S.name = "Left Hip";
            E = f.addJoint(0, 0);
            E.name = "Left Knee";
            A = f.addJoint(0, 0);
            A.name = "Left Ankle";
            C = f.addJoint(0, 0);
            C.name = "Left Foot";
            _loop7 = /*#__PURE__*/regeneratorRuntime.mark(function _loop7() {
              var I;
              return regeneratorRuntime.wrap(function _loop7$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      I = D[T];
                      _context.next = 3;
                      return e.then(function (e) {
                        return e.estimateSinglePose(I);
                      }).then(function (e) {
                        var M = T / (D.length - 1) * 100;
                        if (s.emit("loadProgress", M, "Rotoscoping...", function () {
                          T = D.length, M = 100, s.emit("doneProgress");
                        }), 100 == M) return;
                        var _ = [],
                            q = [];

                        for (var F = 0; F < e.keypoints.length; F++) {
                          var _t29 = e.keypoints[F];
                          _.push(_t29.position.x), q.push(_t29.position.y);
                        }

                        var B = {
                          x: Math.min.apply(Math, _),
                          y: Math.min.apply(Math, q)
                        },
                            J = {
                          x: Math.max.apply(Math, _),
                          y: Math.max.apply(Math, q)
                        },
                            P = (B.x + J.x) / 2,
                            O = (B.y + J.y) / 2;

                        for (F = 0; F < e.keypoints.length; F++) {
                          var _t30 = e.keypoints[F].position,
                              _i24 = {
                            x: _t30.x - P,
                            y: _t30.y - O
                          };
                          _t30.x = _t30.x + _i24.x * (p.overlayConfigApp.scale - 1), _t30.y = _t30.y + _i24.y * (p.overlayConfigApp.scale - 1);
                        }

                        for (F = 0; F < e.keypoints.length; F++) {
                          var _t31 = e.keypoints[F].position,
                              _i25 = (_t31.x - P) * Math.cos(p.overlayConfigApp.angle) - (_t31.y - O) * Math.sin(p.overlayConfigApp.angle),
                              _n26 = (_t31.x - P) * Math.sin(p.overlayConfigApp.angle) + (_t31.y - O) * Math.cos(p.overlayConfigApp.angle);

                          _t31.x = _i25 + P, _t31.y = _n26 + O;
                        }

                        for (F = 0; F < e.keypoints.length; F++) {
                          var _t32 = e.keypoints[F];
                          if (!(_t32.score < .1 && T > 0)) switch (_t32.position.x -= I.width / 2, _t32.position.y -= I.height / 2, "linear" != u.riggingMode && s.emit("changeRiggingMode", "linear"), _t32.part) {
                            case "leftShoulder":
                              o = f.moveJointById(o.id, _t32.position.x, _t32.position.y);
                              break;

                            case "leftElbow":
                              h = f.moveJointById(h.id, _t32.position.x, _t32.position.y);
                              break;

                            case "leftWrist":
                              c = f.moveJointById(c.id, _t32.position.x, _t32.position.y);
                              break;

                            case "rightShoulder":
                              g = f.moveJointById(g.id, _t32.position.x, _t32.position.y);
                              break;

                            case "rightElbow":
                              m = f.moveJointById(m.id, _t32.position.x, _t32.position.y);
                              break;

                            case "rightWrist":
                              y = f.moveJointById(y.id, _t32.position.x, _t32.position.y);
                              break;

                            case "leftHip":
                              b = f.moveJointById(b.id, _t32.position.x, _t32.position.y);
                              break;

                            case "leftKnee":
                              k = f.moveJointById(k.id, _t32.position.x, _t32.position.y);
                              break;

                            case "leftAnkle":
                              x = f.moveJointById(x.id, _t32.position.x, _t32.position.y);
                              break;

                            case "rightHip":
                              S = f.moveJointById(S.id, _t32.position.x, _t32.position.y);
                              break;

                            case "rightKnee":
                              E = f.moveJointById(E.id, _t32.position.x, _t32.position.y);
                              break;

                            case "rightAnkle":
                              A = f.moveJointById(A.id, _t32.position.x, _t32.position.y);
                          }
                        }

                        var R = l({
                          x: (b.position.x + S.position.x) / 2,
                          y: (b.position.y + S.position.y) / 2
                        });
                        a = f.moveJointById(a.id, R.x, R.y);
                        var z = R.heading(n.position),
                            L = R.dist(n.position),
                            H = R.x + Math.cos(z) * (L / 2),
                            N = R.y + Math.sin(z) * (L / 2);
                        r = f.moveJointById(r.id, H, N);
                        var K = l({
                          x: (o.position.x + g.position.x) / 2,
                          y: (o.position.y + g.position.y) / 2
                        }),
                            Y = o.position.heading(g.position) - Math.PI / 2,
                            U = L / 2,
                            W = L / 6;
                        n = f.moveJointById(n.id, K.x, K.y), i = f.moveJointById(i.id, K.x, K.y - W);
                        var $ = i.position.x - Math.cos(Y) * U,
                            X = i.position.y - Math.sin(Y) * U;
                        t = f.moveJointById(t.id, $, X);
                        var V = o.position.heading(c.position),
                            G = h.position.dist(c.position) / 2,
                            Z = c.position.x + Math.cos(V) * G,
                            Q = c.position.y + Math.sin(V) * G;
                        d = f.moveJointById(d.id, Z, Q);
                        var ee = g.position.heading(y.position),
                            te = m.position.dist(y.position) / 2,
                            ie = y.position.x + Math.cos(ee) * te,
                            ne = y.position.y + Math.sin(ee) * te;
                        v = f.moveJointById(v.id, ie, ne);
                        var re = b.position.heading(k.position),
                            ae = x.position.dist(k.position) / 4,
                            oe = x.position.x + Math.cos(re) * ae,
                            se = x.position.y + Math.sin(re) * ae;
                        w = f.moveJointById(w.id, oe, se);
                        var le = S.position.heading(E.position),
                            he = A.position.dist(E.position) / 4,
                            ce = A.position.x + Math.cos(le) * he,
                            de = A.position.y + Math.sin(le) * he;

                        if (C = f.moveJointById(C.id, ce, de), j) {
                          var _loop8 = function _loop8() {
                            var t = j.keypoints[F],
                                i = e.keypoints.find(function (e) {
                              return e.part == t.part;
                            });

                            if (i) {
                              var _n27 = l(t.position),
                                  _r16 = l(i.position);

                              if (_n27.dist(_r16) > 10 * p.overlayConfigApp.scale) {
                                p.timeline.graph.setCurrentMark(T), p.timeline.graph.updateState(), f.setKeyframe(T), j = JSON.parse(JSON.stringify(e));
                                return "break";
                              }
                            }
                          };

                          for (F = 0; F < j.keypoints.length; F++) {
                            var _ret = _loop8();

                            if (_ret === "break") break;
                          }
                        } else p.timeline.graph.setCurrentMark(T), f.setKeyframe(T), j = JSON.parse(JSON.stringify(e));
                      });

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop7);
            });
            T = 0;

          case 48:
            if (!(T < D.length)) {
              _context2.next = 53;
              break;
            }

            return _context2.delegateYield(_loop7(), "t0", 50);

          case 50:
            T++;
            _context2.next = 48;
            break;

          case 53:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }))), window.events = s, s.on("exportSpritesheet", function (e) {
    var t = document.createElement("canvas");
    t.width = e.cellWidth * e.cols, t.height = e.cellHeight * e.rows;
    var i,
        n = t.getContext("2d");

    for (var r = e.start - 1; r <= e.end - 1; r++) {
      var _t33 = r - e.start + 1,
          _a9 = Math.floor(_t33 % e.cols) * e.cellWidth,
          _o4 = Math.floor(_t33 / e.cols) * e.cellHeight,
          _s7 = f.keyframes[r];

      _s7 && (i = r, f.updateSkin(_s7.joints)), f.renderTo(n, {
        frame: f.keyframes[r] ? r : i,
        position: {
          x: _a9,
          y: _o4
        },
        showSkin: e.showSkin,
        showBones: e.showBones
      });
    }

    var a = t.toDataURL("image/png"),
        o = document.createElement("a");
    o.download = e.name, o.href = a, o.click();
  }), s.on("exportFrames", function (e) {
    var t = o.query("#exportFrames");
    t.text("Processing...", !0), t.addClass("disabled");
    var i = 0,
        r = 0;
    var a = new ZIP({
      start: function start(o) {
        var s;

        var _loop9 = function _loop9() {
          var h = document.createElement("canvas");
          h.width = e.frameWidth, h.height = e.frameHeight;
          var c = h.getContext("2d"),
              d = l - e.start + 1,
              u = f.keyframes[l];
          u && (s = l, f.updateSkin(u.joints)), f.renderTo(c, {
            frame: f.keyframes[l] ? l : s,
            showSkin: e.showSkin,
            showBones: e.showBones
          }), h.toBlob(function (s) {
            var l = {
              name: "frames/".concat(d, ".png"),
              stream: function stream() {
                return s.stream();
              }
            };

            if (o.enqueue(l), i++, r += s.size, i >= e.totalFrames) {
              o.close();

              var _i26 = n.createWriteStream(e.name + ".zip", {
                size: r
              });

              a.pipeTo(_i26), t.text("Export", !0), t.removeClass("disabled");
            }
          }, "image/png");
        };

        for (var l = e.start - 1; l <= e.end - 1; l++) {
          _loop9();
        }
      }
    });
  }), s.on("exportGIF", function (e) {
    var t = o.query("#exportGIF");
    t.text("Processing...", !0), t.addClass("disabled");
    var i = new GIF({
      workers: 4,
      quality: 10,
      repeat: 0,
      width: e.width,
      height: e.height,
      dither: !0,
      workerScript: "lib/gif.worker.js"
    });
    var r;

    for (var a = e.start - 1; a <= e.end - 1; a++) {
      var _t34 = document.createElement("canvas");

      _t34.width = e.width, _t34.height = e.height;

      var _n28 = _t34.getContext("2d"),
          _o5 = f.keyframes[a];

      _o5 && (r = a, f.updateSkin(_o5.joints)), _n28.fillStyle = e.background, _n28.fillRect(0, 0, _t34.width, _t34.height), f.renderTo(_n28, {
        frame: f.keyframes[a] ? a : r,
        showSkin: e.showSkin,
        showBones: e.showBones
      }), i.addFrame(_t34, {
        delay: 1e3 / p.timeline.app.animationSpeed
      });
    }

    i.render(), i.on("finished", function (r) {
      try {
        i.abort(), t.text("Export", !0), t.removeClass("disabled");

        var _a10 = n.createWriteStream(e.name + ".gif", {
          size: r.size
        }),
            _o6 = r.stream();

        if (window.WritableStream && _o6.pipeTo) return _o6.pipeTo(_a10);
      } catch (e) {
        console.warn(e);
      }
    });
  }), s.on("changeRiggingMode", function (e) {
    switch (W.removeClass("selected"), e) {
      case "linear":
        o.query("#riggingMode #linear").addClass("selected"), u.riggingMode = "linear";
        break;

      case "inverse":
        o.query("#riggingMode #inverseKinematics").addClass("selected"), u.riggingMode = "inverseKinematics";
        break;

      case "forward":
        o.query("#riggingMode #forwardKinematics").addClass("selected"), u.riggingMode = "forwardKinematics";
    }
  });
  var W = o.query("#riggingMode button", !0);
  W.on("click", function (e) {
    s.emit("changeRiggingMode", e.target.dataset.mode);
  });
  var $ = o.query("#autoAddKeyframe");
  $.on("click", function () {
    $.toggleClass("selected"), $.hasClass("selected") ? u.animation.autoAddKeyframe = !0 : u.animation.autoAddKeyframe = !1;
  }), o.query("#focusRig").on("click", function () {
    if (f.bounds) {
      if (!f.joints.length) return;
      S.x = (f.bounds.min.x + f.bounds.max.x) / 2, S.y = (f.bounds.min.y + f.bounds.max.y) / 2;
    }
  });
  var X = o.query("#displayCropApp");

  function V(e, t) {
    var i = o.create("div");
    i.addClass("joint");
    var n = i.create("button");
    n.addClass("name", "darko-d"), n.create("img").attr("src", "assets/svg/joint.svg"), n.create("p").text(t), i.create("div").addClass("children"), i.attr("id", e), o.query("#jointApp button.name.active", !0).removeClass("active");
    var r = f.joints.find(function (t) {
      return t.id === e;
    });
    r && f.activeJoint == r && n.addClass("active");
    var a = o.query("#jointApp");
    return a.node.scrollTop = a.node.scrollHeight, a.node.scrollLeft = a.node.scrollWidth, n.on("click", function () {
      if (!n.hasClass("active")) {
        o.query("#jointApp button.name.active").removeClass("active"), n.addClass("active");

        var _t35 = f.joints.find(function (t) {
          return t.id === e;
        });

        _t35 && f.selectJoint(_t35.position.x, _t35.position.y);
      }

      p.timeline.graph.state.isPlaying && p.timeline.graph.stop(), v = "joints";
    }), n.on("dblclick", function () {
      S.set(f.activeJoint.position);
    }), i;
  }

  function G(e) {
    var t = o.query("#propertyApp");

    if (e) {
      p.timeline.graph.state.isPlaying || t.removeClass("disabled");

      var _i27 = t.query("#jointName"),
          _n29 = t.query("#jointLength"),
          _r17 = t.query("#jointZIndex");

      _i27.value(e.name), _n29.value(e.length.toFixed(2)), _r17.value(parseInt(e.zIndex)), _r17.node._lastValue || (_r17.node._lastValue = _r17.value()), _i27.node._lastValue || (_i27.node._lastValue = _i27.value());

      var _a11 = t.query("#jointX"),
          _s8 = t.query("#jointY"),
          _l4 = t.query("#jointAngle");

      _a11.value(e.position.x.toFixed(2)), _s8.value(e.position.y.toFixed(2));

      var _h4 = d.degrees(d.map(e.angle, -Math.PI, Math.PI, 0, 2 * Math.PI));

      if (_l4.value(_h4.toFixed(2)), e.skin && (e.skin.imageSrc ? X.removeClass("disabled") : X.addClass("disabled"), e.skin.offset)) {
        var _t36 = o.query("#skinPositionX"),
            _i28 = o.query("#skinPositionY"),
            _n30 = o.query("#skinScaleX"),
            _r18 = o.query("#skinScaleY"),
            _a12 = o.query("#skinAngle");

        _t36.value(e.skin.offset.x.toFixed(2)), _i28.value(e.skin.offset.y.toFixed(2)), _n30.value(e.skin.offset.scaleX.toFixed(2)), _r18.value(e.skin.offset.scaleY.toFixed(2));

        var _s9 = d.degrees(e.skin.offset.angle);

        _a12.value(_s9.toFixed(2)), _t36.node._lastValue || (_t36.node._lastValue = _t36.value()), _i28.node._lastValue || (_i28.node._lastValue = _i28.value()), _n30.node._lastValue || (_n30.node._lastValue = _n30.value()), _r18.node._lastValue || (_r18.node._lastValue = _r18.value()), _a12.node._lastValue || (_a12.node._lastValue = _a12.value());
      }
    } else t.addClass("disabled");
  }

  var Z;
  X.on("click", function () {
    var e = f.activeJoint;

    if (e && e.skin && e.skin.imageSrc) {
      var _t37 = new Image();

      _t37.src = e.skin.imageSrc, _t37.onload = function () {
        e.skin._vueCrop && (p.cropApp.cropFrom = e.skin._vueCrop.from, p.cropApp.cropTo = e.skin._vueCrop.to), p.cropApp.show(_t37), y = e;
      };
    }
  }), o.query("#removeSkin").on("click", function () {
    var e = f.activeJoint;

    if (e && e.skin && e.skin.imageSrc) {
      var _t38 = JSON.parse(JSON.stringify(e.skin));

      delete _t38.imageSrc, delete _t38.image, f.editJoint(e.id, {
        skin: _t38
      }), g.add({
        label: "Remove joint skin",
        value: f.clone(),
        group: "keyframe"
      });
    }
  }), o.query("#resetOffset").on("click", function () {
    var e = f.activeJoint;

    if (e && e.skin && e.skin.offset && (0 != e.skin.offset.x || 0 != e.skin.offset.y || 1 != e.skin.offset.scaleX || 1 != e.skin.offset.scaleY || 0 != e.skin.offset.angle)) {
      var _t39 = JSON.parse(JSON.stringify(e.skin));

      _t39.offset.x = 0, _t39.offset.y = 0, _t39.offset.scaleX = 1, _t39.offset.scaleY = 1, _t39.offset.angle = 0, f.editJoint(e.id, {
        skin: _t39
      }, !0), G(e), g.add({
        label: "Reset transform offset",
        value: f.clone(),
        group: "keyframe"
      }), f.updateSkin(), f.updateBounds();
    }
  }), s.on("crop", function (e, t) {
    f.editJoints(function (i, n) {
      i.id === y.id && (i.skin.crop = JSON.parse(JSON.stringify(e)), i.skin._vueCrop = {
        from: {
          x: t.from.x,
          y: t.from.y
        },
        to: {
          x: t.to.x,
          y: t.to.y
        }
      }, f.updateSkin(n.joints));
    }), f.updateSubKeyframes(), f.updateBounds(), g.add({
      label: "Crop skin",
      value: f.clone(),
      group: "keyframe"
    });
  }), s.on("materialChange", function (e) {
    var t = f.activeJoint;
    e ? (X.removeClass("disabled"), d.loadImage(e).then(function (e) {
      if (t) {
        var _i29 = parseFloat(o.query("#skinPositionX").value()),
            _n31 = parseFloat(o.query("#skinPositionY").value()),
            _r19 = parseFloat(o.query("#skinScaleX").value()),
            _a13 = parseFloat(o.query("#skinScaleY").value()),
            _s10 = parseFloat(o.query("#skinAngle").value()),
            _l5 = {
          from: {
            x: 0,
            y: 0
          },
          to: {
            x: e.width,
            y: e.height
          }
        };

        t.skin && (t.skin.crop && (_l5.from.x = t.skin.crop.from.x, _l5.from.y = t.skin.crop.from.y, _l5.to.x = t.skin.crop.to.x, _l5.to.y = t.skin.crop.to.y), t.skin.offset = {
          x: _i29 || 0,
          y: _n31 || 0,
          scaleX: _r19 || 0,
          scaleY: _a13 || 0,
          angle: d.radians(d.map(_s10, 0, 360, -180, 180)) + Math.PI || 0
        }), f.editJoints(function (i, n) {
          if (i.id === t.id) {
            i.skin.imageSrc = e.url, i.skin.image = new Image(), i.skin.image.src = e.url, i.skin.crop = JSON.parse(JSON.stringify(_l5));
            var _r20 = t.skin._vueCrop;
            "object" == _typeof(_r20) && _r20 && (i.skin._vueCrop = JSON.parse(JSON.stringify(_r20)) || null), f.updateSkin(n.joints);
          }
        }), f.updateSubKeyframes(), f.updateBounds(), g.add({
          label: "Change skin",
          value: f.clone(),
          group: "keyframe"
        });
      }
    })) : X.addClass("disabled");
  }), s.on("timelineSeeked", function () {
    if (p.timeline.graph.state.isPlaying) return;
    var e = f.activeJoint;
    e && G(e), s.emit("jointChange", f.joints), v = "timeline";
  }), s.on("jointChange", function (e) {
    e = e || f.joints;
    var t = o.query("#jointApp");

    for (var i = 0; i < e.length; i++) {
      var _n32 = e[i];

      if (!t.query("#" + _n32.id).node) {
        var _e60 = V(_n32.id, _n32.name);

        t.append(_e60);
      }
    }

    var n = o.query("#jointApp > *", !0);

    var _loop10 = function _loop10() {
      var t = n.elements[i],
          r = e.find(function (e) {
        return e.id === t.node.id;
      });

      if (r && r.parent) {
        o.query("#" + r.parent.id + " > .children").append(t);
      }
    };

    for (i = 0; i < n.elements.length; i++) {
      _loop10();
    }

    var r = o.query("#jointApp .joint", !0);

    var _loop11 = function _loop11() {
      var e = r.elements[i],
          t = f.joints.find(function (t) {
        return t.id === e.node.id;
      });
      if (t) e.node.id === f.activeJoint.id ? e.query("button.name", !0).addClass("active") : e.query("button.name.active", !0).removeClass("active"), e.query("button.name").text(t.name, !0);else {
        var _t40 = o.query(e.node.parentNode.parentNode);

        if (_t40) {
          var _i30;

          _i30 = _t40.hasClass("joint") ? o.query("#" + _t40.node.id + " > .children") : o.query("#jointApp");

          var _n33 = o.query("#" + e.node.id + " > .children > .joint", !0);

          _i30.append(_n33);
        }

        e.remove();
      }
    };

    for (i = 0; i < r.elements.length; i++) {
      _loop11();
    }

    G(f.activeJoint), f.activeJoint && (f.activeJoint.parent ? (o.query(o.query("#jointAngle").node.parentNode).css("display", "flex"), o.query(o.query("#jointLength").node.parentNode).css("display", "flex"), o.query(".section.skinning", !0).css("display", "flex")) : (o.query(o.query("#jointAngle").node.parentNode).css("display", "none"), o.query(o.query("#jointLength").node.parentNode).css("display", "none"), o.query(".section.skinning").css("display", "none")));
  }), s.on("jointNameInputChange", function (e) {
    var t = f.activeJoint;

    if (t) {
      var _i31 = o.query("#jointName").value();

      t.name = _i31, f.editJoint(t.id, {
        name: _i31
      }), s.emit("jointChange"), e || g.add({
        label: "Change joint name",
        value: f.clone(),
        group: "keyframe"
      });
    }
  }), s.on("jointZIndexInputChange", function (e) {
    var t = f.activeJoint;

    if (t) {
      var _i32 = o.query("#jointZIndex").value();

      t.zIndex = _i32, f.editJoint(t.id, {
        zIndex: _i32
      }), s.emit("jointChange"), e || g.add({
        label: "Change joint Z-Index",
        value: f.clone(),
        group: "keyframe"
      });
    }
  }), s.on("jointSkinningInputChange", function (e) {
    var t = f.activeJoint;

    if (t) {
      var _i33 = t.skin,
          _n34 = parseFloat(o.query("#skinPositionX").value()),
          _r21 = parseFloat(o.query("#skinPositionY").value()),
          _a14 = parseFloat(o.query("#skinScaleX").value()),
          _s11 = parseFloat(o.query("#skinScaleY").value()),
          _l6 = parseFloat(o.query("#skinAngle").value());

      _i33.offset = {
        x: _n34,
        y: _r21,
        scaleX: _a14,
        scaleY: _s11,
        angle: d.radians(d.map(_l6, 0, 360, -180, 180)) + Math.PI
      }, u.animateSkin || f.editJoint(t.id, {
        skin: _i33
      }, !0), e || g.add({
        label: "Change skin offset",
        value: f.clone(),
        group: "keyframe"
      }), f.updateSubKeyframes(), f.updateBounds();
    }
  }), s.on("jointPositionInputChange", function () {
    if (f.activeJoint) {
      var _e61 = parseFloat(o.query("#jointX").value()) || 0,
          _t41 = parseFloat(o.query("#jointY").value()) || 0;

      f.moveJoint(_e61, _t41);
    }
  }), s.on("jointAngleInputChange", function () {
    var e = f.activeJoint;

    if (e && e.parent) {
      var _t42 = parseFloat(o.query("#jointAngle").value()) || 0;

      _t42 = d.radians(d.map(_t42, 0, 360, -180, 180));

      var _i34 = e.parent.position.x - Math.cos(_t42) * e.length,
          _n35 = e.parent.position.y - Math.sin(_t42) * e.length;

      f.moveJoint(_i34, _n35);
    }
  }), s.on("jointLengthInputChange", function () {
    var e = f.activeJoint;

    if (e) {
      var _t43 = parseFloat(o.query("#jointLength").value()) || 0;

      e.length = _t43, f.moveJoint(e.position.x, e.position.y);
    }
  }), s.on("undo", function () {
    var e = g.getPrevious();
    if (!e) return;
    "keyframe" == e.group && (f["import"](e.value), g.backward(), p.timeline.graph.updateState(), p.timeline.graph.redraw(), G(f.activeJoint)), o.query(".history.current", !0).removeClass("current");
    var t = o.query("#" + e.id);
    t.addClass("current"), o.query("#historyApp").node.scrollTop = t.node.offsetTop;
  }), s.on("redo", function () {
    var e = g.getNext();
    if (!e) return;
    "keyframe" == e.group && (f["import"](e.value), g.forward(), p.timeline.graph.updateState(), p.timeline.graph.redraw(), G(f.activeJoint)), o.query(".history.current", !0).removeClass("current");
    var t = o.query("#" + e.id);
    t.addClass("current"), o.query("#historyApp").node.scrollTop = t.node.offsetTop;
  }), s.on("historyChange", function () {
    if (g.eventCount % u.autosave.threshold == 0) {
      var _e62 = f.toJSON(null, !0);

      localStorage.setItem(u.autosave.label, JSON.stringify(_e62));
    }

    var e = o.query("#historyApp .history", !0);

    var _loop12 = function _loop12() {
      var i = e.elements[t].node;
      g.events.find(function (e) {
        return e.id === i.id;
      }) || i.remove();
    };

    for (var t = 0; t < e.elements.length; t++) {
      _loop12();
    }

    !function (e) {
      var t = o.query("#historyApp");
      t.query(".history.current", !0).removeClass("current");
      var i = t.create("div");
      i.attr("id", e.id), i.addClass("history", "current"), i.create("p").text(e.label), t.node.scrollTop = t.node.scrollHeight, i.on("click", function () {
        "keyframe" == e.group && (t.query(".history.current", !0).removeClass("current"), i.addClass("current"), g.jump(e.id), f["import"](e.value), p.timeline.graph.updateState(), p.timeline.graph.redraw(), G(f.activeJoint), p.timeline.graph.state.isPlaying && p.timeline.graph.stop());
      });
    }(g.getLatest());
  }), d.loadJSONData(u.autosave.label, function (e) {
    f["import"](f.fromJSON(e)), g.add({
      label: "Load autosave",
      value: f.clone(),
      group: "keyframe"
    });
  }), s.on("clearJoints", function () {
    f.joints.length && o.query("#jointApp *").remove(), f.reset(), o.query("#propertyApp").addClass("disabled");
  }), s.on("resetTimeline", function () {
    document.getElementById("frameCount").value = 30, document.getElementById("animationSpeed").value = 30, p.timeline.app.fixData(), p.timeline.graph.scrollbar.left = 0, p.timeline.graph.scrollbar.right = p.timeline.graph.canvas.width, p.timeline.graph.scrollbar.width = p.timeline.graph.canvas.width, p.timeline.graph.setCurrentMark(0), p.timeline.graph.playbackHandle.start.mark = 0, p.timeline.graph.playbackHandle.start._x = p.timeline.graph.markToX(p.timeline.graph.playbackHandle.start.mark), p.timeline.graph.playbackHandle.end.mark = p.timeline.app.totalFrames - 1, p.timeline.graph.playbackHandle.end._x = p.timeline.graph.markToX(p.timeline.graph.playbackHandle.end.mark), p.timeline.graph.redraw();
  }), s.on("resetCamera", function () {
    E.reset(), S.reset(), w = u.world.zoom;
  }), s.on("deleteKeyframe", function () {
    var e = f.getKeyframe("index", p.timeline.graph.state.currentFrame);
    e && ("head" != e.type || e.locked || (f.deleteKeyframe(e.id), g.add({
      label: "Delete keyframe",
      value: f.clone(),
      group: "keyframe"
    })));
  }), s.on("renderSleep", function () {
    k = !0;
  }), s.on("renderFocus", function () {
    k = !1;
  }), o.query("#fileButton").on("mouseup", function () {
    var e = p.fileApp;
    e.hidden && e.show(h.x + 5, h.y + 5);
  }), o.query("#optionButton").on("mouseup", function () {
    var e = p.optionApp;
    e.hidden && e.show(h.x + 5, h.y + 5);
  }), c.on("keydown", function (e) {
    var t = j[C[e.code]];
    if (t && (q(t), I = t), e.ctrlKey && (90 == e.keyCode && s.emit("undo"), 89 == e.keyCode && s.emit("redo")), e.shiftKey && I == j.add && f.activeJoint && (x || (x = f.activeJoint)), 32 == e.keyCode && I != j.pan && (Z = I, q(j.pan)), 46 == e.keyCode) if ("joints" == v) {
      var _e63 = f.activeJoint;
      _e63 && f.removeJointById(_e63.id);
    } else "timeline" == v && s.emit("deleteKeyframe");
  }), c.on("keyup", function (e) {
    x && (x = null), Z && (q(Z), Z = void 0);
  }), h.on("mouseup", function () {
    if (f._moved) {
      g.add({
        label: "Move joint",
        value: f.clone(),
        group: "keyframe"
      }), G(f.activeJoint), f._moved = !1;
    }
  }), h.on("mousedown", function () {
    p.fileApp.hide(), p.optionApp.hide(), p.contextMenuApp.hide(), L.css("display", "none");
  }), h.on("mousemove", function () {
    h.dragged || E.set(A), h.x <= a.bounds.x || h.x >= a.bounds.x + a.bounds.width || h.y <= a.bounds.y || h.y >= a.bounds.y + a.bounds.height ? Q.css("display", "none") : Q.css({
      display: "block",
      top: h.y - 10 + "px",
      left: h.x + 9 + "px"
    });
  });
  var Q = o.query("#actionPreview");

  function ee() {
    var e = o.query("#toolApp"),
        t = o.query(".canvas-container"),
        i = o.query("#navigation"),
        n = t.node.offsetWidth - 1 - e.node.offsetWidth,
        r = innerHeight - i.node.offsetHeight - p.timeline.app.$el.offsetHeight;
    a.setSize(n, r);
  }

  a.canvas.addEventListener("mousemove", function (e) {
    h.dragged && !k && I === j.pan && (S.set({
      x: E.x - A.x + a.camera.movement.x,
      y: E.y - A.y + a.camera.movement.y
    }), S.x = d.clamp(S.x, -9e3, 9e3), S.y = d.clamp(S.y, -9e3, 9e3)), I !== j.move || k || h.pressed && (v = "joints", f.moveJoint(A.x, A.y));
  }), a.canvas.addEventListener("click", function () {
    if (p.overlayApp.hidden && p.overlayConfigApp.hidden && p.fileApp.hidden && p.loadApp.hidden && p.saveApp.hidden && p.optionApp.hidden) {
      if (I == j.add) {
        if (x) {
          var _e64 = f.activeJoint.position.x - A.x + x.position.x,
              _t44 = f.addJoint(_e64, A.y, {
            parent: x,
            ignoreHistory: !0,
            ignoreDefaults: !0
          });

          x = _t44;
        }

        f.addJoint(A.x, A.y), v = "joints";
      }

      I === j.remove && (f.selectJoint(A.x, A.y), f.removeJointByPosition(A.x, A.y), v = "joints"), I === j.select && (f.selectJoint(A.x, A.y), v = "joints");
    }
  }), a.canvas.addEventListener("mousewheel", function () {
    h.scrollTop ? w -= 100 : w += 100, w = d.clamp(w, u.world.minZoom, u.world.maxZoom);
  }), window.dom = o, addEventListener("resize", function () {
    ee(), p.fileApp.hide(), p.optionApp.hide(), p.contextMenuApp.hide();
  }), ee(), a.camera.setZoomSpeed(.2), a.camera.setMoveSpeed(.6);
  var te = o.query("#showBounds"),
      ie = o.query("#showGrid");
  a.draw(function () {
    var e = p.overlayApp.hidden && p.overlayConfigApp.hidden && p.fileApp.hidden && p.loadApp.hidden && p.saveApp.hidden && p.optionApp.hidden;
    A.set(a.camera.screenToWorld(h.x - a.bounds.x, h.y - a.bounds.y)), a.rect(0, 0, a.bounds.width, a.bounds.height, {
      fill: u.world.background
    }), a.camera.begin(function () {
      a.camera.moveTo(S.x, S.y), a.camera.zoomTo(w);
      var t = new Array(p.overlayConfigApp.start - 1),
          i = p.overlayConfigApp.trimStart - 1,
          n = p.overlayConfigApp.trimEnd - 1,
          r = D.slice(0).splice(i, n - i),
          o = t.concat(r)[p.timeline.graph.state.currentMark];

      if (o && (a.save(), a.context.globalAlpha = p.overlayConfigApp.opacity, a.context.scale(p.overlayConfigApp.scale, p.overlayConfigApp.scale), a.context.rotate(p.overlayConfigApp.angle), a.context.drawImage(o, -o.width / 2, -o.height / 2), a.restore()), e && I === j.add) {
        var _e65 = "rgba(240, 230, 255, 0.75)";
        a.save(), a.context.globalCompositeOperation = "overlay";
        var _t45 = f.activeJoint;

        if (_t45 && (a.line(A.x, A.y, _t45.position.x, _t45.position.y, {
          lineWidth: u.render.segment.width,
          lineCap: "round",
          stroke: _e65
        }), x)) {
          var _i35 = _t45.position.x - A.x + x.position.x;

          a.line(_i35, A.y, x.position.x, x.position.y, {
            lineWidth: u.render.segment.width,
            lineCap: "round",
            stroke: _e65
          }), a.circle(_i35, A.y, u.render.joint.radius, {
            fill: _e65
          });
        }

        a.circle(A.x, A.y, u.render.joint.radius, {
          fill: _e65
        }), a.restore();
      }

      if (ie.prop("checked")) {
        var _e66 = 1e4,
            _t46 = 20;

        for (var s = -w - _e66; s < w + _e66; s += _t46) {
          a.line(s, a.camera.viewport.top - _e66, s, a.camera.viewport.bottom + _e66, {
            stroke: "rgba(240, 230, 250, 0.2)",
            lineWidth: .2
          });
        }

        for (var l = -w - _e66; l < w + _e66; l += _t46) {
          a.line(a.camera.viewport.left - _e66, l, a.camera.viewport.right + _e66, l, {
            stroke: "rgba(240, 230, 250, 0.2)",
            lineWidth: .2
          });
        }
      }

      if (te.prop("checked")) {
        var _e67 = "rgba(225, 50, 255, 0.5)",
            _t47 = f.bounds.max.x - f.bounds.min.x,
            _i36 = f.bounds.max.y - f.bounds.min.y,
            _n36 = parseInt(_t47) + "x" + parseInt(_i36);

        a.text(_n36, f.bounds.min.x, f.bounds.min.y, {
          align: "left bottom",
          font: "10px Consolas",
          fill: _e67
        }), a.rect(f.bounds.min.x, f.bounds.min.y, _t47, _i36, {
          lineWidth: .35,
          stroke: _e67
        });
      }

      f.render(a);
    });
  }), a.render(function () {
    a.redraw();
  }), c.on("keyup", function () {
    16 === c.code && (console.log(g), console.log(f), console.log(D));
  });
}, function (e, t, i) {
  var _this20 = this;

  var n;
  n = function n() {
    "use strict";

    var e = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : _this20;
    e.HTMLElement || console.warn("streamsaver is meant to run on browsers main thread");
    var t = null,
        i = !1;
    var n = e.WebStreamsPolyfill || {},
        r = e.isSecureContext;
    var a = /constructor/i.test(e.HTMLElement) || !!e.safari || !!e.WebKitPoint;
    var o = r || "MozAppearance" in document.documentElement.style ? "iframe" : "navigate",
        s = {
      createWriteStream: function createWriteStream(n, h, c) {
        var _ref2;

        var d = {
          size: null,
          pathname: null,
          writableStrategy: void 0,
          readableStrategy: void 0
        },
            u = 0,
            p = null,
            f = null,
            g = null;

        if (Number.isFinite(h) ? ((_ref2 = [h, c], c = _ref2[0], h = _ref2[1], _ref2), console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), d.size = c, d.writableStrategy = h) : h && h.highWaterMark ? (console.warn("[StreamSaver] Depricated pass an object as 2nd argument when creating a write stream"), d.size = c, d.writableStrategy = h) : d = h || {}, !a) {
          var _t49;

          t || (t = r ? l(s.mitm) : function (t) {
            var i = document.createDocumentFragment(),
                n = {
              frame: e.open(t, "popup", "width=200,height=100"),
              loaded: !1,
              isIframe: !1,
              isPopup: !0,
              remove: function remove() {
                n.frame.close();
              },
              addEventListener: function addEventListener() {
                i.addEventListener.apply(i, arguments);
              },
              dispatchEvent: function dispatchEvent() {
                i.dispatchEvent.apply(i, arguments);
              },
              removeEventListener: function removeEventListener() {
                i.removeEventListener.apply(i, arguments);
              },
              postMessage: function postMessage() {
                var _n$frame;

                (_n$frame = n.frame).postMessage.apply(_n$frame, arguments);
              }
            },
                r = function r(t) {
              t.source === n.frame && (n.loaded = !0, e.removeEventListener("message", r), n.dispatchEvent(new Event("load")));
            };

            return e.addEventListener("message", r), n;
          }(s.mitm)), f = new MessageChannel(), n = encodeURIComponent(n.replace(/\//g, ":")).replace(/['()]/g, escape).replace(/\*/g, "%2A");
          var _a15 = {
            transferringReadable: i,
            pathname: d.pathname || Math.random().toString().slice(-6) + "/" + n,
            headers: {
              "Content-Type": "application/octet-stream; charset=utf-8",
              "Content-Disposition": "attachment; filename*=UTF-8''" + n
            }
          };
          d.size && (_a15.headers["Content-Length"] = d.size);
          var _h5 = [_a15, "*", [f.port2]];

          if (i) {
            var _e68 = "iframe" === o ? void 0 : {
              transform: function transform(e, t) {
                if (!(e instanceof Uint8Array)) throw new TypeError("Can only wirte Uint8Arrays");
                u += e.length, t.enqueue(e), p && (location.href = p, p = null);
              },
              flush: function flush() {
                p && (location.href = p);
              }
            };

            g = new s.TransformStream(_e68, d.writableStrategy, d.readableStrategy);
            var _t48 = g.readable;
            f.port1.postMessage({
              readableStream: _t48
            }, [_t48]);
          }

          f.port1.onmessage = function (e) {
            e.data.download && ("navigate" === o ? (t.remove(), t = null, u ? location.href = e.data.download : p = e.data.download) : (t.isPopup && (t.remove(), t = null, "iframe" === o && l(s.mitm)), l(e.data.download)));
          }, t.loaded ? (_t49 = t).postMessage.apply(_t49, _h5) : t.addEventListener("load", function () {
            var _t50;

            (_t50 = t).postMessage.apply(_t50, _h5);
          }, {
            once: !0
          });
        }

        var m = [];
        return !a && g && g.writable || new s.WritableStream({
          write: function write(e) {
            if (!(e instanceof Uint8Array)) throw new TypeError("Can only wirte Uint8Arrays");
            a ? m.push(e) : (f.port1.postMessage(e), u += e.length, p && (location.href = p, p = null));
          },
          close: function close() {
            if (a) {
              var _e69 = new Blob(m, {
                type: "application/octet-stream; charset=utf-8"
              }),
                  _t51 = document.createElement("a");

              _t51.href = URL.createObjectURL(_e69), _t51.download = n, _t51.click();
            } else f.port1.postMessage("end");
          },
          abort: function abort() {
            m = [], f.port1.postMessage("abort"), f.port1.onmessage = null, f.port1.close(), f.port2.close(), f = null;
          }
        }, d.writableStrategy);
      },
      WritableStream: e.WritableStream || n.WritableStream,
      supported: !0,
      version: {
        full: "2.0.5",
        major: 2,
        minor: 0,
        dot: 5
      },
      mitm: "https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"
    };

    function l(e) {
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
      new Response(new ReadableStream()), r && !("serviceWorker" in navigator) && (a = !0);
    } catch (e) {
      a = !0;
    }

    return function (e) {
      try {
        e();
      } catch (e) {}
    }(function () {
      var _TransformStream = new TransformStream(),
          e = _TransformStream.readable,
          t = new MessageChannel();

      t.port1.postMessage(e, [e]), t.port1.close(), t.port2.close(), i = !0, Object.defineProperty(s, "TransformStream", {
        configurable: !1,
        writable: !1,
        value: TransformStream
      });
    }), s;
  }, e.exports = n();
}, function (e, t, i) {
  "use strict";

  (function (e) {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <http://feross.org>
     * @license  MIT
     */
    var n = i(25),
        r = i(26),
        a = i(27);

    function o() {
      return l.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }

    function s(e, t) {
      if (o() < t) throw new RangeError("Invalid typed array length");
      return l.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = l.prototype : (null === e && (e = new l(t)), e.length = t), e;
    }

    function l(e, t, i) {
      if (!(l.TYPED_ARRAY_SUPPORT || this instanceof l)) return new l(e, t, i);

      if ("number" == typeof e) {
        if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
        return d(this, e);
      }

      return h(this, e, t, i);
    }

    function h(e, t, i, n) {
      if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
      return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, i, n) {
        if (t.byteLength, i < 0 || t.byteLength < i) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < i + (n || 0)) throw new RangeError("'length' is out of bounds");
        t = void 0 === i && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, i) : new Uint8Array(t, i, n);
        l.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = l.prototype : e = u(e, t);
        return e;
      }(e, t, i, n) : "string" == typeof t ? function (e, t, i) {
        "string" == typeof i && "" !== i || (i = "utf8");
        if (!l.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
        var n = 0 | f(t, i),
            r = (e = s(e, n)).write(t, i);
        r !== n && (e = e.slice(0, r));
        return e;
      }(e, t, i) : function (e, t) {
        if (l.isBuffer(t)) {
          var i = 0 | p(t.length);
          return 0 === (e = s(e, i)).length || t.copy(e, 0, 0, i), e;
        }

        if (t) {
          if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (n = t.length) != n ? s(e, 0) : u(e, t);
          if ("Buffer" === t.type && a(t.data)) return u(e, t.data);
        }

        var n;
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }(e, t);
    }

    function c(e) {
      if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
      if (e < 0) throw new RangeError('"size" argument must not be negative');
    }

    function d(e, t) {
      if (c(t), e = s(e, t < 0 ? 0 : 0 | p(t)), !l.TYPED_ARRAY_SUPPORT) for (var i = 0; i < t; ++i) {
        e[i] = 0;
      }
      return e;
    }

    function u(e, t) {
      var i = t.length < 0 ? 0 : 0 | p(t.length);
      e = s(e, i);

      for (var n = 0; n < i; n += 1) {
        e[n] = 255 & t[n];
      }

      return e;
    }

    function p(e) {
      if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
      return 0 | e;
    }

    function f(e, t) {
      if (l.isBuffer(e)) return e.length;
      if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
      "string" != typeof e && (e = "" + e);
      var i = e.length;
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
            return L(e).length;

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * i;

          case "hex":
            return i >>> 1;

          case "base64":
            return H(e).length;

          default:
            if (n) return L(e).length;
            t = ("" + t).toLowerCase(), n = !0;
        }
      }
    }

    function g(e, t, i) {
      var n = !1;
      if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
      if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
      if ((i >>>= 0) <= (t >>>= 0)) return "";

      for (e || (e = "utf8");;) {
        switch (e) {
          case "hex":
            return I(this, t, i);

          case "utf8":
          case "utf-8":
            return j(this, t, i);

          case "ascii":
            return C(this, t, i);

          case "latin1":
          case "binary":
            return T(this, t, i);

          case "base64":
            return A(this, t, i);

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return M(this, t, i);

          default:
            if (n) throw new TypeError("Unknown encoding: " + e);
            e = (e + "").toLowerCase(), n = !0;
        }
      }
    }

    function m(e, t, i) {
      var n = e[t];
      e[t] = e[i], e[i] = n;
    }

    function y(e, t, i, n, r) {
      if (0 === e.length) return -1;

      if ("string" == typeof i ? (n = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, isNaN(i) && (i = r ? 0 : e.length - 1), i < 0 && (i = e.length + i), i >= e.length) {
        if (r) return -1;
        i = e.length - 1;
      } else if (i < 0) {
        if (!r) return -1;
        i = 0;
      }

      if ("string" == typeof t && (t = l.from(t, n)), l.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, i, n, r);
      if ("number" == typeof t) return t &= 255, l.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(e, t, i) : Uint8Array.prototype.lastIndexOf.call(e, t, i) : v(e, [t], i, n, r);
      throw new TypeError("val must be string, number or Buffer");
    }

    function v(e, t, i, n, r) {
      var a,
          o = 1,
          s = e.length,
          l = t.length;

      if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
        if (e.length < 2 || t.length < 2) return -1;
        o = 2, s /= 2, l /= 2, i /= 2;
      }

      function h(e, t) {
        return 1 === o ? e[t] : e.readUInt16BE(t * o);
      }

      if (r) {
        var c = -1;

        for (a = i; a < s; a++) {
          if (h(e, a) === h(t, -1 === c ? 0 : a - c)) {
            if (-1 === c && (c = a), a - c + 1 === l) return c * o;
          } else -1 !== c && (a -= a - c), c = -1;
        }
      } else for (i + l > s && (i = s - l), a = i; a >= 0; a--) {
        for (var d = !0, u = 0; u < l; u++) {
          if (h(e, a + u) !== h(t, u)) {
            d = !1;
            break;
          }
        }

        if (d) return a;
      }

      return -1;
    }

    function b(e, t, i, n) {
      i = Number(i) || 0;
      var r = e.length - i;
      n ? (n = Number(n)) > r && (n = r) : n = r;
      var a = t.length;
      if (a % 2 != 0) throw new TypeError("Invalid hex string");
      n > a / 2 && (n = a / 2);

      for (var o = 0; o < n; ++o) {
        var s = parseInt(t.substr(2 * o, 2), 16);
        if (isNaN(s)) return o;
        e[i + o] = s;
      }

      return o;
    }

    function k(e, t, i, n) {
      return D(L(t, e.length - i), e, i, n);
    }

    function x(e, t, i, n) {
      return D(function (e) {
        for (var t = [], i = 0; i < e.length; ++i) {
          t.push(255 & e.charCodeAt(i));
        }

        return t;
      }(t), e, i, n);
    }

    function w(e, t, i, n) {
      return x(e, t, i, n);
    }

    function S(e, t, i, n) {
      return D(H(t), e, i, n);
    }

    function E(e, t, i, n) {
      return D(function (e, t) {
        for (var i, n, r, a = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) {
          i = e.charCodeAt(o), n = i >> 8, r = i % 256, a.push(r), a.push(n);
        }

        return a;
      }(t, e.length - i), e, i, n);
    }

    function A(e, t, i) {
      return 0 === t && i === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, i));
    }

    function j(e, t, i) {
      i = Math.min(e.length, i);

      for (var n = [], r = t; r < i;) {
        var a,
            o,
            s,
            l,
            h = e[r],
            c = null,
            d = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
        if (r + d <= i) switch (d) {
          case 1:
            h < 128 && (c = h);
            break;

          case 2:
            128 == (192 & (a = e[r + 1])) && (l = (31 & h) << 6 | 63 & a) > 127 && (c = l);
            break;

          case 3:
            a = e[r + 1], o = e[r + 2], 128 == (192 & a) && 128 == (192 & o) && (l = (15 & h) << 12 | (63 & a) << 6 | 63 & o) > 2047 && (l < 55296 || l > 57343) && (c = l);
            break;

          case 4:
            a = e[r + 1], o = e[r + 2], s = e[r + 3], 128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && (l = (15 & h) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) > 65535 && l < 1114112 && (c = l);
        }
        null === c ? (c = 65533, d = 1) : c > 65535 && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), r += d;
      }

      return function (e) {
        var t = e.length;
        if (t <= 4096) return String.fromCharCode.apply(String, e);
        var i = "",
            n = 0;

        for (; n < t;) {
          i += String.fromCharCode.apply(String, e.slice(n, n += 4096));
        }

        return i;
      }(n);
    }

    t.Buffer = l, t.SlowBuffer = function (e) {
      +e != e && (e = 0);
      return l.alloc(+e);
    }, t.INSPECT_MAX_BYTES = 50, l.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function () {
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
    }(), t.kMaxLength = o(), l.poolSize = 8192, l._augment = function (e) {
      return e.__proto__ = l.prototype, e;
    }, l.from = function (e, t, i) {
      return h(null, e, t, i);
    }, l.TYPED_ARRAY_SUPPORT && (l.prototype.__proto__ = Uint8Array.prototype, l.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, {
      value: null,
      configurable: !0
    })), l.alloc = function (e, t, i) {
      return function (e, t, i, n) {
        return c(t), t <= 0 ? s(e, t) : void 0 !== i ? "string" == typeof n ? s(e, t).fill(i, n) : s(e, t).fill(i) : s(e, t);
      }(null, e, t, i);
    }, l.allocUnsafe = function (e) {
      return d(null, e);
    }, l.allocUnsafeSlow = function (e) {
      return d(null, e);
    }, l.isBuffer = function (e) {
      return !(null == e || !e._isBuffer);
    }, l.compare = function (e, t) {
      if (!l.isBuffer(e) || !l.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
      if (e === t) return 0;

      for (var i = e.length, n = t.length, r = 0, a = Math.min(i, n); r < a; ++r) {
        if (e[r] !== t[r]) {
          i = e[r], n = t[r];
          break;
        }
      }

      return i < n ? -1 : n < i ? 1 : 0;
    }, l.isEncoding = function (e) {
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
    }, l.concat = function (e, t) {
      if (!a(e)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e.length) return l.alloc(0);
      var i;
      if (void 0 === t) for (t = 0, i = 0; i < e.length; ++i) {
        t += e[i].length;
      }
      var n = l.allocUnsafe(t),
          r = 0;

      for (i = 0; i < e.length; ++i) {
        var o = e[i];
        if (!l.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
        o.copy(n, r), r += o.length;
      }

      return n;
    }, l.byteLength = f, l.prototype._isBuffer = !0, l.prototype.swap16 = function () {
      var e = this.length;
      if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

      for (var t = 0; t < e; t += 2) {
        m(this, t, t + 1);
      }

      return this;
    }, l.prototype.swap32 = function () {
      var e = this.length;
      if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

      for (var t = 0; t < e; t += 4) {
        m(this, t, t + 3), m(this, t + 1, t + 2);
      }

      return this;
    }, l.prototype.swap64 = function () {
      var e = this.length;
      if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

      for (var t = 0; t < e; t += 8) {
        m(this, t, t + 7), m(this, t + 1, t + 6), m(this, t + 2, t + 5), m(this, t + 3, t + 4);
      }

      return this;
    }, l.prototype.toString = function () {
      var e = 0 | this.length;
      return 0 === e ? "" : 0 === arguments.length ? j(this, 0, e) : g.apply(this, arguments);
    }, l.prototype.equals = function (e) {
      if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
      return this === e || 0 === l.compare(this, e);
    }, l.prototype.inspect = function () {
      var e = "",
          i = t.INSPECT_MAX_BYTES;
      return this.length > 0 && (e = this.toString("hex", 0, i).match(/.{2}/g).join(" "), this.length > i && (e += " ... ")), "<Buffer " + e + ">";
    }, l.prototype.compare = function (e, t, i, n, r) {
      if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
      if (void 0 === t && (t = 0), void 0 === i && (i = e ? e.length : 0), void 0 === n && (n = 0), void 0 === r && (r = this.length), t < 0 || i > e.length || n < 0 || r > this.length) throw new RangeError("out of range index");
      if (n >= r && t >= i) return 0;
      if (n >= r) return -1;
      if (t >= i) return 1;
      if (this === e) return 0;

      for (var a = (r >>>= 0) - (n >>>= 0), o = (i >>>= 0) - (t >>>= 0), s = Math.min(a, o), h = this.slice(n, r), c = e.slice(t, i), d = 0; d < s; ++d) {
        if (h[d] !== c[d]) {
          a = h[d], o = c[d];
          break;
        }
      }

      return a < o ? -1 : o < a ? 1 : 0;
    }, l.prototype.includes = function (e, t, i) {
      return -1 !== this.indexOf(e, t, i);
    }, l.prototype.indexOf = function (e, t, i) {
      return y(this, e, t, i, !0);
    }, l.prototype.lastIndexOf = function (e, t, i) {
      return y(this, e, t, i, !1);
    }, l.prototype.write = function (e, t, i, n) {
      if (void 0 === t) n = "utf8", i = this.length, t = 0;else if (void 0 === i && "string" == typeof t) n = t, i = this.length, t = 0;else {
        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        t |= 0, isFinite(i) ? (i |= 0, void 0 === n && (n = "utf8")) : (n = i, i = void 0);
      }
      var r = this.length - t;
      if ((void 0 === i || i > r) && (i = r), e.length > 0 && (i < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
      n || (n = "utf8");

      for (var a = !1;;) {
        switch (n) {
          case "hex":
            return b(this, e, t, i);

          case "utf8":
          case "utf-8":
            return k(this, e, t, i);

          case "ascii":
            return x(this, e, t, i);

          case "latin1":
          case "binary":
            return w(this, e, t, i);

          case "base64":
            return S(this, e, t, i);

          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return E(this, e, t, i);

          default:
            if (a) throw new TypeError("Unknown encoding: " + n);
            n = ("" + n).toLowerCase(), a = !0;
        }
      }
    }, l.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };

    function C(e, t, i) {
      var n = "";
      i = Math.min(e.length, i);

      for (var r = t; r < i; ++r) {
        n += String.fromCharCode(127 & e[r]);
      }

      return n;
    }

    function T(e, t, i) {
      var n = "";
      i = Math.min(e.length, i);

      for (var r = t; r < i; ++r) {
        n += String.fromCharCode(e[r]);
      }

      return n;
    }

    function I(e, t, i) {
      var n = e.length;
      (!t || t < 0) && (t = 0), (!i || i < 0 || i > n) && (i = n);

      for (var r = "", a = t; a < i; ++a) {
        r += z(e[a]);
      }

      return r;
    }

    function M(e, t, i) {
      for (var n = e.slice(t, i), r = "", a = 0; a < n.length; a += 2) {
        r += String.fromCharCode(n[a] + 256 * n[a + 1]);
      }

      return r;
    }

    function _(e, t, i) {
      if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
      if (e + t > i) throw new RangeError("Trying to access beyond buffer length");
    }

    function q(e, t, i, n, r, a) {
      if (!l.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > r || t < a) throw new RangeError('"value" argument is out of bounds');
      if (i + n > e.length) throw new RangeError("Index out of range");
    }

    function F(e, t, i, n) {
      t < 0 && (t = 65535 + t + 1);

      for (var r = 0, a = Math.min(e.length - i, 2); r < a; ++r) {
        e[i + r] = (t & 255 << 8 * (n ? r : 1 - r)) >>> 8 * (n ? r : 1 - r);
      }
    }

    function B(e, t, i, n) {
      t < 0 && (t = 4294967295 + t + 1);

      for (var r = 0, a = Math.min(e.length - i, 4); r < a; ++r) {
        e[i + r] = t >>> 8 * (n ? r : 3 - r) & 255;
      }
    }

    function J(e, t, i, n, r, a) {
      if (i + n > e.length) throw new RangeError("Index out of range");
      if (i < 0) throw new RangeError("Index out of range");
    }

    function P(e, t, i, n, a) {
      return a || J(e, 0, i, 4), r.write(e, t, i, n, 23, 4), i + 4;
    }

    function O(e, t, i, n, a) {
      return a || J(e, 0, i, 8), r.write(e, t, i, n, 52, 8), i + 8;
    }

    l.prototype.slice = function (e, t) {
      var i,
          n = this.length;
      if ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), t < e && (t = e), l.TYPED_ARRAY_SUPPORT) (i = this.subarray(e, t)).__proto__ = l.prototype;else {
        var r = t - e;
        i = new l(r, void 0);

        for (var a = 0; a < r; ++a) {
          i[a] = this[a + e];
        }
      }
      return i;
    }, l.prototype.readUIntLE = function (e, t, i) {
      e |= 0, t |= 0, i || _(e, t, this.length);

      for (var n = this[e], r = 1, a = 0; ++a < t && (r *= 256);) {
        n += this[e + a] * r;
      }

      return n;
    }, l.prototype.readUIntBE = function (e, t, i) {
      e |= 0, t |= 0, i || _(e, t, this.length);

      for (var n = this[e + --t], r = 1; t > 0 && (r *= 256);) {
        n += this[e + --t] * r;
      }

      return n;
    }, l.prototype.readUInt8 = function (e, t) {
      return t || _(e, 1, this.length), this[e];
    }, l.prototype.readUInt16LE = function (e, t) {
      return t || _(e, 2, this.length), this[e] | this[e + 1] << 8;
    }, l.prototype.readUInt16BE = function (e, t) {
      return t || _(e, 2, this.length), this[e] << 8 | this[e + 1];
    }, l.prototype.readUInt32LE = function (e, t) {
      return t || _(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
    }, l.prototype.readUInt32BE = function (e, t) {
      return t || _(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
    }, l.prototype.readIntLE = function (e, t, i) {
      e |= 0, t |= 0, i || _(e, t, this.length);

      for (var n = this[e], r = 1, a = 0; ++a < t && (r *= 256);) {
        n += this[e + a] * r;
      }

      return n >= (r *= 128) && (n -= Math.pow(2, 8 * t)), n;
    }, l.prototype.readIntBE = function (e, t, i) {
      e |= 0, t |= 0, i || _(e, t, this.length);

      for (var n = t, r = 1, a = this[e + --n]; n > 0 && (r *= 256);) {
        a += this[e + --n] * r;
      }

      return a >= (r *= 128) && (a -= Math.pow(2, 8 * t)), a;
    }, l.prototype.readInt8 = function (e, t) {
      return t || _(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
    }, l.prototype.readInt16LE = function (e, t) {
      t || _(e, 2, this.length);
      var i = this[e] | this[e + 1] << 8;
      return 32768 & i ? 4294901760 | i : i;
    }, l.prototype.readInt16BE = function (e, t) {
      t || _(e, 2, this.length);
      var i = this[e + 1] | this[e] << 8;
      return 32768 & i ? 4294901760 | i : i;
    }, l.prototype.readInt32LE = function (e, t) {
      return t || _(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
    }, l.prototype.readInt32BE = function (e, t) {
      return t || _(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
    }, l.prototype.readFloatLE = function (e, t) {
      return t || _(e, 4, this.length), r.read(this, e, !0, 23, 4);
    }, l.prototype.readFloatBE = function (e, t) {
      return t || _(e, 4, this.length), r.read(this, e, !1, 23, 4);
    }, l.prototype.readDoubleLE = function (e, t) {
      return t || _(e, 8, this.length), r.read(this, e, !0, 52, 8);
    }, l.prototype.readDoubleBE = function (e, t) {
      return t || _(e, 8, this.length), r.read(this, e, !1, 52, 8);
    }, l.prototype.writeUIntLE = function (e, t, i, n) {
      (e = +e, t |= 0, i |= 0, n) || q(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
      var r = 1,
          a = 0;

      for (this[t] = 255 & e; ++a < i && (r *= 256);) {
        this[t + a] = e / r & 255;
      }

      return t + i;
    }, l.prototype.writeUIntBE = function (e, t, i, n) {
      (e = +e, t |= 0, i |= 0, n) || q(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
      var r = i - 1,
          a = 1;

      for (this[t + r] = 255 & e; --r >= 0 && (a *= 256);) {
        this[t + r] = e / a & 255;
      }

      return t + i;
    }, l.prototype.writeUInt8 = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 1, 255, 0), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
    }, l.prototype.writeUInt16LE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : F(this, e, t, !0), t + 2;
    }, l.prototype.writeUInt16BE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 2, 65535, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : F(this, e, t, !1), t + 2;
    }, l.prototype.writeUInt32LE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : B(this, e, t, !0), t + 4;
    }, l.prototype.writeUInt32BE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 4, 4294967295, 0), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : B(this, e, t, !1), t + 4;
    }, l.prototype.writeIntLE = function (e, t, i, n) {
      if (e = +e, t |= 0, !n) {
        var r = Math.pow(2, 8 * i - 1);
        q(this, e, t, i, r - 1, -r);
      }

      var a = 0,
          o = 1,
          s = 0;

      for (this[t] = 255 & e; ++a < i && (o *= 256);) {
        e < 0 && 0 === s && 0 !== this[t + a - 1] && (s = 1), this[t + a] = (e / o >> 0) - s & 255;
      }

      return t + i;
    }, l.prototype.writeIntBE = function (e, t, i, n) {
      if (e = +e, t |= 0, !n) {
        var r = Math.pow(2, 8 * i - 1);
        q(this, e, t, i, r - 1, -r);
      }

      var a = i - 1,
          o = 1,
          s = 0;

      for (this[t + a] = 255 & e; --a >= 0 && (o *= 256);) {
        e < 0 && 0 === s && 0 !== this[t + a + 1] && (s = 1), this[t + a] = (e / o >> 0) - s & 255;
      }

      return t + i;
    }, l.prototype.writeInt8 = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 1, 127, -128), l.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
    }, l.prototype.writeInt16LE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : F(this, e, t, !0), t + 2;
    }, l.prototype.writeInt16BE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 2, 32767, -32768), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : F(this, e, t, !1), t + 2;
    }, l.prototype.writeInt32LE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 4, 2147483647, -2147483648), l.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : B(this, e, t, !0), t + 4;
    }, l.prototype.writeInt32BE = function (e, t, i) {
      return e = +e, t |= 0, i || q(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), l.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : B(this, e, t, !1), t + 4;
    }, l.prototype.writeFloatLE = function (e, t, i) {
      return P(this, e, t, !0, i);
    }, l.prototype.writeFloatBE = function (e, t, i) {
      return P(this, e, t, !1, i);
    }, l.prototype.writeDoubleLE = function (e, t, i) {
      return O(this, e, t, !0, i);
    }, l.prototype.writeDoubleBE = function (e, t, i) {
      return O(this, e, t, !1, i);
    }, l.prototype.copy = function (e, t, i, n) {
      if (i || (i = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), t || (t = 0), n > 0 && n < i && (n = i), n === i) return 0;
      if (0 === e.length || 0 === this.length) return 0;
      if (t < 0) throw new RangeError("targetStart out of bounds");
      if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
      if (n < 0) throw new RangeError("sourceEnd out of bounds");
      n > this.length && (n = this.length), e.length - t < n - i && (n = e.length - t + i);
      var r,
          a = n - i;
      if (this === e && i < t && t < n) for (r = a - 1; r >= 0; --r) {
        e[r + t] = this[r + i];
      } else if (a < 1e3 || !l.TYPED_ARRAY_SUPPORT) for (r = 0; r < a; ++r) {
        e[r + t] = this[r + i];
      } else Uint8Array.prototype.set.call(e, this.subarray(i, i + a), t);
      return a;
    }, l.prototype.fill = function (e, t, i, n) {
      if ("string" == typeof e) {
        if ("string" == typeof t ? (n = t, t = 0, i = this.length) : "string" == typeof i && (n = i, i = this.length), 1 === e.length) {
          var r = e.charCodeAt(0);
          r < 256 && (e = r);
        }

        if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
        if ("string" == typeof n && !l.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
      } else "number" == typeof e && (e &= 255);

      if (t < 0 || this.length < t || this.length < i) throw new RangeError("Out of range index");
      if (i <= t) return this;
      var a;
      if (t >>>= 0, i = void 0 === i ? this.length : i >>> 0, e || (e = 0), "number" == typeof e) for (a = t; a < i; ++a) {
        this[a] = e;
      } else {
        var o = l.isBuffer(e) ? e : L(new l(e, n).toString()),
            s = o.length;

        for (a = 0; a < i - t; ++a) {
          this[a + t] = o[a % s];
        }
      }
      return this;
    };
    var R = /[^+\/0-9A-Za-z-_]/g;

    function z(e) {
      return e < 16 ? "0" + e.toString(16) : e.toString(16);
    }

    function L(e, t) {
      var i;
      t = t || 1 / 0;

      for (var n = e.length, r = null, a = [], o = 0; o < n; ++o) {
        if ((i = e.charCodeAt(o)) > 55295 && i < 57344) {
          if (!r) {
            if (i > 56319) {
              (t -= 3) > -1 && a.push(239, 191, 189);
              continue;
            }

            if (o + 1 === n) {
              (t -= 3) > -1 && a.push(239, 191, 189);
              continue;
            }

            r = i;
            continue;
          }

          if (i < 56320) {
            (t -= 3) > -1 && a.push(239, 191, 189), r = i;
            continue;
          }

          i = 65536 + (r - 55296 << 10 | i - 56320);
        } else r && (t -= 3) > -1 && a.push(239, 191, 189);

        if (r = null, i < 128) {
          if ((t -= 1) < 0) break;
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

    function H(e) {
      return n.toByteArray(function (e) {
        if ((e = function (e) {
          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
        }(e).replace(R, "")).length < 2) return "";

        for (; e.length % 4 != 0;) {
          e += "=";
        }

        return e;
      }(e));
    }

    function D(e, t, i, n) {
      for (var r = 0; r < n && !(r + i >= t.length || r >= e.length); ++r) {
        t[r + i] = e[r];
      }

      return r;
    }
  }).call(this, i(6));
}, function (e, t, i) {
  "use strict";

  t.byteLength = function (e) {
    var t = h(e),
        i = t[0],
        n = t[1];
    return 3 * (i + n) / 4 - n;
  }, t.toByteArray = function (e) {
    var t,
        i,
        n = h(e),
        o = n[0],
        s = n[1],
        l = new a(function (e, t, i) {
      return 3 * (t + i) / 4 - i;
    }(0, o, s)),
        c = 0,
        d = s > 0 ? o - 4 : o;

    for (i = 0; i < d; i += 4) {
      t = r[e.charCodeAt(i)] << 18 | r[e.charCodeAt(i + 1)] << 12 | r[e.charCodeAt(i + 2)] << 6 | r[e.charCodeAt(i + 3)], l[c++] = t >> 16 & 255, l[c++] = t >> 8 & 255, l[c++] = 255 & t;
    }

    2 === s && (t = r[e.charCodeAt(i)] << 2 | r[e.charCodeAt(i + 1)] >> 4, l[c++] = 255 & t);
    1 === s && (t = r[e.charCodeAt(i)] << 10 | r[e.charCodeAt(i + 1)] << 4 | r[e.charCodeAt(i + 2)] >> 2, l[c++] = t >> 8 & 255, l[c++] = 255 & t);
    return l;
  }, t.fromByteArray = function (e) {
    for (var t, i = e.length, r = i % 3, a = [], o = 0, s = i - r; o < s; o += 16383) {
      a.push(c(e, o, o + 16383 > s ? s : o + 16383));
    }

    1 === r ? (t = e[i - 1], a.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === r && (t = (e[i - 2] << 8) + e[i - 1], a.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
    return a.join("");
  };

  for (var n = [], r = [], a = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, l = o.length; s < l; ++s) {
    n[s] = o[s], r[o.charCodeAt(s)] = s;
  }

  function h(e) {
    var t = e.length;
    if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var i = e.indexOf("=");
    return -1 === i && (i = t), [i, i === t ? 0 : 4 - i % 4];
  }

  function c(e, t, i) {
    for (var r, a, o = [], s = t; s < i; s += 3) {
      r = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), o.push(n[(a = r) >> 18 & 63] + n[a >> 12 & 63] + n[a >> 6 & 63] + n[63 & a]);
    }

    return o.join("");
  }

  r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63;
}, function (e, t) {
  /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
  t.read = function (e, t, i, n, r) {
    var a,
        o,
        s = 8 * r - n - 1,
        l = (1 << s) - 1,
        h = l >> 1,
        c = -7,
        d = i ? r - 1 : 0,
        u = i ? -1 : 1,
        p = e[t + d];

    for (d += u, a = p & (1 << -c) - 1, p >>= -c, c += s; c > 0; a = 256 * a + e[t + d], d += u, c -= 8) {
      ;
    }

    for (o = a & (1 << -c) - 1, a >>= -c, c += n; c > 0; o = 256 * o + e[t + d], d += u, c -= 8) {
      ;
    }

    if (0 === a) a = 1 - h;else {
      if (a === l) return o ? NaN : 1 / 0 * (p ? -1 : 1);
      o += Math.pow(2, n), a -= h;
    }
    return (p ? -1 : 1) * o * Math.pow(2, a - n);
  }, t.write = function (e, t, i, n, r, a) {
    var o,
        s,
        l,
        h = 8 * a - r - 1,
        c = (1 << h) - 1,
        d = c >> 1,
        u = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        p = n ? 0 : a - 1,
        f = n ? 1 : -1,
        g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;

    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, o = c) : (o = Math.floor(Math.log(t) / Math.LN2), t * (l = Math.pow(2, -o)) < 1 && (o--, l *= 2), (t += o + d >= 1 ? u / l : u * Math.pow(2, 1 - d)) * l >= 2 && (o++, l /= 2), o + d >= c ? (s = 0, o = c) : o + d >= 1 ? (s = (t * l - 1) * Math.pow(2, r), o += d) : (s = t * Math.pow(2, d - 1) * Math.pow(2, r), o = 0)); r >= 8; e[i + p] = 255 & s, p += f, s /= 256, r -= 8) {
      ;
    }

    for (o = o << r | s, h += r; h > 0; e[i + p] = 255 & o, p += f, o /= 256, h -= 8) {
      ;
    }

    e[i + p - f] |= 128 * g;
  };
}, function (e, t) {
  var i = {}.toString;

  e.exports = Array.isArray || function (e) {
    return "[object Array]" == i.call(e);
  };
}, function (e, t, i) {
  "use strict";

  (function (e) {
    t.parseWrapper = function (t, i, n, r) {
      var _marked = /*#__PURE__*/regeneratorRuntime.mark(f);

      var a = 0,
          o = 0,
          s = t,
          l = 0,
          h = " ",
          c = "";

      function d(e) {
        this.name = "ParseError", this.message = e, this.text = s;
      }

      var u = function u() {
        for (h = s.charAt(l), l++; h && h <= " ";) {
          u();
        }

        return h;
      },
          p = function p() {
        c = "";

        do {
          c += h, u();
        } while (h.match(/[a-z]/i));

        return s = s.slice(l - 1), l = 0, c;
      };

      function f() {
        var e, i, r, g, m, y, v;
        return regeneratorRuntime.wrap(function f$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                e = "", i = {}, r = [], g = "", m = 0, y = "", v = function v() {
                  y += h, u();
                };

                if (!("number" == typeof s || "boolean" == typeof s || null === s)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", (s = "", t));

              case 3:
                if (!(void 0 === s)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", (s = void 0, t));

              case 5:
                if (!("[" === s.charAt(0) && "]" === s.charAt(1))) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", (s = "", []));

              case 7:
                if (!("{" === s.charAt(0) && "}" === s.charAt(1))) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", (s = "", {}));

              case 9:
                _context3.t1 = ++a > 512 * n;

                if (!_context3.t1) {
                  _context3.next = 14;
                  break;
                }

                a = 0;
                _context3.next = 14;
                return;

              case 14:
                1 !== o && u();
                _context3.t0 = h;
                _context3.next = _context3.t0 === "{" ? 18 : _context3.t0 === "[" ? 33 : _context3.t0 === '"' ? 44 : _context3.t0 === "0" ? 45 : _context3.t0 === "1" ? 45 : _context3.t0 === "2" ? 45 : _context3.t0 === "3" ? 45 : _context3.t0 === "4" ? 45 : _context3.t0 === "5" ? 45 : _context3.t0 === "6" ? 45 : _context3.t0 === "7" ? 45 : _context3.t0 === "8" ? 45 : _context3.t0 === "9" ? 45 : _context3.t0 === "-" ? 45 : _context3.t0 === "t" ? 48 : _context3.t0 === "f" ? 49 : _context3.t0 === "n" ? 50 : 51;
                break;

              case 18:
                if (!(u(), "}" === h)) {
                  _context3.next = 20;
                  break;
                }

                return _context3.abrupt("return", (s = s.slice(l), l = 0, i));

              case 20:
                '"' !== h && u();
                o = 1;
                return _context3.delegateYield(f(), "t2", 23);

              case 23:
                e = _context3.t2;
                o = 0;
                u();
                return _context3.delegateYield(f(), "t3", 27);

              case 27:
                i[e] = _context3.t3;
                u();

                if (!("}" === h)) {
                  _context3.next = 31;
                  break;
                }

                return _context3.abrupt("return", (s = s.slice(l), l = 0, i));

              case 31:
                if ("," === h) {
                  _context3.next = 20;
                  break;
                }

              case 32:
                return _context3.abrupt("return", new d("Bad object"));

              case 33:
                if (!(u(), "]" === h)) {
                  _context3.next = 35;
                  break;
                }

                return _context3.abrupt("return", (s = s.slice(l), l = 0, r));

              case 35:
                h = s.charAt(--l);

              case 36:
                return _context3.delegateYield(f(), "t4", 37);

              case 37:
                g = _context3.t4;
                r.push(g);
                u();

                if (!("]" === h)) {
                  _context3.next = 42;
                  break;
                }

                return _context3.abrupt("return", (s = s.slice(l), l = 0, r));

              case 42:
                if ("," === h) {
                  _context3.next = 36;
                  break;
                }

              case 43:
                return _context3.abrupt("return", new d("Bad array"));

              case 44:
                return _context3.abrupt("return", (s = s.slice(l - 1), l = 0, '"' === s.charAt(0) && '"' === s.charAt(1) ? (s = s.slice(2), l = 0, "") : (u(), function () {
                  var e = " ",
                      t = l,
                      i = 0,
                      n = 0;

                  for (;;) {
                    for (i = s.indexOf('"', t + 1), t = i, h = s.charAt(t - 1); "\\" === h;) {
                      n++, h = s.charAt(t - (n + 1));
                    }

                    if (n % 2 == 0) {
                      e = s.substring(l, i), s = s.slice(++i), n = 0;
                      break;
                    }

                    n = 0;
                  }

                  for (i = e.indexOf("\\"); i >= 0;) {
                    var _t52 = {
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
                        _n37 = 0,
                        _r22 = 0,
                        _a16 = 0;

                    if (l = i, h = e.charAt(++l), "u" === h) {
                      for (_a16 = 0, _r22 = 0; _r22 < 4 && (_n37 = parseInt(h = e.charAt(++l), 16), isFinite(_n37)); _r22 += 1) {
                        _a16 = 16 * _a16 + _n37;
                      }

                      e = e.slice(0, i) + String.fromCharCode(_a16) + e.slice(i + 6), l = i;
                    } else {
                      if ("string" != typeof _t52[h]) break;
                      e = e.slice(0, i) + _t52[h] + e.slice(i + 2), l = i + 1;
                    }

                    i = e.indexOf("\\", l);
                  }

                  return l = 0, e;
                }())));

              case 45:
                "-" === h && v();

                do {
                  v(), ("." === h || "e" === h || "E" === h || "-" === h || "+" === h || h >= String.fromCharCode(65) && h <= String.fromCharCode(70)) && v();
                } while ("-" === h || "+" === h || isFinite(h) && "" !== h);

                return _context3.abrupt("return", (m = Number(y), s = s.slice(l - 1), l = 0, m));

              case 48:
                return _context3.abrupt("return", (c = p(), "true" === c || new d("Unexpected character")));

              case 49:
                return _context3.abrupt("return", (c = p(), "false" !== c && new d("Unexpected character")));

              case 50:
                return _context3.abrupt("return", (c = p(), "null" === c ? null : new d("Unexpected character")));

              case 51:
                return _context3.abrupt("return", new d("Unexpected character"));

              case 52:
              case "end":
                return _context3.stop();
            }
          }
        }, _marked);
      }

      var g = function g(e, t) {
        var n = "",
            r = "",
            a = e[t];
        if (a && "object" == _typeof(a)) for (n in a) {
          Object.prototype.hasOwnProperty.call(a, n) && (r = g(a, n), void 0 !== r ? a[n] = r : delete a[n]);
        }
        return i.call(e, t, a);
      },
          m = "";

      var y = /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.delegateYield(f(), "t0", 1);

              case 1:
                m = _context4.t0;

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee2);
      })(),
          v = y.next(),
          b = function b() {
        e(function () {
          if (v = y.next(), v && !0 === v.done) {
            var _e70 = function _e70(e) {
              return "}" !== e.charAt(0) && "]" !== e.charAt(0) || (e = e.substring(1, e.length)), "string" == typeof e && !e.trim();
            };

            if (void 0 === m) return r(new d("Unexpected Character"), null);
            if (m instanceof d) return r(m, null);
            if (!_e70(s)) return r(new d("Unexpected Character"), null);
            if (null === i) return r(null, m);

            if ("function" == typeof i) {
              var _e71 = g({
                "": m
              }, "");

              return r(null, _e71);
            }
          }

          b();
        });
      };

      return b();
    };
  }).call(this, i(12).setImmediate);
}, function (e, t, i) {
  (function (e, t) {
    !function (e, i) {
      "use strict";

      if (!e.setImmediate) {
        var n,
            r,
            a,
            o,
            s,
            l = 1,
            h = {},
            c = !1,
            d = e.document,
            u = Object.getPrototypeOf && Object.getPrototypeOf(e);
        u = u && u.setTimeout ? u : e, "[object process]" === {}.toString.call(e.process) ? n = function n(e) {
          t.nextTick(function () {
            f(e);
          });
        } : !function () {
          if (e.postMessage && !e.importScripts) {
            var t = !0,
                i = e.onmessage;
            return e.onmessage = function () {
              t = !1;
            }, e.postMessage("", "*"), e.onmessage = i, t;
          }
        }() ? e.MessageChannel ? ((a = new MessageChannel()).port1.onmessage = function (e) {
          f(e.data);
        }, n = function n(e) {
          a.port2.postMessage(e);
        }) : d && "onreadystatechange" in d.createElement("script") ? (r = d.documentElement, n = function n(e) {
          var t = d.createElement("script");
          t.onreadystatechange = function () {
            f(e), t.onreadystatechange = null, r.removeChild(t), t = null;
          }, r.appendChild(t);
        }) : n = function n(e) {
          setTimeout(f, 0, e);
        } : (o = "setImmediate$" + Math.random() + "$", s = function s(t) {
          t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(o) && f(+t.data.slice(o.length));
        }, e.addEventListener ? e.addEventListener("message", s, !1) : e.attachEvent("onmessage", s), n = function n(t) {
          e.postMessage(o + t, "*");
        }), u.setImmediate = function (e) {
          "function" != typeof e && (e = new Function("" + e));

          for (var t = new Array(arguments.length - 1), i = 0; i < t.length; i++) {
            t[i] = arguments[i + 1];
          }

          var r = {
            callback: e,
            args: t
          };
          return h[l] = r, n(l), l++;
        }, u.clearImmediate = p;
      }

      function p(e) {
        delete h[e];
      }

      function f(e) {
        if (c) setTimeout(f, 0, e);else {
          var t = h[e];

          if (t) {
            c = !0;

            try {
              !function (e) {
                var t = e.callback,
                    i = e.args;

                switch (i.length) {
                  case 0:
                    t();
                    break;

                  case 1:
                    t(i[0]);
                    break;

                  case 2:
                    t(i[0], i[1]);
                    break;

                  case 3:
                    t(i[0], i[1], i[2]);
                    break;

                  default:
                    t.apply(void 0, i);
                }
              }(t);
            } finally {
              p(e), c = !1;
            }
          }
        }
      }
    }("undefined" == typeof self ? void 0 === e ? this : e : self);
  }).call(this, i(6), i(30));
}, function (e, t) {
  var i,
      n,
      r = e.exports = {};

  function a() {
    throw new Error("setTimeout has not been defined");
  }

  function o() {
    throw new Error("clearTimeout has not been defined");
  }

  function s(e) {
    if (i === setTimeout) return setTimeout(e, 0);
    if ((i === a || !i) && setTimeout) return i = setTimeout, setTimeout(e, 0);

    try {
      return i(e, 0);
    } catch (t) {
      try {
        return i.call(null, e, 0);
      } catch (t) {
        return i.call(this, e, 0);
      }
    }
  }

  !function () {
    try {
      i = "function" == typeof setTimeout ? setTimeout : a;
    } catch (e) {
      i = a;
    }

    try {
      n = "function" == typeof clearTimeout ? clearTimeout : o;
    } catch (e) {
      n = o;
    }
  }();
  var l,
      h = [],
      c = !1,
      d = -1;

  function u() {
    c && l && (c = !1, l.length ? h = l.concat(h) : d = -1, h.length && p());
  }

  function p() {
    if (!c) {
      var e = s(u);
      c = !0;

      for (var t = h.length; t;) {
        for (l = h, h = []; ++d < t;) {
          l && l[d].run();
        }

        d = -1, t = h.length;
      }

      l = null, c = !1, function (e) {
        if (n === clearTimeout) return clearTimeout(e);
        if ((n === o || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);

        try {
          n(e);
        } catch (t) {
          try {
            return n.call(null, e);
          } catch (t) {
            return n.call(this, e);
          }
        }
      }(e);
    }
  }

  function f(e, t) {
    this.fun = e, this.array = t;
  }

  function g() {}

  r.nextTick = function (e) {
    var t = new Array(arguments.length - 1);
    if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) {
      t[i - 1] = arguments[i];
    }
    h.push(new f(e, t)), 1 !== h.length || c || s(p);
  }, f.prototype.run = function () {
    this.fun.apply(null, this.array);
  }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = g, r.addListener = g, r.once = g, r.off = g, r.removeListener = g, r.removeAllListeners = g, r.emit = g, r.prependListener = g, r.prependOnceListener = g, r.listeners = function (e) {
    return [];
  }, r.binding = function (e) {
    throw new Error("process.binding is not supported");
  }, r.cwd = function () {
    return "/";
  }, r.chdir = function (e) {
    throw new Error("process.chdir is not supported");
  }, r.umask = function () {
    return 0;
  };
}, function (e, t, i) {
  "use strict";

  (function (e) {
    var i = 0,
        n = [],
        r = "";

    function a(e) {
      this.name = "Error", this.message = e;
    }

    var o = function o(e, t) {
      var i = "",
          n = "",
          a = new RegExp("/[\\'\0-\x1F\x7F-\x9F\xAD\u0600-\u0604\u070F\u17B4\u17B5\u200C-\u200F\u2028-\u202F\u2060-\u206F\uFEFF\uFFF0-\uFFFF]/g");
      e = e.replace(/\\/gi, "\\\\");
      var o = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"'
      };

      for (var s in o) {
        var l = new RegExp(s, "gi");
        e = e.replace(l, o[s]);
      }

      return a.lastIndex = 0, a.test(e) ? (n = e.replace(a, function (e) {
        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
      }), 1 === t ? (n += r, n += n, r = "", '"' + n + '"') : 2 === t ? '"' + n + '"' : void (r += n)) : 1 === t ? (i += r, i += e, r = "", '"' + i + '"') : 2 === t ? '"' + e + '"' : void (r += e);
    };

    t.stringifyWrapper = function (t, s, l, h, c) {
      var d,
          u = "";
      "number" == typeof l ? u = " ".repeat(l) : "string" == typeof l && (u = l);

      var p = /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function e(t, r, s, l, h) {
                  var c, d, u, p, f, g, m, y, v, b, k, _e72, _i37;

                  return regeneratorRuntime.wrap(function e$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          c = 0, d = "", u = "", p = 0, f = "", g = "", m = r[t], y = 0, v = "", b = "", k = 0;
                          _context5.t1 = ++i > 512 * h;

                          if (!_context5.t1) {
                            _context5.next = 6;
                            break;
                          }

                          i = 0;
                          _context5.next = 6;
                          return u;

                        case 6:
                          "function" == typeof s && (m = s.call(r, t, m));
                          _context5.t0 = _typeof(m);
                          _context5.next = _context5.t0 === "string" ? 10 : _context5.t0 === "number" ? 27 : _context5.t0 === "boolean" ? 28 : _context5.t0 === "null" ? 28 : _context5.t0 === "undefined" ? 29 : _context5.t0 === "object" ? 30 : 76;
                          break;

                        case 10:
                          if (!(m.length > 1e5)) {
                            _context5.next = 25;
                            break;
                          }

                          _e72 = 0;

                        case 12:
                          if (!(_e72 < m.length)) {
                            _context5.next = 23;
                            break;
                          }

                          y = 0;
                          _context5.next = 16;
                          return m;

                        case 16:
                          b = m.substr(_e72, 1e5);
                          k += b.length;
                          k === m.length && (y = 1);
                          v = o(b, y);

                        case 20:
                          _e72 += 1e5;
                          _context5.next = 12;
                          break;

                        case 23:
                          _context5.next = 26;
                          break;

                        case 25:
                          v = o(m, 2);

                        case 26:
                          return _context5.abrupt("return", v);

                        case 27:
                          return _context5.abrupt("return", isFinite(m) ? String(m) : "null");

                        case 28:
                          return _context5.abrupt("return", String(m));

                        case 29:
                          return _context5.abrupt("return");

                        case 30:
                          if (m) {
                            _context5.next = 32;
                            break;
                          }

                          return _context5.abrupt("return", "null");

                        case 32:
                          _i37 = function _i37(e) {
                            return 0 === g.length ? e ? "{}" : "[]" : e ? l ? "{\n" + l + g.join(",\n" + l) + "\n}" : "{" + g.join(",") + "}" : l ? "[\n" + l + g.join(",\n" + l) + "\n]" : "[" + g.join(",") + "]";
                          };

                          if (!(g = [], m && "function" == typeof m.toJSON)) {
                            _context5.next = 35;
                            break;
                          }

                          return _context5.abrupt("return", (g.push('"' + m.toJSON(t) + '"'), 0 === g.length ? "{}" : l ? l + g.join(",\n" + l) + "\n" : g.join(",")));

                        case 35:
                          if (!(m && m.constructor === Array)) {
                            _context5.next = 45;
                            break;
                          }

                          p = m.length, c = 0;

                        case 37:
                          if (!(c < p)) {
                            _context5.next = 44;
                            break;
                          }

                          return _context5.delegateYield(e(c, m, s, l, h) || "null", "t2", 39);

                        case 39:
                          f = _context5.t2;
                          void 0 !== f && g.push(f);

                        case 41:
                          c += 1;
                          _context5.next = 37;
                          break;

                        case 44:
                          return _context5.abrupt("return", _i37(!1));

                        case 45:
                          if (!(s && "object" == _typeof(s))) {
                            _context5.next = 59;
                            break;
                          }

                          p = s.length, c = 0;

                        case 47:
                          if (!(c < p)) {
                            _context5.next = 57;
                            break;
                          }

                          _context5.t3 = "string" == typeof s[c];

                          if (!_context5.t3) {
                            _context5.next = 54;
                            break;
                          }

                          d = s[c];
                          return _context5.delegateYield(e(d, m, s, l, h), "t4", 52);

                        case 52:
                          u = _context5.t4;
                          void 0 !== u && g.push(o(d, 2) + (l ? ": " : ":") + u);

                        case 54:
                          c += 1;
                          _context5.next = 47;
                          break;

                        case 57:
                          _context5.next = 75;
                          break;

                        case 59:
                          _context5.t5 = regeneratorRuntime.keys((n.push(m), m));

                        case 60:
                          if ((_context5.t6 = _context5.t5()).done) {
                            _context5.next = 74;
                            break;
                          }

                          d = _context5.t6.value;

                          if (!("object" == _typeof(m[d]) && null !== m[d] && void 0 !== m[d])) {
                            _context5.next = 66;
                            break;
                          }

                          if (!(-1 !== n.indexOf(m[d]))) {
                            _context5.next = 65;
                            break;
                          }

                          return _context5.abrupt("return", new a("Circular Structure Detected"));

                        case 65:
                          n.push(m[d]);

                        case 66:
                          _context5.t7 = Object.hasOwnProperty.call(m, d);

                          if (!_context5.t7) {
                            _context5.next = 71;
                            break;
                          }

                          return _context5.delegateYield(e(d, m, s, l, h), "t8", 69);

                        case 69:
                          u = _context5.t8;
                          void 0 !== u && g.push(o(d, 2) + (l ? ": " : ":") + u);

                        case 71:
                          n = n.filter(function (e, t, i) {
                            return e !== m[d];
                          });
                          _context5.next = 60;
                          break;

                        case 74:
                          n = n.filter(function (e, t, i) {
                            return e !== m;
                          });

                        case 75:
                          return _context5.abrupt("return", _i37(!0));

                        case 76:
                          return _context5.abrupt("return", new a("Unexpected Character"));

                        case 77:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, e);
                })("", {
                  "": t
                }, s, u, 1), "t0", 1);

              case 1:
                d = _context6.t0;

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee3);
      })(),
          f = p.next(),
          g = function g() {
        e(function () {
          if (f = p.next(), f && !0 === f.done) return i = 0, r = "", n = [], "object" == _typeof(d) ? c(d, null) : c(null, d);
          g();
        });
      };

      return g();
    };
  }).call(this, i(12).setImmediate);
}, function (e, t, i) {
  var n = i(33),
      r = i(34);
  e.exports = new ( /*#__PURE__*/function () {
    function _class6() {
      _classCallCheck(this, _class6);

      this.canvas = document.getElementById("gameCanvas"), this.bounds = this.canvas.getBoundingClientRect(), this.context = this.canvas.getContext("2d"), this.camera = n.create(this.context), this.engine = r.create(), this.offscreen = 0, this.context.offscreens = [], this._customOptions = ["fill", "stroke", "align", "close", "curve"], this._currentContext = this.context, this._render = null;

      var e = function e(_e73) {
        _e73.preventDefault();
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
            var _e74 = _step3.value;
            _e74.canvas.width = this.canvas.width, _e74.canvas.height = this.canvas.height;
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
          var t = _this23.context.offscreens[e];
          t.rendererData.camera.begin(function () {
            _this23.context.drawImage(t.canvas, 0, 0, t.canvas.width, t.canvas.height);
          }), t.clearRect(0, 0, t.canvas.width, t.canvas.height);
        };

        for (var e = 0; e < this.context.offscreens.length; e++) {
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
      value: function rect(e, t, i, n, r, a) {
        var o = a || this.context;
        this._hasProperty(r, "align", function (r) {
          var a = r.split(" ");
          a[0] && ("center" == a[0] || "middle" == a[0] ? e -= .5 * i : "right" == a[0] && (e -= i)), a[1] && ("center" == a[1] || "middle" == a[0] ? t -= .5 * n : "bottom" == a[1] && (t -= n));
        }), o.beginPath(), o.rect(e, t, i, n), this._hasProperty(r, "close", function () {
          o.closePath();
        }), this._evaluateOptions(r, o);
      }
    }, {
      key: "fromVertices",
      value: function fromVertices(e, t, i) {
        var n = i || this.context;

        if (e.length) {
          if (n.beginPath(), !this._hasProperty(t, "curve")) {
            n.moveTo(e[0].x, e[0].y);

            for (var r = 0; r < e.length; r++) {
              var _t53 = e[r];
              n.lineTo(_t53.x, _t53.y);
            }
          }

          this._hasProperty(t, "curve", function () {
            n.beginPath();
            var t = e[0],
                i = e[1],
                r = .5 * (t.x + i.x),
                a = .5 * (t.y + i.y);
            n.moveTo(r, a);

            for (var o = 1; o < e.length; o++) {
              var _t54 = e[o],
                  _i38 = e[o + 1 == e.length ? 0 : o + 1],
                  _r23 = .5 * (_i38.x + _t54.x),
                  _a17 = .5 * (_i38.y + _t54.y);

              n.quadraticCurveTo(_t54.x, _t54.y, _r23, _a17);
            }

            n.quadraticCurveTo(t.x, t.y, r, a), n.lineJoin = "round";
          }), this._hasProperty(t, "close", function () {
            n.closePath();
          }), this._evaluateOptions(t, n);
        }
      }
    }, {
      key: "text",
      value: function text(e, t, i, n, r) {
        var a = r || this.context;
        this._hasProperty(n, "align", function (e) {
          var t = e.split(" ");
          t[0] && ("left" == t[0] ? a.textAlign = "start" : "center" == t[0] || "middle" == t[0] ? a.textAlign = "center" : "right" == t[0] && (a.textAlign = "right")), t[1] && ("top" == t[1] ? a.textBaseline = "start" : "center" == t[1] || "middle" == t[0] ? a.textBaseline = "middle" : "bottom" == t[1] && (a.textBaseline = "bottom"));
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
        if (!e) return;
        var n = Object.keys(e);

        for (var r = 0; r < n.length; r++) {
          var _t55 = n[r];
          "stroke" == _t55 && (i.strokeStyle = e[_t55]), "fill" == _t55 && (i.fillStyle = e[_t55]), this._customOptions.includes(_t55) || (i[_t55] = e[_t55]);
        }

        e.stroke && this.stroke(e.stroke, i), e.fill && this.fill(e.fill, i);
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
        return i = i || {
          x: e / this.viewport.scale[0] + this.viewport.left,
          y: t / this.viewport.scale[1] + this.viewport.top
        };
      }
    }, {
      key: "worldToScreen",
      value: function worldToScreen(e, t, i) {
        return i = i || {
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
      value: function run(e) {
        var t,
            _i39 = performance.now(),
            n = (performance.now(), this);

        !function r() {
          t = (performance.now() - _i39) / 1e3, n.frameRate = 1 / t, _i39 = performance.now(), n.frameCount++, "function" == typeof e && e(), requestAnimationFrame(r);
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
        if ("number" == typeof e) return e in this.activeKeys;
        return Object.values(this.activeKeys).includes(e);
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
      s = {
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
  e.exports = s;
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
  var n = i(1),
      r = i(0),
      a = i(2),
      o = i(3),
      s = ["skinPositionX", "skinPositionY", "skinScaleX", "skinScaleY", "skinAngle"],
      l = new Vue({
    el: "#paneApp",
    data: {
      hideJoints: !1,
      hideProperties: !0,
      hideHistory: !0,
      showLength: !o.animation.linear
    },
    methods: {
      handleFocusOut: function handleFocusOut(e) {
        var t = e.target;
        s.includes(t.id) && (t.value.length && t.value || (t.value = t.placeholder)), "jointName" == t.id && (t.value.length && t.value || (t.value = r.uid())), t._lastValue != t.value && (s.includes(t.id) ? n.emit("jointSkinningInputChange") : "jointZIndex" == t.id ? n.emit("jointZIndexInputChange") : "jointName" == t.id && n.emit("jointNameInputChange")), t._lastValue = t.value;
      },
      handleInput: function handleInput() {
        n.emit("jointNameInputChange", !0);
      },
      validateFormat: function validateFormat(e) {
        e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), "jointX" == e.target.id || "jointY" == e.target.id ? n.emit("jointPositionInputChange") : "jointAngle" == e.target.id ? n.emit("jointAngleInputChange") : "jointLength" == e.target.id ? n.emit("jointLengthInputChange") : "jointZIndex" == e.target.id && n.emit("jointZIndexInputChange"), s.includes(e.target.id) && n.emit("jointSkinningInputChange", !0);
      },
      toggleAmount: function toggleAmount(e) {
        if (e.target != document.activeElement) return;
        e.preventDefault(), e.target.value.length || (e.target.value = 1);
        var t = e.wheelDeltaY < 0,
            i = parseFloat(e.target.value),
            r = 1;
        "skinScaleX" != e.target.id && "skinScaleY" != e.target.id || (r = .1), t ? i -= r : i += r, e.target.value = i.toFixed(2), "jointX" == e.target.id || "jointY" == e.target.id ? n.emit("jointPositionInputChange") : "jointAngle" == e.target.id ? n.emit("jointAngleInputChange") : "jointLength" == e.target.id ? n.emit("jointLengthInputChange") : "jointZIndex" == e.target.id && (n.emit("jointZIndexInputChange", !0), e.target.value = parseInt(e.target.value)), s.includes(e.target.id) && n.emit("jointSkinningInputChange", !0);
      },
      showJoints: function showJoints() {
        this.hideJoints = !1, this.hideProperties = !0, this.hideHistory = !0, a.query("#jointsTab").addClass("active"), a.query("#propertiesTab").removeClass("active"), a.query("#historyTab").removeClass("active"), a.query("#jointApp").removeClass("hidden"), a.query("#propertyApp").addClass("hidden"), a.query("#historyApp").addClass("hidden");
      },
      showProperties: function showProperties() {
        this.hideProperties = !1, this.hideJoints = !0, this.hideHistory = !0, a.query("#jointsTab").removeClass("active"), a.query("#propertiesTab").addClass("active"), a.query("#historyTab").removeClass("active"), a.query("#jointApp").addClass("hidden"), a.query("#propertyApp").removeClass("hidden"), a.query("#historyApp").addClass("hidden");
      },
      showHistory: function showHistory() {
        this.hideHistory = !1, this.hideJoints = !0, this.hideProperties = !0, a.query("#jointsTab").removeClass("active"), a.query("#propertiesTab").removeClass("active"), a.query("#historyTab").addClass("active"), a.query("#jointApp").addClass("hidden"), a.query("#propertyApp").addClass("hidden"), a.query("#historyApp").removeClass("hidden");
      }
    }
  });
  e.exports = l;
}, function (e, t, i) {
  var n = i(1),
      r = i(2),
      a = i(0),
      o = i(3);
  var s = new Vue({
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
          var _e75 = this.context;
          _e75.clearRect(0, 0, this.canvas.width, this.canvas.height), _e75.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height), _e75.beginPath(), _e75.moveTo(this.cropFrom.x, this.cropFrom.y), _e75.lineTo(this.cropTo.x, this.cropFrom.y), _e75.lineTo(this.cropTo.x, this.cropTo.y), _e75.lineTo(this.cropFrom.x, this.cropTo.y), _e75.lineTo(this.cropFrom.x, this.cropFrom.y), _e75.lineTo(0, 0), _e75.lineTo(0, this.canvas.height), _e75.lineTo(this.canvas.width, this.canvas.height), _e75.lineTo(this.canvas.width, 0), _e75.lineTo(0, 0), _e75.closePath(), _e75.fillStyle = "rgba(0, 0, 0, 0.4)", _e75.fill(), _e75.save(), _e75.clip(), function (e, t, i, n, r) {
            e.beginPath(), e.rect(t, i, n, r), e.closePath();
          }(_e75, this.cropFrom.x - this.cropBoundsThickness / 2, this.cropFrom.y - this.cropBoundsThickness / 2, this.cropTo.x - this.cropFrom.x + this.cropBoundsThickness, this.cropTo.y - this.cropFrom.y + this.cropBoundsThickness), _e75.fillStyle = o.accent, _e75.fill(), _e75.restore();
        }
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
    var i = !1,
        n = !1,
        r = !1,
        a = !1;
    return r = e >= s.cropFrom.x - s.cropBoundsThickness && e <= s.cropFrom.x + s.cropBoundsThickness && t >= s.cropFrom.y - s.cropBoundsThickness && t <= s.cropTo.y + s.cropBoundsThickness, a = e >= s.cropTo.x - s.cropBoundsThickness && e <= s.cropTo.x + s.cropBoundsThickness && t >= s.cropFrom.y - s.cropBoundsThickness && t <= s.cropTo.y + s.cropBoundsThickness, i = t >= s.cropFrom.y - s.cropBoundsThickness && t <= s.cropFrom.y + s.cropBoundsThickness && e >= s.cropFrom.x - s.cropBoundsThickness && e <= s.cropTo.x + s.cropBoundsThickness, n = t >= s.cropTo.y - s.cropBoundsThickness && t <= s.cropTo.y + s.cropBoundsThickness && e >= s.cropFrom.x - s.cropBoundsThickness && e <= s.cropTo.x + s.cropBoundsThickness, {
      top: i,
      right: a,
      bottom: n,
      left: r
    };
  }

  var h,
      c,
      d,
      u,
      p = r.query("body"),
      f = !1;
  addEventListener("mousedown", function (e) {
    if (s.canvas && s.context) {
      var _t56 = e.clientX,
          _i40 = e.clientY,
          _n38 = s.canvas.getBoundingClientRect(),
          _r24 = _t56 - _n38.x,
          _a18 = _i40 - _n38.y;

      f = !0, h = l(_r24, _a18), c = {
        x: _r24 - s.cropFrom.x,
        y: _a18 - s.cropFrom.y
      }, d = s.cropTo.x - s.cropFrom.x, u = s.cropTo.y - s.cropFrom.y;
    }
  }), addEventListener("mouseup", function () {
    f = !1;
  }), addEventListener("mousemove", function (e) {
    var t = e.clientX,
        i = e.clientY;

    if (s.canvas && s.context) {
      var _e76 = s.canvas.getBoundingClientRect(),
          _n39 = t - _e76.x,
          _r25 = i - _e76.y,
          _o7 = l(_n39, _r25),
          g = _n39 >= s.cropFrom.x + s.cropBoundsThickness / 2 && _n39 <= s.cropTo.x - s.cropBoundsThickness / 2 && _r25 >= s.cropFrom.y + s.cropBoundsThickness / 2 && _r25 <= s.cropTo.y - s.cropBoundsThickness / 2;

      f ? (h.top && (s.cropFrom.y = _r25, s.redraw()), h.left && (s.cropFrom.x = _n39, s.redraw()), h.bottom && (s.cropTo.y = _r25, s.redraw()), h.right && (s.cropTo.x = _n39, s.redraw()), h.top || h.bottom || h.left || h.right || !g || (s.cropFrom.x = _n39 - c.x, s.cropFrom.y = _r25 - c.y, s.cropTo.x = s.cropFrom.x + d, s.cropTo.y = s.cropFrom.y + u, s.redraw()), s.cropFrom.y = a.clamp(s.cropFrom.y, 0, s.cropTo.y), s.cropFrom.x = a.clamp(s.cropFrom.x, 0, s.cropTo.x), s.cropTo.y = a.clamp(s.cropTo.y, s.cropFrom.y, s.canvas.height), s.cropTo.x = a.clamp(s.cropTo.x, s.cropFrom.x, s.canvas.width)) : ((_o7.left || _o7.right) && p.css("cursor", "ew-resize"), (_o7.top || _o7.bottom) && p.css("cursor", "ns-resize"), _o7.top && _o7.left && p.css("cursor", "nw-resize"), _o7.top && _o7.right && p.css("cursor", "ne-resize"), _o7.bottom && _o7.left && p.css("cursor", "sw-resize"), _o7.bottom && _o7.right && p.css("cursor", "se-resize"), _o7.top || _o7.bottom || _o7.left || _o7.right || p.css("cursor", "unset"), g && p.css("cursor", "move"));
    }
  }), e.exports = s;
}, function (e, t, i) {
  var n = i(1),
      r = i(0);
  var a;

  e.exports = function (e, t) {
    if ((t = t || {}).drop) return;
    var i = document.createElement("canvas"),
        o = i.getContext("2d"),
        s = document.createElement("video");
    s.crossOrigin = "anonymous", s.controls = !0, s.muted = !0, s.src = e, s.load();
    var l = [],
        h = t.start || 1,
        c = t.frameRate || 24,
        d = t.quality || .1,
        u = t.width || 640,
        p = t.height || 480;
    s.addEventListener("loadedmetadata", function () {
      var e = t.end || s.duration,
          a = t.frameCount || (e - h) * c,
          o = r.scaleSize(s.videoWidth, s.videoHeight, u, p);
      i.width = o.width, i.height = o.height, s.currentTime = h, s.addEventListener("seeked", function () {
        t.drop ? n.emit("extractKeyframeDone", l) : l.length < a ? (n.emit("extractKeyframeProgress", a), s.currentTime += 1 / c) : n.emit("extractKeyframeDone", l);
      });
    });
    var f = n.on("extractKeyframeProgress", function (e) {
      o.drawImage(s, 0, 0, i.width, i.height);
      var n = i.toDataURL("image/jpeg", d),
          r = new Image();
      r.crossOrigin = "anonymous", r.src = n;
      var h = {
        image: r,
        time: s.currentTime
      };
      l.push(h), o.clearRect(0, 0, i.width, i.height), "function" == typeof t.progress && (a = l.length / e * 100, t.progress(h.image, a));
    });
    n.once("extractKeyframeDone", function (e) {
      e.sort(function (e, t) {
        return e.time - t.time;
      });

      for (var r = 0; r < e.length; r++) {
        e[r] = e[r].image;
      }

      t.done(e), n.removeListener(f), i.remove();
    });
  };
}]);