function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var clonedeep = require("lodash.clonedeep");

var events = require("../../../lib/events.js");

var mouse = require("../../../lib/mouse.js");

var config = require("../../../lib/config.js");

var utils = require("../../../lib/utils.js");

var vector = require("../../../lib/vector.js");

var rigModel = require("../rig.model.js");

var contextMenuApp = require("./contextMenu.js");

var history = require("../history.js");

var lastActiveJointId, lastActiveJointSub;
var timeline;
var selectedKeyframe, keyframeClipboard;
var timelineApp = new Vue({
  el: "#timelineApp",
  data: {
    hidden: false,
    totalFrames: parseInt(document.getElementById("frameCount").value),
    animationSpeed: parseInt(document.getElementById("animationSpeed").value),
    currentFrame: 0
  },
  methods: {
    fixData: function fixData() {
      this.animationSpeed = parseInt(document.getElementById("animationSpeed").value);
      this.totalFrames = parseInt(document.getElementById("frameCount").value);
      timeline.hatchMark.spacing = timeline.canvas.width / this.totalFrames;
      timeline.snap();
      timeline.redraw();

      if (timeline.playbackHandle.end.mark >= this.totalFrames && this.totalFrames != 1) {
        timeline.playbackHandle.end.mark = this.totalFrames - 1;
        timeline.playbackHandle.end._x = timeline.markToX(timeline.playbackHandle.end.mark);
        timeline.redraw();
      }

      var configData = {
        frameCount: this.totalFrames,
        animationSpeed: this.animationSpeed
      };
      localStorage.setItem(config.autosave.label + ".frames.config", JSON.stringify(configData));
    },
    validateFormat: function validateFormat(e) {
      timeline.redraw();
      e.target.value = e.target.value.replace(/[^0-9.-]/g, "").replace(/(\..*)\./g, "$1").replace(/^0+/g, "").replace(/(?<!^)-/g, "");
      this.validateMax(e);
      this.fixData();
    },
    validateAmount: function validateAmount(e) {
      this.validateMin(e);
      this.validateMax(e);
      this.fixData();
    },
    validateMax: function validateMax(e) {
      var value = e.target.value;
      var max = config.animation.frameCount.max;
      if (e.target.id == "animationSpeed") max = config.animation.speed.max;

      if (parseInt(value) > max) {
        e.target.value = max.toString();
      }

      this.fixData();
    },
    validateMin: function validateMin(e) {
      var value = e.target.value;
      var min = config.animation.frameCount.min;
      if (e.target.id == "animationSpeed") min = config.animation.speed.min;

      if (parseInt(value) < min) {
        e.target.value = min.toString();
      }

      this.fixData();
    },
    addToHistory: function addToHistory() {
      if (this.totalFrames != this._previousTotalFrames) {
        history.add({
          label: "Change frame count",
          value: this.totalFrames,
          group: "input"
        });
      }

      if (this.animationSpeed != this._previousAnimationSpeed) {
        history.add({
          label: "Change animation speed",
          value: this.animationSpeed,
          group: "input"
        });
      }

      this._previousTotalFrames = this.totalFrames;
      this._previousAnimationSpeed = this.animationSpeed;
    },
    toggleAmount: function toggleAmount(e) {
      if (e.target != document.activeElement) return;
      var isDown = e.wheelDeltaY < 0;
      var value = parseInt(e.target.value);

      if (isDown) {
        value--;
      } else {
        value++;
      }

      e.target.value = value.toString();
      timelineApp.validateAmount(e);
      this.fixData();
    },
    setCurrentFrame: function setCurrentFrame(index) {
      this.currentFrame = index;
    }
  }
});
timelineApp._previousTotalFrames = timelineApp.totalFrames;
timelineApp._previousAnimationSpeed = timelineApp.animationSpeed;
timelineApp.$el.addEventListener("focusout", function () {//timelineApp.addToHistory();
});

function getFrames() {
  var totalFrames = timelineApp.totalFrames;
  var currentMark = timeline.state.currentMark; //Get the current frame

  var currentFrame = null;

  for (var i = parseInt(currentMark); i >= 0; i--) {
    var key = rigModel.keyframes[i];

    if (key) {
      if (key.type == "head") {
        currentFrame = key.index;
        break;
      }
    }
  } //Get the next frame


  var nextFrame = null;

  for (var i = parseInt(currentMark) + 1; i < totalFrames; i++) {
    var _key = rigModel.keyframes[i];

    if (_key) {
      if (_key.type == "head") {
        nextFrame = _key.index;
        break;
      }
    }
  } //Get the previous frame


  var previousFrame = null;

  for (var i = currentFrame - 1; i >= 0; i--) {
    var _key2 = rigModel.keyframes[i];

    if (_key2) {
      if (_key2.type == "head") {
        previousFrame = _key2.index;
        break;
      }
    }
  }

  return {
    current: currentFrame,
    next: nextFrame,
    previous: previousFrame
  };
}

