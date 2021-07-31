"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var events = require("../../lib/events.js");

var mouse = require("../../lib/mouse.js");

var vector = require("../../lib/vector.js");

var config = require("../../lib/config.js");

var utils = require("../../lib/utils.js");

var history = require("./history.js");

var timeline;
var showSkeleton = document.getElementById("showSkeleton");

var RigModel = /*#__PURE__*/function () {
  function RigModel() {
    _classCallCheck(this, RigModel);

    this.joints = [];
    this.keyframes = {};
    this.totalKeyframes = 0;
    this.mouseBuffer = 10;
    this.activeJoint = null;
    this.bounds = {
      min: vector(),
      max: vector()
    };
    this._moved = false;
  }

  _createClass(RigModel, [{
    key: "updateBounds",
    value: function updateBounds() {
      var keys = Object.keys(this.keyframes);
      var xAxes = [];
      var yAxes = [];

      for (var i = 0; i < keys.length; i++) {
        var frame = this.keyframes[keys[i]];

        for (var j = 0; j < frame.joints.length; j++) {
          var joint = frame.joints[j];
          xAxes.push(joint.position.x + config.render.joint.radius);
          yAxes.push(joint.position.y + config.render.joint.radius);
          xAxes.push(joint.position.x - config.render.joint.radius);
          yAxes.push(joint.position.y - config.render.joint.radius);

          if (joint.skin.vertices) {
            for (var k = 0; k < joint.skin.vertices.length; k++) {
              xAxes.push(joint.skin.vertices[k].x);
              yAxes.push(joint.skin.vertices[k].y);
            }
          }
        }
      }

      this.bounds.min.set({
        x: Math.min.apply(Math, xAxes),
        y: Math.min.apply(Math, yAxes)
      });
      this.bounds.max.set({
        x: Math.max.apply(Math, xAxes),
        y: Math.max.apply(Math, yAxes)
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.keyframes = {};
      this.joints = [];
      this.totalKeyframes = 0;
      this.activeJoint = null;

      if (timeline.graph) {
        this.setKeyframe(0, {
          position: {
            x: timeline.graph.hatchMark.spacing / 2,
            y: 0
          },
          locked: true,
          ignoreHistory: true
        });
        timeline.graph.setCurrentMark(0);
        timeline.graph.updateState();
      }

      this.updateBounds();
      history.add({
        label: "Clear",
        value: this.clone(),
        group: "keyframe"
      });
    }
  }, {
    key: "clone",
    value: function clone(keyframes) {
      keyframes = keyframes || this.keyframes;
      var clone = this.fromJSON(this.toJSON(keyframes));
      return clone;
    }
  }, {
    key: "getKeyframe",
    value: function getKeyframe(findKey, value) {
      var keyframes = Object.values(this.keyframes);
      var res = keyframes.find(function (k) {
        return k[findKey] === value;
      });

      if (res) {
        return this.keyframes[res.index];
      }

      return null;
    }
  }, {
    key: "editJoints",
    value: function editJoints(f) {
      var keyframes = Object.values(this.keyframes);

      for (var i = 0; i < keyframes.length; i++) {
        var frame = keyframes[i];

        for (var j = 0; j < frame.joints.length; j++) {
          var joint = frame.joints[j];

          if (typeof f == "function") {
            f(joint, frame);
          }
        }
      }
    }
  }, {
    key: "editJoint",
    value: function editJoint(id, prop, unique) {
      var keyframes = Object.values(this.keyframes);

      for (var i = 0; i < keyframes.length; i++) {
        var frame = keyframes[i];
        var joint = frame.joints.find(function (j) {
          return j.id === id;
        });
        prop = unique ? JSON.parse(JSON.stringify(prop)) : prop;

        if (joint) {
          var _props = Object.keys(prop);

          for (var j = 0; j < _props.length; j++) {
            joint[_props[j]] = prop[_props[j]];
          }
        }
      }
    }
  }, {
    key: "addSubKeyframes",
    value: function addSubKeyframes(start, end) {
      if (timeline.graph) {
        var keys = Object.keys(this.keyframes);

        for (var i = 0; i < keys.length; i++) {
          if (this.keyframes[keys[i]].type == "sub") {
            keys.splice(i, 1);
            break;
          }
        }

        var clone = this.clone(); //If there's more than 1 frame

        if (keys.length > 1) {
          //...then add the hidden key frames
          timeline.graph.updateState();

          for (var i = end - 1; i >= start + 1; i--) {
            var _clone = this.clone();

            var subJoints = _clone[end].joints;
            var subKeyframe = {
              id: utils.uid(),
              type: "sub",
              index: i,
              activeJointId: _clone.activeJointId,
              joints: subJoints,
              render: {
                size: 12,
                color: "red",
                position: vector(i * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, 0)
              }
            };
            this.keyframes[i] = subKeyframe;
          }
        }
      }

      this.updateSubKeyframes();
      timeline.graph.updateState();
      timeline.graph.redraw();
    }
  }, {
    key: "updateSubKeyframes",
    value: function updateSubKeyframes() {
      var keys = Object.keys(this.keyframes);

      for (var i = keys.length - 1; i >= 0; i--) {
        var frame = this.keyframes[keys[i]];
        if (!frame) continue;
        if (frame.type == "head") continue;
        var back = null;

        for (var j = frame.index; j >= 0; j--) {
          var key = this.keyframes[j];

          if (key) {
            if (key.type == "head") {
              back = key.index;
              break;
            }
          }
        }

        var front = null;

        for (var j = frame.index; j < timeline.app.totalFrames; j++) {
          var _key = this.keyframes[j];

          if (_key) {
            if (_key.type == "head") {
              front = _key.index;
              break;
            }
          }
        }

        var lerpWeight = utils.map(frame.index, front, back, 0, 1);
        var frontFrame = this.keyframes[front];
        var backFrame = this.keyframes[back];

        var _loop = function _loop() {
          var joint = frame.joints[j];

          if (joint && frontFrame && backFrame) {
            var frontJoint = frontFrame.joints.find(function (fj) {
              return fj.id === joint.id;
            });
            var backJoint = backFrame.joints.find(function (bj) {
              return bj.id === joint.id;
            });

            if (frontJoint && backJoint) {
              var position = frontJoint.position.copy().lerp(backJoint.position, lerpWeight);
              var length = utils.lerp(frontJoint.length, backJoint.length, lerpWeight);
              joint.length = length;
              joint.position.set(position);

              if (config.animateSkin) {
                if (backJoint.skin && frontJoint.skin) {
                  if (backJoint.skin.offset && frontJoint.skin.offset) {
                    joint.skin.offset = {
                      x: utils.lerp(frontJoint.skin.offset.x, backJoint.skin.offset.x, lerpWeight),
                      y: utils.lerp(frontJoint.skin.offset.y, backJoint.skin.offset.y, lerpWeight),
                      scaleX: utils.lerp(frontJoint.skin.offset.scaleX, backJoint.skin.offset.scaleX, lerpWeight),
                      scaleY: utils.lerp(frontJoint.skin.offset.scaleY, backJoint.skin.offset.scaleY, lerpWeight),
                      angle: utils.lerp(frontJoint.skin.offset.angle, backJoint.skin.offset.angle, lerpWeight)
                    };
                  }
                }
              }

              for (k = 0; k < joint.children.length; k++) {
                var child = joint.children[k];
                child.angle = child.position.heading(joint.position);
              }
            }

            if (joint.id == backFrame.activeJointId) {
              frame.activeJointId = joint.id;
            }
          }
        };

        for (var j = 0; j < frame.joints.length; j++) {
          var k;

          _loop();
        }

        if (config.riggingMode != "linear") {
          if (config.riggingMode == "forwardKinematics") {
            this.computeKinematics(frame.joints);
          } else if (config.riggingMode == "inverseKinematics") {
            this.computeKinematics(frame.joints, true);
          }
        }

        this.updateSkin(frame.joints);
      }
    }
  }, {
    key: "setKeyframe",
    value: function setKeyframe(index, options) {
      if (typeof index != "number") return;
      options = options || {};
      var keyframe = {
        type: "head",
        index: options.keyframe ? options.keyframe.index : index,
        activeJointId: options.keyframe ? options.keyframe.activeJointId : this.activeJoint ? this.activeJoint.id : null,
        joints: options.joints,
        render: {
          size: config.render.keyframe.size,
          color: config.render.keyframe.color["default"],
          position: options.position || vector(index * timeline.graph.hatchMark.spacing + timeline.graph.hatchMark.spacing / 2, 0)
        },
        locked: options.locked || false
      };

      if (timeline.graph) {
        var clone = this.clone()[timeline.graph.state.currentFrame];
        var joints = clone ? clone.joints : [];
        if (options.joints) joints = options.joints;
        keyframe.joints = joints;
      }

      keyframe.id = options.id || utils.uid();
      this.keyframes[index] = keyframe;

      if (timeline.graph) {
        timeline.graph.updateState();
        var currentFrame = timeline.graph.state.currentFrame;
        var previousFrame = timeline.graph.state.previousFrame;
        this.addSubKeyframes(previousFrame, currentFrame);
        timeline.graph.redraw();
      } //History


      if (!options.ignoreHistory) {
        var frames = Object.values(this.keyframes);
        var headCount = 0;

        for (var i = 0; i < frames.length; i++) {
          var frame = frames[i];
          if (frame.type == "head") headCount++;
        }

        var historyLabel = "Add keyframe";

        if (headCount == this.totalKeyframes) {
          historyLabel = "Move keyframe";
        }

        this.updateBounds();
        history.add({
          label: historyLabel,
          value: this.clone(),
          group: "keyframe"
        });
        this.totalKeyframes = headCount;
        return keyframe;
      }
    }
  }, {
    key: "deleteKeyframe",
    value: function deleteKeyframe(id) {
      var keyframe = this.getKeyframe("id", id);
      if (!keyframe) return;
      if (Object.keys(this.keyframes).length <= 1) return;
      var subs = [];
      var leftHead;
      var rightHead; //Get left subs

      for (var i = keyframe.index - 1; i >= 0; i--) {
        var key = this.keyframes[i];

        if (key) {
          if (key.type == "sub") {
            subs.push(key);
          }

          if (key.type == "head") {
            leftHead = key;
            break;
          }
        }
      } //Get right subs


      for (var i = keyframe.index + 1; i < timeline.app.totalFrames; i++) {
        var _key2 = this.keyframes[i];

        if (_key2) {
          if (_key2.type == "sub") {
            subs.push(_key2);
          }

          if (_key2.type == "head") {
            rightHead = _key2;
            break;
          }
        }
      } //Delete left & right subs


      for (var i = 0; i < subs.length; i++) {
        var frame = this.getKeyframe("id", subs[i].id);
        delete this.keyframes[frame.index];
      } //Delete head


      delete this.keyframes[keyframe.index];
      if (rightHead && leftHead) this.addSubKeyframes(leftHead.index, rightHead.index);

      if (timeline.graph) {
        timeline.graph.updateState();
        timeline.graph.redraw();
      }

      this.updateBounds();
    }
  }, {
    key: "updateKeyframe",
    value: function updateKeyframe(index, data) {
      var d = Object.keys(data);

      for (var i = 0; i < d.length; i++) {
        this.keyframes[index][d[i]] = data[d[i]];
      }

      this.updateSubKeyframes();
    }
  }, {
    key: "addJoint",
    value: function addJoint(x, y, options) {
      options = options || {};

      if (timeline.graph) {
        timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
      }

      var parent = options.parent || this.activeJoint;
      var joint = {
        id: "J" + utils.uid(),
        name: "Joint ".concat(this.joints.length + 1),
        position: vector(x, y),
        positionPrev: vector(x, y),
        angle: parent ? vector(x, y).heading(parent.position) : 0,
        parent: parent || null,
        children: [],
        length: parent ? parent.position.dist(x, y) : 0,
        hierarchy: parent ? parent.hierarchy + 1 : 1,
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
      if (parent) parent.children.push(joint);

      if (!options.ignoreDefaults) {
        this.activeJoint = joint;
      }

      this.joints.push(joint);

      if (timeline.graph) {
        this.updateKeyframe(timeline.graph.state.currentFrame, {
          activeJointId: this.activeJoint.id
        });
      }

      this.updateBounds();

      if (!options.ignoreHistory) {
        history.add({
          label: "Add joint",
          value: this.clone(),
          group: "keyframe"
        });
      }

      events.emit("jointChange", this.joints);
      return joint;
    }
  }, {
    key: "selectJoint",
    value: function selectJoint(x, y) {
      if (!this.joints.length) return;
      var joints = this.joints.slice();
      joints.sort(function (a, b) {
        return a.position.dist(x, y) - b.position.dist(x, y);
      });
      this.activeJoint = this.joints.find(function (j) {
        return j.id === joints[0].id;
      });
      events.emit("jointChange", this.joints);

      if (timeline.graph) {
        this.updateKeyframe(timeline.graph.state.currentFrame, {
          activeJointId: this.activeJoint.id
        });
      }
    }
  }, {
    key: "removeJointById",
    value: function removeJointById(id) {
      var keys = Object.keys(this.keyframes);

      for (var i = 0; i < keys.length; i++) {
        var frame = this.keyframes[keys[i]];
        var joint = frame.joints.find(function (j) {
          return j.id === id;
        });

        if (joint) {
          for (var j = 0; j < joint.children.length; j++) {
            var child = joint.children[j];
            child.parent = joint.parent;
            child.length += joint.length;
            this.activeJoint = child;
          }

          if (joint.parent) {
            var _joint$parent$childre;

            joint.parent.children.splice(joint.parent.children.indexOf(joint), 1);

            (_joint$parent$childre = joint.parent.children).push.apply(_joint$parent$childre, _toConsumableArray(joint.children));

            this.activeJoint = joint.parent;
          } else {
            this.activeJoint = joint.children[0];
          }

          frame.joints.splice(frame.joints.indexOf(joint), 1);
        }
      } //Fix position


      if (this.activeJoint) {
        this.moveJoint(this.activeJoint.position.x, this.activeJoint.position.y);
      }

      this.updateBounds();
      history.add({
        label: "Remove joint",
        value: this.clone(),
        group: "keyframe"
      });
      events.emit("jointChange", this.joints);
    }
  }, {
    key: "removeJointByPosition",
    value: function removeJointByPosition(x, y) {
      if (!this.joints.length) return;

      for (var i = 0; i < this.joints.length; i++) {
        var joint = this.joints[i];

        if (joint.position.dist(x, y) < config.render.joint.radius + this.mouseBuffer) {
          this.removeJointById(joint.id);
        }
      }
    }
  }, {
    key: "computeKinematics",
    value: function computeKinematics(jointChain, inverse) {
      /*let doforward = [];
      let doinverse = [];
      for (var i = 0; i < jointChain.length; i++) {
      	let joint = jointChain[i];
      	if (joint.hierarchy <= this.activeJoint.hierarchy) {
      		doinverse.push(joint);
      	} 
      	if (joint.hierarchy >= this.activeJoint.hierarchy) {
      		doforward.push(joint);
      	}
      }
      doforward.sort((a, b) => a.hierarchy - b.hierarchy);
      for (var i = 0; i < doforward.length; i++) {
      	let joint = doforward[i];
      	for (var j = 0; j < joint.children.length; j++) {
      		let child = joint.children[j];
      		child.angle = child.position.heading(joint.position);
      		child.position.set({
      			x: joint.position.x - Math.cos(child.angle) * child.length,
      			y: joint.position.y - Math.sin(child.angle) * child.length
      		});
      	}
      }
      doinverse.sort((a, b) => b.hierarchy - a.hierarchy);
      for (var i = doinverse.length - 1; i >= 0; i--) {
      	let joint = doinverse[i];
      	if (joint.parent !== this.activeJoint) {
      		if (joint.parent) {
      			joint.parent.angle = joint.position.heading(joint.parent.position);
      			joint.parent.position.set({
      				x: joint.position.x + Math.cos(joint.parent.angle) * joint.length,
      				y: joint.position.y + Math.sin(joint.parent.angle) * joint.length
      			});
      		}
      	}
      }*/
      if (!inverse) {
        for (var i = 0; i < jointChain.length; i++) {
          var joint = jointChain[i];

          for (var j = 0; j < joint.children.length; j++) {
            var child = joint.children[j];
            child.angle = child.position.heading(joint.position);
            child.position.set({
              x: joint.position.x - Math.cos(child.angle) * child.length,
              y: joint.position.y - Math.sin(child.angle) * child.length
            });
          }
        }
      } else {
        for (var i = jointChain.length - 1; i >= 0; i--) {
          var _joint = jointChain[i];

          if (_joint.parent) {
            _joint.parent.angle = _joint.position.heading(_joint.parent.position);

            _joint.parent.position.set({
              x: _joint.position.x + Math.cos(_joint.parent.angle) * _joint.length,
              y: _joint.position.y + Math.sin(_joint.parent.angle) * _joint.length
            });
          }
        }
      }
    }
  }, {
    key: "updateSkin",
    value: function updateSkin(jointChain) {
      jointChain = jointChain || this.joints;

      for (var i = 0; i < jointChain.length; i++) {
        var joint = jointChain[i];
        var newWidth = joint.length;
        var newHeight = joint.length;
        var angleAuto = 0;
        var crop = joint.skin.crop;
        var cropWidth = 0;
        var cropHeight = 0;

        if (crop) {
          cropWidth = crop.to.x - crop.from.x;
          cropHeight = crop.to.y - crop.from.y;
        }

        if (cropWidth > cropHeight) {
          newHeight = Number.MAX_SAFE_INTEGER;
        } else {
          newWidth = Number.MAX_SAFE_INTEGER;
          angleAuto = Math.PI / 2;
        }

        joint.skin.size = utils.scaleSize(cropWidth, cropHeight, newWidth, newHeight);
        ;
        joint.skin._sizeOriginal = {
          width: cropWidth,
          height: cropHeight
        };
        joint.skin.angleAuto = angleAuto;
        var xOffset = 0;
        var yOffset = 0;
        var scaleXOffset = 1;
        var scaleYOffset = 1;
        var angleOffset = 0;

        if (joint.skin.offset) {
          xOffset = joint.skin.offset.x || 0;
          yOffset = joint.skin.offset.y || 0;
          scaleXOffset = joint.skin.offset.scaleX || 0;
          scaleYOffset = joint.skin.offset.scaleY || 0;
          angleOffset = joint.skin.offset.angle || 0;
        }

        if (joint.parent && crop) {
          joint.skin.position = {
            x: (joint.position.x + joint.parent.position.x) / 2,
            y: (joint.position.y + joint.parent.position.y) / 2
          };
          var vertices = [{
            x: joint.skin.position.x + xOffset - joint.skin.size.width / 2,
            y: joint.skin.position.y + yOffset - joint.skin.size.height / 2
          }, {
            x: joint.skin.position.x + xOffset + joint.skin.size.width / 2,
            y: joint.skin.position.y + yOffset - joint.skin.size.height / 2
          }, {
            x: joint.skin.position.x + xOffset + joint.skin.size.width / 2,
            y: joint.skin.position.y + yOffset + joint.skin.size.height / 2
          }, {
            x: joint.skin.position.x + xOffset - joint.skin.size.width / 2,
            y: joint.skin.position.y + yOffset + joint.skin.size.height / 2
          }];

          for (var _i = 0, _vertices = vertices; _i < _vertices.length; _i++) {
            var vert = _vertices[_i];
            var vertexDelta = {
              x: vert.x - joint.skin.position.x,
              y: vert.y - joint.skin.position.y
            };
            vert.x = vert.x + vertexDelta.x * (scaleXOffset - 1);
            vert.y = vert.y + vertexDelta.y * (scaleYOffset - 1);
          }

          for (var _i2 = 0, _vertices2 = vertices; _i2 < _vertices2.length; _i2++) {
            var _vert = _vertices2[_i2];
            var angle = joint.angle + joint.skin.angleAuto + angleOffset;
            var x = (_vert.x - joint.skin.position.x) * Math.cos(angle) - (_vert.y - joint.skin.position.y) * Math.sin(angle);
            var y = (_vert.x - joint.skin.position.x) * Math.sin(angle) + (_vert.y - joint.skin.position.y) * Math.cos(angle);
            _vert.x = x + joint.skin.position.x;
            _vert.y = y + joint.skin.position.y;
          }

          joint.skin.vertices = vertices;
        }
      }
    }
  }, {
    key: "moveJointById",
    value: function moveJointById(id, x, y) {
      this.activeJoint = this.getJoint(id);
      if (!this.activeJoint) return;

      if (timeline.graph) {
        if (config.animation.autoAddKeyframe) {
          if (!this.activeJoint.position.equals(x, y)) {
            var currentMark = timeline.graph.state.currentMark;
            var frame = this.keyframes[currentMark];

            if (!frame) {
              this.setKeyframe(currentMark);
            } else {
              if (frame.type != "head") {
                this.setKeyframe(currentMark);
              }
            }
          }
        } else {
          timeline.graph.setCurrentMark(timeline.graph.state.currentFrame, false);
          timeline.graph.updateState();
        }

        this.updateSubKeyframes();
      }

      if (x && y) {
        if (this.activeJoint.position.dist(this.activeJoint.positionPrev) > 1) {
          this._moved = true;
          this.activeJoint.positionPrev.set(this.activeJoint.position.x, this.activeJoint.position.y);
        }

        this.activeJoint.position.set(x, y);

        if (config.riggingMode == "linear") {
          if (this.activeJoint.parent) {
            this.activeJoint.angle = this.activeJoint.position.heading(this.activeJoint.parent.position);
            this.activeJoint.length = this.activeJoint.position.dist(this.activeJoint.parent.position);
          }

          for (var i = 0; i < this.activeJoint.children.length; i++) {
            var child = this.activeJoint.children[i];
            child.length = child.position.dist(this.activeJoint.position);
          }
        }
      }

      if (config.riggingMode != "linear") {
        if (config.riggingMode == "forwardKinematics") {
          this.computeKinematics(this.joints);
        } else if (config.riggingMode == "inverseKinematics") {
          this.computeKinematics(this.joints, true);
        }
      }

      this.updateSkin();
      this.updateBounds();
      return this.activeJoint;
    }
  }, {
    key: "moveJoint",
    value: function moveJoint(x, y) {
      this.moveJointById(this.activeJoint.id, x, y);
    }
  }, {
    key: "getJoint",
    value: function getJoint(id) {
      var joint = this.joints.find(function (j) {
        return j.id === id;
      }) || null;
      return joint;
    }
  }, {
    key: "toJSON",
    value: function toJSON(_keyframes, excludeImageSrc) {
      var keyframes = _keyframes || this.clone();

      var json = {};
      var keys = Object.keys(keyframes);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var frame = keyframes[key];
        var keyframe = {
          id: frame.id,
          activeJointId: frame.activeJointId,
          index: frame.index,
          joints: [],
          render: frame.render,
          type: frame.type,
          locked: frame.locked
        };

        for (var j = 0; j < frame.joints.length; j++) {
          var joint = frame.joints[j];
          var jointData = {
            id: joint.id,
            name: joint.name,
            angle: joint.angle,
            position: joint.position,
            positionPrev: joint.positionPrev,
            length: joint.length,
            parent: joint.parent ? joint.parent.id : null,
            hierarchy: joint.hierarchy,
            children: [],
            skinImageSrc: joint.skin && !excludeImageSrc ? joint.skin.imageSrc : undefined,
            skinCrop: joint.skin ? joint.skin.crop : null,
            skinOffset: joint.skin ? joint.skin.offset : null,
            skinPosition: joint.skin ? joint.skin.position : null,
            skinAngleAuto: joint.skin ? joint.skin.angleAuto : undefined,
            skinSize: joint.skin ? joint.skin.size : null,
            _skinSizeOriginal: joint.skin ? joint.skin._sizeOriginal : null,
            _vueCrop: joint.skin ? joint.skin._vueCrop : null,
            zIndex: joint.zIndex
          };

          for (var k = 0; k < joint.children.length; k++) {
            var child = joint.children[k];
            jointData.children.push(child.id);
          }

          keyframe.joints.push(jointData);
        }

        json[keyframe.index] = keyframe;
      }

      return json;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      if (!json) return;
      var result = {};
      var keys = Object.keys(json);

      var _loop2 = function _loop2() {
        var key = keys[i];
        var frame = json[key];
        var activeJoint = frame.joints.find(function (j) {
          return j.id === frame.activeJointId;
        });
        var parsedJoints = []; //Parse joint data

        for (j = 0; j < frame.joints.length; j++) {
          var joint = frame.joints[j];
          var data = {
            id: joint.id,
            name: joint.name,
            angle: joint.angle,
            position: vector(joint.position),
            positionPrev: vector(joint.positionPrev),
            length: joint.length,
            hierarchy: joint.hierarchy,
            parent: joint.parent,
            children: joint.children.slice(),
            skin: {
              offset: joint.skinOffset,
              crop: joint.skinCrop,
              _vueCrop: joint._vueCrop,
              imageSrc: joint.skinImageSrc,
              position: joint.skinPosition,
              angleAuto: joint.angleAuto,
              size: joint.skinSize,
              _sizeOriginal: joint._skinSizeOriginal
            },
            zIndex: joint.zIndex
          };
          parsedJoints.push(data);
        } //Find parent and children


        var _loop3 = function _loop3() {
          var joint = parsedJoints[j];
          joint.parent = parsedJoints.find(function (pj) {
            return pj.id === joint.parent;
          }) || null;

          var _loop4 = function _loop4() {
            var child = joint.children[k];
            joint.children[k] = parsedJoints.find(function (pj) {
              return pj.id === child;
            }) || null;
          };

          for (k = 0; k < joint.children.length; k++) {
            _loop4();
          }
        };

        for (j = 0; j < parsedJoints.length; j++) {
          _loop3();
        }

        var parsedFrame = {
          activeJointId: frame.activeJointId,
          id: frame.id,
          index: frame.index,
          joints: parsedJoints,
          locked: frame.locked,
          render: frame.render,
          type: frame.type
        };
        result[frame.index] = parsedFrame;
      };

      for (var i = 0; i < keys.length; i++) {
        var j;
        var j;
        var k;

        _loop2();
      }

      return result;
    }
  }, {
    key: "import",
    value: function _import(keyframes) {
      this.keyframes = this.clone(keyframes);
      var frames = Object.values(this.keyframes);
      var headCount = 0;

      for (var i = 0; i < frames.length; i++) {
        var frame = frames[i];
        if (frame.type == "head") headCount++;
      }

      this.totalKeyframes = headCount;

      if (timeline.graph) {
        //timeline.graph.setCurrentMark(0, false);
        var currentFrame = this.keyframes[timeline.graph.state.currentMark];

        if (currentFrame) {
          this.activeJoint = this.getKeyframe("id", currentFrame.activeJointId);

          if (this.activeJoint) {
            this.updateKeyframe(timeline.graph.state.currentFrame, {
              activeJointId: this.activeJoint.id
            });
          }
        }

        timeline.graph.updateState();
      }

      this.updateSkin();
      this.updateBounds();
      events.emit("jointChange", this.joints);
    }
  }, {
    key: "renderTo",
    value: function renderTo(ctx, options) {
      options = options || {};
      var frame = this.keyframes[options.frame];
      if (!frame) return;
      options.position = options.position || {
        x: 0,
        y: 0
      };
      var offset = {
        x: -this.bounds.min.x + options.position.x,
        y: -this.bounds.min.y + options.position.y
      };
      frame.joints.sort(function (a, b) {
        return a.zIndex - b.zIndex;
      });

      if (options.showSkin) {
        for (var i = 0; i < frame.joints.length; i++) {
          var joint = frame.joints[i];

          if (joint.parent) {
            //Load image if there's an image url
            if (joint.skin.imageSrc) {
              if (!joint.skin.image) {
                var img = new Image();
                img.src = joint.skin.imageSrc;
                joint.skin.image = img;
                this.updateSkin();
                this.updateBounds();
              } else {
                if (!joint.skin.image.width) {
                  var _img = new Image();

                  _img.src = joint.skin.imageSrc;
                  joint.skin.image = _img;
                  this.updateSkin();
                  this.updateBounds();
                }
              }
            }

            if (joint.skin) {
              if (_typeof(joint.skin.image) == "object") {
                if (joint.skin.image.src && joint.skin.position) {
                  ctx.save();
                  ctx.translate(joint.skin.position.x + offset.x, joint.skin.position.y + offset.y);
                  ctx.rotate(joint.angle + joint.skin.angleAuto);

                  if (joint.skin.offset) {
                    var xOffset = joint.skin.offset.x;
                    var yOffset = joint.skin.offset.y;
                    var scaleXOffset = joint.skin.offset.scaleX;
                    var scaleYOffset = joint.skin.offset.scaleY;
                    var angleOffset = joint.skin.offset.angle;
                    ctx.rotate(angleOffset);
                    ctx.translate(xOffset, yOffset);
                    ctx.scale(scaleXOffset, scaleYOffset);
                  }

                  ctx.drawImage(joint.skin.image, joint.skin.crop.from.x, joint.skin.crop.from.y, joint.skin._sizeOriginal.width, joint.skin._sizeOriginal.height, -joint.skin.size.width / 2, -joint.skin.size.height / 2, joint.skin.size.width, joint.skin.size.height);
                  ctx.restore();

                  if (!joint.skin.vertices) {
                    this.updateSkin();
                    this.updateBounds();
                  }
                }
              }
            }
          }
        }
      }

      if (options.showBones) {
        for (var i = 0; i < frame.joints.length; i++) {
          var _joint2 = frame.joints[i];

          if (_joint2.parent) {
            ctx.beginPath();
            ctx.moveTo(_joint2.position.x + offset.x, _joint2.position.y + offset.y);
            ctx.lineTo(_joint2.parent.position.x + offset.x, _joint2.parent.position.y + offset.y);
            ctx.lineWidth = config.render.segment.width;
            ctx.lineCap = "round";
            ctx.strokeStyle = config.render.segment.color;
            ctx.stroke();
          }
        }

        for (var i = 0; i < frame.joints.length; i++) {
          var _joint3 = frame.joints[i];
          var jointColor = _joint3 === this.activeJoint ? config.render.joint.color.selected : config.render.joint.color["default"];

          if (timeline.graph) {
            if (this.activeJoint && !timeline.graph.state.isPlaying) {
              if (this.activeJoint.children.length) jointColor = this.activeJoint.children.includes(_joint3) ? "#5bff85" : jointColor;
              if (this.activeJoint.parent) jointColor = this.activeJoint.parent === _joint3 ? "#9b68e1" : jointColor;
            }

            if (timeline.graph.state.isPlaying) {
              jointColor = config.render.joint.color["default"];
            }
          }

          ctx.beginPath();
          ctx.arc(_joint3.position.x + offset.x, _joint3.position.y + offset.y, config.render.joint.radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = options.workColor ? jointColor : config.render.joint.color["default"];
          ctx.fill();
        }
      }
    }
  }, {
    key: "render",
    value: function render(renderer) {
      var showBones = showSkeleton.checked;

      if (timeline.graph) {
        var previousFrame = timeline.graph.state.previousFrame;
        var currentFrame = timeline.graph.state.currentFrame;
        var nextFrame = timeline.graph.state.nextFrame;
        var currentMark = timeline.graph.state.currentMark;
        renderer.save();
        renderer.context.globalAlpha = 0.1;
        this.renderTo(renderer.context, {
          frame: previousFrame,
          position: {
            x: this.bounds.min.x,
            y: this.bounds.min.y
          },
          showBones: showBones
        });
        this.renderTo(renderer.context, {
          frame: currentFrame,
          position: {
            x: this.bounds.min.x,
            y: this.bounds.min.y
          },
          showBones: showBones
        });
        this.renderTo(renderer.context, {
          frame: nextFrame,
          position: {
            x: this.bounds.min.x,
            y: this.bounds.min.y
          },
          showBones: showBones
        });
        renderer.restore();

        if (!this.keyframes[currentMark]) {
          currentMark = currentFrame;
        }

        this.renderTo(renderer.context, {
          frame: currentMark,
          position: {
            x: this.bounds.min.x,
            y: this.bounds.min.y
          },
          showBones: showBones,
          showSkin: true,
          workColor: true
        });
      }
    }
  }]);

  return RigModel;
}();

var rigModel = new RigModel();
events.once("loadedApps", function (vue) {
  timeline = vue.timeline;
  rigModel.setKeyframe(0, {
    locked: true,
    ignoreHistory: true
  });
});
module.exports = rigModel;