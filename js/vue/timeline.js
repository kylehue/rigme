"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var clonedeep = require("lodash.clonedeep"),
    events = require("../../../lib/events.js"),
    mouse = require("../../../lib/mouse.js"),
    config = require("../../../lib/config.js"),
    utils = require("../../../lib/utils.js"),
    vector = require("../../../lib/vector.js"),
    rigModel = require("../rig.model.js"),
    contextMenuApp = require("./contextMenu.js"),
    history = require("../history.js");

var lastActiveJointId, lastActiveJointSub, timeline, selectedKeyframe, keyframeClipboard;
var timelineApp = new Vue({
  el: "#timelineApp",
  data: {
    hidden: !1,
    totalFrames: parseInt(document.getElementById("frameCount").value),
    animationSpeed: parseInt(document.getElementById("animationSpeed").value),
    currentFrame: 0
  },
  methods: {
    fixData: function fixData() {
      this.animationSpeed = parseInt(document.getElementById("animationSpeed").value), this.totalFrames = parseInt(document.getElementById("frameCount").value), timeline.hatchMark.spacing = timeline.canvas.width / this.totalFrames, timeline.snap(), timeline.redraw(), timeline.playbackHandle.end.mark >= this.totalFrames && 1 != this.totalFrames && (timeline.playbackHandle.end.mark = this.totalFrames - 1, timeline.playbackHandle.end._x = timeline.markToX(timeline.playbackHandle.end.mark), timeline.redraw());
      var t = {
        frameCount: this.totalFrames,
        animationSpeed: this.animationSpeed
      };
      localStorage.setItem(config.autosave.label + ".frames.config", JSON.stringify(t));
    },
    validateFormat: function validateFormat(t) {
      timeline.redraw(), t.target.value = t.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, ""), this.validateMax(t), this.fixData();
    },
    validateAmount: function validateAmount(t) {
      this.validateMin(t), this.validateMax(t), this.fixData();
    },
    validateMax: function validateMax(t) {
      var e = t.target.value;
      var i = config.animation.frameCount.max;
      "animationSpeed" == t.target.id && (i = config.animation.speed.max), parseInt(e) > i && (t.target.value = i.toString()), this.fixData();
    },
    validateMin: function validateMin(t) {
      var e = t.target.value;
      var i = config.animation.frameCount.min;
      "animationSpeed" == t.target.id && (i = config.animation.speed.min), parseInt(e) < i && (t.target.value = i.toString()), this.fixData();
    },
    addToHistory: function addToHistory() {
      this.totalFrames != this._previousTotalFrames && history.add({
        label: "Change frame count",
        value: this.totalFrames,
        group: "input"
      }), this.animationSpeed != this._previousAnimationSpeed && history.add({
        label: "Change animation speed",
        value: this.animationSpeed,
        group: "input"
      }), this._previousTotalFrames = this.totalFrames, this._previousAnimationSpeed = this.animationSpeed;
    },
    toggleAmount: function toggleAmount(e) {
      if (e.target == document.activeElement) {
        var i = e.wheelDeltaY < 0;
        var t = parseInt(e.target.value);
        i ? t-- : t++, e.target.value = t.toString(), timelineApp.validateAmount(e), this.fixData();
      }
    },
    setCurrentFrame: function setCurrentFrame(t) {
      this.currentFrame = t;
    }
  }
});

function getFrames() {
  var t = timelineApp.totalFrames,
      e = timeline.state.currentMark;
  var i = null;

  for (var a = parseInt(e); 0 <= a; a--) {
    var s = rigModel.keyframes[a];

    if (s && "head" == s.type) {
      i = s.index;
      break;
    }
  }

  var r = null;

  for (a = parseInt(e) + 1; a < t; a++) {
    var n = rigModel.keyframes[a];

    if (n && "head" == n.type) {
      r = n.index;
      break;
    }
  }

  var l = null;

  for (a = i - 1; 0 <= a; a--) {
    var h = rigModel.keyframes[a];

    if (h && "head" == h.type) {
      l = h.index;
      break;
    }
  }

  return {
    current: i,
    next: r,
    previous: l
  };
}

