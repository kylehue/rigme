"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e5) { throw _e5; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e6) { didErr = true; err = _e6; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var events = require("../../lib/events.js"),
    mouse = require("../../lib/mouse.js"),
    vector = require("../../lib/vector.js"),
    config = require("../../lib/config.js"),
    utils = require("../../lib/utils.js"),
    history = require("./history.js");

var timeline,
    showSkeleton = document.getElementById("showSkeleton");

var RigModel = /*#__PURE__*/function () {
  function RigModel() {
    _classCallCheck(this, RigModel);

    this.joints = [], this.keyframes = {}, this.totalKeyframes = 0, this.mouseBuffer = 10, this.activeJoint = null, this.bounds = {
      min: vector(),
      max: vector()
    }, this._moved = !1;
  }

  _createClass(RigModel, [{
    key: "updateBounds",
    value: function updateBounds() {
      var i = Object.keys(this.keyframes);
      var e = [],
          t = [];

      for (var n = 0; n < i.length; n++) {
        for (var s = this.keyframes[i[n]], o = 0; o < s.joints.length; o++) {
          var r = s.joints[o];
          if (e.push(r.position.x + config.render.joint.radius), t.push(r.position.y + config.render.joint.radius), e.push(r.position.x - config.render.joint.radius), t.push(r.position.y - config.render.joint.radius), r.skin.vertices) for (var a = 0; a < r.skin.vertices.length; a++) {
            e.push(r.skin.vertices[a].x), t.push(r.skin.vertices[a].y);
          }
        }
      }

      this.bounds.min.set({
        x: Math.min.apply(Math, e),
        y: Math.min.apply(Math, t)
      }), this.bounds.max.set({
        x: Math.max.apply(Math, e),
        y: Math.max.apply(Math, t)
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.keyframes = {}, this.joints = [], this.totalKeyframes = 0, this.activeJoint = null, timeline.graph && (this.setKeyframe(0, {
        position: {
          x: timeline.graph.hatchMark.spacing / 2,
          y: 0
        },
        locked: !0,
        ignoreHistory: !0
      }), timeline.graph.setCurrentMark(0), timeline.graph.updateState()), this.updateBounds(), history.add({
        label: "Clear",
        value: this.clone(),
        group: "keyframe"
      });
    }
  }, {
    key: "clone",
    value: function clone(i) {
      return i = i || this.keyframes, this.fromJSON(this.toJSON(i));
    }
  }, {
    key: "getKeyframe",
    value: function getKeyframe(e, t) {
      var i = Object.values(this.keyframes);
      var n = i.find(function (i) {
        return i[e] === t;
      });
      return n ? this.keyframes[n.index] : null;
    }
  }, {
    key: "editJoints",
    value: function editJoints(i) {
      for (var e = Object.values(this.keyframes), t = 0; t < e.length; t++) {
        for (var n = e[t], s = 0; s < n.joints.length; s++) {
          var o = n.joints[s];
          "function" == typeof i && i(o, n);
        }
      }
    }
  }, {
    key: "editJoint",
    value: function editJoint(t, n, s) {
      for (var o = Object.values(this.keyframes), r = 0; r < o.length; r++) {
        var i = o[r],
            e = i.joints.find(function (i) {
          return i.id === t;
        });
        if (n = s ? JSON.parse(JSON.stringify(n)) : n, e) for (var a = Object.keys(n), h = 0; h < a.length; h++) {
          e[a[h]] = n[a[h]];
        }
      }
    }
  }, {
    key: "addSubKeyframes",
    value: function addSubKeyframes(e, t) {
      if (timeline.graph) {
        var i = Object.keys(this.keyframes);

        for (var n = 0; n < i.length; n++) {
          if ("sub" == this.keyframes[i[n]].type) {
            i.splice(n, 1);
            break;
          }
        }

        this.clone();

        if (1 < i.length) {
          timeline.graph.updateState();

          for (n = t - 1; e + 1 <= n; n--) {
            var s = this.clone(),
                o = s[t].joints,
                o = {
              id: utils.uid(),
              type: "sub",
              index: n,
              activeJointId: s.activeJointId,
              joints: o,
              render: {
                size: 12,
                color: "red",
                position: vector(n * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, 0)
              }
            };
            this.keyframes[n] = o;
          }
        }
      }

      this.updateSubKeyframes(), timeline.graph.updateState(), timeline.graph.redraw();
    }
  }, {
    key: "updateSubKeyframes",
    value: function updateSubKeyframes() {
      for (var i = Object.keys(this.keyframes), e = i.length - 1; 0 <= e; e--) {
        var s = this.keyframes[i[e]];

        if (s && "head" != s.type) {
          var _i = null;

          for (var o = s.index; 0 <= o; o--) {
            var r = this.keyframes[o];

            if (r && "head" == r.type) {
              _i = r.index;
              break;
            }
          }

          var _e = null;

          for (o = s.index; o < timeline.app.totalFrames; o++) {
            var a = this.keyframes[o];

            if (a && "head" == a.type) {
              _e = a.index;
              break;
            }
          }

          var h = utils.map(s.index, _e, _i, 0, 1);
          var t = this.keyframes[_e],
              n = this.keyframes[_i];

          var _loop = function _loop() {
            var e = s.joints[o];

            if (e && t && n) {
              var _i2 = t.joints.find(function (i) {
                return i.id === e.id;
              });

              l = n.joints.find(function (i) {
                return i.id === e.id;
              });

              if (_i2 && l) {
                d = _i2.position.copy().lerp(l.position, h);
                p = utils.lerp(_i2.length, l.length, h);
                e.length = p, e.position.set(d), config.animateSkin && l.skin && _i2.skin && l.skin.offset && _i2.skin.offset && (e.skin.offset = {
                  x: utils.lerp(_i2.skin.offset.x, l.skin.offset.x, h),
                  y: utils.lerp(_i2.skin.offset.y, l.skin.offset.y, h),
                  scaleX: utils.lerp(_i2.skin.offset.scaleX, l.skin.offset.scaleX, h),
                  scaleY: utils.lerp(_i2.skin.offset.scaleY, l.skin.offset.scaleY, h),
                  angle: utils.lerp(_i2.skin.offset.angle, l.skin.offset.angle, h)
                });

                for (f = 0; f < e.children.length; f++) {
                  var _i3 = e.children[f];
                  _i3.angle = _i3.position.heading(e.position);
                }
              }

              e.id == n.activeJointId && (s.activeJointId = e.id);
            }
          };

          for (o = 0; o < s.joints.length; o++) {
            var l;
            var d, p;
            var f;

            _loop();
          }

          "linear" != config.riggingMode && ("forwardKinematics" == config.riggingMode ? this.computeKinematics(s.joints) : "inverseKinematics" == config.riggingMode && this.computeKinematics(s.joints, !0)), this.updateSkin(s.joints);
        }
      }
    }
  }, {
    key: "setKeyframe",
    value: function setKeyframe(i, e) {
      if ("number" == typeof i) {
        var t = {
          type: "head",
          index: (e = e || {}).keyframe ? e.keyframe.index : i,
          activeJointId: e.keyframe ? e.keyframe.activeJointId : this.activeJoint ? this.activeJoint.id : null,
          joints: e.joints,
          render: {
            size: config.render.keyframe.size,
            color: config.render.keyframe.color.default,
            position: e.position || vector(i * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, 0)
          },
          locked: e.locked || !1
        };

        if (timeline.graph) {
          var n = this.clone()[timeline.graph.state.currentFrame];

          var _i4 = n ? n.joints : [];

          e.joints && (_i4 = e.joints), t.joints = _i4;
        }

        if (t.id = e.id || utils.uid(), this.keyframes[i] = t, timeline.graph && (timeline.graph.updateState(), n = timeline.graph.state.currentFrame, i = timeline.graph.state.previousFrame, this.addSubKeyframes(i, n), timeline.graph.redraw()), !e.ignoreHistory) {
          var s = Object.values(this.keyframes);
          var _i5 = 0;

          for (var o = 0; o < s.length; o++) {
            "head" == s[o].type && _i5++;
          }

          var _e2 = "Add keyframe";
          return _i5 == this.totalKeyframes && (_e2 = "Move keyframe"), this.updateBounds(), history.add({
            label: _e2,
            value: this.clone(),
            group: "keyframe"
          }), this.totalKeyframes = _i5, t;
        }
      }
    }
  }, {
    key: "deleteKeyframe",
    value: function deleteKeyframe(n) {
      n = this.getKeyframe("id", n);

      if (n && !(Object.keys(this.keyframes).length <= 1)) {
        var i = [],
            e,
            t;

        for (var s = n.index - 1; 0 <= s; s--) {
          var o = this.keyframes[s];

          if (o && ("sub" == o.type && i.push(o), "head" == o.type)) {
            e = o;
            break;
          }
        }

        for (s = n.index + 1; s < timeline.app.totalFrames; s++) {
          var r = this.keyframes[s];

          if (r && ("sub" == r.type && i.push(r), "head" == r.type)) {
            t = r;
            break;
          }
        }

        for (s = 0; s < i.length; s++) {
          var a = this.getKeyframe("id", i[s].id);
          delete this.keyframes[a.index];
        }

        delete this.keyframes[n.index], t && e && this.addSubKeyframes(e.index, t.index), timeline.graph && (timeline.graph.updateState(), timeline.graph.redraw()), this.updateBounds();
      }
    }
  }, {
    key: "updateKeyframe",
    value: function updateKeyframe(i, e) {
      for (var t = Object.keys(e), n = 0; n < t.length; n++) {
        this.keyframes[i][t[n]] = e[t[n]];
      }

      this.updateSubKeyframes();
    }
  }, {
    key: "addJoint",
    value: function addJoint(i, e, t) {
      t = t || {}, timeline.graph && timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, !1);
      var n = t.parent || this.activeJoint;
      e = {
        id: "J" + utils.uid(),
        name: "Joint ".concat(this.joints.length + 1),
        position: vector(i, e),
        positionPrev: vector(i, e),
        angle: n ? vector(i, e).heading(n.position) : 0,
        parent: n || null,
        children: [],
        length: n ? n.position.dist(i, e) : 0,
        hierarchy: n ? n.hierarchy + 1 : 1,
        skin: {},
        zIndex: this.joints.length + 1
      };
      return n && n.children.push(e), t.ignoreDefaults || (this.activeJoint = e), this.joints.push(e), timeline.graph && this.updateKeyframe(timeline.graph.state.currentFrame, {
        activeJointId: this.activeJoint.id
      }), this.updateBounds(), t.ignoreHistory || history.add({
        label: "Add joint",
        value: this.clone(),
        group: "keyframe"
      }), events.emit("jointChange", this.joints), e;
    }
  }, {
    key: "selectJoint",
    value: function selectJoint(t, n) {
      if (this.joints.length) {
        var e = this.joints.slice();
        e.sort(function (i, e) {
          return i.position.dist(t, n) - e.position.dist(t, n);
        }), this.activeJoint = this.joints.find(function (i) {
          return i.id === e[0].id;
        }), events.emit("jointChange", this.joints), timeline.graph && this.updateKeyframe(timeline.graph.state.currentFrame, {
          activeJointId: this.activeJoint.id
        });
      }
    }
  }, {
    key: "removeJointById",
    value: function removeJointById(t) {
      for (var n = Object.keys(this.keyframes), s = 0; s < n.length; s++) {
        var i = this.keyframes[n[s]],
            e = i.joints.find(function (i) {
          return i.id === t;
        });

        if (e) {
          var _e$parent$children;

          for (var o = 0; o < e.children.length; o++) {
            var _i6 = e.children[o];
            _i6.parent = e.parent, _i6.length += e.length, this.activeJoint = _i6;
          }

          e.parent ? (e.parent.children.splice(e.parent.children.indexOf(e), 1), (_e$parent$children = e.parent.children).push.apply(_e$parent$children, _toConsumableArray(e.children)), this.activeJoint = e.parent) : this.activeJoint = e.children[0], i.joints.splice(i.joints.indexOf(e), 1);
        }
      }

      this.activeJoint && this.moveJoint(this.activeJoint.position.x, this.activeJoint.position.y), this.updateBounds(), history.add({
        label: "Remove joint",
        value: this.clone(),
        group: "keyframe"
      }), events.emit("jointChange", this.joints);
    }
  }, {
    key: "removeJointByPosition",
    value: function removeJointByPosition(e, t) {
      if (this.joints.length) for (var n = 0; n < this.joints.length; n++) {
        var i = this.joints[n];
        i.position.dist(e, t) < config.render.joint.radius + this.mouseBuffer && this.removeJointById(i.id);
      }
    }
  }, {
    key: "computeKinematics",
    value: function computeKinematics(e, i) {
      if (i) for (t = e.length - 1; 0 <= t; t--) {
        var _i7 = e[t];
        _i7.parent && (_i7.parent.angle = _i7.position.heading(_i7.parent.position), _i7.parent.position.set({
          x: _i7.position.x + Math.cos(_i7.parent.angle) * _i7.length,
          y: _i7.position.y + Math.sin(_i7.parent.angle) * _i7.length
        }));
      } else for (var t = 0; t < e.length; t++) {
        for (var n = e[t], s = 0; s < n.children.length; s++) {
          var _i8 = n.children[s];
          _i8.angle = _i8.position.heading(n.position), _i8.position.set({
            x: n.position.x - Math.cos(_i8.angle) * _i8.length,
            y: n.position.y - Math.sin(_i8.angle) * _i8.length
          });
        }
      }
    }
  }, {
    key: "updateSkin",
    value: function updateSkin(p) {
      p = p || this.joints;

      for (var f = 0; f < p.length; f++) {
        var t = p[f],
            i = t.length,
            e = t.length,
            n = 0;
        var c = t.skin.crop;
        var s = 0,
            o = 0;
        c && (s = c.to.x - c.from.x, o = c.to.y - c.from.y), s > o ? e = Number.MAX_SAFE_INTEGER : (i = Number.MAX_SAFE_INTEGER, n = Math.PI / 2), t.skin.size = utils.scaleSize(s, o, i, e), t.skin._sizeOriginal = {
          width: s,
          height: o
        }, t.skin.angleAuto = n;
        var r = 0,
            a = 0,
            h = 1,
            l = 1,
            d = 0;

        if (t.skin.offset && (r = t.skin.offset.x || 0, a = t.skin.offset.y || 0, h = t.skin.offset.scaleX || 0, l = t.skin.offset.scaleY || 0, d = t.skin.offset.angle || 0), t.parent && c) {
          t.skin.position = {
            x: (t.position.x + t.parent.position.x) / 2,
            y: (t.position.y + t.parent.position.y) / 2
          };
          var g,
              m,
              c = [{
            x: t.skin.position.x + r - t.skin.size.width / 2,
            y: t.skin.position.y + a - t.skin.size.height / 2
          }, {
            x: t.skin.position.x + r + t.skin.size.width / 2,
            y: t.skin.position.y + a - t.skin.size.height / 2
          }, {
            x: t.skin.position.x + r + t.skin.size.width / 2,
            y: t.skin.position.y + a + t.skin.size.height / 2
          }, {
            x: t.skin.position.x + r - t.skin.size.width / 2,
            y: t.skin.position.y + a + t.skin.size.height / 2
          }];

          var _iterator = _createForOfIteratorHelper(c),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              g = _step.value;

              var _i9 = g.x - t.skin.position.x,
                  _e3 = g.y - t.skin.position.y;

              g.x = g.x + _i9 * (h - 1), g.y = g.y + _e3 * (l - 1);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          var _iterator2 = _createForOfIteratorHelper(c),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              m = _step2.value;
              var k = t.angle + t.skin.angleAuto + d,
                  u = (m.x - t.skin.position.x) * Math.cos(k) - (m.y - t.skin.position.y) * Math.sin(k),
                  k = (m.x - t.skin.position.x) * Math.sin(k) + (m.y - t.skin.position.y) * Math.cos(k);
              m.x = u + t.skin.position.x, m.y = k + t.skin.position.y;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          t.skin.vertices = c;
        }
      }
    }
  }, {
    key: "moveJointById",
    value: function moveJointById(i, e, t) {
      if (this.activeJoint = this.getJoint(i), this.activeJoint) {
        var n;

        if (timeline.graph && (config.animation.autoAddKeyframe ? this.activeJoint.position.equals(e, t) || (n = timeline.graph.state.currentMark, (i = this.keyframes[n]) && "head" == i.type || this.setKeyframe(n)) : (timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, !1), timeline.graph.updateState()), this.updateSubKeyframes()), e && t && (1 < this.activeJoint.position.dist(this.activeJoint.positionPrev) && (this._moved = !0, this.activeJoint.positionPrev.set(this.activeJoint.position.x, this.activeJoint.position.y)), this.activeJoint.position.set(e, t), "linear" == config.riggingMode)) {
          this.activeJoint.parent && (this.activeJoint.angle = this.activeJoint.position.heading(this.activeJoint.parent.position), this.activeJoint.length = this.activeJoint.position.dist(this.activeJoint.parent.position));

          for (var s = 0; s < this.activeJoint.children.length; s++) {
            var _i10 = this.activeJoint.children[s];
            _i10.length = _i10.position.dist(this.activeJoint.position);
          }
        }

        return "linear" != config.riggingMode && ("forwardKinematics" == config.riggingMode ? this.computeKinematics(this.joints) : "inverseKinematics" == config.riggingMode && this.computeKinematics(this.joints, !0)), this.updateSkin(), this.updateBounds(), this.activeJoint;
      }
    }
  }, {
    key: "moveJoint",
    value: function moveJoint(i, e) {
      this.moveJointById(this.activeJoint.id, i, e);
    }
  }, {
    key: "getJoint",
    value: function getJoint(e) {
      return this.joints.find(function (i) {
        return i.id === e;
      }) || null;
    }
  }, {
    key: "toJSON",
    value: function toJSON(i, t) {
      var n = i || this.clone();
      var s = {};

      for (var o = Object.keys(n), r = 0; r < o.length; r++) {
        var a = n[o[r]];
        var e = {
          id: a.id,
          activeJointId: a.activeJointId,
          index: a.index,
          joints: [],
          render: a.render,
          type: a.type,
          locked: a.locked
        };

        for (var h = 0; h < a.joints.length; h++) {
          var l = a.joints[h];
          var _i11 = {
            id: l.id,
            name: l.name,
            angle: l.angle,
            position: l.position,
            positionPrev: l.positionPrev,
            length: l.length,
            parent: l.parent ? l.parent.id : null,
            hierarchy: l.hierarchy,
            children: [],
            skinImageSrc: l.skin && !t ? l.skin.imageSrc : void 0,
            skinCrop: l.skin ? l.skin.crop : null,
            skinOffset: l.skin ? l.skin.offset : null,
            skinPosition: l.skin ? l.skin.position : null,
            skinAngleAuto: l.skin ? l.skin.angleAuto : void 0,
            skinSize: l.skin ? l.skin.size : null,
            _skinSizeOriginal: l.skin ? l.skin._sizeOriginal : null,
            _vueCrop: l.skin ? l.skin._vueCrop : null,
            zIndex: l.zIndex
          };

          for (var d = 0; d < l.children.length; d++) {
            var p = l.children[d];

            _i11.children.push(p.id);
          }

          e.joints.push(_i11);
        }

        s[e.index] = e;
      }

      return s;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(t) {
      if (t) {
        var i = {};

        var _loop2 = function _loop2() {
          var e = t[s[o]];
          e.joints.find(function (i) {
            return i.id === e.activeJointId;
          });
          var n = [];

          for (r = 0; r < e.joints.length; r++) {
            var _i12 = e.joints[r];
            a = {
              id: _i12.id,
              name: _i12.name,
              angle: _i12.angle,
              position: vector(_i12.position),
              positionPrev: vector(_i12.positionPrev),
              length: _i12.length,
              hierarchy: _i12.hierarchy,
              parent: _i12.parent,
              children: _i12.children.slice(),
              skin: {
                offset: _i12.skinOffset,
                crop: _i12.skinCrop,
                _vueCrop: _i12._vueCrop,
                imageSrc: _i12.skinImageSrc,
                position: _i12.skinPosition,
                angleAuto: _i12.angleAuto,
                size: _i12.skinSize,
                _sizeOriginal: _i12._skinSizeOriginal
              },
              zIndex: _i12.zIndex
            };
            n.push(a);
          }

          var _loop3 = function _loop3() {
            var t = n[r];
            t.parent = n.find(function (i) {
              return i.id === t.parent;
            }) || null;

            var _loop4 = function _loop4() {
              var e = t.children[h];
              t.children[h] = n.find(function (i) {
                return i.id === e;
              }) || null;
            };

            for (h = 0; h < t.children.length; h++) {
              _loop4();
            }
          };

          for (r = 0; r < n.length; r++) {
            _loop3();
          }

          l = {
            activeJointId: e.activeJointId,
            id: e.id,
            index: e.index,
            joints: n,
            locked: e.locked,
            render: e.render,
            type: e.type
          };
          i[e.index] = l;
        };

        for (var s = Object.keys(t), o = 0; o < s.length; o++) {
          var r;
          var a;
          var h;
          var l;

          _loop2();
        }

        return i;
      }
    }
  }, {
    key: "import",
    value: function _import(i) {
      this.keyframes = this.clone(i);
      var e = Object.values(this.keyframes);
      var t = 0;

      for (var n = 0; n < e.length; n++) {
        "head" == e[n].type && t++;
      }

      this.totalKeyframes = t, timeline.graph && ((i = this.keyframes[timeline.graph.state.currentMark]) && (this.activeJoint = this.getKeyframe("id", i.activeJointId), this.activeJoint && this.updateKeyframe(timeline.graph.state.currentFrame, {
        activeJointId: this.activeJoint.id
      })), timeline.graph.updateState()), this.updateSkin(), this.updateBounds(), events.emit("jointChange", this.joints);
    }
  }, {
    key: "renderTo",
    value: function renderTo(s, e) {
      var o = this.keyframes[(e = e || {}).frame];

      if (o) {
        e.position = e.position || {
          x: 0,
          y: 0
        };
        var t = -this.bounds.min.x + e.position.x,
            n = -this.bounds.min.y + e.position.y;
        if (o.joints.sort(function (i, e) {
          return i.zIndex - e.zIndex;
        }), e.showSkin) for (var i, r, a, h, l, d = 0; d < o.joints.length; d++) {
          var _e4 = o.joints[d];

          if (_e4.parent) {
            if (_e4.skin.imageSrc) if (_e4.skin.image) {
              if (!_e4.skin.image.width) {
                var _i13 = new Image();

                _i13.src = _e4.skin.imageSrc, _e4.skin.image = _i13, this.updateSkin(), this.updateBounds();
              }
            } else {
              var _i14 = new Image();

              _i14.src = _e4.skin.imageSrc, _e4.skin.image = _i14, this.updateSkin(), this.updateBounds();
            }
            _e4.skin && "object" == _typeof(_e4.skin.image) && _e4.skin.image.src && _e4.skin.position && (s.save(), s.translate(_e4.skin.position.x + t, _e4.skin.position.y + n), s.rotate(_e4.angle + _e4.skin.angleAuto), _e4.skin.offset && (i = _e4.skin.offset.x, r = _e4.skin.offset.y, a = _e4.skin.offset.scaleX, h = _e4.skin.offset.scaleY, l = _e4.skin.offset.angle, s.rotate(l), s.translate(i, r), s.scale(a, h)), s.drawImage(_e4.skin.image, _e4.skin.crop.from.x, _e4.skin.crop.from.y, _e4.skin._sizeOriginal.width, _e4.skin._sizeOriginal.height, -_e4.skin.size.width / 2, -_e4.skin.size.height / 2, _e4.skin.size.width, _e4.skin.size.height), s.restore(), _e4.skin.vertices || (this.updateSkin(), this.updateBounds()));
          }
        }

        if (e.showBones) {
          for (d = 0; d < o.joints.length; d++) {
            var p = o.joints[d];
            p.parent && (s.beginPath(), s.moveTo(p.position.x + t, p.position.y + n), s.lineTo(p.parent.position.x + t, p.parent.position.y + n), s.lineWidth = config.render.segment.width, s.lineCap = "round", s.strokeStyle = config.render.segment.color, s.stroke());
          }

          for (d = 0; d < o.joints.length; d++) {
            var f = o.joints[d];

            var _i15 = f === this.activeJoint ? config.render.joint.color.selected : config.render.joint.color.default;

            timeline.graph && (this.activeJoint && !timeline.graph.state.isPlaying && (this.activeJoint.children.length && (_i15 = this.activeJoint.children.includes(f) ? "#5bff85" : _i15), this.activeJoint.parent && (_i15 = this.activeJoint.parent === f ? "#9b68e1" : _i15)), timeline.graph.state.isPlaying && (_i15 = config.render.joint.color.default)), s.beginPath(), s.arc(f.position.x + t, f.position.y + n, config.render.joint.radius, 0, 2 * Math.PI), s.closePath(), s.fillStyle = e.workColor ? _i15 : config.render.joint.color.default, s.fill();
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render(e) {
      var t = showSkeleton.checked;

      if (timeline.graph) {
        var n = timeline.graph.state.previousFrame,
            s = timeline.graph.state.currentFrame,
            o = timeline.graph.state.nextFrame;
        var i = timeline.graph.state.currentMark;
        e.save(), e.context.globalAlpha = .1, this.renderTo(e.context, {
          frame: n,
          position: {
            x: this.bounds.min.x,
            y: this.bounds.min.y
          },
          showBones: t
        }), this.renderTo(e.context, {
          frame: s,
          position: {
            x: this.bounds.min.x,
            y: this.bounds.min.y
          },
          showBones: t
        }), this.renderTo(e.context, {
          frame: o,
          position: {
            x: this.bounds.min.x,
            y: this.bounds.min.y
          },
          showBones: t
        }), e.restore(), this.keyframes[i] || (i = s), this.renderTo(e.context, {
          frame: i,
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

  return RigModel;
}();

var rigModel = new RigModel();
events.once("loadedApps", function (i) {
  timeline = i.timeline, rigModel.setKeyframe(0, {
    locked: !0,
    ignoreHistory: !0
  });
}), module.exports = rigModel;