function mouseInside(el) {
  el = document.getElementById(el.id);

  if (el) {
    var bounds = el.getBoundingClientRect();
    return mouse.x >= bounds.x && mouse.x <= bounds.x + bounds.width && mouse.y >= bounds.y && mouse.y <= bounds.y + bounds.height;
  }

  return false;
}

var Timeline = /*#__PURE__*/function () {
  function Timeline() {
    var _this = this;

    _classCallCheck(this, Timeline);

    this.canvas = document.getElementById("timelineGraph");
    this.context = this.canvas.getContext("2d");
    this.buttons = {
      previous: document.getElementById("lastFrame"),
      play: document.getElementById("playStop"),
      next: document.getElementById("nextFrame"),
      add: document.getElementById("addKeyframe"),
      "delete": document.getElementById("deleteKeyframe"),
      zoomIn: document.getElementById("zoomInTimeline"),
      zoomOut: document.getElementById("zoomOutTimeline"),
      minimize: document.getElementById("minimize"),
      scrollbar: document.getElementById("timelineScrollbar")
    };
    this.state = {
      isPlaying: false,
      isDragging: false,
      isMinimized: false,
      currentMark: 0,
      currentFrame: 0,
      nextFrame: null,
      previousFrame: null,
      _x: 0
    };
    this.hatchMark = {
      spacing: this.canvas.width / timelineApp.totalFrames,
      height: 4
    };
    this.scrollbar = {};
    this.playbackHandle = {
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
    };
    this.bounds = this.canvas.getBoundingClientRect();
    this.loop = null;
    this.addButtonEvents();
    this.addMouseEvents();
    this.addKeyboardEvents();
    this.updateSize();
    addEventListener("resize", function () {
      _this.updateSize();

      _this.scrollbar.left = utils.clamp(_this.scrollbar.left, 0, _this.canvas.width - _this.scrollbar.minWidth);
      _this.scrollbar.right = utils.clamp(_this.scrollbar.right, _this.scrollbar.minWidth, _this.canvas.width);
      _this.scrollbar.width = _this.scrollbar.right - _this.scrollbar.left;

      _this.redraw();
    });
    addEventListener("load", function (e) {
      _this.updateSize();

      _this.redraw();
    });
    this.scrollbar = {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: undefined,
      color: config.render.timeline.scrollbar.color["default"],
      left: 0,
      right: this.canvas.width,
      minWidth: 50,
      zoomSensitivity: 10
    };
    this._timelineHeight = undefined;
  }

  _createClass(Timeline, [{
    key: "storeSelectedKeyframe",
    value: function storeSelectedKeyframe() {
      var keys = Object.keys(rigModel.keyframes);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var frame = rigModel.keyframes[key];

        if (frame.index == this.state.currentMark) {
          frame.selected = true;
        } else {
          frame.selected = false;
        }
      }
    }
  }, {
    key: "markToX",
    value: function markToX(mark, ignoreLimits) {
      var scrollState = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity);
      var scrollIndex = Math.round(utils.clamp(scrollState - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing);
      var snap = scrollState % this.hatchMark.spacing;
      var x = (mark - scrollIndex) * this.hatchMark.spacing + this.hatchMark.spacing / 2 - snap;
      return ignoreLimits ? x : utils.clamp(x, this.hatchMark.spacing / 2, this.canvas.width - this.hatchMark.spacing / 2);
    }
  }, {
    key: "xToMark",
    value: function xToMark(x) {
      var scrollState = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity);
      var scrollIndex = Math.round(utils.clamp(scrollState - this.hatchMark.spacing / 2, 0, Number.MAX_SAFE_INTEGER) / this.hatchMark.spacing);
      var snap = scrollState % this.hatchMark.spacing;
      var mark = Math.round((x + snap + this.hatchMark.spacing / 2) / this.hatchMark.spacing) - 1 + scrollIndex;
      return utils.clamp(mark, 0, timelineApp.totalFrames - 1);
    }
  }, {
    key: "addKeyboardEvents",
    value: function addKeyboardEvents() {
      var _this2 = this;

      addEventListener("keydown", function (event) {
        var keys = Object.keys(rigModel.keyframes);

        _this2.storeSelectedKeyframe();

        if (event.ctrlKey) {
          if (event.keyCode == 67) {
            rigModel.copiedKeyframe = clonedeep(rigModel.getKeyframe("selected", true));
          }

          if (event.keyCode == 86) {
            var copiedKeyframe = rigModel.copiedKeyframe;

            if (copiedKeyframe) {
              rigModel.setKeyframe(_this2.state.currentMark, {
                position: vector(_this2.state.currentMark * _this2.hatchMark.spacing + _this2.hatchMark.spacing / 2, 0),
                locked: _this2.state.currentMark == 0 ? true : false,
                id: utils.uid(),
                joints: copiedKeyframe.joints
              });
            }
          }
        }
      });
    }
  }, {
    key: "addMouseEvents",
    value: function addMouseEvents() {
      var _this3 = this;

      this.canvas.addEventListener("contextmenu", function (event) {
        var mouseX = mouse.x - _this3.bounds.x;
        var mouseY = mouse.y - _this3.bounds.y;

        if (mouseInside(_this3.canvas)) {
          _this3.storeSelectedKeyframe();

          var offsetX = mouse.x + contextMenuApp.width > innerWidth ? -contextMenuApp.width : 0;
          var offsetY = mouse.y + contextMenuApp.height > innerHeight ? -contextMenuApp.height : 0;
          contextMenuApp.show(mouse.x + offsetX, mouse.y + offsetY);
        }
      });
      var dragging = false;
      var activeDrag = null;
      var activeKeyframe;
      var scrollbarDragStartX = 0;
      var mouseX, mouseY;
      var onScrollbar, onTimeline, onKeyframe, onScrollbarLeft, onScrollbarRight, onPlaybackHandle;

      var dragStart = function dragStart() {
        if (!mouseInside(_this3.canvas)) return;
        dragging = true;
        events.emit("renderSleep");

        if (_this3.playbackHandle.end.mark >= timelineApp.totalFrames && timelineApp.totalFrames != 1) {
          _this3.playbackHandle.end.mark = timelineApp.totalFrames - 1;
          _this3.playbackHandle.end._x = _this3.markToX(_this3.playbackHandle.end.mark);

          _this3.redraw();
        } //Which area is getting dragged?


        if (dragging && !activeDrag) {
          if (onScrollbar) {
            scrollbarDragStartX = _this3.scrollbar.left - mouseX;
            activeDrag = "scrollbar";
          } else if (onTimeline) {
            activeDrag = "timeline";

            var playbackHandleStartX = _this3.markToX(_this3.playbackHandle.start.mark, true);

            var playbackHandleEndX = _this3.markToX(_this3.playbackHandle.end.mark, true);

            var playbackHandleArea = _this3.playbackHandle.width / 2 + _this3.playbackHandle.offset / 2;

            if (mouseX >= playbackHandleStartX - playbackHandleArea && mouseX <= playbackHandleStartX + playbackHandleArea) {
              activeDrag = "playbackHandleStart";
            } else if (mouseX >= playbackHandleEndX - playbackHandleArea && mouseX <= playbackHandleEndX + playbackHandleArea) {
              activeDrag = "playbackHandleEnd";
            }
          } else if (onKeyframe) {
            activeDrag = "keyframe";
          }
        }

        if (activeDrag == "timeline") {
          _this3.state.isDragging = true;
          _this3.state._x = utils.clamp(mouseX, _this3.hatchMark.spacing / 2, _this3.canvas.width - _this3.hatchMark.spacing / 2);

          var mark = _this3.xToMark(mouseX);

          if (mark >= 0 && mark <= timelineApp.totalFrames) _this3.setCurrentMark(mark);
        }

        contextMenuApp.hide();
      };

      var dragEnd = function dragEnd() {
        dragging = false;
        events.emit("renderFocus");

        if (activeDrag == "playbackHandleStart" || activeDrag == "playbackHandleEnd") {
          var configData = {
            start: _this3.playbackHandle.start.mark,
            end: _this3.playbackHandle.end.mark
          };
          localStorage.setItem(config.autosave.label + ".playback.config", JSON.stringify(configData));
        }

        activeDrag = null; //Fix sub keyframes by resetting the head keyframe

        if (activeKeyframe) {
          var mark = _this3.xToMark(_this3.state._x);

          _this3.setCurrentMark(mark);

          rigModel.deleteKeyframe(activeKeyframe.id);
          var newFrame = rigModel.setKeyframe(mark, {
            position: activeKeyframe.position,
            joints: activeKeyframe.joints,
            locked: mark == 0 ? true : false
          });
        }

        _this3.scrollbar.color = config.render.timeline.scrollbar.color["default"];

        _this3.snap();

        _this3.state.isDragging = false;
        _this3.playbackHandle.start.isDragging = false;
        _this3.playbackHandle.end.isDragging = false;
        activeKeyframe = null;
        _this3.canvas.style.cursor = "default";

        _this3.redraw();
      };

      var drag = function drag() {
        mouseX = mouse.x - _this3.bounds.x;
        mouseY = mouse.y - _this3.bounds.y;

        if (!dragging) {
          if (mouseY < 0 || mouseY > _this3.canvas.height || mouseX < 0 || mouseX > _this3.canvas.width) {
            return;
          }
        }

        onScrollbar = mouseY >= 0 && mouseY <= _this3.scrollbar.height;
        onTimeline = mouseY >= _this3.scrollbar.height && mouseY <= _this3.scrollbar.height + _this3._timelineHeight;
        onKeyframe = mouseY >= _this3.scrollbar.height + _this3._timelineHeight && mouseY <= _this3.canvas.height;
        var resizeAreaSize = 10;

        if (!activeDrag) {
          onScrollbarLeft = mouseX <= _this3.scrollbar.left + resizeAreaSize;
          onScrollbarRight = mouseX >= _this3.scrollbar.right - resizeAreaSize;
        } //Cursor


        var onScrollbarResize = mouseX >= _this3.scrollbar.left && mouseX <= _this3.scrollbar.right && (onScrollbarLeft || onScrollbarRight) && onScrollbar;

        var playbackHandleStartX = _this3.markToX(_this3.playbackHandle.start.mark, true);

        var playbackHandleEndX = _this3.markToX(_this3.playbackHandle.end.mark, true);

        var playbackHandleArea = _this3.playbackHandle.width / 2 + _this3.playbackHandle.offset / 2;
        onPlaybackHandle = (mouseX >= playbackHandleStartX - playbackHandleArea && mouseX <= playbackHandleStartX + playbackHandleArea || mouseX >= playbackHandleEndX - playbackHandleArea && mouseX <= playbackHandleEndX + playbackHandleArea) && onTimeline;

        if (onScrollbarResize || onPlaybackHandle) {
          _this3.canvas.style.cursor = "ew-resize";
        } else {
          _this3.canvas.style.cursor = "default";
        } //Check if head keyframes are getting hovered


        if (onKeyframe) {
          var keys = Object.keys(rigModel.keyframes);

          for (var i = 0; i < keys.length; i++) {
            var frame = rigModel.keyframes[keys[i]];

            if (frame.type == "head") {
              var frameX = frame.render.position.x;
              var frameY = frame.render.position.y;
              var frameSize = frame.render.size;

              if (mouseX <= frameX + frameSize && mouseX >= frameX - frameSize && mouseY <= frameY + frameSize && mouseY && mouseY >= frameY - frameSize) {
                frame.hovered = true;
                frame.render.color = config.render.keyframe.color.hovered;
                _this3.canvas.style.cursor = "pointer";

                _this3.redraw();
              } else {
                frame.hovered = false;
                frame.render.color = config.render.keyframe.color["default"];

                _this3.redraw();
              }
            }
          }
        } //Change scrollbar color when hovered


        if (onScrollbar) {
          if (mouseX >= _this3.scrollbar.left && mouseX <= _this3.scrollbar.right) {
            _this3.scrollbar.color = config.render.timeline.scrollbar.color.hovered;

            _this3.redraw();
          } else {
            _this3.scrollbar.color = config.render.timeline.scrollbar.color["default"];

            _this3.redraw();
          }
        } else {
          _this3.scrollbar.color = config.render.timeline.scrollbar.color["default"];

          _this3.redraw();
        }

        if (dragging) {
          //Scrollbar drag
          if (activeDrag == "scrollbar") {
            if (onScrollbarLeft) {
              _this3.scrollbar.left = utils.clamp(mouseX, 0, _this3.scrollbar.right - _this3.scrollbar.minWidth);
              _this3.scrollbar.width = _this3.scrollbar.right - _this3.scrollbar.left;
              _this3.canvas.style.cursor = "ew-resize";
            } else if (onScrollbarRight) {
              _this3.scrollbar.right = utils.clamp(mouseX, _this3.scrollbar.left + _this3.scrollbar.minWidth, _this3.canvas.width);
              _this3.scrollbar.width = _this3.scrollbar.right - _this3.scrollbar.left;
              _this3.canvas.style.cursor = "ew-resize";
            }

            if (!onScrollbarLeft && !onScrollbarRight) {
              _this3.scrollbar.left = utils.clamp(mouseX + scrollbarDragStartX, 0, _this3.canvas.width - _this3.scrollbar.width);
              _this3.scrollbar.right = _this3.scrollbar.left + _this3.scrollbar.width;
              _this3.canvas.style.cursor = "default";
            }

            _this3.snap();
          } //Timeline drag


          if (activeDrag == "timeline" || activeDrag == "keyframe") {
            _this3.state.isDragging = true;
            _this3.state._x = utils.clamp(mouseX, _this3.hatchMark.spacing / 2, _this3.canvas.width - _this3.hatchMark.spacing / 2);

            var mark = _this3.xToMark(mouseX);

            if (mark >= 0 && mark <= timelineApp.totalFrames) _this3.setCurrentMark(mark);
          }

          if (activeDrag == "playbackHandleStart") {
            _this3.playbackHandle.start.isDragging = true;
            _this3.playbackHandle.start._x = utils.clamp(mouseX, _this3.hatchMark.spacing / 2, _this3.playbackHandle.end._x - _this3.playbackHandle.width / 2 - _this3.hatchMark.spacing);

            var _mark = _this3.xToMark(mouseX);

            _mark = utils.clamp(_mark, 0, _this3.playbackHandle.end.mark - 1);

            if (_mark >= 0 && _mark <= timelineApp.totalFrames) {
              _this3.playbackHandle.start.mark = _mark;
            }

            _this3.canvas.style.cursor = "ew-resize";
          }

          if (activeDrag == "playbackHandleEnd") {
            _this3.playbackHandle.end.isDragging = true;
            _this3.playbackHandle.end._x = utils.clamp(mouseX, _this3.playbackHandle.start._x + _this3.playbackHandle.width / 2 + _this3.hatchMark.spacing, _this3.canvas.width - _this3.hatchMark.spacing / 2);

            var _mark2 = _this3.xToMark(mouseX);

            _mark2 = utils.clamp(_mark2, _this3.playbackHandle.start.mark + 1, timelineApp.totalFrames - 1);

            if (_mark2 >= 0 && _mark2 <= timelineApp.totalFrames) {
              _this3.playbackHandle.end.mark = _mark2;
            }

            _this3.canvas.style.cursor = "ew-resize";
          } //Keyframe drag


          if (activeDrag == "keyframe") {
            if (!activeKeyframe) {
              var _keys = Object.keys(rigModel.keyframes);

              for (var i = 0; i < _keys.length; i++) {
                var _frame = rigModel.keyframes[_keys[i]];
                if (!_frame) continue;
                if (_frame.locked) continue;
                if (_frame.hovered) activeKeyframe = _frame;
              }
            } else {
              _this3.state._x = utils.clamp(mouseX, _this3.hatchMark.spacing / 2, _this3.canvas.width - _this3.hatchMark.spacing / 2);
              activeKeyframe.render.position.x = _this3.state._x;
              activeKeyframe.dragged = true;
              activeKeyframe.render.color = config.render.keyframe.color.active;
            }
          }

          _this3.redraw();
        }
      };

      this.redraw();
      addEventListener("mouseup", dragEnd);
      addEventListener("mousedown", dragStart);
      addEventListener("mousemove", drag);
    }
  }, {
    key: "addButtonEvents",
    value: function addButtonEvents() {
      var _this4 = this;

      //Previous mark button
      this.buttons.previous.addEventListener("click", function () {
        var pos = _this4.state.currentMark > 0 ? _this4.state.currentMark - 1 : _this4.state.currentMark;

        _this4.setCurrentMark(pos);
      }); //Next mark button

      this.buttons.next.addEventListener("click", function () {
        var pos = _this4.state.currentMark < timelineApp.totalFrames - 1 ? _this4.state.currentMark + 1 : _this4.state.currentMark;

        _this4.setCurrentMark(pos);
      }); //Play/Stop button

      this.buttons.play.addEventListener("click", function () {
        if (_this4.state.isPlaying) {
          _this4.stop();
        } else {
          _this4.play();
        }

        _this4.redraw();
      }); //Add keyframe button

      this.buttons.add.addEventListener("click", function () {
        var clone = rigModel.clone();
        var keyframe = clone[_this4.state.currentMark];
        var joints;

        if (keyframe) {
          joints = keyframe.joints;
        }

        rigModel.setKeyframe(_this4.state.currentMark, {
          locked: _this4.state.currentMark == 0 ? true : false,
          joints: joints
        });
      }); //Delete keyframe button

      this.buttons["delete"].addEventListener("click", function () {
        events.emit("deleteKeyframe");
      });
      var holdInterval; //Zoom in

      this.buttons.zoomIn.addEventListener("mousedown", function () {
        events.emit("checkMouseHold", "zoomIn");
      });
      this.buttons.zoomOut.addEventListener("mousedown", function () {
        events.emit("checkMouseHold", "zoomOut");
      });
      events.on("checkMouseHold", function (button) {
        holdInterval = setInterval(function () {
          if (!mouse.pressed) {
            clearInterval(holdInterval);
            holdInterval = null;
          } else {
            events.emit("mousehold", button);
          }
        }, 1000 / 60);
      });
      events.on("mousehold", function (button) {
        if (button == "zoomIn") {
          var lerpWeight = utils.map(_this4.scrollbar.width, 0, _this4.canvas.width, 0.1, 0.001);

          var currentX = _this4.markToX(_this4.state.currentMark, true);

          _this4.scrollbar.left = utils.lerp(_this4.scrollbar.left, currentX - _this4.scrollbar.minWidth / 2, lerpWeight);
          _this4.scrollbar.right = utils.lerp(_this4.scrollbar.right, currentX + _this4.scrollbar.minWidth / 2, lerpWeight);
        } else if (button == "zoomOut") {
          var _lerpWeight = utils.map(_this4.scrollbar.width, 0, _this4.canvas.width, 0.001, 0.1);

          _this4.scrollbar.left = utils.lerp(_this4.scrollbar.left, 0, _lerpWeight);
          _this4.scrollbar.right = utils.lerp(_this4.scrollbar.right, _this4.canvas.width, _lerpWeight);
        }

        _this4.scrollbar.width = _this4.scrollbar.right - _this4.scrollbar.left;

        _this4.snap();

        _this4.redraw();
      }); //Minimize / Maximize

      this.buttons.minimize.addEventListener("click", function () {
        if (!_this4.state.isMinimized) {
          _this4.minimize();
        } else {
          _this4.maximize();
        }
      });
    }
  }, {
    key: "snap",
    value: function snap() {
      //Keyframes
      var keys = Object.keys(rigModel.keyframes);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var frame = rigModel.keyframes[key];
        var keyframeX = this.markToX(frame.index, true);
        frame.render.position.x = keyframeX;
      }

      this.state._x = this.markToX(this.state.currentMark, true);
      this.playbackHandle.start._x = this.markToX(this.playbackHandle.start.mark, true);
      this.playbackHandle.end._x = this.markToX(this.playbackHandle.end.mark, true);
      this.redraw();
    }
  }, {
    key: "updateState",
    value: function updateState(updateRig) {
      //Updating the state and the rig...
      updateRig = typeof updateRig == "undefined" ? true : updateRig; //Update the timeline state

      var frames = getFrames();
      this.state.currentFrame = frames.current;
      this.state.nextFrame = frames.next;
      this.state.previousFrame = frames.previous; //Update rig model

      if (updateRig) {
        //Get the current keyframe
        var frame = rigModel.keyframes[this.state.currentMark];
        frame = !frame ? rigModel.keyframes[this.state.currentFrame] : frame;

        if (_typeof(frame) == "object") {
          //Set the rig model's joints to current frame's joints
          rigModel.joints = frame.joints; //Set the active joint

          var activeJoint = rigModel.joints.find(function (j) {
            return j.id === frame.activeJointId;
          });
          rigModel.activeJoint = activeJoint || rigModel.joints[rigModel.joints.length - 1];
        }
      }
    }
  }, {
    key: "redraw",
    value: function redraw() {
      this.clear();
      this.draw();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "draw",
    value: function draw() {
      var timelineGraphParent = this.canvas.parentNode;

      if (this.canvas.width != timelineGraphParent.offsetWidth || this.canvas.height != timelineGraphParent.offsetHeight) {
        this.canvas.width = timelineGraphParent.offsetWidth;
        this.canvas.height = timelineGraphParent.offsetHeight;
      } //Drawing the timeline...


      this.scrollbar.height = this.canvas.height * 0.25;
      this._timelineHeight = this.canvas.height * 0.4;
      var timelineColor = "rgba(0, 0, 0, 0.15)";
      var chamfer = 4;
      var positionState = utils.map(this.scrollbar.left, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity);
      var zoomState = this.canvas.width + utils.map(this.scrollbar.width, 0, this.canvas.width, this.canvas.width * this.scrollbar.zoomSensitivity, 0);
      var hatchMarkCount = timelineApp.totalFrames;
      var hatchMarkColor = "rgba(255, 255, 255, 0.25)";
      var hatchMarkGap = Math.floor(utils.clamp(timelineApp.totalFrames, zoomState / 15, Number.MAX_SAFE_INTEGER) / (zoomState / 15)) * 5;
      var scrollbarIndex = Math.round((positionState - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
      var scrollbarIndexRight = Math.round((utils.map(this.scrollbar.right, 0, this.canvas.width, 0, this.canvas.width * this.scrollbar.zoomSensitivity) - this.hatchMark.spacing / 2) / this.hatchMark.spacing);
      var handleX = this.markToX(this.state.currentMark, true);
      handleX = this.state.isDragging ? this.state._x : handleX;
      var handleWidth = 10;
      var handleHeight = this._timelineHeight - this.hatchMark.height;
      var handleText = this.state.currentMark + 1; //Scrollbar

      this.createRect(this.scrollbar.left, this.scrollbar.y, this.scrollbar.right - this.scrollbar.left, this.scrollbar.height - 5, this.scrollbar.color, chamfer); //Background

      this.createRect(0, this.scrollbar.height, this.canvas.width, this._timelineHeight, timelineColor, chamfer);
      this.context.save();
      this.context.clip(); //Hatch marks

      this.hatchMark.spacing = zoomState / hatchMarkCount;

      for (var i = 0; i < hatchMarkCount; i++) {
        if (i < scrollbarIndex || i > scrollbarIndexRight) continue;
        var offsetHeight = (i + 1) % hatchMarkGap == 0 ? 2 : 0;
        var x = this.hatchMark.spacing * i + this.hatchMark.spacing / 2 - positionState;
        var y = this.scrollbar.height + this._timelineHeight - this.hatchMark.height - offsetHeight;
        var width = 1;
        var height = this.scrollbar.height + this._timelineHeight - y;
        this.createRect(x - width / 2, y, width, height, hatchMarkColor);

        if (offsetHeight) {
          var onHandle = x >= handleX - handleWidth / 2 && x <= handleX + handleWidth / 2; //Only draw the numbers if it's not on top of the handle

          if (!onHandle) {
            this.text(i + 1, x, y - 1, hatchMarkColor);
          }
        }
      } //Handle


      this.context.beginPath();
      this.context.moveTo(handleX - handleWidth / 2, this.scrollbar.height);
      this.context.lineTo(handleX + handleWidth / 2, this.scrollbar.height);
      this.context.lineTo(handleX + handleWidth / 2, this.scrollbar.height + handleHeight - 5);
      this.context.lineTo(handleX, this.scrollbar.height + handleHeight);
      this.context.lineTo(handleX - handleWidth / 2, this.scrollbar.height + handleHeight - 5);
      this.context.closePath();
      this.context.fillStyle = config.accent;
      this.context.fill();
      this.text(handleText, handleX + handleWidth, handleHeight / 2 + 8 + this.scrollbar.height, config.accent, "left"); //Adjust playback start handle

      var restrictedColor = "rgba(0, 0, 0, 0.15)";
      var startX = this.markToX(this.playbackHandle.start.mark, true);
      startX = this.playbackHandle.start.isDragging ? this.playbackHandle.start._x : startX;
      this.createRect(startX - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, config.accent);
      this.createRect(0, this.scrollbar.height, startX, this._timelineHeight, restrictedColor); //Adjust playback end handle

      var endX = this.markToX(this.playbackHandle.end.mark, true);
      endX = this.playbackHandle.end.isDragging ? this.playbackHandle.end._x : endX;
      this.createRect(endX - this.playbackHandle.width / 2, this.scrollbar.height, this.playbackHandle.width, this._timelineHeight, config.accent);
      this.createRect(endX, this.scrollbar.height, this.canvas.width - endX, this._timelineHeight, restrictedColor);
      this.context.restore(); //Keyframes

      var keyframes = Object.keys(rigModel.keyframes);

      for (var _i = 0, _keyframes = keyframes; _i < _keyframes.length; _i++) {
        var key = _keyframes[_i];
        var frame = rigModel.keyframes[key];
        frame.render.position.y = this.scrollbar.height + this._timelineHeight + frame.render.size + 5;
        var keyframeX = this.markToX(frame.index, true);
        frame.render.position.x = frame.dragged ? mouse.x - this.bounds.x : keyframeX;

        if (frame.type == "head") {
          this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, frame.render.color);
        } else {//this.createKeyframe(frame.render.position.x, frame.render.position.y, frame.render.size, "blue");
        }
      }
    }
  }, {
    key: "text",
    value: function text(_text, x, y, color, textAlign) {
      this.context.beginPath();
      this.context.fillStyle = color;
      this.context.font = "12px Catamaran";
      this.context.textAlign = textAlign || "center";
      this.context.textBaseline = "bottom";
      this.context.fillText(_text, x, y);
    }
  }, {
    key: "createRect",
    value: function createRect(x, y, width, height, color, chamfer) {
      chamfer = chamfer || 0;
      this.context.beginPath();
      this.context.moveTo(x + chamfer, y);
      this.context.lineTo(x + width - chamfer, y);
      this.context.quadraticCurveTo(x + width, y, x + width, y + chamfer);
      this.context.lineTo(x + width, y + height - chamfer);
      this.context.quadraticCurveTo(x + width, y + height, x + width - chamfer, y + height);
      this.context.lineTo(x + chamfer, y + height);
      this.context.quadraticCurveTo(x, y + height, x, y + height - chamfer);
      this.context.lineTo(x, y + chamfer);
      this.context.quadraticCurveTo(x, y, x + chamfer, y);
      this.context.closePath();
      this.context.fillStyle = color;
      this.context.fill();
    }
  }, {
    key: "createLine",
    value: function createLine(x1, y1, x2, y2, color) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.strokeStyle = color;
      this.context.stroke();
    }
  }, {
    key: "createKeyframe",
    value: function createKeyframe(x, y, size, color) {
      this.context.beginPath();
      this.context.moveTo(x, y - size / 2);
      this.context.lineTo(x + size / 2, y);
      this.context.lineTo(x, y + size / 2);
      this.context.lineTo(x - size / 2, y);
      this.context.closePath();
      this.context.fillStyle = color;
      this.context.fill();
    }
  }, {
    key: "setCurrentMark",
    value: function setCurrentMark(index, updateRig) {
      this.state.currentMark = index;
      timelineApp.setCurrentFrame(this.state.currentMark);
      this.updateState(updateRig);
      this.redraw();
      events.emit("timelineSeeked");
    }
  }, {
    key: "play",
    value: function play() {
      var _this5 = this;

      //Animation
      this.loop = setInterval(function () {
        if (_this5.state.currentMark < _this5.playbackHandle.start.mark) {
          _this5.setCurrentMark(_this5.playbackHandle.start.mark - 1);
        }

        var pos = _this5.state.currentMark < _this5.playbackHandle.end.mark ? _this5.state.currentMark + 1 : _this5.playbackHandle.start.mark;

        _this5.setCurrentMark(pos);
      }, 1000 / timelineApp.animationSpeed);
      this.state.isPlaying = true;
      this.buttons.play.firstChild.src = "assets/svg/round-square.svg";
      document.getElementById("propertyApp").classList.add("disabled");
    }
  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this.loop);
      this.state.isPlaying = false;
      this.buttons.play.firstChild.src = "assets/svg/play.svg";
      document.getElementById("propertyApp").classList.remove("disabled");
      events.emit("timelineSeeked");
    }
  }, {
    key: "updateSize",
    value: function updateSize() {
      var _this6 = this;

      var _res = function _res() {
        var parentBounds = _this6.canvas.parentNode.getBoundingClientRect();

        _this6.canvas.width = parentBounds.width;
        _this6.canvas.height = parentBounds.height;
        _this6.bounds = _this6.canvas.getBoundingClientRect();

        _this6.redraw();
      };

      _res();

      setTimeout(_res, 100);
    }
  }, {
    key: "minimize",
    value: function minimize() {
      var height = timelineApp.$el.offsetHeight;
      var body = document.querySelector("#timelineApp div.row-b");
      timelineApp.$el.style.transform = "translateY(".concat(height - body.offsetTop - 2, "px)");
      this.buttons.minimize.style.transform = "translateY(-40px) rotate(0deg)";
      this.state.isMinimized = true;
    }
  }, {
    key: "maximize",
    value: function maximize() {
      var height = timelineApp.$el.offsetHeight;
      timelineApp.$el.style.transform = "translateY(".concat(0, "px)");
      this.buttons.minimize.style.transform = "translateY(-40px) rotate(180deg)";
      this.state.isMinimized = false;
    }
  }]);

  return Timeline;
}();

timeline = new Timeline();
utils.loadJSONData(config.autosave.label + ".frames.config", function (data) {
  var frameCountEl = document.getElementById("frameCount");
  var animationSpeedEl = document.getElementById("animationSpeed");

  if (typeof data.frameCount == "number") {
    frameCountEl.value = data.frameCount;
  }

  if (typeof data.animationSpeed == "number") {
    animationSpeedEl.value = data.animationSpeed;
  }

  timelineApp.fixData();
});
utils.loadJSONData(config.autosave.label + ".playback.config", function (data) {
  if (typeof data.start == "number") {
    timeline.playbackHandle.start.mark = data.start;
  }

  if (typeof data.end == "number") {
    timeline.playbackHandle.end.mark = data.end;
  }

  timeline.redraw();
});
module.exports = {
  app: timelineApp,
  graph: timeline
};