function mouseInside(t) {
  if (t = document.getElementById(t.id)) {
    t = t.getBoundingClientRect();
    return mouse.x >= t.x && mouse.x <= t.x + t.width && mouse.y >= t.y && mouse.y <= t.y + t.height;
  }

  return !1;
}

timelineApp._previousTotalFrames = timelineApp.totalFrames, timelineApp._previousAnimationSpeed = timelineApp.animationSpeed, timelineApp.$el.addEventListener("focusout", function () {});

var Timeline = /*#__PURE__*/function () {
  function Timeline() {
    var _this = this;

    _classCallCheck(this, Timeline);

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
      spacing: this.canvas.width / timelineApp.totalFrames,
      height: 4
    }, this.scrollbar = {}, this.playbackHandle = {
      start: {
        mark: 0,
        _x: 0
      },
      end: {
        mark: timelineApp.totalFrames - 1,
        _x: 0
      },
      width: 2,
      offset: 6
    }, this.bounds = this.canvas.getBoundingClientRect(), this.loop = null, this.addButtonEvents(), this.addMouseEvents(), this.addKeyboardEvents(), this.updateSize(), addEventListener("resize", function () {
      _this.updateSize(), _this.scrollbar.left = utils.clamp(_this.scrollbar.left, 0, _this.canvas.width - _this.scrollbar.minWidth), _this.scrollbar.right = utils.clamp(_this.scrollbar.right, _this.scrollbar.minWidth, _this.canvas.width), _this.scrollbar.width = _this.scrollbar.right - _this.scrollbar.left, _this.redraw();
    }), addEventListener("load", function (t) {
      _this.updateSize(), _this.redraw();
    }), this.scrollbar = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: void 0,
      color: config.render.timeline.scrollbar.color.default,
      left: 0,
      right: this.canvas.width,
      minWidth: 50,
      zoomSensitivity: 10
    }, this._timelineHeight = void 0;
  }

  _createClass(Timeline, [{
    key: "storeSelectedKeyframe",
    value: function storeSelectedKeyframe() {
      for (var e = Object.keys(rigModel.keyframes), i = 0; i < e.length; i++) {
        var a = e[i];
        var t = rigModel.keyframes[a];
        t.index == this.state.currentMark ? t.selected = !0 : t.selected = !1;
      }
    }
  }, {
    key: "markToX",
    value: function markToX(t, e) {
      var i = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
          a = Math.round(utils.clamp(i - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing),
          i = i % this.hatchMark.spacing,
          i = (t - a) * this.hatchMark.spacing + this.hatchMark.spacing / 2 - i;
      return e ? i : utils.clamp(i, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
    }
  }, {
    key: "xToMark",
    value: function xToMark(t) {
      var e = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
          i = Math.round(utils.clamp(e - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing),
          e = e % this.hatchMark.spacing,
          i = Math.round((t + e + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + i;
      return utils.clamp(i, 0, timelineApp.totalFrames - 1);
    }
  }, {
    key: "addKeyboardEvents",
    value: function addKeyboardEvents() {
      var _this2 = this;

      addEventListener("keydown", function (t) {
        Object.keys(rigModel.keyframes);
        _this2.storeSelectedKeyframe(), t.ctrlKey && (67 == t.keyCode && (rigModel.copiedKeyframe = clonedeep(rigModel.getKeyframe("selected", !0))), 86 != t.keyCode || (t = rigModel.copiedKeyframe) && rigModel.setKeyframe(_this2.state.currentMark, {
          position: vector(_this2.state.currentMark * _this2.hatchMark.spacing + _this2.hatchMark.spacing / 2, 0),
          locked: 0 == _this2.state.currentMark,
          id: utils.uid(),
          joints: t.joints
        }));
      });
    }
  }, {
    key: "addMouseEvents",
    value: function addMouseEvents() {
      var _this3 = this;

      this.canvas.addEventListener("contextmenu", function (t) {
        var e, i;
        mouse.x, _this3.bounds.x, mouse.y, _this3.bounds.y;
        mouseInside(_this3.canvas) && (_this3.storeSelectedKeyframe(), e = mouse.x + contextMenuApp.width > innerWidth ? -contextMenuApp.width : 0, i = mouse.y + contextMenuApp.height > innerHeight ? -contextMenuApp.height : 0, contextMenuApp.show(mouse.x + e, mouse.y + i));
      });
      var m = !1,
          p = null,
          u,
          g = 0,
          k,
          b,
          v,
          y,
          f,
          x,
          M,
          w;
      this.redraw(), addEventListener("mouseup", function () {
        var t;
        m = !1, events.emit("renderFocus"), "playbackHandleStart" != p && "playbackHandleEnd" != p || (t = {
          start: _this3.playbackHandle.start.mark,
          end: _this3.playbackHandle.end.mark
        }, localStorage.setItem(config.autosave.label + ".playback.config", JSON.stringify(t))), p = null, u && (t = _this3.xToMark(_this3.state._x), _this3.setCurrentMark(t), rigModel.deleteKeyframe(u.id), rigModel.setKeyframe(t, {
          position: u.position,
          joints: u.joints,
          locked: 0 == t
        })), _this3.scrollbar.color = config.render.timeline.scrollbar.color.default, _this3.snap(), _this3.state.isDragging = !1, _this3.playbackHandle.start.isDragging = !1, _this3.playbackHandle.end.isDragging = !1, u = null, _this3.canvas.style.cursor = "default", _this3.redraw();
      }), addEventListener("mousedown", function () {
        var t, e, i;
        mouseInside(_this3.canvas) && (m = !0, events.emit("renderSleep"), _this3.playbackHandle.end.mark >= timelineApp.totalFrames && 1 != timelineApp.totalFrames && (_this3.playbackHandle.end.mark = timelineApp.totalFrames - 1, _this3.playbackHandle.end._x = _this3.markToX(_this3.playbackHandle.end.mark), _this3.redraw()), m && !p && (v ? (g = _this3.scrollbar.left - k, p = "scrollbar") : y ? (p = "timeline", t = _this3.markToX(_this3.playbackHandle.start.mark, !0), e = _this3.markToX(_this3.playbackHandle.end.mark, !0), i = _this3.playbackHandle.width / 2 + _this3.playbackHandle.offset / 2, k >= t - i && k <= t + i ? p = "playbackHandleStart" : k >= e - i && k <= e + i && (p = "playbackHandleEnd")) : f && (p = "keyframe")), "timeline" == p && (_this3.state.isDragging = !0, _this3.state._x = utils.clamp(k, _this3.hatchMark.spacing / 2, _this3.canvas.width - _this3.hatchMark.spacing / 2), 0 <= (i = _this3.xToMark(k)) && i <= timelineApp.totalFrames && _this3.setCurrentMark(i)), contextMenuApp.hide());
      }), addEventListener("mousemove", function () {
        if (k = mouse.x - _this3.bounds.x, b = mouse.y - _this3.bounds.y, m || !(b < 0 || b > _this3.canvas.height || k < 0 || k > _this3.canvas.width)) {
          v = 0 <= b && b <= _this3.scrollbar.height, y = b >= _this3.scrollbar.height && b <= _this3.scrollbar.height + _this3._timelineHeight, f = b >= _this3.scrollbar.height + _this3._timelineHeight && b <= _this3.canvas.height;
          p || (x = k <= _this3.scrollbar.left + 10, M = k >= _this3.scrollbar.right - 10);

          var t,
              e = k >= _this3.scrollbar.left && k <= _this3.scrollbar.right && (x || M) && v,
              i = _this3.markToX(_this3.playbackHandle.start.mark, !0),
              a = _this3.markToX(_this3.playbackHandle.end.mark, !0),
              s = _this3.playbackHandle.width / 2 + _this3.playbackHandle.offset / 2;

          if (w = (k >= i - s && k <= i + s || k >= a - s && k <= a + s) && y, e || w ? _this3.canvas.style.cursor = "ew-resize" : _this3.canvas.style.cursor = "default", f) for (var r, n, l, h = Object.keys(rigModel.keyframes), o = 0; o < h.length; o++) {
            var _t = rigModel.keyframes[h[o]];
            "head" == _t.type && (r = _t.render.position.x, n = _t.render.position.y, l = _t.render.size, k <= r + l && k >= r - l && b <= n + l && b && b >= n - l ? (_t.hovered = !0, _t.render.color = config.render.keyframe.color.hovered, _this3.canvas.style.cursor = "pointer") : (_t.hovered = !1, _t.render.color = config.render.keyframe.color.default), _this3.redraw());
          }

          if (v && k >= _this3.scrollbar.left && k <= _this3.scrollbar.right ? _this3.scrollbar.color = config.render.timeline.scrollbar.color.hovered : _this3.scrollbar.color = config.render.timeline.scrollbar.color.default, _this3.redraw(), m) {
            if ("scrollbar" == p && (x ? (_this3.scrollbar.left = utils.clamp(k, 0, _this3.scrollbar.right - _this3.scrollbar.minWidth), _this3.scrollbar.width = _this3.scrollbar.right - _this3.scrollbar.left, _this3.canvas.style.cursor = "ew-resize") : M && (_this3.scrollbar.right = utils.clamp(k, _this3.scrollbar.left + _this3.scrollbar.minWidth, _this3.canvas.width), _this3.scrollbar.width = _this3.scrollbar.right - _this3.scrollbar.left, _this3.canvas.style.cursor = "ew-resize"), x || M || (_this3.scrollbar.left = utils.clamp(k + g, 0, _this3.canvas.width - _this3.scrollbar.width), _this3.scrollbar.right = _this3.scrollbar.left + _this3.scrollbar.width, _this3.canvas.style.cursor = "default"), _this3.snap()), "timeline" != p && "keyframe" != p || (_this3.state.isDragging = !0, _this3.state._x = utils.clamp(k, _this3.hatchMark.spacing / 2, _this3.canvas.width - _this3.hatchMark.spacing / 2), 0 <= (e = _this3.xToMark(k)) && e <= timelineApp.totalFrames && _this3.setCurrentMark(e)), "playbackHandleStart" == p && (_this3.playbackHandle.start.isDragging = !0, _this3.playbackHandle.start._x = utils.clamp(k, _this3.hatchMark.spacing / 2, _this3.playbackHandle.end._x - _this3.playbackHandle.width / 2 - _this3.hatchMark.spacing), t = _this3.xToMark(k), 0 <= (t = utils.clamp(t, 0, _this3.playbackHandle.end.mark - 1)) && t <= timelineApp.totalFrames && (_this3.playbackHandle.start.mark = t), _this3.canvas.style.cursor = "ew-resize"), "playbackHandleEnd" == p && (_this3.playbackHandle.end.isDragging = !0, _this3.playbackHandle.end._x = utils.clamp(k, _this3.playbackHandle.start._x + _this3.playbackHandle.width / 2 + _this3.hatchMark.spacing, _this3.canvas.width - _this3.hatchMark.spacing / 2), t = _this3.xToMark(k), 0 <= (t = utils.clamp(t, _this3.playbackHandle.start.mark + 1, timelineApp.totalFrames - 1)) && t <= timelineApp.totalFrames && (_this3.playbackHandle.end.mark = t), _this3.canvas.style.cursor = "ew-resize"), "keyframe" == p) if (u) _this3.state._x = utils.clamp(k, _this3.hatchMark.spacing / 2, _this3.canvas.width - _this3.hatchMark.spacing / 2), u.render.position.x = _this3.state._x, u.dragged = !0, u.render.color = config.render.keyframe.color.active;else for (var c = Object.keys(rigModel.keyframes), o = 0; o < c.length; o++) {
              var d = rigModel.keyframes[c[o]];
              d && (d.locked || d.hovered && (u = d));
            }

            _this3.redraw();
          }
        }
      });
    }
  }, {
    key: "addButtonEvents",
    value: function addButtonEvents() {
      var _this4 = this;

      this.buttons.previous.addEventListener("click", function () {
        var t = 0 < _this4.state.currentMark ? _this4.state.currentMark - 1 : _this4.state.currentMark;

        _this4.setCurrentMark(t);
      }), this.buttons.next.addEventListener("click", function () {
        var t = _this4.state.currentMark < timelineApp.totalFrames - 1 ? _this4.state.currentMark + 1 : _this4.state.currentMark;

        _this4.setCurrentMark(t);
      }), this.buttons.play.addEventListener("click", function () {
        _this4.state.isPlaying ? _this4.stop() : _this4.play(), _this4.redraw();
      }), this.buttons.add.addEventListener("click", function () {
        var t = rigModel.clone()[_this4.state.currentMark];

        var e;
        t && (e = t.joints), rigModel.setKeyframe(_this4.state.currentMark, {
          locked: 0 == _this4.state.currentMark,
          joints: e
        });
      }), this.buttons.delete.addEventListener("click", function () {
        events.emit("deleteKeyframe");
      });
      var e;
      this.buttons.zoomIn.addEventListener("mousedown", function () {
        events.emit("checkMouseHold", "zoomIn");
      }), this.buttons.zoomOut.addEventListener("mousedown", function () {
        events.emit("checkMouseHold", "zoomOut");
      }), events.on("checkMouseHold", function (t) {
        e = setInterval(function () {
          mouse.pressed ? events.emit("mousehold", t) : (clearInterval(e), e = null);
        }, 1e3 / 60);
      }), events.on("mousehold", function (t) {
        var e, i;
        "zoomIn" == t ? (e = utils.map(_this4.scrollbar.width, 0, _this4.canvas.width, .1, .001), i = _this4.markToX(_this4.state.currentMark, !0), _this4.scrollbar.left = utils.lerp(_this4.scrollbar.left, i - _this4.scrollbar.minWidth / 2, e), _this4.scrollbar.right = utils.lerp(_this4.scrollbar.right, i + _this4.scrollbar.minWidth / 2, e)) : "zoomOut" == t && (t = utils.map(_this4.scrollbar.width, 0, _this4.canvas.width, .001, .1), _this4.scrollbar.left = utils.lerp(_this4.scrollbar.left, 0, t), _this4.scrollbar.right = utils.lerp(_this4.scrollbar.right, _this4.canvas.width, t)), _this4.scrollbar.width = _this4.scrollbar.right - _this4.scrollbar.left, _this4.snap(), _this4.redraw();
      }), this.buttons.minimize.addEventListener("click", function () {
        _this4.state.isMinimized ? _this4.maximize() : _this4.minimize();
      });
    }
  }, {
    key: "snap",
    value: function snap() {
      for (var e = Object.keys(rigModel.keyframes), i = 0; i < e.length; i++) {
        var a = e[i];
        var t = rigModel.keyframes[a];
        a = this.markToX(t.index, !0);
        t.render.position.x = a;
      }

      this.state._x = this.markToX(this.state.currentMark, !0), this.playbackHandle.start._x = this.markToX(this.playbackHandle.start.mark, !0), this.playbackHandle.end._x = this.markToX(this.playbackHandle.end.mark, !0), this.redraw();
    }
  }, {
    key: "updateState",
    value: function updateState(t) {
      t = void 0 === t || t;
      var e = getFrames();

      if (this.state.currentFrame = e.current, this.state.nextFrame = e.next, this.state.previousFrame = e.previous, t) {
        var _e = rigModel.keyframes[this.state.currentMark];
        _e = _e || rigModel.keyframes[this.state.currentFrame], "object" == _typeof(_e) && (rigModel.joints = _e.joints, t = rigModel.joints.find(function (t) {
          return t.id === _e.activeJointId;
        }), rigModel.activeJoint = t || rigModel.joints[rigModel.joints.length - 1]);
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
      var t = this.canvas.parentNode;
      this.canvas.width == t.offsetWidth && this.canvas.height == t.offsetHeight || (this.canvas.width = t.offsetWidth, this.canvas.height = t.offsetHeight), this.scrollbar.height = .25 * this.canvas.height, this._timelineHeight = .4 * this.canvas.height;
      var e = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity),
          i = this.canvas.width + utils.map(this.scrollbar.width, 0, this.canvas.width, this.canvas.width * this.scrollbar.zoomSensitivity, 0),
          a = timelineApp.totalFrames,
          s = "rgba(255, 255, 255, 0.25)",
          r = 5 * Math.floor(utils.clamp(timelineApp.totalFrames, i / 15, Number.MAX_SAFE_INTEGER) / (i / 15)),
          n = Math.round((e - this.hatchMark.spacing / 2) / this.hatchMark.spacing),
          l = Math.round((utils.map(this.scrollbar.right, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity) - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
      var h = this.markToX(this.state.currentMark, !0);
      h = this.state.isDragging ? this.state._x : h;
      var o = this._timelineHeight - this.hatchMark.height,
          t = this.state.currentMark + 1;
      this.createRect(this.scrollbar.left, this.scrollbar.y, this.scrollbar.right - this.scrollbar.left, this.scrollbar.height - 5, this.scrollbar.color, 4), this.createRect(0, this.scrollbar.height, this.canvas.width, this._timelineHeight, "rgba(0, 0, 0, 0.15)", 4), this.context.save(), this.context.clip(), this.hatchMark.spacing = i / a;

      for (var c, d, m, p, u = 0; u < a; u++) {
        u < n || l < u || (d = this.hatchMark.spacing * u + this.hatchMark.spacing / 2 - e, m = this.scrollbar.height + this._timelineHeight - this.hatchMark.height - (c = (u + 1) % r == 0 ? 2 : 0), p = this.scrollbar.height + this._timelineHeight - m, this.createRect(d - .5, m, 1, p, s), c && (d >= h - 5 && d <= h + 5 || this.text(u + 1, d, m - 1, s)));
      }

      this.context.beginPath(), this.context.moveTo(h - 5, this.scrollbar.height), this.context.lineTo(h + 5, this.scrollbar.height), this.context.lineTo(h + 5, this.scrollbar.height + o - 5), this.context.lineTo(h, this.scrollbar.height + o), this.context.lineTo(h - 5, this.scrollbar.height + o - 5), this.context.closePath(), this.context.fillStyle = config.accent, this.context.fill(), this.text(t, h + 10, o / 2 + 8 + this.scrollbar.height, config.accent, "left");
      var g,
          o = "rgba(0, 0, 0, 0.15)";
      var k = this.markToX(this.playbackHandle.start.mark, !0);
      k = this.playbackHandle.start.isDragging ? this.playbackHandle.start._x : k, this.createRect(k - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, config.accent), this.createRect(0, this.scrollbar.height, k, this._timelineHeight, o);
      var b = this.markToX(this.playbackHandle.end.mark, !0);
      b = this.playbackHandle.end.isDragging ? this.playbackHandle.end._x : b, this.createRect(b - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, config.accent), this.createRect(b, this.scrollbar.height, this.canvas.width - b, this._timelineHeight, o), this.context.restore();

      for (var _i = 0, _Object$keys = Object.keys(rigModel.keyframes); _i < _Object$keys.length; _i++) {
        g = _Object$keys[_i];
        var _t2 = rigModel.keyframes[g];
        _t2.render.position.y = this.scrollbar.height + this._timelineHeight + _t2.render.size + 5;
        var v = this.markToX(_t2.index, !0);
        _t2.render.position.x = _t2.dragged ? mouse.x - this.bounds.x : v, "head" == _t2.type && this.createKeyframe(_t2.render.position.x, _t2.render.position.y, _t2.render.size, _t2.render.color);
      }
    }
  }, {
    key: "text",
    value: function text(t, e, i, a, s) {
      this.context.beginPath(), this.context.fillStyle = a, this.context.font = "12px Catamaran", this.context.textAlign = s || "center", this.context.textBaseline = "bottom", this.context.fillText(t, e, i);
    }
  }, {
    key: "createRect",
    value: function createRect(t, e, i, a, s, r) {
      r = r || 0, this.context.beginPath(), this.context.moveTo(t + r, e), this.context.lineTo(t + i - r, e), this.context.quadraticCurveTo(t + i, e, t + i, e + r), this.context.lineTo(t + i, e + a - r), this.context.quadraticCurveTo(t + i, e + a, t + i - r, e + a), this.context.lineTo(t + r, e + a), this.context.quadraticCurveTo(t, e + a, t, e + a - r), this.context.lineTo(t, e + r), this.context.quadraticCurveTo(t, e, t + r, e), this.context.closePath(), this.context.fillStyle = s, this.context.fill();
    }
  }, {
    key: "createLine",
    value: function createLine(t, e, i, a, s) {
      this.context.beginPath(), this.context.moveTo(t, e), this.context.lineTo(i, a), this.context.strokeStyle = s, this.context.stroke();
    }
  }, {
    key: "createKeyframe",
    value: function createKeyframe(t, e, i, a) {
      this.context.beginPath(), this.context.moveTo(t, e - i / 2), this.context.lineTo(t + i / 2, e), this.context.lineTo(t, e + i / 2), this.context.lineTo(t - i / 2, e), this.context.closePath(), this.context.fillStyle = a, this.context.fill();
    }
  }, {
    key: "setCurrentMark",
    value: function setCurrentMark(t, e) {
      this.state.currentMark = t, timelineApp.setCurrentFrame(this.state.currentMark), this.updateState(e), this.redraw(), events.emit("timelineSeeked");
    }
  }, {
    key: "play",
    value: function play() {
      var _this5 = this;

      this.loop = setInterval(function () {
        _this5.state.currentMark < _this5.playbackHandle.start.mark && _this5.setCurrentMark(_this5.playbackHandle.start.mark - 1);
        var t = _this5.state.currentMark < _this5.playbackHandle.end.mark ? _this5.state.currentMark + 1 : _this5.playbackHandle.start.mark;

        _this5.setCurrentMark(t);
      }, 1e3 / timelineApp.animationSpeed), this.state.isPlaying = !0, this.buttons.play.firstChild.src = "assets/svg/round-square.svg", document.getElementById("propertyApp").classList.add("disabled");
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.loop), this.state.isPlaying = !1, this.buttons.play.firstChild.src = "assets/svg/play.svg", document.getElementById("propertyApp").classList.remove("disabled"), events.emit("timelineSeeked");
    }
  }, {
    key: "updateSize",
    value: function updateSize() {
      var _this6 = this;

      var t = function t() {
        var t = _this6.canvas.parentNode.getBoundingClientRect();

        _this6.canvas.width = t.width, _this6.canvas.height = t.height, _this6.bounds = _this6.canvas.getBoundingClientRect(), _this6.redraw();
      };

      t(), setTimeout(t, 100);
    }
  }, {
    key: "minimize",
    value: function minimize() {
      var t = timelineApp.$el.offsetHeight,
          e = document.querySelector("#timelineApp div.row-b");
      timelineApp.$el.style.transform = "translateY(".concat(t - e.offsetTop - 2, "px)"), this.buttons.minimize.style.transform = "translateY(-40px) rotate(0deg)", this.state.isMinimized = !0;
    }
  }, {
    key: "maximize",
    value: function maximize() {
      timelineApp.$el.offsetHeight;
      timelineApp.$el.style.transform = "translateY(0px)", this.buttons.minimize.style.transform = "translateY(-40px) rotate(180deg)", this.state.isMinimized = !1;
    }
  }]);

  return Timeline;
}();

timeline = new Timeline(), utils.loadJSONData(config.autosave.label + ".frames.config", function (t) {
  var e = document.getElementById("frameCount"),
      i = document.getElementById("animationSpeed");
  "number" == typeof t.frameCount && (e.value = t.frameCount), "number" == typeof t.animationSpeed && (i.value = t.animationSpeed), timelineApp.fixData();
}), utils.loadJSONData(config.autosave.label + ".playback.config", function (t) {
  "number" == typeof t.start && (timeline.playbackHandle.start.mark = t.start), "number" == typeof t.end && (timeline.playbackHandle.end.mark = t.end), timeline.redraw();
}), module.exports = {
  app: timelineApp,
  graph: timeline
};